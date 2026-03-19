// Development Intelligence - McLaren House, St George's Circus, St George's Circus, SE1 6FE
// EPC: 3195m² GIA, Band C | HMLR: PENDING
// Polygon: OSM way 89974558, centroid=[-0.105296, 51.499193]
const SITE_INTELLIGENCE = {
  polygon: [[-0.104911, 51.499543], [-0.104935, 51.499312], [-0.104957, 51.499], [-0.105043, 51.498969], [-0.105097, 51.498944], [-0.105166, 51.498891], [-0.105214, 51.498843], [-0.105242, 51.498783], [-0.105624, 51.498833], [-0.105957, 51.499087], [-0.105829, 51.499153], [-0.105799, 51.49913], [-0.105764, 51.499148], [-0.105746, 51.499135], [-0.105705, 51.499155], [-0.105649, 51.499112], [-0.10569, 51.499092], [-0.105673, 51.499079], [-0.105708, 51.499061], [-0.105694, 51.49905], [-0.105658, 51.499068], [-0.105644, 51.499057], [-0.105603, 51.499078], [-0.105546, 51.499035], [-0.105587, 51.499014], [-0.105572, 51.499002], [-0.105608, 51.498984], [-0.105525, 51.498922], [-0.105505, 51.498919], [-0.105494, 51.49895], [-0.105471, 51.498947], [-0.105458, 51.498981], [-0.105384, 51.49897], [-0.105397, 51.498934], [-0.105369, 51.49893], [-0.105381, 51.498897], [-0.105328, 51.498889], [-0.105306, 51.498948], [-0.105338, 51.498967], [-0.10532, 51.498979], [-0.105357, 51.499001], [-0.105306, 51.499033], [-0.105265, 51.499008], [-0.105247, 51.499019], [-0.105212, 51.498998], [-0.105106, 51.499064], [-0.105105, 51.499087], [-0.105151, 51.499088], [-0.105151, 51.499104], [-0.105208, 51.499105], [-0.105206, 51.499162], [-0.105149, 51.499161], [-0.105149, 51.499176], [-0.105103, 51.499175], [-0.105102, 51.499213], [-0.105139, 51.499214], [-0.105138, 51.499228], [-0.105213, 51.499228], [-0.10521, 51.499291], [-0.105146, 51.49929], [-0.105147, 51.499303], [-0.105109, 51.499302], [-0.105109, 51.499314], [-0.105109, 51.499327], [-0.10515, 51.499326], [-0.105153, 51.499343], [-0.105212, 51.499339], [-0.105208, 51.499392], [-0.105161, 51.49939], [-0.105161, 51.499408], [-0.105102, 51.499406], [-0.105102, 51.499448], [-0.105145, 51.499447], [-0.105145, 51.49947], [-0.105189, 51.499469], [-0.105188, 51.499525], [-0.105139, 51.499523], [-0.105138, 51.499536], [-0.105086, 51.499535], [-0.105085, 51.499552], [-0.105137, 51.499553], [-0.105134, 51.499568], [-0.105182, 51.499567], [-0.105176, 51.499617], [-0.105135, 51.499614], [-0.105134, 51.49964], [-0.105077, 51.499639], [-0.105079, 51.499663], [-0.104911, 51.499543]],
  site: 'McLaren House, St George\'s Circus',
  borough: 'Southwark',
  use: 'office',
  address: 'St George\'s Circus, SE1 6FE',
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
    acquisition: { label: 'Title Stack', score: 7.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: 'LSBU-occupied - likely either LSBU-owned or institutional landlord with education lease. University property disposal is achievable but requires LSBU agreement. Single freehold likely.' },
    transport: { label: 'Station Gravity', score: 8.5, weight: 0.5, ptal: '5', insight: 'PTAL 5. Elephant & Castle (Northern/Bakerloo) 600m. Waterloo (multiple Tube/Rail) 700m. Lambeth North (Bakerloo) 400m. Strong SE1 transport position.' }
  }
};
