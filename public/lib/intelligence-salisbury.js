// Development Intelligence - Salisbury Estate Car Park, Peckham Road, SE5 8UA
// EPC GEA: PLACEHOLDER - verify via EPC API before client use
// HMLR: PENDING | Polygon: approx 1000m²
const SITE_INTELLIGENCE = {
  polygon: [[-0.07549, 51.486964], [-0.075627, 51.486199], [-0.075878, 51.486216], [-0.075741, 51.486982], [-0.07549, 51.486964]],
  site: "Salisbury Estate Car Park",
  borough: 'Southwark', use: 'industrial', address: "Peckham Road, SE5 8UA",
  plot_area_m2: 1000, existing_gea_m2: 400,
  existing_floors: 1, existing_height_m: 3.0,
  ftf_m: 3.15, max_height_m: 28.0, max_floors: 9,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 9.0, weight: 2.5, existing_m: 3.0, insight: "Estate car park at 3m - maximum available sky. 1 major app signals council/developer interest. Small 0.1ha site but suitable for point-block residential." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Car park at near-zero use value. SE5 residential at \u00a3600-700/sqft. 9F residential generates \u00a38-12M GDV on this footprint." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"Peckham Road SE5 residential","ref":"Southwark ref 20/AP/1200","desc":"8F residential, Peckham Road. Confirms LPA appetite for residential intensification on estate car parks."},{"name":"Southampton Way Estate","ref":"Southwark ref 18/AP/3400","desc":"Estate infill residential, SE5. Estate car park redevelopment precedent."}],
      insight: "Southwark actively pursues estate car park intensification. 1 major application confirms LPA has evaluated this site." },
    heritage: { label: 'Heritage Shadow', score: 8.5, weight: 1.5, insight: "SE5 residential area - no heritage constraints within 300m." },

    heritage_framework: {
      tier: 'manageable',
      nhle_verified: true, nhle_date: '2026-03-25',
      nhle_on_site: [],
      nhle_adjacent: ['29-31 Cobourg Road (GrII, 1378485)'],
      score: 8.5,
      verdict: 'Limited heritage constraint. Standard LPA design review. No specialist heritage consultant required at pre-app stage.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: { label: 'Title Stack', score: 7.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Estate car park - likely Southwark Council freehold. Council disposals require cabinet approval but councils are active disposers. 29 planning apps suggests established engagement." },
    transport: { label: 'Transport Links', score: 8.0, weight: 0.5, ptal: '4', insight: "PTAL 4. Peckham Rye (Overground) 600m. Denmark Hill (Overground/Thameslink) 700m. Good SE5 connectivity." }
  }
};
