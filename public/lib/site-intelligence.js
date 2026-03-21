/**
 * site-intelligence.js — Universal Development Intelligence Framework
 * Same 6 factors drive borough top-20 ranking, T1 hero, T2 assumptions, T3 narrative.
 * Surveyor checklist items (flood zone, use class) live in footnotes — not the hero.
 */

// ── Score computation ────────────────────────────────────────────────────────
function computeSiteScore(si) {
  const F = si.factors;
  const weighted = (
    F.sky.score        * 2.5 +
    F.value.score      * 2.0 +
    F.momentum.score   * 2.0 +
    F.heritage.score   * 1.5 +
    F.acquisition.score * 1.5 +
    F.transport.score  * 0.5
  );
  return Math.round(weighted); // out of 100
}

// ── SVG ring gauge ───────────────────────────────────────────────────────────
function scoreRingSVG(score, size=80) {
  const r = size * 0.38, cx = size/2, cy = size/2;
  const circ = 2 * Math.PI * r;
  const fill = circ * score / 100;
  const color = score >= 80 ? '#059669' : score >= 60 ? '#d97706' : '#dc2626';
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#e5e7eb" stroke-width="${size*0.09}"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${size*0.09}"
      stroke-dasharray="${fill} ${circ}" stroke-dashoffset="${circ*0.25}"
      stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})"/>
    <text x="${cx}" y="${cy+1}" text-anchor="middle" dominant-baseline="middle"
      font-family="Inter,sans-serif" font-size="${size*0.26}" font-weight="800" fill="${color}">${score}</text>
  </svg>`;
}

// ── Factor bar ───────────────────────────────────────────────────────────────
function factorBarHTML(score) {
  const pct = score * 10;
  const col = score >= 7.5 ? '#059669' : score >= 5 ? '#d97706' : '#dc2626';
  return `<div style="height:3px;background:#e5e7eb;border-radius:2px;margin:5px 0 6px">
    <div style="height:100%;width:${pct}%;background:${col};border-radius:2px"></div></div>`;
}

// ── Score context label ──────────────────────────────────────────────────────
function scoreContext(score, borough) {
  if (score >= 85) return `Top 5% of ${borough} sites — exceptional development opportunity`;
  if (score >= 75) return `Top 15% of ${borough} sites — strong development case`;
  if (score >= 60) return `Above average for ${borough} — credible development opportunity`;
  return `Mixed signals — detailed due diligence required`;
}

// ── Render: T1 (compact hero + 6 factor cards) ───────────────────────────────
function renderIntelligenceT1(si) {
  const score = computeSiteScore(si);
  const F = si.factors;
  const factors = [
    { key:'sky',         label:'Available Sky',      f:F.sky,         primary: F.sky.sky_m+'m · '+F.sky.factor,            secondary: F.sky.existing_m+'m existing · '+F.sky.precedent_ref },
    { key:'value',       label:'Rent Headroom',      f:F.value,       primary: '+'+F.value.uplift_pct+'% uplift',           secondary: '£'+F.value.existing_rent+' → £'+F.value.new_build_rent+'/ft²' },
    { key:'momentum',    label:'Planning Tailwind',  f:F.momentum,    primary: F.momentum.cluster,                          secondary: F.momentum.consents+' towers consented nearby' },
    { key:'heritage',    label:'Heritage Shadow',    f:F.heritage,    primary: F.heritage.primary.name,                     secondary: 'Grade '+F.heritage.primary.grade+' · '+F.heritage.primary.dist_m+'m' },
    { key:'acquisition', label:'Title Stack', f:F.acquisition,
      primary: (F.acquisition.titles===1?'Single title':(F.acquisition.titles||1)+' titles') + ' · ' + (F.acquisition.tenure||'Freehold'),
      secondary: (F.acquisition.encumbrances||'No known encumbrances') },
    { key:'transport',   label:'Station Gravity',    f:F.transport,   primary: 'PTAL '+F.transport.ptal,                    secondary: F.transport.stations+' stations within 500m' },
  ];

  const cols = factors.map(({label, f, primary, secondary}) => {
    const scoreCol = f.score >= 7.5 ? '#059669' : f.score >= 5 ? '#d97706' : '#dc2626';
    const bgCol = f.score >= 7.5 ? '#ecfdf5' : f.score >= 5 ? '#fffbeb' : '#fef2f2';
    const bdCol = f.score >= 7.5 ? '#a7f3d0' : f.score >= 5 ? '#fcd34d' : '#fca5a5';
    return `<div style="background:${bgCol};border:1px solid ${bdCol};border-radius:8px;padding:10px 12px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2px">
        <span style="font:600 9px 'Inter',sans-serif;text-transform:uppercase;letter-spacing:1px;color:#6b7280">${label}</span>
        <span style="font:700 11px 'Inter',sans-serif;color:${scoreCol}">${f.score.toFixed(1)}</span>
      </div>
      ${factorBarHTML(f.score)}
      <div style="font:700 12px 'Inter',sans-serif;color:#0c0f1a;margin-bottom:2px">${primary}</div>
      <div style="font:400 10px 'Inter',sans-serif;color:#6b7280;margin-bottom:5px">${secondary}</div>
      <div style="font:400 10px/1.5 'Inter',sans-serif;color:#4b5563;font-style:italic">${f.insight}</div>
    </div>`;
  }).join('');

  return `<div style="margin-bottom:20px">
    <!-- Hero -->
    <div style="display:flex;align-items:center;gap:16px;padding:14px 16px;background:#f8f9fb;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:14px">
      ${scoreRingSVG(score, 72)}
      <div>
        <div style="font:800 18px 'Inter',sans-serif;color:#0c0f1a;letter-spacing:-0.5px;margin-bottom:2px">${score} / 100</div>
        <div style="font:600 11px 'Inter',sans-serif;color:#0c0f1a;margin-bottom:4px">Development Intelligence Score</div>
        <div style="font:400 11px 'Inter',sans-serif;color:#6b7280">${scoreContext(score, si.borough)}</div>
      </div>
    </div>
    <!-- 6 Factor cards -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      ${cols}
    </div>
    <!-- Footnote -->
    <div style="margin-top:8px;font:400 9px 'Inter',sans-serif;color:#9ca3af;border-top:1px solid #f3f4f6;padding-top:6px">
      Flood risk, use class, conservation area status and other legal search items are addressed in solicitor's due diligence — not scored here.
    </div>
  </div>`;
}

// ── Render: T2 (compact score strip for sidebar) ─────────────────────────────
function renderIntelligenceT2(si) {
  const score = computeSiteScore(si);
  const F = si.factors;
  const rows = [
    ['Available Sky',       F.sky.sky_m+'m · '+F.sky.factor,                              F.sky.score],
    ['Rent Headroom',       '+'+F.value.uplift_pct+'% · £'+F.value.new_build_rent+'/ft²', F.value.score],
    ['Planning Tailwind',   F.momentum.cluster,                                            F.momentum.score],
    ['Heritage Shadow',     F.heritage.primary.name+' · Gr.'+F.heritage.primary.grade,    F.heritage.score],
    ['Title Stack', (F.acquisition.titles||1)+' title · '+(F.acquisition.tenure||'Freehold'), F.acquisition.score],
    ['Station Gravity',     'PTAL '+F.transport.ptal+' · '+F.transport.stations+' stn',   F.transport.score],
  ].map(([label, val, sc]) => {
    const col = sc >= 7.5 ? '#059669' : sc >= 5 ? '#d97706' : '#dc2626';
    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid #f3f4f6">
      <div>
        <div style="font:600 10px 'Inter',sans-serif;color:#374151">${label}</div>
        <div style="font:400 10px 'Inter',sans-serif;color:#9ca3af">${val}</div>
      </div>
      <div style="font:700 13px 'Inter',sans-serif;color:${col};min-width:28px;text-align:right">${sc.toFixed(1)}</div>
    </div>`;
  }).join('');

  return `<div style="margin-bottom:16px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <span style="font:600 10px 'Inter',sans-serif;text-transform:uppercase;letter-spacing:1.5px;color:#6b7280">Site Intelligence</span>
      <span style="font:800 16px 'Inter',sans-serif;color:#0c0f1a">${score}<span style="font-weight:400;font-size:11px;color:#9ca3af"> / 100</span></span>
    </div>
    ${rows}
  </div>`;
}


