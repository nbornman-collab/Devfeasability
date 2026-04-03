// Development Intelligence - Tesco Metro, Well Street (Mixed Residential/Non-Residential)
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.047948,51.542397],[-0.047829,51.542527],[-0.047805,51.542556],[-0.047785,51.542552],[-0.047767,51.542545],[-0.047789,51.54252],[-0.047715,51.542495],[-0.047696,51.542488],[-0.047721,51.54246],[-0.047683,51.542446],[-0.047657,51.542476],[-0.047635,51.542468],[-0.047644,51.54246],[-0.047571,51.542437],[-0.047505,51.542504],[-0.047733,51.542585],[-0.047751,51.542592],[-0.04777,51.542598],[-0.047879,51.542637],[-0.048061,51.542438],[-0.047948,51.542397]],
  site: "Tesco Metro, Well Street (Mixed Residential/Non-Residential)",
  borough: 'Hackney',
  use: 'mixed',
  address: "Tesco Metro, Well Street (Mixed Residential/Non-Residential), London",
  plot_area_m2: 2800,
  existing_gea_m2: 7140,
  existing_floors: 3,
  existing_height_m: 11,
  ftf_m: 3.5,
  max_height_m: 24.5,
  max_floors: 7,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "Tesco Metro, Well Street (Mixed Residential/Non-Residential) - auto-generated. Verify existing height." },
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
