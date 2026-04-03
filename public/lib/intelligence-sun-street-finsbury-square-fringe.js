// Development Intelligence - Sun Street / Finsbury Square Fringe
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.086581,51.520134],[-0.086508,51.520129],[-0.086543,51.519968],[-0.086388,51.519957],[-0.086352,51.520163],[-0.086252,51.520155],[-0.086295,51.519938],[-0.086096,51.519927],[-0.08606,51.52014],[-0.085931,51.520129],[-0.085987,51.519864],[-0.085836,51.519853],[-0.085792,51.520102],[-0.085721,51.520096],[-0.08571,51.520163],[-0.085528,51.520151],[-0.085448,51.520281],[-0.085688,51.5203],[-0.0857,51.520228],[-0.086025,51.520249],[-0.086021,51.520273],[-0.086236,51.520286],[-0.086242,51.520265],[-0.086544,51.520286],[-0.086581,51.520134]],
  site: "Sun Street / Finsbury Square Fringe",
  borough: 'Hackney',
  use: 'mixed',
  address: "Sun Street EC2A, London, London",
  plot_area_m2: 2500,
  existing_gea_m2: 12750,
  existing_floors: 6,
  existing_height_m: 23.6,
  ftf_m: 4,
  max_height_m: 60,
  max_floors: 15,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 23.6, insight: "Sun Street / Finsbury Square Fringe - auto-generated. Verify existing height." },
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
