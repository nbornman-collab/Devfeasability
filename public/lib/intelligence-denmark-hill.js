// Development Intelligence - Denmark Hill Campus East, Denmark Hill, SE5 8AF
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.091446, 51.466349], [-0.089954, 51.466349], [-0.089954, 51.467651], [-0.091446, 51.467651], [-0.091446, 51.466349]],
  site: "Denmark Hill Campus East",
  borough: 'Southwark', use: 'commercial', address: "Denmark Hill, SE5 8AF",
  plot_area_m2: 15000, existing_gea_m2: 10000,
  existing_floors: 4, existing_height_m: 15.0,
  ftf_m: 4.0, max_height_m: 35.0, max_floors: 9,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.0, weight: 2.5, existing_m: 15.0, insight: "NHS/university campus at 15m. Large 1.5ha site. If surplus: 9F residential potential." },
    value: { label: 'Rent Headroom', score: 7.5, weight: 2.0, insight: "NHS campus - if disposal. SE5 residential at \u00a3650-750/sqft. 9F on 1.5ha generates \u00a360-80M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0,
      precedents: [{"name":"Camberwell Station Road","ref":"Southwark ref 18/AP/3600","desc":"9F residential, 300m north. Height precedent."},{"name":"Denmark Hill residential","ref":"Southwark ref 21/AP/1200","desc":"8F residential above commercial. Direct corridor precedent."}],
      insight: "NHS estates programme. Active disposal pipeline." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Victorian hospital buildings. Some heritage interest. Manageable with retention strategy." },
    acquisition: { label: 'Title Stack', score: 5.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "NHS/Kings College London. Complex institutional ownership. Score penalised." },
    transport: { label: 'Station Gravity', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Denmark Hill station (Overground/Thameslink) 100m. Direct station adjacency." }
  }
};
