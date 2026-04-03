// Development Intelligence - 684-698 Old Kent Road (Kwikfit garage)
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.06254,51.482018],[-0.062592,51.481972],[-0.062561,51.481958],[-0.062561,51.481935],[-0.062605,51.481927],[-0.062631,51.481938],[-0.062755,51.481829],[-0.062858,51.481874],[-0.06289,51.481845],[-0.06301,51.481897],[-0.062677,51.482206],[-0.062548,51.482149],[-0.062595,51.482107],[-0.062526,51.482077],[-0.062575,51.482033],[-0.062558,51.482026],[-0.06254,51.482018]],
  site: "684-698 Old Kent Road (Kwikfit garage)",
  borough: 'Southwark',
  use: 'mixed',
  address: "684-698 Old Kent Road (Kwikfit garage)",
  plot_area_m2: 1530,
  existing_gea_m2: 5202,
  existing_floors: 4,
  existing_height_m: 12.6,
  ftf_m: 3.5,
  max_height_m: 28,
  max_floors: 8,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 12.6, insight: "684-698 Old Kent Road (Kwikfit garage) - auto-generated. Verify existing height." },
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
