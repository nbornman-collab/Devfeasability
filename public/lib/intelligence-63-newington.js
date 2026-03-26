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
      tier: 'CONTEXTUAL',
      score: 7.0,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 7.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Office block. Institutional freehold." },
    transport: { label: 'Transport Links', score: 8.5, weight: 0.5, ptal: '5', insight: "PTAL 5. E&C (Northern/Bakerloo) 100m. Excellent."  }
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