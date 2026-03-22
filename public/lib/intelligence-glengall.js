// Development Intelligence - Glengall Road and Latona Road, Glengall Road, Old Kent Road, SE15 6NQ
// EPC: 8000m² GIA, Band PLACEHOLDER | HMLR: PENDING
const SITE_INTELLIGENCE = {
  polygon: [[-0.072149, 51.482938], [-0.07199, 51.482964], [-0.070664, 51.483073], [-0.070625, 51.483089], [-0.070559, 51.483185], [-0.070529, 51.483456], [-0.070613, 51.483453], [-0.070646, 51.483619], [-0.070672, 51.48362], [-0.07075, 51.483624], [-0.070733, 51.484107], [-0.070721, 51.484574], [-0.070734, 51.484604], [-0.070747, 51.484659], [-0.070832, 51.484628], [-0.071048, 51.484568], [-0.071266, 51.484569], [-0.071246, 51.484518], [-0.071469, 51.484531], [-0.071761, 51.484557], [-0.071966, 51.484576], [-0.072006, 51.484238], [-0.07209, 51.484221], [-0.072418, 51.484158], [-0.072396, 51.484079], [-0.072367, 51.484012], [-0.072537, 51.484003], [-0.072458, 51.483905], [-0.072572, 51.483894], [-0.072492, 51.483724], [-0.072149, 51.482938]],
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

    heritage_framework: {
      tier: 'clean',
      score: 9.0,
      verdict: 'Limited heritage constraint. Standard LPA design review. No specialist heritage consultant required at pre-app stage.',
      rocketship: 'Rocketship conditions present. No heritage blocker. Lead with bold massing and urban contribution.'
    },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Industrial estate - multiple leaseholders. Freehold assembly required. LPA may support CPO for OA sites. Score reflects ownership complexity." },
    transport: { label: 'Transport Links', score: 7.0, weight: 0.5, ptal: '3', insight: "PTAL 3. Bus-served OKR. Proposed BLE station 600m. If BLE: PTAL upgrades to 5." }
  }
};
