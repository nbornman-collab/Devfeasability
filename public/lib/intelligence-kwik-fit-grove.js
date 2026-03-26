// Development Intelligence - Kwik Fit and Gibbs & Dandy, Grove Vale, Grove Vale, East Dulwich, SE22 8LF
// EPC: 1427m² GIA, Band F | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.077966, 51.461744], [-0.078212, 51.461881], [-0.078609, 51.462081], [-0.07817, 51.462419], [-0.078088, 51.462284], [-0.077937, 51.462083], [-0.077829, 51.462094], [-0.077709, 51.46183], [-0.077766, 51.461811], [-0.077966, 51.461744]],
  site: "Kwik Fit and Gibbs & Dandy, Grove Vale",
  borough: 'Southwark', use: 'commercial', address: "Grove Vale, East Dulwich, SE22 8LF",
  plot_area_m2: 2500, existing_gea_m2: 1427,
  existing_floors: 2, existing_height_m: 7.0,
  ftf_m: 3.5, max_height_m: 28.0, max_floors: 8,
  hmlr_title: null, owner: null, epc_rating: 'F',
  factors: {
    sky: { label: 'Available Sky', score: 8.0, weight: 2.5, existing_m: 7.0, insight: "Commercial/auto repair at 7m (2F equivalent). EPC Band F signals functionally obsolete building. Near-complete available sky for 6-8F residential scheme." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Auto repair + builders merchant at EPC Band F - near-zero investment yield. East Dulwich residential at \u00a3700-850/sqft. 8F residential generates \u00a315-20M GDV against <\u00a32M existing value." },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0,
      precedents: [{"name":"Dulwich Road residential","ref":"Southwark ref 20/AP/2400","desc":"7F residential, 400m north. Height precedent for East Dulwich high street sites."},{"name":"Lordship Lane mixed-use","ref":"Southwark ref 19/AP/1100","desc":"6F residential above commercial, 300m south. Confirms residential conversion of commercial sites in SE22."}],
      insight: "East Dulwich is an active residential conversion market. LPA has approved 6-8F residential on comparable commercial sites. No OA but strong local residential demand drives planning cooperation." },
    heritage: { label: 'Heritage Shadow', score: 8.5, weight: 1.5, insight: "No conservation area. No listed buildings within 300m. Clean heritage profile for East Dulwich." },

    heritage_framework: {
      tier: 'UNRESTRICTED',
      score: 8.5,
      verdict: 'Limited heritage constraint. Standard LPA design review. No specialist heritage consultant required at pre-app stage.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: { label: 'Title Stack', score: 8.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Kwik Fit (Itochu) + Gibbs & Dandy (Saint-Gobain) - two corporate tenants likely under a single freeholder or investment fund. Both are national chains that can relocate. Acquisition achievable." },
    transport: { label: 'Transport Links', score: 6.5, weight: 0.5, ptal: '3', insight: "PTAL 3. East Dulwich station (Overground) 400m. Bus-served. Acceptable for residential."  }
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