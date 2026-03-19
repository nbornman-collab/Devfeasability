// Development Intelligence - Former Petrol Station, 233-247 Old Kent Road, 233-247 Old Kent Road, SE1 5EL
// EPC: 557m² GIA, Band B | HMLR: PENDING
// Polygon: OSM way 74866525, centroid=[-0.061655, 51.485439]
const SITE_INTELLIGENCE = {
  polygon: [[-0.061845, 51.485285], [-0.061465, 51.485285], [-0.061465, 51.485593], [-0.061845, 51.485593], [-0.061845, 51.485285]],
  site: 'Former Petrol Station, 233-247 Old Kent Road',
  borough: 'Southwark',
  use: 'commercial',
  address: '233-247 Old Kent Road, SE1 5EL',
  plot_area_m2: 900,
  existing_gea_m2: 557,
  existing_floors: 1,
  existing_height_m: 4.0,
  ftf_m: 3.5,
  max_height_m: 35.0,
  max_floors: 10,
  hmlr_title: null, owner: null, epc_rating: 'B',
  factors: {
    sky: { label: 'Available Sky', score: 9.0, weight: 2.5, existing_m: 4.0, precedent_m: 49.0, insight: 'Single-storey petrol station at 4m. The Old Kent Road Opportunity Area (OA) supports tall buildings to 25-35F. 3 major applications at this specific address confirm developer interest. Site assembly at ground level - near-zero existing value, maximum sky.' },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: 'Former petrol station = distressed/low-yield asset. At £5,000-6,500/m² residential NSA on the OKR corridor, a 10F scheme adds £7-9M GDV against minimal existing value. OKR residential market has strengthened significantly post-2020 following OA designation.' },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0, precedents: [{"name": "Malt Street OKR", "ref": "Southwark ref 17/AP/3885", "desc": "34F residential + commercial, Old Kent Road. Approved 2020. Establishes tall residential as policy-compliant on OKR corridor."}, {"name": "Biscuit Factory OKR", "ref": "Southwark ref 14/AP/3438", "desc": "Mixed-use 12F scheme, Old Kent Road. Major residential conversion. Confirms LPA appetite for intensification on this corridor."}], insight: 'Old Kent Road Opportunity Area - one of the highest-priority regeneration zones in London. LPA and GLA explicitly support tall residential on OKR corridor. 3 major apps at this address confirm live developer interest. Planning Tailwind score reflects OKR OA policy strength.' },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: 'OKR is an A-road commercial corridor - no heritage designation, no listed buildings within 300m, no conservation areas. Cleanest heritage profile of any candidate site.' },
    acquisition: { label: 'Title Stack', score: 8.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: '3 major planning apps suggest an active owner willing to engage with development. Former petrol station - likely single freehold, potentially a fuel company or property investor. Acquisition is achievable - fuel sites are non-operational assets.' },
    transport: { label: 'Station Gravity', score: 7.5, weight: 0.5, ptal: '4', insight: 'PTAL 4. Old Kent Road (various buses). Elephant & Castle (Northern/Bakerloo) 1.2km. Proposed Bakerloo Line Extension would add a station within 200m - if delivered, transport score upgrades to 9.0.' }
  }
};