// ── OA Implications copy ─────────────────────────────────────────────────────
function renderOAImplications(si) {
  const F = si.factors;
  if (!F || !F.momentum || !F.momentum.opportunity_area) return '';
  const oa = F.momentum.opportunity_area;
  return `<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:7px;padding:10px 12px;margin-top:8px">
    <div style="font:700 9px 'Inter',sans-serif;text-transform:uppercase;letter-spacing:1px;color:#1d4ed8;margin-bottom:5px">Opportunity Area - ${oa.name}</div>
    <div style="font:400 10px/1.6 'Inter',sans-serif;color:#1e40af">
      <strong>Density:</strong> Higher density departures from standard matrix are actively supported. GLA expects LPAs to facilitate, not resist.<br>
      <strong>Affordable Housing:</strong> AH % is negotiated against viability - OA designation gives GLA leverage to push for higher rates.<br>
      <strong>Height:</strong> GLA has called in or backed taller schemes in this OA where LPA hesitated. Your appeal backstop is strong.<br>
      <span style="color:#3b82f6;font-style:italic">Ref: ${oa.ref}</span>
    </div>
  </div>`;
}

// ── GLA Stage 2 Threshold ────────────────────────────────────────────────────
function renderGLAStage2(si) {
  const s = si.site || {};
  const maxH = s.max_h || s.existing_height_m || 0;
  const maxF = s.max_floors || 0;
  const triggers = [];
  if (maxH >= 150) triggers.push('150m+ height triggers mandatory GLA Stage 2 referral');
  if (maxF >= 50) triggers.push('50F+ scheme likely triggers GLA Stage 2');
  // Residential threshold - if we have units data
  const triggered = triggers.length > 0;
  const col = triggered ? '#d97706' : '#059669';
  const bg = triggered ? '#fffbeb' : '#f0fdf4';
  const label = triggered ? 'GLA Stage 2 Likely' : 'GLA Stage 2 Unlikely';
  const note = triggered ? triggers.join('. ') + '. Programme impact: +4-6 months minimum.' 
    : 'Scheme parameters suggest no mandatory GLA Stage 2 referral. LPA retains decision. Faster programme.';
  return `<div style="background:${bg};border-radius:6px;padding:8px 10px;margin-top:6px;display:flex;gap:8px;align-items:flex-start">
    <span style="font:700 9px 'Inter',sans-serif;color:${col};text-transform:uppercase;letter-spacing:.5px;white-space:nowrap;margin-top:1px">${label}</span>
    <span style="font:400 10px/1.5 'Inter',sans-serif;color:#374151">${note}</span>
  </div>`;
}

