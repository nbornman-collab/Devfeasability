// Development Intelligence - Eagle Wharf Road (Mixed Residential/Non-Residential)
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.091586,51.534336],[-0.091779,51.534255],[-0.091758,51.534236],[-0.091898,51.534177],[-0.09189,51.534169],[-0.091972,51.534135],[-0.092003,51.534164],[-0.092077,51.534132],[-0.092372,51.534402],[-0.091477,51.53478],[-0.091321,51.534637],[-0.091727,51.534465],[-0.091586,51.534336]],
  site: "Eagle Wharf Road (Mixed Residential/Non-Residential)",
  borough: 'Hackney',
  use: 'mixed',
  address: "Eagle Wharf Road (Mixed Residential/Non-Residential), London",
  plot_area_m2: 10500,
  existing_gea_m2: 44625,
  existing_floors: 5,
  existing_height_m: 15.8,
  ftf_m: 4,
  max_height_m: 40,
  max_floors: 10,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 15.8, insight: "Eagle Wharf Road (Mixed Residential/Non-Residential) - auto-generated. Verify existing height." },
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
