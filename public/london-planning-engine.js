/**
 * London Planning Engine v2
 * Deep planning context for London sites.
 * Design-led system — not FAR-based like NYC.
 */

// ========== BOROUGH DATABASE ==========
const BOROUGH_DB = {
  'City of London': {
    name: 'City of London', code: 'COL', zone: 1,
    heightPolicy: 'Tall buildings acceptable in the Eastern Cluster. Protected views from St Paul\'s Cathedral constrain height across most of the Square Mile. 150m+ in Cluster with justification.',
    tallBuildingThreshold: 75, // metres — triggers Tall Building Assessment
    defaultPlotRatio: { commercial: 18, residential: 8 },
    floorToFloor: { commercial: 4.2, residential: 3.0 },
    conservationCoverage: 'partial', // not blanket but significant
    lvmfExposure: 'high',
    cilResidential: 150, cilCommercial: 75, // £/sqm
    affordableThreshold: 0.35,
    affordableTarget: '35% by habitable room',
    keyPolicies: ['City Plan 2036', 'Protected Views SPD', 'Wind Microclimate Guidelines'],
    opportunityAreas: ['City Cluster', 'Blackfriars'],
    article4: ['Office to resi PDR removed across entire City'],
    typicalApprovedHeights: { low: 20, mid: 60, high: 200 },
    notes: ['St Paul\'s Heights policy (strategic + local views)', 'LVMF strategic views heavily constrain', 'Wind microclimate assessment required for tall buildings', 'Very limited residential — primarily commercial borough', 'Article 4 removes Class MA (office to resi) PDR']
  },
  'Westminster': {
    name: 'City of Westminster', code: 'WCC', zone: 1,
    heightPolicy: 'Generally contextual. Tall buildings resisted across most of the borough. Victoria Opportunity Area and Paddington may accept taller forms subject to heritage constraints.',
    tallBuildingThreshold: 30,
    defaultPlotRatio: { commercial: 5, residential: 4 },
    floorToFloor: { commercial: 4.2, residential: 3.0 },
    conservationCoverage: 'extensive', // ~80% of borough
    lvmfExposure: 'very high',
    cilResidential: 550, cilCommercial: 200,
    affordableThreshold: 0.35,
    affordableTarget: '35% by habitable room, 60:40 intermediate:social rent in prime areas',
    keyPolicies: ['City Plan 2019-2040', 'Victoria OA SPD', 'Paddington OA SPD'],
    opportunityAreas: ['Victoria', 'Paddington'],
    article4: ['Class MA removed borough-wide', 'Class O (office to resi) removed'],
    typicalApprovedHeights: { low: 12, mid: 25, high: 50 },
    notes: ['~80% conservation area coverage', 'Extremely sensitive heritage context', 'Royal Parks settings', 'World Heritage Site buffer (Palace of Westminster)', 'Basement development policy — max 1 storey below ground', 'Very high CIL rates']
  },
  'Camden': {
    name: 'London Borough of Camden', code: 'CMD', zone: 1,
    heightPolicy: 'Tall buildings directed to Euston, Tottenham Court Road, and King\'s Cross growth areas. Contextual elsewhere. Bloomsbury and Hampstead heavily constrained.',
    tallBuildingThreshold: 30,
    defaultPlotRatio: { commercial: 4.5, residential: 3.5 },
    floorToFloor: { commercial: 4.2, residential: 3.0 },
    conservationCoverage: 'extensive',
    lvmfExposure: 'moderate',
    cilResidential: 450, cilCommercial: 150,
    affordableThreshold: 0.35,
    affordableTarget: '35% by habitable room',
    keyPolicies: ['Camden Local Plan 2017', 'Euston Area Plan', 'Fitzrovia AAP'],
    opportunityAreas: ['King\'s Cross', 'Euston', 'Tottenham Court Road'],
    article4: ['Class MA removed in CAZ and most town centres'],
    typicalApprovedHeights: { low: 10, mid: 20, high: 40 },
    notes: ['King\'s Cross/Euston major regeneration — supports height', 'Bloomsbury conservation areas very restrictive', 'Hampstead — extremely sensitive low-rise character', 'HS2 Euston construction impact']
  },
  'Tower Hamlets': {
    name: 'London Borough of Tower Hamlets', code: 'TWH', zone: 2,
    heightPolicy: 'Tall buildings in Canary Wharf, Aldgate, and designated clusters. 21m+ triggers Tall Building Assessment. Whitechapel and Bethnal Green mid-rise. Brick Lane/Spitalfields low-rise.',
    tallBuildingThreshold: 21,
    defaultPlotRatio: { commercial: 6, residential: 4.5 },
    floorToFloor: { commercial: 4.2, residential: 3.0 },
    conservationCoverage: 'partial',
    lvmfExposure: 'high',
    cilResidential: 200, cilCommercial: 0,
    affordableThreshold: 0.35,
    affordableTarget: '35% by habitable room (50% on public land)',
    keyPolicies: ['Tower Hamlets Local Plan 2031', 'Isle of Dogs & South Poplar OA Framework'],
    opportunityAreas: ['Isle of Dogs', 'City Fringe/Aldgate', 'Poplar Riverside'],
    article4: ['Class MA removed in most employment areas'],
    typicalApprovedHeights: { low: 10, mid: 30, high: 75 },
    notes: ['Canary Wharf cluster — 150m+ possible', 'Brick Lane/Spitalfields conservation — max 4-5 storeys', 'Tower of London setting (LVMF 10A/B)', 'High density achieved through mid-rise elsewhere', 'Whitechapel regeneration ongoing']
  },
  'Southwark': {
    name: 'London Borough of Southwark', code: 'SWK', zone: 2,
    heightPolicy: 'Tall buildings in Elephant & Castle, Old Kent Road, and Canada Water opportunity areas. Bankside/Borough contextual. Generally more permissive than north bank equivalents.',
    tallBuildingThreshold: 30,
    defaultPlotRatio: { commercial: 5, residential: 4 },
    floorToFloor: { commercial: 4.2, residential: 3.0 },
    conservationCoverage: 'moderate',
    lvmfExposure: 'moderate',
    cilResidential: 250, cilCommercial: 50,
    affordableThreshold: 0.35,
    affordableTarget: '35% by habitable room (minimum 25% social rent)',
    keyPolicies: ['New Southwark Plan 2022', 'Old Kent Road AAP', 'Canada Water Masterplan'],
    opportunityAreas: ['Elephant & Castle', 'Old Kent Road', 'Canada Water', 'Bankside/Borough/London Bridge'],
    article4: ['Class MA removed in CAZ, town centres, and employment areas'],
    typicalApprovedHeights: { low: 10, mid: 25, high: 50 },
    notes: ['Elephant & Castle — 40+ storeys approved', 'Old Kent Road — major densification planned (Bakerloo Line Extension)', 'Canada Water — town centre regeneration', 'Borough High Street conservation area', 'Tate Modern/Globe Theatre settings']
  },
  'Hackney': {
    name: 'London Borough of Hackney', code: 'HCK', zone: 2,
    heightPolicy: 'Tall buildings in Dalston, Hackney Central, and Shoreditch. Generally resisted elsewhere. Strong community opposition to height. Contextual approach dominates.',
    tallBuildingThreshold: 30,
    defaultPlotRatio: { commercial: 3.5, residential: 3 },
    floorToFloor: { commercial: 4.0, residential: 3.0 },
    conservationCoverage: 'significant',
    lvmfExposure: 'low',
    cilResidential: 190, cilCommercial: 0,
    affordableThreshold: 0.35,
    affordableTarget: '50% on public land, 35% private',
    keyPolicies: ['Hackney Local Plan 2033 (LP33)', 'Dalston Area Action Plan', 'Shoreditch Area Action Plan'],
    opportunityAreas: [],
    article4: ['Class MA removed in priority employment areas'],
    typicalApprovedHeights: { low: 8, mid: 18, high: 30 },
    notes: ['Dalston — mid-rise (8-12 storeys) with street frontage', 'Shoreditch/Old Street — tech corridor, mixed use', 'Mare Street — ground floor commercial protection', 'Strong neighbourhood character requirements', 'Community resistance to towers is politically significant']
  },
  'Islington': {
    name: 'London Borough of Islington', code: 'ISL', zone: 2,
    heightPolicy: 'Generally contextual. Some height at Angel, King\'s Cross fringe, and City Road corridor. Very limited tolerance for tall buildings.',
    tallBuildingThreshold: 30,
    defaultPlotRatio: { commercial: 3.5, residential: 3 },
    floorToFloor: { commercial: 4.0, residential: 3.0 },
    conservationCoverage: 'extensive',
    lvmfExposure: 'low',
    cilResidential: 350, cilCommercial: 0,
    affordableThreshold: 0.35,
    affordableTarget: '50% on sites of 10+ units',
    keyPolicies: ['Islington Local Plan 2023', 'Finsbury Local Plan'],
    opportunityAreas: ['City Fringe/Moorgate (partial)'],
    article4: ['Class MA removed borough-wide'],
    typicalApprovedHeights: { low: 10, mid: 20, high: 30 },
    notes: ['Very high conservation area coverage', 'City Road corridor — emerging mid-rise', 'Angel town centre — limited intensification', 'Strong affordable housing requirements (50%)', 'Small site policy encourages infill']
  },
  'Lambeth': {
    name: 'London Borough of Lambeth', code: 'LBH', zone: 2,
    heightPolicy: 'Tall buildings at Waterloo/South Bank, Vauxhall, and Brixton. Contextual elsewhere. Vauxhall cluster well-established.',
    tallBuildingThreshold: 25,
    defaultPlotRatio: { commercial: 4.5, residential: 4 },
    floorToFloor: { commercial: 4.2, residential: 3.0 },
    conservationCoverage: 'moderate',
    lvmfExposure: 'moderate',
    cilResidential: 200, cilCommercial: 50,
    affordableThreshold: 0.35,
    affordableTarget: '35% (50% on public land)',
    keyPolicies: ['Lambeth Local Plan 2021', 'Waterloo SPD'],
    opportunityAreas: ['Waterloo', 'Vauxhall/Nine Elms (partial)'],
    article4: ['Class MA removed in CAZ and town centres'],
    typicalApprovedHeights: { low: 10, mid: 25, high: 50 },
    notes: ['Vauxhall/Nine Elms cluster — 40+ storeys established', 'Waterloo — mixed use intensification', 'Brixton — sensitive gentrification context', 'Clapham — conservation-led, low-mid rise']
  },
  'Newham': {
    name: 'London Borough of Newham', code: 'NWM', zone: 3,
    heightPolicy: 'Most permissive London borough for height. Tall buildings at Stratford, Canning Town, Royal Docks. Few heritage constraints.',
    tallBuildingThreshold: 21,
    defaultPlotRatio: { commercial: 3.5, residential: 3.5 },
    floorToFloor: { commercial: 4.0, residential: 3.0 },
    conservationCoverage: 'minimal',
    lvmfExposure: 'none',
    cilResidential: 65, cilCommercial: 0,
    affordableThreshold: 0.35,
    affordableTarget: '50% on public land',
    keyPolicies: ['Newham Local Plan 2018', 'Royal Docks & Beckton Riverside OA SPD'],
    opportunityAreas: ['Stratford', 'Royal Docks/Beckton Riverside', 'Canning Town/Custom House'],
    article4: [],
    typicalApprovedHeights: { low: 8, mid: 25, high: 50 },
    notes: ['Stratford — metropolitan centre, 30+ storeys', 'Royal Docks — major regeneration, Elizabeth Line', 'Low CIL rates (emerging area)', 'Silvertown Tunnel under construction', 'Few conservation constraints']
  },
  'Greenwich': {
    name: 'Royal Borough of Greenwich', code: 'GRW', zone: 2,
    heightPolicy: 'Tall buildings at Greenwich Peninsula and Woolwich. World Heritage Site severely constrains historic Greenwich.',
    tallBuildingThreshold: 30,
    defaultPlotRatio: { commercial: 3.5, residential: 3 },
    floorToFloor: { commercial: 4.0, residential: 3.0 },
    conservationCoverage: 'significant',
    lvmfExposure: 'high',
    cilResidential: 70, cilCommercial: 0,
    affordableThreshold: 0.35,
    affordableTarget: '35% by habitable room',
    keyPolicies: ['Royal Greenwich Local Plan (Core Strategy)', 'Greenwich Peninsula Masterplan'],
    opportunityAreas: ['Greenwich Peninsula', 'Woolwich', 'Charlton Riverside'],
    article4: ['Class MA removed in Woolwich town centre'],
    typicalApprovedHeights: { low: 8, mid: 20, high: 40 },
    notes: ['Greenwich World Heritage Site — severe height restrictions', 'Peninsula cluster — 30+ storeys (isolated from WHS)', 'Woolwich Elizabeth Line uplift', 'Charlton Riverside — emerging industrial-to-residential']
  }
};

