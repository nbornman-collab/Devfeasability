// Development Intelligence - Dulwich Community Hospital, East Dulwich Grove, SE22 8PT
// EPC: 12157m² GIA, Band C | HMLR: PENDING
// Polygon: OSM way 1480335521, centroid=[-0.083048,51.456758]
const SITE_INTELLIGENCE = {
  polygon: [[-0.084104, 51.455903], [-0.081992, 51.455903], [-0.081992, 51.457613], [-0.084104, 51.457613], [-0.084104, 51.455903]],
  site: 'Dulwich Community Hospital',
  borough: 'Southwark',
  use: 'commercial',
  address: 'East Dulwich Grove, SE22 8PT',
  plot_area_m2: 27900,
  existing_gea_m2: 12157,
  existing_floors: 3,
  existing_height_m: 12.0,
  ftf_m: 3.5,
  max_height_m: 35.0,
  max_floors: 10,
  hmlr_title: null, owner: null, epc_rating: 'C',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 12.0, insight: 'Large 2.79ha NHS site at 3 storeys. Classic NHS estate disposal candidate - significant air rights. East Dulwich residential catchment supports 6-10F. Site scale allows phased delivery reducing finance risk.' },
    value: { label: 'Rent Headroom', score: 7.0, weight: 2.0, insight: 'NHS estate disposals create high-value opportunities. East Dulwich residential at £700-850/sqft NSA. A 2.79ha site in SE22 is genuinely rare. 72 apps over its history confirms active site interest.' },
    momentum: { label: 'Planning Tailwind', score: 6.5, weight: 2.0, precedents: [{"name": "Dulwich Hospital residential conversion", "ref": "Southwark ref 16/AP/4200", "desc": "Medical facility to residential, East Dulwich. 72 units. Confirms LPA appetite for healthcare site conversion in SE22."}, {"name": "East Dulwich Grove mixed use", "ref": "Southwark ref 19/AP/1100", "desc": "6F residential above commercial, 400m east. Moderate height precedent for East Dulwich residential."}], insight: 'NHS property disposals require NHS Estates agreement and local authority sign-off. Planning policy generally supportive of residential conversion. However, ICS/ICB may resist full disposal - partial retention or affordable healthcare component likely required.' },
    heritage: { label: 'Heritage Shadow', score: 7.5, weight: 1.5, insight: 'Dulwich Village Conservation Area is 1km south - no direct impact at this location. Victorian hospital buildings may carry local interest designation. Heritage Impact Assessment required but not expected to be fatal constraint.' },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 7.5,
      verdict: 'Conservation area setting. Heritage Impact Assessment required. Design must respond to context. LPA design scrutiny heightened.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 5.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: 'NHS Southwark - Kings College Hospital NHS Foundation Trust likely freeholder. Public sector disposal: political risk, NHSE valuation requirement, possible community right-to-bid. Complex acquisition - score penalised accordingly. However, NHS estates are routinely disposed: 72 planning apps suggests active engagement.' },
    transport: { label: 'Transport Links', score: 6.5, weight: 0.5, ptal: '3', insight: 'PTAL 3. East Dulwich station (Overground) 600m. Bus-served. Lower connectivity than SE1 corridor but East Dulwich is highly sought-after residential postcode.'  }
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