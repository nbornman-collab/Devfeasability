// Development Intelligence - Sugar Quay, Lower Thames Street
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.082703,51.50923],[-0.082719,51.509245],[-0.082711,51.509265],[-0.082691,51.509281],[-0.08266,51.50929],[-0.08255,51.509282],[-0.082523,51.509289],[-0.082472,51.509284],[-0.082464,51.509322],[-0.082441,51.509331],[-0.08229,51.509328],[-0.082288,51.509338],[-0.082302,51.509343],[-0.082294,51.509411],[-0.082276,51.509421],[-0.082009,51.509406],[-0.08199,51.509391],[-0.082,51.50933],[-0.082017,51.50932],[-0.082017,51.509313],[-0.081868,51.509305],[-0.08185,51.509288],[-0.081855,51.509253],[-0.081845,51.509248],[-0.08182,51.509247],[-0.081809,51.509239],[-0.081813,51.509216],[-0.081817,51.509192],[-0.081824,51.509184],[-0.081853,51.509186],[-0.081869,51.509189],[-0.081874,51.509181],[-0.081897,51.509171],[-0.081935,51.509173],[-0.081949,51.509188],[-0.081957,51.509188],[-0.081988,51.509171],[-0.082206,51.509185],[-0.082369,51.509193],[-0.082386,51.509202],[-0.082404,51.509205],[-0.082427,51.509201],[-0.082457,51.509205],[-0.082703,51.50923]],
  site: "Sugar Quay, Lower Thames Street",
  borough: '',
  use: 'office',
  address: "Lower Thames Street, EC3R 6DU",
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
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 11, insight: "Sugar Quay, Lower Thames Street - auto-generated. Verify existing height." },
    value: { label: 'Rent Headroom', score: 6.0, weight: 2.0, insight: " office. Verify market data." },
    momentum: { label: 'Planning Tailwind', score: 6, weight: 2.0, insight: "Standard planning context." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Auto-generated. Verify heritage constraints." },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown', owner: null, insight: "HMLR data pending." },
    transport: { label: 'Transport Links', score: 8.5, weight: 0.5, ptal: '6a', insight: "PTAL 6a." }
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
