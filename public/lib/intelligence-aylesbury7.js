// Development Intelligence - Aylesbury Site 7, Portland Street, SE17 2AE
// EPC: 1500m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.090648, 51.505088], [-0.091001, 51.505373], [-0.091052, 51.505366], [-0.091132, 51.505448], [-0.091175, 51.505493], [-0.091199, 51.505484], [-0.091216, 51.505477], [-0.091379, 51.505636], [-0.091354, 51.505648], [-0.091316, 51.505664], [-0.091279, 51.505683], [-0.091294, 51.505697], [-0.090995, 51.505701], [-0.090938, 51.505691], [-0.090811, 51.505668], [-0.090703, 51.505649], [-0.090578, 51.505627], [-0.090354, 51.505588], [-0.09029, 51.505549], [-0.090179, 51.505481], [-0.09035, 51.505437], [-0.090032, 51.505224], [-0.0902, 51.505155], [-0.090298, 51.505208], [-0.090648, 51.505088]],
  site: "Aylesbury Site 7",
  borough: 'Southwark', use: 'residential', address: "Portland Street, SE17 2AE",
  plot_area_m2: 2500, existing_gea_m2: 1500,
  existing_floors: 2, existing_height_m: 6.0,
  ftf_m: 3.15, max_height_m: 35.0, max_floors: 11,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.0, weight: 2.5, existing_m: 6.0, insight: "Estate regeneration site at 6m. Part of Aylesbury masterplan - designated for residential replacement. 11F potential." },
    value: { label: 'Rent Headroom', score: 7.5, weight: 2.0, insight: "Estate land - council-controlled disposal. SE17 residential at \u00a3650-700/sqft. Council disposal means below open-market acquisition cost." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"Aylesbury Estate masterplan","ref":"Southwark ref 14/AP/3844","desc":"Major estate regeneration approved. Direct planning commitment to residential renewal at this address."},{"name":"One The Elephant","ref":"Southwark ref 12/AP/1562","desc":"37F residential, E&C. 500m west. Height precedent for this area."}],
      insight: "Part of the Aylesbury Estate masterplan - one of Londons largest regeneration schemes. Planning framework established. Maximum momentum." },
    heritage: { label: 'Heritage Shadow', score: 8.0, weight: 1.5, insight: "Post-war estate - no heritage value. Clean demolition/replacement." },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 8.0,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 8.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Southwark Council freehold. Estate regeneration disposal route - council is an active willing seller. Score reflects council process complexity." },
    transport: { label: 'Transport Links', score: 8.0, weight: 0.5, ptal: '4', insight: "PTAL 4. Elephant & Castle (Northern/Bakerloo) 600m. Good SE17 transport."  }
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