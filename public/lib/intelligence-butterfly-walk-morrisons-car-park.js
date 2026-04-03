// Development Intelligence - Butterfly Walk & Morrisons Car Park
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.162182,51.526895],[-0.161907,51.527072],[-0.162028,51.527148],[-0.162436,51.526897],[-0.162454,51.526909],[-0.162545,51.526854],[-0.162399,51.52676],[-0.162444,51.526733],[-0.162121,51.526539],[-0.162088,51.52652],[-0.161992,51.52658],[-0.161976,51.526575],[-0.161944,51.526594],[-0.161934,51.526588],[-0.161878,51.526553],[-0.161721,51.52665],[-0.161776,51.526685],[-0.162078,51.526874],[-0.162117,51.526852],[-0.162182,51.526895]],
  site: "Butterfly Walk & Morrisons Car Park",
  borough: 'Southwark',
  use: 'mixed',
  address: "Butterfly Walk & Morrisons Car Park",
  plot_area_m2: 33597,
  existing_gea_m2: 114230,
  existing_floors: 4,
  existing_height_m: 15.8,
  ftf_m: 4,
  max_height_m: 40,
  max_floors: 10,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 15.8, insight: "Butterfly Walk & Morrisons Car Park - auto-generated. Verify existing height." },
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
