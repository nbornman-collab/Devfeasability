// Development Intelligence - Land at Royal Mint Street
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.070806,51.509832],[-0.070717,51.509845],[-0.070733,51.509885],[-0.070552,51.509912],[-0.070562,51.509938],[-0.070443,51.509956],[-0.070478,51.510049],[-0.070452,51.510053],[-0.070471,51.510101],[-0.070434,51.510106],[-0.070125,51.510152],[-0.070137,51.510183],[-0.070066,51.510194],[-0.07009,51.510258],[-0.07017,51.510246],[-0.070176,51.510261],[-0.070464,51.510218],[-0.070455,51.510196],[-0.070479,51.510193],[-0.070503,51.510189],[-0.070527,51.51025],[-0.070626,51.510235],[-0.07057,51.510091],[-0.07063,51.510082],[-0.070624,51.510066],[-0.070684,51.510056],[-0.070677,51.510039],[-0.070809,51.510019],[-0.070798,51.509991],[-0.070864,51.509981],[-0.070806,51.509832]],
  site: "Land at Royal Mint Street",
  borough: '',
  use: 'mixed',
  address: "Royal Mint Street, E1 8LG",
  plot_area_m2: 8000,
  existing_gea_m2: 20400,
  existing_floors: 3,
  existing_height_m: 11,
  ftf_m: 3.5,
  max_height_m: 24.5,
  max_floors: 7,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "Land at Royal Mint Street - auto-generated. Verify existing height." },
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
