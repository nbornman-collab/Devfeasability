// Development Intelligence - 123 Grove Park, 123 Grove Park, Camberwell, SE5 8LE
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.083385, 51.467864], [-0.082615, 51.467864], [-0.082615, 51.468536], [-0.083385, 51.468536], [-0.083385, 51.467864]],
  site: "123 Grove Park",
  borough: 'Southwark', use: 'commercial', address: "123 Grove Park, Camberwell, SE5 8LE",
  plot_area_m2: 4000, existing_gea_m2: 2000,
  existing_floors: 2, existing_height_m: 6.0,
  ftf_m: 3.5, max_height_m: 28.0, max_floors: 8,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.0, weight: 2.5, existing_m: 6.0, insight: "Commercial at 6m. SE5/SE22 border supports 6-8F residential." },
    value: { label: 'Rent Headroom', score: 7.5, weight: 2.0, insight: "Low-yield commercial. SE5 resi at \u00a3600-700/sqft." },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0,
      precedents: [{"name":"East Dulwich residential SE22","ref":"Southwark ref 20/AP/2400","desc":"7F, 500m south."},{"name":"Camberwell Station Road","ref":"Southwark ref 18/AP/3600","desc":"9F, 800m north."}],
      insight: "Camberwell/East Dulwich border. Active residential market." },
    heritage: { label: 'Heritage Shadow', score: 8.5, weight: 1.5, insight: "No heritage constraints." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      nhle_verified: true, nhle_date: '2026-03-25',
      nhle_on_site: [],
      nhle_adjacent: ['Numbers 124-125 incl balustraded wall (GrII, 1385590)'],
      score: 8.5,
      verdict: 'Limited heritage constraint. Standard LPA design review. No specialist heritage consultant required at pre-app stage.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: { label: 'Title Stack', score: 7.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Likely single freehold." },
    transport: { label: 'Transport Links', score: 6.5, weight: 0.5, ptal: '3', insight: "PTAL 3. East Dulwich station 500m."  }
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