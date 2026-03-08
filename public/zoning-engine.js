/**
 * NYC Zoning Rules Engine
 * Returns zoning constraints for any NYC zoning district code.
 * Based on NYC Zoning Resolution values.
 */

function getZoningRules(zoneDistrict) {
  if (!zoneDistrict || zoneDistrict === '—') return defaultRules('No district provided');

  // Handle commercial overlay combos like "C1-4/R7A"
  let district = zoneDistrict.trim().toUpperCase();
  let overlayNote = null;
  if (district.includes('/')) {
    const parts = district.split('/');
    overlayNote = `Commercial overlay ${parts[0]} mapped onto ${parts[1]}`;
    // Use the residential base for residential rules
    const resPart = parts.find(p => p.startsWith('R')) || parts[1];
    const comPart = parts.find(p => p.startsWith('C')) || parts[0];
    const resRules = getZoningRules(resPart);
    const comRules = getZoningRules(comPart);
    resRules.maxFAR.commercial = comRules.maxFAR.commercial;
    resRules.notes.unshift(overlayNote);
    return resRules;
  }

  const rules = ZONING_DB[district];
  if (rules) {
    const r = JSON.parse(JSON.stringify(rules));
    r.notes = r.notes || [];
    r.notes.push(
      'Special district overlays, landmark designations, and deed restrictions are NOT reflected here.',
      'Inclusionary Housing or MIH bonuses may modify FAR and parking requirements.',
      'Always verify with DOB and the Zoning Resolution.'
    );
    return r;
  }

  return defaultRules(`Unrecognized district "${zoneDistrict}" - using base values`);
}

function defaultRules(note) {
  return {
    type: 'Residential', maxFAR: { residential: 1.0, commercial: 0, communityFacility: 1.0 },
    height: { maxFeet: null, baseHeightMin: null, baseHeightMax: null, streetWallRequired: false },
    setbacks: { front: 0, rearYard: 30, rearYardPct: null, sideYardMin: 8, sideYardTotal: 16 },
    skyExposure: { applies: false, angle: null, initialHeight: null },
    qualityHousing: { available: false, required: false },
    parking: { spotsPerUnit: 1, transitZoneReduction: false },
    contextual: false, heightFactor: false,
    towerRegulations: { applies: false, maxFloorplate: null, maxLotCoverage: null },
    notes: [note, 'Special district overlays, landmark designations, and deed restrictions are NOT reflected here.', 'Always verify with DOB and the Zoning Resolution.']
  };
}

// Helper to build a residential entry
function R(far, opts = {}) {
  const base = opts.base || 0; // base number for R district (1-10)
  const highDensity = base >= 6;
  return {
    type: 'Residential',
    maxFAR: {
      residential: far,
      commercial: 0,
      communityFacility: opts.cf || far
    },
    height: {
      maxFeet: opts.maxFeet || null,
      baseHeightMin: opts.baseMin || null,
      baseHeightMax: opts.baseMax || null,
      streetWallRequired: opts.streetWall || false
    },
    setbacks: {
      front: opts.front || 0,
      rearYard: highDensity ? 30 : 30,
      rearYardPct: highDensity ? 20 : null,
      sideYardMin: opts.sideMin !== undefined ? opts.sideMin : (highDensity ? 0 : 8),
      sideYardTotal: opts.sideTotal !== undefined ? opts.sideTotal : (highDensity ? 0 : 16)
    },
    skyExposure: {
      applies: opts.sky || false,
      angle: opts.skyAngle || null,
      initialHeight: opts.skyInit || null
    },
    qualityHousing: {
      available: opts.qhAvail || false,
      required: opts.qhReq || false
    },
    parking: {
      spotsPerUnit: opts.parking || (highDensity ? (base >= 8 ? 0.4 : (opts.contextual ? 0.5 : 0.7)) : 1),
      transitZoneReduction: highDensity
    },
    contextual: opts.contextual || false,
    heightFactor: opts.hf || false,
    towerRegulations: {
      applies: opts.tower || false,
      maxFloorplate: opts.towerFP || null,
      maxLotCoverage: opts.towerCov || null
    },
    notes: opts.notes || []
  };
}

