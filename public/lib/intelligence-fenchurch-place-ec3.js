// Development Intelligence - Fenchurch Place, EC3
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.078896,51.511719],[-0.078574,51.511652],[-0.077907,51.511537],[-0.077543,51.511474],[-0.077066,51.511392],[-0.075799,51.511169],[-0.075786,51.511089],[-0.075782,51.511071],[-0.075775,51.51103],[-0.075774,51.511014],[-0.075768,51.51098],[-0.075765,51.510962],[-0.075757,51.510915],[-0.075756,51.510903],[-0.075745,51.510883],[-0.076763,51.511044],[-0.07702,51.511085],[-0.077224,51.511124],[-0.077496,51.511173],[-0.07766,51.511204],[-0.07774,51.51122],[-0.078038,51.511274],[-0.078162,51.51129],[-0.078159,51.511258],[-0.078512,51.511206],[-0.078546,51.511307],[-0.07856,51.511349],[-0.0786,51.511357],[-0.078974,51.511437],[-0.079072,51.511458],[-0.079279,51.511499],[-0.079252,51.511553],[-0.079196,51.511665],[-0.07917,51.511716],[-0.079144,51.511768],[-0.078978,51.511734],[-0.078936,51.511727],[-0.078896,51.511719]],
  site: "Fenchurch Place, EC3",
  borough: '',
  use: 'office',
  address: "Fenchurch Place, EC3M 4AJ",
  plot_area_m2: 5000,
  existing_gea_m2: 12750,
  existing_floors: 3,
  existing_height_m: 11,
  ftf_m: 3.5,
  max_height_m: 24.5,
  max_floors: 7,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "Fenchurch Place, EC3 - auto-generated. Verify existing height." },
    value: { label: 'Rent Headroom', score: 6.0, weight: 2.0, insight: " office. Verify market data." },
    momentum: { label: 'Planning Tailwind', score: 6, weight: 2.0, insight: "Standard planning context." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Auto-generated. Verify heritage constraints." },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown', owner: null, insight: "HMLR data pending." },
    transport: { label: 'Transport Links', score: 8.5, weight: 0.5, ptal: '6b', insight: "PTAL 6b." }
  },
  environment: {
    flood_zone: 1,
    surface_water_risk: 'unknown',
    historic_landfill: false,
    contamination_screening: 'unknown',
    strategic_noise: 'unknown',
    air_quality: { aqma: true, aqma_name: ' AQMA', note: 'Assumed borough-wide AQMA. Verify.' }
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
