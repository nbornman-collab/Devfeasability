// Development Intelligence - Norton Folgate, Spitalfields
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.079887,51.520642],[-0.080102,51.520682],[-0.079913,51.520809],[-0.079798,51.520795],[-0.079314,51.521248],[-0.079214,51.521361],[-0.079076,51.521382],[-0.079035,51.521479],[-0.079028,51.521492],[-0.078761,51.521443],[-0.07885,51.521286],[-0.078932,51.521109],[-0.079,51.520945],[-0.079043,51.520794],[-0.079063,51.520702],[-0.079071,51.520677],[-0.079086,51.520658],[-0.079115,51.52063],[-0.079159,51.520609],[-0.079244,51.520589],[-0.079412,51.52059],[-0.079552,51.5206],[-0.079719,51.520617],[-0.079887,51.520642]],
  site: "Norton Folgate, Spitalfields",
  borough: '',
  use: 'office',
  address: "Norton Folgate, E1 6DB",
  plot_area_m2: 5000,
  existing_gea_m2: 55250,
  existing_floors: 13,
  existing_height_m: 11,
  ftf_m: 3.5,
  max_height_m: 24.5,
  max_floors: 7,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "Norton Folgate, Spitalfields - auto-generated. Verify existing height." },
    value: { label: 'Rent Headroom', score: 6.0, weight: 2.0, insight: " office. Verify market data." },
    momentum: { label: 'Planning Tailwind', score: 6, weight: 2.0, insight: "Standard planning context." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Auto-generated. Verify heritage constraints." },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown', owner: null, insight: "HMLR data pending." },
    transport: { label: 'Transport Links', score: 8.5, weight: 0.5, ptal: '6b', insight: "PTAL 6b." }
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
