// Development Intelligence - 1-5 Paris Garden and 16-19 Hatfields, Paris Garden, South Bank, SE1 8ND
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.10669, 51.506887], [-0.106705, 51.506885], [-0.107127, 51.506816], [-0.107206, 51.507006], [-0.107184, 51.50703], [-0.106925, 51.507069], [-0.106734, 51.507091], [-0.106509, 51.507101], [-0.106251, 51.5071], [-0.106212, 51.507077], [-0.106208, 51.506949], [-0.106219, 51.506949], [-0.106217, 51.50693], [-0.106225, 51.50693], [-0.1064, 51.506933], [-0.106398, 51.506972], [-0.106453, 51.506974], [-0.106457, 51.506943], [-0.106562, 51.506945], [-0.106559, 51.506976], [-0.106702, 51.506962], [-0.10669, 51.506887]],
  site: "1-5 Paris Garden and 16-19 Hatfields",
  borough: 'Southwark', use: 'office', address: "Paris Garden, South Bank, SE1 8ND",
  plot_area_m2: 3500, existing_gea_m2: 5000,
  existing_floors: 5, existing_height_m: 21.0,
  ftf_m: 4.0, max_height_m: 56.0, max_floors: 14,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 21.0, insight: "South Bank office at 21m. One Blackfriars at 50F 200m south. Sea Containers at 14F adjacent. 14F easily justified." },
    value: { label: 'Rent Headroom', score: 9.0, weight: 2.0, insight: "South Bank/Blackfriars address. Grade A office at \u00a380-90/sqft. Residential at \u00a31,200-1,600/sqft. Premium London address." },
    momentum: { label: 'Planning Tailwind', score: 8.5, weight: 2.0,
      precedents: [{"name":"240 Blackfriars Road","ref":"Southwark ref 11/AP/2700","desc":"27F mixed-use, 300m east. Height precedent."},{"name":"One Blackfriars","ref":"Southwark ref 11/AP/2927","desc":"50F/163m residential. 200m south. Maximum height precedent for this micro-area."}],
      insight: "South Bank/Blackfriars corridor. OA + CAZ adjacent. Maximum developer activity." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "South Bank is design-led. ITV/IBM South Bank heritage. LVMF views possible. Design quality is the currency." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 7.0,
      verdict: 'South Bank design context. Potential LVMF adjacency - confirm alignment before scheme. ITV building context. Design quality is the primary planning currency.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 6.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "South Bank office - institutional freehold. Premium pricing reflects development potential." },
    transport: { label: 'Transport Links', score: 9.5, weight: 0.5, ptal: '6a', insight: "PTAL 6a. Blackfriars (Elizabeth/Thameslink) 200m. Waterloo 400m. Southwark 500m. Exceptional."  }
  },
  // -- ENVIRONMENTAL & REGULATORY SCREENING --
  environment: {
    flood_zone: 1,
    surface_water_risk: 'low',
    historic_landfill: false,
    contamination_screening: 'low',
    strategic_noise: 'moderate',
    air_quality: { aqma: true, aqma_name: 'Southwark AQMA (borough-wide)', note: 'Borough-wide AQMA. Standard for inner London. Not a material cost uplift for commercial schemes.' }
  },
  ecology: {
    bng_mandatory: true,
    bng_note: 'Mandatory BNG (10% uplift) applies to all new permissions from Feb 2024. Urban site - likely low habitat baseline. Off-site credits or statutory credits. Cost estimate: £20-80K.',
    bng_cost_estimate_low: 20000,
    bng_cost_estimate_high: 80000,
    tpo_on_site: false,
    tpo_adjacent: false,
    protected_species_risk: 'low'
  },
  sustainability: {
    wlc_required: false,
    wlc_note: 'Whole Life-Cycle Carbon Assessment required for GLA-referable schemes. GLA WLC Guidance (March 2022) applies.',
    circular_economy_required: false,
    circular_economy_note: 'Circular Economy Statement required for referable schemes. GLA CES Guidance applies.',
    energy_planning: { breeam_target: 'Excellent', breeam_cost_uplift_per_sqm: 50, note: 'BREEAM Excellent target for OA/major schemes.' }
  },
  delivery: {
    fire_statement_required: true,
    fire_statement_note: 'London Plan Policy D12 - required for all major developments.',
    bsr_gateway: false,
    gla_referral: false,
    pre_commencement_gates: ['BNG plan approval', 'Construction Management Plan', 'Fire Strategy (detail)'],
    estimated_pre_app_cost: { low: 40000, high: 100000 },
    estimated_planning_duration_months: { low: 6, high: 12 }
  }

};