// Development Intelligence - 339-357 Mare Street, 6-18 Amhurst Road (Marks and Spencer) (Mixed Residential/Non-Residential)
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.055333,51.547168],[-0.054737,51.547168],[-0.054737,51.547538],[-0.055333,51.547538],[-0.055333,51.547168]],
  site: "339-357 Mare Street, 6-18 Amhurst Road (Marks and Spencer) (Mixed Residential/Non-Residential)",
  borough: 'Hackney',
  use: 'mixed',
  address: "339-357 Mare Street, 6-18 Amhurst Road (Marks and Spencer) (Mixed Residential/Non-Residential), London",
  plot_area_m2: 1700,
  existing_gea_m2: 4335,
  existing_floors: 3,
  existing_height_m: 11,
  ftf_m: 3.5,
  max_height_m: 24.5,
  max_floors: 7,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "339-357 Mare Street, 6-18 Amhurst Road (Marks and Spencer) (Mixed Residential/Non-Residential) - auto-generated. Verify existing height." },
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
