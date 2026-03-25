// Development Intelligence - Stone House, 128-170 Bishopsgate
// Air Rights typology: airspace | Oversail potential: medium
// PTAL: 6b | OA: true | CAZ: true
const SITE_INTELLIGENCE = {
  polygon: [[-0.081283, 51.516226], [-0.080483, 51.516226], [-0.080483, 51.516874], [-0.081283, 51.516874], [-0.081283, 51.516226]],
  site: "Stone House, 128-170 Bishopsgate",
  borough: 'City of London',
  air_rights: {
    type: "airspace",
    oversail_potential: "medium",
    air_column_m2: 5200,
    oversail_factor: 1.18,
    estimated_gia_with_oversail: 147264,
    legal_mechanism: "Section 203 HPA 2016 + airspace licences",
    note: 'Oversail into adjacent airspace may be enabled by S.203 Housing and Planning Act 2016. Party wall agreements required for first 6F. LPA has discretion to override private law rights above that level.'
  },
  factors: {
    sky: {
      label: 'Available Sky',
      score: 7.5, weight: 2.5,
      existing_m: 60.0,
      precedent_m: 120,
      sky_m: 60.0,
      factor: '1.0x',
      insight: '60.0m of developable air column above existing structure to cluster consent height of 120m. Air rights typology: airspace. Oversail potential medium - increases effective GIA above base footprint.'
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
            "name": "22 Bishopsgate, EC2",
            "ref": "Adjacent cluster benchmark. 62F/278m. Completed 2020. AXA/PLP. Validates maximum height zone."
      },
      {
            "name": "Heron Tower (Salesforce Tower), 110 Bishopsgate",
            "ref": "36F/230m completed 2011. Confirms cluster consent appetite at this exact location."
      }
],
      insight: 'City of London Corporation has approved 30F equivalent in this location. Local Plan 2040 designates site within Tall Building Zone. Air rights delivery mechanism well-precedented at Liverpool Street, Cannon Place, and Southwark Station (TfL portfolio).'
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
      tier: 'manageable',
      nhle_verified: true, nhle_date: '2026-03-25',
      nhle_on_site: [],
      nhle_adjacent: ['2 Drinking Fountains/3 Overthrows/Lanterns (GrII, 1359170)', 'Bishopsgate Parish Memorial (GrII, 1433405)'],
      score: 8.5,
      verdict: 'EC2 Tall Building Zone. 22 Bishopsgate 278m directly adjacent confirms cluster consent appetite. No direct CA. Design quality within cluster context is the test.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 5.5, weight: 1.5,
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
    address: "128-170 Bishopsgate, London EC2M 4HH",
    borough: 'City of London',
    use_class: 'E (Commercial)',
    plot_area_m2: 4000,
    existing_height_m: 60.0,
    max_consented_height_m: 120,
    max_floors: 30,
    ftf_m: 4.0,
    ptal: "6b",
    oa: true,
    caz: true,
    air_rights_type: "airspace",
    score: 82
  }
};