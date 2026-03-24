// Development Intelligence - 7-14 Great Dover Street, 7-14 Great Dover Street, Borough, SE1 4YR
// EPC: 3804m² GIA, Band E | HMLR: PENDING
// Polygon: approx 3500m² (OSM lookup pending)
const SITE_INTELLIGENCE = {
  polygon: [[-0.094551, 51.500312], [-0.094389, 51.500187], [-0.094184, 51.500071], [-0.09413, 51.5001], [-0.0937, 51.499881], [-0.093605, 51.499879], [-0.092702, 51.500373], [-0.092683, 51.500418], [-0.09283, 51.500646], [-0.09291, 51.500794], [-0.093086, 51.501092], [-0.093206, 51.501085], [-0.093699, 51.500801], [-0.093859, 51.500715], [-0.094562, 51.500369], [-0.094551, 51.500312]],
  site: "7-14 Great Dover Street",
  borough: 'Southwark', use: 'office', address: "7-14 Great Dover Street, Borough, SE1 4YR",
  plot_area_m2: 3500, existing_gea_m2: 3804,
  existing_floors: 4, existing_height_m: 18.0,
  ftf_m: 4.0, max_height_m: 52.0, max_floors: 13,
  hmlr_title: null, owner: null, epc_rating: 'E',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 18.0, insight: "EPC Band E office at 18m in the Borough corridor. Southwark CAZ-adjacent with Borough station 400m. 13F potential given comparable height approvals within 300m." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Grade D/E office in Borough is prime for refurb or redevelopment. Borough residential at \u00a3800-950/sqft. New-build 13F generates \u00a350-65M GDV on this footprint." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"Aylesbury Estate regeneration","ref":"Southwark ref 10/AP/1764","desc":"Major regeneration, SE17. 2.5km south. Establishes Southwark commitment to residential intensification."},{"name":"Borough High Street mixed-use","ref":"Southwark ref 19/AP/2300","desc":"8F residential above commercial, Borough High Street. 200m west. Direct height precedent."}],
      insight: "Borough/London Bridge corridor has strong planning momentum. 65 planning apps over site history. Close to 185 Park Street and Colechurch House which have higher activity - this site sits in their planning shadow." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Borough High Street Conservation Area 200m west. Southwark Cathedral (Grade I) 500m. Heritage sensitivity present - design quality required. Not a fatal constraint." },

    heritage_framework: {
      tier: 'manageable',
      score: 7.0,
      verdict: 'Conservation area setting. Heritage Impact Assessment required. Design must respond to context. LPA design scrutiny heightened.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 7.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Commercial office block - likely institutional or private freehold. EPC Band E suggests ageing stock with motivated seller. Clean single freehold probable." },
    transport: { label: 'Transport Links', score: 8.5, weight: 0.5, ptal: '5', insight: "PTAL 5. Borough (Northern) 400m. London Bridge (multiple Tube + Rail) 600m. Elephant & Castle (Northern/Bakerloo) 700m. Very good transport." }
  }
};
