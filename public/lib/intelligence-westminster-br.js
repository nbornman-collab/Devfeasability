// Development Intelligence - 1-5 Westminster Bridge Road, 1-5 Westminster Bridge Road, SE1 7XW
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.105634, 51.498109], [-0.104966, 51.498109], [-0.104966, 51.498691], [-0.105634, 51.498691], [-0.105634, 51.498109]],
  site: "1-5 Westminster Bridge Road",
  borough: 'Southwark', use: 'office', address: "1-5 Westminster Bridge Road, SE1 7XW",
  plot_area_m2: 3000, existing_gea_m2: 4000,
  existing_floors: 4, existing_height_m: 18.0,
  ftf_m: 4.0, max_height_m: 52.0, max_floors: 13,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 18.0, insight: "Office at 18m on Westminster Bridge Road. E&C/Blackfriars corridor. 13F achievable." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Inner SE1 office. Grade A at \u00a375-85/sqft." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"240 Blackfriars Road","ref":"Southwark ref 11/AP/2700","desc":"27F, 300m north."},{"name":"One The Elephant","ref":"Southwark ref 12/AP/1562","desc":"37F, 200m south."}],
      insight: "E&C/Blackfriars corridor. Maximum momentum." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Imperial War Museum 300m. Some heritage. Manageable." },
    acquisition: { label: 'Title Stack', score: 7.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Office block. Institutional freehold." },
    transport: { label: 'Station Gravity', score: 9.0, weight: 0.5, ptal: '6a', insight: "PTAL 6a. Lambeth North 200m. Waterloo 400m. E&C 300m. Exceptional." }
  }
};