// ========== USE CLASSES (England, post-Sept 2020) ==========
const USE_CLASSES = {
  'B2': { name: 'General Industrial', desc: 'Industrial processes not in Class E', residential: false },
  'B8': { name: 'Storage & Distribution', desc: 'Warehousing, distribution centres', residential: false },
  'C1': { name: 'Hotels', desc: 'Hotels, boarding houses, guest houses', residential: false },
  'C2': { name: 'Residential Institutions', desc: 'Care homes, hospitals, boarding schools', residential: false },
  'C3': { name: 'Dwellinghouses', desc: 'Houses, flats — residential', residential: true },
  'C4': { name: 'HMO', desc: 'Houses in multiple occupation (3-6 people)', residential: true },
  'E': { name: 'Commercial/Business/Service', desc: 'Shops, restaurants, offices, light industrial, gyms, creches, medical', residential: false },
  'F1': { name: 'Learning & Non-Residential Institutions', desc: 'Schools, galleries, museums, libraries, places of worship', residential: false },
  'F2': { name: 'Local Community', desc: 'Small shops (<280sqm), community halls, outdoor sport', residential: false },
  'SG': { name: 'Sui Generis', desc: 'Pubs, hot food takeaway, cinemas, venues, petrol stations', residential: false }
};

// ========== PDR ROUTES ==========
const PDR_ROUTES = [
  { from: 'E', to: 'C3', name: 'Class MA — Commercial to Residential',
    maxFloorspace: 1500,
    conditions: ['Building must have been in commercial use for 2+ years', 'Vacant for 3+ months', 'Prior approval required', 'Adequate natural light to all habitable rooms', 'Not in Article 4 area', 'Transport & highways assessment', 'Flood risk assessment', 'Contamination assessment'],
    massingImpact: 'No external changes. Conversion of existing floor area only. No upward extension under this route.',
    notes: 'Class MA (Aug 2021). Max 1,500sqm. Most London boroughs have Article 4 removing this in key areas. Check Article 4 status carefully.'
  },
  { from: 'C3', to: 'C3+', name: 'Class AA — Upward Extension (Flats)',
    conditions: ['Purpose-built block of flats', 'Built between 1 July 1948 and 5 March 2018', 'Max 2 additional storeys', 'Must not exceed height of tallest building in terrace by >3.5m', 'Prior approval required', 'Not on Article 2(3) land (conservation area etc.)'],
    massingImpact: 'Up to 2 additional storeys on existing residential blocks. Height increase of 6-7m. Uses existing footprint.',
    notes: 'Significant value uplift potential on post-war blocks. Design quality requirements in prior approval. Neighbours consulted.'
  },
  { from: 'C3_house', to: 'C3+', name: 'Class A/AA — Upward Extension (Houses)',
    conditions: ['Detached or semi-detached house', 'Max 1 additional storey (detached) or match neighbour (semi)', 'Not in conservation area, AONB, National Park', 'Prior approval required'],
    massingImpact: 'One additional storey. Height increase of ~3m. Existing footprint only.',
    notes: 'Limited applicability in London — many areas are conservation areas. Check Article 2(3) land status.'
  },
  { from: 'E', to: 'E', name: 'Class E Flexibility',
    conditions: ['Free movement within Class E', 'No planning permission needed', 'Shop → office → gym → restaurant all permitted'],
    massingImpact: 'No physical change. Use flexibility only.',
    notes: 'Significant for ground floor retail units. A shop can become an office, gym, or restaurant without planning permission.'
  },
  { from: 'B8', to: 'C3', name: 'Class P — Storage to Residential',
    maxFloorspace: 500,
    conditions: ['Max 500sqm', 'Prior approval required', 'Transport assessment'],
    massingImpact: 'Internal conversion only. No upward extension.',
    notes: 'Limited to 500sqm. Flood risk, transport, contamination assessed.'
  }
];

