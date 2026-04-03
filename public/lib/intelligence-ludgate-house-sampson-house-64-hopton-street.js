// Development Intelligence - Ludgate House & Sampson House, 64 Hopton Street
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.079975,51.52753],[-0.08,51.527531],[-0.080099,51.527533],[-0.080095,51.527551],[-0.080094,51.527569],[-0.079893,51.527572],[-0.079864,51.527696],[-0.07969,51.527691],[-0.079544,51.527691],[-0.079104,51.527667],[-0.079008,51.52766],[-0.079019,51.527592],[-0.079034,51.527516],[-0.079042,51.527471],[-0.079052,51.527415],[-0.079153,51.527412],[-0.079142,51.527337],[-0.079643,51.527326],[-0.079652,51.527326],[-0.079983,51.527331],[-0.080004,51.52733],[-0.080038,51.527344],[-0.08005,51.527354],[-0.080063,51.527365],[-0.080071,51.52738],[-0.080073,51.527395],[-0.07998,51.527394],[-0.079879,51.527393],[-0.079873,51.527529],[-0.079975,51.52753]],
  site: "Ludgate House & Sampson House, 64 Hopton Street",
  borough: 'Southwark',
  use: 'mixed',
  address: "Ludgate House & Sampson House, 64 Hopton Street",
  plot_area_m2: 19660,
  existing_gea_m2: 50133,
  existing_floors: 3,
  existing_height_m: 15.8,
  ftf_m: 4,
  max_height_m: 40,
  max_floors: 10,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 15.8, insight: "Ludgate House & Sampson House, 64 Hopton Street - auto-generated. Verify existing height." },
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
