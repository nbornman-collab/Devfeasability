#!/usr/bin/env node
/**
 * Batch analysis engine for DevFeasibility
 * Scores buildings in a borough by development potential
 */

const fs = require('fs');

// Load planning engine
const planningEngineCode = fs.readFileSync(__dirname + '/public/london-planning-engine.js', 'utf8');
// Execute in a limited context to get the functions
const vm = require('vm');
const ctx = { window: {}, console };
vm.createContext(ctx);
vm.runInContext(planningEngineCode, ctx);
const { getPlanningContext, guessUseClass, BOROUGH_DB } = ctx.window;

function calcPolygonArea(coords) {
  let area = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const j = (i + 1) % coords.length;
    area += coords[i].lon * coords[j].lat;
    area -= coords[j].lon * coords[i].lat;
  }
  area = Math.abs(area) / 2;
  // Convert from degrees^2 to sqm (approximate at London lat)
  const latRad = 51.5 * Math.PI / 180;
  const mPerDegLat = 111320;
  const mPerDegLon = 111320 * Math.cos(latRad);
  return area * mPerDegLat * mPerDegLon;
}

function getCentroid(coords) {
  let latSum = 0, lonSum = 0;
  coords.forEach(c => { latSum += c.lat; lonSum += c.lon; });
  return { lat: latSum / coords.length, lon: lonSum / coords.length };
}

async function getPTAL(lat, lng) {
  try {
    const r = await fetch(`https://api.tfl.gov.uk/StopPoint?lat=${lat}&lon=${lng}&stopTypes=NaptanMetroStation,NaptanRailStation,NaptanBusCoachStation,NaptanPublicBusCoachTram&radius=640`);
    const data = await r.json();
    const stops = data.stopPoints?.length || 0;
    if (stops >= 15) return 6;
    if (stops >= 10) return 5;
    if (stops >= 6) return 4;
    if (stops >= 3) return 3;
    if (stops >= 1) return 2;
    return 1;
  } catch { return null; }
}

function scoreSite(building, planning, plotArea, ptal) {
  const floors = building.levels || 2;
  const ftf = 3.2;
  const heightM = building.height || floors * ftf;
  const existingFloorArea = plotArea * floors;
  
  const typicalH = planning.typicalApprovedHeights || { low: 10, mid: 20, high: 30 };
  const potentialFloors = Math.floor(typicalH.mid / ftf);
  const potentialFloorArea = plotArea * potentialFloors;
  
  const remainingCapacity = Math.max(0, potentialFloorArea - existingFloorArea);
  const remainingCapacitySqft = remainingCapacity * 10.764;
  const utilPct = potentialFloorArea > 0 ? (existingFloorArea / potentialFloorArea) * 100 : 100;
  const underbuiltPct = Math.max(0, 100 - utilPct);
  
  // Financials
  const fin = planning.financials || { saleSqft: 650, costLow: 250, costHigh: 350, rentSqft: 30, landSqft: 200 };
  const isResi = planning.currentUse === 'C3';
  const salePsf = isResi ? fin.saleSqft : (fin.commercialSaleSqft || fin.saleSqft);
  const gdv = remainingCapacitySqft * salePsf;
  const buildCost = remainingCapacitySqft * fin.costHigh;
  const landCost = plotArea * 10.764 * fin.landSqft;
  const cil = planning.cilEstimate || 0;
  const margin = gdv - buildCost - landCost - cil;
  const marginPct = gdv > 0 ? (margin / gdv) * 100 : 0;
  
  // Unit estimate
  const units = isResi ? Math.floor(remainingCapacity / 70) : 0;
  
  // Constraint risk (lower is better)
  let constraintRisk = 0;
  if (planning.conservationArea) constraintRisk += 3;
  if (planning.lvmfExposure === 'high' || planning.lvmfExposure === 'very high') constraintRisk += 2;
  if (planning.article4Active) constraintRisk += 1;
  // Normalize 0-10
  constraintRisk = Math.min(10, constraintRisk * 2);
  
  // Composite score (0-100)
  const underbuiltScore = Math.min(30, underbuiltPct * 0.4); // 0-30
  const marginScore = Math.min(25, Math.max(0, marginPct) * 0.8); // 0-25
  const ptalScore = ptal ? Math.min(15, ptal * 2.5) : 7.5; // 0-15
  const riskScore = Math.max(0, 15 - constraintRisk * 1.5); // 0-15
  const sizeScore = Math.min(15, remainingCapacity / 500 * 15); // 0-15, bigger = better
  
  const composite = Math.round(underbuiltScore + marginScore + ptalScore + riskScore + sizeScore);
  
  return {
    underbuiltPct: Math.round(underbuiltPct),
    remainingCapacity: Math.round(remainingCapacity),
    remainingCapacitySqft: Math.round(remainingCapacitySqft),
    potentialFloors,
    gdv: Math.round(gdv),
    margin: Math.round(margin),
    marginPct: Math.round(marginPct),
    units,
    constraintRisk,
    composite,
    existingFloorArea: Math.round(existingFloorArea),
    potentialFloorArea: Math.round(potentialFloorArea),
  };
}

