// Development Intelligence - Harmsworth Quays, Surrey Quays Leisure Park, Surrey Quays Shopping Centre and Robert's Close
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.046548,51.4988],[-0.046605,51.498825],[-0.046659,51.498849],[-0.046731,51.498841],[-0.046768,51.498857],[-0.046857,51.498781],[-0.046817,51.498764],[-0.046811,51.498717],[-0.046694,51.498669],[-0.046633,51.498675],[-0.046593,51.498671],[-0.046512,51.498742],[-0.046545,51.498757],[-0.046548,51.4988]],
  site: "Harmsworth Quays, Surrey Quays Leisure Park, Surrey Quays Shopping Centre and Robert's Close",
  borough: 'Southwark',
  use: 'mixed',
  address: "Harmsworth Quays, Surrey Quays Leisure Park, Surrey Quays Shopping Centre and Robert's Close",
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
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 15.8, insight: "Harmsworth Quays, Surrey Quays Leisure Park, Surrey Quays Shopping Centre and Robert's Close - auto-generated. Verify existing height." },
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
