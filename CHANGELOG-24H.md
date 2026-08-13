# Recent Code Changes (Last 24 Hours)

This file summarizes the latest implementation work completed in the project over the recent 24-hour period.

## 1. Showcase classification was normalized to the real content model

The showcase system originally used older generic labels such as residential/commercial/office/renovation/hospitality.

The project was updated to follow the actual content structure the client wanted:

- Living Rooms
- Kitchens
- Cafés

### Updated logic

Project records in `data/site.json` were aligned so each project has:

- a matching `category`
- compatible `tags`
- matching descriptive content in `scope`, `brief`, `challenge`, and `solution`

### Example

```json
{
  "slug": "sandstone-residence",
  "name": "Sandstone Residence",
  "category": "living-room",
  "tags": ["living-room", "residential", "home", "family", "storage"],
  "type": "3BHK Residence"
}
```

The filter values were also aligned:

```json
"filters": [
  { "label": "All", "value": "all" },
  { "label": "Living Rooms", "value": "living-room" },
  { "label": "Kitchens", "value": "kitchen" },
  { "label": "Cafés", "value": "cafe" }
]
```

This prevents the showcase filters from drifting away from the actual project data.

---

## 2. Showcase filtering logic was strengthened

The filtering logic in `pages/showcase.js` was checked and improved so it works consistently with the category and tag model.

### Main logic

```js
function matchesFilter(project, filter) {
  return filter === 'all' || project.category === filter || project.tags?.includes(filter)
}
```

This ensures that a project can match either:

- the project category
- or a tag that matches the active filter

### Search was also improved

The search logic now searches through more practical text fields instead of only the name/location fields.

```js
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
```

This makes the showcase more useful when searching by space type, stylistic terms, or project language.

---

## 3. Detail page label mapping was corrected

In `pages/projects/[slug].js`, project category values are mapped to the user-facing label using the filters list.

### Example

```js
const categoryLabel = filters.find((filter) => filter.value === project.category)?.label || project.category
```

This keeps the backend value and visible UI label synchronized.

Example:

- internal category: `living-room`
- visible label: `Living Rooms`

That matters because the UI should be readable while the data can remain structured and machine-friendly.

---

## 4. Revalidate bug was fixed for production safety

The runtime error was caused by `revalidateSeconds` being received as a string value like `"60"` instead of a numeric value.

Next.js requires a natural number for `revalidate`, and strings are not accepted.

### Fix applied in `lib/get-site-content.js`

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

This ensures the data source does not break the static page generation flow.

### Additional defensive fix

```js
const revalidateSeconds = Number(siteContent.contentApi?.revalidateSeconds) || 60
```

This was also applied in `pages/projects/[slug].js` and the fallback page content path to guarantee the value passed to Next.js is valid.

---

## 5. Production build was validated successfully

The app was tested with:

```bash
npm run build
```

Result:

- project pages generated successfully
- showcase page generated successfully
- no runtime error tied to `revalidate`
- exit code was successful

This confirms the recent code changes are valid in the current project build.

---

## 6. Live remote data path was also checked

A direct fetch to the live Google Sheet endpoint was also tested and returned HTTP 200.

This confirms the remote content source is reachable and still serving JSON data.

### Example response check

```js
fetch(url)
  .then(async (res) => {
    console.log('status:', res.status)
    const text = await res.text()
    console.log(text.slice(0, 220))
  })
```

This confirmed the live content endpoint is alive and returning the expected payload.

---

## 7. Important understanding: filter values vs slug values

This was clarified during work on the project.

### Slug

```txt
/projects/sandstone-residence
```

This is the route to one specific project page.

### Filter value

```txt
living-room
```

This is the grouping value used by the showcase page to show a set of matching projects.

These are not the same thing and should not be confused.

---

## 8. Final status

All recent changes were completed and validated:

- content model aligned to the actual showcase categories
- filter logic consistent with the project data
- revalidate fix in place for production-safe static generation
- remote sheet data path confirmed working
- build validated successfully

This is the current stable state of the project logic.
