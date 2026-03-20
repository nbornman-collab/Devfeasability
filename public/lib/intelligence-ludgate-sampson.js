// Development Intelligence - Ludgate House and Sampson House, 64 Hopton Street, South Bank, SE1 9JH
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.08071, 51.526855], [-0.07969, 51.526855], [-0.07969, 51.527745], [-0.08071, 51.527745], [-0.08071, 51.526855]],
  site: "Ludgate House and Sampson House",
  borough: 'Southwark', use: 'office', address: "64 Hopton Street, South Bank, SE1 9JH",
  plot_area_m2: 7000, existing_gea_m2: 15000,
  existing_floors: 6, existing_height_m: 24.0,
  ftf_m: 4.0, max_height_m: 65.0, max_floors: 16,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.0, weight: 2.5, existing_m: 24.0, insight: "Major South Bank office at 24m. One Blackfriars at 50F 100m east. South Bank Tower at 41F 150m west. 16F is conservative for this address." },
    value: { label: 'Rent Headroom', score: 9.5, weight: 2.0, insight: "South Bank/Blackfriars Road. Premium London address. Residential at \u00a31,200-1,600/sqft. 16F on 0.7ha generates \u00a3100-140M GDV." },
    momentum: { label: 'Planning Tailwind', score: 9.0, weight: 2.0,
      precedents: [{"name":"One Blackfriars","ref":"Southwark ref 11/AP/2927","desc":"50F/163m. 100m east. Maximum height."},{"name":"South Bank Tower","ref":"Southwark ref 14/AP/3500","desc":"41F residential conversion. 150m west."}],
      insight: "South Bank/Blackfriars. OA + CAZ adjacent. ITV, IBM South Bank cluster. Maximum momentum." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "South Bank cultural quarter. Some heritage. Design-led context." },

    heritage_framework: {
      tier: 'manageable',
      score: 7.0,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 5.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Major office complex. Institutional freehold. Already subject to planning applications." },
    transport: { label: 'Station Gravity', score: 9.5, weight: 0.5, ptal: '6a', insight: "PTAL 6a. Blackfriars 100m. Southwark (Jubilee) 300m. Waterloo 400m. Exceptional." }
  }
};
