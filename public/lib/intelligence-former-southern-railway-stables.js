// Development Intelligence - Former Southern Railway Stables
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.064801,51.487708],[-0.06546,51.487785],[-0.065394,51.488004],[-0.06533,51.487997],[-0.065379,51.487833],[-0.064784,51.487763],[-0.064801,51.487708]],
  site: "Former Southern Railway Stables",
  borough: 'Southwark',
  use: 'mixed',
  address: "Former Southern Railway Stables",
  plot_area_m2: 33626,
  existing_gea_m2: 114328,
  existing_floors: 4,
  existing_height_m: 14.2,
  ftf_m: 4,
  max_height_m: 36,
  max_floors: 9,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 14.2, insight: "Former Southern Railway Stables - auto-generated. Verify existing height." },
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
