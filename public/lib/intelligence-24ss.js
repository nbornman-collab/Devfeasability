// Development Intelligence — 24 Southwark Street, SE1 0SW
const SITE_INTELLIGENCE = {
  site: '24 Southwark Street',
  borough: 'Southwark',
  factors: {
    sky: {
      label: 'Available Sky',
      score: 6.5, weight: 2.5,
      existing_m: 24.8,
      precedent_m: 60,
      precedent_ref: '240 Blackfriars Road 16F · 0.3km W',
      sky_m: 35,
      factor: '2.4×',
      insight: '41% of the Bankside precedent envelope currently used. 35m of buildable sky above the existing roofline — modest by City standards, compelling for Southwark.'
    },
    value: {
      label: 'Rent Headroom',
      score: 6.0, weight: 2.0,
      existing_rent: 650,
      new_build_rent: 775,
      uplift_pct: 19,
      insight: '£650/m² existing stock vs £750–800/m² new-build Bankside CAZ. 19% rental uplift on redevelopment — plus the efficiency gains of a modern plate vs a 6-storey 1980s office.'
    },
    momentum: {
      label: 'Planning Tailwind',
      score: 7.5, weight: 2.0,
      cluster: 'Bankside / Borough',
      consents: 4,
      insight: 'Southwark Plan 2022 supports commercial intensification in the CAZ. Bankside & Borough Opportunity Area — 4 commercial schemes 8-16F approved within 500m in the last 5 years.'
    },
    heritage: {
      label: 'Heritage Shadow',
      score: 8.0, weight: 1.5,
      primary: { name: 'OXO Tower', grade: 'II', dist_m: 200, height_m: 37 },
      secondary: { name: 'Borough Market', grade: 'II*', dist_m: 400 },
      insight: 'OXO Tower (Grade II, 200m W) is the nearest listed building — low sensitivity at this scale. Borough Market is 400m SE. No immediate heritage constraint. Pre-app views assessment recommended but not likely to be blocking.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 7.5, weight: 1.5,
      titles: 1,
      tenure: 'Freehold',
      owner: 'RREEF Bankside II Limited',
      jurisdiction: 'England & Wales',
      insight: 'Institutional fund manager — single counterparty acquisition. Clean freehold. Disposal process may take 12-18 months for institutional sign-off, but no assembly required.'
    },
    transport: {
      label: 'Station Gravity',
      score: 9.0, weight: 0.5,
      ptal: '6b',
      stations: 4,
      insight: 'PTAL 6b (Excellent). Blackfriars, Southwark, London Bridge and Borough all within 500m. Strong occupier demand driver — Bankside has consistently outperformed as an office location since Tate Modern opened.'
    }
  }
};
