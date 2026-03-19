// Development Intelligence - Blackpool Road Business Park, Blackpool Road, Peckham, SE15 4HH
// EPC GEA: PLACEHOLDER - verify via EPC API before client use
// HMLR: PENDING | Polygon: approx 17600m²
const SITE_INTELLIGENCE = {
  polygon: [[-0.102395, 51.497829], [-0.102142, 51.497955], [-0.102103, 51.497924], [-0.102083, 51.497934], [-0.102039, 51.4979], [-0.102056, 51.497892], [-0.101802, 51.497693], [-0.101769, 51.497709], [-0.101633, 51.497604], [-0.101671, 51.497585], [-0.101599, 51.497529], [-0.101926, 51.497366], [-0.101842, 51.497301], [-0.102087, 51.497179], [-0.10217, 51.497243], [-0.102485, 51.497087], [-0.102576, 51.497158], [-0.102604, 51.497144], [-0.102735, 51.497246], [-0.10271, 51.497259], [-0.103155, 51.497606], [-0.103177, 51.497595], [-0.103262, 51.497662], [-0.102844, 51.49787], [-0.10274, 51.497789], [-0.102499, 51.497909], [-0.102395, 51.497829]],
  site: "Blackpool Road Business Park",
  borough: 'Southwark', use: 'industrial', address: "Blackpool Road, Peckham, SE15 4HH",
  plot_area_m2: 17600, existing_gea_m2: 8000,
  existing_floors: 2, existing_height_m: 6.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 6.0, insight: "Large 1.76ha industrial park at 6m - significant underutilisation. Peckham/New Cross residential corridor supports 8-12F. Scale allows phased delivery." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Industrial land EUV in SE15. Residential at \u00a3550-650/sqft. 12F scheme on 1.76ha generates \u00a370-95M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0,
      precedents: [{"name":"Peckham Place residential","ref":"Southwark ref 17/AP/4200","desc":"10F residential, SE15. 600m north. Height precedent for Peckham corridor."},{"name":"Surrey Canal Road","ref":"Southwark ref 13/AP/3096","desc":"Industrial-to-residential, 0.8ha SE15. Conversion precedent for industrial land in this catchment."}],
      insight: "SE15 has active residential intensification of industrial land. No OA but Southwark Local Plan positively supports intensification of surplus industrial land." },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: "SE15 industrial zone - no heritage constraints." },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Business park - likely multiple leaseholders under single freeholder. Assembly required." },
    transport: { label: 'Station Gravity', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Peckham Rye station 800m. Bus-served. Acceptable for residential." }
  }
};
