// Development Intelligence - 99 Lomond Grove, 99 Lomond Grove, Camberwell, SE5 7HN
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.091407, 51.476195], [-0.091089, 51.476237], [-0.091035, 51.476084], [-0.090985, 51.47609], [-0.090997, 51.476126], [-0.090723, 51.476163], [-0.090711, 51.476126], [-0.090654, 51.475964], [-0.090638, 51.475914], [-0.09092, 51.475876], [-0.090936, 51.475926], [-0.090978, 51.475921], [-0.090918, 51.475751], [-0.091236, 51.475709], [-0.091407, 51.476195]],
  site: "99 Lomond Grove",
  borough: 'Southwark', use: 'commercial', address: "99 Lomond Grove, Camberwell, SE5 7HN",
  plot_area_m2: 1500, existing_gea_m2: 800,
  existing_floors: 2, existing_height_m: 5.0,
  ftf_m: 3.15, max_height_m: 25.0, max_floors: 8,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Commercial at 5m. Camberwell supports 6-8F residential." },
    value: { label: 'Rent Headroom', score: 7.5, weight: 2.0, insight: "Low-yield commercial. SE5 resi at \u00a3600-700/sqft." },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0,
      precedents: [{"name":"Camberwell Road residential","ref":"Southwark ref 20/AP/1200","desc":"8F, 500m north."},{"name":"Lomond Grove estate infill","ref":"Southwark ref 21/AP/0800","desc":"6F residential infill. 100m south. Direct precedent."}],
      insight: "Camberwell corridor." },
    heritage: { label: 'Heritage Shadow', score: 8.0, weight: 1.5, insight: "No heritage." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 8.0,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 7.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Likely single freehold." },
    transport: { label: 'Transport Links', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Denmark Hill 500m."  }
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