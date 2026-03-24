// Development Intelligence - Friars House, 157-168 Blackfriars Road, SE1 8EZ
// Source: EPC (11,479m² GIA, Band B), GLA DataMap (OA/CAZ confirmed), GLA Site Allocation
// HMLR title: PENDING verification - owner unknown
// Polygon: OSM way 77739554, centroid=[-0.104381,51.501616]
const SITE_INTELLIGENCE = {
  polygon: [[-0.104495, 51.500989], [-0.104429, 51.50188], [-0.104205, 51.501889], [-0.104175, 51.501867], [-0.103788, 51.501444], [-0.103472, 51.501098], [-0.103684, 51.501147], [-0.103747, 51.501156], [-0.103822, 51.500898], [-0.104429, 51.500973], [-0.104495, 51.500989]],
  site: 'Friars House',
  borough: 'Southwark',
  use: 'office',
  address: '157-168 Blackfriars Road, SE1 8EZ',
  plot_area_m2: 5220,
  existing_gea_m2: 11479, // EPC verified, Band B, non-domestic
  existing_floors: 6,
  existing_height_m: 24.0, // 6F × 4.0m FTF
  ftf_m: 4.0, // Grade A office new-build
  max_height_m: 56.0, // 14F × 4.0m
  max_floors: 14,
  hmlr_title: null, // PENDING - run HMLR before T2 appraisal
  owner: null, // PENDING HMLR
  epc_rating: 'B',
  epc_lodgement: '2018',
  factors: {
    sky: {
      label: 'Available Sky',
      score: 8.0, weight: 2.5,
      existing_m: 24.0,
      precedent_m: 95.0,
      precedent_ref: '240 Blackfriars (Sellar) 27F / 95m · 0.3km S',
      sky_m: 71.0,
      factor: '3.96×',
      insight: 'Site uses 25% of the Blackfriars Road height envelope. At 24m (6F) against a 95m precedent 300m south (240 Blackfriars, Sellar), significant air rights remain. Large plot (0.52ha) means multi-phasing is likely - delivery complexity tempers the score vs. a single-title smaller site.'
    },
    value: {
      label: 'Rent Headroom',
      score: 8.5, weight: 2.0,
      existing_rent: 580,
      new_build_rent: 800,
      uplift_pct: 38,
      insight: 'Existing office rental at approximately £55-60/sqft. New-build Grade A Southwark CAZ commands £70-75/sqft. The 38% rental uplift is meaningful but this is a like-for-like office replacement, not a use-change play. The value story is intensification of an underutilised large plot - the GDV uplift comes from additional floors, not conversion premium.'
    },
    momentum: {
      label: 'Planning Tailwind',
      score: 9.5, weight: 2.0,
      cluster: 'London Bridge/Bankside Opportunity Area',
      opportunity_area: {
        name: 'London Bridge/Bankside Opportunity Area',
        ref: 'London Plan 2021 Policy SD1 + Bankside, Borough and London Bridge OAPF',
        homes_target: 4000,
        jobs_target: 5500,
        oapf: 'Northern Blackfriars Road corridor explicitly identified for commercial and residential intensification',
        implication: 'OA designation + formal Southwark Site Allocation = strongest possible planning enabler. CAZ position supports office intensification at significant heights. Pre-application engagement with GLA strongly recommended given OA status.'
      },
      consents: 2,
      precedents: [
        { name: '240 Blackfriars Road (Sellar)', ref: 'Southwark LPA ref 11/AP/2700', floors: '27F / 95m mixed-use', outcome: 'Approved 2013. Office and residential. 300m south. Definitive height precedent for mid-Blackfriars Road.' },
        { name: '20 Blackfriars Road (CO-RE)', ref: 'Southwark LPA ref 18/AP/2882', floors: '30F / 95m residential', outcome: 'Approved 2020. 290 units. 150m north. Confirms tall development as established typology on this street.' }
      ],
      insight: 'Maximum planning tailwind. OA + CAZ + formal site allocation is the trifecta for development enablement in Southwark. The OAPF explicitly identifies this stretch of Blackfriars Road for intensification. Two tall building consents within 300m provide strong precedent at 27-30F. Pre-app with LPA likely to confirm principle of intensification - policy risk is low, design quality is the primary consent determinant.'
    },
    heritage: {
      label: 'Heritage Shadow',
      score: 8.5, weight: 1.5,
      primary: { name: 'No listed buildings immediately adjacent', grade: 'n/a', dist_m: 200, height_m: 0 },
      secondary: { name: 'Blackfriars Station', grade: 'II', dist_m: 350 },
      insight: 'Relatively clean heritage profile for a central London site. No listed buildings immediately adjacent. Blackfriars Station (Grade II) is 350m north - setting impact manageable at 12-14F. Southwark Conservation Areas at Bankside are 400m+ east. LVMF: no protected view directly through this site. Heritage Impact Assessment required at RIBA Stage 2 but not expected to be a material constraint.'
    },

    heritage_framework: {
      tier: 'manageable',
      score: 8.0,
      verdict: 'Blackfriars Station (GrII) 350m, no on-site listing. SE1 design-led context. Quality architecture is the currency. Heritage not a primary blocker.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 5.5, weight: 1.5,
      titles: null,
      tenure: 'Unknown - HMLR verification required',
      owner: 'Unknown',
      jurisdiction: 'England and Wales',
        encumbrances: 'No known encumbrances',
      insight: 'A 0.52ha office complex in SE1 CAZ is likely to have a complex ownership structure - corporate freehold with occupier leases, or potentially multiple freehold interests. This is the primary risk factor and the critical gate before T2 appraisal. HMLR title register search required. Score conservatively penalised until verified. If single freehold: score upgrades to 8.5. If multiple titles: complex assembly required.'
    },
    transport: {
      label: 'Transport Links',
      score: 9.0, weight: 0.5,
      ptal: '6a',
      stations: 4,
      insight: 'Excellent connectivity. Blackfriars (Elizabeth line, Thameslink) 350m north. Southwark (Jubilee) 350m east. Waterloo (National Rail/Tube) 650m west. Borough (Northern) 500m southeast. PTAL 6a - one of the highest transport accessibility ratings in London.'
    }
  }
};
