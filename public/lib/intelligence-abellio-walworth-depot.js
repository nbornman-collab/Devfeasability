// Development Intelligence - Abellio Walworth Depot
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.098677,51.487406],[-0.098535,51.487287],[-0.098589,51.487149],[-0.098881,51.487026],[-0.098952,51.486995],[-0.098968,51.48701],[-0.099169,51.486925],[-0.099189,51.486943],[-0.099391,51.486857],[-0.099455,51.486915],[-0.099251,51.487001],[-0.099234,51.486986],[-0.099035,51.48707],[-0.099004,51.487058],[-0.09894,51.487074],[-0.098685,51.48719],[-0.098648,51.487275],[-0.098759,51.487368],[-0.098677,51.487406]],
  site: "Abellio Walworth Depot",
  borough: 'Southwark',
  use: 'mixed',
  address: "Abellio Walworth Depot",
  plot_area_m2: 11370,
  existing_gea_m2: 48323,
  existing_floors: 5,
  existing_height_m: 15.8,
  ftf_m: 4,
  max_height_m: 40,
  max_floors: 10,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 15.8, insight: "Abellio Walworth Depot - auto-generated. Verify existing height." },
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
