// Development Intelligence - 1 Southwark Bridge Road and Red Lion Court
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.094571,51.507144],[-0.094524,51.507135],[-0.094465,51.507123],[-0.094027,51.507034],[-0.094008,51.507071],[-0.094022,51.507074],[-0.093993,51.507131],[-0.093979,51.507128],[-0.093948,51.507193],[-0.094076,51.507218],[-0.094362,51.507274],[-0.094257,51.507413],[-0.094176,51.507572],[-0.094052,51.507547],[-0.093915,51.50779],[-0.094353,51.507886],[-0.094634,51.507366],[-0.094686,51.50738],[-0.094793,51.507189],[-0.094618,51.507154],[-0.094632,51.507133],[-0.094585,51.507124],[-0.094571,51.507144]],
  site: "1 Southwark Bridge Road and Red Lion Court",
  borough: 'Southwark',
  use: 'mixed',
  address: "1 Southwark Bridge Road and Red Lion Court",
  plot_area_m2: 7920,
  existing_gea_m2: 47124,
  existing_floors: 7,
  existing_height_m: 14.2,
  ftf_m: 4,
  max_height_m: 36,
  max_floors: 9,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 14.2, insight: "1 Southwark Bridge Road and Red Lion Court - auto-generated. Verify existing height." },
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
