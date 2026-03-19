// Development Intelligence - Marlborough Grove and St James Road, Marlborough Grove, Bermondsey, SE1 5QS
// EPC: 4000m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.137245, 51.504025], [-0.136155, 51.504025], [-0.136155, 51.504975], [-0.137245, 51.504975], [-0.137245, 51.504025]],
  site: "Marlborough Grove and St James Road",
  borough: 'Southwark', use: 'industrial', address: "Marlborough Grove, Bermondsey, SE1 5QS",
  plot_area_m2: 8000, existing_gea_m2: 4000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Industrial at 5m in inner SE1. Bermondsey corridor supports 10-12F residential." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Industrial EUV. SE1 Bermondsey residential at \u00a3700-850/sqft." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"Bermondsey SE1 residential","ref":"Southwark ref 19/AP/3000","desc":"10F residential, SE1. Height precedent."},{"name":"Loman Street SE1","ref":"Southwark ref 20/AP/1537","desc":"Mixed-use 12F with industrial retention. Precedent for industrial conversion."}],
      insight: "Inner SE1 Bermondsey. Active residential conversion zone." },
    heritage: { label: 'Heritage Shadow', score: 7.5, weight: 1.5, insight: "Some heritage sensitivity in Bermondsey. Manageable." },
    acquisition: { label: 'Title Stack', score: 6.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Industrial estate - multiple unit likely." },
    transport: { label: 'Station Gravity', score: 8.0, weight: 0.5, ptal: '4', insight: "PTAL 4. Bermondsey (Jubilee) 500m. Good inner SE1 connectivity." }
  }
};
