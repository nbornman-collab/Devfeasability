// Development Intelligence - Land Between Camberwell Station Road and Warner Road, Camberwell Station Road, SE5 9JA
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.096143, 51.473888], [-0.095634, 51.474183], [-0.095658, 51.474205], [-0.09523, 51.474463], [-0.095209, 51.474476], [-0.095867, 51.474864], [-0.096064, 51.474621], [-0.096203, 51.474433], [-0.096347, 51.474284], [-0.096491, 51.474104], [-0.096471, 51.474107], [-0.096449, 51.474097], [-0.096514, 51.474008], [-0.096649, 51.474031], [-0.096822, 51.474075], [-0.096869, 51.474087], [-0.09713, 51.473747], [-0.097107, 51.473696], [-0.096926, 51.473612], [-0.096736, 51.473531], [-0.096591, 51.473619], [-0.096143, 51.473888]],
  site: "Land Between Camberwell Station Road and Warner Road",
  borough: 'Southwark', use: 'industrial', address: "Camberwell Station Road, SE5 9JA",
  plot_area_m2: 5000, existing_gea_m2: 3000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 35.0, max_floors: 10,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.0, weight: 2.5, existing_m: 5.0, insight: "Industrial at 5m between Camberwell station approaches. 10F potential." },
    value: { label: 'Rent Headroom', score: 7.5, weight: 2.0, insight: "Industrial land. SE5 resi at \u00a3600-700/sqft." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"Camberwell Station Road","ref":"Southwark ref 18/AP/3600","desc":"9F residential. Direct precedent."},{"name":"Denmark Hill residential","ref":"Southwark ref 21/AP/1200","desc":"8F. 400m south."}],
      insight: "Station-adjacent. LPA supports residential near stations." },
    heritage: { label: 'Heritage Shadow', score: 7.5, weight: 1.5, insight: "Victorian railway. Some heritage. Manageable." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 7.5,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Likely Network Rail or industrial freeholder." },
    transport: { label: 'Transport Links', score: 7.5, weight: 0.5, ptal: '3', insight: "PTAL 3. Denmark Hill 200m."  }
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