// Development Intelligence - Worship Street EC2A
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.083673,51.522005],[-0.083446,51.521994],[-0.083437,51.521987],[-0.083438,51.521977],[-0.083447,51.521973],[-0.083459,51.521973],[-0.083486,51.52181],[-0.08349,51.521803],[-0.083502,51.521801],[-0.083521,51.521802],[-0.083535,51.521716],[-0.083517,51.521713],[-0.083508,51.521709],[-0.083506,51.521698],[-0.083508,51.521691],[-0.083521,51.521687],[-0.083582,51.52169],[-0.083581,51.5217],[-0.08362,51.521702],[-0.083687,51.521707],[-0.083724,51.521709],[-0.083673,51.522005]],
  site: "Worship Street EC2A",
  borough: 'Hackney',
  use: 'mixed',
  address: "100-120 Worship Street EC2A, London, London",
  plot_area_m2: 3200,
  existing_gea_m2: 10880,
  existing_floors: 4,
  existing_height_m: 23.6,
  ftf_m: 4,
  max_height_m: 60,
  max_floors: 15,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 23.6, insight: "Worship Street EC2A - auto-generated. Verify existing height." },
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
