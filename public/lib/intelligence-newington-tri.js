// Development Intelligence - Newington Triangle, Newington Causeway, SE1 6DR
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.059205, 51.537734], [-0.058595, 51.537734], [-0.058595, 51.538266], [-0.059205, 51.538266], [-0.059205, 51.537734]],
  site: "Newington Triangle",
  borough: 'Southwark', use: 'commercial', address: "Newington Causeway, SE1 6DR",
  plot_area_m2: 2500, existing_gea_m2: 2000,
  existing_floors: 3, existing_height_m: 12.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 12.0, insight: "Commercial at 12m on Newington Causeway. E&C regeneration context supports 12F." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Commercial at Band D/E. E&C residential at \u00a3800-950/sqft. 12F generates \u00a320-30M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"One The Elephant","ref":"Southwark ref 12/AP/1562","desc":"37F residential. E&C zone. Major height precedent."},{"name":"Newington Butts residential","ref":"Southwark ref 17/AP/2800","desc":"12F residential. E&C approach."}],
      insight: "Elephant & Castle regeneration zone. Maximum momentum." },
    heritage: { label: 'Heritage Shadow', score: 7.5, weight: 1.5, insight: "E&C area - some heritage. Manageable." },
    acquisition: { label: 'Title Stack', score: 7.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Commercial freehold. Achievable." },
    transport: { label: 'Station Gravity', score: 8.5, weight: 0.5, ptal: '5', insight: "PTAL 5. E&C (Northern/Bakerloo) 200m." }
  }
};
