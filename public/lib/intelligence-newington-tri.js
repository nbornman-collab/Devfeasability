// Development Intelligence - Newington Triangle, Newington Causeway, SE1 6DR
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.058768, 51.537728], [-0.058799, 51.537776], [-0.058828, 51.537902], [-0.058815, 51.538057], [-0.058782, 51.538246], [-0.058702, 51.538283], [-0.05837, 51.538283], [-0.05835, 51.537794], [-0.058768, 51.537728]],
  site: "Newington Triangle",
  borough: 'Southwark', use: 'commercial', address: "Newington Causeway, SE1 6DR",
  plot_area_m2: 2500, existing_gea_m2: 2000,
  existing_floors: 3, existing_height_m: 12.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 12.0, insight: "Commercial at 12m on Newington Causeway. E&C regeneration context supports 12F." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Commercial at Band D/E. E&C residential at \u00a3800-950/sqft. 12F generates \u00a320-30M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"One The Elephant","ref":"Southwark ref 12/AP/1562","desc":"37F residential. E&C zone. Major height precedent."},{"name":"Newington Butts residential","ref":"Southwark ref 17/AP/2800","desc":"12F residential. E&C approach."}],
      insight: "Elephant & Castle regeneration zone. Maximum momentum." },
    heritage: { label: 'Heritage Shadow', score: 7.5, weight: 1.5, insight: "E&C area - some heritage. Manageable." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 7.5,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 7.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Commercial freehold. Achievable." },
    transport: { label: 'Transport Links', score: 8.5, weight: 0.5, ptal: '5', insight: "PTAL 5. E&C (Northern/Bakerloo) 200m."  }
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