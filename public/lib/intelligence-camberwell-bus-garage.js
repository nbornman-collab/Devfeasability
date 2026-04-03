// Development Intelligence - Camberwell Bus Garage
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.094477,51.474326],[-0.096362,51.473194],[-0.096608,51.47336],[-0.096807,51.473494],[-0.096966,51.47358],[-0.096926,51.473612],[-0.096736,51.473531],[-0.096591,51.473619],[-0.096143,51.473888],[-0.095634,51.474183],[-0.095658,51.474205],[-0.095238,51.474456],[-0.095121,51.474385],[-0.094858,51.474435],[-0.094526,51.47449],[-0.094477,51.474467],[-0.094458,51.474458],[-0.094538,51.474368],[-0.094477,51.474326]],
  site: "Camberwell Bus Garage",
  borough: 'Southwark',
  use: 'mixed',
  address: "Camberwell Bus Garage",
  plot_area_m2: 33636,
  existing_gea_m2: 142953,
  existing_floors: 5,
  existing_height_m: 15.8,
  ftf_m: 4,
  max_height_m: 40,
  max_floors: 10,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 15.8, insight: "Camberwell Bus Garage - auto-generated. Verify existing height." },
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
