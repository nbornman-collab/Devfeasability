// Development Intelligence - Railway Rise, East Dulwich, Railway Rise, East Dulwich, SE22 8RH
// EPC GEA: PLACEHOLDER - verify via EPC API before client use
// HMLR: PENDING | Polygon: approx 7900m²
const SITE_INTELLIGENCE = {
  polygon: [[-0.080063, 51.461619], [-0.079974, 51.461568], [-0.079852, 51.461507], [-0.079968, 51.461398], [-0.080113, 51.461207], [-0.080213, 51.461086], [-0.080422, 51.461217], [-0.08029, 51.461289], [-0.080128, 51.4614], [-0.080147, 51.461485], [-0.080164, 51.461522], [-0.080063, 51.461619]],
  site: "Railway Rise, East Dulwich",
  borough: 'Southwark', use: 'industrial', address: "Railway Rise, East Dulwich, SE22 8RH",
  plot_area_m2: 7900, existing_gea_m2: 4500,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 35.0, max_floors: 10,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.0, weight: 2.5, existing_m: 5.0, insight: "0.79ha railway-adjacent industrial site. 11 major applications is very high - active development history. Likely includes Network Rail and/or RSP infrastructure. Station proximity adds transport premium to residential." },
    value: { label: 'Rent Headroom', score: 7.5, weight: 2.0, insight: "Railway-adjacent industrial land. East Dulwich residential at \u00a3700-800/sqft. 10F scheme generates \u00a340-55M GDV on 0.79ha." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"East Dulwich Station Approach","ref":"Southwark ref 18/AP/2600","desc":"8F residential, station approach. 400m east. Confirms station-adjacent residential consent."},{"name":"Lordship Lane mixed-use","ref":"Southwark ref 20/AP/0900","desc":"6F residential-commercial, SE22. Height precedent for East Dulwich corridor."}],
      insight: "11 major applications indicates an active development pipeline. Network Rail infrastructure may be involved (railway land). Station-adjacent sites are a Southwark planning priority for residential intensification." },
    heritage: { label: 'Heritage Shadow', score: 8.0, weight: 1.5, insight: "Victorian railway infrastructure nearby may have local heritage interest. East Dulwich Conservation Areas are 800m south. Manageable heritage profile." },
    acquisition: { label: 'Title Stack', score: 5.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "11 major apps with no consent suggests complex ownership (potentially Network Rail land, multiple parties). Title Stack is the primary risk." },
    transport: { label: 'Station Gravity', score: 6.5, weight: 0.5, ptal: '3', insight: "PTAL 3. East Dulwich station (Overground) 200m - direct adjacency is a residential premium factor. Honourable mention: one of the best micro-locations for East Dulwich residential buyers." }
  }
};
