// Development Intelligence - 63-85 Newington Causeway, 63-85 Newington Causeway, SE1 6BN
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.098489, 51.498066], [-0.099081, 51.498304], [-0.09935, 51.498661], [-0.099381, 51.49869], [-0.099349, 51.498719], [-0.099369, 51.498795], [-0.098247, 51.49887], [-0.097889, 51.498894], [-0.0977, 51.498831], [-0.097662, 51.498839], [-0.09779, 51.498669], [-0.09806, 51.498548], [-0.098128, 51.498434], [-0.098258, 51.498342], [-0.098489, 51.498066]],
  site: "63-85 Newington Causeway",
  borough: 'Southwark', use: 'office', address: "63-85 Newington Causeway, SE1 6BN",
  plot_area_m2: 4500, existing_gea_m2: 6000,
  existing_floors: 5, existing_height_m: 21.0,
  ftf_m: 4.0, max_height_m: 52.0, max_floors: 13,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 21.0, insight: "Office at 21m on Newington Causeway. Strata at 43F and One The Elephant at 37F within 200m. 13F is conservative." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Newington Causeway office. E&C resi at \u00a3800-950/sqft. 13F generates \u00a340-55M GDV." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"One The Elephant","ref":"Southwark ref 12/AP/1562","desc":"37F residential, E&C. Adjacent."},{"name":"Strata SE1","ref":"Southwark ref 06/AP/0164","desc":"43F residential, E&C. Height precedent for this node."}],
      insight: "E&C regeneration core. Maximum planning momentum." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "E&C. Some heritage at edge. Manageable." },

    heritage_framework: {
      tier: 'manageable',
      score: 7.0,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 7.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Office block. Institutional freehold." },
    transport: { label: 'Station Gravity', score: 8.5, weight: 0.5, ptal: '5', insight: "PTAL 5. E&C (Northern/Bakerloo) 100m. Excellent." }
  }
};
