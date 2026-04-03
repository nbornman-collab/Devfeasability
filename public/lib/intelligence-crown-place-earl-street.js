// Development Intelligence - Crown Place, Earl Street
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.083564,51.520508],[-0.083244,51.520475],[-0.083266,51.520406],[-0.08333,51.520412],[-0.08336,51.520302],[-0.083245,51.52029],[-0.083283,51.52016],[-0.083324,51.520164],[-0.083319,51.520181],[-0.083447,51.520195],[-0.083457,51.520159],[-0.083658,51.52018],[-0.083564,51.520508]],
  site: "Crown Place, Earl Street",
  borough: '',
  use: 'office',
  address: "1-17 Crown Place, EC2A 4PJ",
  plot_area_m2: 4000,
  existing_gea_m2: 17000,
  existing_floors: 5,
  existing_height_m: 11,
  ftf_m: 3.5,
  max_height_m: 24.5,
  max_floors: 7,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "Crown Place, Earl Street - auto-generated. Verify existing height." },
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
