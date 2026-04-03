// Development Intelligence - 107 Dunton Road (Tesco store and car park) and Southernwood Retail Park
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.075997,51.489246],[-0.075951,51.489225],[-0.07547,51.489006],[-0.07543,51.489041],[-0.07538,51.489018],[-0.075281,51.489101],[-0.075401,51.48916],[-0.075275,51.48921],[-0.075142,51.489151],[-0.075417,51.488772],[-0.075602,51.488613],[-0.075654,51.488637],[-0.07577,51.488538],[-0.075814,51.488558],[-0.07602,51.488383],[-0.076103,51.488421],[-0.076139,51.48839],[-0.076451,51.488532],[-0.076535,51.48846],[-0.076867,51.488612],[-0.076732,51.488725],[-0.076603,51.488837],[-0.07652,51.4888],[-0.075997,51.489246]],
  site: "107 Dunton Road (Tesco store and car park) and Southernwood Retail Park",
  borough: 'Southwark',
  use: 'mixed',
  address: "107 Dunton Road (Tesco store and car park) and Southernwood Retail Park",
  plot_area_m2: 33625,
  existing_gea_m2: 142906,
  existing_floors: 5,
  existing_height_m: 15.8,
  ftf_m: 4,
  max_height_m: 40,
  max_floors: 10,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 15.8, insight: "107 Dunton Road (Tesco store and car park) and Southernwood Retail Park - auto-generated. Verify existing height." },
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
