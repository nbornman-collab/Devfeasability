// Development Intelligence - Chatelaine House, Walworth Road
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.096635,51.489513],[-0.09678,51.489477],[-0.096802,51.489511],[-0.097073,51.489443],[-0.097123,51.489519],[-0.097142,51.489514],[-0.097169,51.489555],[-0.09698,51.489602],[-0.097099,51.489786],[-0.097203,51.48976],[-0.097232,51.489805],[-0.097168,51.489821],[-0.09718,51.489833],[-0.097257,51.489947],[-0.096967,51.490024],[-0.096635,51.489513]],
  site: "Chatelaine House, Walworth Road",
  borough: 'Southwark',
  use: 'mixed',
  address: "Chatelaine House, Walworth Road",
  plot_area_m2: 33624,
  existing_gea_m2: 85741,
  existing_floors: 3,
  existing_height_m: 9.5,
  ftf_m: 3.5,
  max_height_m: 21,
  max_floors: 6,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 9.5, insight: "Chatelaine House, Walworth Road - auto-generated. Verify existing height." },
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
