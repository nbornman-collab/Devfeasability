// Development Intelligence - Rotherhite Gasometer
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.041047,51.49605],[-0.040678,51.496122],[-0.040631,51.49603],[-0.040513,51.496053],[-0.040462,51.495952],[-0.040549,51.495935],[-0.040487,51.49581],[-0.040563,51.495795],[-0.040495,51.495661],[-0.040578,51.495644],[-0.040563,51.495615],[-0.040549,51.495588],[-0.040508,51.495506],[-0.040794,51.49545],[-0.040835,51.495533],[-0.040617,51.495576],[-0.040645,51.495631],[-0.040689,51.495622],[-0.040728,51.4957],[-0.040634,51.495718],[-0.04066,51.495769],[-0.040699,51.495761],[-0.04074,51.495843],[-0.040648,51.495862],[-0.040718,51.496001],[-0.040995,51.495947],[-0.041047,51.49605]],
  site: "Rotherhite Gasometer",
  borough: 'Southwark',
  use: 'mixed',
  address: "Rotherhite Gasometer",
  plot_area_m2: 33619,
  existing_gea_m2: 85728,
  existing_floors: 3,
  existing_height_m: 11,
  ftf_m: 3.5,
  max_height_m: 24.5,
  max_floors: 7,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "Rotherhite Gasometer - auto-generated. Verify existing height." },
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