// ========== LONDON PLAN DENSITY MATRIX (2021) ==========
const DENSITY_MATRIX = {
  suburban: {
    '0-1': { minUnits: 15, maxUnits: 50, minHr: 40, maxHr: 130 },
    '2-3': { minUnits: 15, maxUnits: 80, minHr: 40, maxHr: 220 },
    '4-6': { minUnits: 30, maxUnits: 110, minHr: 80, maxHr: 310 }
  },
  urban: {
    '0-1': { minUnits: 15, maxUnits: 80, minHr: 40, maxHr: 220 },
    '2-3': { minUnits: 35, maxUnits: 170, minHr: 100, maxHr: 470 },
    '4-6': { minUnits: 45, maxUnits: 260, minHr: 120, maxHr: 700 }
  },
  central: {
    '0-1': { minUnits: 15, maxUnits: 110, minHr: 40, maxHr: 300 },
    '2-3': { minUnits: 35, maxUnits: 260, minHr: 100, maxHr: 700 },
    '4-6': { minUnits: 65, maxUnits: 405, minHr: 175, maxHr: 1100 }
  }
};

// ========== NATIONAL SPACE STANDARDS ==========
const SPACE_STANDARDS = {
  studio: { minGIA: 37, beds: 0, bedspaces: 1 },
  '1b1p': { minGIA: 39, beds: 1, bedspaces: 1 },
  '1b2p': { minGIA: 50, beds: 1, bedspaces: 2 },
  '2b3p': { minGIA: 61, beds: 2, bedspaces: 3 },
  '2b4p': { minGIA: 70, beds: 2, bedspaces: 4 },
  '3b4p': { minGIA: 74, beds: 3, bedspaces: 4 },
  '3b5p': { minGIA: 86, beds: 3, bedspaces: 5 },
  '3b6p': { minGIA: 95, beds: 3, bedspaces: 6 }
};

