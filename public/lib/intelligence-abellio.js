// Development Intelligence - Abellio Walworth Bus Depot, Penrose Street, Walworth, SE17 3DW
// EPC: 7084m² GIA, Band B | HMLR: PENDING
// Polygon: OSM way 1112588628 (verified), centroid=[-0.098102,51.487243]
const SITE_INTELLIGENCE = {
  polygon: [[-0.098051, 51.487886], [-0.097652, 51.488032], [-0.097837, 51.488323], [-0.097782, 51.488417], [-0.097757, 51.488427], [-0.09772, 51.488424], [-0.097698, 51.488402], [-0.097384, 51.487959], [-0.097388, 51.487941], [-0.097406, 51.48793], [-0.097435, 51.487923], [-0.097467, 51.487927], [-0.097491, 51.487944], [-0.09803, 51.487758], [-0.098009, 51.487734], [-0.098015, 51.487718], [-0.098035, 51.487706], [-0.098064, 51.487701], [-0.09809, 51.487707], [-0.098111, 51.487725], [-0.098505, 51.488052], [-0.09858, 51.488114], [-0.098407, 51.488161], [-0.098051, 51.487886]],
  site: 'Abellio Walworth Bus Depot',
  borough: 'Southwark',
  use: 'industrial',
  address: 'Penrose Street, Walworth, SE17 3DW',
  plot_area_m2: 11400,
  existing_gea_m2: 7084,
  existing_floors: 1,
  existing_height_m: 6.0,
  ftf_m: 3.5,
  max_height_m: 42.0,
  max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'B',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 6.0, insight: 'Large bus depot at 6m in SE17 - prime regeneration land. 1.14ha gives massing flexibility for a genuine estate. Close to Elephant & Castle regeneration cluster. LBA would need to relocate (operational bus depot) - vacant possession complex but achievable at the right price.' },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: 'Bus depot land value driven by alternative use value, not operational yield. TfL/Abellio bus contracts are routinely restructured. SE17 residential at £650-750/sqft. A 12F scheme on 1.14ha generates £60-80M GDV - transformational uplift on a bus depot.' },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0, precedents: [{"name": "Elephant Park (Lend Lease)", "ref": "Southwark ref 12/AP/1092", "desc": "25-acre regeneration, 2,469 homes, Elephant & Castle. Sets precedent for large-site residential development in SE17 corridor."}, {"name": "Walworth Road residential", "ref": "Southwark ref 18/AP/3200", "desc": "8F residential above commercial, Walworth Road. Confirms LPA appetite for residential intensification in SE17."}], insight: 'SE17 regeneration momentum driven by Elephant & Castle masterplan 300m north. Southwark actively supports residential intensification of under-used industrial and transport land. 1 major application signals prior development interest.' },
    heritage: { label: 'Heritage Shadow', score: 8.5, weight: 1.5, insight: 'No heritage constraints. SE17 industrial/residential street - no conservation area, no listed buildings within 400m.' },

    heritage_framework: {
      tier: 'clean',
      score: 8.5,
      verdict: 'Limited heritage constraint. Standard LPA design review. No specialist heritage consultant required at pre-app stage.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: 'Operational bus depot - Abellio London (subsidiary of NS Group, Dutch state railway). Not a typical property acquisition - requires agreement with bus operator to relocate operations. This is the primary risk: vacant possession is possible but operationally complex and costly.' },
    transport: { label: 'Transport Links', score: 8.0, weight: 0.5, ptal: '4', insight: 'PTAL 4. Walworth Road buses. Elephant & Castle (Northern/Bakerloo) 700m. Kennington (Northern) 600m. Good SE17 connectivity.' }
  }
};