async function main() {
  const inputFile = process.argv[2] || '/tmp/southwark-buildings.json';
  const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  
  const ways = data.elements.filter(e => e.type === 'way' && e.tags);
  const nodeMap = {};
  data.elements.filter(e => e.type === 'node' && e.lat).forEach(n => { nodeMap[n.id] = n; });
  
  console.error(`Processing ${ways.length} buildings...`);
  
  const results = [];
  let processed = 0;
  
  for (const way of ways) {
    const tags = way.tags;
    const levels = parseInt(tags['building:levels']);
    if (!levels || levels < 1 || levels > 6) continue;
    
    // Get coordinates
    const coords = (way.nodes || [])
      .map(nid => nodeMap[nid])
      .filter(Boolean);
    if (coords.length < 3) continue;
    
    const plotArea = calcPolygonArea(coords);
    if (plotArea < 50 || plotArea > 5000) continue; // skip tiny/huge
    
    const centroid = getCentroid(coords);
    const address = [tags['addr:housenumber'], tags['addr:street']].filter(Boolean).join(' ') || tags.name || `Way ${way.id}`;
    const buildingType = tags.building || 'yes';
    const useClass = guessUseClass(buildingType, tags.use || tags.amenity || '');
    
    const planning = getPlanningContext('Southwark', {
      lat: centroid.lat,
      lng: centroid.lon,
      plotArea,
      floorArea: plotArea * levels,
      floors: levels,
      currentUse: useClass,
      buildingType,
      ptalBand: null
    });
    
    const score = scoreSite(
      { levels, height: parseFloat(tags.height) || null },
      planning,
      plotArea,
      null // PTAL fetched later for top candidates only
    );
    
    if (score.underbuiltPct < 20) continue; // skip already dense
    if (score.remainingCapacity < 200) continue; // skip too small
    
    results.push({
      id: way.id,
      address,
      lat: centroid.lat,
      lng: centroid.lon,
      plotArea: Math.round(plotArea),
      existingFloors: levels,
      existingHeight: parseFloat(tags.height) || Math.round(levels * 3.2),
      buildingType,
      useClass,
      ...score
    });
    
    processed++;
    if (processed % 200 === 0) console.error(`  Processed ${processed}...`);
  }
  
  // Sort by composite score
  results.sort((a, b) => b.composite - a.composite);
  
  // Get PTAL for top 25
  console.error(`Fetching PTAL for top 25 candidates...`);
  for (let i = 0; i < Math.min(25, results.length); i++) {
    const r = results[i];
    const ptal = await getPTAL(r.lat, r.lng);
    r.ptal = ptal;
    // Rescore with PTAL
    const rescore = scoreSite(
      { levels: r.existingFloors, height: r.existingHeight },
      getPlanningContext('Southwark', {
        lat: r.lat, lng: r.lng, plotArea: r.plotArea,
        floorArea: r.plotArea * r.existingFloors,
        floors: r.existingFloors, currentUse: r.useClass,
        buildingType: r.buildingType, ptalBand: ptal >= 5 ? '5-6' : ptal >= 3 ? '3-4' : '1-2'
      }),
      r.plotArea,
      ptal
    );
    Object.assign(r, rescore);
    // Rate limit
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Re-sort after PTAL rescoring
  results.sort((a, b) => b.composite - a.composite);
  
  // Output top 50
  const top = results.slice(0, 50);
  console.error(`\nTop 50 out of ${results.length} candidates:`);
  console.error('─'.repeat(120));
  
  top.forEach((r, i) => {
    console.error(
      `${String(i + 1).padStart(2)}. ${r.address.padEnd(40).substring(0, 40)} | ` +
      `${r.existingFloors}F→${r.potentialFloors}F | ` +
      `+${(r.remainingCapacity / 1000).toFixed(1)}Ksqm | ` +
      `£${(r.gdv / 1000000).toFixed(1)}M GDV | ` +
      `${r.marginPct}% margin | ` +
      `${r.underbuiltPct}% underbuilt | ` +
      `PTAL:${r.ptal || '?'} | ` +
      `Score:${r.composite}`
    );
  });
  
  // Save full JSON
  const outputFile = '/tmp/southwark-top50.json';
  fs.writeFileSync(outputFile, JSON.stringify(top, null, 2));
  console.error(`\nSaved to ${outputFile}`);
}

main().catch(e => console.error('Fatal:', e));