// ── Borough LPA Commentary ───────────────────────────────────────────────────
const LPA_COMMENTARY = {
  'Southwark': 'Southwark is a commercially active LPA with strong support for office-led intensification in the CAZ. Design quality is the primary currency - the council has a robust design review process (Design Review Panel) and pre-app is essential. Affordable workspace requirements (10% of commercial floorspace) apply to major schemes. S106 negotiations are realistic and well-precedented. Policy P8 protects non-designated heritage - engage early if Victorian fabric is present.',
  'City of London': 'The City Corporation actively promotes tall buildings within the cluster. Local Plan 2040 designates specific zones for 150m+ buildings. Design quality is expected to be exemplary - the City Design Group runs a robust pre-app process. Heritage is taken seriously (Wren churches, viewing corridors) but the Corporation balances heritage against economic vitality. The Corporation acts as both LPA and landowner in parts - this creates unique negotiating dynamics.',
  'Hackney': 'Hackney LBC is a design-conscious LPA with a strong community engagement expectation. The Future Shoreditch AAP (2026) is redefining height zones in the City fringe. The Article 4 direction in Shoreditch protects commercial uses - office schemes here face less PD competition. Hackney has a Tall Building SPD (30m threshold) and expects Design Review Panel engagement on major schemes. Community benefit and affordable workspace are key political priorities.',
  'default': 'Check the relevant Local Plan for this borough. Pre-application engagement with the planning officer and design review panel is recommended before RIBA Stage 2.'
};

function renderLPACommentary(si) {
  const borough = (si.borough || si.site && si.site.borough || 'default');
  const text = LPA_COMMENTARY[borough] || LPA_COMMENTARY['default'];
  return `<div style="background:#f8f9fb;border-left:3px solid #6366f1;padding:10px 12px;border-radius:0 6px 6px 0;margin-top:8px">
    <div style="font:700 9px 'Inter',sans-serif;text-transform:uppercase;letter-spacing:1px;color:#6366f1;margin-bottom:5px">${borough} - LPA Planning Character</div>
    <div style="font:400 10px/1.7 'Inter',sans-serif;color:#374151">${text}</div>
  </div>`;
}


// ── Intelligence Synthesis Engine ────────────────────────────────────────────
// Takes all site factors and cross-references them into directional conclusions.
// Rule: every paragraph must triangulate >= 2 data sources into a conclusion
// that could not be derived from either alone.

