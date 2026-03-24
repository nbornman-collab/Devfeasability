// Development Intelligence - 275 Borough High Street, 275 Borough High Street, SE1 1JE
// EPC: 3772m² GIA, Band E | HMLR: PENDING
// Polygon: approx 3800m² (OSM lookup pending)
const SITE_INTELLIGENCE = {
  polygon: [[-0.094976, 51.499272], [-0.094224, 51.499272], [-0.094224, 51.499928], [-0.094976, 51.499928], [-0.094976, 51.499272]],
  site: "275 Borough High Street",
  borough: 'Southwark', use: 'office', address: "275 Borough High Street, SE1 1JE",
  plot_area_m2: 3800, existing_gea_m2: 3772,
  existing_floors: 4, existing_height_m: 18.0,
  ftf_m: 4.0, max_height_m: 50.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'E',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 18.0, insight: "Education/institutional at 18m in the CAZ on Borough High Street. The Shard at 95F is 400m north - this site is in the single most height-permissive address in London. Even a modest 12F is conservative here." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "CAZ Borough High Street address. Grade A office at \u00a380-90/sqft. Borough high street residential at \u00a3900-1,100/sqft. CAZ designation enables premium commercial rents." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"Hop Exchange redevelopment SE1","ref":"Southwark ref 14/AP/2800","desc":"9F office, Borough High Street. 200m north. Direct height precedent on the same street."},{"name":"One The Elephant","ref":"Southwark ref 12/AP/1562","desc":"37F residential, Elephant & Castle approach. Establishes tall building precedent on the Borough/E&C corridor."}],
      insight: "CAZ + Borough High Street + Shard proximity = maximum planning tailwind for commercial. Education use (EPC Band E) signals an institutional user, not active developer. This is a sleeping asset." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Borough High Street Conservation Area. Southwark Cathedral 400m. George Inn (Grade I) 100m north - direct heritage neighbour. Design quality critical. LVMF views analysis likely required." },

    heritage_framework: {
      tier: 'manageable',
      score: 7.0,
      verdict: 'Conservation area setting. Heritage Impact Assessment required. Design must respond to context. LPA design scrutiny heightened.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 7.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Education institution - university or similar. Institutional disposal requires board approval but achievable. EPC Band E motivates disposal." },
    transport: { label: 'Transport Links', score: 9.0, weight: 0.5, ptal: '5', insight: "PTAL 5. Borough (Northern) 200m. London Bridge 500m. Waterloo 1km. Excellent Borough High Street connectivity." }
  }
};
