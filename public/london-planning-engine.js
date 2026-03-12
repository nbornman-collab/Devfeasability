/**
 * London Planning Engine
 * Returns planning constraints for a site based on borough, use class, and London Plan policies.
 * Replaces NYC zoning-engine.js for the London pivot.
 */

// Borough planning data — height policies, density guidance, CIL rates
const BOROUGH_DB = {
  'City of London': {
    name: 'City of London',
    code: 'COL',
    zone: 1,
    heightPolicy: 'Tall buildings acceptable in Cluster area. Elsewhere, contextual heights apply.',
    maxHeightM: null, // No blanket cap — depends on location within the City
    clusterArea: true,
    conservationAreas: true,
    lvmfViews: true,
    avgPlotRatio: 15.0,
    typicalHeight: { low: 20, high: 200 },
    cilRate: 150, // £/sqm approx
    notes: ['St Paul\'s Heights policy applies', 'LVMF strategic views constrain height', 'Protected vistas from multiple viewpoints']
  },
  'Westminster': {
    name: 'City of Westminster',
    code: 'WCC',
    zone: 1,
    heightPolicy: 'Generally contextual. Tall buildings resisted in most areas. Victoria and Paddington opportunity areas may accept height.',
    maxHeightM: null,
    conservationAreas: true,
    lvmfViews: true,
    avgPlotRatio: 5.0,
    typicalHeight: { low: 12, high: 40 },
    cilRate: 400,
    notes: ['Extensive conservation area coverage (~80%)', 'LVMF views heavily constrain', 'Victoria Opportunity Area supports taller buildings']
  },
  'Camden': {
    name: 'London Borough of Camden',
    code: 'CMD',
    zone: 1,
    heightPolicy: 'Tall buildings directed to Euston, Tottenham Court Road, and King\'s Cross growth areas. Contextual elsewhere.',
    maxHeightM: null,
    conservationAreas: true,
    lvmfViews: true,
    avgPlotRatio: 4.0,
    typicalHeight: { low: 10, high: 30 },
    cilRate: 300,
    notes: ['King\'s Cross / Euston growth areas support height', 'Extensive conservation areas in Bloomsbury, Hampstead']
  },
  'Tower Hamlets': {
    name: 'London Borough of Tower Hamlets',
    code: 'TWH',
    zone: 2,
    heightPolicy: 'Tall buildings in Canary Wharf, Aldgate, and designated clusters. 21m+ requires Tall Building Assessment.',
    tallBuildingThreshold: 21,
    conservationAreas: true,
    lvmfViews: true,
    avgPlotRatio: 5.0,
    typicalHeight: { low: 10, high: 50 },
    cilRate: 200,
    notes: ['Canary Wharf cluster accepts significant height', 'Brick Lane / Spitalfields conservation constraints', 'Isle of Dogs Opportunity Area']
  },
  'Southwark': {
    name: 'London Borough of Southwark',
    code: 'SWK',
    zone: 2,
    heightPolicy: 'Tall buildings in Elephant & Castle, Old Kent Road, and Canada Water opportunity areas. Contextual elsewhere.',
    tallBuildingThreshold: 30,
    conservationAreas: true,
    lvmfViews: true,
    avgPlotRatio: 4.0,
    typicalHeight: { low: 10, high: 40 },
    cilRate: 250,
    notes: ['Elephant & Castle major regeneration', 'Old Kent Road AAP supports density', 'Borough High Street conservation area']
  },
  'Hackney': {
    name: 'London Borough of Hackney',
    code: 'HCK',
    zone: 2,
    heightPolicy: 'Tall buildings in Dalston, Hackney Central, and Shoreditch. Generally resisted elsewhere. Contextual approach.',
    tallBuildingThreshold: 30,
    conservationAreas: true,
    lvmfViews: false,
    avgPlotRatio: 3.5,
    typicalHeight: { low: 8, high: 25 },
    cilRate: 190,
    notes: ['Dalston and Hackney Central support mid-rise', 'Shoreditch/Old Street tech corridor', 'Strong community resistance to tall buildings']
  },
  'Islington': {
    name: 'London Borough of Islington',
    code: 'ISL',
    zone: 2,
    heightPolicy: 'Generally contextual. Some height at Angel, King\'s Cross fringe, and City Road corridor.',
    tallBuildingThreshold: 30,
    conservationAreas: true,
    lvmfViews: false,
    avgPlotRatio: 3.5,
    typicalHeight: { low: 10, high: 25 },
    cilRate: 300,
    notes: ['Very high conservation area coverage', 'City Road/Old Street corridor emerging']
  },
  'Lambeth': {
    name: 'London Borough of Lambeth',
    code: 'LBH',
    zone: 2,
    heightPolicy: 'Tall buildings at Waterloo, Vauxhall, and Brixton. Contextual elsewhere.',
    tallBuildingThreshold: 25,
    conservationAreas: true,
    lvmfViews: true,
    avgPlotRatio: 4.0,
    typicalHeight: { low: 10, high: 40 },
    cilRate: 200,
    notes: ['Vauxhall/Nine Elms cluster established', 'Waterloo supports significant height', 'Brixton intensification']
  },
  'Newham': {
    name: 'London Borough of Newham',
    code: 'NWM',
    zone: 3,
    heightPolicy: 'Tall buildings at Stratford, Canning Town, and Royal Docks. More permissive generally.',
    tallBuildingThreshold: 21,
    conservationAreas: false,
    lvmfViews: false,
    avgPlotRatio: 3.0,
    typicalHeight: { low: 8, high: 30 },
    cilRate: 60,
    notes: ['Stratford as metropolitan centre', 'Royal Docks/Silvertown major regeneration', 'Elizabeth Line connectivity uplift']
  },
  'Greenwich': {
    name: 'Royal Borough of Greenwich',
    code: 'GRW',
    zone: 2,
    heightPolicy: 'Tall buildings at Greenwich Peninsula and Woolwich. World Heritage Site buffer constrains.',
    tallBuildingThreshold: 30,
    conservationAreas: true,
    lvmfViews: true,
    avgPlotRatio: 3.0,
    typicalHeight: { low: 8, high: 25 },
    cilRate: 70,
    notes: ['Greenwich World Heritage Site buffer', 'Peninsula cluster supports height', 'Woolwich Elizabeth Line uplift']
  }
};

