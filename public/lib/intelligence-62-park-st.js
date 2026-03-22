// Development Intelligence - 62-67 Park Street, 62-67 Park Street, Bankside, SE1 9AS
// EPC: 6000m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.097675, 51.507231], [-0.097672, 51.507233], [-0.097641, 51.507209], [-0.097183, 51.50744], [-0.096796, 51.507414], [-0.096748, 51.507378], [-0.096658, 51.507372], [-0.096656, 51.50738], [-0.096564, 51.507374], [-0.096555, 51.507431], [-0.096541, 51.50743], [-0.096486, 51.507754], [-0.096595, 51.507838], [-0.096718, 51.507846], [-0.096717, 51.507849], [-0.096838, 51.507857], [-0.09684, 51.507848], [-0.096948, 51.507794], [-0.097185, 51.507809], [-0.097252, 51.507776], [-0.097294, 51.507808], [-0.097453, 51.507819], [-0.097648, 51.507721], [-0.097789, 51.50773], [-0.097807, 51.507626], [-0.097839, 51.50744], [-0.097701, 51.507335], [-0.097767, 51.507302], [-0.097675, 51.507231]],
  site: "62-67 Park Street",
  borough: 'Southwark', use: 'office', address: "62-67 Park Street, Bankside, SE1 9AS",
  plot_area_m2: 4500, existing_gea_m2: 6000,
  existing_floors: 5, existing_height_m: 21.0,
  ftf_m: 4.0, max_height_m: 60.0, max_floors: 15,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 21.0, insight: "Bankside at 21m/6F between Tate Modern and the Thames. 77 major area applications - one of the most scrutinised addresses in Southwark. 15F would be conservative for this location." },
    value: { label: 'Rent Headroom', score: 9.0, weight: 2.0, insight: "Bankside riverside address - among the highest values in London. Residential at \u00a31,400-1,800/sqft. Even Grade A office commands \u00a385-95/sqft." },
    momentum: { label: 'Planning Tailwind', score: 9.0, weight: 2.0,
      precedents: [{"name":"One Bankside","ref":"Southwark ref 16/AP/3450","desc":"10F luxury residential, Bankside. 150m east. Direct height/value precedent."},{"name":"Bankside 123 (Stanhope)","ref":"Southwark ref 12/AP/1482","desc":"10F CAZ office, 200m south. Confirms commercial intensification at Bankside address."}],
      insight: "OA + CAZ + Tate Modern adjacency = maximum momentum. 77 major apps in the area. Every major London developer knows this address." },
    heritage: { label: 'Heritage Shadow', score: 6.5, weight: 1.5, insight: "Bankside Conservation Area. Tate Modern (listed). Shakespeare Globe (Grade I) 200m. Heritage is a real constraint - but not fatal. Design quality is the currency." },

    heritage_framework: {
      tier: 'manageable',
      score: 6.5,
      verdict: 'Conservation area setting. Heritage Impact Assessment required. Design must respond to context. LPA design scrutiny heightened.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 5.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Bankside address - institutional freehold. 77 major area apps confirms intense developer interest. High acquisition price reflecting development potential." },
    transport: { label: 'Transport Links', score: 9.5, weight: 0.5, ptal: '6a', insight: "PTAL 6a. Blackfriars (Elizabeth/Thameslink) 300m. Southwark (Jubilee) 400m. London Bridge 700m. Waterloo 800m." }
  }
};
