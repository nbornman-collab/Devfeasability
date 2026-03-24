// Development Intelligence - Dulwich Hamlet Champion Hill Stadium, Dog Kennel Hill, East Dulwich, SE22 8BB
// EPC: 5000m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.083346, 51.462849], [-0.081854, 51.462849], [-0.081854, 51.464151], [-0.083346, 51.464151], [-0.083346, 51.462849]],
  site: "Dulwich Hamlet Champion Hill Stadium",
  borough: 'Southwark', use: 'commercial', address: "Dog Kennel Hill, East Dulwich, SE22 8BB",
  plot_area_m2: 15000, existing_gea_m2: 5000,
  existing_floors: 2, existing_height_m: 8.0,
  ftf_m: 3.5, max_height_m: 28.0, max_floors: 8,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.0, weight: 2.5, existing_m: 8.0, insight: "1.5ha stadium site at 8m. Football ground redevelopment is achievable with relocated/integrated stadium. East Dulwich context supports 6-8F." },
    value: { label: 'Rent Headroom', score: 7.5, weight: 2.0, insight: "Football stadium land - below-market yield. East Dulwich residential at \u00a3700-850/sqft. 8F on 1.5ha generates \u00a360-80M GDV." },
    momentum: { label: 'Planning Tailwind', score: 6.5, weight: 2.0,
      precedents: [{"name":"East Dulwich residential SE22","ref":"Southwark ref 20/AP/2400","desc":"7F residential, East Dulwich. 400m east. Height precedent."},{"name":"Dulwich Hospital conversion","ref":"Southwark ref 16/AP/4200","desc":"Healthcare-to-residential, SE22. Confirms LPA appetite for institutional site conversion in this catchment."}],
      insight: "Football stadium redevelopment is politically complex but Southwark has approved comparable schemes. Community engagement critical. Mixed-use with retained stadium is the viable route." },
    heritage: { label: 'Heritage Shadow', score: 7.5, weight: 1.5, insight: "Champion Hill has local sporting heritage. Victorian terraces nearby. Heritage manageable at 6-8F." },

    heritage_framework: {
      tier: 'manageable',
      score: 7.5,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 5.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Dulwich Hamlet FC - community/semi-professional club. Stadium redevelopment requires club agreement and community consultation. Politically complex. Score reflects acquisition risk." },
    transport: { label: 'Transport Links', score: 6.0, weight: 0.5, ptal: '2', insight: "PTAL 2. East Dulwich station 500m. Bus-served. Lower transport - residential appropriate." }
  }
};
