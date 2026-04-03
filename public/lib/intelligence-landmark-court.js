// Development Intelligence - Landmark Court
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.088253,51.505472],[-0.088222,51.505496],[-0.088304,51.505541],[-0.088183,51.505632],[-0.0881,51.505588],[-0.088065,51.505614],[-0.088064,51.505637],[-0.087911,51.505629],[-0.08778,51.505619],[-0.087678,51.505606],[-0.087543,51.505583],[-0.087387,51.505546],[-0.087203,51.505494],[-0.087223,51.505462],[-0.087025,51.505348],[-0.087051,51.505328],[-0.087045,51.5053],[-0.087008,51.505296],[-0.087062,51.505098],[-0.087116,51.505104],[-0.087135,51.505041],[-0.087359,51.50507],[-0.087382,51.50505],[-0.087772,51.505257],[-0.087789,51.505243],[-0.088253,51.505472]],
  site: "Landmark Court",
  borough: 'Southwark',
  use: 'mixed',
  address: "Landmark Court",
  plot_area_m2: 33613,
  existing_gea_m2: 114284,
  existing_floors: 4,
  existing_height_m: 14.2,
  ftf_m: 4,
  max_height_m: 36,
  max_floors: 9,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 14.2, insight: "Landmark Court - auto-generated. Verify existing height." },
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
