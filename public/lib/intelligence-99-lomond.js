// Development Intelligence - 99 Lomond Grove, 99 Lomond Grove, Camberwell, SE5 7HN
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.091836, 51.476294], [-0.091364, 51.476294], [-0.091364, 51.476706], [-0.091836, 51.476706], [-0.091836, 51.476294]],
  site: "99 Lomond Grove",
  borough: 'Southwark', use: 'commercial', address: "99 Lomond Grove, Camberwell, SE5 7HN",
  plot_area_m2: 1500, existing_gea_m2: 800,
  existing_floors: 2, existing_height_m: 5.0,
  ftf_m: 3.15, max_height_m: 25.0, max_floors: 8,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Commercial at 5m. Camberwell supports 6-8F residential." },
    value: { label: 'Rent Headroom', score: 7.5, weight: 2.0, insight: "Low-yield commercial. SE5 resi at \u00a3600-700/sqft." },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0,
      precedents: [{"name":"Camberwell Road residential","ref":"Southwark ref 20/AP/1200","desc":"8F, 500m north."},{"name":"Lomond Grove estate infill","ref":"Southwark ref 21/AP/0800","desc":"6F residential infill. 100m south. Direct precedent."}],
      insight: "Camberwell corridor." },
    heritage: { label: 'Heritage Shadow', score: 8.0, weight: 1.5, insight: "No heritage." },
    acquisition: { label: 'Title Stack', score: 7.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Likely single freehold." },
    transport: { label: 'Station Gravity', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Denmark Hill 500m." }
  }
};
