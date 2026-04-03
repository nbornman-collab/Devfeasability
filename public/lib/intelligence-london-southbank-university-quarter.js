// Development Intelligence - London Southbank University Quarter
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.102395,51.497829],[-0.102142,51.497955],[-0.102103,51.497924],[-0.102083,51.497934],[-0.102039,51.4979],[-0.102056,51.497892],[-0.101802,51.497693],[-0.101769,51.497709],[-0.101633,51.497604],[-0.101671,51.497585],[-0.101599,51.497529],[-0.101926,51.497366],[-0.101842,51.497301],[-0.102087,51.497179],[-0.10217,51.497243],[-0.102485,51.497087],[-0.102576,51.497158],[-0.102604,51.497144],[-0.102735,51.497246],[-0.10271,51.497259],[-0.103155,51.497606],[-0.103177,51.497595],[-0.103262,51.497662],[-0.102844,51.49787],[-0.10274,51.497789],[-0.102499,51.497909],[-0.102395,51.497829]],
  site: "London Southbank University Quarter",
  borough: 'Southwark',
  use: 'mixed',
  address: "London Southbank University Quarter",
  plot_area_m2: 33618,
  existing_gea_m2: 142877,
  existing_floors: 5,
  existing_height_m: 15.8,
  ftf_m: 4,
  max_height_m: 40,
  max_floors: 10,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 15.8, insight: "London Southbank University Quarter - auto-generated. Verify existing height." },
    value: { label: 'Rent Headroom', score: 6.0, weight: 2.0, insight: "Southwark mixed-use. Verify market data." },
    momentum: { label: 'Planning Tailwind', score: 6, weight: 2.0, insight: "Standard planning context." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Auto-generated. Verify heritage constraints." },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown', owner: null, insight: "HMLR data pending." },
    transport: { label: 'Transport Links', score: 6, weight: 0.5, ptal: 'unknown', insight: "PTAL unknown." }
  },
  environment: {
    flood_zone: 1,
    surface_water_risk: 'unknown',
    historic_landfill: false,
    contamination_screening: 'unknown',
    strategic_noise: 'unknown',
    air_quality: { aqma: true, aqma_name: 'Southwark AQMA', note: 'Assumed borough-wide AQMA. Verify.' }
  },
  ecology: {
    bng_mandatory: true,
    bng_note: 'Mandatory BNG (10% uplift). Verify habitat baseline.',
    tpo_on_site: false,
    tpo_adjacent: false,
    protected_species_risk: 'unknown'
  },
  _meta: {
    generated: '2026-04-03',
    source: 'batch-intel-generate',
    polygon_source: 'osm',
    needs_verification: true
  }
};
