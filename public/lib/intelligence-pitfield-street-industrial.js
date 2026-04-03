// Development Intelligence - Pitfield Street Industrial
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.083503,51.531241],[-0.083496,51.531166],[-0.083075,51.531182],[-0.083133,51.531777],[-0.083817,51.531751],[-0.084024,51.531743],[-0.083974,51.53123],[-0.085107,51.531187],[-0.085126,51.531381],[-0.085246,51.531377],[-0.085212,51.530954],[-0.085083,51.530959],[-0.085088,51.531109],[-0.083823,51.531157],[-0.083831,51.531238],[-0.083872,51.53166],[-0.083807,51.531663],[-0.083263,51.531683],[-0.083261,51.531672],[-0.083221,51.531252],[-0.083503,51.531241]],
  site: "Pitfield Street Industrial",
  borough: 'Hackney',
  use: 'mixed',
  address: "100-150 Pitfield Street N1, London, London",
  plot_area_m2: 5500,
  existing_gea_m2: 14025,
  existing_floors: 3,
  existing_height_m: 11,
  ftf_m: 3.5,
  max_height_m: 24.5,
  max_floors: 7,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "Pitfield Street Industrial - auto-generated. Verify existing height." },
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
