// Development Intelligence - 1, 3, 5, 7 Dalston Lane, (Dalston Western Curve), & 1-7 Ashwin Street (Mixed Residential/Non-Residential)
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.074239,51.546589],[-0.074218,51.546569],[-0.074207,51.546546],[-0.07421,51.546523],[-0.074226,51.546501],[-0.074252,51.546483],[-0.074283,51.546473],[-0.074318,51.54647],[-0.074353,51.546473],[-0.074384,51.546482],[-0.074409,51.546497],[-0.074426,51.546516],[-0.074432,51.546538],[-0.074427,51.546561],[-0.074409,51.546582],[-0.074381,51.546599],[-0.074345,51.546608],[-0.074307,51.546609],[-0.07427,51.546603],[-0.074239,51.546589]],
  site: "1, 3, 5, 7 Dalston Lane, (Dalston Western Curve), & 1-7 Ashwin Street (Mixed Residential/Non-Residential)",
  borough: 'Hackney',
  use: 'mixed',
  address: "1, 3, 5, 7 Dalston Lane, (Dalston Western Curve), & 1-7 Ashwin Street (Mixed Residential/Non-Residential), London",
  plot_area_m2: 2000,
  existing_gea_m2: 5100,
  existing_floors: 3,
  existing_height_m: 11,
  ftf_m: 3.5,
  max_height_m: 24.5,
  max_floors: 7,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "1, 3, 5, 7 Dalston Lane, (Dalston Western Curve), & 1-7 Ashwin Street (Mixed Residential/Non-Residential) - auto-generated. Verify existing height." },
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
