// Development Intelligence - 4-12 Albany Road, 4-12 Albany Road, Walworth, SE5 0AB
// EPC: 1200m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.093873, 51.482062], [-0.093327, 51.482062], [-0.093327, 51.482538], [-0.093873, 51.482538], [-0.093873, 51.482062]],
  site: "4-12 Albany Road",
  borough: 'Southwark', use: 'commercial', address: "4-12 Albany Road, Walworth, SE5 0AB",
  plot_area_m2: 2000, existing_gea_m2: 1200,
  existing_floors: 2, existing_height_m: 6.0,
  ftf_m: 3.15, max_height_m: 28.0, max_floors: 9,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 6.0, insight: "Commercial at 6m in SE5/SE17 border. Close to Aylesbury regeneration zone. 9F potential." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Commercial at low yield. SE5 residential at \u00a3600-700/sqft. 9F generates \u00a310-14M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"Walworth Road residential SE17","ref":"Southwark ref 19/AP/2800","desc":"8F residential. 300m north. Height precedent."},{"name":"Aylesbury Estate","ref":"Southwark ref 14/AP/3844","desc":"Major regeneration 400m east. Planning context for residential intensification in SE5/SE17."}],
      insight: "SE5/SE17 corridor with Aylesbury regeneration driving area improvement. LPA supportive of residential intensification." },
    heritage: { label: 'Heritage Shadow', score: 8.0, weight: 1.5, insight: "No heritage constraints in SE5 corridor." },
    acquisition: { label: 'Title Stack', score: 7.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Commercial building - likely single freehold. Clean acquisition." },
    transport: { label: 'Station Gravity', score: 8.0, weight: 0.5, ptal: '4', insight: "PTAL 4. Elephant & Castle 800m. Denmark Hill 700m. Good connectivity." }
  }
};
