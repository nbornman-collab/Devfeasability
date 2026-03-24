// Development Intelligence - Land between Great Suffolk Street and Glasshill Street, Great Suffolk Street, SE1 0BL
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.100934, 51.501509], [-0.100266, 51.501509], [-0.100266, 51.502091], [-0.100934, 51.502091], [-0.100934, 51.501509]],
  site: "Land between Great Suffolk Street and Glasshill Street",
  borough: 'Southwark', use: 'office', address: "Great Suffolk Street, SE1 0BL",
  plot_area_m2: 3000, existing_gea_m2: 4000,
  existing_floors: 4, existing_height_m: 18.0,
  ftf_m: 4.0, max_height_m: 48.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 18.0, insight: "Office at 18m between Blackfriars and Borough. 12F achievable." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Inner SE1 office. Grade A at \u00a375-85/sqft." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"240 Blackfriars Road","ref":"Southwark ref 11/AP/2700","desc":"27F, 200m west."},{"name":"Bankside 123","ref":"Southwark ref 12/AP/1482","desc":"10F CAZ office, 300m north."}],
      insight: "Bankside/Borough corridor. Active development market." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Some heritage. Manageable." },

    heritage_framework: {
      tier: 'manageable',
      score: 7.0,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 7.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Office. Institutional freehold." },
    transport: { label: 'Transport Links', score: 9.0, weight: 0.5, ptal: '5', insight: "PTAL 5. Southwark (Jubilee) 300m. Waterloo 600m." }
  }
};
