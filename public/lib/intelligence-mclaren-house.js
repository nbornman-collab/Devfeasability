// Development Intelligence - McLaren House, St George's Circus, St George's Circus, SE1 6FE
// EPC: 3195m² GIA, Band C | HMLR: PENDING
// Polygon: OSM way 89974558, centroid=[-0.105234,51.498965]
const SITE_INTELLIGENCE = {
  polygon: [[-0.105592, 51.498675], [-0.104876, 51.498675], [-0.104876, 51.499255], [-0.105592, 51.499255], [-0.105592, 51.498675]],
  site: "McLaren House, St George's Circus",
  borough: 'Southwark',
  use: 'office',
  address: "McLaren House, St George's Circus, SE1 6FE",
  plot_area_m2: 4000,
  existing_gea_m2: 3195,
  existing_floors: 5,
  existing_height_m: 17.5,
  ftf_m: 3.5,
  max_height_m: 49.0,
  max_floors: 14,
  hmlr_title: null, owner: null, epc_rating: 'C',
  factors: {
    sky: { label: 'Available Sky', score: 8.0, weight: 2.5, existing_m: 17.5, insight: 'LSBU-occupied 5F office at 17.5m in the CAZ at St George`s Circus. With 240 Blackfriars (27F) 300m north and Elephant & Castle regeneration 400m south, a 14F residential or mixed-use scheme has clear height justification. Student accommodation precedent on same postcode (3,195m² LSBU).' },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: 'University/student accommodation at Band C - below-market yield. CAZ commercial or Build-to-Rent residential both generate strong GDV uplift at this address. SE1 office ERV at £65-75/sqft for Grade A new-build.' },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0, precedents: [{"name": "240 Blackfriars Road", "ref": "Southwark ref 11/AP/2700", "desc": "27F mixed-use, 300m north. Height precedent for mid-Blackfriars Road corridor approaching St George's Circus."}, {"name": "Newington Butts residential", "ref": "Southwark ref 17/AP/2800", "desc": "12F residential, SE1. Establishes residential use at height on the Elephant & Castle approach."}], insight: 'CAZ + proximity to both Blackfriars corridor and E&C regeneration zone gives good planning momentum. No OA but CAZ designation alone supports commercial intensification. LSBU presence means potential for education-anchored mixed-use consent.' },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: 'St George`s Circus is a heritage gateway - circular road layout has conservation interest. Listed buildings within 300m: Bethlem Museum (Grade II). Heritage sensitivity present but not at a level to preclude 12-14F.' },

    heritage_framework: {
      tier: 'navigable',
      nhle_verified: true, nhle_date: '2026-03-25',
      nhle_on_site: [],
      nhle_adjacent: ['Obelisk at St George\'s Circus (GrII*, 1385642)'],
      score: 7.0,
      verdict: 'Moderate heritage context. Pre-app engagement with heritage officer recommended. Design quality is the primary currency here.',
      rocketship: 'Rocketship path: engage heritage officer at pre-app, propose facade retention or contextual response early. OA designation unlocks GLA support to override LPA hesitation.'
    },
    acquisition: { label: 'Title Stack', score: 7.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: 'LSBU-occupied - likely either LSBU-owned or institutional landlord with education lease. University property disposal is achievable but requires LSBU agreement. Single freehold likely.' },
    transport: { label: 'Transport Links', score: 8.5, weight: 0.5, ptal: '5', insight: 'PTAL 5. Elephant & Castle (Northern/Bakerloo) 600m. Waterloo (multiple Tube/Rail) 700m. Lambeth North (Bakerloo) 400m. Strong SE1 transport position.' }
  }
};
