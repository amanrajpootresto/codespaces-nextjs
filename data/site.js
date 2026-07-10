export const siteConfig = {
  name: 'Design Essentials',
  studioLine: 'INTERIORS / DELHI NCR',
  tagline: 'Spaces with purpose. Details with meaning.',
  description:
    'Premium residential and commercial interior design, planning and turnkey execution across Delhi NCR.',
  baseUrl: 'https://design-essentials-p3.vercel.app',
  phone: '+91 98110 06842',
  phoneHref: 'tel:+919811006842',
  email: 'info@designessentials.co.in',
  emailHref: 'mailto:info@designessentials.co.in',
  address: 'GD-87, GD Block, Dakshini Pitampura, Pitampura, Delhi 110034',
  shortAddress: 'GD-87, GD Block, Dakshini Pitampura, Delhi 110034',
  serviceAreas: ['Delhi', 'Gurgaon', 'Noida', 'Greater Noida', 'Faridabad', 'Ghaziabad'],
}

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
]

export const imageLibrary = {
  hero: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=86',
  intro: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=86',
  residential: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=86',
  commercial: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=86',
  turnkey: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=86',
  renovation: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=86',
  residence: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1900&q=86',
  exterior: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=86',
  material: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=86',
  consultation: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1600&q=86',
  bedroom: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1600&q=86',
  villa: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=86',
  cafe: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=86',
  retail: 'https://images.unsplash.com/photo-1567449303078-57ad995bd17f?auto=format&fit=crop&w=1600&q=86',
}

export const services = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Interior Design',
    shortTitle: 'Residential interiors',
    description:
      'Complete home interiors, modular kitchens, wardrobes, living rooms, bedrooms and renovation planning for apartments, villas and builder floors.',
    summary: 'Complete homes, kitchens, wardrobes and rooms.',
    image: imageLibrary.residential,
    alt: 'Residential interior design',
    points: [
      'Space planning and furniture layout',
      'Kitchen, wardrobe and storage design',
      'Lighting, finishes and material guidance',
      'Turnkey home execution',
    ],
  },
  {
    id: 'commercial',
    number: '02',
    title: 'Commercial Interior Design',
    shortTitle: 'Commercial interiors',
    description:
      'Office, retail, clinic, hospitality and showroom interiors designed around workflow, customer experience, brand presence and business continuity.',
    summary: 'Offices, retail, clinics, restaurants and showrooms.',
    image: imageLibrary.commercial,
    alt: 'Commercial office interior design',
    points: [
      'Office and workspace planning',
      'Reception, meeting and customer zones',
      'Retail and hospitality experience design',
      'Execution planning to reduce disruption',
    ],
  },
  {
    id: 'turnkey',
    number: '03',
    title: 'Turnkey Interior Execution',
    shortTitle: 'Turnkey execution',
    description:
      'For clients who want one accountable team to manage design, sourcing, contractors, installation and final handover.',
    summary: 'Civil, furniture, electrical, procurement and site coordination.',
    image: imageLibrary.turnkey,
    alt: 'Turnkey interior execution',
    points: [
      'Civil, electrical, plumbing and false ceiling coordination',
      'Furniture and modular fabrication',
      'Vendor and material management',
      'Quality checks and progress updates',
    ],
  },
  {
    id: 'renovation',
    number: '04',
    title: 'Renovation and Space Improvement',
    shortTitle: 'Renovation',
    description:
      'Existing spaces reworked with a focus on better layout, updated finishes, improved lighting and practical upgrades.',
    summary: 'Existing spaces reworked with minimal disruption.',
    image: imageLibrary.renovation,
    alt: 'Interior renovation',
    points: [
      'Space optimisation',
      'Wall, flooring and ceiling upgrades',
      'Electrical and plumbing updates',
      'Furniture and styling refresh',
    ],
  },
]

export const processSteps = [
  {
    number: '01',
    label: 'DISCOVER',
    title: 'Consultation',
    shortTitle: 'Consult',
    description:
      'Understand the property, users, lifestyle, business needs, budget and timeline. Collect floor plans, photos and reference images.',
  },
  {
    number: '02',
    label: 'MEASURE',
    title: 'Site Analysis',
    shortTitle: 'Analyse',
    description:
      'Measure the space, identify technical limitations and study light, movement, storage and service points.',
  },
  {
    number: '03',
    label: 'PLAN',
    title: 'Concept and Planning',
    shortTitle: 'Layout',
    description:
      'Develop layouts, mood direction, furniture zoning, material strategy and visual references.',
  },
  {
    number: '04',
    label: 'SELECT',
    title: 'Material Selection',
    shortTitle: 'Materials',
    description:
      'Shortlist finishes, hardware, lighting, furniture and surface details according to budget and durability.',
  },
  {
    number: '05',
    label: 'BUILD',
    title: 'Execution',
    shortTitle: 'Execute',
    description:
      'Coordinate site work, vendors, procurement, fabrication, installation and quality checks.',
  },
  {
    number: '06',
    label: 'HANDOVER',
    title: 'Handover',
    shortTitle: 'Handover',
    description:
      'Review the finished space, document care guidance and close remaining practical details.',
  },
]