function synthesisDevScope(si) {
  const F = si.factors || {};
  const hf = si.heritage_framework || {};
  const s = si.site || {};
  const sky = F.sky || {}; const val = F.value || {}; const mom = F.momentum || {};
  const trans = F.transport || {}; const herit = F.heritage || {};
  
  const skyScore = sky.score || 5;
  const heritTier = hf.tier || 'clean';
  const heritScore = hf.score || 7;
  const ptal = s.ptal || trans.score || 3;
  const inOA = !!(mom.opportunity_area);
  const maxF = s.max_floors || 10;
  const maxH = s.max_h || 30;
  const plotM2 = s.plot_m2 || s.plot_area || 1000;
  const bsa18 = maxH >= 18 || maxF >= 6;
  const bsa30 = maxH >= 30 || maxF >= 10;
  const bsa50 = maxH >= 50 || maxF >= 16;
  const erv = val.erv || 700;
  const niy = val.niy || 4.75;
  
  // Plate at max height (approximate NIA achievable)
  const efficiency = 0.78;
  const coreRatio = 0.22;
  const plateNIA = Math.round(plotM2 * 0.65 * efficiency); // 65% plot coverage typical
  const totalNIA = Math.round(plateNIA * maxF * 0.85); // multi-floor efficiency loss
  const gdvEst = Math.round((totalNIA * erv) / 1000) * 1000;
  
  // Triangulation: sky + heritage + OA → real potential
  let potentialNarrative = '';
  if(skyScore >= 7 && heritTier === 'clean' && inOA) {
    potentialNarrative = `Available Sky (${skyScore.toFixed(1)}/10), a clean heritage position (${heritScore.toFixed(1)}/10), and OA designation align to remove the three most common blockers on sites of this size. The GLA will actively support density here - the limiting factor is not planning, it is economics.`;
  } else if(skyScore >= 7 && heritTier === 'clean') {
    potentialNarrative = `Available Sky (${skyScore.toFixed(1)}/10) and a clean heritage context (${heritScore.toFixed(1)}/10) mean the vertical envelope is genuinely open. Without an OA designation, the LPA retains standard policy discretion - but there is no heritage argument waiting to derail a well-designed scheme.`;
  } else if(skyScore >= 5 && (heritTier === 'navigable' || heritTier === 'manageable')) {
    potentialNarrative = `The sky is available (${skyScore.toFixed(1)}/10) but the heritage position (${heritTier}, ${heritScore.toFixed(1)}/10) shapes what can be done with it. Development potential is real but the form must respond to the heritage constraint - this is a design challenge, not a planning block.`;
  } else if(skyScore < 5) {
    potentialNarrative = `Available Sky (${skyScore.toFixed(1)}/10) is the primary constraint on this site. Neighbouring building heights or protected viewing corridors limit the vertical envelope regardless of planning policy. The opportunity here is horizontal intensification, not height.`;
  } else if(heritTier === 'blocking') {
    potentialNarrative = `The heritage designation (${heritScore.toFixed(1)}/10, blocking tier) is the dominant constraint. Despite reasonable sky availability (${skyScore.toFixed(1)}/10), any development strategy must work within - not against - the heritage framework. Demolition is not the primary route here.`;
  }
  
  // BSA triangulation
  let bsaNarrative = '';
  if(bsa50) {
    bsaNarrative = `At ${maxF}F/${maxH}m, this scheme sits above the BSA 50m threshold - the highest regulatory tier. Second staircase, enhanced structure, and full higher-risk building regime apply. This adds approximately £2-3M and 6-12 months to programme. The return curve only justifies this at high ERV locations.`;
  } else if(bsa30) {
    bsaNarrative = `At ${maxF}F, the scheme crosses the BSA 30m threshold. Second staircase required (approximately £1.4M cost, 320m² NIA loss). The architectural task is to maximise NIA efficiency on remaining plate area to absorb this cost without fatally diluting returns.`;
  } else if(bsa18) {
    bsaNarrative = `At ${maxF}F, the scheme sits in the BSA 18m zone - enhanced fire safety requirements without the full second staircase mandate. Consider whether 1-2 additional floors above 18m can be justified by GDV uplift versus the additional compliance and structural cost.`;
  } else {
    bsaNarrative = `At ${maxF}F, the scheme sits below all BSA regulatory thresholds. Single staircase, standard fire strategy, no higher-risk building regime. This is a structural cost and programme advantage that the underwriting model should reflect.`;
  }
  
  return `<p style="font:400 12px/1.75 Inter,sans-serif;color:#374151;margin-bottom:10px">${potentialNarrative}</p><p style="font:400 12px/1.75 Inter,sans-serif;color:#374151">${bsaNarrative}</p>`;
}

