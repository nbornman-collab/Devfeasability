// Development Intelligence - Smithfield Market, EC1
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.10238,51.518693],[-0.102586,51.518943],[-0.102787,51.519189],[-0.102825,51.519177],[-0.102897,51.519265],[-0.101651,51.519658],[-0.101619,51.519619],[-0.101571,51.519634],[-0.101524,51.519649],[-0.101557,51.519689],[-0.100309,51.520082],[-0.099763,51.519411],[-0.101,51.519021],[-0.101027,51.519054],[-0.101085,51.519036],[-0.101145,51.519017],[-0.101116,51.518981],[-0.102346,51.518594],[-0.102417,51.518681],[-0.10238,51.518693]],
  site: "Smithfield Market, EC1",
  borough: '',
  use: 'mixed',
  address: "Smithfield Market, EC1A 9PS",
  plot_area_m2: 25000,
  existing_gea_m2: 63750,
  existing_floors: 3,
  existing_height_m: 11,
  ftf_m: 3.5,
  max_height_m: 24.5,
  max_floors: 7,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "Smithfield Market, EC1 - auto-generated. Verify existing height." },
    value: { label: 'Rent Headroom', score: 6.0, weight: 2.0, insight: " mixed. Verify market data." },
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
