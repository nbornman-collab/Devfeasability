// Development Intelligence - 100 Leadenhall Street
// Air Rights typology: airspace | Oversail potential: high
// PTAL: 6b | OA: true | CAZ: true
const SITE_INTELLIGENCE = {
  polygon: [[-0.080134, 51.513075], [-0.079966, 51.513081], [-0.079937, 51.513085], [-0.079917, 51.513096], [-0.079901, 51.513108], [-0.079896, 51.513117], [-0.079886, 51.513152], [-0.079872, 51.513151], [-0.07984, 51.51327], [-0.079797, 51.51339], [-0.079777, 51.513455], [-0.079722, 51.51355], [-0.079572, 51.513753], [-0.07956, 51.51377], [-0.079541, 51.513799], [-0.079505, 51.513847], [-0.079502, 51.51385], [-0.079502, 51.513851], [-0.079501, 51.513851], [-0.079399, 51.514024], [-0.079388, 51.514043], [-0.079405, 51.514025], [-0.079449, 51.513968], [-0.079524, 51.513989], [-0.079642, 51.514021], [-0.079664, 51.514027], [-0.079675, 51.514028], [-0.079725, 51.514035], [-0.079761, 51.514038], [-0.079775, 51.514039], [-0.079788, 51.51404], [-0.079863, 51.514037], [-0.080062, 51.514035], [-0.080185, 51.514034], [-0.080185, 51.514044], [-0.080337, 51.514041], [-0.080415, 51.514026], [-0.080469, 51.514007], [-0.080536, 51.513977], [-0.08057, 51.513944], [-0.08057, 51.513944], [-0.080581, 51.513923], [-0.080591, 51.513909], [-0.080603, 51.513893], [-0.080612, 51.513886], [-0.080634, 51.513867], [-0.080672, 51.513854], [-0.080686, 51.51385], [-0.080709, 51.513844], [-0.080728, 51.513841], [-0.08075, 51.513837], [-0.080777, 51.513831], [-0.080808, 51.513822], [-0.080857, 51.513808], [-0.080883, 51.513797], [-0.080912, 51.513785], [-0.080949, 51.513767], [-0.080953, 51.513765], [-0.080964, 51.513759], [-0.080972, 51.51375], [-0.080992, 51.513731], [-0.081014, 51.513741], [-0.081028, 51.513714], [-0.081067, 51.513635], [-0.0809, 51.513634], [-0.080874, 51.513635], [-0.080867, 51.513664], [-0.080858, 51.51368], [-0.080854, 51.513683], [-0.080846, 51.513697], [-0.080823, 51.513714], [-0.080807, 51.513721], [-0.080806, 51.513721], [-0.080768, 51.513742], [-0.080764, 51.513744], [-0.080718, 51.513757], [-0.080717, 51.513756], [-0.080661, 51.513764], [-0.080627, 51.51377], [-0.08059, 51.513781], [-0.080575, 51.513786], [-0.080574, 51.513786], [-0.080549, 51.513799], [-0.080535, 51.513806], [-0.080495, 51.513837], [-0.080481, 51.513851], [-0.080468, 51.513865], [-0.080459, 51.513876], [-0.080442, 51.513894], [-0.0804, 51.513924], [-0.080365, 51.513944], [-0.080365, 51.513944], [-0.080363, 51.513944], [-0.080348, 51.513949], [-0.080328, 51.513951], [-0.080301, 51.513952], [-0.080187, 51.513952], [-0.080153, 51.513952], [-0.080067, 51.513953], [-0.079976, 51.513953], [-0.079888, 51.513952], [-0.079757, 51.513953], [-0.079745, 51.513952], [-0.079684, 51.513941], [-0.079617, 51.513925], [-0.079573, 51.513912], [-0.079572, 51.513912], [-0.079566, 51.51391], [-0.079562, 51.513908], [-0.079555, 51.513905], [-0.079548, 51.513901], [-0.079545, 51.513899], [-0.079539, 51.513893], [-0.079533, 51.513887], [-0.079533, 51.513885], [-0.079531, 51.513878], [-0.07953, 51.513871], [-0.07953, 51.513869], [-0.079529, 51.513866], [-0.079537, 51.513856], [-0.079566, 51.513818], [-0.079612, 51.513753], [-0.079625, 51.513734], [-0.079635, 51.513718], [-0.079649, 51.513695], [-0.07969, 51.513624], [-0.079746, 51.513526], [-0.079747, 51.513525], [-0.079759, 51.513504], [-0.079804, 51.513425], [-0.079946, 51.513179], [-0.079952, 51.513169], [-0.079959, 51.51316], [-0.079967, 51.513151], [-0.079972, 51.513146], [-0.079989, 51.513127], [-0.080016, 51.513104], [-0.080039, 51.513092], [-0.080068, 51.513082], [-0.080089, 51.513079], [-0.080106, 51.513077], [-0.080134, 51.513075]],
  site: "100 Leadenhall Street",
  borough: 'City of London',
  air_rights: {
    type: "airspace",
    oversail_potential: "high",
    air_column_m2: 7200,
    oversail_factor: 1.35,
    estimated_gia_with_oversail: 272160,
    legal_mechanism: "Section 203 HPA 2016 + airspace licences",
    note: 'Oversail into adjacent airspace may be enabled by S.203 Housing and Planning Act 2016. Party wall agreements required for first 6F. LPA has discretion to override private law rights above that level.'
  },
  factors: {
    sky: {
      label: 'Available Sky',
      score: 8.0, weight: 2.5,
      existing_m: 48.0,
      precedent_m: 140,
      sky_m: 92.0,
      factor: '1.9x',
      insight: '92.0m of developable air column above existing structure to cluster consent height of 140m. Air rights typology: airspace. Oversail potential high - increases effective GIA above base footprint.'
    },
    value: {
      label: 'Rent Headroom',
      score: 10.0, weight: 2.0,
      existing_rent: 900,
      new_build_rent: 1100,
      uplift_pct: 22,
      insight: 'City cluster prime Grade A rents: £900-1100/m² NIA. Air rights schemes command premium positioning. No existing tenant disruption risk where oversite is above operational infrastructure.'
    },
    momentum: {
      label: 'Planning Tailwind',
      score: 9.5, weight: 2.0,
      cluster: 'City Cluster EC2/EC3',
      opportunity_area: {
        name: 'City Cluster',
        ref: 'City of London Local Plan 2040 Policy CS1 + Tall Building Zone',
        implication: 'City Corporation actively promotes tall buildings in the cluster. NPPF presumption in favour of development. Air rights and oversite development specifically encouraged in Local Plan evidence base.'
      },
      consents: 3,
      precedents: [
      {
            "name": "122 Leadenhall Street (The Cheesegrater), EC3A",
            "ref": "224m / 48F. Completed 2014. British Land / Oxford Properties. Direct cluster benchmark."
      },
      {
            "name": "The Scalpel, 52 Lime Street EC3M",
            "ref": "190m / 38F. Completed 2018. W&P Longbow. Oversails pavement boundary at upper levels - precedent for boundary oversailing in EC3."
      }
],
      insight: 'City of London Corporation has approved 35F equivalent in this location. Local Plan 2040 designates site within Tall Building Zone. Air rights delivery mechanism well-precedented at Liverpool Street, Cannon Place, and Southwark Station (TfL portfolio).'
    },
    heritage: {
      label: 'Heritage Shadow',
      score: 7.0, weight: 1.5,
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
      nhle_adjacent: ["Lloyd's Building (GrI, 1405493)", "Lloyd's Building ancillary (GrII, 1359206)", "139-144 Leadenhall St EC3 (GrII, 1359207)", "147-148 Leadenhall St (GrII, 1252039)"],
      score: 7.0,
      verdict: 'EC3 cluster. No listed building on the 100 Leadenhall plot itself. Lloyd\'s Building (Grade I, Rogers, 1986) immediately adjacent - heritage officer engagement at pre-app mandatory. Design must demonstrably not harm setting of Lloyd\'s. Leadenhall Building adjacent confirms cluster appetite for exceptional architecture. CONTEXTUAL tier: new development responds to listed setting, no mandatory retention.',
      rocketship: 'Rocketship conditions present. No listing on site. Lead with bold massing - but it must hold its own next to Lloyd\'s. Design quality is the test.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 5.0, weight: 1.5,
      title_type: "Single freehold",
      complexity: "Medium - airspace licences required",
      insight: 'Air rights acquisition requires structured deal with "existing freeholder". Long-leasehold airspace interest typical. Oversail licences required from affected neighbours - City Corporation may use S.203 to facilitate.'
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
    address: "100 Leadenhall Street, London EC3A 3DH",
    borough: 'City of London',
    use_class: 'E (Commercial)',
    plot_area_m2: 6000,
    existing_height_m: 24.8,
    existing_floors: 6,
    max_consented_height_m: 140,
    max_floors: 35,
    ftf_m: 4.0,
    ptal: "6b",
    oa: true,
    caz: true,
    air_rights_type: "airspace",
    score: 82
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