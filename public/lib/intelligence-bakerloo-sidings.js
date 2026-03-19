// Development Intelligence - Bakerloo Line Sidings, 7 St Georges Circus, SE1 6FE
// EPC: PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.104129, 51.497664], [-0.104132, 51.497755], [-0.104419, 51.497981], [-0.104426, 51.497987], [-0.104468, 51.498018], [-0.104514, 51.498056], [-0.104639, 51.498188], [-0.104636, 51.498189], [-0.104453, 51.498277], [-0.104475, 51.498291], [-0.1045, 51.498308], [-0.104642, 51.498236], [-0.104676, 51.498258], [-0.104809, 51.498341], [-0.104829, 51.498353], [-0.104958, 51.498359], [-0.104988, 51.49836], [-0.105034, 51.498333], [-0.105288, 51.498182], [-0.105642, 51.497971], [-0.105942, 51.497816], [-0.106075, 51.497753], [-0.106242, 51.49768], [-0.106339, 51.497642], [-0.106424, 51.497611], [-0.106541, 51.49757], [-0.106668, 51.49753], [-0.106873, 51.497472], [-0.107043, 51.497428], [-0.107199, 51.497387], [-0.107215, 51.49738], [-0.107228, 51.49737], [-0.107234, 51.497353], [-0.107231, 51.497337], [-0.107218, 51.497324], [-0.106876, 51.497154], [-0.1068, 51.497192], [-0.106005, 51.497332], [-0.105498, 51.49742], [-0.104129, 51.497664]],
  site: "Bakerloo Line Sidings",
  borough: 'Southwark', use: 'industrial', address: "7 St Georges Circus, SE1 6FE",
  plot_area_m2: 12000, existing_gea_m2: 4000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 42.0, max_floors: 12,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "TfL railway sidings at 5m between St Georges Circus and E&C. 1.2ha with maximum sky. Both 27F (240 Blackfriars) and 37F (One The Elephant) within 300m." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Railway sidings - TfL infrastructure land. If surplus to BLE requirements: inner SE1 at \u00a3800-950/sqft residential. 12F on 1.2ha generates \u00a360-90M GDV." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"240 Blackfriars Road","ref":"Southwark ref 11/AP/2700","desc":"27F mixed-use, 200m north. Height precedent for this node."},{"name":"One The Elephant","ref":"Southwark ref 12/AP/1562","desc":"37F residential, E&C. 300m south. Major height context."}],
      insight: "TfL land disposal programme is active. If Bakerloo Line Extension proceeds, this is a station box site. If BLE deferred, the land becomes surplus for development." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "St Georges Circus road junction has heritage significance (listed obelisk). Design sensitivity required. Heritage manageable at 10-12F." },
    acquisition: { label: 'Title Stack', score: 5.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "TfL freehold. Public sector disposal - politically complex, requires mayoral/TfL board approval. Score heavily penalised for acquisition complexity." },
    transport: { label: 'Station Gravity', score: 8.5, weight: 0.5, ptal: '5', insight: "PTAL 5. Lambeth North (Bakerloo) 200m. Waterloo 500m. E&C 300m. Excellent transport." }
  }
};
