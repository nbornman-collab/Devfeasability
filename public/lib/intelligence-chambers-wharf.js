// Development Intelligence - Chambers Wharf, Chambers Street, Bermondsey, SE16 4TU
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.033968, 51.511318], [-0.032632, 51.511318], [-0.032632, 51.512482], [-0.033968, 51.512482], [-0.033968, 51.511318]],
  site: "Chambers Wharf",
  borough: 'Southwark', use: 'industrial', address: "Chambers Street, Bermondsey, SE16 4TU",
  plot_area_m2: 12000, existing_gea_m2: 5000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Thames riverside industrial at 5m. 1.2ha riverside plot. 12F residential potential." },
    value: { label: 'Rent Headroom', score: 9.0, weight: 2.0, insight: "Riverside land. SE16 riverside resi at \u00a3900-1,200/sqft. 12F on 1.2ha generates \u00a380-120M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"Bermondsey riverside residential","ref":"Southwark ref 19/AP/3200","desc":"12F residential on riverside. Height precedent."},{"name":"Tower Bridge Quarter","ref":"Southwark ref 15/AP/2800","desc":"Mixed-use, SE1/SE16 border. Confirms riverside intensification."}],
      insight: "Thames riverside. LPA supports riverside residential." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Bermondsey riverside. Tower Bridge 500m. Heritage sensitivity but manageable." },

    heritage_framework: {
      tier: 'manageable',
      score: 7.0,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 5.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Industrial land - Thames Tideway Tunnel site? Check status. Potentially complex." },
    transport: { label: 'Station Gravity', score: 6.5, weight: 0.5, ptal: '3', insight: "PTAL 3. Bermondsey (Jubilee) 600m. Bus-served." }
  }
};
