// Development Intelligence - Railway Rise, East Dulwich, Railway Rise, East Dulwich, SE22 8RH
// EPC GEA: PLACEHOLDER - verify via EPC API before client use
// HMLR: PENDING | Polygon: approx 7900m²
const SITE_INTELLIGENCE = {
  polygon: [[-0.080678, 51.460955], [-0.079554, 51.460955], [-0.079554, 51.461865], [-0.080678, 51.461865], [-0.080678, 51.460955]],
  site: "Railway Rise, East Dulwich",
  borough: 'Southwark', use: 'industrial', address: "Railway Rise, East Dulwich, SE22 8RH",
  plot_area_m2: 7900, existing_gea_m2: 4500,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 35.0, max_floors: 10,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.0, weight: 2.5, existing_m: 5.0, insight: "0.79ha railway-adjacent industrial site. 11 major applications is very high - active development history. Likely includes Network Rail and/or RSP infrastructure. Station proximity adds transport premium to residential." },
    value: { label: 'Rent Headroom', score: 7.5, weight: 2.0, insight: "Railway-adjacent industrial land. East Dulwich residential at \u00a3700-800/sqft. 10F scheme generates \u00a340-55M GDV on 0.79ha." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"East Dulwich Station Approach","ref":"Southwark ref 18/AP/2600","desc":"8F residential, station approach. 400m east. Confirms station-adjacent residential consent."},{"name":"Lordship Lane mixed-use","ref":"Southwark ref 20/AP/0900","desc":"6F residential-commercial, SE22. Height precedent for East Dulwich corridor."}],
      insight: "11 major applications indicates an active development pipeline. Network Rail infrastructure may be involved (railway land). Station-adjacent sites are a Southwark planning priority for residential intensification." },
    heritage: { label: 'Heritage Shadow', score: 8.0, weight: 1.5, insight: "Victorian railway infrastructure nearby may have local heritage interest. East Dulwich Conservation Areas are 800m south. Manageable heritage profile." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 8.0,
      verdict: 'Conservation area setting. Heritage Impact Assessment required. Design must respond to context. LPA design scrutiny heightened.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 5.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "11 major apps with no consent suggests complex ownership (potentially Network Rail land, multiple parties). Title Stack is the primary risk." },
    transport: { label: 'Transport Links', score: 6.5, weight: 0.5, ptal: '3', insight: "PTAL 3. East Dulwich station (Overground) 200m - direct adjacency is a residential premium factor. Honourable mention: one of the best micro-locations for East Dulwich residential buyers."  }
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