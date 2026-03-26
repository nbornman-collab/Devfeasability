// Development Intelligence - 4-12 Albany Road, 4-12 Albany Road, Walworth, SE5 0AB
// EPC: 1200m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.094457, 51.482934], [-0.094426, 51.482374], [-0.094358, 51.482356], [-0.093961, 51.482367], [-0.094071, 51.48299], [-0.09443, 51.482968], [-0.094457, 51.482934]],
  site: "4-12 Albany Road",
  borough: 'Southwark', use: 'commercial', address: "4-12 Albany Road, Walworth, SE5 0AB",
  plot_area_m2: 2000, existing_gea_m2: 1200,
  existing_floors: 2, existing_height_m: 6.0,
  ftf_m: 3.15, max_height_m: 28.0, max_floors: 9,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 6.0, insight: "Commercial at 6m in SE5/SE17 border. Close to Aylesbury regeneration zone. 9F potential." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Commercial at low yield. SE5 residential at \u00a3600-700/sqft. 9F generates \u00a310-14M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"Walworth Road residential SE17","ref":"Southwark ref 19/AP/2800","desc":"8F residential. 300m north. Height precedent."},{"name":"Aylesbury Estate","ref":"Southwark ref 14/AP/3844","desc":"Major regeneration 400m east. Planning context for residential intensification in SE5/SE17."}],
      insight: "SE5/SE17 corridor with Aylesbury regeneration driving area improvement. LPA supportive of residential intensification." },
    heritage: { label: 'Heritage Shadow', score: 8.0, weight: 1.5, insight: "No heritage constraints in SE5 corridor." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 8.0,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 7.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Commercial building - likely single freehold. Clean acquisition." },
    transport: { label: 'Transport Links', score: 8.0, weight: 0.5, ptal: '4', insight: "PTAL 4. Elephant & Castle 800m. Denmark Hill 700m. Good connectivity."  }
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