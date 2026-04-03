// Development Intelligence - Curtain Road, Worship Street
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.081183,51.524314],[-0.0812,51.524327],[-0.080965,51.524515],[-0.080892,51.524573],[-0.080871,51.524573],[-0.080812,51.524539],[-0.080766,51.524513],[-0.080747,51.524502],[-0.080628,51.524434],[-0.080575,51.524404],[-0.08055,51.524389],[-0.080442,51.524327],[-0.080445,51.524296],[-0.080634,51.524301],[-0.080669,51.524301],[-0.08074,51.524303],[-0.080866,51.524306],[-0.081004,51.52431],[-0.081049,51.524311],[-0.081183,51.524314]],
  site: "Curtain Road, Worship Street",
  borough: '',
  use: 'office',
  address: "Curtain Road, EC2A 3QW",
  plot_area_m2: 3500,
  existing_gea_m2: 14875,
  existing_floors: 5,
  existing_height_m: 11,
  ftf_m: 3.5,
  max_height_m: 24.5,
  max_floors: 7,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "Curtain Road, Worship Street - auto-generated. Verify existing height." },
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