function synthesisPlanning(si) {
  const F = si.factors || {};
  const hf = si.heritage_framework || {};
  const s = si.site || {};
  const mom = F.momentum || {}; const plan = F.momentum || {};
  const herit = F.heritage || {};
  const acq = F.acquisition || {};
  
  const planScore = mom.score || 5;
  const heritTier = hf.tier || 'clean';
  const inOA = !!(mom.opportunity_area);
  const borough = si.borough || 'this borough';
  const inConservation = s.conservation_area || false;
  const hasRedevelopment = (si.planning || {}).hasRedevelopment || false;
  const majorCount = (si.planning || {}).majorCount || 0;
  
  // Triangulate: planning appetite + heritage + OA + LPA character
  let planNarrative = '';
  if(planScore >= 7 && inOA && heritTier === 'clean') {
    planNarrative = `Planning Appetite (${planScore.toFixed(1)}/10), OA policy support, and a clean heritage position create a genuinely favourable planning environment. The LPA is not the obstacle here - the conversation at pre-app is about design quality and planning gain, not whether development is appropriate. That is a fundamentally different negotiation.`;
  } else if(planScore >= 6 && heritTier === 'manageable') {
    planNarrative = `Planning Appetite (${planScore.toFixed(1)}/10) is constructive but the heritage position (manageable, ${hf.score ? hf.score.toFixed(1) : '7'}/10) means design quality is non-negotiable. The LPA will approve a confident scheme that articulates its heritage response. A defensive design - one that apologises for itself - will struggle.`;
  } else if(planScore < 5 && heritTier === 'blocking') {
    planNarrative = `Planning Appetite (${planScore.toFixed(1)}/10) combined with a blocking heritage tier (${hf.score ? hf.score.toFixed(1) : '4'}/10) signals a difficult planning environment. This is not impossible - it is a longer, more expensive process requiring pre-app investment, a robust heritage assessment, and a design team with listed building experience.`;
  } else if(heritTier === 'navigable') {
    planNarrative = `The heritage designation (navigable tier) means planning is navigable but not straightforward. Planning Appetite of ${planScore.toFixed(1)}/10 suggests the LPA is willing to engage - the key is arriving at pre-app with a clear heritage strategy, not a question about whether development is appropriate.`;
  } else {
    planNarrative = `Planning Appetite of ${planScore.toFixed(1)}/10 reflects the general policy position for sites of this type in ${borough}. ${majorCount > 0 ? `${majorCount} major application${majorCount>1?'s':''} on or near this site provide precedent context for what the LPA has approved before.` : 'No major applications on this site - a clean slate that avoids the burden of precedent but also lacks proof of approval.'}`;
  }
  
  // Conservation area interaction
  let caNote = '';
  if(inConservation) {
    caNote = ` The conservation area designation modifies PD rights and raises the design quality bar. Any scheme must pass the LPA design review panel - this is not optional, it is where schemes live or die.`;
  } else if(inOA) {
    caNote = ` OA designation means the GLA maintains a monitoring interest in planning decisions here. LPA refusal of a well-argued scheme can be appealed with GLA support - an important backstop that changes the negotiating dynamic.`;
  }
  
  return `<p style="font:400 12px/1.75 Inter,sans-serif;color:#374151;margin-bottom:10px">${planNarrative}${caNote}</p>`;
}

function synthesisArchitecture(si) {
  const F = si.factors || {};
  const hf = si.heritage_framework || {};
  const s = si.site || {};
  const sky = F.sky || {};
  const herit = F.heritage || {};
  const val = F.value || {};
  
  const heritTier = hf.tier || 'clean';
  const skyScore = sky.score || 5;
  const maxF = s.max_floors || 10;
  const maxH = s.max_h || 30;
  const plotM2 = s.plot_m2 || s.plot_area || 1000;
  const erv = val.erv || 700;
  
  // Floor plate + core triangulation
  const plateSizeEst = Math.round(plotM2 * 0.65); // 65% plot coverage
  const coreM2 = Math.round(plateSizeEst * 0.22);
  const leaseSpan = plateSizeEst >= 1500 ? 11 : plateSizeEst >= 800 ? 9 : 7;
  const structGrid = leaseSpan >= 10 ? 'composite steel frame (10-14m spans achievable)' : leaseSpan >= 8 ? 'RC flat slab or composite (8-10m spans)' : 'RC flat slab (7m min clear span achievable)';
  
  // BSA check
  const bsa18 = maxH >= 18 || maxF >= 6;
  const bsa30 = maxH >= 30 || maxF >= 10;
  
  // Carbon position
  let carbonNarrative = '';
  if(heritTier === 'blocking' || heritTier === 'navigable') {
    carbonNarrative = `Retrofit and adaptive reuse strategies carry significantly lower embodied carbon than demolition and rebuild - typically 30-60% less. The heritage constraint and the carbon imperative align here: the most defensible planning argument and the most sustainable approach are the same strategy.`;
  } else if(heritTier === 'clean' && maxF >= 10) {
    carbonNarrative = `New build at this scale carries a substantial embodied carbon burden. GLA policy now requires a whole-life carbon assessment from RIBA Stage 2. BREEAM Excellent is the minimum credible target; the carbon narrative in the Design and Access Statement will be scrutinised.`;
  } else {
    carbonNarrative = `Embodied carbon should be modelled from RIBA Stage 2. At ${maxF}F, a new build scheme in ${heritTier === 'manageable' ? 'a managed heritage context' : 'a clean site'} has a clear path to BREEAM Excellent. Circular economy requirements (GLA SPG) apply to schemes above 1,000m² GIA.`;
  }
  
  // Massing constraint narrative
  let massingNarrative = `At an estimated ${plateSizeEst}m² plate, the core takes approximately ${coreM2}m² (22%) leaving a net lettable plate of ~${plateSizeEst - coreM2}m² NIA per floor. To achieve the RICS minimum 7m clear lease span, a ${structGrid} is indicated. `;
  if(bsa30) massingNarrative += `The BSA 30m threshold requires a second staircase - this adds core area and reduces NIA efficiency on each floor above this point. `;
  massingNarrative += `The architectural task is to maximise the net-to-gross ratio while maintaining the lease span required by institutional occupiers.`;
  
  return `<p style="font:400 12px/1.75 Inter,sans-serif;color:#374151;margin-bottom:10px">${massingNarrative}</p><p style="font:400 12px/1.75 Inter,sans-serif;color:#374151">${carbonNarrative}</p>`;
}


