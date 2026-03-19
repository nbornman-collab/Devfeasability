// Development Intelligence - Kwik Fit and Gibbs & Dandy, Grove Vale, Grove Vale, East Dulwich, SE22 8LF
// EPC: 1427m² GIA, Band F | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.078505, 51.461734], [-0.077895, 51.461734], [-0.077895, 51.462266], [-0.078505, 51.462266], [-0.078505, 51.461734]],
  site: "Kwik Fit and Gibbs & Dandy, Grove Vale",
  borough: 'Southwark', use: 'commercial', address: "Grove Vale, East Dulwich, SE22 8LF",
  plot_area_m2: 2500, existing_gea_m2: 1427,
  existing_floors: 2, existing_height_m: 7.0,
  ftf_m: 3.5, max_height_m: 28.0, max_floors: 8,
  hmlr_title: null, owner: null, epc_rating: 'F',
  factors: {
    sky: { label: 'Available Sky', score: 8.0, weight: 2.5, existing_m: 7.0, insight: "Commercial/auto repair at 7m (2F equivalent). EPC Band F signals functionally obsolete building. Near-complete available sky for 6-8F residential scheme." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Auto repair + builders merchant at EPC Band F - near-zero investment yield. East Dulwich residential at \u00a3700-850/sqft. 8F residential generates \u00a315-20M GDV against <\u00a32M existing value." },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0,
      precedents: [{"name":"Dulwich Road residential","ref":"Southwark ref 20/AP/2400","desc":"7F residential, 400m north. Height precedent for East Dulwich high street sites."},{"name":"Lordship Lane mixed-use","ref":"Southwark ref 19/AP/1100","desc":"6F residential above commercial, 300m south. Confirms residential conversion of commercial sites in SE22."}],
      insight: "East Dulwich is an active residential conversion market. LPA has approved 6-8F residential on comparable commercial sites. No OA but strong local residential demand drives planning cooperation." },
    heritage: { label: 'Heritage Shadow', score: 8.5, weight: 1.5, insight: "No conservation area. No listed buildings within 300m. Clean heritage profile for East Dulwich." },
    acquisition: { label: 'Title Stack', score: 8.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Kwik Fit (Itochu) + Gibbs & Dandy (Saint-Gobain) - two corporate tenants likely under a single freeholder or investment fund. Both are national chains that can relocate. Acquisition achievable." },
    transport: { label: 'Station Gravity', score: 6.5, weight: 0.5, ptal: '3', insight: "PTAL 3. East Dulwich station (Overground) 400m. Bus-served. Acceptable for residential." }
  }
};
