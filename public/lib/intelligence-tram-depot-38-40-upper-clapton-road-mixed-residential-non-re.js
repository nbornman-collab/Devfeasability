// Development Intelligence - Tram Depot, 38-40 Upper Clapton Road (Mixed Residential/Non-Residential)
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: [[-0.055343,51.560301],[-0.055501,51.560289],[-0.055656,51.560253],[-0.05577,51.56023],[-0.056319,51.560107],[-0.056328,51.560105],[-0.056489,51.560084],[-0.056457,51.55999],[-0.056396,51.56],[-0.056405,51.560044],[-0.05633,51.560054],[-0.056316,51.560023],[-0.056251,51.560035],[-0.056197,51.559939],[-0.055376,51.560105],[-0.055331,51.560028],[-0.055649,51.559964],[-0.055661,51.559992],[-0.05588,51.559948],[-0.055966,51.559928],[-0.055953,51.559902],[-0.056399,51.559814],[-0.05633,51.559647],[-0.055367,51.559839],[-0.055339,51.559784],[-0.055466,51.559764],[-0.055459,51.559753],[-0.055578,51.559732],[-0.055602,51.559778],[-0.055797,51.55974],[-0.055683,51.559497],[-0.055503,51.559554],[-0.055143,51.55965],[-0.055146,51.559657],[-0.055089,51.559668],[-0.055173,51.559869],[-0.055072,51.559893],[-0.055192,51.560007],[-0.055343,51.560301]],
  site: "Tram Depot, 38-40 Upper Clapton Road (Mixed Residential/Non-Residential)",
  borough: 'Hackney',
  use: 'mixed',
  address: "Tram Depot, 38-40 Upper Clapton Road (Mixed Residential/Non-Residential), London",
  plot_area_m2: 6500,
  existing_gea_m2: 22100,
  existing_floors: 4,
  existing_height_m: 12.6,
  ftf_m: 3.5,
  max_height_m: 28,
  max_floors: 8,
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: 12.6, insight: "Tram Depot, 38-40 Upper Clapton Road (Mixed Residential/Non-Residential) - auto-generated. Verify existing height." },
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
