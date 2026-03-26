// Development Intelligence - 200 Great Dover Street, 200 Great Dover Street, Borough, SE1 4YB
// EPC: 4063m² GIA, Band D | HMLR: PENDING
// Polygon: approx 4200m² (OSM lookup pending)
const SITE_INTELLIGENCE = {
  polygon: [[-0.09092, 51.500099], [-0.09075, 51.500736], [-0.090704, 51.50091], [-0.090819, 51.500916], [-0.090812, 51.500949], [-0.090994, 51.500961], [-0.091421, 51.50099], [-0.091666, 51.501006], [-0.09173, 51.500991], [-0.091754, 51.500955], [-0.091684, 51.500849], [-0.09138, 51.500796], [-0.091256, 51.500825], [-0.09124, 51.500795], [-0.091221, 51.500781], [-0.09104, 51.500766], [-0.090989, 51.500762], [-0.091066, 51.500409], [-0.091388, 51.500459], [-0.091171, 51.500078], [-0.091049, 51.499932], [-0.09092, 51.500099]],
  site: "200 Great Dover Street",
  borough: 'Southwark', use: 'office', address: "200 Great Dover Street, Borough, SE1 4YB",
  plot_area_m2: 4200, existing_gea_m2: 4063,
  existing_floors: 4, existing_height_m: 18.0,
  ftf_m: 4.0, max_height_m: 52.0, max_floors: 13,
  hmlr_title: null, owner: null, epc_rating: 'D',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 18.0, insight: "Band D office at 18m on Great Dover Street. Adjacent 10F residential consent 100m east makes 13F very achievable here. Underutilised on a well-served Borough plot." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Band D offices - aging stock in SE1. Borough residential at \u00a3800-950/sqft. 13F scheme on 4,200m\u00b2 plot generates \u00a355-70M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"Great Dover Street residential","ref":"Southwark ref 21/AP/1800","desc":"10F residential, Great Dover Street. 100m east. Adjacent height precedent."},{"name":"Borough High Street offices","ref":"Southwark ref 17/AP/2100","desc":"9F office, Borough corridor. Confirms commercial intensification in this sub-area."}],
      insight: "Great Dover Street regeneration corridor. Adjacent 10F consent creates immediate height precedent. Borough LPA track record: consistent approval of 8-12F residential in this area." },
    heritage: { label: 'Heritage Shadow', score: 7.5, weight: 1.5, insight: "No conservation area on Great Dover Street. Modest heritage profile - manageable at 12-13F with quality design." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 7.5,
      verdict: 'Conservation area setting. Heritage Impact Assessment required. Design must respond to context. LPA design scrutiny heightened.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 7.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Office block - likely single corporate freeholder or property investor. EPC Band D suggests motivated seller. Clean acquisition route probable." },
    transport: { label: 'Transport Links', score: 8.5, weight: 0.5, ptal: '5', insight: "PTAL 5. Borough (Northern) 500m. London Bridge 700m. Elephant & Castle 600m."  }
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