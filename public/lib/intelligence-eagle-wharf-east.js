// Development Intelligence - Eagle Wharf East
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.090167,51.531696],[-0.089796,51.531736],[-0.089812,51.531792],[-0.089742,51.5318],[-0.089726,51.531743],[-0.089649,51.531752],[-0.089629,51.53168],[-0.090147,51.531624],[-0.090167,51.531696]],
  site: "Eagle Wharf East",
  borough: 'Hackney',
  use: 'mixed',
  address: "Shepherdess Walk N1, London, London",
  plot_area_m2: 3800,
  existing_gea_m2: 16150,
  existing_floors: 5,
  existing_height_m: 9.5,
  ftf_m: 3.5,
  max_height_m: 21,
  max_floors: 6,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 9.5, insight: "Eagle Wharf East - auto-generated. Verify existing height." },
    value: { label: 'Rent Headroom', score: 6.0, weight: 2.0, insight: "Hackney mixed-use. Verify market data." },
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
    air_quality: { aqma: true, aqma_name: 'Hackney AQMA', note: 'Assumed borough-wide AQMA. Verify.' }
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
