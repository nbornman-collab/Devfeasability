// Development Intelligence - Guys and St Thomas Trust Rehabilitation Centre, Crystal Palace
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.106833,51.438147],[-0.106482,51.438425],[-0.106303,51.438561],[-0.106274,51.438584],[-0.106235,51.4386],[-0.10619,51.438607],[-0.106143,51.438604],[-0.106101,51.438591],[-0.106068,51.43857],[-0.106048,51.438544],[-0.106044,51.438514],[-0.106055,51.438486],[-0.106081,51.438462],[-0.106207,51.438364],[-0.106199,51.438338],[-0.10619,51.438313],[-0.106054,51.438333],[-0.105931,51.437976],[-0.105968,51.43796],[-0.10599,51.437951],[-0.10601,51.437947],[-0.106015,51.437946],[-0.106035,51.437943],[-0.106031,51.437932],[-0.106067,51.437928],[-0.106099,51.437928],[-0.106127,51.437929],[-0.106154,51.437932],[-0.106181,51.437937],[-0.106242,51.438124],[-0.106291,51.438117],[-0.106331,51.438237],[-0.106316,51.43824],[-0.106325,51.438273],[-0.106523,51.438119],[-0.106623,51.438041],[-0.106636,51.438048],[-0.106833,51.438147]],
  site: "Guys and St Thomas Trust Rehabilitation Centre, Crystal Palace",
  borough: 'Southwark',
  use: 'mixed',
  address: "Guys and St Thomas Trust Rehabilitation Centre, Crystal Palace",
  plot_area_m2: 33662,
  existing_gea_m2: 114451,
  existing_floors: 4,
  existing_height_m: 14.2,
  ftf_m: 4,
  max_height_m: 36,
  max_floors: 9,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 14.2, insight: "Guys and St Thomas Trust Rehabilitation Centre, Crystal Palace - auto-generated. Verify existing height." },
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