const projectList = [
  {
    slug: 'sandstone-residence',
    name: 'Sandstone Residence',
    type: '3BHK Residence',
    category: 'residential',
    tags: ['residential', 'home', '3bhk', 'turnkey'],
    location: 'Gurgaon',
    image: imageLibrary.residence,
    alt: 'Sandstone Residence interior project',
    description:
      'A calm family home concept built around warm textures, concealed storage and natural light.',
    scope: 'Living, bedrooms, kitchen and wardrobes',
    duration: 'To be verified with client',
    brief:
      'The family wanted a refined home that felt warm, uncluttered and easy to maintain. The layout needed better storage, improved circulation and a consistent material language.',
    challenge:
      'The challenge was to create a premium mood without making the apartment feel heavy or over-designed. Every element had to support daily family use.',
    solution:
      'A restrained palette, layered textures, concealed storage and simple furniture lines create a calm home with enough flexibility for everyday life.',
    gallery: [imageLibrary.bedroom, imageLibrary.villa, imageLibrary.material],
    placeholder: true,
  },
  {
    slug: 'cyber-city-workspace',
    name: 'Cyber City Workspace',
    type: 'Office Interior',
    category: 'commercial',
    tags: ['commercial', 'office', 'workspace'],
    location: 'Gurgaon',
    image: imageLibrary.commercial,
    alt: 'Cyber City Workspace interior project',
    placeholder: true,
  },
  {
    slug: 'pitampura-family-home',
    name: 'Pitampura Family Home',
    type: 'Renovation',
    category: 'residential',
    tags: ['residential', 'renovation', 'home'],
    location: 'Delhi',
    image: imageLibrary.residential,
    alt: 'Pitampura Family Home interior project',
    placeholder: true,
  },
  {
    slug: 'courtyard-cafe',
    name: 'Courtyard Cafe',
    type: 'Hospitality',
    category: 'hospitality',
    tags: ['commercial', 'hospitality', 'restaurant'],
    location: 'Delhi NCR',
    image: imageLibrary.cafe,
    alt: 'Courtyard Cafe interior project',
    placeholder: true,
  },
  {
    slug: 'boutique-retail-studio',
    name: 'Boutique Retail Studio',
    type: 'Retail / Showroom',
    category: 'commercial',
    tags: ['commercial', 'retail', 'showroom'],
    location: 'Delhi',
    image: imageLibrary.retail,
    alt: 'Boutique Retail Studio interior project',
    placeholder: true,
  },
  {
    slug: 'noida-apartment',
    name: 'Noida Apartment',
    type: 'Apartment Interior',
    category: 'residential',
    tags: ['residential', 'apartment', 'home'],
    location: 'Noida',
    image: imageLibrary.bedroom,
    alt: 'Noida Apartment interior project',
    placeholder: true,
  },
  {
    slug: 'clinic-reception',
    name: 'Clinic Reception',
    type: 'Healthcare Interior',
    category: 'commercial',
    tags: ['commercial', 'office', 'clinic'],
    location: 'Gurgaon',
    image: imageLibrary.turnkey,
    alt: 'Clinic Reception interior project',
    placeholder: true,
  },
  {
    slug: 'warm-minimal-villa',
    name: 'Warm Minimal Villa',
    type: 'Villa Renovation',
    category: 'renovation',
    tags: ['residential', 'renovation', 'villa'],
    location: 'Faridabad',
    image: imageLibrary.villa,
    alt: 'Warm Minimal Villa interior project',
    placeholder: true,
  },
  {
    slug: 'compact-restaurant',
    name: 'Compact Restaurant',
    type: 'Restaurant Interior',
    category: 'hospitality',
    tags: ['commercial', 'hospitality', 'restaurant'],
    location: 'Delhi',
    image: imageLibrary.material,
    alt: 'Compact Restaurant interior project',
    placeholder: true,
  },
]

