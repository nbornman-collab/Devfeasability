// Development Intelligence - Elephant & Castle Shopping Centre and London College of Communication
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.055889,51.500655],[-0.055759,51.500685],[-0.055713,51.500608],[-0.055629,51.500628],[-0.055581,51.500548],[-0.055511,51.500564],[-0.055391,51.500364],[-0.055459,51.500349],[-0.055412,51.500271],[-0.055488,51.500253],[-0.055439,51.500172],[-0.055597,51.500135],[-0.055655,51.500231],[-0.055581,51.500248],[-0.055627,51.500324],[-0.05555,51.500341],[-0.055665,51.500532],[-0.055729,51.500517],[-0.055781,51.500604],[-0.055849,51.500588],[-0.055889,51.500655]],
  site: "Elephant & Castle Shopping Centre and London College of Communication",
  borough: 'Southwark',
  use: 'mixed',
  address: "Elephant & Castle Shopping Centre and London College of Communication",
  plot_area_m2: 33616,
  existing_gea_m2: 142868,
  existing_floors: 5,
  existing_height_m: 15.8,
  ftf_m: 4,
  max_height_m: 40,
  max_floors: 10,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 15.8, insight: "Elephant & Castle Shopping Centre and London College of Communication - auto-generated. Verify existing height." },
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
