// Development Intelligence - Chambers Wharf, Chambers Street, Bermondsey, SE16 4TU
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.033968, 51.511318], [-0.032632, 51.511318], [-0.032632, 51.512482], [-0.033968, 51.512482], [-0.033968, 51.511318]],
  site: "Chambers Wharf",
  borough: 'Southwark', use: 'industrial', address: "Chambers Street, Bermondsey, SE16 4TU",
  plot_area_m2: 12000, existing_gea_m2: 5000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Thames riverside industrial at 5m. 1.2ha riverside plot. 12F residential potential." },
    value: { label: 'Rent Headroom', score: 9.0, weight: 2.0, insight: "Riverside land. SE16 riverside resi at \u00a3900-1,200/sqft. 12F on 1.2ha generates \u00a380-120M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"Bermondsey riverside residential","ref":"Southwark ref 19/AP/3200","desc":"12F residential on riverside. Height precedent."},{"name":"Tower Bridge Quarter","ref":"Southwark ref 15/AP/2800","desc":"Mixed-use, SE1/SE16 border. Confirms riverside intensification."}],
      insight: "Thames riverside. LPA supports riverside residential." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Bermondsey riverside. Tower Bridge 500m. Heritage sensitivity but manageable." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 7.0,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 5.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Industrial land - Thames Tideway Tunnel site? Check status. Potentially complex." },
    transport: { label: 'Transport Links', score: 6.5, weight: 0.5, ptal: '3', insight: "PTAL 3. Bermondsey (Jubilee) 600m. Bus-served."  }
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