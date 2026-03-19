// Development Intelligence - Aylesbury Site 7, Portland Street, SE17 2AE
// EPC: 1500m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.090505, 51.504634], [-0.089895, 51.504634], [-0.089895, 51.505166], [-0.090505, 51.505166], [-0.090505, 51.504634]],
  site: "Aylesbury Site 7",
  borough: 'Southwark', use: 'residential', address: "Portland Street, SE17 2AE",
  plot_area_m2: 2500, existing_gea_m2: 1500,
  existing_floors: 2, existing_height_m: 6.0,
  ftf_m: 3.15, max_height_m: 35.0, max_floors: 11,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.0, weight: 2.5, existing_m: 6.0, insight: "Estate regeneration site at 6m. Part of Aylesbury masterplan - designated for residential replacement. 11F potential." },
    value: { label: 'Rent Headroom', score: 7.5, weight: 2.0, insight: "Estate land - council-controlled disposal. SE17 residential at \u00a3650-700/sqft. Council disposal means below open-market acquisition cost." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"Aylesbury Estate masterplan","ref":"Southwark ref 14/AP/3844","desc":"Major estate regeneration approved. Direct planning commitment to residential renewal at this address."},{"name":"One The Elephant","ref":"Southwark ref 12/AP/1562","desc":"37F residential, E&C. 500m west. Height precedent for this area."}],
      insight: "Part of the Aylesbury Estate masterplan - one of Londons largest regeneration schemes. Planning framework established. Maximum momentum." },
    heritage: { label: 'Heritage Shadow', score: 8.0, weight: 1.5, insight: "Post-war estate - no heritage value. Clean demolition/replacement." },
    acquisition: { label: 'Title Stack', score: 8.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Southwark Council freehold. Estate regeneration disposal route - council is an active willing seller. Score reflects council process complexity." },
    transport: { label: 'Station Gravity', score: 8.0, weight: 0.5, ptal: '4', insight: "PTAL 4. Elephant & Castle (Northern/Bakerloo) 600m. Good SE17 transport." }
  }
};
