// Development Intelligence - Cannon Street Station Oversite
// Air Rights typology: oversite | Oversail potential: medium
// PTAL: 6b | OA: false | CAZ: true
const SITE_INTELLIGENCE = {
  polygon: [[-0.09092, 51.510695], [-0.089788, 51.510695], [-0.089788, 51.511611], [-0.09092, 51.511611], [-0.09092, 51.510695]],
  site: "Cannon Street Station Oversite",
  borough: 'City of London',
  air_rights: {
    type: "oversite",
    oversail_potential: "medium",
    air_column_m2: 9500,
    oversail_factor: 1.18,
    estimated_gia_with_oversail: 179360,
    legal_mechanism: "Complex Infrastructure Agreement (NR/TfL) + planning consent",
    note: 'Oversail into adjacent airspace may be enabled by S.203 Housing and Planning Act 2016. Party wall agreements required for first 6F. LPA has discretion to override private law rights above that level.'
  },
  factors: {
    sky: {
      label: 'Available Sky',
      score: 8.0, weight: 2.5,
      existing_m: 20.0,
      precedent_m: 80,
      sky_m: 60.0,
      factor: '3.0x',
      insight: '60.0m of developable air column above existing structure to cluster consent height of 80m. Air rights typology: oversite. Oversail potential medium - increases effective GIA above base footprint.'
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
            "name": "Cannon Place, EC4N",
            "ref": "NR oversite development. 9F office above Cannon Street station. Completed 2010. Hines. 490,000 sqft."
      },
      {
            "name": "Waterloo Station Oversite, SE1",
            "ref": "Not City, but same typology - NR oversite above operational platform. Precedent for complex infrastructure delivery."
      }
],
      insight: 'City of London Corporation has approved 20F equivalent in this location. Local Plan 2040 designates site within Tall Building Zone. Air rights delivery mechanism well-precedented at Liverpool Street, Cannon Place, and Southwark Station (TfL portfolio).'
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
      tier: 'navigable',
      score: 5.5,
      verdict: 'Cannon Street Station Grade II* listed - but air rights are ABOVE the listed structure. Heritage argument centres on how the oversite relates to the station form. Cannon Place (2010, 9F) is direct precedent for viable delivery.',
      rocketship: 'Rocketship path: commission heritage consultant before pre-app. Frame scheme as positive heritage intervention. Appeal to NPPF para 202-208 heritage balance test.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 4.5, weight: 1.5,
      title_type: "Network Rail freehold",
      complexity: "High - NR/TfL lease required",
      insight: 'Air rights acquisition requires structured deal with "Network Rail or TfL". Long-leasehold airspace interest typical. Oversail licences required from affected neighbours - City Corporation may use S.203 to facilitate.'
    },
    transport: {
      label: 'Station Gravity',
      score: 10.0, weight: 0.5,
      ptal: "6b",
      nearest_station: 'On-station or within 200m',
      insight: 'PTAL 6b - maximum achievable score. Station proximity is the core air rights asset. Oversite development directly above transport interchange.'
    }
  },
  site: {
    address: "Cannon Street, London EC4N 6AP",
    borough: 'City of London',
    use_class: 'E (Commercial)',
    plot_area_m2: 8000,
    existing_height_m: 20.0,
    max_consented_height_m: 80,
    max_floors: 20,
    ftf_m: 4.0,
    ptal: "6b",
    oa: false,
    caz: true,
    air_rights_type: "oversite",
    score: 79
  }
};