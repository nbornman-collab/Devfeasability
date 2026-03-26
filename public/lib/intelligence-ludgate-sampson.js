// Development Intelligence - Ludgate House and Sampson House, 64 Hopton Street, South Bank, SE1 9JH
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.08071, 51.526855], [-0.07969, 51.526855], [-0.07969, 51.527745], [-0.08071, 51.527745], [-0.08071, 51.526855]],
  site: "Ludgate House and Sampson House",
  borough: 'Southwark', use: 'office', address: "64 Hopton Street, South Bank, SE1 9JH",
  plot_area_m2: 7000, existing_gea_m2: 15000,
  existing_floors: 6, existing_height_m: 24.0,
  ftf_m: 4.0, max_height_m: 65.0, max_floors: 16,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.0, weight: 2.5, existing_m: 24.0, insight: "Major South Bank office at 24m. One Blackfriars at 50F 100m east. South Bank Tower at 41F 150m west. 16F is conservative for this address." },
    value: { label: 'Rent Headroom', score: 9.5, weight: 2.0, insight: "South Bank/Blackfriars Road. Premium London address. Residential at \u00a31,200-1,600/sqft. 16F on 0.7ha generates \u00a3100-140M GDV." },
    momentum: { label: 'Planning Tailwind', score: 9.0, weight: 2.0,
      precedents: [{"name":"One Blackfriars","ref":"Southwark ref 11/AP/2927","desc":"50F/163m. 100m east. Maximum height."},{"name":"South Bank Tower","ref":"Southwark ref 14/AP/3500","desc":"41F residential conversion. 150m west."}],
      insight: "South Bank/Blackfriars. OA + CAZ adjacent. ITV, IBM South Bank cluster. Maximum momentum." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "South Bank cultural quarter. Some heritage. Design-led context." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 7.0,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 5.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Major office complex. Institutional freehold. Already subject to planning applications." },
    transport: { label: 'Transport Links', score: 9.5, weight: 0.5, ptal: '6a', insight: "PTAL 6a. Blackfriars 100m. Southwark (Jubilee) 300m. Waterloo 400m. Exceptional."  }
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