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

  function assessSiteValidity(site) {
    var text = buildSiteText(site);
    var name = String(site.name || '').toLowerCase();
    var typology = site.typology || classifySiteTypology(site);
    var numbered = hasStreetNumber(site);
    var areaM2 = resolveSiteAreaM2(site);
    var flags = [];
    var code = null;
    var reason = null;
    var genericParcel = /^(land\b|site\b|former\b)/.test(name) || /(land bounded by|land between|site bordering|adjacent|cluster|corridor|district|fringe|triangle)/.test(name);
    var patternedGeography = /(corridor|district|fringe|triangle|quarter|cluster)/.test(name);
    var broadStreetName = !numbered && areaM2 >= 15000 && /^[a-z0-9 '\-]+(road|street|lane|way|avenue|high street|broadway)$/.test(name);
    var railStationLand = /(\bstation\b|\bsidings\b|interchange)/.test(text) && !/(bus station|police station|fire station|station road)/.test(text);

    if (
      site.deliveryFlag === 'station-oversite' ||
      typology === 'city-oversite' ||
      typology === 'oversite' ||
      /(oversite|air rights|station supersite|station oversite)/.test(text) ||
      railStationLand
    ) {
      code = 'station_oversite';
      reason = 'Station oversite or transport-led parcel';
      flags.push(code);
    } else if (/(churchyard|public realm|open space|plaza|piazza|square|garden|gardens|memorial|bunhill fields|playing fields|sports field|sports fields|cemetery|burial ground)/.test(text) && !numbered) {
      code = 'public_realm';
      reason = 'Public realm, open space, or non-site land';
      flags.push(code);
    } else if (/(substation|pumping station|utility|safeguarded wharf|safeguarded|tideway|electricity substation|strategic infrastructure)/.test(text)) {
      code = 'strategic_infrastructure';
      reason = 'Strategic infrastructure or safeguarded land';
      flags.push(code);
    } else if (
      (typology === 'southwark-restructure' || typology === 'estate-restructure' || /(estate|campus|hospital|health centre|health center|college|university|school|shopping centre|shopping center|stadium|sports ground|athletics track|leisure centre|leisure center)/.test(text)) &&
      !numbered
    ) {
      code = 'complex_restructure';
      reason = 'Campus, estate, or institutional restructure rather than a clean standalone parcel';
      flags.push(code);
    } else if (genericParcel && (!numbered || areaM2 >= 15000 || (patternedGeography && areaM2 >= 3000))) {
      code = 'generic_masterplan_geography';
      reason = 'Generic boundary parcel or masterplan geography, not a specific target parcel';
      flags.push(code);
    } else if (broadStreetName) {
      code = 'generic_masterplan_geography';
      reason = 'Broad named geography rather than a specific acquisition parcel';
      flags.push(code);
    }

    return {
      valid: !code,
      code: code,
      reason: reason,
      flags: flags,
      genericParcel: genericParcel,
      numbered: numbered,
      areaM2: areaM2
    };
  }

  function assessProgressionStatus(site) {
    var planning = site.planningSummary || site.planning || {};
    var text = buildSiteText(site);
    var note = String(planning.note || '').toLowerCase();
    var recentDesc = String(planning.recentDesc || '').toLowerCase();
    var majorCount = toNumber(planning.majorCount, 0) || 0;
    var liveCount = toNumber(planning.liveCount, 0) || 0;
    var totalCount = toNumber(planning.total, planning.count, null);
    var hasRedevelopment = !!planning.hasRedevelopment;
    var onMarket = !!(site.onMarket || site.on_market);
    var cleanSlate = /no live consent|clean slate/.test(note);
    var planningPending = /(planning data pending|requires verification before planning query|coordinates require verification|pending)/.test(note);
    var hasStructuredPlanningSignal = (
      planning.hasRedevelopment !== undefined ||
      planning.majorCount !== undefined ||
      planning.liveCount !== undefined ||
      planning.total !== undefined ||
      planning.count !== undefined ||
      planning.recentRef !== undefined ||
      planning.recentDate !== undefined ||
      planning.recentDesc !== undefined
    );
    var hasReliablePlanningCheck = !!(hasStructuredPlanningSignal && !planningPending);
    var override = resolveShortlistStatusOverride(site);
    var progressed = (
      site.deliveryFlag === 'station-oversite' ||
      (!cleanSlate && (majorCount > 0 || liveCount > 0 || hasRedevelopment)) ||
      /(under construction|construction started|completed|built out|delivered|implemented|conditions discharge|consented scheme|full consent|live consent|permissioned|trading|leasing|sales launch|hotel operating)/.test(text + ' ' + recentDesc)
    );

    if (override) {
      return {
        key: override.bucket === 'gone' ? 'gone' : 'progressed',
        reason: override.reason,
        evidence: override.evidence || null,
        overridden: true
      };
    }
    if (progressed) {
      return {
        key: /(completed|built out|delivered|trading|leasing|sales launch|hotel operating)/.test(text + ' ' + recentDesc) ? 'gone' : 'progressed',
        reason: 'Already progressed or in active redevelopment pipeline',
        evidence: null
      };
    }
    if (onMarket || cleanSlate) {
      return {
        key: 'verified-current',
        reason: onMarket ? 'Explicit live-market status' : 'Planning note says clean slate',
        evidence: null
      };
    }
    if (hasReliablePlanningCheck && totalCount !== null && majorCount === 0 && liveCount === 0 && !hasRedevelopment && planning.recentRef) {
      return {
        key: 'verified-current',
        reason: 'Planning status checked with no active redevelopment signal',
        evidence: planning.recentRef
      };
    }
    return {
      key: 'unclear',
      reason: planningPending ? 'Planning verification still pending' : 'Current progression status not yet verified from evidence',
      evidence: null
    };
  }

  function assessArchitecturalValue(site) {
    var text = buildSiteText(site);
    var fabric = site.fabricProfile || buildFabricProfile(site);
    var lowSignals = 0;
    var highSignals = 0;
    var reasons = [];

    if (fabric.redevelopmentFriendly) {
      lowSignals += 4;
      reasons.push('replaceable later fabric');
    }
    if (fabric.poorModernSignals) {
      lowSignals += 3;
      if (reasons.indexOf('low-grade modern stock') === -1) reasons.push('low-grade modern stock');
    }
    if (/(garage|depot|trading estate|industrial|retail park|surface car park|car park|vacant|warehouse|works|low-rise office|shed)/.test(text)) {
      lowSignals += 2;
      if (reasons.indexOf('weak existing building type') === -1) reasons.push('weak existing building type');
    }
    if (/(victorian|georgian|edwardian|art deco|historic|warehouse district|church|cathedral|guildhall|memorial)/.test(text)) {
      highSignals += 3;
    }
    if (/(grade i|grade ii|grade ii\*)/.test(text)) {
      highSignals += 2;
    }

    if (lowSignals >= 5 && highSignals <= 2) {
      return { band: 'low', score: 9, reason: reasons[0] || 'Low architectural value', reasons: reasons };
    }
    if (highSignals >= 4 && lowSignals <= 2) {
      return { band: 'high', score: 2, reason: 'Higher-contribution or historic building fabric', reasons: ['higher-contribution fabric'] };
    }
    return {
      band: 'medium',
      score: 5,
      reason: reasons[0] || 'Some existing building value remains',
      reasons: reasons.length ? reasons : ['existing building requires judgment, not automatic replacement']
    };
  }

  function assessCoreViability(site) {
    var metrics = site.canonicalMetrics || buildCanonicalMetrics(site);
    var areaM2 = metrics.siteAreaM2 || resolveSiteAreaM2(site);
    var addF = Math.max(0, (metrics.maxFloors || 0) - (metrics.existingFloors || 0));
    var strong = areaM2 >= 1200 || (areaM2 >= 900 && addF >= 4);
    var adequate = areaM2 >= 600 || (areaM2 >= 450 && addF >= 3);
    var tallCapable = areaM2 >= 900 && (metrics.maxFloors || 0) >= 9;

    if (areaM2 < 350) {
      return {
        band: 'poor',
        score: 2,
        tallCapable: false,
        reason: 'Site is too tight to absorb a proper core efficiently',
        reasons: ['tight site geometry']
      };
    }
    if (strong) {
      return {
        band: 'strong',
        score: tallCapable ? 10 : 8,
        tallCapable: tallCapable,
        reason: tallCapable ? 'Site can carry a proper core and hold efficiency above 8 floors' : 'Site scale supports a proper core and meaningful uplift',
        reasons: tallCapable ? ['proper core viable', 'efficient upper floors above 8F plausible'] : ['proper core viable', 'meaningful uplift can stack cleanly']
      };
    }
    if (adequate) {
      return {
        band: 'adequate',
        score: 6,
        tallCapable: false,
        reason: 'Site can support mid-rise uplift, but not a premium height play',
        reasons: ['mid-rise uplift viable']
      };
    }
    return {
      band: 'poor',
      score: 3,
      tallCapable: false,
      reason: 'Only limited uplift is likely before efficiency collapses',
      reasons: ['limited core viability']
    };
  }

  function assessHeadroomConfidence(site) {
    var metrics = site.canonicalMetrics || buildCanonicalMetrics(site);
    var planning = site.planningSummary || site.planning || {};
    var points = 0;

    if (site.verified) points += 3;
    if (site.owner || site.hmlr || site.hmlr_title) points += 2;
    if (site.lat && site.lng) points += 1;
    if ((metrics.siteAreaM2 || 0) > 0) points += 1;
    if ((metrics.existingFloors || 0) > 0 || (metrics.existingHeightM || 0) > 0) points += 1;
    if (planning.recentRef || planning.recentDesc || planning.majorCount !== undefined || planning.liveCount !== undefined) points += 1;

    if (points >= 7) return { band: 'high', score: 10, reason: 'Geometry, status and parcel evidence are all reasonably grounded' };
    if (points >= 4) return { band: 'medium', score: 6, reason: 'Enough evidence to rank, but not fully underwritten yet' };
    return { band: 'low', score: 2, reason: 'Key parcel or status inputs are still too inferred' };
  }

  function assessHeadroomVerdict(site) {
    var validity = site.siteValidity || assessSiteValidity(site);
    var progression = site.progressionStatusData || assessProgressionStatus(site);
    var architectural = site.architecturalValue || assessArchitecturalValue(site);
    var core = site.coreViability || assessCoreViability(site);
    var confidence = site.headroomConfidenceData || assessHeadroomConfidence(site);
    var metrics = site.canonicalMetrics || buildCanonicalMetrics(site);
    var policy = site.planningPolicy || buildPlanningPolicyProfile(site);
    var fabric = site.fabricProfile || buildFabricProfile(site);
    var addF = Math.max(0, (metrics.maxFloors || 0) - (metrics.existingFloors || 0));
    var upliftPct = metrics.roughGiaUpliftPct;
    var reasons = [];
    var positiveCount = 0;
    var lowHeritage = !site.inCons && site.heritTier !== 'blocking' && site.heritTier !== 'navigable';
    var planningSupport = !!(policy.majorUplift || policy.heightIntent || policy.clusterPressure || toNumber(site.planScore, 0) >= 6.5);
    var underbuilt = addF >= 3 || (upliftPct !== null && upliftPct !== undefined && upliftPct >= 35);
    var meaningfulScale = (metrics.siteAreaM2 || 0) >= 450;
    var tokenOnly = addF <= 1 && (upliftPct === null || upliftPct === undefined || upliftPct < 20);

    if (!validity.valid) {
      return { key: 'no', primaryReason: validity.reason, reasons: [validity.reason], confidence: confidence.band };
    }
    if (progression.key === 'gone' || progression.key === 'progressed') {
      return { key: 'no', primaryReason: progression.reason, reasons: [progression.reason], confidence: confidence.band };
    }
    if (site.heritTier === 'blocking' && !fabric.redevelopmentFriendly) {
      return { key: 'no', primaryReason: 'Heritage and context kill meaningful uplift', reasons: ['heritage friction too strong'], confidence: confidence.band };
    }
    if (!meaningfulScale && tokenOnly) {
      return { key: 'no', primaryReason: 'Site is too small or too built out for meaningful uplift', reasons: ['limited site scale'], confidence: confidence.band };
    }

    if (underbuilt) {
      positiveCount += 1;
      reasons.push('materially underbuilt');
    }
    if (architectural.band === 'low') {
      positiveCount += 1;
      reasons.push('low architectural value');
    }
    if (lowHeritage) {
      positiveCount += 1;
      reasons.push('limited heritage friction');
    }
    if ((metrics.siteAreaM2 || 0) >= 900) {
      positiveCount += 1;
      reasons.push('site scale supports meaningful uplift');
    }
    if (core.band === 'strong' || core.tallCapable) {
      positiveCount += 1;
      reasons.push(core.tallCapable ? 'efficient core above 8 floors plausible' : 'proper core viable');
    }
    if (planningSupport) {
      positiveCount += 1;
      reasons.push('planning context supports intensification');
    }
    if (fabric.redevelopmentFriendly && reasons.indexOf('replaceable later fabric') === -1) {
      positiveCount += 1;
      reasons.push('replaceable later fabric');
    }

    if (positiveCount >= 3 && core.band !== 'poor' && !tokenOnly && confidence.band !== 'low') {
      return {
        key: 'yes',
        primaryReason: reasons[0] || 'Legitimate headroom is present',
        reasons: reasons.slice(0, 4),
        confidence: confidence.band
      };
    }
    if (tokenOnly) {
      return {
        key: 'no',
        primaryReason: 'Only trivial uplift is visible from the current evidence',
        reasons: ['uplift looks marginal'],
        confidence: confidence.band
      };
    }
    return {
      key: 'unclear',
      primaryReason: confidence.band === 'low' ? confidence.reason : 'Possible headroom exists, but it is not yet evidentially clean',
      reasons: reasons.slice(0, 3),
      confidence: confidence.band
    };
  }

  function scoreHeadroomUpside(site) {
    var verdict = site.headroomVerdictData || assessHeadroomVerdict(site);
    var architectural = site.architecturalValue || assessArchitecturalValue(site);
    var core = site.coreViability || assessCoreViability(site);
    var confidence = site.headroomConfidenceData || assessHeadroomConfidence(site);
    var metrics = site.canonicalMetrics || buildCanonicalMetrics(site);
    var policy = site.planningPolicy || buildPlanningPolicyProfile(site);
    var addF = Math.max(0, (metrics.maxFloors || 0) - (metrics.existingFloors || 0));
    var upliftPct = metrics.roughGiaUpliftPct || 0;
    var lowHeritage = !site.inCons && site.heritTier !== 'blocking' && site.heritTier !== 'navigable';
    var locationScore = policy.zone ? 16 : (site.inCAZ ? 13 : site.inOA ? 11 : 7);
    var headroomStrength = Math.min(30, (addF * 4) + Math.round(upliftPct / 10));
    var architectureScore = architectural.band === 'low' ? 16 : architectural.band === 'medium' ? 8 : 2;
    var heritageScore = lowHeritage ? 12 : site.heritTier === 'manageable' ? 8 : site.heritTier === 'navigable' ? 4 : 1;
    var coreScore = core.band === 'strong' ? (core.tallCapable ? 18 : 14) : core.band === 'adequate' ? 8 : 2;
    var planningScore = Math.max(0, Math.min(12, Math.round((toNumber(site.planScore, 0) || 0) * 1.4)));
    var confidenceScore = confidence.band === 'high' ? 8 : confidence.band === 'medium' ? 5 : 0;
    var total = 0;
    var band = 'none';

    if (verdict.key !== 'yes') {
      return { score: 0, band: band, secondary: verdict.key === 'no' ? 'Not a headroom winner' : 'Needs verification' };
    }

    total = Math.max(0, Math.min(100, headroomStrength + locationScore + architectureScore + heritageScore + coreScore + planningScore + confidenceScore));
    band = total >= 85 ? 'exceptional' : total >= 70 ? 'strong' : 'modest';

    return {
      score: total,
      band: band,
      secondary: band === 'exceptional'
        ? (core.tallCapable ? 'Upside: Exceptional · efficient height play' : 'Upside: Exceptional')
        : band === 'strong'
          ? (core.tallCapable ? 'Upside: Strong · efficient height play' : 'Upside: Strong')
          : 'Upside: Modest'
    };
  }

  function buildDiscoverVerdict(site) {
    var verdict = site.headroomVerdictData || assessHeadroomVerdict(site);
    var upside = site.headroomUpside || scoreHeadroomUpside(site);
    var className = verdict.key === 'yes' ? 'green' : verdict.key === 'no' ? 'red' : 'amber';
    var label = verdict.key === 'yes' ? 'Headroom: Yes' : verdict.key === 'no' ? 'Headroom: No' : 'Headroom: Unclear';
    return {
      label: label,
      className: className,
      primary: verdict.primaryReason,
      reasons: (verdict.reasons || []).slice(0, 3),
      secondary: upside.secondary
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

  function buildSiteText(site) {
    return [
      site.name,
      site.address,
      site.desc,
      site.notes,
      site.source,
      site.owner,
      site.deliveryFlag,
      site.typology,
      site.consolidationLabel,
      site.planning && site.planning.note,
      site.planning && site.planning.recentDesc,
      site.planningSummary && site.planningSummary.note
    ].filter(Boolean).join(' ').toLowerCase();
  }

  function hasStreetNumber(site) {
    var text = String(site.address || '') + ' ' + String(site.name || '');
    var withoutPostcode = text.replace(/\b[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}\b/ig, ' ');
    return /\b\d+[a-z]?(?:[-–]\d+[a-z]?)?\b(?=\s+[a-z])/i.test(withoutPostcode);
  }

  function normaliseSiteKey(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  var SHORTLIST_STATUS_OVERRIDES = {
    '100 leadenhall street': {
      key: 'advanced',
      bucket: 'advanced',
      priority: 3,
      reason: 'Consented 56-storey tower scheme, not an open acquisition target',
      evidence: 'sites/100-leadenhall/MARKET.md; SOM consent note'
    },
    'stone house and 128 170 bishopsgate': {
      key: 'advanced',
      bucket: 'advanced',
      priority: 3,
      reason: 'Stone House / Staple Hall has prior tower and hotel planning history, not a clean-slate target',
      evidence: 'GLA Stone House and Staple Hall planning reports'
    },
    'blackfriars gateway ec4': {
      key: 'advanced',
      bucket: 'gone',
      priority: 3,
      reason: '1-16 Blackfriars Road is the One Blackfriars site, already consented and completed',
      evidence: 'GLA Blackfriars Road planning report / One Blackfriars completion'
    },
    'crown place earl street': {
      key: 'advanced',
      bucket: 'gone',
      priority: 3,
      reason: 'One Crown Place is already built and trading as a mixed-use scheme',
      evidence: 'onecrownplace.com'
    },
    'barts square little britain': {
      key: 'advanced',
      bucket: 'gone',
      priority: 3,
      reason: 'Barts Square is already completed as a mixed-use quarter',
      evidence: 'Helical past developments / AJ completion coverage'
    },
    '15 16 minories and 62 aldgate high street': {
      key: 'advanced',
      bucket: 'gone',
      priority: 3,
      reason: 'The Haydon is already in active residential sales, not an open acquisition target',
      evidence: 'Savills / Rightmove new-home listings'
    },
    'land at royal mint street': {
      key: 'advanced',
      bucket: 'advanced',
      priority: 3,
      reason: 'Royal Mint Street already has granted mixed-use redevelopment, so it is not a clean-slate target',
      evidence: 'Tower Hamlets planning committee / GLA report'
    },
    'smithfield market ec1': {
      key: 'advanced',
      bucket: 'advanced',
      priority: 3,
      reason: 'Smithfield is already in strategic redevelopment and museum-delivery pipeline',
      evidence: 'City of London / West Smithfield redevelopment coverage'
    },
    '10 trinity square': {
      key: 'advanced',
      bucket: 'gone',
      priority: 3,
      reason: 'Grade II* building operating as the Four Seasons Hotel, not a live target site',
      evidence: 'Wikipedia / Four Seasons at Ten Trinity Square'
    },
    'curtain road worship street': {
      key: 'advanced',
      bucket: 'advanced',
      priority: 3,
      reason: 'Curtain Road and Worship Street is already in active redevelopment planning, not a clean-slate target',
      evidence: 'KPF / Shoreditch Works planning coverage'
    },
    'aldgate place whitechapel high street': {
      key: 'advanced',
      bucket: 'gone',
      priority: 3,
      reason: 'Aldgate Place has already been developed and completed in phases',
      evidence: 'Buildington / Tower Hamlets Aldgate Place records'
    },
    'sugar quay lower thames street': {
      key: 'advanced',
      bucket: 'gone',
      priority: 3,
      reason: 'Sugar Quay already has prior redevelopment history on an existing built waterfront site, not a clean-slate target',
      evidence: 'GLA Sugar Quay planning report / existing quay record'
    },
    'norton folgate spitalfields': {
      key: 'advanced',
      bucket: 'gone',
      priority: 3,
      reason: 'Norton Folgate is already delivered and leasing as a mixed-use scheme',
      evidence: 'norton-folgate.co.uk leasing site / British Land development'
    }
  };

  function resolveShortlistStatusOverride(site) {
    var keys = [site && site.slug, site && site.name, site && site.address]
      .map(normaliseSiteKey)
      .filter(Boolean);
    for (var i = 0; i < keys.length; i += 1) {
      if (SHORTLIST_STATUS_OVERRIDES[keys[i]]) {
        return Object.assign({ matchedOn: keys[i] }, SHORTLIST_STATUS_OVERRIDES[keys[i]]);
      }
    }
    return null;
  }

  function assessSiteLegitimacy(site) {
    if (site && (
      site.siteLegitimacyPenalty !== undefined ||
      Array.isArray(site.siteLegitimacyFlags) ||
      typeof site.credibleSite === 'boolean'
    )) {
      var seededPenalty = toNumber(site.siteLegitimacyPenalty, 0) || 0;
      var seededFlags = Array.isArray(site.siteLegitimacyFlags) ? site.siteLegitimacyFlags.slice() : [];
      var seededCredible = typeof site.credibleSite === 'boolean' ? site.credibleSite : seededPenalty < 25;
      return {
        penalty: seededPenalty,
        flags: seededFlags,
        credible: seededCredible
      };
    }

    var text = buildSiteText(site);
    var owner = String(site.owner || '').toLowerCase();
    var penalties = [];
    var penalty = 0;

    var openSpaceTerms = /(churchyard|church yard|plaza|square|gardens|garden|walk|passage|forecourt|piazza|courtyard|bunhill fields|playing fields|sports field|sports fields|cemetery|burial ground)/i;
    var civicTerms = /(cathedral|church|guildhall|memorial|public realm|open space|churchyard)/i;
    var transportTerms = /(station|rail|railway|transport hub|bus station|interchange|network rail|tfl|liverpool street station|supersite|oversite|air rights)/i;
    var progressedTerms = /(under construction|construction started|completed|built out|delivered|implemented|conditions discharge|consented scheme|full consent)/i;
    var numbered = hasStreetNumber(site);

    if (openSpaceTerms.test(text) && !numbered) {
      penalty += 28;
      penalties.push('open_space_named_parcel');
    }
    if (civicTerms.test(text)) {
      penalty += 18;
      penalties.push('civic_or_public_realm_context');
    }
    if (transportTerms.test(text)) {
      penalty += 35;
      penalties.push('transport_or_station_land');
    }
    if (/church|cathedral|diocese|bishop|dean and chapter/.test(owner)) {
      penalty += 14;
      penalties.push('institutional_owner_signal');
    }
    if ((toNumber(site.hectares, 0) || 0) < 0.03 && !site.brownfield && !numbered) {
      penalty += 10;
      penalties.push('tiny_non_brownfield_plot');
    }
    if (String(site.source || '').toLowerCase().indexOf('corporation of london') !== -1 && !site.brownfield && transportTerms.test(text)) {
      penalty += 15;
      penalties.push('strategic_civic_transport_signal');
    }
    if (site.deliveryFlag === 'station-oversite') {
      penalty += 30;
      penalties.push('station_oversite_delivery_risk');
    }
    if (progressedTerms.test(text)) {
      penalty += 24;
      penalties.push('already_progressed_or_completed');
    }

    return {
      penalty: penalty,
      flags: penalties,
      credible: penalty < 25
    };
  }

  function classifyShortlistSite(site) {
    var text = buildSiteText(site);
    var typology = site.typology || classifySiteTypology(site);
    var logic = site.developmentLogic || deriveDevelopmentLogic(site);
    var brownfield = !!(site.brownfield || (site.flags && site.flags.inBrownfield));
    var fabric = site.fabricProfile || buildFabricProfile(site);

    if (
      typology === 'city-oversite' ||
      typology === 'oversite' ||
      site.deliveryFlag === 'station-oversite' ||
      /(oversite|air rights|station supersite|station oversite)/.test(text)
    ) {
      return { key: 'non-target', priority: 9, reason: 'Oversite or station-air-rights parcel' };
    }

    if (/(churchyard|public realm|open space|plaza|piazza|square|garden|gardens|memorial|bunhill fields|playing fields|sports field|sports fields|cemetery|burial ground)/.test(text) && !hasStreetNumber(site)) {
      return { key: 'non-target', priority: 9, reason: 'Public realm or open-space parcel' };
    }

    if (
      typology === 'southwark-restructure' ||
      typology === 'estate-restructure' ||
      /(estate|campus|hospital|health centre|health center|college|university|school|court building|shopping centre|shopping center|stadium|football ground|sports ground|athletics track|leisure centre|leisure center)/.test(text)
    ) {
      return { key: 'complex-campus', priority: 2, reason: 'Estate, campus, sports, or multi-party restructure' };
    }

    if (
      typology === 'southwark-replacement' ||
      typology === 'hackney-depot' ||
      brownfield ||
      (fabric && fabric.redevelopmentFriendly) ||
      /(garage|depot|industrial|warehouse|works|trading estate|business park|retail park|factory|wharf)/.test(text)
    ) {
      return { key: 'replacement-parcel', priority: 1, reason: 'Standalone replacement or brownfield parcel' };
    }

    if (
      typology === 'city-parcel' ||
      typology === 'southwark-parcel' ||
      typology === 'general-parcel' ||
      typology === 'hackney-fringe' ||
      logic.mode === 'Strategic height' ||
      logic.mode === 'Strategic intensification' ||
      logic.mode === 'Mid-rise intensification' ||
      logic.mode === 'Setback intensification' ||
      logic.mode === 'Efficient infill'
    ) {
      return { key: 'urban-parcel', priority: 1, reason: 'Standalone urban parcel' };
    }

    return { key: 'other', priority: 3, reason: 'Unclassified parcel' };
  }

  function verifyShortlistStatus(site) {
    var planning = site.planningSummary || site.planning || {};
    var text = buildSiteText(site);
    var note = String(planning.note || '').toLowerCase();
    var recentDesc = String(planning.recentDesc || '').toLowerCase();
    var majorCount = toNumber(planning.majorCount, 0) || 0;
    var liveCount = toNumber(planning.liveCount, 0) || 0;
    var totalCount = toNumber(planning.total, planning.count, 0);
    var hasRedevelopment = !!planning.hasRedevelopment;
    var onMarket = !!(site.onMarket || site.on_market);
    var cleanSlate = /no live consent|clean slate/.test(note);
    var planningPending = /(planning data pending|requires verification before planning query|coordinates require verification|pending)/.test(note);
    var hasStructuredPlanningSignal = (
      planning.hasRedevelopment !== undefined ||
      planning.majorCount !== undefined ||
      planning.liveCount !== undefined ||
      planning.total !== undefined ||
      planning.count !== undefined ||
      planning.recentRef !== undefined ||
      planning.recentDate !== undefined ||
      planning.recentDesc !== undefined
    );
    var hasReliablePlanningCheck = !!(hasStructuredPlanningSignal && !planningPending);
    var override = resolveShortlistStatusOverride(site);
    var progressed = (
      site.deliveryFlag === 'station-oversite' ||
      (!cleanSlate && (majorCount > 0 || liveCount > 0 || hasRedevelopment)) ||
      /(under construction|construction started|completed|built out|delivered|implemented|conditions discharge|consented scheme|full consent|live consent|permissioned)/.test(text + ' ' + recentDesc)
    );

    if (site.deliveryFlag === 'station-oversite' || /(oversite|air rights|station supersite|station oversite)/.test(text)) {
      return { key: 'non-target', bucket: 'non-target', priority: 9, reason: 'Station oversite or transport-led parcel', evidence: null };
    }
    if (override) {
      return {
        key: override.key,
        bucket: override.bucket || null,
        priority: override.priority,
        reason: override.reason,
        evidence: override.evidence,
        overridden: true
      };
    }
    if (progressed) {
      return { key: 'advanced', bucket: 'advanced', priority: 3, reason: 'Already progressed or in active redevelopment pipeline', evidence: null };
    }
    if (onMarket || cleanSlate) {
      return {
        key: 'clear',
        priority: 1,
        reason: onMarket ? 'Explicit live-market status' : 'Planning note says clean slate',
        evidence: null
      };
    }
    if (hasReliablePlanningCheck && totalCount !== null && majorCount === 0 && liveCount === 0 && !hasRedevelopment) {
      return {
        key: 'clear',
        priority: 1,
        reason: 'Planning status checked with no active redevelopment signal',
        evidence: null
      };
    }
    return {
      key: 'unclear',
      priority: 2,
      reason: planningPending ? 'Planning verification still pending' : 'Status not yet verified from planning evidence',
      evidence: null
    };
  }

  function deriveShortlistDecision(site) {
    var legitimacy = assessSiteLegitimacy(site);
    var classification = classifyShortlistSite(site);
    var status = verifyShortlistStatus(site);
    var hardFlags = {
      open_space_named_parcel: true,
      civic_or_public_realm_context: true,
      transport_or_station_land: true,
      strategic_civic_transport_signal: true,
      station_oversite_delivery_risk: true,
      city_open_space: true
    };
    var exclusionCode = null;
    var exclusionReason = null;

    for (var i = 0; i < legitimacy.flags.length; i += 1) {
      if (hardFlags[legitimacy.flags[i]]) {
        exclusionCode = legitimacy.flags[i];
        exclusionReason = legitimacy.flags[i].replace(/_/g, ' ');
        break;
      }
    }

    if (!exclusionCode && classification.key === 'non-target') {
      exclusionCode = classification.key;
      exclusionReason = classification.reason;
    }
    if (!exclusionCode && status.key === 'non-target') {
      exclusionCode = status.key;
      exclusionReason = status.reason;
    }
    if (!exclusionCode && status.key === 'advanced') {
      exclusionCode = status.key;
      exclusionReason = status.reason;
    }
    if (!exclusionCode && !legitimacy.credible) {
      exclusionCode = 'low-credibility';
      exclusionReason = legitimacy.flags.length ? legitimacy.flags[0].replace(/_/g, ' ') : 'Low credibility parcel';
    }

    var name = String(site.name || '').toLowerCase();
    var consolidationLabel = String(site.consolidationLabel || site.consolidation_label || '').toLowerCase();
    var specificAddress = hasStreetNumber(site);
    var liveMarket = !!(site.onMarket || site.on_market);
    var titleKnown = !!(site.hmlr || site.hmlr_title || site.owner || toNumber(site.consolidationTitles, site.consolidation_titles, 0));
    var genericParcel = /^(land\b|site\b|former\b)/.test(name) || /(land bounded by|land between|site bordering|adjacent|cluster|corridor|district|fringe)/.test(name);
    var easyAssembly = /(single freehold|easy assembly)/.test(consolidationLabel);
    var bucketKey = 'worth-testing';
    var bucketPriority = 2;
    var bucketReason = 'Promising, but still needs deeper testing';

    if (classification.key === 'non-target' || status.key === 'non-target' || (exclusionCode && exclusionCode !== 'advanced')) {
      bucketKey = 'non-target';
      bucketPriority = 9;
      bucketReason = exclusionReason || classification.reason || status.reason || 'Non-target parcel';
    } else if (status.key === 'advanced') {
      var gone = status.bucket === 'gone' || /(completed|built|operating|trading|sales|hotel|leasing|delivered)/.test(String(status.reason || '').toLowerCase());
      bucketKey = gone ? 'gone' : 'advanced';
      bucketPriority = gone ? 8 : 7;
      bucketReason = status.reason;
    } else if (
      status.key === 'clear' &&
      classification.key !== 'complex-campus' &&
      legitimacy.penalty === 0 &&
      !genericParcel &&
      (specificAddress || liveMarket || easyAssembly || titleKnown)
    ) {
      bucketKey = 'pursue';
      bucketPriority = 1;
      bucketReason = liveMarket
        ? 'Clear status with live market signal'
        : easyAssembly
          ? 'Clear status with specific parcel and workable assembly'
          : 'Clear status with specific parcel identity';
    } else {
      bucketKey = 'worth-testing';
      bucketPriority = 2;
      bucketReason = status.key === 'unclear'
        ? 'Needs deeper planning verification'
        : classification.key === 'complex-campus'
          ? 'Promising, but complex enough to need deeper testing'
          : genericParcel
            ? 'Promising allocation-style parcel, but not yet specific enough to pursue cold'
            : (!specificAddress && !liveMarket)
              ? 'Promising site, but identity and acquisition route still need testing'
              : 'Promising, but still needs deeper testing';
    }

    return {
      eligible: !exclusionCode,
      exclusionCode: exclusionCode,
      exclusionReason: exclusionReason,
      classKey: classification.key,
      classPriority: classification.priority,
      classReason: classification.reason,
      statusKey: status.key,
      statusPriority: status.priority,
      statusReason: status.reason,
      statusEvidence: status.evidence || null,
      bucketKey: bucketKey,
      bucketPriority: bucketPriority,
      bucketReason: bucketReason,
      legitimacyPenalty: legitimacy.penalty,
      legitimacyFlags: legitimacy.flags.slice(),
      credible: legitimacy.credible
    };
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
    model.siteValidity = assessSiteValidity(model);
    model.progressionStatusData = assessProgressionStatus(model);
    model.architecturalValue = assessArchitecturalValue(model);
    model.headroomConfidenceData = assessHeadroomConfidence(model);
    model.coreViability = assessCoreViability(model);
    model.developmentLogic = deriveDevelopmentLogic(model);
    model.siteLegitimacy = assessSiteLegitimacy(model);
    model.shortlist = deriveShortlistDecision(model);
    model.headroomVerdictData = assessHeadroomVerdict(model);
    model.headroomVerdict = model.headroomVerdictData.key;
    model.headroomReasonPrimary = model.headroomVerdictData.primaryReason;
    model.headroomReasons = model.headroomVerdictData.reasons || [];
    model.headroomConfidence = model.headroomConfidenceData.band;
    model.headroomConfidenceScore = model.headroomConfidenceData.score;
    model.architecturalValueBand = model.architecturalValue.band;
    model.architecturalValueReason = model.architecturalValue.reason;
    model.heritageValueBand = model.heritTier === 'blocking' ? 'high' : model.heritTier === 'navigable' ? 'medium' : 'low';
    model.heritageValueReason = model.heritageValueBand === 'high' ? 'Heritage setting strongly constrains uplift' : model.heritageValueBand === 'medium' ? 'Heritage context is navigable but real' : 'Heritage burden is limited';
    model.coreViabilityBand = model.coreViability.band;
    model.coreViabilityReason = model.coreViability.reason;
    model.upperFloorEfficiencyBand = model.coreViability.tallCapable ? 'strong' : model.coreViability.band === 'adequate' ? 'moderate' : model.coreViability.band;
    model.tallCapable = !!model.coreViability.tallCapable;
    model.headroomUpside = scoreHeadroomUpside(model);
    model.headroomUpsideScore = model.headroomUpside.score;
    model.headroomRankBand = model.headroomUpside.band;
    model.headroomSortKey = model.headroomVerdict === 'yes' ? model.headroomUpsideScore : 0;
    model.discoverVerdict = buildDiscoverVerdict(model);
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
    assessSiteValidity: assessSiteValidity,
    assessProgressionStatus: assessProgressionStatus,
    assessArchitecturalValue: assessArchitecturalValue,
    assessCoreViability: assessCoreViability,
    assessHeadroomConfidence: assessHeadroomConfidence,
    assessHeadroomVerdict: assessHeadroomVerdict,
    scoreHeadroomUpside: scoreHeadroomUpside,
    buildDiscoverVerdict: buildDiscoverVerdict,
    assessSiteLegitimacy: assessSiteLegitimacy,
    resolveShortlistStatusOverride: resolveShortlistStatusOverride,
    classifyShortlistSite: classifyShortlistSite,
    verifyShortlistStatus: verifyShortlistStatus,
    deriveShortlistDecision: deriveShortlistDecision,
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
