// Development Intelligence - Dulwich Community Hospital, East Dulwich Grove, SE22 8PT
// EPC: 12157m² GIA, Band C | HMLR: PENDING
// Polygon: OSM way 1480335521, centroid=[-0.082518, 51.458402]
const SITE_INTELLIGENCE = {
  polygon: [[-0.083574, 51.457547], [-0.081462, 51.457547], [-0.081462, 51.459257], [-0.083574, 51.459257], [-0.083574, 51.457547]],
  site: 'Dulwich Community Hospital',
  borough: 'Southwark',
  use: 'commercial',
  address: 'East Dulwich Grove, SE22 8PT',
  plot_area_m2: 27900,
  existing_gea_m2: 12157,
  existing_floors: 3,
  existing_height_m: 12.0,
  ftf_m: 3.5,
  max_height_m: 35.0,
  max_floors: 10,
  hmlr_title: null, owner: null, epc_rating: 'C',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 12.0, insight: 'Large 2.79ha NHS site at 3 storeys. Classic NHS estate disposal candidate - significant air rights. East Dulwich residential catchment supports 6-10F. Site scale allows phased delivery reducing finance risk.' },
    value: { label: 'Rent Headroom', score: 7.0, weight: 2.0, insight: 'NHS estate disposals create high-value opportunities. East Dulwich residential at £700-850/sqft NSA. A 2.79ha site in SE22 is genuinely rare. 72 apps over its history confirms active site interest.' },
    momentum: { label: 'Planning Tailwind', score: 6.5, weight: 2.0, precedents: [{"name": "Dulwich Hospital residential conversion", "ref": "Southwark ref 16/AP/4200", "desc": "Medical facility to residential, East Dulwich. 72 units. Confirms LPA appetite for healthcare site conversion in SE22."}, {"name": "East Dulwich Grove mixed use", "ref": "Southwark ref 19/AP/1100", "desc": "6F residential above commercial, 400m east. Moderate height precedent for East Dulwich residential."}], insight: 'NHS property disposals require NHS Estates agreement and local authority sign-off. Planning policy generally supportive of residential conversion. However, ICS/ICB may resist full disposal - partial retention or affordable healthcare component likely required.' },
    heritage: { label: 'Heritage Shadow', score: 7.5, weight: 1.5, insight: 'Dulwich Village Conservation Area is 1km south - no direct impact at this location. Victorian hospital buildings may carry local interest designation. Heritage Impact Assessment required but not expected to be fatal constraint.' },
    acquisition: { label: 'Title Stack', score: 5.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: 'NHS Southwark - Kings College Hospital NHS Foundation Trust likely freeholder. Public sector disposal: political risk, NHSE valuation requirement, possible community right-to-bid. Complex acquisition - score penalised accordingly. However, NHS estates are routinely disposed: 72 planning apps suggests active engagement.' },
    transport: { label: 'Station Gravity', score: 6.5, weight: 0.5, ptal: '3', insight: 'PTAL 3. East Dulwich station (Overground) 600m. Bus-served. Lower connectivity than SE1 corridor but East Dulwich is highly sought-after residential postcode.' }
  }
};
