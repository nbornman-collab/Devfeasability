// Development Intelligence - Land between Melior Street and St Thomas Street, Melior Street, London Bridge, SE1 3QP
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.127986, 51.506964], [-0.127214, 51.506964], [-0.127214, 51.507636], [-0.127986, 51.507636], [-0.127986, 51.506964]],
  site: "Land between Melior Street and St Thomas Street",
  borough: 'Southwark', use: 'office', address: "Melior Street, London Bridge, SE1 3QP",
  plot_area_m2: 4000, existing_gea_m2: 5000,
  existing_floors: 4, existing_height_m: 18.0,
  ftf_m: 4.0, max_height_m: 56.0, max_floors: 14,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 18.0, insight: "London Bridge address at 18m. The Shard at 310m is 300m away. Even 14F is modest here." },
    value: { label: 'Rent Headroom', score: 9.5, weight: 2.0, insight: "London Bridge Grade A office at \u00a390-100/sqft. Residential at \u00a31,200-1,600/sqft. Top-tier London address." },
    momentum: { label: 'Planning Tailwind', score: 9.0, weight: 2.0,
      precedents: [{"name":"The Shard (Sellar)","ref":"Southwark ref 05/AP/0174","desc":"95F/310m, London Bridge. 300m south. Maximum height precedent."},{"name":"London Bridge Station Development","ref":"Southwark ref 09/AP/1800","desc":"Major mixed-use, London Bridge. Adjacent."}],
      insight: "London Bridge OA + CAZ. Maximum planning momentum." },
    heritage: { label: 'Heritage Shadow', score: 6.5, weight: 1.5, insight: "Southwark Cathedral (Grade I) 200m. London Bridge Conservation Area. Heritage is real but manageable with quality." },

    heritage_framework: {
      tier: 'manageable',
      score: 6.5,
      verdict: 'Southwark Cathedral (GrI) 200m. London Bridge Conservation Area. Close proximity to Grade I - heritage consultant required. Scheme must demonstrate positive heritage contribution.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 5.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Inner London Bridge address. Institutional freehold. Premium pricing." },
    transport: { label: 'Transport Links', score: 10.0, weight: 0.5, ptal: '6b', insight: "PTAL 6b. London Bridge station 200m. Exceptional." }
  }
};
