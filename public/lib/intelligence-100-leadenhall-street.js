// Development Intelligence - 100 Leadenhall Street
// Air Rights typology: airspace | Oversail potential: high
// PTAL: 6b | OA: true | CAZ: true
const SITE_INTELLIGENCE = {
  polygon: [[-0.083106, 51.513121], [-0.082126, 51.513121], [-0.082126, 51.513915], [-0.083106, 51.513915], [-0.083106, 51.513121]],
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
      tier: 'clean',
      score: 8.5,
      verdict: 'EC3 cluster. Leadenhall Building (Cheesegrater, 2014) adjacent. Monument viewing corridor: confirm alignment. No CA on site. Cluster designation is the primary planning context.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 5.0, weight: 1.5,
      title_type: "Single freehold",
      complexity: "Medium - airspace licences required",
      insight: 'Air rights acquisition requires structured deal with "existing freeholder". Long-leasehold airspace interest typical. Oversail licences required from affected neighbours - City Corporation may use S.203 to facilitate.'
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
    address: "100 Leadenhall Street, London EC3A 3DH",
    borough: 'City of London',
    use_class: 'E (Commercial)',
    plot_area_m2: 6000,
    existing_height_m: 48.0,
    max_consented_height_m: 140,
    max_floors: 35,
    ftf_m: 4.0,
    ptal: "6b",
    oa: true,
    caz: true,
    air_rights_type: "airspace",
    score: 82
  }
};