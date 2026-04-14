(function (global) {
  function toNumber() {
    for (var i = 0; i < arguments.length; i += 1) {
      var value = arguments[i];
      if (value === null || value === undefined || value === '') continue;
      var num = Number(value);
      if (!Number.isNaN(num) && Number.isFinite(num)) return num;
    }
    return null;
  }

  function canonicalScenarioKey(key) {
    if (key === 'low') return 'lo';
    if (key === 'base') return 'mid';
    if (key === 'high') return 'hi';
    return ['lo', 'mid', 'hi'].indexOf(key) !== -1 ? key : 'mid';
  }

  function inferExistingFloors(site, floorToFloor) {
    var explicit = toNumber(site.existingFloors, site.existing_floors, site.existF);
    if (explicit) return Math.max(1, Math.round(explicit));
    var height = toNumber(site.existingHeightM, site.existing_height_m, site.heightM, site.height_m, site.existingHeight);
    if (height) return Math.max(1, Math.round(height / (floorToFloor || 3.8)));
    var maxFloors = toNumber(site.maxFloors, site.max_floors, site.max_floors_capped);
    if (maxFloors) return Math.max(1, Math.round(maxFloors * 0.45));
    return 5;
  }

  function buildPlanningPolicyProfile(site) {
    var borough = String(site.borough || '').toLowerCase();
    var text = String(site.name || '') + ' ' + String(site.address || '') + ' ' + String(site.desc || '') + ' ' + String(site.notes || '');
    var lower = text.toLowerCase();
    var flags = site.flags || {};
    var inOA = !!(site.inOA || flags.inOA || flags.oa);
    var inCAZ = !!(site.inCAZ || flags.inCAZ || flags.caz);
    var ptal = toNumber(site.ptal, flags.ptal, 0) || 0;
    var profile = {
      zone: null,
      policyNote: null,
      planScoreBoost: 0,
      headroomBoost: 0,
      precedentWeight: 1,
      majorUplift: false,
      heightIntent: false,
      clusterPressure: false
    };

    if (borough.indexOf('hackney') !== -1 && (
      (inOA && inCAZ && ptal >= 5) ||
      /(old street|great eastern street|commercial street|worship street|shoreditch high street|sun street|finsbury square|curtain road|hoxton square|norton folgate|bishopsgate)/.test(lower)
    )) {
      profile.zone = 'Hackney City Fringe';
      profile.policyNote = 'Hackney City Fringe growth corridor, tall-building and commercial intensification signals are materially stronger here than generic borough fabric.';
      profile.planScoreBoost = 1.4;
      profile.headroomBoost = 2;
      profile.precedentWeight = 1.6;
      profile.majorUplift = true;
      profile.heightIntent = true;
      profile.clusterPressure = true;
      return profile;
    }

    if (borough.indexOf('southwark') !== -1 && (
      /(bankside|london bridge|borough high street|blackfriars road|blackfriars|southwark station|newington causeway|great suffolk|hatfields|borough station)/.test(lower)
    )) {
      profile.zone = 'Southwark Bankside / London Bridge';
      profile.policyNote = 'Bankside and London Bridge are active intensification corridors, precedent and plan support should carry real weight here.';
      profile.planScoreBoost = 1.1;
      profile.headroomBoost = 1;
      profile.precedentWeight = 1.35;
      profile.majorUplift = true;
      profile.clusterPressure = true;
      return profile;
    }

    if (borough.indexOf('southwark') !== -1 && /(old kent road|mandela way|bermondsey|new cross gate)/.test(lower)) {
      profile.zone = 'Southwark Old Kent Road corridor';
      profile.policyNote = 'Old Kent Road growth strategy supports substantial uplift where assembly and delivery logic hold.';
      profile.planScoreBoost = 1.5;
      profile.headroomBoost = 2;
      profile.precedentWeight = 1.45;
      profile.majorUplift = true;
      profile.heightIntent = true;
      profile.clusterPressure = true;
      return profile;
    }

    if ((borough.indexOf('city') !== -1 || inCAZ) && /(leadenhall|bishopsgate|fenchurch|liverpool street|moorgate|minories|aldgate|cannon street|fleet street|holborn viaduct)/.test(lower)) {
      profile.zone = 'City commercial cluster';
      profile.policyNote = 'Established City cluster, tall commercial precedent is part of the planning baseline, not an exception.';
      profile.planScoreBoost = 1.2;
      profile.headroomBoost = 2;
      profile.precedentWeight = 1.6;
      profile.majorUplift = true;
      profile.heightIntent = true;
      profile.clusterPressure = true;
      return profile;
    }

    return profile;
  }

  function buildFabricProfile(site) {
    var era = String(site.context_era || site.contextEra || '').toUpperCase();
    var heritageTier = String(site.heritTier || site.nhle_tier || '').toLowerCase();
    var flags = site.flags || {};
    var inCons = !!(site.inCons || flags.inConservation);
    var text = String(site.name || '') + ' ' + String(site.address || '') + ' ' + String(site.desc || '') + ' ' + String(site.notes || '');
    var lower = text.toLowerCase();
    var laterFabric = era === 'C' || era === 'D' || (!era && !inCons && !/victorian|georgian|edwardian|historic|warehouse district/.test(lower));
    var poorModernSignals = /(garage|depot|trading estate|industrial|retail park|surface car park|car park|vacant|warehouse|works|1960s|1970s|1980s|post-war|postwar|low-rise office|shed)/.test(lower);
    var lowHeritage = !inCons && heritageTier !== 'blocking' && heritageTier !== 'navigable';
    return {
      laterFabric: !!laterFabric,
      poorModernSignals: !!poorModernSignals,
      redevelopmentFriendly: !!(laterFabric && lowHeritage && poorModernSignals),
      lowHeritage: !!lowHeritage
    };
  }

  function deriveDevelopmentLogic(site) {
    var useType = String(site.useType || site.use_type || site.use || '').toLowerCase();
    var existingHeight = toNumber(site.existingHeightM, site.existing_height_m, 0) || 0;
    var existingFloors = inferExistingFloors(site, 3.8);
    var planning = site.planningSummary || site.planning || {};
    var policy = site.planningPolicy || buildPlanningPolicyProfile(site);
    var fabric = site.fabricProfile || buildFabricProfile(site);
    var typology = site.typology || classifySiteTypology(site);
    var cityCore = site.borough === 'City of London' || !!site.inCAZ || policy.zone === 'City commercial cluster' || typology === 'city-parcel' || typology === 'city-oversite';
    var heightIntent = !!(planning.heightIntent || policy.heightIntent || typology === 'city-parcel' || typology === 'city-oversite' || (planning.liveTallCount || 0) > 0 || (planning.tallCount || 0) >= 2);
    var clusterPressure = !!(planning.clusterPressure || policy.clusterPressure || typology === 'city-parcel' || typology === 'hackney-fringe' || typology === 'southwark-replacement' || (planning.majorCount || 0) >= 2 || (planning.applicationCount || 0) >= 4);
    var tallCommercial = (cityCore && (existingHeight >= 24 || existingFloors >= 6 || typology === 'city-parcel' || typology === 'city-oversite') && /(office|commercial|mixed)/.test(useType || 'office')) || heightIntent;
    var highValue = cityCore || tallCommercial;
    var heritage = site.heritTier === 'blocking' ? 'high' : site.heritTier === 'high' ? 'medium' : 'low';
    var designedGrowthArea = !!(policy.majorUplift || policy.heightIntent || policy.clusterPressure);
    var aggressiveRedevelopment = !!(fabric.redevelopmentFriendly && designedGrowthArea);
    var mode = tallCommercial ? 'Strategic height'
      : aggressiveRedevelopment ? 'Strategic intensification'
      : ((highValue && heritage === 'low') || clusterPressure) ? 'Mid-rise intensification'
      : highValue ? 'Setback intensification'
      : 'Efficient infill';
    var type = tallCommercial ? 'Tower-on-podium'
      : aggressiveRedevelopment ? 'Full-site redevelopment'
      : mode === 'Mid-rise intensification' ? 'Setback mid-rise'
      : 'Perimeter uplift';
    var posture = (tallCommercial || aggressiveRedevelopment) ? 'aggressive' : heritage === 'high' ? 'conservative' : 'balanced';
    return {
      mode: mode,
      type: type,
      posture: posture,
      heritage: heritage,
      heightIntent: heightIntent,
      clusterPressure: clusterPressure,
      highValue: highValue,
      aggressiveRedevelopment: aggressiveRedevelopment,
      designedGrowthArea: designedGrowthArea
    };
  }

  function buildScenario(label, floors, metrics, upliftWeight) {
    floors = Math.max(metrics.existingFloors + 1, Math.min(metrics.maxFloors, Math.round(floors)));
    var podF = Math.max(1, Math.round(floors * metrics.podiumPct));
    var twrF = Math.max(0, floors - podF);
    var podFP = metrics.plotM2 * metrics.coverage;
    var twrFP = podFP * metrics.twrFpRatio;
    var giaTotal = (podFP * podF) + (twrFP * twrF);
    var niaTotal = giaTotal * metrics.eff;
    var addedF = Math.max(0, floors - metrics.existingFloors);
    var addedNIA = Math.max(0, niaTotal - metrics.existingNia);
    var totalHeight = floors * metrics.floorH;
    var scoreLift = (metrics.logic.mode === 'Strategic height' ? 14 : metrics.logic.mode === 'Strategic intensification' ? 12 : metrics.logic.mode === 'Mid-rise intensification' ? 10 : 7) * upliftWeight;
    var score = Math.max(35, Math.min(98, Math.round((metrics.baseScore * 0.82) + scoreLift + (addedF * 1.4))));
    return {
      key: canonicalScenarioKey(label.toLowerCase()),
      name: label,
      label: label,
      floors: floors,
      existF: metrics.existingFloors,
      existingFloors: metrics.existingFloors,
      addedF: addedF,
      floorH: metrics.floorH,
      heightM: totalHeight,
      giaTotal: Math.round(giaTotal),
      gea: Math.round(giaTotal),
      niaTotal: Math.round(niaTotal),
      nia: Math.round(niaTotal),
      addedNIA: Math.round(addedNIA),
      towerSetback: metrics.towerSetback,
      coverage: metrics.coverage,
      twrFpRatio: metrics.twrFpRatio,
      eff: metrics.eff,
      score: score,
      mode: metrics.logic.mode,
      type: metrics.logic.type,
      upliftWeight: upliftWeight,
      podF: podF,
      twrF: twrF,
      twrPct: metrics.twrFpRatio
    };
  }

  function buildGeneratedScenarios(site) {
    var logic = deriveDevelopmentLogic(site);
    var existingFloors = inferExistingFloors(site, logic.mode === 'Strategic height' ? 4.05 : 3.8);
    var rawMax = toNumber(site.maxFloors, site.max_floors, 0) || 0;
    var resilientMax = rawMax;
    if (!resilientMax || resilientMax <= existingFloors) {
      resilientMax = existingFloors + (logic.mode === 'Strategic height' ? 8 : logic.mode === 'Mid-rise intensification' ? 5 : 3);
    }
    var maxFloors = Math.max(existingFloors + 2, resilientMax);
    var plotM2 = toNumber(site.plotM2, site.plot_m2, site.site_area, site.plot_area, 1000) || 1000;
    var existingNia = toNumber(site.existing_nia, site.existingNia, 0) || 0;
    var floorH = logic.mode === 'Strategic height' ? 4.05 : logic.mode === 'Mid-rise intensification' ? 3.8 : 3.7;
    var coverage = 0.72, podiumPct = 0.65, towerSetback = 0, twrFpRatio = 1, eff = 0.82;
    if (logic.type === 'Tower-on-podium') {
      coverage = 0.6; podiumPct = 0.4; towerSetback = 2.5; twrFpRatio = 0.54; eff = 0.8;
    } else if (logic.type === 'Full-site redevelopment') {
      coverage = 0.78; podiumPct = 0.62; towerSetback = 0; twrFpRatio = 0.9; eff = 0.84;
    } else if (logic.type === 'Setback mid-rise') {
      coverage = 0.68; podiumPct = 0.56; towerSetback = 1.2; twrFpRatio = 0.8; eff = 0.81;
    } else {
      coverage = logic.posture === 'conservative' ? 0.62 : 0.7;
      podiumPct = logic.heritage === 'high' ? 0.78 : 0.7;
      eff = logic.posture === 'aggressive' ? 0.83 : 0.8;
    }
    var metrics = {
      logic: logic,
      existingFloors: existingFloors,
      existingNia: existingNia,
      maxFloors: maxFloors,
      plotM2: plotM2,
      floorH: floorH,
      coverage: coverage,
      podiumPct: podiumPct,
      towerSetback: towerSetback,
      twrFpRatio: twrFpRatio,
      eff: eff,
      baseScore: toNumber(site.score, site.headroom_score, 55) || 55
    };
    var lowTarget = logic.mode === 'Strategic height' ? Math.max(existingFloors + 3, Math.round(maxFloors * 0.72)) :
      logic.mode === 'Strategic intensification' ? Math.max(existingFloors + 3, Math.round(maxFloors * 0.68)) :
      logic.mode === 'Mid-rise intensification' ? Math.max(existingFloors + 2, Math.round(maxFloors * 0.6)) :
      Math.max(existingFloors + 1, Math.round(maxFloors * 0.5));
    var midTarget = logic.mode === 'Strategic height' ? Math.max(lowTarget + 2, Math.round(maxFloors * 0.86)) :
      logic.mode === 'Strategic intensification' ? Math.max(lowTarget + 2, Math.round(maxFloors * 0.82)) :
      logic.mode === 'Mid-rise intensification' ? Math.max(lowTarget + 2, Math.round(maxFloors * 0.76)) :
      Math.max(lowTarget + 1, Math.round(maxFloors * 0.64));
    var highTarget = logic.mode === 'Strategic height' ? maxFloors :
      logic.mode === 'Strategic intensification' ? Math.max(midTarget + 2, Math.round(maxFloors * 0.94)) :
      logic.mode === 'Mid-rise intensification' ? Math.max(midTarget + 2, Math.round(maxFloors * 0.92)) :
      Math.max(midTarget + 1, Math.round(maxFloors * 0.78));
    lowTarget = Math.min(maxFloors - 2, lowTarget);
    midTarget = Math.min(maxFloors - 1, Math.max(lowTarget + 1, midTarget));
    highTarget = Math.min(maxFloors, Math.max(midTarget + 1, highTarget));
    if (highTarget <= midTarget) highTarget = Math.min(maxFloors, midTarget + 1);
    if (midTarget <= lowTarget) midTarget = Math.min(maxFloors - 1, lowTarget + 1);
    if (highTarget <= midTarget) highTarget = Math.min(maxFloors, midTarget + 1);
    return {
      lo: buildScenario('Low', lowTarget, metrics, 0.35),
      mid: buildScenario('Base', midTarget, metrics, 0.68),
      hi: buildScenario('High', highTarget, metrics, 1)
    };
  }

  function normaliseScenarioInput(raw, site, fallbackKey) {
    if (!raw) return null;
    var label = raw.label || raw.name || (fallbackKey === 'mid' ? 'Base' : fallbackKey === 'lo' ? 'Low' : 'High');
    var floors = toNumber(raw.floors, raw.totalFloors);
    if (!floors) return null;
    var existingFloors = inferExistingFloors(site, toNumber(raw.floorH, raw.floor_to_floor_m, 3.6) || 3.6);
    var gea = toNumber(raw.gea, raw.giaTotal, raw.geaTotal);
    var nia = toNumber(raw.nia, raw.niaTotal);
    var eff = toNumber(raw.eff, raw.efficiency);
    if (!eff && gea && nia) eff = nia / gea;
    eff = eff || 0.78;
    if (!gea && nia) gea = nia / eff;
    if (!nia && gea) nia = gea * eff;
    var scenario = {
      key: canonicalScenarioKey(raw.key || fallbackKey),
      name: label,
      label: label,
      floors: Math.round(floors),
      existF: existingFloors,
      existingFloors: existingFloors,
      addedF: Math.max(0, Math.round(floors) - existingFloors),
      floorH: toNumber(raw.floorH, raw.floor_to_floor_m, site.floorToFloorM, 3.6) || 3.6,
      heightM: toNumber(raw.heightM, raw.height_m, Math.round(floors) * (toNumber(raw.floorH, raw.floor_to_floor_m, site.floorToFloorM, 3.6) || 3.6)),
      gea: Math.round(gea || 0),
      giaTotal: Math.round(gea || 0),
      nia: Math.round(nia || 0),
      niaTotal: Math.round(nia || 0),
      addedNIA: Math.max(0, Math.round((nia || 0) - (toNumber(site.existing_nia, site.existingNia, 0) || 0))),
      eff: eff,
      podF: Math.round(toNumber(raw.podF, 0) || Math.max(1, Math.round(floors * 0.55))),
      twrF: Math.round(toNumber(raw.twrF, Math.max(0, Math.round(floors) - Math.round(toNumber(raw.podF, 0) || Math.max(1, Math.round(floors * 0.55)))) ) || 0),
      twrPct: toNumber(raw.twrPct, raw.twrFpRatio, 0.55) || 0.55,
      twrFpRatio: toNumber(raw.twrPct, raw.twrFpRatio, 0.55) || 0.55,
      coverage: toNumber(raw.coverage, 0.42) || 0.42,
      towerSetback: toNumber(raw.towerSetback, 0) || 0,
      score: Math.round(toNumber(raw.score, site.score, site.headroom_score, 55) || 55),
      narrative: raw.narrative || '',
      type: raw.type || null,
      mode: raw.mode || null,
      costFactor: toNumber(raw.costFactor, 1) || 1
    };
    return scenario;
  }

  function buildScenarioState(site) {
    var source = site.scenarios || site.scenario_state || null;
    if (Array.isArray(source)) {
      source = source.reduce(function (acc, item, idx) {
        var key = item && (item.key || item.label || item.name || ['lo', 'mid', 'hi'][idx] || 'mid');
        acc[canonicalScenarioKey(String(key).toLowerCase())] = item;
        return acc;
      }, {});
    }
    if (source && (source.lo || source.low || source.mid || source.base || source.hi || source.high)) {
      return {
        lo: normaliseScenarioInput(source.lo || source.low || source.mid || source.base, site, 'lo'),
        mid: normaliseScenarioInput(source.mid || source.base || source.lo || source.low, site, 'mid'),
        hi: normaliseScenarioInput(source.hi || source.high || source.mid || source.base, site, 'hi')
      };
    }
    return buildGeneratedScenarios(site);
  }

  function defaultFinancialAssumptions(site) {
    var erv = toNumber(site.erv, site.erv_psm, site.borough === 'City of London' ? 850 : site.inCAZ ? 750 : site.inOA ? 700 : 700) || 700;
    var niy = toNumber(site.niy, site.niy_pct, site.borough === 'City of London' ? 4.25 : site.inCAZ ? 4.75 : 5.5) || 4.75;
    return {
      erv: erv,
      niy: niy,
      cost: toNumber(site.buildCostPsm, site.cost_psm, 4200) || 4200,
      s106: toNumber(site.s106_k, site.s106, 500) || 500,
      poc: toNumber(site.targetProfitPct, site.poc, 20) || 20
    };
  }

  function defaultMarket(site) {
    return {
      acqCost: toNumber(site.acqCost, 0) || 0,
      demo: toNumber(site.demoCost, 850000) || 850000,
      finRate: toNumber(site.finRate, 0.065) || 0.065,
      letFee: toNumber(site.letFee, 0.15) || 0.15,
      cilRate: toNumber(site.cilRate, 125) || 125,
      progYrs: {
        lo: toNumber(site.progLo, 2.0) || 2.0,
        mid: toNumber(site.progMid, site.progBase, 2.5) || 2.5,
        hi: toNumber(site.progHi, 3.0) || 3.0
      }
    };
  }

  function applyFinancials(scenarios, assumptions, market) {
    ['lo', 'mid', 'hi'].forEach(function (key) {
      var sc = scenarios[key];
      if (!sc) return;
      sc.costGsm = Math.round((assumptions.cost || 4200) * (toNumber(sc.costFactor, 1) || 1));
      sc.constCost = Math.round((sc.gea || sc.giaTotal || 0) * sc.costGsm);
      sc.fees = Math.round(sc.constCost * 0.13);
      sc.contg = Math.round(sc.constCost * 0.075);
      sc.cil = Math.round((sc.gea || sc.giaTotal || 0) * (market.cilRate || 125));
      sc.gdv = Math.round((sc.nia || sc.niaTotal || 0) * (assumptions.erv || 700) / ((assumptions.niy || 4.75) / 100));
      sc.letting = Math.round(sc.gdv * (market.letFee || 0.15));
      sc.finance = Math.round((sc.constCost + sc.fees) * 0.5 * (market.finRate || 0.065) * ((market.progYrs || {})[key] || 2.5));
      sc.tdc = sc.constCost + sc.fees + sc.contg + sc.cil + sc.letting + ((assumptions.s106 || 500) * 1000) + (market.demo || 0) + sc.finance + (market.acqCost || 0);
      sc.profit = sc.gdv - sc.tdc;
      sc.poc = ((sc.profit / Math.max(sc.tdc, 1)) * 100).toFixed(1);
      sc.rlv = Math.round(sc.gdv - sc.tdc * (1 + (assumptions.poc || 20) / 100));
    });
    return scenarios;
  }

  function classifySiteTypology(site) {
    var borough = String(site.borough || site._borough || '').toLowerCase();
    var text = (String(site.name || '') + ' ' + String(site.address || '') + ' ' + String(site.desc || '') + ' ' + String(site.notes || '')).toLowerCase();
    var policy = site.planningPolicy || buildPlanningPolicyProfile(site);

    if (borough.indexOf('city') !== -1 || policy.zone === 'City commercial cluster') {
      if (/(station|oversite|rail|sidings|air rights)/.test(text)) return 'city-oversite';
      return 'city-parcel';
    }
    if (borough.indexOf('hackney') !== -1 || policy.zone === 'Hackney City Fringe') {
      if (/(garage|depot|industrial|warehouse|works|trading estate|bus garage)/.test(text)) return 'hackney-depot';
      return 'hackney-fringe';
    }
    if (borough.indexOf('southwark') !== -1 || policy.zone === 'Southwark Old Kent Road corridor') {
      if (/(garage|depot|industrial|warehouse|works|trading estate|business park|retail park|shopping centre|tesco|lidl|morrisons|aldi|toys|decathlon|iceland)/.test(text)) return 'southwark-replacement';
      if (/(estate|phase|campus|hospital|health|court|station|sidings|shopping centre|college|university)/.test(text)) return 'southwark-restructure';
      return 'southwark-parcel';
    }
    if (/(estate|phase|campus|hospital|health|court|college|university|civic)/.test(text)) return 'estate-restructure';
    if (/(station|oversite|rail|sidings|air rights)/.test(text)) return 'oversite';
    return 'general-parcel';
  }

  function resolveSiteAreaM2(site) {
    var hectares = toNumber(site.hectares, 0) || 0;
    return Math.max(
      toNumber(site.plotM2, site.plot_m2, site.site_area, site.plot_area, site.plot, 0) || 0,
      toNumber(site.inspire_area_m2, 0) || 0,
      hectares ? hectares * 10000 : 0
    );
  }

  function buildCanonicalMetrics(site) {
    var areaM2 = resolveSiteAreaM2(site);
    var existingFloors = inferExistingFloors(site, toNumber(site.floorToFloorM, 3.8) || 3.8);
    var maxFloors = toNumber(site.maxFloors, site.max_floors, site.max_floors_capped, site.mf, existingFloors) || existingFloors;
    var existingGia = areaM2 && existingFloors ? Math.round(areaM2 * existingFloors) : 0;
    var proposedGia = areaM2 && maxFloors ? Math.round(areaM2 * maxFloors) : 0;
    var upliftPct = existingGia > 0 ? Math.round(((proposedGia - existingGia) / existingGia) * 100) : null;
    return {
      siteAreaM2: Math.round(areaM2 || 0),
      existingFloors: existingFloors,
      maxFloors: Math.round(maxFloors || 0),
      roughExistingGiaM2: existingGia,
      roughProposedGiaM2: proposedGia,
      roughGiaUpliftPct: upliftPct,
      existingHeightM: toNumber(site.existingHeightM, site.existing_height_m, site.heightM, site.height_m) || 0,
      floorToFloorM: toNumber(site.floorToFloorM, 3.8) || 3.8
    };
  }

  function buildCanonicalSite(site) {
    var model = Object.assign({}, site);
    model.planningPolicy = site.planningPolicy || buildPlanningPolicyProfile(model);
    model.fabricProfile = site.fabricProfile || buildFabricProfile(model);
    model.typology = site.typology || classifySiteTypology(model);
    model.canonicalMetrics = buildCanonicalMetrics(model);
    model.plotM2 = model.canonicalMetrics.siteAreaM2 || 0;
    model.existingHeightM = model.canonicalMetrics.existingHeightM;
    model.existingFloors = model.canonicalMetrics.existingFloors;
    model.maxFloors = model.canonicalMetrics.maxFloors;
    model.floorToFloorM = model.canonicalMetrics.floorToFloorM;
    model.roughExistingGiaM2 = model.canonicalMetrics.roughExistingGiaM2;
    model.roughProposedGiaM2 = model.canonicalMetrics.roughProposedGiaM2;
    model.roughGiaUpliftPct = model.canonicalMetrics.roughGiaUpliftPct;
    model.developmentLogic = deriveDevelopmentLogic(model);
    model.scenarioState = buildScenarioState(model);
    model.financialAssumptions = defaultFinancialAssumptions(model);
    model.marketModel = defaultMarket(model);
    applyFinancials(model.scenarioState, model.financialAssumptions, model.marketModel);
    model.activeScenarioKey = canonicalScenarioKey(model.activeScenarioKey || 'mid');
    model.activeScenario = model.scenarioState[model.activeScenarioKey] || model.scenarioState.mid || model.scenarioState.lo || null;
    return model;
  }

  global.HeadroomSiteModel = {
    canonicalScenarioKey: canonicalScenarioKey,
    buildPlanningPolicyProfile: buildPlanningPolicyProfile,
    buildFabricProfile: buildFabricProfile,
    classifySiteTypology: classifySiteTypology,
    buildCanonicalMetrics: buildCanonicalMetrics,
    deriveDevelopmentLogic: deriveDevelopmentLogic,
    buildScenarioState: buildScenarioState,
    defaultFinancialAssumptions: defaultFinancialAssumptions,
    defaultMarket: defaultMarket,
    applyFinancials: applyFinancials,
    buildCanonicalSite: buildCanonicalSite
  };
})(window);
