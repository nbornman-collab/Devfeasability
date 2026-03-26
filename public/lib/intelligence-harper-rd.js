// Development Intelligence - 19-23 Harper Road and 325 Borough High Street, 19-23 Harper Road, SE1 6AW
// EPC: 4000m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.095058, 51.499021], [-0.095346, 51.498826], [-0.095733, 51.498571], [-0.095954, 51.498702], [-0.095774, 51.498833], [-0.095711, 51.498796], [-0.095511, 51.498923], [-0.095386, 51.498997], [-0.095201, 51.499115], [-0.095058, 51.499021]],
  site: "19-23 Harper Road and 325 Borough High Street",
  borough: 'Southwark', use: 'office', address: "19-23 Harper Road, SE1 6AW",
  plot_area_m2: 3500, existing_gea_m2: 4000,
  existing_floors: 4, existing_height_m: 15.0,
  ftf_m: 4.0, max_height_m: 48.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 15.0, insight: "Office at 15m on Harper Road/Borough High Street junction. Borough corridor supports 10-12F. E&C context at 37F." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Office block at Borough address. New-build residential at \u00a3800-950/sqft. 12F generates \u00a340-55M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"Borough High Street mixed-use","ref":"Southwark ref 19/AP/2300","desc":"8F residential/commercial. 100m north. Direct precedent."},{"name":"One The Elephant","ref":"Southwark ref 12/AP/1562","desc":"37F residential, E&C. 400m south. Height context."}],
      insight: "Borough High Street corridor. Active development market. LPA has approved 8-12F within 300m." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Borough High Street Conservation Area. Some heritage sensitivity. Manageable with quality design." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 7.0,
      verdict: 'Conservation area setting. Heritage Impact Assessment required. Design must respond to context. LPA design scrutiny heightened.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 7.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Office block - institutional freehold likely. Clean acquisition." },
    transport: { label: 'Transport Links', score: 8.5, weight: 0.5, ptal: '5', insight: "PTAL 5. Borough (Northern) 200m. London Bridge 600m. E&C 400m."  }
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