// ── Dev Numbers renderer ──────────────────────────────────────────────────────
function renderDevNumbers(si) {
  const F = si.factors || {};
  const s = si.site || {};
  const val = F.value || {};
  const maxF = s.max_floors || 10;
  const maxH = s.max_h || 30;
  const plotM2 = s.plot_m2 || s.plot_area || 1000;
  const erv = val.erv || 700;
  const niy = val.niy || 4.75;
  const plateSizeEst = Math.round(plotM2 * 0.65);
  const niaPF = Math.round(plateSizeEst * 0.78 * 0.78);
  const totalNIA = niaPF * maxF;
  const gdvEst = (Math.round(totalNIA * erv / 1e5) / 10).toFixed(1);
  const tdc = (Math.round(totalNIA * 4200 / 1e5) / 10).toFixed(1);
  const bsa18 = maxH>=18||maxF>=6; const bsa30 = maxH>=30||maxF>=10; const bsa50 = maxH>=50||maxF>=16;
  const bsaLabel = bsa50?'BSA 50m+ - highest tier':bsa30?'BSA 30m+ - second staircase required':bsa18?'BSA 18m+ - enhanced fire strategy':'Below all BSA thresholds';
  const bsaColor = bsa50?'#dc2626':bsa30?'#d97706':bsa18?'#d97706':'#16a34a';
  
  const card = (val, unit, lbl) => `<div style="background:var(--surface2);border-radius:6px;padding:8px 10px;text-align:center"><div style="font:800 16px var(--mono);color:var(--text);letter-spacing:-1px">${val}<span style="font-size:10px;font-weight:400;color:var(--text4)">${unit}</span></div><div style="font:500 9px Inter,sans-serif;text-transform:uppercase;letter-spacing:.8px;color:var(--text4);margin-top:2px">${lbl}</div></div>`;
  
  return `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:10px">
    ${card(maxF,'F','Max floors')}
    ${card(maxH,'m','Max height')}
    ${card(plotM2.toLocaleString(),'m²','Plot area')}
    ${card('£'+erv,'/m²','ERV NIA')}
    ${card(niy.toFixed(2),'%','NIY')}
    ${card('£'+gdvEst,'M','GDV est.')}
  </div>
  <div style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:4px;border:1px solid ${bsaColor}30;background:${bsaColor}0d;margin-bottom:4px">
    <span style="width:6px;height:6px;border-radius:50%;background:${bsaColor};flex-shrink:0"></span>
    <span style="font:600 9px Inter,sans-serif;color:${bsaColor}">${bsaLabel}</span>
  </div>
  <div style="font:400 10px/1.5 Inter,sans-serif;color:var(--text4);margin-top:4px">GDV estimate assumes ${Math.round(plateSizeEst * 0.65 * 0.78)}m² NIA/floor at ERV £${erv}/m² · illustrative only</div>`;
}

// ── Export ───────────────────────────────────────────────────────────────────
if (typeof module !== 'undefined') module.exports = { computeSiteScore, renderIntelligenceT1, renderIntelligenceT2, scoreRingSVG };

// ── Heritage Risk Panel ──────────────────────────────────────────────────────
function renderHeritageRisk(si) {
  const hf = si.heritage_framework;
  if (!hf) return '';
  const TIER_COLOR = { blocking:'#dc2626', navigable:'#ea580c', manageable:'#d97706', clean:'#059669' };
  const TIER_BG    = { blocking:'#fef2f2', navigable:'#fff7ed', manageable:'#fffbeb', clean:'#f0fdf4' };
  const TIER_LABEL = { blocking:'Blocking Constraint', navigable:'Navigable - Strategy Required', manageable:'Manageable', clean:'Clean Run' };
  const col = TIER_COLOR[hf.tier] || '#6b7280';
  const bg  = TIER_BG[hf.tier]   || '#f9fafb';
  return `<div style="background:${bg};border:1px solid ${col}33;border-radius:8px;padding:12px 14px;margin-bottom:10px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
      <span style="font:700 10px 'Inter',sans-serif;text-transform:uppercase;letter-spacing:1px;color:${col}">Heritage Risk</span>
      <span style="font:700 11px 'Inter',sans-serif;color:${col}">${TIER_LABEL[hf.tier]}</span>
    </div>
    <div style="font:400 11px/1.6 'Inter',sans-serif;color:#374151;margin-bottom:8px">${hf.verdict}</div>
    <div style="border-top:1px solid ${col}22;padding-top:7px">
      <div style="font:600 9px 'Inter',sans-serif;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;margin-bottom:4px">Rocketship Conditions</div>
      <div style="font:400 10px/1.5 'Inter',sans-serif;color:#6b7280">${hf.rocketship}</div>
    </div>
  </div>`;
}

