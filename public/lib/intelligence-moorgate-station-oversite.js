// Development Intelligence - Moorgate Station Oversite
// Air Rights typology: oversite | Oversail potential: high
// PTAL: 6b | OA: false | CAZ: true
const SITE_INTELLIGENCE = {
  polygon: [[-0.087465, 51.518073], [-0.087264, 51.518267], [-0.087042, 51.518353], [-0.087264, 51.518653], [-0.087463, 51.518585], [-0.087541, 51.518608], [-0.087523, 51.518642], [-0.087746, 51.518692], [-0.087762, 51.518662], [-0.087805, 51.518673], [-0.087856, 51.518584], [-0.08796, 51.518405], [-0.087983, 51.518371], [-0.087998, 51.518345], [-0.08803, 51.518286], [-0.088082, 51.51819], [-0.088092, 51.518173], [-0.087791, 51.518124], [-0.087465, 51.518073]],
  site: "Moorgate Station Oversite",
  borough: 'City of London',
  air_rights: {
    type: "oversite",
    oversail_potential: "high",
    air_column_m2: 5500,
    oversail_factor: 1.35,
    estimated_gia_with_oversail: 118800,
    legal_mechanism: "Complex Infrastructure Agreement (NR/TfL) + planning consent",
    note: 'Oversail into adjacent airspace may be enabled by S.203 Housing and Planning Act 2016. Party wall agreements required for first 6F. LPA has discretion to override private law rights above that level.'
  },
  factors: {
    sky: {
      label: 'Available Sky',
      score: 8.0, weight: 2.5,
      existing_m: 12.0,
      precedent_m: 80,
      sky_m: 68.0,
      factor: '5.7x',
      insight: '68.0m of developable air column above existing structure to cluster consent height of 80m. Air rights typology: oversite. Oversail potential high - increases effective GIA above base footprint.'
    },
    value: {
      label: 'Rent Headroom',
      score: 9.5, weight: 2.0,
      existing_rent: 900,
      new_build_rent: 1100,
      uplift_pct: 22,
      insight: 'City cluster prime Grade A rents: £900-1100/m² NIA. Air rights schemes command premium positioning. No existing tenant disruption risk where oversite is above operational infrastructure.'
    },
    momentum: {
      label: 'Planning Tailwind',
      score: 8.5, weight: 2.0,
      cluster: 'City Cluster EC2/EC3',
      opportunity_area: {
        name: 'City Cluster',
        ref: 'City of London Local Plan 2040 Policy CS1 + Tall Building Zone',
        implication: 'City Corporation actively promotes tall buildings in the cluster. NPPF presumption in favour of development. Air rights and oversite development specifically encouraged in Local Plan evidence base.'
      },
      consents: 3,
      precedents: [
      {
            "name": "Crossrail Place, Canary Wharf E14",
            "ref": "Network Rail/TfL oversite. Retail + roof garden + office. Completed 2015. Canary Wharf Group."
      },
      {
            "name": "Southwark Station Oversite, SE1",
            "ref": "TfL oversite above Jubilee Line. Mixed-use 29F tower. Completed 2020. Native Land."
      }
],
      insight: 'City of London Corporation has approved 20F equivalent in this location. Local Plan 2040 designates site within Tall Building Zone. Air rights delivery mechanism well-precedented at Liverpool Street, Cannon Place, and Southwark Station (TfL portfolio).'
    },
    heritage: {
      label: 'Heritage Shadow',
      score: 7.5, weight: 1.5,
      statutory: {
        listed_buildings: 'Check radius - EC2/EC3 contains Grade I listed churches (Wren). St Paul\'s Cathedral viewing corridor applies SW of site.',
        conservation_areas: 'City cluster sits outside main conservation areas. Monument viewing corridor: check alignment.'
      },
      insight: 'City cluster designation explicitly permits tall buildings. Main heritage constraint is St Paul\'s viewing corridors - check alignment at this specific location. Wren churches require daylight/sunlight assessment but not height restriction per se.'
    },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      nhle_verified: true, nhle_date: '2026-03-25',
      nhle_on_site: [],
      nhle_adjacent: ['Lutyens House (GrII*, 1064691)'],
      score: 7.5,
      verdict: 'TfL oversite. Small footprint. Moorfields/London Wall context is post-war commercial - limited heritage constraint. EC2 cluster consent precedent nearby.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 5.0, weight: 1.5,
      title_type: "Network Rail freehold",
      complexity: "High - NR/TfL lease required",
      insight: 'Air rights acquisition requires structured deal with "Network Rail or TfL". Long-leasehold airspace interest typical. Oversail licences required from affected neighbours - City Corporation may use S.203 to facilitate.'
    },
    transport: {
      label: 'Transport Links',
      score: 10.0, weight: 0.5,
      ptal: "6b",
      nearest_station: 'On-station or within 200m',
      insight: 'PTAL 6b - maximum achievable score. Station proximity is the core air rights asset. Oversite development directly above transport interchange.'
    }
  },
  site: {
    address: "Moorgate, London EC2Y 9AE",
    borough: 'City of London',
    use_class: 'E (Commercial)',
    plot_area_m2: 3091,
    existing_height_m: 12.0,
    max_consented_height_m: 80,
    max_floors: 20,
    ftf_m: 4.0,
    ptal: "6b",
    oa: false,
    caz: true,
    air_rights_type: "oversite",
    score: 80
  },
  // -- ENVIRONMENTAL & REGULATORY SCREENING --
  environment: {
    flood_zone: 1,
    surface_water_risk: 'low',
    historic_landfill: false,
    contamination_screening: 'low',
    strategic_noise: 'moderate',
    air_quality: { aqma: true, aqma_name: 'City of London AQMA (borough-wide)', note: 'Borough-wide AQMA. Standard for inner London. Not a material cost uplift for commercial schemes.' }
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