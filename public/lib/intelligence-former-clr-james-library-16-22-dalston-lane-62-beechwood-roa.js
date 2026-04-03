// Development Intelligence - Former CLR James Library, 16-22 Dalston Lane, 62 Beechwood Road (Mixed Residential/Non-Residential)
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.074477,51.546395],[-0.074481,51.546319],[-0.07448,51.546316],[-0.07448,51.546314],[-0.074479,51.546312],[-0.074478,51.54631],[-0.074475,51.546308],[-0.074471,51.546307],[-0.074467,51.546307],[-0.074463,51.546307],[-0.074361,51.546309],[-0.074362,51.546395],[-0.074477,51.546395]],
  site: "Former CLR James Library, 16-22 Dalston Lane, 62 Beechwood Road (Mixed Residential/Non-Residential)",
  borough: 'Hackney',
  use: 'mixed',
  address: "Former CLR James Library, 16-22 Dalston Lane, 62 Beechwood Road (Mixed Residential/Non-Residential), London",
  plot_area_m2: 2100,
  existing_gea_m2: 5355,
  existing_floors: 3,
  existing_height_m: 11,
  ftf_m: 3.5,
  max_height_m: 24.5,
  max_floors: 7,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "Former CLR James Library, 16-22 Dalston Lane, 62 Beechwood Road (Mixed Residential/Non-Residential) - auto-generated. Verify existing height." },
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
