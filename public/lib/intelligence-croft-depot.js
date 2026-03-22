// Development Intelligence - Croft Street Depot, Croft Street, Deptford, SE8 4NA
// EPC GEA: PLACEHOLDER - verify via EPC API before client use
// HMLR: PENDING | Polygon: approx 4700m²
const SITE_INTELLIGENCE = {
  polygon: [[-0.064344, 51.484664], [-0.064, 51.484318], [-0.064831, 51.483997], [-0.065176, 51.484342], [-0.064344, 51.484664]],
  site: "Croft Street Depot",
  borough: 'Southwark', use: 'industrial', address: "Croft Street, Deptford, SE8 4NA",
  plot_area_m2: 4700, existing_gea_m2: 3500,
  existing_floors: 2, existing_height_m: 6.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 6.0, insight: "4 major planning apps on a 0.47ha industrial depot - significant developer interest. At 6m existing height, near-full sky potential. Cross-boundary site (Southwark/Lewisham border) - check LPA jurisdiction." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Depot land at industrial EUV. SE8/New Cross residential at \u00a3550-650/sqft. 12F scheme on 0.47ha generates \u00a335-50M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"New Cross Gate mixed use","ref":"Lewisham ref 17/AP/3800","desc":"10F residential-led, SE14. 300m south. Cross-boundary height precedent."},{"name":"Deptford Market Yard","ref":"Lewisham ref 14/AP/4100","desc":"Industrial-to-residential conversion, SE8. Establishes residential use on former industrial land in Deptford."}],
      insight: "4 major planning applications is very high activity for a site this size - suggests either developer optioning or council-led regeneration interest. New Cross/Deptford is an active regeneration corridor." },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: "No heritage constraints in SE8 industrial zone. Clean heritage profile." },

    heritage_framework: {
      tier: 'clean',
      score: 9.0,
      verdict: 'Limited heritage constraint. Standard LPA design review. No specialist heritage consultant required at pre-app stage.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: { label: 'Title Stack', score: 6.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Depot - likely single owner (council or operator). 4 major apps suggests willing seller or active disposal process. Score reflects uncertainty on current ownership." },
    transport: { label: 'Station Gravity', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. New Cross Gate (Overground/National Rail) 600m. Buses. Moderate connectivity for residential." }
  }
};
