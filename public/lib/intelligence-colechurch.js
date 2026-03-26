// Development Intelligence - Colechurch House, London Bridge Walk, London Bridge Walk, SE1 2QH
// EPC GEA: PLACEHOLDER - verify via EPC API before client use
// HMLR: PENDING | Polygon: approx 3500m²
const SITE_INTELLIGENCE = {
  polygon: [[-0.085159, 51.503985], [-0.084437, 51.503985], [-0.084437, 51.504613], [-0.085159, 51.504613], [-0.085159, 51.503985]],
  site: "Colechurch House, London Bridge Walk",
  borough: 'Southwark', use: 'office', address: "London Bridge Walk, SE1 2QH",
  plot_area_m2: 3500, existing_gea_m2: 8000,
  existing_floors: 7, existing_height_m: 28.0,
  ftf_m: 4.0, max_height_m: 68.0, max_floors: 17,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.0, weight: 2.5, existing_m: 28.0, insight: "Direct London Bridge station adjacency with The Shard 200m east. Currently 7F/28m - occupies 9% of The Shard height envelope. Maximum potential in the candidate set for a landmark tower." },
    value: { label: 'Rent Headroom', score: 9.0, weight: 2.0, insight: "London Bridge Grade A office commands \u00a390-100/sqft - highest ERV in the candidate set. London Bridge residential achieves \u00a31,200-1,600/sqft. This is a top-5 London business address." },
    momentum: { label: 'Planning Tailwind', score: 8.5, weight: 2.0,
      precedents: [{"name":"The Shard (Sellar)","ref":"Southwark ref 05/AP/0174","desc":"95F / 310m, London Bridge. 200m east. The definitive height precedent for this address."},{"name":"London Bridge Station Development","ref":"Southwark ref 09/AP/1800","desc":"Major mixed-use scheme, London Bridge Station frontage. Confirms high-density acceptable at this address."}],
      insight: "London Bridge is the highest-density mixed-use zone in Southwark. OA + CAZ + Shard precedent = maximum planning tailwind. The Shard at 310m makes any scheme here look modest by comparison." },
    heritage: { label: 'Heritage Shadow', score: 6.5, weight: 1.5, insight: "London Bridge heritage sensitivity: Monument (Grade I), Southwark Cathedral (Grade I), and Tower Bridge (Grade I) all within 700m. LVMF views analysis mandatory. Heritage is a real constraint - design quality must be exceptional." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 6.5,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 5.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Central London Bridge address - prime institutional ownership. Likely complex leasehold with major corporate occupiers. High acquisition cost reflects development potential." },
    transport: { label: 'Transport Links', score: 9.5, weight: 0.5, ptal: '6b', insight: "PTAL 6b. London Bridge (Northern/Jubilee + National Rail) 100m - one of the best-connected addresses in London. Exceptional transport score."  }
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