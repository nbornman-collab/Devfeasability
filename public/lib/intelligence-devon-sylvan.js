// Development Intelligence - Devon Street and Sylvan Grove, Devon Street, SE15 1AL
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.059043, 51.482871], [-0.059051, 51.482849], [-0.059145, 51.482587], [-0.059104, 51.482576], [-0.059063, 51.482565], [-0.059214, 51.482068], [-0.059235, 51.482046], [-0.059613, 51.481903], [-0.05968, 51.481857], [-0.059984, 51.481901], [-0.060158, 51.481927], [-0.060203, 51.481942], [-0.060236, 51.482007], [-0.060236, 51.4822], [-0.06023, 51.482379], [-0.060204, 51.48238], [-0.060199, 51.482401], [-0.060175, 51.482425], [-0.060163, 51.482478], [-0.06015, 51.482499], [-0.05982, 51.482733], [-0.059396, 51.483001], [-0.059355, 51.483027], [-0.059332, 51.483041], [-0.059043, 51.482871]],
  site: "Devon Street and Sylvan Grove",
  borough: 'Southwark', use: 'industrial', address: "Devon Street, SE15 1AL",
  plot_area_m2: 8000, existing_gea_m2: 4000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Industrial at 5m. 0.8ha in SE15. 12F potential." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Industrial land. SE15 resi at \u00a3550-650/sqft." },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0,
      precedents: [{"name":"OKR corridor residential","ref":"Southwark ref 17/AP/3885","desc":"34F, OKR. Corridor height precedent."},{"name":"New Cross mixed-use","ref":"Lewisham ref 14/AP/4100","desc":"Industrial-to-residential, SE14/SE15."}],
      insight: "OKR corridor adjacent. Some planning momentum." },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: "No heritage in SE15 industrial zone." },

    heritage_framework: {
      tier: 'RETAIN_AND_ADAPT',
      nhle_verified: true, nhle_date: '2026-03-25',
      nhle_on_site: [{ name: 'Gasholder No.13, Old Kent Road former gasworks', grade: 'II', list_entry: 1446329 }],
      nhle_adjacent: [],
      score: 9.0,
      verdict: 'Limited heritage constraint. Standard LPA design review. No specialist heritage consultant required at pre-app stage.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Industrial estate. Multiple tenants likely." },
    transport: { label: 'Transport Links', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. New Cross Gate 500m."  }
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