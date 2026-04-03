// Development Intelligence - Curtain Road Warehouse District
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.083544,51.525234],[-0.083575,51.525142],[-0.083585,51.52512],[-0.083596,51.525061],[-0.082754,51.524969],[-0.08261,51.524961],[-0.082328,51.524943],[-0.082317,51.524974],[-0.082412,51.52499],[-0.082404,51.525015],[-0.082282,51.525],[-0.082269,51.525041],[-0.082332,51.52505],[-0.082325,51.525068],[-0.082479,51.525087],[-0.082652,51.525109],[-0.082651,51.525112],[-0.083544,51.525234]],
  site: "Curtain Road Warehouse District",
  borough: 'Hackney',
  use: 'mixed',
  address: "Curtain Road EC2A, London, London",
  plot_area_m2: 3500,
  existing_gea_m2: 20825,
  existing_floors: 7,
  existing_height_m: 23.6,
  ftf_m: 4,
  max_height_m: 60,
  max_floors: 15,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 23.6, insight: "Curtain Road Warehouse District - auto-generated. Verify existing height." },
    value: { label: 'Rent Headroom', score: 6.0, weight: 2.0, insight: "Hackney mixed-use. Verify market data." },
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
    air_quality: { aqma: true, aqma_name: 'Hackney AQMA', note: 'Assumed borough-wide AQMA. Verify.' }
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
