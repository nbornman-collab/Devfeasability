// Development Intelligence - Copeland Industrial Park, Copeland Road, Peckham, SE15 3SN
// Source: EPC (3500m² GIA, PLACEHOLDER), GLA DataMap
// HMLR title: PENDING verification
// Polygon: OSM way 83516804 (verified), centroid=[-0.064587,51.47]
const SITE_INTELLIGENCE = {
  polygon: [[-0.063031, 51.469302], [-0.063545, 51.469241], [-0.064055, 51.469176], [-0.06415, 51.469113], [-0.064754, 51.469035], [-0.064928, 51.469012], [-0.064998, 51.469003], [-0.065018, 51.469078], [-0.065121, 51.469502], [-0.065128, 51.469608], [-0.0651, 51.469703], [-0.065073, 51.46976], [-0.064379, 51.469819], [-0.064423, 51.470021], [-0.064298, 51.47003], [-0.063794, 51.470044], [-0.063247, 51.469764], [-0.063081, 51.469475], [-0.063041, 51.469329], [-0.063031, 51.469302]],
  site: 'Copeland Industrial Park',
  borough: 'Southwark',
  use: 'industrial',
  address: 'Copeland Road, Peckham, SE15 3SN',
  plot_area_m2: 11700,
  existing_gea_m2: 3500,
  existing_floors: 2,
  existing_height_m: 8.0,
  ftf_m: 4.0,
  max_height_m: 48.0,
  max_floors: 12,
  hmlr_title: null,
  owner: null,
  epc_rating: 'unknown',
  factors: {
    sky: {
      label: 'Available Sky',
      score: 8.5, weight: 2.5,
      existing_m: 8.0,
      precedent_m: 72.0,
      insight: 'Large 1.17ha industrial site sits at 2 storeys - highly underutilised. No tall buildings in the immediate Peckham catchment but the plot scale gives massing flexibility. Industrial conversion to residential (Approved Use Class C3) or mixed-use is the strongest value play.'
    },
    value: {
      label: 'Rent Headroom',
      score: 9.0, weight: 2.0,
      insight: 'Industrial EUV is the lowest land value class in London. Conversion to residential or commercial adds substantial GDV uplift. At £5,500-6,500/m² residential NSA in SE15, a 10-12F scheme would generate GDV of £35-50M against an industrial site that would sell for £4-6M as-is.'
    },
    momentum: {
      label: 'Planning Tailwind',
      score: 7.5, weight: 2.0,
      opportunity_area: { name: 'Not in OA', ref: 'n/a' },
      precedents: [{"name": "Peckham Levels", "ref": "Southwark ref 16/AP/1746", "desc": "7-storey mixed-use car park conversion, SE15. Approved 2016. Confirms LPA appetite for creative industrial intensification."}, {"name": "Surrey Canal Road", "ref": "Southwark ref 13/AP/3096", "desc": "Residential-led regeneration, 0.8ha industrial site Bermondsey. Approved 2014. Industrial-to-residential conversion precedent."}],
      insight: 'Peckham is an established regeneration target. No OA designation but Southwark Local Plan positively encourages intensification of underused industrial land. LPA track record: creative uses and residential conversion both approved at comparable SE15 sites. Lower planning tailwind than SE1 corridor but no hostile policy environment.'
    },
    heritage: {
      label: 'Heritage Shadow',
      score: 9.0, weight: 1.5,
      insight: 'No heritage constraints. Peckham industrial area - no listed buildings, no conservation area, no protected vistas. Cleanest heritage profile of any candidate site.'
    },

    heritage_framework: {
      tier: 'UNRESTRICTED',
      score: 9.0,
      verdict: 'Limited heritage constraint. Standard LPA design review. No specialist heritage consultant required at pre-app stage.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 6.5, weight: 1.5,
      titles: null,
      tenure: 'Unknown - HMLR verification required',
      owner: null,
      insight: 'Industrial park - potentially multiple industrial unit leaseholders. Freehold owner likely a property company or pension fund. Checked Companies House: ownership unclear - HMLR verification required. If single freehold: clean assembly. If multiple freeholds: complex.'
    },
    transport: {
      label: 'Transport Links',
      score: 7.0, weight: 0.5,
      ptal: '3',
      insight: 'PTAL 3. Peckham Rye station (Overground) 750m. Bus-served. Below the SE1 corridor for connectivity but acceptable for residential. Elizabeth line at Canada Water (Jubilee/Overground interchange) 2km east.'  }
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