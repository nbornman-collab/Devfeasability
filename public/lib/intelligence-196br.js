// Development Intelligence - 196 Blackfriars Road, SE1 8NJ
const SITE_INTELLIGENCE = {
  polygon: [[-0.1043136,51.5051097],[-0.1040587,51.5051072],[-0.1040664,51.5048021],[-0.1043214,51.5048046],[-0.1043136,51.5051097]],
  site: '196 Blackfriars Road',
  borough: 'Southwark',
  use: 'residential',
  factors: {
    sky: {
      label: 'Available Sky',
      score: 9.0, weight: 2.5,
      existing_m: 13.7,
      precedent_m: 163,
      precedent_ref: 'One Blackfriars 50F / 163m · 0.1km N',
      sky_m: 149,
      factor: '10.9×',
      insight: '8% of the Blackfriars corridor\'s height precedent currently occupied. One Blackfriars at 163m sits 100m north of this plot - the most immediate and compelling height precedent in Southwark.'
    },
    value: {
      label: 'Rent Headroom',
      score: 9.5, weight: 2.0,
      existing_rent: 300,
      new_build_rent: 8500,
      uplift_pct: 2733,
      insight: 'Existing 3F commercial yields ~£300/m² pa. Residential sale value £8,000–9,000/m² NSA - a step-change in land value. The conversion from commercial to residential is the entire development thesis.'
    },
    momentum: {
      label: 'Planning Tailwind',
      score: 9.5, weight: 2.0,
      cluster: 'Blackfriars/Waterloo Corridor',
      opportunity_area: {
        name: 'London Bridge/Bankside Opportunity Area',
        ref: 'London Plan 2021 Policy SD1 + OAPF',
        homes_target: 4000,
        jobs_target: 5500,
        oapf: 'Bankside, Borough and London Bridge OAPF - northern Blackfriars Road explicitly called out as high-priority development zone',
        implication: 'Strongest possible planning enabler. Mayoral support for tall residential. Departure from density matrix supported. One Blackfriars (50F, 163m) approved 100m north under same OA policy framework.'
      },
      consents: 3,
      precedents: [
        { name: 'One Blackfriars', ref: 'Planning ref 11/AP/2927', floors: '50F / 163m residential', outcome: 'Approved 2014. 274 units. 100m north. Definitive height precedent for this OA.' },
        { name: 'Blackfriars Circus (Barratt)', ref: 'Planning ref 13/AP/0705', floors: '27F / 85m residential', outcome: 'Approved 2014. 336 units. 200m north. Confirms tall residential as the established typology.' },
        { name: '18 Blackfriars Road (CO-RE)', ref: 'Planning ref 18/AP/2882', floors: '30F / 95m residential', outcome: 'Approved 2020. 290 units. 150m north. Most recent comparable. Same street, same ownership model.' }
      ],
      insight: 'Highest possible planning tailwind. Site sits in London Bridge/Bankside Opportunity Area - northern Blackfriars Road corridor explicitly identified for tall residential intensification. Three consented residential towers within 200m confirm LPA position: One Blackfriars (50F, 163m, 2014), Blackfriars Circus (27F, 2014), 18 Blackfriars Road (30F, 2020). With One Blackfriars 100m north as definitive height precedent, a 15-20F residential scheme here has very strong policy support.'
    },
    heritage: {
      label: 'Heritage Shadow',
      score: 9.0, weight: 1.5,
      primary: { name: 'No listed buildings adjacent', grade: 'n/a', dist_m: 400, height_m: 0 },
      secondary: { name: 'Waterloo Station', grade: 'II*', dist_m: 700 },
      insight: 'No listed buildings within 400m. One Blackfriars (50F, 2018) is not heritage-listed. Waterloo Station (Grade II*) is 700m - no setting impact at this scale. This is one of the cleanest heritage profiles on the Southwark riverside.'
    },

    heritage_framework: {
      tier: 'UNRESTRICTED',
      score: 9.0,
      verdict: 'No listed buildings within 400m. Blackfriars OA zone. Residential tall building - One Blackfriars (50F) 300m south is the direct precedent. Heritage is not the binding constraint here.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 8.0, weight: 1.5,
      titles: 1,
      tenure: 'Freehold',
      owner: 'Barts Charity',
      jurisdiction: 'England and Wales',
        encumbrances: 'No known encumbrances',
      insight: 'Barts Charity - single freehold title. Charitable institutions typically transparent on disposal terms, but require trustee sign-off and Charity Commission process. Expect 18-24 months from heads of terms to completion.'
    },
    transport: {
      label: 'Transport Links',
      score: 9.5, weight: 0.5,
      ptal: '6a',
      stations: 4,
      insight: 'Excellent transport connectivity. Blackfriars Elizabeth line, Waterloo, Southwark and Borough all within 600m. Elizabeth line makes this highly attractive to residential buyers - one stop from Bond Street.'  }
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