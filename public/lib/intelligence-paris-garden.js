// Development Intelligence - 1-5 Paris Garden and 16-19 Hatfields, Paris Garden, South Bank, SE1 8ND
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.106761, 51.506386], [-0.106039, 51.506386], [-0.106039, 51.507014], [-0.106761, 51.507014], [-0.106761, 51.506386]],
  site: "1-5 Paris Garden and 16-19 Hatfields",
  borough: 'Southwark', use: 'office', address: "Paris Garden, South Bank, SE1 8ND",
  plot_area_m2: 3500, existing_gea_m2: 5000,
  existing_floors: 5, existing_height_m: 21.0,
  ftf_m: 4.0, max_height_m: 56.0, max_floors: 14,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 21.0, insight: "South Bank office at 21m. One Blackfriars at 50F 200m south. Sea Containers at 14F adjacent. 14F easily justified." },
    value: { label: 'Rent Headroom', score: 9.0, weight: 2.0, insight: "South Bank/Blackfriars address. Grade A office at \u00a380-90/sqft. Residential at \u00a31,200-1,600/sqft. Premium London address." },
    momentum: { label: 'Planning Tailwind', score: 8.5, weight: 2.0,
      precedents: [{"name":"240 Blackfriars Road","ref":"Southwark ref 11/AP/2700","desc":"27F mixed-use, 300m east. Height precedent."},{"name":"One Blackfriars","ref":"Southwark ref 11/AP/2927","desc":"50F/163m residential. 200m south. Maximum height precedent for this micro-area."}],
      insight: "South Bank/Blackfriars corridor. OA + CAZ adjacent. Maximum developer activity." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "South Bank is design-led. ITV/IBM South Bank heritage. LVMF views possible. Design quality is the currency." },
    acquisition: { label: 'Title Stack', score: 6.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "South Bank office - institutional freehold. Premium pricing reflects development potential." },
    transport: { label: 'Station Gravity', score: 9.5, weight: 0.5, ptal: '6a', insight: "PTAL 6a. Blackfriars (Elizabeth/Thameslink) 200m. Waterloo 400m. Southwark 500m. Exceptional." }
  }
};
