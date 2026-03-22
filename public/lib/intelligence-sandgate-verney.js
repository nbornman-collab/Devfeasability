// Development Intelligence - Sandgate Street and Verney Road, Sandgate Street, SE15 1LE
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.06591, 51.484031], [-0.065946, 51.484057], [-0.065967, 51.484104], [-0.065822, 51.484468], [-0.065784, 51.484654], [-0.06574, 51.484756], [-0.065675, 51.484772], [-0.06545, 51.484711], [-0.065346, 51.484687], [-0.065319, 51.484739], [-0.064901, 51.484639], [-0.064574, 51.48476], [-0.064438, 51.484804], [-0.063888, 51.484259], [-0.064462, 51.484037], [-0.064544, 51.48397], [-0.063825, 51.48366], [-0.063968, 51.483515], [-0.064182, 51.483322], [-0.064271, 51.483296], [-0.064944, 51.483583], [-0.06591, 51.484031]],
  site: "Sandgate Street and Verney Road",
  borough: 'Southwark', use: 'industrial', address: "Sandgate Street, SE15 1LE",
  plot_area_m2: 15000, existing_gea_m2: 7000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "Large 1.5ha industrial at 5m. OKR-adjacent. 12F potential." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Industrial land. OKR corridor values \u00a35,500-6,500/m\u00b2." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"OKR corridor residential","ref":"Southwark ref 17/AP/3885","desc":"34F, OKR."},{"name":"Bermondsey industrial conversion","ref":"Southwark ref 20/AP/1800","desc":"Mixed-use on industrial land."}],
      insight: "OKR OA adjacent. Strong corridor momentum." },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: "No heritage in industrial zone." },

    heritage_framework: {
      tier: 'clean',
      score: 9.0,
      verdict: 'Limited heritage constraint. Standard LPA design review. No specialist heritage consultant required at pre-app stage.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: { label: 'Title Stack', score: 5.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Industrial estate. Multiple tenants." },
    transport: { label: 'Station Gravity', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Bus-served. OKR BLE potential." }
  }
};
