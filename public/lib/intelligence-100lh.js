// Development Intelligence — 100 Leadenhall Street, EC3A 3BP
const SITE_INTELLIGENCE = {
  site: '100 Leadenhall Street',
  borough: 'City of London',
  factors: {
    sky: {
      label: 'Sky Available',
      score: 9.0, weight: 2.5,
      existing_m: 28.6,
      precedent_m: 290,
      precedent_ref: '1 Undershaft (u/c)',
      sky_m: 261,
      factor: '10.1×',
      insight: '10% of the cluster\'s permitted height envelope is currently occupied. Room for a tower 10× the existing height within established planning policy.'
    },
    value: {
      label: 'Value Arbitrage',
      score: 8.0, weight: 2.0,
      existing_rent: 55,
      new_build_rent: 80,
      uplift_pct: 45,
      insight: '£55/ft² existing stock vs £75–85/ft² prime City new-build. 36–55% rental uplift on full redevelopment — before the efficiency gains of a modern plate.'
    },
    momentum: {
      label: 'Planning Momentum',
      score: 9.5, weight: 2.0,
      cluster: 'Eastern Cluster',
      consents: 3,
      insight: '3 towers exceeding 100m approved within 500m in the last 5 years. City Plan 2040 designates this location as a preferred tall buildings cluster — no height policy barrier.'
    },
    heritage: {
      label: 'Heritage Exposure',
      score: 5.5, weight: 1.5,
      primary: { name: "Lloyd's of London", grade: 'I', dist_m: 100, height_m: 95 },
      secondary: { name: 'Leadenhall Market', grade: 'II*', dist_m: 80 },
      insight: 'Primary receptor: Lloyd\'s (Grade I, 95m) 100m east. Design-led mitigation required — not a stop sign, but a constraint that must be addressed at pre-app stage. Massing must avoid harm to Lloyd\'s setting.'
    },
    acquisition: {
      label: 'Acquisition Clarity',
      score: 9.0, weight: 1.5,
      titles: 1,
      tenure: 'Freehold',
      owner: 'Frontier Dragon Limited',
      jurisdiction: 'Jersey',
      insight: 'Single freehold title. Offshore corporate ownership (Jersey) — no assembly required. Clean acquisition profile; likely negotiation with a single counterparty.'
    },
    transport: {
      label: 'Transport',
      score: 10.0, weight: 0.5,
      ptal: '6a',
      stations: 5,
      insight: 'PTAL 6a (Excellent) — the highest accessibility band. Fenchurch Street, Monument, Tower Hill, Bank and Aldgate all within 500m. Transport is not a planning constraint here.'
    }
  }
};