// Use Classes (England, post-Sept 2020 reform)
const USE_CLASSES = {
  'A': { name: 'Shops (old)', desc: 'Now Class E — retail', superseded: true },
  'B1': { name: 'Business (old)', desc: 'Now Class E — office, light industrial', superseded: true },
  'B2': { name: 'General Industrial', desc: 'Industrial processes not in Class E' },
  'B8': { name: 'Storage & Distribution', desc: 'Warehousing, distribution centres' },
  'C1': { name: 'Hotels', desc: 'Hotels, boarding houses, guest houses' },
  'C2': { name: 'Residential Institutions', desc: 'Care homes, hospitals, boarding schools' },
  'C3': { name: 'Dwellinghouses', desc: 'Residential — houses, flats' },
  'C4': { name: 'HMO', desc: 'Houses in multiple occupation (3-6 people)' },
  'E': { name: 'Commercial, Business & Service', desc: 'Shops, restaurants, offices, light industrial, gyms, creches, medical' },
  'F1': { name: 'Learning & Non-Residential Institutions', desc: 'Schools, galleries, museums, libraries, public halls, places of worship' },
  'F2': { name: 'Local Community', desc: 'Small shops (<280sqm), community halls, outdoor sport, swimming pools' },
  'SG': { name: 'Sui Generis', desc: 'Uses that don\'t fall into any class — pubs, hot food takeaways, cinemas, live music venues, etc.' }
};

// PDR (Permitted Development Rights) — key conversions
const PDR_ROUTES = [
  { from: 'E', to: 'C3', name: 'Commercial to Residential', maxFloorspace: 1500, conditions: ['Prior approval required', 'Adequate natural light', 'Flood risk', 'Not in Article 4 area'], notes: 'Class MA — introduced Aug 2021. 2-year vacancy required.' },
  { from: 'E', to: 'Nursery', name: 'Commercial to Nursery', conditions: ['Prior approval'], notes: 'Class MA(1)' },
  { from: 'B2', to: 'E', name: 'Industrial to Commercial', maxFloorspace: 500, conditions: ['Prior approval'], notes: 'Class PA' },
  { from: 'B8', to: 'C3', name: 'Storage to Residential', maxFloorspace: 500, conditions: ['Prior approval', 'Transport assessment'], notes: 'Class P' },
  { from: 'C3', to: 'C4', name: 'House to HMO', conditions: ['Up to 6 occupants'], notes: 'Not in Article 4 areas (most London boroughs have removed this PDR)' }
];

// London Plan 2021 — Density matrix guidance (Table 3.2 simplified)
// Units per hectare based on PTAL and setting
const DENSITY_MATRIX = {
  suburban: {
    '0-1': { min: 15, max: 50 },
    '2-3': { min: 15, max: 80 },
    '4-6': { min: 30, max: 110 }
  },
  urban: {
    '0-1': { min: 15, max: 80 },
    '2-3': { min: 35, max: 170 },
    '4-6': { min: 45, max: 260 }
  },
  central: {
    '0-1': { min: 15, max: 110 },
    '2-3': { min: 35, max: 260 },
    '4-6': { min: 65, max: 405 }
  }
};

