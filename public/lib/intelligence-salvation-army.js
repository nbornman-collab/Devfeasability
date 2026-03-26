// Development Intelligence - Salvation Army Headquarters, Newington Causeway, SE1 6BN
// EPC: 8000m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.099155, 51.497893], [-0.099122, 51.497832], [-0.099081, 51.497756], [-0.098993, 51.497578], [-0.098971, 51.497522], [-0.099304, 51.497261], [-0.09997, 51.497793], [-0.100011, 51.49784], [-0.099825, 51.498793], [-0.099798, 51.498759], [-0.099656, 51.498602], [-0.099623, 51.498556], [-0.0995, 51.498391], [-0.099309, 51.498125], [-0.099155, 51.497893]],
  site: "Salvation Army Headquarters",
  borough: 'Southwark', use: 'office', address: "Newington Causeway, SE1 6BN",
  plot_area_m2: 5000, existing_gea_m2: 8000,
  existing_floors: 6, existing_height_m: 24.0,
  ftf_m: 4.0, max_height_m: 56.0, max_floors: 14,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 24.0, insight: "Salvation Army UK HQ at 24m/6F on Newington Causeway. E&C regeneration cluster 200m. One The Elephant at 37F is adjacent. 14F would be conservative." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Institutional HQ - if Salvation Army relocates. Newington Causeway residential at \u00a3800-950/sqft. 14F generates \u00a350-65M GDV." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"One The Elephant","ref":"Southwark ref 12/AP/1562","desc":"37F residential, E&C. Adjacent. Major height precedent."},{"name":"Newington Butts residential","ref":"Southwark ref 17/AP/2800","desc":"12F residential. E&C approach. Direct precedent."}],
      insight: "Elephant & Castle regeneration zone. Maximum planning momentum for residential." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "E&C conservation area adjacent. Salvation Army building may have local interest. Manageable." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 7.0,
      verdict: 'Conservation area setting. Heritage Impact Assessment required. Design must respond to context. LPA design scrutiny heightened.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Salvation Army - charitable trust. Institutional disposal requires trustee approval. Achievable if SA decides to relocate." },
    transport: { label: 'Transport Links', score: 8.5, weight: 0.5, ptal: '5', insight: "PTAL 5. Elephant & Castle (Northern/Bakerloo) 200m. Excellent transport."  }
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