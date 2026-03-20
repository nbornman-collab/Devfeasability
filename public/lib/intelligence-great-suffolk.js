// Development Intelligence - Great Suffolk Street and Ewer Street, Great Suffolk Street, Bankside, SE1 0NS
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.099004, 51.502127], [-0.099144, 51.502112], [-0.099412, 51.502083], [-0.099651, 51.502057], [-0.099915, 51.502028], [-0.10014, 51.502003], [-0.100402, 51.501974], [-0.100615, 51.501951], [-0.100465, 51.502205], [-0.100205, 51.502223], [-0.099974, 51.502238], [-0.099712, 51.502256], [-0.099458, 51.502273], [-0.099199, 51.50229], [-0.099062, 51.5023], [-0.099004, 51.502127]],
  site: "Great Suffolk Street and Ewer Street",
  borough: 'Southwark', use: 'office', address: "Great Suffolk Street, Bankside, SE1 0NS",
  plot_area_m2: 4000, existing_gea_m2: 5000,
  existing_floors: 4, existing_height_m: 18.0,
  ftf_m: 4.0, max_height_m: 52.0, max_floors: 13,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 18.0, insight: "Office at 18m between Blackfriars Road and Borough. 240 Blackfriars at 27F 200m west sets height context. 13F achievable." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Inner SE1 office. Grade A at \u00a375-85/sqft. Or residential at \u00a3900-1,100/sqft. Premium Bankside-adjacent address." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"240 Blackfriars Road","ref":"Southwark ref 11/AP/2700","desc":"27F mixed-use, 200m west. Major height precedent."},{"name":"Bankside 123","ref":"Southwark ref 12/AP/1482","desc":"10F office, 300m north. CAZ commercial intensification."}],
      insight: "Bankside/Borough corridor. CAZ-adjacent. Active developer market." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Borough High Street Conservation Area 400m. Some heritage. Manageable." },

    heritage_framework: {
      tier: 'manageable',
      score: 7.0,
      verdict: 'Conservation area setting. Heritage Impact Assessment required. Design must respond to context. LPA design scrutiny heightened.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 6.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Office block - institutional. Standard disposal." },
    transport: { label: 'Station Gravity', score: 9.0, weight: 0.5, ptal: '5', insight: "PTAL 5. Southwark (Jubilee) 300m. Waterloo 600m. Blackfriars 500m. Excellent." }
  }
};
