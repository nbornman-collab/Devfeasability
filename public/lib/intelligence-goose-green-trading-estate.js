// Development Intelligence - Goose Green Trading Estate
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.072503,51.461078],[-0.07217,51.461121],[-0.072108,51.460997],[-0.071908,51.460686],[-0.071509,51.460686],[-0.071507,51.460579],[-0.071505,51.460497],[-0.071574,51.460496],[-0.071574,51.460476],[-0.071474,51.460477],[-0.071473,51.460395],[-0.07165,51.460393],[-0.071651,51.460363],[-0.071986,51.46035],[-0.072189,51.460619],[-0.072439,51.460976],[-0.072503,51.461078]],
  site: "Goose Green Trading Estate",
  borough: 'Southwark',
  use: 'mixed',
  address: "Goose Green Trading Estate",
  plot_area_m2: 33645,
  existing_gea_m2: 114393,
  existing_floors: 4,
  existing_height_m: 12.6,
  ftf_m: 3.5,
  max_height_m: 28,
  max_floors: 8,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 12.6, insight: "Goose Green Trading Estate - auto-generated. Verify existing height." },
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