// ========== FINANCIAL ASSUMPTIONS ==========
const LONDON_FINANCIALS = {
  1: { name: 'Zone 1 (Central)', rentSqft: 75, saleSqft: 1800, costLow: 350, costHigh: 500, landSqft: 800, commercialRentSqft: 55, commercialSaleSqft: 1200 },
  2: { name: 'Zone 2 (Inner)', rentSqft: 45, saleSqft: 850, costLow: 280, costHigh: 380, landSqft: 400, commercialRentSqft: 35, commercialSaleSqft: 600 },
  3: { name: 'Zone 3+ (Outer)', rentSqft: 30, saleSqft: 550, costLow: 220, costHigh: 300, landSqft: 200, commercialRentSqft: 22, commercialSaleSqft: 350 }
};

// ========== LVMF VIEWS (key ones with rough geometry) ==========
const LVMF_VIEWS = [
  { id: '1A', from: 'Alexandra Palace', to: 'St Paul\'s Cathedral', type: 'Protected Vista' },
  { id: '2A', from: 'Parliament Hill', to: 'St Paul\'s Cathedral', type: 'Protected Vista' },
  { id: '3A', from: 'Kenwood', to: 'St Paul\'s Cathedral', type: 'Protected Vista' },
  { id: '4A', from: 'Primrose Hill', to: 'Palace of Westminster & St Paul\'s', type: 'Panorama' },
  { id: '5A', from: 'Greenwich Park', to: 'St Paul\'s, Tower of London, City', type: 'Panorama' },
  { id: '6A', from: 'Blackheath Point', to: 'St Paul\'s Cathedral', type: 'Protected Vista' },
  { id: '8A', from: 'Westminster Pier', to: 'Palace of Westminster', type: 'Townscape View' },
  { id: '10A', from: 'Tower Bridge (north)', to: 'Tower of London', type: 'Townscape View' },
  { id: '11B', from: 'Westminster Bridge', to: 'Palace of Westminster', type: 'River Prospect' },
  { id: '12B', from: 'Hungerford Bridge', to: 'Palace of Westminster', type: 'River Prospect' },
  { id: '15B', from: 'Waterloo Bridge', to: 'St Paul\'s + City', type: 'River Prospect' },
  { id: '25A', from: 'The Mall', to: 'Buckingham Palace', type: 'Townscape View' }
];

