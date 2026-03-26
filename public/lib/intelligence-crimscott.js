// Development Intelligence - Crimscott Street Campus, Crimscott Street, Bermondsey, SE1 3RB
// EPC: 5542m² GIA, Band D | HMLR: PENDING
// Polygon: approx 3000m² (OSM lookup pending)
const SITE_INTELLIGENCE = {
  polygon: [[-0.082234, 51.493309], [-0.081566, 51.493309], [-0.081566, 51.493891], [-0.082234, 51.493891], [-0.082234, 51.493309]],
  site: "Crimscott Street Campus",
  borough: 'Southwark', use: 'office', address: "Crimscott Street, Bermondsey, SE1 3RB",
  plot_area_m2: 3000, existing_gea_m2: 5542,
  existing_floors: 4, existing_height_m: 18.0,
  ftf_m: 4.0, max_height_m: 56.0, max_floors: 14,
  hmlr_title: null, owner: null, epc_rating: 'D',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 18.0, insight: "University student accommodation at 18m/5F in inner SE1. Bermondsey is an active residential conversion zone. 14F potential with CAZ-adjacent location." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "University/institutional at EPC Band D - below-market yield. SE1 residential at \u00a3750-900/sqft. 5,542m\u00b2 existing replaced by 14F generates \u00a350-70M GDV uplift." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"Bermondsey residential SE1","ref":"Southwark ref 20/AP/1500","desc":"10F residential, Bermondsey. 200m east. Height precedent adjacent."},{"name":"Loman Street SE1","ref":"Southwark ref 20/AP/1537","desc":"Mixed-use 12F, SE1. Confirms LPA appetite for intensification in inner Bermondsey."}],
      insight: "Inner SE1 Bermondsey. Southwark LPA has approved 10-12F residential within 300m. 65 planning applications indicates an active development history." },
    heritage: { label: 'Heritage Shadow', score: 7.5, weight: 1.5, insight: "Bermondsey Street Conservation Area 400m west - some indirect influence. No listed buildings within 200m. Manageable." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 7.5,
      verdict: 'Conservation area setting. Heritage Impact Assessment required. Design must respond to context. LPA design scrutiny heightened.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 6.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "University/institutional occupied - likely leasehold under a property investor. Institutional disposal achievable. 65 apps suggests well-understood site." },
    transport: { label: 'Transport Links', score: 8.0, weight: 0.5, ptal: '4', insight: "PTAL 4. London Bridge (National Rail + Tube) 1km. Bermondsey (Jubilee) 600m. Borough (Northern) 700m."  }
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