// LVMF Protected Vistas (simplified — key strategic views)
const LVMF_VIEWS = [
  { id: 'LVMF-1', name: 'Alexandra Palace to St Paul\'s Cathedral', protects: 'St Paul\'s dome' },
  { id: 'LVMF-2', name: 'Parliament Hill to St Paul\'s Cathedral', protects: 'St Paul\'s dome' },
  { id: 'LVMF-3', name: 'Kenwood to St Paul\'s Cathedral', protects: 'St Paul\'s dome' },
  { id: 'LVMF-4', name: 'Primrose Hill to St Paul\'s & Palace of Westminster', protects: 'Panorama' },
  { id: 'LVMF-5', name: 'Greenwich Park to St Paul\'s & Tower of London', protects: 'Panorama' },
  { id: 'LVMF-6', name: 'Blackheath Point to St Paul\'s', protects: 'St Paul\'s dome' },
  { id: 'LVMF-10', name: 'Tower Bridge — upstream & downstream', protects: 'Tower of London setting' },
  { id: 'LVMF-11', name: 'Westminster Bridge to Palace of Westminster', protects: 'Palace silhouette' },
  { id: 'LVMF-12', name: 'Hungerford Bridge to Palace of Westminster', protects: 'Palace silhouette' },
  { id: 'LVMF-25', name: 'The Mall to Buckingham Palace', protects: 'Palace frontage' }
];

// Financial assumptions by zone
const LONDON_FINANCIALS = {
  1: { name: 'Zone 1 (Central)', rentSqft: 75, saleSqft: 1800, costLow: 350, costHigh: 500, landSqft: 800 },
  2: { name: 'Zone 2 (Inner)', rentSqft: 45, saleSqft: 850, costLow: 280, costHigh: 380, landSqft: 400 },
  3: { name: 'Zone 3+ (Outer)', rentSqft: 30, saleSqft: 550, costLow: 220, costHigh: 300, landSqft: 200 }
};

/**
 * Main function: get planning context for a location
 * @param {string} borough - Borough name
 * @param {object} siteData - { lat, lng, floorArea, floors, yearBuilt, currentUse }
 * @returns {object} Planning analysis
 */
function getPlanningContext(borough, siteData = {}) {
  const boroughData = findBorough(borough);
  if (!boroughData) {
    return {
      borough: borough || 'Unknown',
      error: true,
      notes: [`Borough "${borough}" not in database. Currently covering: ${Object.keys(BOROUGH_DB).join(', ')}`]
    };
  }

  const zone = boroughData.zone;
  const financials = LONDON_FINANCIALS[zone] || LONDON_FINANCIALS[2];

  // Estimate setting for density matrix
  const setting = zone === 1 ? 'central' : (zone === 2 ? 'urban' : 'suburban');
  // Assume PTAL 4-6 as default for inner London (can refine later)
  const ptalBand = zone <= 2 ? '4-6' : '2-3';
  const density = DENSITY_MATRIX[setting][ptalBand];

  // PDR routes for current use
  const currentUse = siteData.currentUse || 'E';
  const applicablePDR = PDR_ROUTES.filter(r => r.from === currentUse);

  // Estimate plot ratio opportunity
  const plotArea = siteData.plotArea || 0;
  const existingFloorArea = siteData.floorArea || 0;
  const existingPlotRatio = plotArea > 0 ? existingFloorArea / plotArea : 0;
  const potentialPlotRatio = boroughData.avgPlotRatio;
  const potentialFloorArea = plotArea > 0 ? plotArea * potentialPlotRatio : 0;
  const remainingCapacity = Math.max(0, potentialFloorArea - existingFloorArea);

  return {
    borough: boroughData.name,
    boroughCode: boroughData.code,
    zone: zone,
    financials: financials,
    heightPolicy: boroughData.heightPolicy,
    tallBuildingThreshold: boroughData.tallBuildingThreshold || null,
    maxHeightM: boroughData.maxHeightM || null,
    typicalHeight: boroughData.typicalHeight,
    conservationAreas: boroughData.conservationAreas,
    lvmfViews: boroughData.lvmfViews,
    cilRate: boroughData.cilRate,
    density: density,
    setting: setting,
    ptalBand: ptalBand,
    plotRatio: {
      existing: existingPlotRatio,
      potential: potentialPlotRatio,
      potentialFloorArea: potentialFloorArea,
      remainingCapacity: remainingCapacity
    },
    currentUse: currentUse,
    useClassInfo: USE_CLASSES[currentUse] || USE_CLASSES['E'],
    applicablePDR: applicablePDR,
    notes: boroughData.notes || []
  };
}

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
  return null;
}

// Expose globally
if (typeof window !== 'undefined') {
  window.getPlanningContext = getPlanningContext;
  window.BOROUGH_DB = BOROUGH_DB;
  window.USE_CLASSES = USE_CLASSES;
  window.PDR_ROUTES = PDR_ROUTES;
  window.LONDON_FINANCIALS = LONDON_FINANCIALS;
  window.LVMF_VIEWS = LVMF_VIEWS;
}
