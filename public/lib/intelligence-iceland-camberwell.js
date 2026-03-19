// Development Intelligence - Iceland, 118-132 Camberwell Road, 118-132 Camberwell Road, SE5 0EE
// EPC: 1500m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.095086, 51.480251], [-0.094514, 51.480251], [-0.094514, 51.480749], [-0.095086, 51.480749], [-0.095086, 51.480251]],
  site: "Iceland, 118-132 Camberwell Road",
  borough: 'Southwark', use: 'commercial', address: "118-132 Camberwell Road, SE5 0EE",
  plot_area_m2: 2200, existing_gea_m2: 1500,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 28.0, max_floors: 8,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Retail at 5m on Camberwell Road. High street site with 8F residential potential." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Iceland supermarket - retail at low yield. Camberwell residential at \u00a3600-700/sqft. 8F generates \u00a310-14M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0,
      precedents: [{"name":"Camberwell Road residential","ref":"Southwark ref 20/AP/1200","desc":"8F residential, Camberwell. 300m south. Height precedent."},{"name":"Walworth Road SE17","ref":"Southwark ref 19/AP/2800","desc":"8F residential above commercial. 500m north. Confirms corridor approach."}],
      insight: "Camberwell corridor. LPA supports high street intensification." },
    heritage: { label: 'Heritage Shadow', score: 8.0, weight: 1.5, insight: "Camberwell Green Conservation Area 300m. Manageable." },
    acquisition: { label: 'Title Stack', score: 7.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Iceland lease under property freeholder. National retailer can relocate." },
    transport: { label: 'Station Gravity', score: 7.5, weight: 0.5, ptal: '4', insight: "PTAL 4. Denmark Hill 600m. E&C 1km. Good bus connectivity." }
  }
};
