// Development Intelligence - Decathlon Site and Mulberry Business Park, Old Kent Road, SE15 4JG
// EPC GEA: PLACEHOLDER - verify via EPC API before client use
// HMLR: PENDING | Polygon: approx 48700m²
const SITE_INTELLIGENCE = {
  polygon: [[-0.0721, 51.453148], [-0.06931, 51.453148], [-0.06931, 51.455408], [-0.0721, 51.455408], [-0.0721, 51.453148]],
  site: "Decathlon Site and Mulberry Business Park",
  borough: 'Southwark', use: 'industrial', address: "Old Kent Road, SE15 4JG",
  plot_area_m2: 48700, existing_gea_m2: 15000,
  existing_floors: 2, existing_height_m: 6.0,
  ftf_m: 3.5, max_height_m: 49.0, max_floors: 14,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 6.0, insight: "Massive 4.87ha OKR site at 6m - one of the largest candidate plots in the set. OKR OA designation explicitly supports tall buildings to 25-35F. Decathlon is an active retailer - vacant possession requires lease expiry or negotiated surrender." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Retail warehouse at below-market land value. OKR residential OA designation transforms the value equation. At \u00a35,500-6,500/m\u00b2 residential NSA, a 14F scheme on 4.87ha generates GDV of \u00a3200M+ - the largest potential scheme in the candidate set." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"Malt Street OKR","ref":"Southwark ref 17/AP/3885","desc":"34F residential + commercial, OKR. Major height precedent for OKR corridor."},{"name":"OKR Opportunity Area OAPF","ref":"London Plan 2021 Policy SD1","desc":"OKR OA formally targets 20,000+ homes and major commercial development. Decathlon site sits within the OA boundary."}],
      insight: "OKR is the single most active development corridor in south London. OA designation + OAPF + multiple consented towers within 500m. This is the highest-momentum non-SE1 site in the Southwark candidate pool." },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: "OKR industrial/retail strip - no heritage constraints whatsoever. Maximum heritage freedom." },
    acquisition: { label: 'Title Stack', score: 5.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Decathlon (French retailer) likely tenanted under a property company freehold. Large retail warehouse sites are routinely brought forward for development at lease end. 85 planning apps suggests long-standing developer interest but complex." },
    transport: { label: 'Station Gravity', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Bus-served OKR. Proposed Bakerloo Line Extension adds station 500m. If BLE delivered: score upgrades to PTAL 6. Currently the weakest transport score in the SE1 tier - compensated by land size." }
  }
};
