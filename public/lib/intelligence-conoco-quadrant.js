// Development Intelligence - Conoco House and Quadrant House, Blackfriars Road, SE1 8NZ
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.083073, 51.561388], [-0.082127, 51.561388], [-0.082127, 51.562212], [-0.083073, 51.562212], [-0.083073, 51.561388]],
  site: "Conoco House and Quadrant House",
  borough: 'Southwark', use: 'office', address: "Blackfriars Road, SE1 8NZ",
  plot_area_m2: 6000, existing_gea_m2: 10000,
  existing_floors: 6, existing_height_m: 24.0,
  ftf_m: 4.0, max_height_m: 60.0, max_floors: 15,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.0, weight: 2.5, existing_m: 24.0, insight: "Office at 24m on Blackfriars Road. One Blackfriars at 50F 200m south. 15F achievable." },
    value: { label: 'Rent Headroom', score: 9.0, weight: 2.0, insight: "Blackfriars Road office. Grade A at \u00a380-90/sqft. Residential at \u00a31,000-1,400/sqft." },
    momentum: { label: 'Planning Tailwind', score: 8.5, weight: 2.0,
      precedents: [{"name":"One Blackfriars","ref":"Southwark ref 11/AP/2927","desc":"50F/163m residential. 200m south. Maximum height."},{"name":"240 Blackfriars Road","ref":"Southwark ref 11/AP/2700","desc":"27F mixed-use. Direct corridor precedent."}],
      insight: "Blackfriars corridor. CAZ. Maximum momentum." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Some heritage. South Bank edge. Manageable." },

    heritage_framework: {
      tier: 'RETAIN_AND_ADAPT',
      nhle_verified: true, nhle_date: '2026-03-25',
      nhle_on_site: [{ name: 'STOKE NEWINGTON LIBRARY', grade: 'II', list_entry: 1390563 }],
      nhle_adjacent: ['Stoke Newington Municipal Buildings (GrII, 1253465)'],
      score: 7.0,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Office complex. Institutional." },
    transport: { label: 'Transport Links', score: 9.5, weight: 0.5, ptal: '6a', insight: "PTAL 6a. Blackfriars (Elizabeth/Thameslink) 200m. Exceptional."  }
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