// ── Site Strategy Panel ──────────────────────────────────────────────────────
function renderSiteStrategy(si) {
  const F = si.factors || {};
  const hf = si.heritage_framework || {};
  const tier = hf.tier || 'clean';
  const score = si.opportunity_score || 65;
  const skyScore = (F.sky || {}).score || 5;
  
  // ── Heritage-consistent strategy options ──────────────────────────────────
  // Rules: blocking = no new build recommendation; must flag heritage navigation
  // navigable = partial strategies only with strong heritage caveat
  // manageable = new build with heritage response required
  // clean = all strategies viable
  
  const STRATEGIES = {
    blocking: [
      {
        label: 'Heritage-Led Retrofit',
        icon: '⟳',
        desc: 'The heritage designation on this site constrains demolition significantly. The viable route is sensitive refurbishment and adaptive reuse — retaining the existing structure while upgrading its performance and use.',
        why: 'Any proposal involving significant demolition will face a high bar from the LPA and likely Historic England objection. The path of least resistance — and strongest planning precedent — is retrofit with a clearly articulated conservation philosophy.',
        carbon: 'Retaining existing structure avoids embodied carbon from demolition and reconstruction. Aligns with RICS Whole Life Carbon methodology.',
        viable: true
      },
      {
        label: 'Facade Retention + Internal Rebuild',
        icon: '□',
        desc: 'Retain and restore the principal facade(s) — particularly those that define the heritage character — while rebuilding internal structure to modern performance standards.',
        why: 'Widely accepted by LPAs in designated areas when the case is made that the existing internal structure is technically unviable. Requires a thorough structural survey demonstrating necessity. Conservation officer engagement is essential at RIBA Stage 1.',
        carbon: 'Facade retention reduces structural embodied carbon versus full demolition. Internal rebuild still carries embodied carbon cost — offset by retained envelope.',
        viable: true
      }
    ],
    navigable: [
      {
        label: 'Partial Demolition + Sensitive Extension',
        icon: '+',
        desc: 'Retain heritage-significant elements (typically front elevation, primary bays, key streetscape features) while demolishing less significant rear additions to create development depth and height.',
        why: 'The heritage constraint here is navigable but real. Partial retention gives the LPA a conservation win while enabling meaningful new development. Requires heritage impact assessment at RIBA Stage 2.',
        carbon: 'Partial retention is more carbon-efficient than full demolition. Hybrid embodied carbon — retained elements offset new construction.',
        viable: true
      },
      {
        label: 'Adaptive Reuse',
        icon: '⟳',
        desc: 'Change of use and internal reconfiguration without significant structural change. Appropriate for B-listed or locally listed buildings where the planning history suggests retention preference.',
        why: 'When the heritage designation is navigable but the planning officer will require justification for any demolition, adaptive reuse offers a lower-risk planning route with faster programme.',
        carbon: 'Lowest embodied carbon route. Retains all existing structure. Strong alignment with GLA and RICS sustainability policy.',
        viable: true
      }
    ],
    manageable: [
      {
        label: 'New Build with Heritage Response',
        icon: '▲',
        desc: 'Full redevelopment is viable, but the design must articulate a clear response to the surrounding heritage context — scale, material, massing rhythm. Heritage assets nearby do not block development; they shape it.',
        why: 'The heritage here is manageable: present and relevant to design decisions, but not a block to development consent. A well-designed scheme that contextualises itself appropriately has strong precedent for approval.',
        carbon: 'New build baseline. BREEAM Excellent or Passivhaus standard should be targeted. Embodied carbon budget to be demonstrated against RICS benchmark in DAS.',
        viable: true
      },
      {
        label: 'Facade Retention + Vertical Extension',
        icon: '↑',
        desc: 'Retain ground and lower floors to address heritage frontage requirements, with a clearly expressed new build above. The vertical break should be legible — "old below, new above" is a well-accepted design approach.',
        why: 'A strong option when the street-level heritage character is what the LPA cares about. Height gains above that threshold can be ambitious if the design language is confident and clearly differentiated.',
        carbon: 'Hybrid approach — retained base reduces embodied carbon of lower floors. Upper floors carry new build carbon cost.',
        viable: true
      }
    ],
    clean: [
      {
        label: 'New Build - Full Redevelopment',
        icon: '▲',
        desc: 'No heritage constraint on this site. Full demolition and new build is the appropriate primary strategy. Design ambition is unconstrained by heritage — pursue the highest quality scheme the site can support.',
        why: 'Clean heritage context means the conversation with the LPA is about design quality, massing, programme and planning policy — not conservation. The design team can lead with aspiration rather than negotiation.',
        carbon: 'New build baseline. BREEAM Excellent minimum. Full embodied carbon budget should be modelled from RIBA Stage 2 in line with RICS Whole Life Carbon methodology.',
        viable: skyScore >= 6
      },
      {
        label: 'Phased Intensification',
        icon: '++',
        desc: 'Where the existing building has residual value, a phased approach — partial retention in Phase 1, full redevelopment in Phase 2 — can reduce initial capital outlay while preserving optionality.',
        why: 'Useful when the site has a sitting tenant, when funding is staged, or when planning risk justifies a more conservative first application. Phase 1 consent provides proof-of-concept for Phase 2.',
        carbon: 'Phase 1 embodied carbon lower if partial retention. Phase 2 carries full new build cost. Lifecycle carbon model should span both phases.',
        viable: true
      }
    ]
  };

  const strategies = STRATEGIES[tier] || STRATEGIES.clean;
  
  if (!strategies || strategies.length === 0) return '';
  
  const rows = strategies.filter(s => s.viable !== false).map(s => `
    <div style="border:1px solid #e5e7eb;border-radius:8px;padding:12px 14px;margin-bottom:8px;background:#fafafa">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
        <span style="font:700 14px Inter,sans-serif;color:#1d4ed8;line-height:1">${s.icon}</span>
        <span style="font:700 11px Inter,sans-serif;color:#0f172a;letter-spacing:-.1px">${s.label}</span>
      </div>
      <div style="font:400 11px/1.65 Inter,sans-serif;color:#374151;margin-bottom:6px">${s.desc}</div>
      <div style="font:600 10px Inter,sans-serif;text-transform:uppercase;letter-spacing:.8px;color:#6b7280;margin-bottom:3px">Why this works here</div>
      <div style="font:400 10px/1.6 Inter,sans-serif;color:#6b7280;margin-bottom:6px">${s.why}</div>
      <div style="font:400 10px/1.5 Inter,sans-serif;color:#059669;border-top:1px solid #e5e7eb;padding-top:5px;margin-top:4px">
        <span style="font-weight:600">Carbon:</span> ${s.carbon}
      </div>
    </div>`).join('');

  const tierLabel = {blocking:'Heritage-Constrained Strategies Only',navigable:'Heritage-Sensitive Strategies',manageable:'Strategies (Heritage Response Required)',clean:'Viable Development Strategies'}[tier] || 'Viable Strategies';

  return `<div>
    <div style="font:700 9px Inter,sans-serif;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin-bottom:10px">${tierLabel}</div>
    ${rows}
  </div>`;
}

