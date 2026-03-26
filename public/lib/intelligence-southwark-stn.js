// Development Intelligence - Southwark Station and 1 Joan Street, 1 Joan Street, Southwark, SE1 8DA
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.115281, 51.521238], [-0.115183, 51.521261], [-0.115268, 51.521392], [-0.115346, 51.521375], [-0.115369, 51.521414], [-0.115329, 51.521423], [-0.115114, 51.521471], [-0.114935, 51.521193], [-0.115212, 51.521131], [-0.115281, 51.521238]],
  site: "Southwark Station and 1 Joan Street",
  borough: 'Southwark', use: 'office', address: "1 Joan Street, Southwark, SE1 8DA",
  plot_area_m2: 3000, existing_gea_m2: 4000,
  existing_floors: 4, existing_height_m: 18.0,
  ftf_m: 4.0, max_height_m: 52.0, max_floors: 13,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 18.0, insight: "Office at 18m above Southwark station. Direct station oversite development potential. 13F achievable." },
    value: { label: 'Rent Headroom', score: 9.0, weight: 2.0, insight: "Jubilee line station oversite. Premium SE1 address. Office \u00a380-90/sqft." },
    momentum: { label: 'Planning Tailwind', score: 8.5, weight: 2.0,
      precedents: [{"name":"240 Blackfriars Road","ref":"Southwark ref 11/AP/2700","desc":"27F, 200m east."},{"name":"Sea Containers House","ref":"Southwark ref 16/AP/4200","desc":"14F, South Bank. Height precedent."}],
      insight: "Station oversite development is TfL priority. Maximum planning momentum." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "South Bank area. Some heritage. Manageable." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 7.0,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 5.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "TfL/Network Rail. Station oversite requires transport authority agreement. Complex." },
    transport: { label: 'Transport Links', score: 10.0, weight: 0.5, ptal: '6b', insight: "PTAL 6b. Southwark (Jubilee) 0m - direct station oversite. Waterloo 300m. Exceptional."  }
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