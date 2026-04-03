// Development Intelligence - Salvation Army Headquarters, Newington Causeway
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.098389,51.497732],[-0.09851,51.497619],[-0.098573,51.497561],[-0.098554,51.497554],[-0.098202,51.497406],[-0.098222,51.497388],[-0.098043,51.497314],[-0.09795,51.497402],[-0.098039,51.497438],[-0.097968,51.497505],[-0.098193,51.497601],[-0.098156,51.497635],[-0.098389,51.497732]],
  site: "Salvation Army Headquarters, Newington Causeway",
  borough: 'Southwark',
  use: 'mixed',
  address: "Salvation Army Headquarters, Newington Causeway",
  plot_area_m2: 2620,
  existing_gea_m2: 8908,
  existing_floors: 4,
  existing_height_m: 12.6,
  ftf_m: 3.5,
  max_height_m: 28,
  max_floors: 8,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 12.6, insight: "Salvation Army Headquarters, Newington Causeway - auto-generated. Verify existing height." },
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
