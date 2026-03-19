// Development Intelligence - 49 Lomond Grove, 49 Lomond Grove, Camberwell, SE5 7HN
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.092759, 51.479275], [-0.092241, 51.479275], [-0.092241, 51.479725], [-0.092759, 51.479725], [-0.092759, 51.479275]],
  site: "49 Lomond Grove",
  borough: 'Southwark', use: 'commercial', address: "49 Lomond Grove, Camberwell, SE5 7HN",
  plot_area_m2: 1800, existing_gea_m2: 1000,
  existing_floors: 2, existing_height_m: 6.0,
  ftf_m: 3.15, max_height_m: 28.0, max_floors: 9,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 6.0, insight: "Commercial at 6m. Camberwell context supports 8-9F." },
    value: { label: 'Rent Headroom', score: 7.5, weight: 2.0, insight: "Low-yield commercial. SE5 resi at \u00a3600-700/sqft." },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0,
      precedents: [{"name":"Camberwell Road residential","ref":"Southwark ref 20/AP/1200","desc":"8F, 400m north."},{"name":"Aylesbury Estate","ref":"Southwark ref 14/AP/3844","desc":"Major regen, 600m north."}],
      insight: "Camberwell corridor. LPA supportive." },
    heritage: { label: 'Heritage Shadow', score: 8.0, weight: 1.5, insight: "No heritage." },
    acquisition: { label: 'Title Stack', score: 7.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Likely single freehold." },
    transport: { label: 'Station Gravity', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Denmark Hill 600m." }
  }
};
