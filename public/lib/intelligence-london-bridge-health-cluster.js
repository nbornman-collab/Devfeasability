// Development Intelligence - London Bridge Health Cluster
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.09119,51.503151],[-0.091133,51.503136],[-0.091071,51.503199],[-0.090855,51.503113],[-0.090862,51.503106],[-0.090931,51.503033],[-0.091152,51.503118],[-0.091147,51.503123],[-0.0912,51.503136],[-0.091221,51.503105],[-0.091538,51.503189],[-0.09145,51.503318],[-0.091254,51.503266],[-0.091132,51.503234],[-0.09119,51.503151]],
  site: "London Bridge Health Cluster",
  borough: 'Southwark',
  use: 'mixed',
  address: "London Bridge Health Cluster",
  plot_area_m2: 33614,
  existing_gea_m2: 114288,
  existing_floors: 4,
  existing_height_m: 15.8,
  ftf_m: 4,
  max_height_m: 40,
  max_floors: 10,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 15.8, insight: "London Bridge Health Cluster - auto-generated. Verify existing height." },
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
