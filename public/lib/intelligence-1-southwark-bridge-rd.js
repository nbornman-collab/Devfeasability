// Development Intelligence - 1 Southwark Bridge Road, 1 Southwark Bridge Road, SE1 9HA
// Source: EPC (19389m² GIA, PLACEHOLDER), GLA DataMap
// HMLR title: PENDING verification
// Polygon: OSM way 172670602, centroid=[-0.094361,51.507265]
const SITE_INTELLIGENCE = {
  polygon: [[-0.094571, 51.507144], [-0.094524, 51.507135], [-0.094465, 51.507123], [-0.094027, 51.507034], [-0.094008, 51.507071], [-0.094022, 51.507074], [-0.093993, 51.507131], [-0.093979, 51.507128], [-0.093948, 51.507193], [-0.094076, 51.507218], [-0.094362, 51.507274], [-0.094257, 51.507413], [-0.094176, 51.507572], [-0.094052, 51.507547], [-0.093915, 51.50779], [-0.094353, 51.507886], [-0.094634, 51.507366], [-0.094686, 51.50738], [-0.094793, 51.507189], [-0.094618, 51.507154], [-0.094632, 51.507133], [-0.094585, 51.507124], [-0.094571, 51.507144]],
  site: '1 Southwark Bridge Road',
  borough: 'Southwark',
  use: 'office',
  address: '1 Southwark Bridge Road, SE1 9HA',
  plot_area_m2: 7900,
  existing_gea_m2: 19389,
  existing_floors: 7,
  existing_height_m: 28.0,
  ftf_m: 4.0,
  max_height_m: 64.0,
  max_floors: 16,
  hmlr_title: null,
  owner: null,
  epc_rating: 'unknown',
  factors: {
    sky: {
      label: 'Available Sky',
      score: 7.5, weight: 2.5,
      existing_m: 28.0,
      precedent_m: 96.0,
      insight: '7F office at 28m in the London Bridge/Bankside OA - major underutilisation of a large CAZ plot. Site is 44% of the height envelope for this corridor (London Bridge tower cluster at 69F/224m). Even a conservative 16F scheme represents a 2.3x increase in floor space.'
    },
    value: {
      label: 'Rent Headroom',
      score: 8.0, weight: 2.0,
      insight: 'Grade B Southwark CAZ office at £60-65/sqft. New-build Grade A at this address would achieve £75-85/sqft. 6-major-app history suggests active developer interest. Large plot (0.79ha) enables a genuine tower scheme - not just incremental uplift.'
    },
    momentum: {
      label: 'Planning Tailwind',
      score: 9.0, weight: 2.0,
      opportunity_area: { name: 'London Bridge/Bankside Opportunity Area', ref: 'London Plan 2021 Policy SD1' },
      precedents: [{"name": "Bankside 123 (Stanhope/British Land)", "ref": "Southwark ref 12/AP/1482", "desc": "10F office, SE1 CAZ. Approved 2013. Comparable office intensification on Southwark riverside corridor."}, {"name": "Courage Brewery Site", "ref": "Southwark ref 09/AP/1290", "desc": "Mixed-use 12F scheme, 100m east. Confirms LPA appetite for tall commercial intensification at Southwark Bridge approach."}],
      insight: 'London Bridge/Bankside OA + CAZ + 6 major apps = maximum planning momentum. This is the same policy envelope that enabled Southwark Needle (The Shard, 95F, 310m) 500m east. The LPA has consistently approved tall commercial schemes in this OA. Title Stack is the primary constraint.'
    },
    heritage: {
      label: 'Heritage Shadow',
      score: 7.0, weight: 1.5,
      insight: 'Some heritage sensitivity - Bankside Conservation Area is 500m east, Southwark Cathedral (Grade I) is 700m northeast. LVMF: no direct protected vista through site but proximity to London Bridge/Tower Bridge views means a 16F scheme will require LVMF views analysis. Heritage score reflects real but manageable constraint.'
    },

    heritage_framework: {
      tier: 'CONTEXTUAL',
      score: 7.5,
      verdict: 'Bankside CA 500m east. Southwark Cathedral (GrI) 700m northeast. No direct LVMF alignment. Heritage is real context not a constraint - design response required.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 5.0, weight: 1.5,
      titles: null,
      tenure: 'Unknown - HMLR verification required',
      owner: null,
      insight: 'Large office complex - 6 major apps suggests multiple ownership interests or complex leasehold structure. 19,389m² GEA building at £900-1,200/m² capital value = £17-23M existing asset. Institutional ownership likely. Corporate disposal would require board/trustee approval. Score penalised for complexity - HMLR verification critical.'
    },
    transport: {
      label: 'Transport Links',
      score: 9.5, weight: 0.5,
      ptal: '6b',
      insight: 'Exceptional connectivity. London Bridge station (National Rail + Northern + Jubilee) 400m. Borough station (Northern) 300m. Waterloo (National Rail + multiple Tube) 750m. PTAL 6b - amongst the highest in London.'  }
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