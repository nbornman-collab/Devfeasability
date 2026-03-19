// Development Intelligence - Burgess Business Park, Parkhouse Street, Camberwell, SE5 0AR
// EPC: 10000m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.025805, 51.516012], [-0.023995, 51.516012], [-0.023995, 51.517588], [-0.025805, 51.517588], [-0.025805, 51.516012]],
  site: "Burgess Business Park",
  borough: 'Southwark', use: 'industrial', address: "Parkhouse Street, Camberwell, SE5 0AR",
  plot_area_m2: 22000, existing_gea_m2: 10000,
  existing_floors: 2, existing_height_m: 6.0,
  ftf_m: 3.5, max_height_m: 35.0, max_floors: 10,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.0, weight: 2.5, existing_m: 6.0, insight: "Large 2.2ha industrial estate at 6m. Scale enables a genuine residential estate (200+ units). No tall building precedent directly adjacent but SE5 corridor supports 8-10F." },
    value: { label: 'Rent Headroom', score: 8.0, weight: 2.0, insight: "Industrial estate EUV is the lowest land value class. Camberwell residential at \u00a3600-750/sqft. 10F on 2.2ha generates \u00a380-120M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0,
      precedents: [{"name":"Camberwell Station Road","ref":"Southwark ref 18/AP/3600","desc":"9F residential, Camberwell. 500m south. Height precedent for the SE5 corridor."},{"name":"Walworth Road residential","ref":"Southwark ref 19/AP/2800","desc":"8F residential, 700m north. Confirms residential intensification in SE5/SE17 border area."}],
      insight: "Camberwell regeneration corridor. LPA supports residential intensification of under-used industrial land but may require industrial retention at ground floor (Southwark Industrial Policy)." },
    heritage: { label: 'Heritage Shadow', score: 8.5, weight: 1.5, insight: "SE5 industrial zone - no heritage constraints. Clean profile." },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Business park - multiple unit leaseholders under single freeholder. Freehold acquisition required then managed vacancy. Complex but achievable." },
    transport: { label: 'Station Gravity', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Denmark Hill (Overground/Thameslink) 800m. Buses. Lower transport score - residential-appropriate." }
  }
};
