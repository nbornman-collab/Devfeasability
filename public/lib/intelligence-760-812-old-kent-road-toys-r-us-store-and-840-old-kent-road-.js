// Development Intelligence - 760, 812 Old Kent Road (Toys'r'us store), and 840 Old Kent Road (Aldi store)
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.057862,51.479729],[-0.057866,51.479749],[-0.057856,51.479769],[-0.057834,51.479785],[-0.057804,51.479793],[-0.057773,51.479794],[-0.057744,51.479788],[-0.057721,51.479774],[-0.057708,51.479757],[-0.057706,51.479737],[-0.057717,51.479719],[-0.057738,51.479704],[-0.057767,51.479696],[-0.057796,51.479695],[-0.057824,51.479701],[-0.057847,51.479713],[-0.057862,51.479729]],
  site: "760, 812 Old Kent Road (Toys'r'us store), and 840 Old Kent Road (Aldi store)",
  borough: 'Southwark',
  use: 'mixed',
  address: "760, 812 Old Kent Road (Toys'r'us store), and 840 Old Kent Road (Aldi store)",
  plot_area_m2: 33632,
  existing_gea_m2: 142936,
  existing_floors: 5,
  existing_height_m: 15.8,
  ftf_m: 4,
  max_height_m: 40,
  max_floors: 10,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 15.8, insight: "760, 812 Old Kent Road (Toys'r'us store), and 840 Old Kent Road (Aldi store) - auto-generated. Verify existing height." },
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
