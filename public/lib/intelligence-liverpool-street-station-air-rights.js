// Development Intelligence - Liverpool Street Station Air Rights
// Air Rights typology: oversite | Oversail potential: low
// PTAL: 6b | OA: true | CAZ: true
const SITE_INTELLIGENCE = {
  polygon: [[-0.081644, 51.519727], [-0.08036, 51.519452], [-0.080292, 51.519437], [-0.080265, 51.519432], [-0.080727, 51.5186], [-0.081156, 51.517913], [-0.081246, 51.517745], [-0.081197, 51.517734], [-0.081036, 51.517701], [-0.080937, 51.51768], [-0.080943, 51.517669], [-0.080949, 51.517658], [-0.080973, 51.517614], [-0.080981, 51.517598], [-0.080989, 51.517584], [-0.080997, 51.517569], [-0.081021, 51.517525], [-0.081026, 51.517516], [-0.081033, 51.517502], [-0.081141, 51.517524], [-0.081246, 51.517546], [-0.081277, 51.517552], [-0.081305, 51.517558], [-0.081331, 51.517563], [-0.08143, 51.517584], [-0.081635, 51.517626], [-0.081743, 51.517648], [-0.081828, 51.517665], [-0.081996, 51.5177], [-0.082001, 51.51769], [-0.082004, 51.517684], [-0.082011, 51.517673], [-0.082027, 51.517641], [-0.082312, 51.517701], [-0.082421, 51.517724], [-0.082461, 51.517732], [-0.082489, 51.517682], [-0.082548, 51.517695], [-0.082571, 51.517653], [-0.082712, 51.517683], [-0.082688, 51.517727], [-0.082726, 51.517735], [-0.082698, 51.517781], [-0.082622, 51.517921], [-0.082589, 51.517983], [-0.082564, 51.518028], [-0.082532, 51.518088], [-0.082507, 51.518136], [-0.08248, 51.518184], [-0.082261, 51.518589], [-0.082207, 51.518689], [-0.081789, 51.519459], [-0.081644, 51.519727]],
  site: "Liverpool Street Station Air Rights",
  borough: 'City of London',
  air_rights: {
    type: "oversite",
    oversail_potential: "low",
    air_column_m2: 22000,
    oversail_factor: 1.05,
    estimated_gia_with_oversail: 924000,
    legal_mechanism: "Complex Infrastructure Agreement (NR/TfL) + planning consent",
    note: 'Oversail into adjacent airspace may be enabled by S.203 Housing and Planning Act 2016. Party wall agreements required for first 6F. LPA has discretion to override private law rights above that level.'
  },
  factors: {
    sky: {
      label: 'Available Sky',
      score: 9.5, weight: 2.5,
      existing_m: 18.0,
      precedent_m: 200,
      sky_m: 182.0,
      factor: '10.1x',
      insight: '182.0m of developable air column above existing structure to cluster consent height of 200m. Air rights typology: oversite. Oversail potential low - increases effective GIA above base footprint.'
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
      score: 10.0, weight: 2.0,
      cluster: 'City Cluster EC2/EC3',
      opportunity_area: {
        name: 'City Cluster',
        ref: 'City of London Local Plan 2040 Policy CS1 + Tall Building Zone',
        implication: 'City Corporation actively promotes tall buildings in the cluster. NPPF presumption in favour of development. Air rights and oversite development specifically encouraged in Local Plan evidence base.'
      },
      consents: 3,
      precedents: [
      {
            "name": "Broadgate Tower, Exchange Square EC2",
            "ref": "Oversite development above Liverpool Street approach. 35F completed 2009. Stanhope/Axa/British Land."
      },
      {
            "name": "100 Liverpool Street, EC2",
            "ref": "NR oversite scheme. 520,000 sqft Grade A. Completed 2021. British Land. 18F above concourse."
      }
],
      insight: 'City of London Corporation has approved 50F equivalent in this location. Local Plan 2040 designates site within Tall Building Zone. Air rights delivery mechanism well-precedented at Liverpool Street, Cannon Place, and Southwark Station (TfL portfolio).'
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
    acquisition: {
      label: 'Title Stack',
      score: 3.5, weight: 1.5,
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
    address: "Liverpool Street, London EC2M 7PY",
    borough: 'City of London',
    use_class: 'E (Commercial)',
    plot_area_m2: 22883,
    existing_height_m: 18.0,
    max_consented_height_m: 200,
    max_floors: 50,
    ftf_m: 4.0,
    ptal: "6b",
    oa: true,
    caz: true,
    air_rights_type: "oversite",
    score: 84
  }
};