// ========== MAIN FUNCTION ==========
function getPlanningContext(borough, siteData = {}) {
  const boroughData = findBorough(borough);
  if (!boroughData) {
    return {
      borough: borough || 'Unknown',
      error: true,
      notes: [`Borough "${borough}" not yet in database. Currently covering: ${Object.keys(BOROUGH_DB).join(', ')}`]
    };
  }

  const zone = boroughData.zone;
  const financials = LONDON_FINANCIALS[zone];
  const isResidential = siteData.currentUse ? (USE_CLASSES[siteData.currentUse]?.residential || false) : false;

  // Setting for density matrix
  const setting = zone === 1 ? 'central' : (zone === 2 ? 'urban' : 'suburban');

  // PTAL from external data or estimate
  const ptalBand = siteData.ptalBand || (zone <= 2 ? '4-6' : '2-3');
  const density = DENSITY_MATRIX[setting]?.[ptalBand] || DENSITY_MATRIX['urban']['2-3'];

  // Floor-to-floor based on use
  const ftf = isResidential ? boroughData.floorToFloor.residential : boroughData.floorToFloor.commercial;

  // Plot ratio opportunity
  const plotArea = siteData.plotArea || 0;
  const existingFloorArea = siteData.floorArea || 0;
  const existingPlotRatio = plotArea > 0 ? existingFloorArea / plotArea : 0;
  const potentialPlotRatio = isResidential ? boroughData.defaultPlotRatio.residential : boroughData.defaultPlotRatio.commercial;
  const potentialFloorArea = plotArea > 0 ? plotArea * potentialPlotRatio : 0;
  const remainingCapacity = Math.max(0, potentialFloorArea - existingFloorArea);

  // Height potential
  const typicalH = boroughData.typicalApprovedHeights;
  const potentialHeightM = typicalH.mid; // conservative — use mid range
  const potentialFloors = Math.floor(potentialHeightM / ftf);

  // Unit estimates (residential only)
  let unitEstimate = null;
  if (isResidential || siteData.currentUse === 'E') {
    const avgUnitSize = 70; // sqm (London average ~2b flat)
    const nia = remainingCapacity * 0.80; // 80% NIA/GIA ratio
    unitEstimate = {
      total: Math.floor(nia / avgUnitSize),
      byType: {
        studio: Math.floor(nia * 0.1 / SPACE_STANDARDS.studio.minGIA),
        '1bed': Math.floor(nia * 0.3 / SPACE_STANDARDS['1b2p'].minGIA),
        '2bed': Math.floor(nia * 0.4 / SPACE_STANDARDS['2b4p'].minGIA),
        '3bed': Math.floor(nia * 0.2 / SPACE_STANDARDS['3b5p'].minGIA),
      }
    };
  }

  // PDR routes
  const currentUse = siteData.currentUse || 'E';
  const applicablePDR = PDR_ROUTES.filter(r => {
    if (r.from === currentUse) return true;
    if (r.from === 'C3_house' && currentUse === 'C3' && siteData.buildingType === 'house') return true;
    return false;
  });

  // Flag Article 4 restrictions
  const article4Active = boroughData.article4 && boroughData.article4.length > 0;
  const article4Notes = boroughData.article4 || [];

  // PD massing potential
  let pdMassingPotential = null;
  if (currentUse === 'C3' && siteData.floors) {
    // Upward extension potential
    const additionalFloors = siteData.buildingType === 'house' ? 1 : 2;
    const additionalHeightM = additionalFloors * 3.0;
    const additionalArea = (plotArea * 0.7) * additionalFloors; // 70% footprint coverage
    pdMassingPotential = {
      type: 'Upward Extension (PD)',
      additionalFloors,
      additionalHeightM,
      additionalAreaSqm: additionalArea,
      notes: siteData.buildingType === 'house' ? 'Class A/AA: 1 additional storey' : 'Class AA: up to 2 additional storeys on flatted blocks'
    };
  }

  // Affordable housing calculation
  const affordableUnits = unitEstimate ? Math.ceil(unitEstimate.total * boroughData.affordableThreshold) : 0;

  // CIL estimate
  const cilRate = isResidential ? boroughData.cilResidential : boroughData.cilCommercial;
  const cilEstimate = remainingCapacity * cilRate;

  return {
    borough: boroughData.name,
    boroughCode: boroughData.code,
    zone,
    setting,
    financials,
    // Planning Policy
    heightPolicy: boroughData.heightPolicy,
    tallBuildingThreshold: boroughData.tallBuildingThreshold,
    typicalApprovedHeights: typicalH,
    keyPolicies: boroughData.keyPolicies,
    opportunityAreas: boroughData.opportunityAreas,
    // Constraints
    conservationCoverage: boroughData.conservationCoverage,
    lvmfExposure: boroughData.lvmfExposure,
    article4Active,
    article4Notes,
    // Use & Density
    currentUse,
    isResidential,
    useClassInfo: USE_CLASSES[currentUse] || USE_CLASSES['E'],
    density,
    ptalBand,
    floorToFloor: ftf,
    // Capacity
    plotRatio: {
      existing: existingPlotRatio,
      potential: potentialPlotRatio,
      potentialFloorArea,
      remainingCapacity
    },
    potentialHeightM,
    potentialFloors,
    // Units (resi only)
    unitEstimate,
    affordableUnits,
    affordableTarget: boroughData.affordableTarget,
    // PDR
    applicablePDR,
    pdMassingPotential,
    // Financial
    cilRate,
    cilEstimate,
    // Notes
    notes: boroughData.notes || []
  };
}