const projectDetailContent = {
  'cyber-city-workspace': {
    description: 'A focused workplace balancing collaborative energy with quiet, concentrated work.',
    scope: 'Reception, workstations, meeting rooms and breakout areas',
    brief: 'The team needed a flexible office that could support focused work, informal reviews and client meetings without losing a clear visual identity.',
    challenge: 'Acoustic privacy and generous circulation had to coexist within an efficient commercial floor plate.',
    solution: 'Layered lighting, warm timber notes and carefully zoned shared spaces give the office clarity without making it feel rigid.',
    gallery: [imageLibrary.turnkey, imageLibrary.retail, imageLibrary.material, imageLibrary.consultation],
  },
  'pitampura-family-home': {
    description: 'A familiar family home renewed with lighter finishes, smarter storage and easier movement.',
    scope: 'Living room, bedrooms, storage and finish upgrades',
    brief: 'The owners wanted to retain the warmth of their long-lived home while updating its storage, lighting and everyday usability.',
    challenge: 'The renovation needed to respect existing elements and limit disruption while giving the rooms a coherent new character.',
    solution: 'A lighter palette, integrated joinery and selective surface upgrades make the home feel calm, open and distinctly personal.',
    gallery: [imageLibrary.bedroom, imageLibrary.intro, imageLibrary.material, imageLibrary.residence],
  },
  'courtyard-cafe': {
    description: 'A relaxed neighbourhood cafe shaped by tactile finishes and an easy indoor-outdoor mood.',
    scope: 'Dining, service counter, lighting and customer experience',
    brief: 'The client wanted a memorable hospitality space that felt welcoming throughout the day and worked efficiently during peak service.',
    challenge: 'Customer flow, table density and operational movement had to be resolved within a compact footprint.',
    solution: 'Distinct seating zones, warm ambient light and robust natural textures create character while protecting service efficiency.',
    gallery: [imageLibrary.material, imageLibrary.retail, imageLibrary.commercial, imageLibrary.intro],
  },
  'boutique-retail-studio': {
    description: 'A composed retail setting designed to let products, materials and personal service take focus.',
    scope: 'Display system, trial area, lighting and brand touchpoints',
    brief: 'The boutique needed a polished customer journey with flexible displays that could adapt to new collections.',
    challenge: 'Storage and sales functions had to remain discreet without reducing the sense of openness.',
    solution: 'A modular display rhythm, concealed storage and precise accent lighting create an elegant, adaptable showroom.',
    gallery: [imageLibrary.commercial, imageLibrary.turnkey, imageLibrary.material, imageLibrary.cafe],
  },
  'noida-apartment': {
    description: 'A compact apartment made more generous through soft tones, built-in storage and clean sightlines.',
    scope: 'Living, bedrooms, kitchen and space optimisation',
    brief: 'The family asked for a bright, low-maintenance home with enough storage for daily life and a comfortable setting for guests.',
    challenge: 'Every room needed to work harder without feeling filled with furniture or heavy joinery.',
    solution: 'Full-height storage, pale finishes and visually light furniture preserve openness while meeting practical needs.',
    gallery: [imageLibrary.residential, imageLibrary.residence, imageLibrary.intro, imageLibrary.material],
  },
  'clinic-reception': {
    description: 'A reassuring healthcare arrival space with intuitive movement, privacy and a calm material palette.',
    scope: 'Reception, waiting, consultation approach and lighting',
    brief: 'The clinic needed a professional first impression that reduced visual stress and made patient movement easy to understand.',
    challenge: 'Privacy, accessibility and operational visibility required careful coordination in a limited front-of-house area.',
    solution: 'Clear zoning, soft indirect light and durable finishes create an orderly environment that still feels warm and human.',
    gallery: [imageLibrary.commercial, imageLibrary.consultation, imageLibrary.retail, imageLibrary.material],
  },
  'warm-minimal-villa': {
    description: 'A villa renovation that pairs generous proportions with restrained detail and natural warmth.',
    scope: 'Living areas, bedrooms, lighting and material renewal',
    brief: 'The owners wanted to simplify an ornate interior and create a quieter backdrop for family life and collected objects.',
    challenge: 'The new language had to connect rooms of different scales while retaining useful existing construction.',
    solution: 'Consistent flooring, warm neutrals and edited architectural details bring continuity and a more relaxed sense of luxury.',
    gallery: [imageLibrary.residence, imageLibrary.bedroom, imageLibrary.exterior, imageLibrary.material],
  },
  'compact-restaurant': {
    description: 'A small restaurant with strong atmosphere, efficient service flow and a distinctive evening identity.',
    scope: 'Dining layout, counter, lighting and finish specification',
    brief: 'The concept called for an intimate dining room that could achieve good capacity without compromising guest comfort.',
    challenge: 'Kitchen movement, table spacing and visual impact all competed for a narrow footprint.',
    solution: 'A disciplined plan, layered wall treatments and focused pools of light make the room feel richer and more spacious.',
    gallery: [imageLibrary.cafe, imageLibrary.retail, imageLibrary.commercial, imageLibrary.turnkey],
  },
}

export const projects = projectList.map((project) => ({
  duration: 'To be confirmed',
  gallery: [project.image, imageLibrary.material, imageLibrary.intro],
  description: `A considered ${project.type.toLowerCase()} shaped around function, atmosphere and durable detail.`,
  scope: project.type,
  brief: 'The project began with a clear review of the space, daily requirements, visual references, budget direction and delivery priorities.',
  challenge: 'The design needed to balance a polished visual identity with practical planning, maintenance and execution constraints.',
  solution: 'A coordinated layout, material palette and lighting strategy bring clarity to the space and support how it is used every day.',
  ...project,
  ...projectDetailContent[project.slug],
}))

export const filters = [
  { label: 'All', value: 'all' },
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Office', value: 'office' },
  { label: 'Renovation', value: 'renovation' },
  { label: 'Hospitality', value: 'hospitality' },
]