function C(comFar, opts = {}) {
  return {
    type: 'Commercial',
    maxFAR: {
      residential: opts.resFar || 0,
      commercial: comFar,
      communityFacility: opts.cf || comFar
    },
    height: {
      maxFeet: opts.maxFeet || null,
      baseHeightMin: opts.baseMin || null,
      baseHeightMax: opts.baseMax || null,
      streetWallRequired: opts.streetWall || false
    },
    setbacks: {
      front: 0,
      rearYard: opts.rearYard || 20,
      rearYardPct: opts.rearPct || null,
      sideYardMin: 0,
      sideYardTotal: 0
    },
    skyExposure: { applies: opts.sky || false, angle: opts.skyAngle || null, initialHeight: opts.skyInit || null },
    qualityHousing: { available: false, required: false },
    parking: { spotsPerUnit: opts.parking || 0, transitZoneReduction: opts.transit || false },
    contextual: opts.contextual || false,
    heightFactor: opts.hf || false,
    towerRegulations: { applies: opts.tower || false, maxFloorplate: opts.towerFP || null, maxLotCoverage: opts.towerCov || null },
    notes: opts.notes || []
  };
}

function M(far, opts = {}) {
  return {
    type: 'Manufacturing',
    maxFAR: { residential: 0, commercial: far, communityFacility: opts.cf || far },
    height: { maxFeet: opts.maxFeet || null, baseHeightMin: null, baseHeightMax: null, streetWallRequired: false },
    setbacks: { front: 0, rearYard: opts.rear || 20, rearYardPct: null, sideYardMin: 0, sideYardTotal: 0 },
    skyExposure: { applies: opts.sky || false, angle: opts.skyAngle || null, initialHeight: opts.skyInit || null },
    qualityHousing: { available: false, required: false },
    parking: { spotsPerUnit: 0, transitZoneReduction: false },
    contextual: false, heightFactor: false,
    towerRegulations: { applies: false, maxFloorplate: null, maxLotCoverage: null },
    notes: opts.notes || ['Residential use not permitted in manufacturing districts.']
  };
}

