// Development Intelligence - Land enclosed by Colombo Street, Meymott Street and Blackfriars Road
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.10492,51.505532],[-0.104922,51.505493],[-0.105525,51.505503],[-0.105528,51.505423],[-0.105457,51.505251],[-0.104715,51.505238],[-0.104703,51.505527],[-0.10492,51.505532]],
  site: "Land enclosed by Colombo Street, Meymott Street and Blackfriars Road",
  borough: 'Southwark',
  use: 'mixed',
  address: "Land enclosed by Colombo Street, Meymott Street and Blackfriars Road",
  plot_area_m2: 33613,
  existing_gea_m2: 114284,
  existing_floors: 4,
  existing_height_m: 12.6,
  ftf_m: 3.5,
  max_height_m: 28,
  max_floors: 8,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 12.6, insight: "Land enclosed by Colombo Street, Meymott Street and Blackfriars Road - auto-generated. Verify existing height." },
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
