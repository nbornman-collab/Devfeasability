// Development Intelligence - 15-16 Minories and 62 Aldgate High Street
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.075175,51.511657],[-0.075201,51.511669],[-0.075287,51.511939],[-0.075273,51.511961],[-0.074998,51.51199],[-0.074991,51.511982],[-0.07498,51.511926],[-0.074668,51.511954],[-0.074657,51.511973],[-0.074624,51.511976],[-0.074608,51.51196],[-0.074291,51.511987],[-0.074304,51.512046],[-0.074288,51.512054],[-0.074036,51.512073],[-0.074014,51.512063],[-0.07398,51.511924],[-0.073922,51.511926],[-0.073885,51.511777],[-0.073898,51.511767],[-0.074223,51.511739],[-0.074241,51.511746],[-0.074256,51.511783],[-0.074571,51.51176],[-0.07458,51.511753],[-0.07461,51.511751],[-0.074625,51.511756],[-0.074939,51.511732],[-0.074924,51.511688],[-0.074935,51.511676],[-0.075175,51.511657]],
  site: "15-16 Minories and 62 Aldgate High Street",
  borough: '',
  use: 'office',
  address: "15-16 Minories, EC3N 1EX",
  plot_area_m2: 3000,
  existing_gea_m2: 7650,
  existing_floors: 3,
  existing_height_m: 11,
  ftf_m: 3.5,
  max_height_m: 24.5,
  max_floors: 7,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "15-16 Minories and 62 Aldgate High Street - auto-generated. Verify existing height." },
    value: { label: 'Rent Headroom', score: 6.0, weight: 2.0, insight: " office. Verify market data." },
    momentum: { label: 'Planning Tailwind', score: 6, weight: 2.0, insight: "Standard planning context." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Auto-generated. Verify heritage constraints." },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown', owner: null, insight: "HMLR data pending." },
    transport: { label: 'Transport Links', score: 8.5, weight: 0.5, ptal: '6a', insight: "PTAL 6a." }
  },
  environment: {
    flood_zone: 1,
    surface_water_risk: 'unknown',
    historic_landfill: false,
    contamination_screening: 'unknown',
    strategic_noise: 'unknown',
    air_quality: { aqma: true, aqma_name: ' AQMA', note: 'Assumed borough-wide AQMA. Verify.' }
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
