// Development Intelligence - Land Between Camberwell Station Road and Warner Road, Camberwell Station Road, SE5 9JA
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.097331, 51.473824], [-0.096469, 51.473824], [-0.096469, 51.474576], [-0.097331, 51.474576], [-0.097331, 51.473824]],
  site: "Land Between Camberwell Station Road and Warner Road",
  borough: 'Southwark', use: 'industrial', address: "Camberwell Station Road, SE5 9JA",
  plot_area_m2: 5000, existing_gea_m2: 3000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 35.0, max_floors: 10,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.0, weight: 2.5, existing_m: 5.0, insight: "Industrial at 5m between Camberwell station approaches. 10F potential." },
    value: { label: 'Rent Headroom', score: 7.5, weight: 2.0, insight: "Industrial land. SE5 resi at \u00a3600-700/sqft." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"Camberwell Station Road","ref":"Southwark ref 18/AP/3600","desc":"9F residential. Direct precedent."},{"name":"Denmark Hill residential","ref":"Southwark ref 21/AP/1200","desc":"8F. 400m south."}],
      insight: "Station-adjacent. LPA supports residential near stations." },
    heritage: { label: 'Heritage Shadow', score: 7.5, weight: 1.5, insight: "Victorian railway. Some heritage. Manageable." },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Likely Network Rail or industrial freeholder." },
    transport: { label: 'Station Gravity', score: 7.5, weight: 0.5, ptal: '3', insight: "PTAL 3. Denmark Hill 200m." }
  }
};
