// Development Intelligence - Devon Street and Sylvan Grove, Devon Street, SE15 1AL
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.058945, 51.481125], [-0.057855, 51.481125], [-0.057855, 51.482075], [-0.058945, 51.482075], [-0.058945, 51.481125]],
  site: "Devon Street and Sylvan Grove",
  borough: 'Southwark', use: 'industrial', address: "Devon Street, SE15 1AL",
  plot_area_m2: 8000, existing_gea_m2: 4000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Industrial at 5m. 0.8ha in SE15. 12F potential." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Industrial land. SE15 resi at \u00a3550-650/sqft." },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0,
      precedents: [{"name":"OKR corridor residential","ref":"Southwark ref 17/AP/3885","desc":"34F, OKR. Corridor height precedent."},{"name":"New Cross mixed-use","ref":"Lewisham ref 14/AP/4100","desc":"Industrial-to-residential, SE14/SE15."}],
      insight: "OKR corridor adjacent. Some planning momentum." },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: "No heritage in SE15 industrial zone." },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Industrial estate. Multiple tenants likely." },
    transport: { label: 'Station Gravity', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. New Cross Gate 500m." }
  }
};
