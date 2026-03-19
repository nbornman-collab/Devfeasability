// Development Intelligence - Great Suffolk Street and Ewer Street, Great Suffolk Street, Bankside, SE1 0NS
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.100986, 51.501464], [-0.100214, 51.501464], [-0.100214, 51.502136], [-0.100986, 51.502136], [-0.100986, 51.501464]],
  site: "Great Suffolk Street and Ewer Street",
  borough: 'Southwark', use: 'office', address: "Great Suffolk Street, Bankside, SE1 0NS",
  plot_area_m2: 4000, existing_gea_m2: 5000,
  existing_floors: 4, existing_height_m: 18.0,
  ftf_m: 4.0, max_height_m: 52.0, max_floors: 13,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 18.0, insight: "Office at 18m between Blackfriars Road and Borough. 240 Blackfriars at 27F 200m west sets height context. 13F achievable." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Inner SE1 office. Grade A at \u00a375-85/sqft. Or residential at \u00a3900-1,100/sqft. Premium Bankside-adjacent address." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"240 Blackfriars Road","ref":"Southwark ref 11/AP/2700","desc":"27F mixed-use, 200m west. Major height precedent."},{"name":"Bankside 123","ref":"Southwark ref 12/AP/1482","desc":"10F office, 300m north. CAZ commercial intensification."}],
      insight: "Bankside/Borough corridor. CAZ-adjacent. Active developer market." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Borough High Street Conservation Area 400m. Some heritage. Manageable." },
    acquisition: { label: 'Title Stack', score: 6.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Office block - institutional. Standard disposal." },
    transport: { label: 'Station Gravity', score: 9.0, weight: 0.5, ptal: '5', insight: "PTAL 5. Southwark (Jubilee) 300m. Waterloo 600m. Blackfriars 500m. Excellent." }
  }
};
