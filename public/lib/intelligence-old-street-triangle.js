// Development Intelligence - Old Street Triangle
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.085433,51.524383],[-0.084413,51.524383],[-0.084413,51.525019],[-0.085433,51.525019],[-0.085433,51.524383]],
  site: "Old Street Triangle",
  borough: 'Hackney',
  use: 'mixed',
  address: "Great Eastern Street EC2A, London, London",
  plot_area_m2: 5000,
  existing_gea_m2: 29750,
  existing_floors: 7,
  existing_height_m: 25.2,
  ftf_m: 4,
  max_height_m: 64,
  max_floors: 16,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 25.2, insight: "Old Street Triangle - auto-generated. Verify existing height." },
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
