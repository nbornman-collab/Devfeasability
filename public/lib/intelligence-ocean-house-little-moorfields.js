// Development Intelligence - Ocean House, Little Moorfields
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.095185,51.510821],[-0.095436,51.510856],[-0.095432,51.510866],[-0.095464,51.51087],[-0.095454,51.510895],[-0.095448,51.510914],[-0.095425,51.51091],[-0.095422,51.510918],[-0.095385,51.511024],[-0.095357,51.511099],[-0.09533,51.511172],[-0.095311,51.511223],[-0.0953,51.511253],[-0.095297,51.511261],[-0.095028,51.511229],[-0.095035,51.511215],[-0.095044,51.51119],[-0.095061,51.511147],[-0.095085,51.51108],[-0.095103,51.511029],[-0.095155,51.510884],[-0.095166,51.510854],[-0.095173,51.510837],[-0.095179,51.510838],[-0.095185,51.510821]],
  site: "Ocean House, Little Moorfields",
  borough: '',
  use: 'office',
  address: "Ocean House, EC2Y 9AE",
  plot_area_m2: 4500,
  existing_gea_m2: 22950,
  existing_floors: 6,
  existing_height_m: 11,
  ftf_m: 3.5,
  max_height_m: 24.5,
  max_floors: 7,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "Ocean House, Little Moorfields - auto-generated. Verify existing height." },
    value: { label: 'Rent Headroom', score: 6.0, weight: 2.0, insight: " office. Verify market data." },
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
