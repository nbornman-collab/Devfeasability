// Development Intelligence - 185 Park Street, 185 Park Street, Bankside, SE1 9BL
// EPC GEA: PLACEHOLDER - verify via EPC API before client use
// HMLR: PENDING | Polygon: approx 4600m²
const SITE_INTELLIGENCE = {
  polygon: [[-0.098064, 51.50639], [-0.097236, 51.50639], [-0.097236, 51.50711], [-0.098064, 51.50711], [-0.098064, 51.50639]],
  site: "185 Park Street",
  borough: 'Southwark', use: 'office', address: "185 Park Street, Bankside, SE1 9BL",
  plot_area_m2: 4600, existing_gea_m2: 7500,
  existing_floors: 6, existing_height_m: 24.0,
  ftf_m: 4.0, max_height_m: 60.0, max_floors: 15,
  hmlr_title: null, owner: null, epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 7.5, weight: 2.5, existing_m: 24.0, insight: "75 major applications is the highest of any candidate site - this is one of the most scrutinised development plots in Bankside. Located between Tate Modern and the Thames, at 24m the site uses a fraction of its Bankside height envelope." },
    value: { label: 'Rent Headroom', score: 8.5, weight: 2.0, insight: "Bankside office at premium SE1 address. New-build Grade A commands \u00a380-90/sqft. Alternatively, Bankside residential achieves \u00a31,400-1,800/sqft - the highest values in the candidate set." },
    momentum: { label: 'Planning Tailwind', score: 9.0, weight: 2.0,
      precedents: [{"name":"Tate Modern Extension","ref":"Southwark ref 09/AP/2543","desc":"10F arts extension, Bankside. Adjacent site. Confirms GLA appetite for significant development at this riverside address."},{"name":"One Bankside","ref":"Southwark ref 16/AP/3450","desc":"10F luxury residential, Bankside. Adjacent block. Confirms high-value residential at 185 Park Street address."}],
      insight: "OA + CAZ + adjacent to Tate Modern = maximum planning momentum. 75 major applications (likely capturing Tate/riverside area activity) reflects the extreme developer activity in this location." },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Tate Modern (former Bankside Power Station) is a listed structure nearby. Bankside Conservation Area. Heritage sensitivity is real but manageable - design quality is the planning currency here, not heritage refusal." },
    acquisition: { label: 'Title Stack', score: 5.5, weight: 1.5, titles: null, tenure: 'Unknown - HMLR pending', owner: null, insight: "Bankside address - institutional freehold. 163 total apps suggests complex planning history. High-value location means acquisition price will reflect development potential." },
    transport: { label: 'Station Gravity', score: 9.5, weight: 0.5, ptal: '6a', insight: "PTAL 6a. Blackfriars (Elizabeth/Thameslink) 350m. Southwark (Jubilee) 500m. Waterloo 700m. Exceptional transport access." }
  }
};
