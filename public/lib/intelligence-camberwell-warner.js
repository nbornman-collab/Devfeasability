// Development Intelligence - Land Between Camberwell Station Road and Warner Road, Camberwell Station Road, SE5 9JA
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.096143, 51.473888], [-0.095634, 51.474183], [-0.095658, 51.474205], [-0.09523, 51.474463], [-0.095209, 51.474476], [-0.095867, 51.474864], [-0.096064, 51.474621], [-0.096203, 51.474433], [-0.096347, 51.474284], [-0.096491, 51.474104], [-0.096471, 51.474107], [-0.096449, 51.474097], [-0.096514, 51.474008], [-0.096649, 51.474031], [-0.096822, 51.474075], [-0.096869, 51.474087], [-0.09713, 51.473747], [-0.097107, 51.473696], [-0.096926, 51.473612], [-0.096736, 51.473531], [-0.096591, 51.473619], [-0.096143, 51.473888]],
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
