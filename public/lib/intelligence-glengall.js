// Development Intelligence - Glengall Road and Latona Road, Glengall Road, Old Kent Road, SE15 6NQ
// EPC: 8000m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.072702, 51.481501], [-0.071098, 51.481501], [-0.071098, 51.482899], [-0.072702, 51.482899], [-0.072702, 51.481501]],
  site: "Glengall Road and Latona Road",
  borough: 'Southwark', use: 'industrial', address: "Glengall Road, Old Kent Road, SE15 6NQ",
  plot_area_m2: 17300, existing_gea_m2: 8000,
  existing_floors: 1, existing_height_m: 5.0,
  ftf_m: 3.5, max_height_m: 49.0, max_floors: 14,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, insight: "1.73ha industrial land at 5m on the OKR corridor. OA designation supports 25-35F. Massive untapped potential." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Industrial land in OKR OA. Residential at \u00a35,500-6,500/m\u00b2. 14F scheme on 1.73ha generates \u00a380-120M GDV." },
    momentum: { label: 'Planning Tailwind', score: 8.0, weight: 2.0,
      precedents: [{"name":"Malt Street OKR","ref":"Southwark ref 17/AP/3885","desc":"34F residential, OKR. Height precedent for this corridor 400m north."},{"name":"Bermondsey mixed-use industrial","ref":"Southwark ref 20/AP/1800","desc":"Industrial intensification with residential, 500m east. Precedent for mixed-use on former industrial land."}],
      insight: "OKR Opportunity Area. Glengall/Latona is specifically identified in the OKR OAPF for residential-led regeneration. Maximum planning tailwind." },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: "OKR industrial corridor - no heritage constraints." },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Industrial estate - multiple leaseholders. Freehold assembly required. LPA may support CPO for OA sites. Score reflects ownership complexity." },
    transport: { label: 'Station Gravity', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Bus-served OKR. Proposed BLE station 600m. If BLE: PTAL upgrades to 5." }
  }
};
