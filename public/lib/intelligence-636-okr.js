// Development Intelligence - 636 Old Kent Road, 636 Old Kent Road, SE15 1JG
// EPC: 2000m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.068034, 51.484209], [-0.067366, 51.484209], [-0.067366, 51.484791], [-0.068034, 51.484791], [-0.068034, 51.484209]],
  site: "636 Old Kent Road",
  borough: 'Southwark', use: 'commercial', address: "636 Old Kent Road, SE15 1JG",
  plot_area_m2: 3000, existing_gea_m2: 2000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Commercial at 5m on the OKR corridor. OA designation supports 25-35F. Clean sky." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Commercial at low yield. OKR residential at \u00a35,500-6,500/m\u00b2. 12F generates \u00a320-30M GDV." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"Malt Street OKR","ref":"Southwark ref 17/AP/3885","desc":"34F residential, OKR. Height precedent for this corridor."},{"name":"Biscuit Factory OKR","ref":"Southwark ref 14/AP/3438","desc":"Mixed-use 12F, OKR. Residential conversion precedent."}],
      insight: "OKR Opportunity Area. Maximum planning tailwind for residential-led scheme." },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: "OKR commercial strip - no heritage." },

    heritage_framework: {
      tier: 'UNRESTRICTED',
      score: 9.0,
      verdict: 'Limited heritage constraint. Standard LPA design review. No specialist heritage consultant required at pre-app stage.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: { label: 'Title Stack', score: 7.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Commercial site - likely single freehold. Achievable acquisition." },
    transport: { label: 'Transport Links', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Bus-served OKR. Proposed BLE station 500m."  }
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
    wlc_required: true,
    wlc_note: 'Whole Life-Cycle Carbon Assessment required for GLA-referable schemes. GLA WLC Guidance (March 2022) applies.',
    circular_economy_required: true,
    circular_economy_note: 'Circular Economy Statement required for referable schemes. GLA CES Guidance applies.',
    energy_planning: { breeam_target: 'Excellent', breeam_cost_uplift_per_sqm: 50, note: 'BREEAM Excellent target for OA/major schemes.' }
  },
  delivery: {
    fire_statement_required: true,
    fire_statement_note: 'London Plan Policy D12 - required for all major developments.',
    bsr_gateway: false,
    gla_referral: true,
    pre_commencement_gates: ['BNG plan approval', 'Construction Management Plan', 'Fire Strategy (detail)'],
    estimated_pre_app_cost: { low: 40000, high: 100000 },
    estimated_planning_duration_months: { low: 6, high: 12 }
  }

};