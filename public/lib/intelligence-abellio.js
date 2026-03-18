// Development Intelligence - Abellio Walworth Bus Depot, Penrose Street, Walworth, SE17 3DW
// EPC: 7084m² GIA, Band B | HMLR: PENDING
// Polygon: approximate 11400m² plot area
const SITE_INTELLIGENCE = {
  polygon: [[-0.094851, 51.482233], [-0.093549, 51.482233], [-0.093549, 51.483367], [-0.094851, 51.483367], [-0.094851, 51.482233]],
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
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: 'Operational bus depot - Abellio London (subsidiary of NS Group, Dutch state railway). Not a typical property acquisition - requires agreement with bus operator to relocate operations. This is the primary risk: vacant possession is possible but operationally complex and costly.' },
    transport: { label: 'Station Gravity', score: 8.0, weight: 0.5, ptal: '4', insight: 'PTAL 4. Walworth Road buses. Elephant & Castle (Northern/Bakerloo) 700m. Kennington (Northern) 600m. Good SE17 connectivity.' }
  }
};
