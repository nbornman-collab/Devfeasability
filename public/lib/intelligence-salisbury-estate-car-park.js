// Development Intelligence - Salisbury estate car park
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.075431,51.487087],[-0.075453,51.487071],[-0.075448,51.487068],[-0.075545,51.486997],[-0.07555,51.486999],[-0.075574,51.486982],[-0.07579,51.487095],[-0.075833,51.487063],[-0.075913,51.487105],[-0.07585,51.487152],[-0.075865,51.487159],[-0.075761,51.487236],[-0.075746,51.487228],[-0.075727,51.487243],[-0.075431,51.487087]],
  site: "Salisbury estate car park",
  borough: 'Southwark',
  use: 'mixed',
  address: "Salisbury estate car park",
  plot_area_m2: 1040,
  existing_gea_m2: 3536,
  existing_floors: 4,
  existing_height_m: 12.6,
  ftf_m: 3.5,
  max_height_m: 28,
  max_floors: 8,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 12.6, insight: "Salisbury estate car park - auto-generated. Verify existing height." },
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
