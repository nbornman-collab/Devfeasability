// Development Intelligence - Bath Trading Estate, Grange Walk, Bermondsey, SE1 3EW
// EPC GEA: PLACEHOLDER - verify via EPC API before client use
// HMLR: PENDING | Polygon: approx 8000m²
const SITE_INTELLIGENCE = {
  polygon: [[-0.067455, 51.490628], [-0.067446, 51.49066], [-0.066945, 51.490609], [-0.06696, 51.490551], [-0.066908, 51.490546], [-0.066914, 51.490525], [-0.066899, 51.490523], [-0.066996, 51.490161], [-0.067258, 51.490189], [-0.06724, 51.490257], [-0.067059, 51.490239], [-0.067044, 51.490294], [-0.067069, 51.490296], [-0.067, 51.490552], [-0.067449, 51.4906], [-0.067529, 51.490274], [-0.067364, 51.490258], [-0.067379, 51.490203], [-0.067656, 51.490232], [-0.067636, 51.490304], [-0.067675, 51.490308], [-0.067601, 51.490585], [-0.067543, 51.490579], [-0.067528, 51.490636], [-0.067455, 51.490628]],
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
    acquisition: { label: 'Title Stack', score: 6.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Trading estate - likely multiple industrial unit leaseholders. Single freeholder probable." },
    transport: { label: 'Station Gravity', score: 8.0, weight: 0.5, ptal: '4', insight: "PTAL 4. Bermondsey (Jubilee) 500m. London Bridge 1km. Good inner SE1 transport." }
  }
};
