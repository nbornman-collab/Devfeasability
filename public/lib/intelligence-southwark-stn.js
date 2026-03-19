// Development Intelligence - Southwark Station and 1 Joan Street, 1 Joan Street, Southwark, SE1 8DA
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.115034, 51.521109], [-0.114366, 51.521109], [-0.114366, 51.521691], [-0.115034, 51.521691], [-0.115034, 51.521109]],
  site: "Southwark Station and 1 Joan Street",
  borough: 'Southwark', use: 'office', address: "1 Joan Street, Southwark, SE1 8DA",
  plot_area_m2: 3000, existing_gea_m2: 4000,
  existing_floors: 4, existing_height_m: 18.0,
  ftf_m: 4.0, max_height_m: 52.0, max_floors: 13,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 18.0, insight: "Office at 18m above Southwark station. Direct station oversite development potential. 13F achievable." },
    value: { label: 'Rent Headroom', score: 9.0, weight: 2.0, insight: "Jubilee line station oversite. Premium SE1 address. Office \u00a380-90/sqft." },
    momentum: { label: 'Planning Tailwind', score: 8.5, weight: 2.0,
      precedents: [{"name":"240 Blackfriars Road","ref":"Southwark ref 11/AP/2700","desc":"27F, 200m east."},{"name":"Sea Containers House","ref":"Southwark ref 16/AP/4200","desc":"14F, South Bank. Height precedent."}],
      insight: "Station oversite development is TfL priority. Maximum planning momentum." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "South Bank area. Some heritage. Manageable." },
    acquisition: { label: 'Title Stack', score: 5.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "TfL/Network Rail. Station oversite requires transport authority agreement. Complex." },
    transport: { label: 'Station Gravity', score: 10.0, weight: 0.5, ptal: '6b', insight: "PTAL 6b. Southwark (Jubilee) 0m - direct station oversite. Waterloo 300m. Exceptional." }
  }
};
