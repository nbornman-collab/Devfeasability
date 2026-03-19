// Development Intelligence - Sandgate Street and Verney Road, Sandgate Street, SE15 1LE
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.063447, 51.483449], [-0.061953, 51.483449], [-0.061953, 51.484751], [-0.063447, 51.484751], [-0.063447, 51.483449]],
  site: "Sandgate Street and Verney Road",
  borough: 'Southwark', use: 'industrial', address: "Sandgate Street, SE15 1LE",
  plot_area_m2: 15000, existing_gea_m2: 7000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Large 1.5ha industrial at 5m. OKR-adjacent. 12F potential." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Industrial land. OKR corridor values \u00a35,500-6,500/m\u00b2." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"OKR corridor residential","ref":"Southwark ref 17/AP/3885","desc":"34F, OKR."},{"name":"Bermondsey industrial conversion","ref":"Southwark ref 20/AP/1800","desc":"Mixed-use on industrial land."}],
      insight: "OKR OA adjacent. Strong corridor momentum." },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: "No heritage in industrial zone." },
    acquisition: { label: 'Title Stack', score: 5.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Industrial estate. Multiple tenants." },
    transport: { label: 'Station Gravity', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Bus-served. OKR BLE potential." }
  }
};
