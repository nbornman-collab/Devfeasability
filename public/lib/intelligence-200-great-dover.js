// Development Intelligence - 200 Great Dover Street, 200 Great Dover Street, Borough, SE1 4YB
// EPC: 4063m² GIA, Band D | HMLR: PENDING
// Polygon: approx 4200m² (OSM lookup pending)
const SITE_INTELLIGENCE = {
  polygon: [[-0.092495, 51.500556], [-0.091705, 51.500556], [-0.091705, 51.501244], [-0.092495, 51.501244], [-0.092495, 51.500556]],
  site: "200 Great Dover Street",
  borough: 'Southwark', use: 'office', address: "200 Great Dover Street, Borough, SE1 4YB",
  plot_area_m2: 4200, existing_gea_m2: 4063,
  existing_floors: 4, existing_height_m: 18.0,
  ftf_m: 4.0, max_height_m: 52.0, max_floors: 13,
  hmlr_title: null, owner: null, epc_rating: 'D',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 18.0, insight: "Band D office at 18m on Great Dover Street. Adjacent 10F residential consent 100m east makes 13F very achievable here. Underutilised on a well-served Borough plot." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Band D offices - aging stock in SE1. Borough residential at \u00a3800-950/sqft. 13F scheme on 4,200m\u00b2 plot generates \u00a355-70M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"Great Dover Street residential","ref":"Southwark ref 21/AP/1800","desc":"10F residential, Great Dover Street. 100m east. Adjacent height precedent."},{"name":"Borough High Street offices","ref":"Southwark ref 17/AP/2100","desc":"9F office, Borough corridor. Confirms commercial intensification in this sub-area."}],
      insight: "Great Dover Street regeneration corridor. Adjacent 10F consent creates immediate height precedent. Borough LPA track record: consistent approval of 8-12F residential in this area." },
    heritage: { label: 'Heritage Shadow', score: 7.5, weight: 1.5, insight: "No conservation area on Great Dover Street. Modest heritage profile - manageable at 12-13F with quality design." },
    acquisition: { label: 'Title Stack', score: 7.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Office block - likely single corporate freeholder or property investor. EPC Band D suggests motivated seller. Clean acquisition route probable." },
    transport: { label: 'Station Gravity', score: 8.5, weight: 0.5, ptal: '5', insight: "PTAL 5. Borough (Northern) 500m. London Bridge 700m. Elephant & Castle 600m." }
  }
};