// ========== HELPERS ==========
function findBorough(name) {
  if (!name) return null;
  const lower = name.toLowerCase().trim();
  for (const [key, val] of Object.entries(BOROUGH_DB)) {
    if (key.toLowerCase() === lower ||
        val.code.toLowerCase() === lower ||
        val.name.toLowerCase() === lower ||
        val.name.toLowerCase().includes(lower) ||
        lower.includes(key.toLowerCase())) {
      return val;
    }
  }
  // Fuzzy match — check if any key words match
  const words = lower.split(/\s+/);
  for (const [key, val] of Object.entries(BOROUGH_DB)) {
    for (const w of words) {
      if (w.length > 3 && (key.toLowerCase().includes(w) || val.name.toLowerCase().includes(w))) {
        return val;
      }
    }
  }
  return null;
}

function guessUseClass(osmBuildingType) {
  const mapping = {
    'residential': 'C3', 'apartments': 'C3', 'house': 'C3', 'detached': 'C3',
    'terrace': 'C3', 'semidetached_house': 'C3', 'bungalow': 'C3', 'dormitory': 'C4',
    'commercial': 'E', 'retail': 'E', 'office': 'E', 'shop': 'E', 'supermarket': 'E',
    'restaurant': 'E', 'cafe': 'E', 'bank': 'E',
    'industrial': 'B2', 'warehouse': 'B8', 'storage': 'B8',
    'hotel': 'C1', 'hostel': 'C1',
    'church': 'F1', 'school': 'F1', 'university': 'F1', 'museum': 'F1', 'library': 'F1',
    'hospital': 'C2', 'nursing_home': 'C2',
    'pub': 'SG', 'bar': 'SG', 'nightclub': 'SG', 'cinema': 'SG', 'theatre': 'SG',
    'garage': 'SG', 'petrol_station': 'SG',
    'yes': 'E', '': 'E'
  };
  return mapping[(osmBuildingType || '').toLowerCase()] || 'E';
}

function getBuildingTypeFromOSM(osmType) {
  const houses = ['house', 'detached', 'semidetached_house', 'terrace', 'bungalow'];
  const flats = ['apartments', 'residential'];
  if (houses.includes((osmType || '').toLowerCase())) return 'house';
  if (flats.includes((osmType || '').toLowerCase())) return 'flats';
  return 'commercial';
}

// ========== EXPORTS ==========
if (typeof window !== 'undefined') {
  window.getPlanningContext = getPlanningContext;
  window.guessUseClass = guessUseClass;
  window.getBuildingTypeFromOSM = getBuildingTypeFromOSM;
  window.BOROUGH_DB = BOROUGH_DB;
  window.USE_CLASSES = USE_CLASSES;
  window.PDR_ROUTES = PDR_ROUTES;
  window.LONDON_FINANCIALS = LONDON_FINANCIALS;
  window.LVMF_VIEWS = LVMF_VIEWS;
  window.SPACE_STANDARDS = SPACE_STANDARDS;
  window.DENSITY_MATRIX = DENSITY_MATRIX;
}
