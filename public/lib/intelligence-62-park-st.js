// Development Intelligence - 62-67 Park Street, 62-67 Park Street, Bankside, SE1 9AS
// EPC: 6000m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.097509, 51.507243], [-0.096691, 51.507243], [-0.096691, 51.507957], [-0.097509, 51.507957], [-0.097509, 51.507243]],
  site: "62-67 Park Street",
  borough: 'Southwark', use: 'office', address: "62-67 Park Street, Bankside, SE1 9AS",
  plot_area_m2: 4500, existing_gea_m2: 6000,
  existing_floors: 5, existing_height_m: 21.0,
  ftf_m: 4.0, max_height_m: 60.0, max_floors: 15,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 21.0, insight: "Bankside at 21m/6F between Tate Modern and the Thames. 77 major area applications - one of the most scrutinised addresses in Southwark. 15F would be conservative for this location." },
    value: { label: 'Rent Headroom', score: 9.0, weight: 2.0, insight: "Bankside riverside address - among the highest values in London. Residential at \u00a31,400-1,800/sqft. Even Grade A office commands \u00a385-95/sqft." },
    momentum: { label: 'Planning Tailwind', score: 9.0, weight: 2.0,
      precedents: [{"name":"One Bankside","ref":"Southwark ref 16/AP/3450","desc":"10F luxury residential, Bankside. 150m east. Direct height/value precedent."},{"name":"Bankside 123 (Stanhope)","ref":"Southwark ref 12/AP/1482","desc":"10F CAZ office, 200m south. Confirms commercial intensification at Bankside address."}],
      insight: "OA + CAZ + Tate Modern adjacency = maximum momentum. 77 major apps in the area. Every major London developer knows this address." },
    heritage: { label: 'Heritage Shadow', score: 6.5, weight: 1.5, insight: "Bankside Conservation Area. Tate Modern (listed). Shakespeare Globe (Grade I) 200m. Heritage is a real constraint - but not fatal. Design quality is the currency." },
    acquisition: { label: 'Title Stack', score: 5.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Bankside address - institutional freehold. 77 major area apps confirms intense developer interest. High acquisition price reflecting development potential." },
    transport: { label: 'Station Gravity', score: 9.5, weight: 0.5, ptal: '6a', insight: "PTAL 6a. Blackfriars (Elizabeth/Thameslink) 300m. Southwark (Jubilee) 400m. London Bridge 700m. Waterloo 800m." }
  }
};