// ── No Go / Amber / Green verdict ────────────────────────────────────────────
function renderVerdict(si) {
  const score = computeSiteScore(si);
  const hf = si.heritage_framework;
  const tier = hf ? hf.tier : 'clean';
  let verdict, color, bg, border, icon;
  if (tier === 'blocking' && score < 50) {
    verdict = 'No Go'; color='#dc2626'; bg='#fef2f2'; border='#fca5a5'; icon='✕';
  } else if (score < 55 || tier === 'blocking') {
    verdict = 'Due Diligence Required'; color='#b45309'; bg='#fffbeb'; border='#fcd34d'; icon='⚠';
  } else if (score < 70 || tier === 'navigable') {
    verdict = 'Amber - Proceed with Strategy'; color='#d97706'; bg='#fffbeb'; border='#fcd34d'; icon='◐';
  } else if (score < 80) {
    verdict = 'Green - Strong Opportunity'; color='#059669'; bg='#f0fdf4'; border='#86efac'; icon='●';
  } else {
    verdict = 'Green - Top Opportunity'; color='#059669'; bg='#ecfdf5'; border='#6ee7b7'; icon='✓';
  }
  return `<div style="background:${bg};border:2px solid ${border};border-radius:10px;padding:14px 18px;margin-bottom:14px;display:flex;align-items:center;gap:14px">
    <span style="font:900 22px 'Inter',sans-serif;color:${color}">${icon}</span>
    <div>
      <div style="font:800 15px 'Inter',sans-serif;color:${color};letter-spacing:-0.3px">${verdict}</div>
      <div style="font:400 10px 'Inter',sans-serif;color:#6b7280;margin-top:2px">Score ${score}/100 · Heritage: ${tier.charAt(0).toUpperCase()+tier.slice(1)}</div>
    </div>
  </div>`;
}
