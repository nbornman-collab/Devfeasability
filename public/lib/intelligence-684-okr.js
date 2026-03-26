// Development Intelligence - 684-698 Old Kent Road, 684-698 Old Kent Road, SE15 1JG
// EPC: 3000m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.061662, 51.481666], [-0.061684, 51.48161], [-0.062205, 51.481517], [-0.062389, 51.481608], [-0.062425, 51.481589], [-0.062617, 51.481702], [-0.062773, 51.481794], [-0.06289, 51.481845], [-0.06301, 51.481897], [-0.063092, 51.481933], [-0.062851, 51.482161], [-0.062732, 51.482258], [-0.063675, 51.482706], [-0.063794, 51.48261], [-0.064076, 51.482569], [-0.064195, 51.482537], [-0.064276, 51.482515], [-0.064331, 51.4825], [-0.064476, 51.482727], [-0.064757, 51.482847], [-0.065084, 51.482673], [-0.065317, 51.482511], [-0.065407, 51.482451], [-0.065441, 51.482461], [-0.065556, 51.482511], [-0.065472, 51.482637], [-0.065118, 51.483052], [-0.064923, 51.483287], [-0.063747, 51.482815], [-0.063165, 51.482556], [-0.062594, 51.482252], [-0.062312, 51.482095], [-0.062011, 51.48192], [-0.061782, 51.481774], [-0.061662, 51.481666]],
  site: "684-698 Old Kent Road",
  borough: 'Southwark', use: 'commercial', address: "684-698 Old Kent Road, SE15 1JG",
  plot_area_m2: 5500, existing_gea_m2: 3000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Kwikfit garage + forecourt at 5m on the OKR corridor. OA designation supports 25-35F. 71 major area applications confirm active developer market. Massive sky for this corridor." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Auto repair/retail at minimal yield. OKR residential at \u00a35,500-6,500/m\u00b2. 12F scheme on 0.55ha generates \u00a335-50M GDV." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"Malt Street OKR","ref":"Southwark ref 17/AP/3885","desc":"34F residential, OKR. Major OA height precedent. Confirms 25F+ as policy-compliant on OKR corridor."},{"name":"Biscuit Factory OKR","ref":"Southwark ref 14/AP/3438","desc":"Mixed-use 12F, OKR. Residential conversion precedent on the same corridor."}],
      insight: "OKR Opportunity Area - one of the highest-priority regeneration zones in London. OAPF explicitly targets 20,000+ homes. Bakerloo Line Extension if delivered transforms this corridor." },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: "OKR commercial/industrial strip - no heritage. Maximum design freedom." },

    heritage_framework: {
      tier: 'UNRESTRICTED',
      score: 9.0,
      verdict: 'Limited heritage constraint. Standard LPA design review. No specialist heritage consultant required at pre-app stage.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: { label: 'Title Stack', score: 7.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Kwik Fit (Itochu subsidiary) - corporate tenant under property company freehold. National operator can relocate. Garage forecourt sites are frequently brought forward for development." },
    transport: { label: 'Transport Links', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Bus-served OKR. Proposed BLE station 800m. If BLE: PTAL upgrades to 5-6."  }
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
    wlc_required: true,
    wlc_note: 'Whole Life-Cycle Carbon Assessment required for GLA-referable schemes. GLA WLC Guidance (March 2022) applies.',
    circular_economy_required: true,
    circular_economy_note: 'Circular Economy Statement required for referable schemes. GLA CES Guidance applies.',
    energy_planning: { breeam_target: 'Excellent', breeam_cost_uplift_per_sqm: 50, note: 'BREEAM Excellent target for OA/major schemes.' }
  },
  delivery: {
    fire_statement_required: true,
    fire_statement_note: 'London Plan Policy D12 - required for all major developments.',
    bsr_gateway: false,
    gla_referral: true,
    pre_commencement_gates: ['BNG plan approval', 'Construction Management Plan', 'Fire Strategy (detail)'],
    estimated_pre_app_cost: { low: 40000, high: 100000 },
    estimated_planning_duration_months: { low: 6, high: 12 }
  }

};