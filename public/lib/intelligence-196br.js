// Development Intelligence — 196 Blackfriars Road, SE1 8NJ
const SITE_INTELLIGENCE = {
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
      insight: '8% of the Blackfriars corridor\'s height precedent currently occupied. One Blackfriars at 163m sits 100m north of this plot — the most immediate and compelling height precedent in Southwark.'
    },
    value: {
      label: 'Rent Headroom',
      score: 9.5, weight: 2.0,
      existing_rent: 300,
      new_build_rent: 8500,
      uplift_pct: 2733,
      insight: 'Existing 3F commercial yields ~£300/m² pa. Residential sale value £8,000–9,000/m² NSA — a step-change in land value. The conversion from commercial to residential is the entire development thesis.'
    },
    momentum: {
      label: 'Planning Tailwind',
      score: 9.5, weight: 2.0,
      cluster: 'Blackfriars Opportunity Area',
      consents: 3,
      insight: 'Southwark Plan 2022 designates Blackfriars Road as a residential Opportunity Area. 3 major residential consents within 200m in the last 5 years — 1,043 units approved. Planning wind is strongly behind residential here.'
    },
    heritage: {
      label: 'Heritage Shadow',
      score: 9.0, weight: 1.5,
      primary: { name: 'No listed buildings adjacent', grade: 'n/a', dist_m: 400, height_m: 0 },
      secondary: { name: 'Waterloo Station', grade: 'II*', dist_m: 700 },
      insight: 'No listed buildings within 400m. One Blackfriars (50F, 2018) is not heritage-listed. Waterloo Station (Grade II*) is 700m — no setting impact at this scale. This is one of the cleanest heritage profiles on the Southwark riverside.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 8.0, weight: 1.5,
      titles: 1,
      tenure: 'Freehold',
      owner: 'Barts Charity',
      jurisdiction: 'England & Wales',
      insight: 'Barts Charity — single freehold title. Charitable institutions typically transparent on disposal terms, but require trustee sign-off and Charity Commission process. Expect 18-24 months from heads of terms to completion.'
    },
    transport: {
      label: 'Station Gravity',
      score: 9.5, weight: 0.5,
      ptal: '6a',
      stations: 4,
      insight: 'PTAL 6a (Excellent). Blackfriars Elizabeth line, Waterloo, Southwark and Borough all within 600m. Elizabeth line makes this highly attractive to residential buyers — one stop from Bond Street.'
    }
  }
};
