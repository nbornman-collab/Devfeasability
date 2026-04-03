// Development Intelligence - 19, 21 and 23 Harper Road, 325 Borough High Street, 1-5 and 7-11 Newington Causeway
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.096225,51.499372],[-0.095943,51.499542],[-0.095919,51.499556],[-0.095824,51.499488],[-0.095846,51.499474],[-0.095882,51.499452],[-0.095673,51.499315],[-0.095693,51.499303],[-0.095677,51.499294],[-0.095694,51.499285],[-0.09567,51.499269],[-0.09571,51.499247],[-0.095697,51.499238],[-0.095733,51.499217],[-0.095662,51.499173],[-0.095713,51.499146],[-0.095672,51.499119],[-0.095716,51.499092],[-0.096028,51.499296],[-0.095987,51.499321],[-0.095978,51.499316],[-0.095958,51.499329],[-0.096026,51.499369],[-0.096125,51.499313],[-0.096225,51.499372]],
  site: "19, 21 and 23 Harper Road, 325 Borough High Street, 1-5 and 7-11 Newington Causeway",
  borough: 'Southwark',
  use: 'mixed',
  address: "19, 21 and 23 Harper Road, 325 Borough High Street, 1-5 and 7-11 Newington Causeway",
  plot_area_m2: 3060,
  existing_gea_m2: 10404,
  existing_floors: 4,
  existing_height_m: 12.6,
  ftf_m: 3.5,
  max_height_m: 28,
  max_floors: 8,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 12.6, insight: "19, 21 and 23 Harper Road, 325 Borough High Street, 1-5 and 7-11 Newington Causeway - auto-generated. Verify existing height." },
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
