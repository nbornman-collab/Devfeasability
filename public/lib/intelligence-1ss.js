// Development Intelligence — 1 Silk Street, EC2Y 8HQ
const SITE_INTELLIGENCE = {
  site: '1 Silk Street',
  borough: 'City of London',
  factors: {
    sky: {
      label: 'Sky Available',
      score: 7.5, weight: 2.5,
      existing_m: 30,
      precedent_m: 230,
      precedent_ref: 'Salesforce Tower (Heron), 230m · 0.4km E',
      sky_m: 200,
      factor: '6.7×',
      insight: '13% of the Broadgate-fringe height envelope currently used. 200m of sky above the existing roofline within established cluster precedent.'
    },
    value: {
      label: 'Value Arbitrage',
      score: 7.5, weight: 2.0,
      existing_rent: 60,
      new_build_rent: 80,
      uplift_pct: 33,
      insight: '£60/ft² existing stock vs £75–85/ft² prime City new-build. 25–42% rental uplift on full redevelopment. Broadgate campus occupiers set the tone for achievable rents.'
    },
    momentum: {
      label: 'Planning Momentum',
      score: 8.0, weight: 2.0,
      cluster: 'Broadgate / Liverpool St',
      consents: 2,
      insight: '2 major towers consented within 500m in the last 5 years. Broadgate campus masterplan ongoing. City fringe location benefits from active development climate.'
    },
    heritage: {
      label: 'Heritage Exposure',
      score: 7.5, weight: 1.5,
      primary: { name: 'Barbican Estate', grade: 'II*', dist_m: 250, height_m: 118 },
      secondary: { name: 'St Giles Cripplegate', grade: 'I', dist_m: 300 },
      insight: 'Barbican Estate (Grade II*, 250m NW) is the primary heritage receptor. Lower sensitivity than the Lloyd\'s / Leadenhall Market cluster. Pre-app views assessment required.'
    },
    acquisition: {
      label: 'Acquisition Clarity',
      score: 8.0, weight: 1.5,
      titles: 1,
      tenure: 'Freehold',
      owner: 'One Silk Street Property Limited',
      jurisdiction: 'Jersey',
      insight: 'Single freehold title (NGL656467). Offshore corporate (Jersey). SOM-managed campus. No title assembly required — single counterparty acquisition.'
    },
    transport: {
      label: 'Transport',
      score: 9.5, weight: 0.5,
      ptal: '6b',
      stations: 4,
      insight: 'PTAL 6b (Excellent). Liverpool Street Elizabeth line, Moorgate, Barbican and Old Street all within 500m. Outstanding connectivity for occupier demand.'
    }
  }
};
