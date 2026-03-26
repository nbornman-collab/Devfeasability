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
      tier: 'CONTEXTUAL',
      score: 7.5,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 5.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Dulwich Hamlet FC - community/semi-professional club. Stadium redevelopment requires club agreement and community consultation. Politically complex. Score reflects acquisition risk." },
    transport: { label: 'Transport Links', score: 6.0, weight: 0.5, ptal: '2', insight: "PTAL 2. East Dulwich station 500m. Bus-served. Lower transport - residential appropriate."  }
  },
  // -- ENVIRONMENTAL & REGULATORY SCREENING --
  environment: {
    flood_zone: 1,
    surface_water_risk: 'low',
    historic_landfill: false,
    contamination_screening: 'low',
    strategic_noise: 'moderate',
    air_quality: { aqma: true, aqma_name: 'Southwark AQMA (borough-wide)', note: 'Borough-wide AQMA. Standard for inner London. Not a material cost uplift for commercial schemes.' }
  },
  ecology: {
    bng_mandatory: true,
    bng_note: 'Mandatory BNG (10% uplift) applies to all new permissions from Feb 2024. Urban site - likely low habitat baseline. Off-site credits or statutory credits. Cost estimate: £20-80K.',
    bng_cost_estimate_low: 20000,
    bng_cost_estimate_high: 80000,
    tpo_on_site: false,
    tpo_adjacent: false,
    protected_species_risk: 'low'
  },
  sustainability: {
    wlc_required: false,
    wlc_note: 'Whole Life-Cycle Carbon Assessment required for GLA-referable schemes. GLA WLC Guidance (March 2022) applies.',
    circular_economy_required: false,
    circular_economy_note: 'Circular Economy Statement required for referable schemes. GLA CES Guidance applies.',
    energy_planning: { breeam_target: 'Excellent', breeam_cost_uplift_per_sqm: 50, note: 'BREEAM Excellent target for OA/major schemes.' }
  },
  delivery: {
    fire_statement_required: true,
    fire_statement_note: 'London Plan Policy D12 - required for all major developments.',
    bsr_gateway: false,
    gla_referral: false,
    pre_commencement_gates: ['BNG plan approval', 'Construction Management Plan', 'Fire Strategy (detail)'],
    estimated_pre_app_cost: { low: 40000, high: 100000 },
    estimated_planning_duration_months: { low: 6, high: 12 }
  }

};