// Development Intelligence - Former Petrol Station, 233-247 Old Kent Road, 233-247 Old Kent Road, SE1 5EL
// EPC: 557m² GIA, Band B | HMLR: PENDING
// Polygon: OSM way 74866525, centroid=[-0.079416,51.489889]
const SITE_INTELLIGENCE = {
  polygon: [[-0.079606, 51.489735], [-0.079226, 51.489735], [-0.079226, 51.490043], [-0.079606, 51.490043], [-0.079606, 51.489735]],
  site: "Former Petrol Station, 233-247 Old Kent Road",
  borough: 'Southwark',
  use: 'commercial',
  address: '233-247 Old Kent Road, SE1 5EL',
  plot_area_m2: 900,
  existing_gea_m2: 557,
  existing_floors: 1,
  existing_height_m: 4.0,
  ftf_m: 3.5,
  max_height_m: 35.0,
  max_floors: 10,
  hmlr_title: null, owner: null, epc_rating: 'B',
  factors: {
    sky: { label: 'Available Sky', score: 9.0, weight: 2.5, existing_m: 4.0, precedent_m: 49.0, insight: 'Single-storey petrol station at 4m. The Old Kent Road Opportunity Area (OA) supports tall buildings to 25-35F. 3 major applications at this specific address confirm developer interest. Site assembly at ground level - near-zero existing value, maximum sky.' },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: 'Former petrol station = distressed/low-yield asset. At £5,000-6,500/m² residential NSA on the OKR corridor, a 10F scheme adds £7-9M GDV against minimal existing value. OKR residential market has strengthened significantly post-2020 following OA designation.' },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0, precedents: [{"name": "Malt Street OKR", "ref": "Southwark ref 17/AP/3885", "desc": "34F residential + commercial, Old Kent Road. Approved 2020. Establishes tall residential as policy-compliant on OKR corridor."}, {"name": "Biscuit Factory OKR", "ref": "Southwark ref 14/AP/3438", "desc": "Mixed-use 12F scheme, Old Kent Road. Major residential conversion. Confirms LPA appetite for intensification on this corridor."}], insight: 'Old Kent Road Opportunity Area - one of the highest-priority regeneration zones in London. LPA and GLA explicitly support tall residential on OKR corridor. 3 major apps at this address confirm live developer interest. Planning Tailwind score reflects OKR OA policy strength.' },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: 'OKR is an A-road commercial corridor - no heritage designation, no listed buildings within 300m, no conservation areas. Cleanest heritage profile of any candidate site.' },

    heritage_framework: {
      tier: 'UNRESTRICTED',
      score: 9.0,
      verdict: 'Limited heritage constraint. Standard LPA design review. No specialist heritage consultant required at pre-app stage.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: { label: 'Title Stack', score: 8.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: '3 major planning apps suggest an active owner willing to engage with development. Former petrol station - likely single freehold, potentially a fuel company or property investor. Acquisition is achievable - fuel sites are non-operational assets.' },
    transport: { label: 'Transport Links', score: 7.5, weight: 0.5, ptal: '4', insight: 'PTAL 4. Old Kent Road (various buses). Elephant & Castle (Northern/Bakerloo) 1.2km. Proposed Bakerloo Line Extension would add a station within 200m - if delivered, transport score upgrades to 9.0.'  }
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
    wlc_required: true,
    wlc_note: 'Whole Life-Cycle Carbon Assessment required for GLA-referable schemes. GLA WLC Guidance (March 2022) applies.',
    circular_economy_required: true,
    circular_economy_note: 'Circular Economy Statement required for referable schemes. GLA CES Guidance applies.',
    energy_planning: { breeam_target: 'Excellent', breeam_cost_uplift_per_sqm: 50, note: 'BREEAM Excellent target for OA/major schemes.' }
  },
  delivery: {
    fire_statement_required: true,
    fire_statement_note: 'London Plan Policy D12 - required for all major developments.',
    bsr_gateway: false,
    gla_referral: true,
    pre_commencement_gates: ['BNG plan approval', 'Construction Management Plan', 'Fire Strategy (detail)'],
    estimated_pre_app_cost: { low: 40000, high: 100000 },
    estimated_planning_duration_months: { low: 6, high: 12 }
  }

};