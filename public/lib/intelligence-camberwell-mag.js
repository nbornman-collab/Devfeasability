// Development Intelligence - Camberwell Green Magistrates Court, 15 D'Eynsford Road, SE5 7UP
// EPC: 3500m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.093895, 51.474389], [-0.093638, 51.474284], [-0.093451, 51.474218], [-0.093336, 51.474185], [-0.093286, 51.474176], [-0.093257, 51.474176], [-0.093222, 51.47418], [-0.0932, 51.47419], [-0.093184, 51.474206], [-0.093183, 51.474213], [-0.093179, 51.474244], [-0.093169, 51.474413], [-0.093236, 51.474728], [-0.093343, 51.474907], [-0.09371, 51.474841], [-0.093653, 51.474583], [-0.093895, 51.474389]],
  site: "Camberwell Green Magistrates Court",
  borough: 'Southwark', use: 'commercial', address: "15 D'Eynsford Road, SE5 7UP",
  plot_area_m2: 4000, existing_gea_m2: 3500,
  existing_floors: 3, existing_height_m: 12.0,
  ftf_m: 3.5, max_height_m: 35.0, max_floors: 10,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 12.0, insight: "Magistrates court at 12m/3F. If surplus/closed, large 0.4ha plot with 10F potential." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Courts estate disposal - MOJ surplus site. Camberwell residential at \u00a3600-700/sqft. 10F generates \u00a320-30M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0,
      precedents: [{"name":"Camberwell Road residential","ref":"Southwark ref 20/AP/1200","desc":"8F residential, Camberwell. 200m east. Direct precedent."},{"name":"Walworth regeneration","ref":"Southwark ref 18/AP/3200","desc":"8F, SE17. 600m north. Corridor height."}],
      insight: "MOJ has an active programme of disposing surplus courts. If Camberwell is surplus, the disposal framework is well-established." },
    heritage: { label: 'Heritage Shadow', score: 7.5, weight: 1.5, insight: "Magistrates court may have local architectural interest. Camberwell Green Conservation Area 300m. Heritage manageable but design-sensitive." },

    heritage_framework: {
      tier: 'RETAIN_AND_ADAPT',
      nhle_verified: true, nhle_date: '2026-03-25',
      nhle_on_site: [{ name: 'NUMBER 15 AND ATTACHED RAILINGS', grade: 'II', list_entry: 1378399 }, { name: 'FORMER LONDON COUNTY BANK', grade: 'II', list_entry: 1378400 }],
      nhle_adjacent: ['323 Camberwell New Road (GrII, 1378446)'],
      score: 7.5,
      verdict: 'Conservation area setting. Heritage Impact Assessment required. Design must respond to context. LPA design scrutiny heightened.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 6.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "MOJ freehold if surplus. Government disposal at market value. Clean acquisition route." },
    transport: { label: 'Transport Links', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Denmark Hill 500m. Bus-served. Acceptable for residential."  }
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