const ZONING_DB = {
  // === RESIDENTIAL ===
  // R1
  'R1-1': R(0.5, { base: 1, cf: 1.0, notes: ['Detached single-family only', 'Min lot 9,500 sf'] }),
  'R1-2': R(0.5, { base: 1, cf: 1.0, notes: ['Detached single-family only', 'Min lot 5,700 sf'] }),
  // R2
  'R2':   R(0.5, { base: 2, cf: 1.0, notes: ['Detached single-family', 'Min lot 3,800 sf'] }),
  'R2A':  R(0.5, { base: 2, cf: 1.0, contextual: true, notes: ['Detached single-family', 'Contextual'] }),
  // R3
  'R3-1': R(0.6, { base: 3, cf: 1.0, notes: ['Semi-detached and detached', 'Min lot 3,325 sf'] }),
  'R3-2': R(0.5, { base: 3, cf: 1.0, notes: ['Detached homes', 'Min lot 3,800 sf'] }),
  'R3A':  R(0.5, { base: 3, cf: 1.0, contextual: true, notes: ['Contextual detached/semi-detached'] }),
  'R3X':  R(0.5, { base: 3, cf: 1.0, contextual: true, notes: ['Contextual detached only', 'Min lot 3,325 sf'] }),
  // R4
  'R4':   R(0.75, { base: 4, cf: 2.0, notes: ['Low-density general residence'] }),
  'R4-1': R(0.9, { base: 4, cf: 2.0, notes: ['Semi-detached and detached'] }),
  'R4A':  R(0.75, { base: 4, cf: 2.0, contextual: true, maxFeet: 35, notes: ['Contextual, 35ft max'] }),
  'R4B':  R(0.9, { base: 4, cf: 2.0, contextual: true, maxFeet: 24, notes: ['Contextual, 24ft max', 'Rowhouse character'] }),
  // R5
  'R5':   R(1.25, { base: 5, cf: 2.0, notes: ['Medium-density general residence'] }),
  'R5A':  R(1.1, { base: 5, cf: 2.0, contextual: true, maxFeet: 40, notes: ['Contextual', '40ft height limit'] }),
  'R5B':  R(1.35, { base: 5, cf: 2.0, contextual: true, maxFeet: 33, notes: ['Contextual', '33ft height limit'] }),
  'R5D':  R(2.0, { base: 5, cf: 2.0, contextual: true, maxFeet: 40, notes: ['Contextual', '40ft height limit'] }),
  // R6
  'R6':   R(2.43, { base: 6, cf: 4.8, hf: true, qhAvail: true, sky: true, skyAngle: 2.7, skyInit: 60,
            notes: ['Height factor: 2.43 FAR; Quality Housing: up to 3.0 FAR', 'Sky exposure plane applies in HF'] }),
  'R6A':  R(3.0, { base: 6, cf: 3.0, contextual: true, qhReq: true, qhAvail: true,
            maxFeet: 70, baseMin: 40, baseMax: 60, streetWall: true,
            notes: ['Contextual; Quality Housing required', '70ft max (80ft with Qualifying Ground Floor)'] }),
  'R6B':  R(2.0, { base: 6, cf: 2.0, contextual: true, qhReq: true, qhAvail: true,
            maxFeet: 50, baseMin: 30, baseMax: 40, streetWall: true, sideMin: 8, sideTotal: 8,
            notes: ['Contextual rowhouse district', '50ft max height', '8ft side yard if detached'] }),
  // R7
  'R7-1': R(3.44, { base: 7, cf: 4.8, hf: true, sky: true, skyAngle: 2.7, skyInit: 60,
            notes: ['Height factor district', 'Wide street: 3.44 FAR'] }),
  'R7-2': R(3.44, { base: 7, cf: 6.5, hf: true, qhAvail: true, sky: true, skyAngle: 5.6, skyInit: 60,
            tower: true, towerFP: 7700, towerCov: 0.4,
            notes: ['Height factor: 3.44; QH: up to 4.0', 'Tower-on-base regulations may apply'] }),
  'R7A':  R(4.0, { base: 7, cf: 4.0, contextual: true, qhReq: true, qhAvail: true,
            maxFeet: 80, baseMin: 40, baseMax: 65, streetWall: true,
            notes: ['Contextual; QH required', '80ft max (85ft with QG)'] }),
  'R7B':  R(3.0, { base: 7, cf: 3.0, contextual: true, qhReq: true, qhAvail: true,
            maxFeet: 75, baseMin: 40, baseMax: 65, streetWall: true,
            notes: ['Contextual', '75ft max height'] }),
  'R7D':  R(4.2, { base: 7, cf: 4.2, contextual: true, qhReq: true, qhAvail: true,
            maxFeet: 100, baseMin: 60, baseMax: 85, streetWall: true,
            notes: ['Contextual', '100ft max height'] }),
  'R7X':  R(5.0, { base: 7, cf: 5.0, contextual: true, qhReq: true, qhAvail: true,
            maxFeet: 125, baseMin: 60, baseMax: 85, streetWall: true,
            notes: ['Contextual', '125ft max height'] }),
  // R8
  'R8':   R(6.02, { base: 8, cf: 6.5, hf: true, qhAvail: true, sky: true, skyAngle: 5.6, skyInit: 85,
            tower: true, towerFP: 7700, towerCov: 0.4,
            notes: ['Height factor: 6.02; QH: up to 7.2', 'Tower regulations may apply'] }),
  'R8A':  R(6.02, { base: 8, cf: 6.5, contextual: true, qhReq: true, qhAvail: true,
            maxFeet: 120, baseMin: 60, baseMax: 85, streetWall: true,
            notes: ['Contextual', '120ft max (145ft with QG)'] }),
  'R8B':  R(4.0, { base: 8, cf: 4.0, contextual: true, qhReq: true, qhAvail: true,
            maxFeet: 75, baseMin: 55, baseMax: 65, streetWall: true,
            notes: ['Contextual mid-block', '75ft max height'] }),
  'R8X':  R(6.02, { base: 8, cf: 6.5, contextual: true, qhReq: true, qhAvail: true,
            maxFeet: 150, baseMin: 60, baseMax: 85, streetWall: true,
            notes: ['Contextual', '150ft max height'] }),
  // R9
  'R9':   R(7.52, { base: 9, cf: 10.0, hf: true, qhAvail: true, sky: true, skyAngle: 5.6, skyInit: 85,
            tower: true, towerFP: 7700, towerCov: 0.4,
            notes: ['Height factor: 7.52; QH: up to 9.0', 'Tower regulations apply'] }),
  'R9A':  R(7.52, { base: 9, cf: 7.52, contextual: true, qhReq: true, qhAvail: true,
            maxFeet: 135, baseMin: 60, baseMax: 95, streetWall: true,
            notes: ['Contextual', '135ft max height'] }),
  'R9D':  R(9.0, { base: 9, cf: 9.0, contextual: true, qhReq: true, qhAvail: true,
            maxFeet: 175, baseMin: 60, baseMax: 95, streetWall: true,
            notes: ['Contextual', '175ft max height'] }),
  'R9X':  R(9.0, { base: 9, cf: 9.0, contextual: true, qhReq: true, qhAvail: true,
            maxFeet: 175, baseMin: 60, baseMax: 105, streetWall: true,
            notes: ['Contextual', '175ft max height'] }),
  // R10
  'R10':  R(10.0, { base: 10, cf: 10.0, hf: false, qhAvail: true,
            tower: true, towerFP: 7700, towerCov: 0.4,
            notes: ['Highest density residential', 'No fixed height limit', 'Tower regulations apply'] }),
  'R10A': R(10.0, { base: 10, cf: 10.0, contextual: true, qhReq: true, qhAvail: true,
            maxFeet: 185, baseMin: 60, baseMax: 105, streetWall: true,
            notes: ['Contextual', '185ft max height'] }),
  'R10X': R(10.0, { base: 10, cf: 10.0, contextual: true, qhReq: true, qhAvail: true,
            maxFeet: 210, baseMin: 60, baseMax: 115, streetWall: true,
            notes: ['Contextual', '210ft max height'] }),

  // === COMMERCIAL ===
  // C1 (local retail overlays - mapped onto residential)
  'C1-1': C(1.0, { resFar: 0, cf: 1.0, notes: ['Local retail overlay', 'Residential FAR depends on underlying R district'] }),
  'C1-2': C(1.0, { resFar: 0, cf: 1.0, notes: ['Local retail overlay'] }),
  'C1-3': C(1.0, { resFar: 0, cf: 1.0, notes: ['Local retail overlay'] }),
  'C1-4': C(1.0, { resFar: 0, cf: 1.0, notes: ['Local retail overlay'] }),
  'C1-5': C(1.0, { resFar: 0, cf: 1.0, notes: ['Local retail overlay'] }),
  // C2
  'C2-1': C(1.0, { resFar: 0, cf: 1.0, notes: ['Local service overlay'] }),
  'C2-2': C(1.0, { resFar: 0, cf: 1.0, notes: ['Local service overlay'] }),
  'C2-3': C(1.0, { resFar: 0, cf: 1.0, notes: ['Local service overlay'] }),
  'C2-4': C(1.0, { resFar: 0, cf: 1.0, notes: ['Local service overlay'] }),
  'C2-5': C(1.0, { resFar: 0, cf: 1.0, notes: ['Local service overlay'] }),
  // C3
  'C3':   C(0.5, { cf: 1.0, notes: ['Waterfront recreation/commercial'] }),
  'C3A':  C(0.5, { cf: 1.0, notes: ['Waterfront recreation/commercial'] }),
  // C4
  'C4-1': C(1.0, { resFar: 0.9, cf: 2.0, notes: ['General commercial, low density'] }),
  'C4-2': C(2.0, { resFar: 2.43, cf: 4.8, hf: true, sky: true, notes: ['General commercial'] }),
  'C4-2A':C(2.0, { resFar: 3.0, cf: 3.0, contextual: true, maxFeet: 70, notes: ['Contextual general commercial'] }),
  'C4-3': C(2.0, { resFar: 2.43, cf: 4.8, hf: true, sky: true, notes: ['General commercial'] }),
  'C4-3A':C(2.0, { resFar: 3.0, cf: 3.0, contextual: true, maxFeet: 70, notes: ['Contextual general commercial'] }),
  'C4-4': C(3.4, { resFar: 3.44, cf: 6.5, hf: true, sky: true, notes: ['General commercial, medium density'] }),
  'C4-4A':C(3.4, { resFar: 4.0, cf: 4.0, contextual: true, maxFeet: 80, notes: ['Contextual'] }),
  'C4-4D':C(3.4, { resFar: 4.2, cf: 4.2, contextual: true, maxFeet: 100, notes: ['Contextual'] }),
  'C4-5': C(4.0, { resFar: 3.44, cf: 6.5, hf: true, sky: true, notes: ['General commercial'] }),
  'C4-5A':C(4.0, { resFar: 4.0, cf: 4.0, contextual: true, maxFeet: 80, notes: ['Contextual'] }),
  'C4-5D':C(4.0, { resFar: 4.6, cf: 4.6, contextual: true, maxFeet: 100, notes: ['Contextual'] }),
  'C4-5X':C(4.0, { resFar: 5.0, cf: 5.0, contextual: true, maxFeet: 125, notes: ['Contextual'] }),
  'C4-6': C(6.0, { resFar: 6.02, cf: 6.5, hf: true, tower: true, towerFP: 7700, towerCov: 0.4,
            notes: ['General commercial, high density'] }),
  'C4-6A':C(6.0, { resFar: 6.02, cf: 6.5, contextual: true, maxFeet: 120, notes: ['Contextual'] }),
  'C4-7': C(6.0, { resFar: 6.02, cf: 6.5, notes: ['General commercial'] }),
  // C5 (central commercial)
  'C5-1': C(4.0, { resFar: 0, cf: 10.0, notes: ['Central commercial', 'No residential'] }),
  'C5-2': C(6.0, { resFar: 0, cf: 10.0, notes: ['Central commercial', 'No residential'] }),
  'C5-2.5':C(6.0,{ resFar: 0, cf: 10.0, notes: ['Central commercial'] }),
  'C5-3': C(10.0, { resFar: 0, cf: 10.0, notes: ['Central commercial', 'No residential'] }),
  'C5-4': C(10.0, { resFar: 10.0, cf: 10.0, tower: true, towerFP: 7700,
            notes: ['Central commercial', 'Residential permitted'] }),
  'C5-5': C(15.0, { resFar: 10.0, cf: 15.0, tower: true, towerFP: 7700,
            notes: ['Central commercial, highest density', 'Residential permitted'] }),
  // C6 (general central commercial)
  'C6-1': C(6.0, { resFar: 3.44, cf: 6.5, hf: true, sky: true,
            notes: ['General central commercial'] }),
  'C6-1A':C(6.0, { resFar: 4.0, cf: 4.0, contextual: true, maxFeet: 80, notes: ['Contextual'] }),
  'C6-2': C(6.0, { resFar: 6.02, cf: 6.5, hf: true, tower: true, towerFP: 7700,
            notes: ['General central commercial'] }),
  'C6-2A':C(6.0, { resFar: 6.02, cf: 6.5, contextual: true, maxFeet: 120, notes: ['Contextual'] }),
  'C6-3': C(6.0, { resFar: 6.02, cf: 6.5, hf: true, tower: true, towerFP: 7700,
            notes: ['General central commercial'] }),
  'C6-3A':C(6.0, { resFar: 6.02, cf: 6.5, contextual: true, maxFeet: 120, notes: ['Contextual'] }),
  'C6-3D':C(6.0, { resFar: 9.0, cf: 9.0, contextual: true, maxFeet: 175, notes: ['Contextual'] }),
  'C6-3X':C(6.0, { resFar: 9.0, cf: 9.0, contextual: true, maxFeet: 175, notes: ['Contextual'] }),
  'C6-4': C(10.0, { resFar: 7.52, cf: 10.0, hf: true, tower: true, towerFP: 7700,
            notes: ['General central commercial, high density'] }),
  'C6-4.5':C(10.0,{ resFar: 10.0, cf: 10.0, tower: true, towerFP: 7700,
            notes: ['High density'] }),
  'C6-5': C(10.0, { resFar: 10.0, cf: 10.0, tower: true, towerFP: 7700,
            notes: ['Central commercial'] }),
  'C6-5.5':C(10.0,{ resFar: 10.0, cf: 10.0, tower: true, towerFP: 7700, notes: ['Central commercial'] }),
  'C6-6': C(12.0, { resFar: 10.0, cf: 12.0, tower: true, towerFP: 7700,
            notes: ['Central commercial, very high density'] }),
  'C6-6.5':C(12.0,{ resFar: 12.0, cf: 12.0, tower: true, towerFP: 7700, notes: ['Very high density'] }),
  'C6-7': C(15.0, { resFar: 10.0, cf: 15.0, tower: true, towerFP: 7700,
            notes: ['Central commercial, highest density'] }),
  'C6-8': C(10.0, { resFar: 7.52, cf: 10.0, notes: ['No residential above certain height without special permit'] }),
  'C6-9': C(15.0, { resFar: 12.0, cf: 15.0, tower: true, towerFP: 7700,
            notes: ['Highest commercial density'] }),
  // C7
  'C7':   C(2.0, { cf: 2.0, notes: ['Commercial amusement', 'No residential'] }),
  // C8
  'C8-1': C(1.0, { cf: 2.4, notes: ['General service', 'Auto-related uses', 'No residential'] }),
  'C8-2': C(2.0, { cf: 4.8, notes: ['General service', 'No residential'] }),
  'C8-3': C(2.0, { cf: 4.8, notes: ['General service', 'No residential'] }),
  'C8-4': C(5.0, { cf: 6.5, notes: ['General service', 'No residential'] }),

  // === MANUFACTURING ===
  'M1-1': M(1.0, { cf: 2.4, sky: true, skyAngle: 2.7, skyInit: 30, notes: ['Light manufacturing/commercial', 'Residential NOT permitted'] }),
  'M1-2': M(2.0, { cf: 4.8, sky: true, skyAngle: 2.7, skyInit: 60, notes: ['Light manufacturing/commercial'] }),
  'M1-3': M(2.0, { cf: 4.8, sky: true, notes: ['Light manufacturing/commercial'] }),
  'M1-4': M(2.0, { cf: 6.5, sky: true, notes: ['Light manufacturing/commercial'] }),
  'M1-5': M(5.0, { cf: 6.5, notes: ['Light manufacturing/commercial', 'Loft-law conversions common'] }),
  'M1-6': M(10.0,{ cf: 10.0, notes: ['Light manufacturing/commercial', 'High-density'] }),
  'M2-1': M(2.0, { cf: 4.8, notes: ['Medium manufacturing'] }),
  'M2-2': M(2.0, { cf: 4.8, notes: ['Medium manufacturing'] }),
  'M2-3': M(2.0, { cf: 4.8, notes: ['Medium manufacturing'] }),
  'M2-4': M(5.0, { cf: 6.5, notes: ['Medium manufacturing'] }),
  'M3-1': M(2.0, { cf: 4.8, notes: ['Heavy manufacturing', 'Most restrictive performance standards'] }),
  'M3-2': M(2.0, { cf: 4.8, notes: ['Heavy manufacturing'] }),
};

// Make globally available
if (typeof window !== 'undefined') window.getZoningRules = getZoningRules;
