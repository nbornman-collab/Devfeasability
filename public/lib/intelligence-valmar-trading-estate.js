// Development Intelligence - Valmar Trading Estate
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.093261,51.472637],[-0.093286,51.472804],[-0.093522,51.472839],[-0.093584,51.472858],[-0.093588,51.472978],[-0.093586,51.473028],[-0.093585,51.473068],[-0.093735,51.47307],[-0.093743,51.473012],[-0.093781,51.47301],[-0.093785,51.472967],[-0.093836,51.472979],[-0.093866,51.472938],[-0.093791,51.472915],[-0.093778,51.472771],[-0.093771,51.472611],[-0.093712,51.472614],[-0.093565,51.472622],[-0.093388,51.472631],[-0.093261,51.472637]],
  site: "Valmar Trading Estate",
  borough: 'Southwark',
  use: 'mixed',
  address: "Valmar Trading Estate",
  plot_area_m2: 33637,
  existing_gea_m2: 114366,
  existing_floors: 4,
  existing_height_m: 14.2,
  ftf_m: 4,
  max_height_m: 36,
  max_floors: 9,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 14.2, insight: "Valmar Trading Estate - auto-generated. Verify existing height." },
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
