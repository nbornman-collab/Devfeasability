// Development Intelligence - 684-698 Old Kent Road, 684-698 Old Kent Road, SE15 1JG
// EPC: 3000m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.062752, 51.481406], [-0.061848, 51.481406], [-0.061848, 51.482194], [-0.062752, 51.482194], [-0.062752, 51.481406]],
  site: "684-698 Old Kent Road",
  borough: 'Southwark', use: 'commercial', address: "684-698 Old Kent Road, SE15 1JG",
  plot_area_m2: 5500, existing_gea_m2: 3000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Kwikfit garage + forecourt at 5m on the OKR corridor. OA designation supports 25-35F. 71 major area applications confirm active developer market. Massive sky for this corridor." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Auto repair/retail at minimal yield. OKR residential at \u00a35,500-6,500/m\u00b2. 12F scheme on 0.55ha generates \u00a335-50M GDV." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"Malt Street OKR","ref":"Southwark ref 17/AP/3885","desc":"34F residential, OKR. Major OA height precedent. Confirms 25F+ as policy-compliant on OKR corridor."},{"name":"Biscuit Factory OKR","ref":"Southwark ref 14/AP/3438","desc":"Mixed-use 12F, OKR. Residential conversion precedent on the same corridor."}],
      insight: "OKR Opportunity Area - one of the highest-priority regeneration zones in London. OAPF explicitly targets 20,000+ homes. Bakerloo Line Extension if delivered transforms this corridor." },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: "OKR commercial/industrial strip - no heritage. Maximum design freedom." },
    acquisition: { label: 'Title Stack', score: 7.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Kwik Fit (Itochu subsidiary) - corporate tenant under property company freehold. National operator can relocate. Garage forecourt sites are frequently brought forward for development." },
    transport: { label: 'Station Gravity', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Bus-served OKR. Proposed BLE station 800m. If BLE: PTAL upgrades to 5-6." }
  }
};
