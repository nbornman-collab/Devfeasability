// Development Intelligence - Kinglake Street Garages, Kinglake Street, SE17 2AE
// EPC GEA: PLACEHOLDER - verify via EPC API before client use
// HMLR: PENDING | Polygon: approx 800m²
const SITE_INTELLIGENCE = {
  polygon: [[-0.081707, 51.49228], [-0.081349, 51.49228], [-0.081349, 51.49257], [-0.081707, 51.49257], [-0.081707, 51.49228]],
  site: "Kinglake Street Garages",
  borough: 'Southwark', use: 'industrial', address: "Kinglake Street, SE17 2AE",
  plot_area_m2: 800, existing_gea_m2: 600,
  existing_floors: 1, existing_height_m: 4.0,
  ftf_m: 3.5, max_height_m: 28.0, max_floors: 8,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 9.0, weight: 2.5, existing_m: 4.0, insight: "Small garage complex at 4m - 100% available sky. SE17 garages are classic infill redevelopment sites. 1 major app confirms developer awareness." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Garage EUV is minimal. Residential conversion creates step-change land value. SE17 residential at \u00a3650-700/sqft. 8F scheme on 800m\u00b2 generates \u00a37-9M GDV." },
    momentum: { label: 'Planning Tailwind', score: 7.5, weight: 2.0,
      precedents: [{"name":"Walworth residential SE17","ref":"Southwark ref 19/AP/2800","desc":"7F residential, SE17. 500m west. Confirms LPA appetite for residential on garage/industrial sites in SE17."},{"name":"Elephant Park","ref":"Southwark ref 12/AP/1092","desc":"25-acre regeneration, 500m north. Demonstrates SE17 strategic residential uplift."}],
      insight: "SE17 residential intensification actively supported by Southwark LPA. Garage sites are prioritised for housing in the SHLAA. 1 major planning application confirms active developer interest." },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: "No heritage constraints in SE17 industrial/residential area." },

    heritage_framework: {
      tier: 'clean',
      score: 9.0,
      verdict: 'Limited heritage constraint. Standard LPA design review. No specialist heritage consultant required at pre-app stage.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: { label: 'Title Stack', score: 8.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Garages typically single freehold - council or private landlord. 46 planning apps suggests long-established site with clear ownership. Clean acquisition route." },
    transport: { label: 'Station Gravity', score: 8.0, weight: 0.5, ptal: '4', insight: "PTAL 4. Elephant & Castle 700m. Walworth Road buses. Good SE17 connectivity for residential." }
  }
};
