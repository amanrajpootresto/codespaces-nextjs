# Design Essentials – Project Logic Notes

This file documents the actual implementation changes made for the project showcase classification, filter logic, route consistency, and the runtime revalidation fix.

## 1. Goal

The Showcase page was using an older generic project classification structure, while the design content needed to follow the project types:

- Living Rooms
- Kitchens
- Cafés

The logic also needed to stay consistent across:

- filter values
- project category values
- project tags
- project detail labels
- URL slug routing
- static page revalidation

---

## 2. File-by-file changes

### A. `data/site.json`

Label: `Project classification + filter data`

This file was updated so every project uses a category that matches the active showcase filters.

Example structure:

```json
"projects": [
  {
    "slug": "sandstone-residence",
    "name": "Sandstone Residence",
    "category": "living-room",
    "tags": ["living-room", "residential", "home", "family", "storage"],
    "type": "3BHK Residence"
  }
],
"filters": [
  { "label": "All", "value": "all" },
  { "label": "Living Rooms", "value": "living-room" },
  { "label": "Kitchens", "value": "kitchen" },
  { "label": "Cafés", "value": "cafe" }
]
```

Why this matters:

- Showcase filter buttons use the `filter.value`
- Project filtering checks `project.category === filter` or `project.tags.includes(filter)`
- If the values do not match, the category filter will appear broken even though the route still works

Important note:

- The slug is a route identifier, not a filter value
- Example: `/projects/sandstone-residence` is different from `living-room`
- They are not meant to be the same

---

### B. `pages/showcase.js`

Label: `Showcase filtering + search logic`

This file is responsible for determining which projects are visible on the showcase page.

Key logic:

```js
function matchesFilter(project, filter) {
  return filter === 'all' || project.category === filter || project.tags?.includes(filter)
}
```

This means a project can be filtered by:

- its exact category value, or
- one of its tags

We also improved search so it searches across more meaningful fields:

```js
function matchesSearch(project, search, filters) {
  const query = normalizeSearchValue(search)
  if (!query) return true

  const categoryLabel = filters.find((filter) => filter.value === project.category)?.label

  const searchableContent = [
    project.name,
    project.type,
    project.location,
    project.category,
    categoryLabel,
    ...(project.tags || []),
    project.description,
    project.scope,
    project.brief,
    project.challenge,
    project.solution,
  ]
    .filter(Boolean)
    .join(' ')

  return normalizeSearchValue(searchableContent).includes(query)
}
```

Why this matters:

- Search is no longer limited to only `name/location/type`
- It also searches project content like `brief`, `scope`, `challenge`, and `solution`
- That makes the showcase stronger and more useful for clients

---

### C. `pages/projects/[slug].js`

Label: `Project detail page + category label mapping`

This file shows the details for a single project and also maps the internal category value to a readable label.

```js
const categoryLabel = filters.find((filter) => filter.value === project.category)?.label || project.category
```

Then used here:

```js
<div className={styles.projectLabels}>
  <span>{categoryLabel}</span>
  <span>{project.location}</span>
  <span>{project.type}</span>
</div>
```

This protects consistency between:

- the show case filter value (`living-room`)
- the user-facing label (`Living Rooms`)
- the project detail page display

This is important because internal values are often technical, while visible labels should be readable and user-friendly.

---

### D. `lib/get-site-content.js`

Label: `Remote content merge + revalidation normalization`

This file was fixed so that values coming from the remote Google Sheet/content API cannot cause a runtime error.

The main bug was this:

- a remote value could arrive as a string like `"60"`
- Next.js requires `revalidate` to be a natural number such as `60`
- mixed strings and numbers break the runtime

The fix was to normalize the value before using it:

```js
function normalizeRevalidateSeconds(content) {
  if (!content || !isObject(content)) return content

  const next = { ...content }
  const rawValue = next.contentApi?.revalidateSeconds
  const parsed = Number(rawValue)

  if (rawValue !== undefined) {
    next.contentApi = {
      ...next.contentApi,
      revalidateSeconds: Number.isFinite(parsed) && parsed > 0 ? parsed : 60,
    }
  }

  return next
}
```

And then in the page generation layer:

```js
const revalidateSeconds = Number(siteContent.contentApi?.revalidateSeconds) || 60

return project
  ? { props: { project, siteContent }, revalidate: revalidateSeconds }
  : { notFound: true, revalidate: 60 }
```

Why this matters:

- Prevents runtime errors like: `A page's revalidate option must be seconds expressed as a natural number`
- Keeps static generation reliable
- Makes remote content safer to merge and deploy

---

## 3. Why the filter and slug values are different

This was one of the main conceptual issues to clarify.

### Slug

Example:

```txt
/projects/sandstone-residence
```

This is the route to the project detail page.

### Filter value

Example:

```txt
living-room
```

This is a category bucket used by the showcase page to decide which project cards appear.

These are intentionally different systems:

- slug = unique URL for one project
- filter value = shared category used to group many projects

So a slug should not be treated as a filter value, and vice versa.

---

## 4. Summary of the logic model

The current logic works like this:

1. Each project has a `category` and `tags`
2. `filters` contains the user-visible buttons
3. `showcase.js` filters the list by `category` or tag
4. `project detail pages` read the same category and display a readable label
5. `site.json` and remote content are normalized before Next.js uses them
6. `revalidate` is always converted to a number before static generation

This keeps the app stable and predictable.

---

## 5. Current working status

The project was verified using:

```bash
npm run build
```

and the production build completed successfully.

This confirms the showcase classification logic and the revalidation fix are both working with the current project files.

---

## 6. Recommended next step

If you want the site to be even cleaner, the next improvement would be to standardize the label text fully, for example:

- `Living Rooms`
- `Kitchen`
- `Cafe`

instead of mixing pluralization and style inconsistencies across labels and content blocks.

This is a final polish step, not a logic bug fix.
