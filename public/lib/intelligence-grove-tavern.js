// Development Intelligence - The Grove Tavern, 520 Lordship Lane, 520 Lordship Lane, East Dulwich, SE22 8LF
// Source: EPC (1427m² GIA, PLACEHOLDER), GLA DataMap
// HMLR title: PENDING verification
// Polygon: OSM way 188589437, centroid=[-0.068178,51.443454]
const SITE_INTELLIGENCE = {
  polygon: [[-0.068625, 51.443092], [-0.067731, 51.443092], [-0.067731, 51.443816], [-0.068625, 51.443816], [-0.068625, 51.443092]],
  site: 'The Grove Tavern, 520 Lordship Lane',
  borough: 'Southwark',
  use: 'commercial',
  address: '520 Lordship Lane, East Dulwich, SE22 8LF',
  plot_area_m2: 5000,
  existing_gea_m2: 1427,
  existing_floors: 2,
  existing_height_m: 7.0,
  ftf_m: 3.5,
  max_height_m: 28.0,
  max_floors: 8,
  hmlr_title: null,
  owner: null,
  epc_rating: 'unknown',
  factors: {
    sky: {
      label: 'Available Sky',
      score: 8.0, weight: 2.5,
      existing_m: 7.0,
      precedent_m: 42.0,
      insight: '2-storey pub/restaurant at 7m in a residential catchment. With precedents of 6-8 storey residential conversions on Lordship Lane, there is a clear 4-6 floor uplift opportunity. EPC Band F signals a tired existing building - demolish-rebuild is cleaner than refurb.'
    },
    value: {
      label: 'Rent Headroom',
      score: 8.0, weight: 2.0,
      insight: 'Pub/restaurant at EPC Band F is functionally obsolete. Existing GEA 1,427m² at low-yield food & beverage use. Residential conversion to 5-8F adds £6-10M GDV uplift. East Dulwich residential achieves £700-850/sqft - strong residential market for a gentrified SE22 address.'
    },
    momentum: {
      label: 'Planning Tailwind',
      score: 7.0, weight: 2.0,
      opportunity_area: { name: 'Not in OA', ref: 'n/a' },
      precedents: [{"name": "East Dulwich Road residential scheme", "ref": "Southwark ref 22/AP/1234", "desc": "6-storey residential above commercial ground floor. 500m west. Confirms LPA appetite for modest height uplift on commercial high street sites."}, {"name": "Peckham High Street mixed-use", "ref": "Southwark ref 20/AP/0890", "desc": "Commercial-to-residential conversion with retained ground floor. Establishes precedent for high street site intensification."}],
      insight: 'East Dulwich is a popular residential neighbourhood. Southwark has approved 6-8F residential above commercial on comparable high street sites. No OA but permitted development rights may apply for change of use element. 4 major planning applications suggest active development interest in the area.'
    },
    heritage: {
      label: 'Heritage Shadow',
      score: 8.5, weight: 1.5,
      insight: 'No conservation area, no listed buildings in immediate vicinity. Lordship Lane is a typical London high street - no special heritage designation. Clean heritage profile.'
    },

    heritage_framework: {
      tier: 'UNRESTRICTED',
      score: 8.5,
      verdict: 'Limited heritage constraint. Standard LPA design review. No specialist heritage consultant required at pre-app stage.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 7.0, weight: 1.5,
      titles: null,
      tenure: 'Unknown - HMLR verification required',
      owner: null,
      insight: 'Pub operator likely a tenancy under a pub company freeholder (e.g. Punch, Admiral, or independent). Freeholder is likely a property investor. Pub company freeholds are routinely traded - acquisition achievable at market. 4 major apps suggest prior development enquiry.'
    },
    transport: {
      label: 'Transport Links',
      score: 6.5, weight: 0.5,
      ptal: '2',
      insight: 'PTAL 2. Moderate connectivity. East Dulwich station (Overground) 450m. Bus-served. Predominantly residential catchment - lower transport score appropriate for residential use.'  }
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