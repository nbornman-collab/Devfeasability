// Development Intelligence - Copeland Industrial Park and 1-27 Bournemouth Road
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.065322,51.469912],[-0.065282,51.469943],[-0.065194,51.469899],[-0.065179,51.469911],[-0.065107,51.469875],[-0.065161,51.469832],[-0.065216,51.46979],[-0.065288,51.469826],[-0.065275,51.469836],[-0.065363,51.46988],[-0.065322,51.469912]],
  site: "Copeland Industrial Park and 1-27 Bournemouth Road",
  borough: 'Southwark',
  use: 'mixed',
  address: "Copeland Industrial Park and 1-27 Bournemouth Road",
  plot_area_m2: 11670,
  existing_gea_m2: 49598,
  existing_floors: 5,
  existing_height_m: 15.8,
  ftf_m: 4,
  max_height_m: 40,
  max_floors: 10,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 15.8, insight: "Copeland Industrial Park and 1-27 Bournemouth Road - auto-generated. Verify existing height." },
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
