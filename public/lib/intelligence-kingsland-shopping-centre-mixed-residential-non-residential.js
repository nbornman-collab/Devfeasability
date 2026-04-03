// Development Intelligence - Kingsland Shopping Centre (Mixed Residential/Non-Residential)
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.075113,51.547516],[-0.074347,51.54751],[-0.074352,51.547401],[-0.074055,51.547398],[-0.07405,51.547505],[-0.073919,51.547503],[-0.073928,51.547199],[-0.073851,51.547193],[-0.07385,51.54716],[-0.073794,51.547033],[-0.073647,51.547033],[-0.073648,51.547196],[-0.073294,51.547193],[-0.073294,51.547221],[-0.072791,51.547209],[-0.072791,51.547281],[-0.072708,51.54728],[-0.072706,51.547323],[-0.072614,51.547321],[-0.072605,51.54759],[-0.07255,51.54759],[-0.072557,51.547452],[-0.072422,51.547452],[-0.071785,51.547448],[-0.071771,51.547763],[-0.072397,51.547812],[-0.07254,51.547825],[-0.072769,51.547846],[-0.072768,51.547871],[-0.074062,51.547961],[-0.074053,51.547997],[-0.074048,51.548018],[-0.07404,51.548049],[-0.074035,51.54807],[-0.074032,51.548083],[-0.074251,51.5481],[-0.07444,51.548076],[-0.074458,51.547968],[-0.074532,51.547993],[-0.074615,51.548002],[-0.074611,51.547968],[-0.074682,51.54797],[-0.074818,51.547973],[-0.07482,51.547996],[-0.074924,51.547996],[-0.074921,51.547885],[-0.075017,51.547888],[-0.075057,51.54789],[-0.075311,51.547899],[-0.075325,51.547839],[-0.07534,51.547772],[-0.075344,51.547758],[-0.075352,51.54772],[-0.075372,51.547627],[-0.075148,51.547611],[-0.075119,51.547608],[-0.075113,51.547516]],
  site: "Kingsland Shopping Centre (Mixed Residential/Non-Residential)",
  borough: 'Hackney',
  use: 'mixed',
  address: "Kingsland Shopping Centre (Mixed Residential/Non-Residential), London",
  plot_area_m2: 24500,
  existing_gea_m2: 62475,
  existing_floors: 3,
  existing_height_m: 14.2,
  ftf_m: 4,
  max_height_m: 36,
  max_floors: 9,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 14.2, insight: "Kingsland Shopping Centre (Mixed Residential/Non-Residential) - auto-generated. Verify existing height." },
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
