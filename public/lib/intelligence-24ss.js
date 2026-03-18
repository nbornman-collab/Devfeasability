// Development Intelligence - 24 Southwark Street, SE1 0SW
// SCORING NOTE: Heritage Shadow 6.0 reflects Victorian NDHA character constraint, not a blocking constraint.
// Development IS achievable - the score shapes the massing strategy, not the viability decision.
const SITE_INTELLIGENCE = {
  site: '24 Southwark Street',
  borough: 'Southwark',
  factors: {
    sky: {
      label: 'Available Sky',
      score: 6.5, weight: 2.5,
      existing_m: 24.8,
      precedent_m: 60,
      precedent_ref: '240 Blackfriars Road 16F - 0.3km W',
      sky_m: 35,
      factor: '2.4x',
      insight: '41% of the Bankside precedent envelope currently used. 35m of buildable sky above the existing roofline. Note: Victorian facade retention strategy will require set-back at 1:2 ratio minimum - net gain is 2-3 set-back floors above the retained parapet, not a full 8-12F clearance redevelopment.'
    },
    value: {
      label: 'Rent Headroom',
      score: 6.0, weight: 2.0,
      existing_rent: 650,
      new_build_rent: 775,
      uplift_pct: 19,
      insight: '£650/m² existing stock vs £750-800/m² new-build Bankside CAZ. 19% rental uplift on redevelopment. Retention scheme will achieve less net GIA than full clearance - but retained facade + high-quality upper floors can command a boutique premium. See Liberty at 15 Southwark Street (Landsec, 2021 consent).'
    },
    momentum: {
      label: 'Planning Tailwind',
      score: 8.5, weight: 2.0,
      cluster: 'Bankside / Borough',
      opportunity_area: {
        name: 'London Bridge/Bankside Opportunity Area',
        ref: 'London Plan 2021 Policy SD1 + OAPF',
        homes_target: 4000,
        jobs_target: 5500,
        oapf: 'Bankside, Borough and London Bridge OAPF (Southwark SPD)',
        implication: 'Mayoral backing for intensification. Departure from standard density matrix supported. LPA required to facilitate not resist. OA designation is the single strongest planning enabler for this site.'
      },
      consents: 4,
      precedents: [
        { name: 'Liberty of Southwark, 15 Southwark Street', ref: '21/AP/xxxx', floors: '8F+ with heritage restoration', outcome: 'Approved 2021 - Landsec. Directly comparable typology: Southwark Street heritage facade, office-led.' },
        { name: 'Loman Street (former Blackfriars Crown Court)', ref: '20/AP/1537', floors: '8F + rooftop pavilion', outcome: 'Approved May 2021. Upper floor setbacks. Rooftop pavilion. 500m NW.' },
        { name: 'St Thomas Yard, 4-26 St Thomas Street', ref: 'Pre-app 2024', floors: 'Victorian warehouse retrofit + extension', outcome: 'Retrofit-first. 19th-century fabric retained and extended with set-back upper floors. 700m SE.' }
      ],
      insight: 'Southwark Plan 2022 supports commercial intensification in the CAZ. Three direct precedents within 700m confirm LPA appetite: Liberty at 15 Southwark Street (heritage facade + office, 2021), Loman Street 8F with rooftop (20/AP/1537, 2021), St Thomas Yard Victorian warehouse extension (pre-app 2024). All three demonstrate the LPA approves set-back upper additions to Victorian stock. Full demolition-and-replace requires a stronger design justification - the precedent picture supports retention strategy.'
    },
    heritage: {
      label: 'Heritage Shadow',
      score: 6.0, weight: 1.5,
      statutory: {
        primary: { name: 'OXO Tower', grade: 'II', dist_m: 200, height_m: 37 },
        secondary: { name: 'Borough Market', grade: 'II*', dist_m: 400 }
      },
      building_character: {
        era: 'Victorian',
        material: 'London stock brick',
        historic_use: 'Ex-industrial/commercial',
        ndha_risk: 'Medium',
        locally_listed: false,
        conservation_area: false,
        article4: 'Confirm - Southwark has extensive Article 4 directions',
        facade_retention_likely: true,
        realistic_scenario: '2-3 set-back floors above retained parapet. Full clearance requires pre-app and strong design justification.',
        comparable_consent: 'Liberty of Southwark, 15 Southwark Street - same street, same typology, approved 2021'
      },
      insight: 'Score 6.0 - constrained, not blocked. Statutory heritage is manageable: OXO Tower (Grade II) is 200m west at low height, Borough Market 400m SE. The real constraint is the building itself: Victorian stock brick ex-industrial fabric on Southwark Street, which Southwark Council designates as NDHA under Local Plan Policy P8. The precedent is clear and positive - Liberty at 15 Southwark Street (same street, 2021 consent) achieved heritage restoration + office intensification. What IS achievable: 2-3 set-back floors above the retained parapet line, boutique office character, rooftop terrace. Additional constraint confirmed: LVMF Wider Setting Consultation Area 1A.2 (Alexandra Palace to St Paul\'s) - views assessment required. At 8-12F this is unlikely to be blocking. What is NOT supported by precedent: full clearance and rebuild at maximum plot coverage. Design strategy must lead with the Victorian brick character - not fight it.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 7.5, weight: 1.5,
      titles: 1,
      tenure: 'Freehold',
      owner: 'RREEF Bankside II Limited',
      jurisdiction: 'England and Wales',
      insight: 'Institutional fund manager - single counterparty acquisition. Clean freehold. Disposal process may take 12-18 months for institutional sign-off, but no assembly required. RREEF (DWS Group) holds Bankside assets as long-term income vehicles - motivated seller likely only at premium or fund wind-down.'
    },
    transport: {
      label: 'Station Gravity',
      score: 9.0, weight: 0.5,
      ptal: '6b',
      stations: 4,
      insight: 'Excellent transport connectivity. Blackfriars (150m N), Southwark (350m E), London Bridge (500m SE), Borough (450m E). Four Tube/rail stations within 500m is exceptional even by Central London standards. Strong occupier demand driver - Bankside has consistently commanded rental premium since Tate Modern opened.'
    }
  }
};
