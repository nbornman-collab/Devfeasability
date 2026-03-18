// Development Intelligence - Mandela Way Industrial Estate, Mandela Way, SE1 5SS
// EPC: 6968m² GIA, Band D | HMLR: PENDING
// Polygon: approximate 10000m² plot area rectangle
const SITE_INTELLIGENCE = {
  polygon: [[-0.07986, 51.491379], [-0.07864, 51.491379], [-0.07864, 51.492441], [-0.07986, 51.492441], [-0.07986, 51.491379]],
  site: 'Mandela Way Industrial Estate',
  borough: 'Southwark',
  use: 'industrial',
  address: 'Mandela Way, SE1 5SS',
  plot_area_m2: 10000,
  existing_gea_m2: 6968,
  existing_floors: 1,
  existing_height_m: 5.0,
  ftf_m: 3.5,
  max_height_m: 49.0,
  max_floors: 14,
  hmlr_title: null, owner: null, epc_rating: 'D',
  factors: {
    sky: { label: 'Available Sky', score: 8.5, weight: 2.5, existing_m: 5.0, precedent_m: 68.6, insight: 'Single-storey 6,968m² storage/distribution at 5m in SE1 - significant underutilisation of a 1ha inner London site. No immediate tall building precedents but the scale and location support a 10-14F scheme subject to industrial floorspace offset policy.' },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: 'Storage/distribution at EPC Band D - functionally obsolete low-yield use. Conversion to residential or Grade A industrial intensification (stacked logistics) both viable. At SE1 residential values of £700-800/sqft NSA, even a modest 8F scheme creates substantial GDV.' },
    momentum: { label: 'Planning Tailwind', score: 7.0, weight: 2.0, precedents: [{"name": "Loman Street SE1", "ref": "Southwark ref 20/AP/1537", "desc": "Mixed-use 12F with industrial floorspace retained at ground. Bermondsey. Confirms LPA approach to industrial intensification with ground floor retention."}, {"name": "Bricklayers Arms SE1", "ref": "Southwark ref 15/AP/3000", "desc": "Industrial-to-residential conversion, 8F, Borough. Precedent for change of use from industrial in inner SE1."}], insight: 'Bermondsey/Borough area has active LPA support for industrial intensification. Southwark Industrial Policy requires like-for-like industrial replacement in inner industrial zones but allows additional residential above. No OA but the Borough/Bermondsey cluster has seen consistent approval of mixed-use schemes.' },
    heritage: { label: 'Heritage Shadow', score: 9.0, weight: 1.5, insight: 'Industrial zone - no heritage constraints, no conservation area. SE1 5SS has no listed buildings in the immediate vicinity.' },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: 'Industrial estate - likely multiple unit leaseholders with single freeholder. 6,968m² storage at Band D suggests ageing stock unlikely to be actively managing. Multiple tenants complicate vacant possession.' },
    transport: { label: 'Station Gravity', score: 7.5, weight: 0.5, ptal: '3', insight: 'PTAL 3-4. London Bridge (Northern/Jubilee/National Rail) 1.2km. Borough Market 900m. Bermondsey station (Jubilee) 600m. Decent inner SE1 connectivity for residential.' }
  }
};
