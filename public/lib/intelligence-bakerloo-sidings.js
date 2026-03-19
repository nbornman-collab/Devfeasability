// Development Intelligence - Bakerloo Line Sidings, 7 St Georges Circus, SE1 6FE
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.105468, 51.497818], [-0.104132, 51.497818], [-0.104132, 51.498982], [-0.105468, 51.498982], [-0.105468, 51.497818]],
  site: "Bakerloo Line Sidings",
  borough: 'Southwark', use: 'industrial', address: "7 St Georges Circus, SE1 6FE",
  plot_area_m2: 12000, existing_gea_m2: 4000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "TfL railway sidings at 5m between St Georges Circus and E&C. 1.2ha with maximum sky. Both 27F (240 Blackfriars) and 37F (One The Elephant) within 300m." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Railway sidings - TfL infrastructure land. If surplus to BLE requirements: inner SE1 at \u00a3800-950/sqft residential. 12F on 1.2ha generates \u00a360-90M GDV." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"240 Blackfriars Road","ref":"Southwark ref 11/AP/2700","desc":"27F mixed-use, 200m north. Height precedent for this node."},{"name":"One The Elephant","ref":"Southwark ref 12/AP/1562","desc":"37F residential, E&C. 300m south. Major height context."}],
      insight: "TfL land disposal programme is active. If Bakerloo Line Extension proceeds, this is a station box site. If BLE deferred, the land becomes surplus for development." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "St Georges Circus road junction has heritage significance (listed obelisk). Design sensitivity required. Heritage manageable at 10-12F." },
    acquisition: { label: 'Title Stack', score: 5.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "TfL freehold. Public sector disposal - politically complex, requires mayoral/TfL board approval. Score heavily penalised for acquisition complexity." },
    transport: { label: 'Station Gravity', score: 8.5, weight: 0.5, ptal: '5', insight: "PTAL 5. Lambeth North (Bakerloo) 200m. Waterloo 500m. E&C 300m. Excellent transport." }
  }
};
