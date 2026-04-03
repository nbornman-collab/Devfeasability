// Development Intelligence - Land between St Thomas Street, Fenning Street, Melior Place, and Snowsfields
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.087236,51.505736],[-0.087261,51.505796],[-0.087278,51.505835],[-0.087292,51.505869],[-0.087304,51.505897],[-0.086995,51.505851],[-0.086937,51.505842],[-0.086762,51.505814],[-0.086716,51.505808],[-0.086567,51.505785],[-0.086505,51.505772],[-0.086438,51.505752],[-0.086248,51.505711],[-0.086246,51.505717],[-0.085961,51.505647],[-0.085653,51.505566],[-0.08551,51.505524],[-0.08534,51.505464],[-0.085185,51.505397],[-0.085019,51.505316],[-0.084874,51.505244],[-0.084796,51.505207],[-0.08473,51.505176],[-0.084646,51.505136],[-0.084599,51.505114],[-0.084428,51.505028],[-0.084361,51.50499],[-0.08413,51.504845],[-0.084048,51.504783],[-0.08395,51.504709],[-0.083753,51.504527],[-0.083716,51.504483],[-0.083356,51.504082],[-0.08327,51.50399],[-0.083184,51.503914],[-0.083129,51.503873],[-0.083072,51.503831],[-0.082929,51.50373],[-0.082915,51.50372],[-0.082873,51.503691],[-0.082813,51.503652],[-0.082822,51.503645],[-0.082617,51.503535],[-0.081984,51.50322],[-0.08136,51.502907],[-0.08139,51.502845],[-0.081403,51.502816],[-0.081418,51.502796],[-0.081629,51.502636],[-0.081651,51.502619],[-0.081733,51.502547],[-0.081814,51.502466],[-0.081705,51.502435],[-0.081776,51.502335],[-0.081894,51.502364],[-0.082309,51.502465],[-0.082315,51.502456],[-0.082535,51.502521],[-0.082559,51.502527],[-0.082604,51.502541],[-0.082692,51.502567],[-0.082745,51.502589],[-0.082787,51.502605],[-0.082804,51.502612],[-0.083187,51.502741],[-0.083557,51.502874],[-0.083854,51.502976],[-0.084321,51.503131],[-0.084488,51.503187],[-0.084715,51.503267],[-0.085004,51.503363],[-0.085075,51.503393],[-0.085208,51.503468],[-0.085399,51.503564],[-0.085613,51.503687],[-0.085709,51.503735],[-0.085766,51.503769],[-0.085829,51.503825],[-0.085903,51.503871],[-0.085947,51.503899],[-0.086004,51.503935],[-0.086081,51.503984],[-0.085976,51.50412],[-0.086108,51.504192],[-0.08613,51.504205],[-0.085936,51.504359],[-0.086074,51.504425],[-0.086077,51.504486],[-0.086036,51.504546],[-0.086271,51.504676],[-0.086253,51.504705],[-0.086181,51.504754],[-0.086029,51.504853],[-0.086217,51.505022],[-0.086118,51.505095],[-0.086192,51.505158],[-0.086272,51.505214],[-0.086345,51.505263],[-0.08644,51.505319],[-0.086541,51.505372],[-0.08672,51.505454],[-0.08686,51.505505],[-0.086965,51.505538],[-0.086971,51.50554],[-0.087176,51.505594],[-0.087181,51.505608],[-0.087187,51.50562],[-0.087203,51.505659],[-0.087236,51.505736]],
  site: "Land between St Thomas Street, Fenning Street, Melior Place, and Snowsfields",
  borough: 'Southwark',
  use: 'mixed',
  address: "Land between St Thomas Street, Fenning Street, Melior Place, and Snowsfields",
  plot_area_m2: 33615,
  existing_gea_m2: 114291,
  existing_floors: 4,
  existing_height_m: 12.6,
  ftf_m: 3.5,
  max_height_m: 28,
  max_floors: 8,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 12.6, insight: "Land between St Thomas Street, Fenning Street, Melior Place, and Snowsfields - auto-generated. Verify existing height." },
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
