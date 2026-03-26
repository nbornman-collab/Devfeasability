// Development Intelligence - Marlborough Grove and St James Road, Marlborough Grove, Bermondsey, SE1 5QS
// EPC: 4000m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.137245, 51.504025], [-0.136155, 51.504025], [-0.136155, 51.504975], [-0.137245, 51.504975], [-0.137245, 51.504025]],
  site: "Marlborough Grove and St James Road",
  borough: 'Southwark', use: 'industrial', address: "Marlborough Grove, Bermondsey, SE1 5QS",
  plot_area_m2: 8000, existing_gea_m2: 4000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Industrial at 5m in inner SE1. Bermondsey corridor supports 10-12F residential." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Industrial EUV. SE1 Bermondsey residential at \u00a3700-850/sqft." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"Bermondsey SE1 residential","ref":"Southwark ref 19/AP/3000","desc":"10F residential, SE1. Height precedent."},{"name":"Loman Street SE1","ref":"Southwark ref 20/AP/1537","desc":"Mixed-use 12F with industrial retention. Precedent for industrial conversion."}],
      insight: "Inner SE1 Bermondsey. Active residential conversion zone." },
    heritage: { label: 'Heritage Shadow', score: 7.5, weight: 1.5, insight: "Some heritage sensitivity in Bermondsey. Manageable." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 7.5,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 6.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Industrial estate - multiple unit likely." },
    transport: { label: 'Transport Links', score: 8.0, weight: 0.5, ptal: '4', insight: "PTAL 4. Bermondsey (Jubilee) 500m. Good inner SE1 connectivity."  }
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