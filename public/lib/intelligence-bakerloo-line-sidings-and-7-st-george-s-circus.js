// Development Intelligence - Bakerloo Line Sidings and 7 St George's Circus
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.105525,51.497774],[-0.105631,51.497723],[-0.105656,51.497741],[-0.105665,51.497748],[-0.105767,51.497694],[-0.105796,51.497714],[-0.105835,51.497743],[-0.105866,51.497767],[-0.105896,51.49779],[-0.105603,51.497946],[-0.105618,51.497957],[-0.105632,51.497968],[-0.104958,51.498359],[-0.104829,51.498353],[-0.104809,51.498341],[-0.104676,51.498258],[-0.105525,51.497774]],
  site: "Bakerloo Line Sidings and 7 St George's Circus",
  borough: 'Southwark',
  use: 'mixed',
  address: "Bakerloo Line Sidings and 7 St George's Circus",
  plot_area_m2: 12000,
  existing_gea_m2: 51000,
  existing_floors: 5,
  existing_height_m: 15.8,
  ftf_m: 4,
  max_height_m: 40,
  max_floors: 10,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 15.8, insight: "Bakerloo Line Sidings and 7 St George's Circus - auto-generated. Verify existing height." },
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
