// Development Intelligence - Tower Workshops
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.076725,51.498981],[-0.076718,51.498991],[-0.07676,51.499076],[-0.07678,51.499079],[-0.07685,51.499066],[-0.076861,51.499086],[-0.076971,51.49907],[-0.076967,51.499057],[-0.077096,51.499036],[-0.077107,51.499067],[-0.077246,51.499064],[-0.077256,51.499114],[-0.077354,51.49913],[-0.07735,51.499062],[-0.07734,51.498956],[-0.077322,51.498955],[-0.077306,51.498801],[-0.07734,51.498799],[-0.077338,51.498758],[-0.077428,51.498751],[-0.077456,51.49869],[-0.077443,51.49869],[-0.077365,51.498525],[-0.077066,51.498585],[-0.077125,51.498712],[-0.077137,51.498918],[-0.077081,51.498922],[-0.077054,51.49894],[-0.076725,51.498981]],
  site: "Tower Workshops",
  borough: 'Southwark',
  use: 'mixed',
  address: "Tower Workshops",
  plot_area_m2: 33618,
  existing_gea_m2: 114301,
  existing_floors: 4,
  existing_height_m: 14.2,
  ftf_m: 4,
  max_height_m: 36,
  max_floors: 9,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 14.2, insight: "Tower Workshops - auto-generated. Verify existing height." },
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
