// Development Intelligence - 330-344 Walworth Road
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.093996,51.486232],[-0.093979,51.486237],[-0.093982,51.48624],[-0.093685,51.486334],[-0.093785,51.486459],[-0.094083,51.486365],[-0.094087,51.48637],[-0.094104,51.486364],[-0.093996,51.486232]],
  site: "330-344 Walworth Road",
  borough: 'Southwark',
  use: 'mixed',
  address: "330-344 Walworth Road",
  plot_area_m2: 33627,
  existing_gea_m2: 85749,
  existing_floors: 3,
  existing_height_m: 9.5,
  ftf_m: 3.5,
  max_height_m: 21,
  max_floors: 6,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 9.5, insight: "330-344 Walworth Road - auto-generated. Verify existing height." },
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
