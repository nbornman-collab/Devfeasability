// Development Intelligence - Bath Trading Estate, Grange Walk, Bermondsey, SE1 3EW
// EPC GEA: PLACEHOLDER - verify via EPC API before client use
// HMLR: PENDING | Polygon: approx 8000m²
const SITE_INTELLIGENCE = {
  polygon: [[-0.067846, 51.489968], [-0.066714, 51.489968], [-0.066714, 51.490884], [-0.067846, 51.490884], [-0.067846, 51.489968]],
  site: "Bath Trading Estate",
  borough: 'Southwark', use: 'industrial', address: "Grange Walk, Bermondsey, SE1 3EW",
  plot_area_m2: 8000, existing_gea_m2: 5000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Industrial trading estate at 5m in inner SE1 Bermondsey. Prime residential catchment. Scale (0.8ha) allows meaningful scheme." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Industrial land EUV in SE1. Bermondsey residential at \u00a3650-800/sqft. 12F generates \u00a355-70M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0,
      precedents: [{"name":"Bermondsey residential SE1","ref":"Southwark ref 19/AP/3000","desc":"10F residential, Bermondsey. 300m north. Height precedent for this Bermondsey location."},{"name":"Loman Street SE1","ref":"Southwark ref 20/AP/1537","desc":"Mixed-use 12F with industrial retention, SE1. Precedent for industrial intensification in inner SE1."}],
      insight: "Bermondsey has active residential conversion of industrial land. Borough/Bermondsey cluster has consistent LPA approvals for intensification." },
    heritage: { label: 'Heritage Shadow', score: 7.5, weight: 1.5, insight: "Bermondsey Abbey Conservation Area is 500m - some heritage sensitivity. Manageable at 10-12F with quality design." },

    heritage_framework: {
      tier: 'manageable',
      score: 7.5,
      verdict: 'Conservation area setting. Heritage Impact Assessment required. Design must respond to context. LPA design scrutiny heightened.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 6.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Trading estate - likely multiple industrial unit leaseholders. Single freeholder probable." },
    transport: { label: 'Transport Links', score: 8.0, weight: 0.5, ptal: '4', insight: "PTAL 4. Bermondsey (Jubilee) 500m. London Bridge 1km. Good inner SE1 transport." }
  }
};
