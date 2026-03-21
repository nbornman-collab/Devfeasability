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
// Voice: opinionated but not declarative. UK planning is nuanced.
// Lead with the conclusion, show the working. Never fluffy, never overconfident.
// Good: "on the balance of it" / "the case stacks up for" / "a well-argued scheme
//        should find support" / "the evidence points toward" / "worth testing at pre-app"
// Bad:  "will approve" / "the only question is" / "will not object" / "guaranteed"

function synthesisDevScope(si) {
  const F = si.factors || {};
  const hf = si.heritage_framework || {};
  const s = si.site || {};
  const sky = F.sky || {}; const val = F.value || {}; const mom = F.momentum || {};
  const trans = F.transport || {};

  const skyScore = sky.score || 5;
  const heritTier = hf.tier || 'clean';
  const heritScore = hf.score || 7;
  const inOA = !!(mom.opportunity_area);
  const oaName = inOA ? (mom.opportunity_area.name || 'an Opportunity Area') : null;
  const maxF = s.max_floors || 10;
  const maxH = s.max_h || 30;
  const plotM2 = s.plot_m2 || s.plot_area || 1000;
  const bsa18 = maxH >= 18 || maxF >= 6;
  const bsa30 = maxH >= 30 || maxF >= 10;
  const bsa50 = maxH >= 50 || maxF >= 16;
  const erv = val.erv || 700;
  const plateSizeEst = Math.round(plotM2 * 0.65);
  const niaPF = Math.round(plateSizeEst * 0.78 * 0.78);
  const totalNIA = niaPF * maxF;

  // ── Potential narrative (sky + heritage + OA triangulated)
  let potentialNarrative = '';
  if(skyScore >= 7 && heritTier === 'clean' && inOA) {
    potentialNarrative = `Sky availability (${skyScore.toFixed(1)}/10), a clean heritage position (${heritScore.toFixed(1)}/10), and ${oaName} designation are three factors that rarely align in central London. On the balance of it, the vertical development case is well-supported here. The GLA expects density in this location - a well-argued scheme should find that the policy conversation is about quantum and design quality, not whether development is appropriate.`;
  } else if(skyScore >= 7 && heritTier === 'clean') {
    potentialNarrative = `Sky availability (${skyScore.toFixed(1)}/10) is strong and the heritage context is clean (${heritScore.toFixed(1)}/10) - the vertical envelope looks genuinely open. Without an OA designation, the LPA holds more discretion on massing; the case stacks up for a tall scheme but the design argument will need to do real work on contextual fit and public realm. Worth testing at pre-app early.`;
  } else if(skyScore >= 5 && heritTier === 'manageable') {
    potentialNarrative = `Sky availability (${skyScore.toFixed(1)}/10) gives headroom to work with, but the heritage position (manageable tier, ${heritScore.toFixed(1)}/10) shapes what that headroom can actually become. On balance, development at scale is credible here - the design response to the heritage context is what opens or closes the planning case. A scheme that engages the context confidently is in a stronger position than one that tries to minimise its impact.`;
  } else if(skyScore >= 5 && heritTier === 'navigable') {
    potentialNarrative = `The sky is available (${skyScore.toFixed(1)}/10) but the heritage designation (navigable tier, ${heritScore.toFixed(1)}/10) means the development envelope is meaningfully constrained. Partial retention or adaptive reuse strategies are likely to find more support than full redevelopment. The evidence points toward a scheme that works with what is there rather than starting from scratch.`;
  } else if(skyScore < 5) {
    potentialNarrative = `Available Sky (${skyScore.toFixed(1)}/10) is the binding constraint on this site - neighbouring heights or protected viewing corridors limit the vertical envelope regardless of planning policy. On the balance of available data, the opportunity here is in horizontal intensification or intensification of use, not additional height. Modelling should reflect that ceiling before testing any financial case.`;
  } else if(heritTier === 'blocking') {
    potentialNarrative = `The heritage designation sits in the blocking tier (${heritScore.toFixed(1)}/10) and is the dominant constraint on development scope. Despite reasonable sky availability (${skyScore.toFixed(1)}/10), the weight of heritage policy points toward a strategy built around retention, restoration, or sensitive extension - not clearance. A well-resourced Heritage Impact Assessment from the outset is not optional here, it is the foundation of any viable planning case.`;
  }

  // ── BSA cost/programme triangulation
  let bsaNarrative = '';
  if(bsa50) {
    bsaNarrative = `At ${maxF}F/${maxH}m, the scheme sits above the BSA 50m threshold - the highest regulatory tier. Full higher-risk building regime, enhanced structural specification, and second staircase all apply. Based on comparable schemes, this adds in the order of £2-3M and 6-12 months to programme. At current ERVs of £${erv}/m², the return curve can carry this - but the margin is thinner and the delivery risk is higher than a sub-30m scheme on the same site.`;
  } else if(bsa30) {
    bsaNarrative = `At ${maxF}F, the scheme crosses the BSA 30m threshold. A second staircase is required - typically £1.2-1.5M in cost and approximately 280-340m² of NIA surrendered to additional core. On balance, schemes in this range need to demonstrate that the GDV uplift from additional floors comfortably outweighs those costs before committing to the upper floors. Worth stress-testing the return curve at 9F and 12F before fixing the massing strategy.`;
  } else if(bsa18) {
    bsaNarrative = `At ${maxF}F, the scheme sits in the BSA 18m zone - enhanced fire strategy but no second staircase mandate. It is worth pressure-testing whether 1-2 additional floors above 18m meaningfully improve the return curve; at typical construction costs of £4,200/m², the BSA compliance uplift at 18m is manageable and may be worth absorbing for the additional NIA.`;
  } else {
    bsaNarrative = `At ${maxF}F, the scheme sits below all BSA thresholds - single staircase, standard fire strategy, no higher-risk building regime. That is a meaningful cost and programme advantage that should be reflected in the development appraisal. Schemes in this range typically have lower delivery risk than taller comparable sites.`;
  }

  return `<p style="font:400 12px/1.75 Inter,sans-serif;color:#374151;margin-bottom:10px">${potentialNarrative}</p><p style="font:400 12px/1.75 Inter,sans-serif;color:#374151">${bsaNarrative}</p>`;
}

function synthesisPlanning(si) {
  const F = si.factors || {};
  const hf = si.heritage_framework || {};
  const s = si.site || {};
  const mom = F.momentum || {};
  const acq = F.acquisition || {};

  const planScore = mom.score || 5;
  const heritTier = hf.tier || 'clean';
  const heritScore = hf.score || 7;
  const inOA = !!(mom.opportunity_area);
  const oaName = inOA ? (mom.opportunity_area.name || 'an Opportunity Area') : null;
  const borough = si.borough || 'this borough';
  const inConservation = s.conservation_area || false;
  const titles = (acq.titles || (F.acquisition || {}).titles) || 1;

  // ── Planning appetite + heritage + OA triangulated
  let planNarrative = '';
  if(planScore >= 7 && inOA && (heritTier === 'clean' || heritTier === 'manageable')) {
    planNarrative = `Planning Appetite sits at ${planScore.toFixed(1)}/10 and the ${oaName} designation means the GLA actively monitors and supports development in this location. Combined with a ${heritTier} heritage position, the pre-app conversation is likely to focus on scheme quality and planning contributions rather than principle of development. That is a materially better starting position than most sites in ${borough} - the case is constructable without the usual uphill argument on whether development is appropriate at all.`;
  } else if(planScore >= 6 && heritTier === 'manageable') {
    planNarrative = `Planning Appetite of ${planScore.toFixed(1)}/10 suggests the LPA is broadly receptive to development of this type here - but the heritage position (manageable tier, ${heritScore.toFixed(1)}/10) means design quality is the variable that makes or breaks the case. On the balance of comparable approvals, schemes that arrive at pre-app with a confident heritage response - not a defensive one - tend to find more constructive engagement. The planning case is there to be made; the architecture has to earn it.`;
  } else if(planScore >= 6 && heritTier === 'navigable') {
    planNarrative = `Planning Appetite (${planScore.toFixed(1)}/10) indicates the LPA has precedent for approving development in this context, but the navigable heritage tier adds real complexity. On balance, a partial-retention or façade-led strategy is likely to find more planning traction than full redevelopment. Pre-app is essential here - the LPA's position on the heritage strategy should be tested before any significant design investment.`;
  } else if(planScore < 5 && (heritTier === 'blocking' || heritTier === 'navigable')) {
    planNarrative = `Planning Appetite (${planScore.toFixed(1)}/10) combined with a ${heritTier} heritage tier signals a difficult planning environment - not impossible, but one that demands a well-resourced approach. The weight of evidence points toward a longer process: professional Heritage Impact Assessment, multiple pre-app rounds, and a design team with listed building or conservation area experience. Budget the process accordingly before committing to the site.`;
  } else if(heritTier === 'blocking') {
    planNarrative = `The blocking heritage tier (${heritScore.toFixed(1)}/10) sits alongside a Planning Appetite of ${planScore.toFixed(1)}/10. The planning case for any significant intervention here is not straightforward. On the balance of it, the viable path involves working closely with the heritage constraint from day one - a Heritage Impact Assessment and early heritage consultant engagement are prerequisites, not options.`;
  } else {
    planNarrative = `Planning Appetite of ${planScore.toFixed(1)}/10 reflects the general policy position for sites of this type in ${borough}. The evidence from comparable decisions in this area suggests a well-designed scheme with a clear planning rationale should find engagement at pre-app - but ${borough} planning committees are not predictable, and the quality of the submission counts.`;
  }

  // ── Conservation area / OA modifier
  let caNote = '';
  if(inConservation && inOA) {
    caNote = ` The conservation area designation and OA status create a nuanced policy environment: density is expected, but character is protected. That tension is real and needs to be addressed head-on in the Design and Access Statement - it cannot be papered over.`;
  } else if(inConservation) {
    caNote = ` The conservation area designation modifies PD rights and raises the design quality bar materially. Design Review Panel engagement is likely to be required - treat it as part of the process, not an obstacle to manage around.`;
  } else if(inOA) {
    caNote = ` OA status means that if the LPA declines a well-argued scheme, the GLA's monitoring role gives the applicant a meaningful backstop - that is not a guarantee of support but it does change the negotiating dynamic at appeal.`;
  }

  // ── Title stack note if complex
  let titleNote = '';
  if(titles >= 3) {
    titleNote = ` The title stack (${titles} titles) adds an acquisition layer to the planning timeline. Assembling control before spending on pre-app is worth considering - fractured ownership can become a material planning constraint if it is not resolved before submission.`;
  }

  return `<p style="font:400 12px/1.75 Inter,sans-serif;color:#374151;margin-bottom:10px">${planNarrative}${caNote}${titleNote}</p>`;
}

function synthesisArchitecture(si) {
  const F = si.factors || {};
  const hf = si.heritage_framework || {};
  const s = si.site || {};
  const sky = F.sky || {};
  const val = F.value || {};
  const mom = F.momentum || {};

  const heritTier = hf.tier || 'clean';
  const heritScore = hf.score || 7;
  const skyScore = sky.score || 5;
  const maxF = s.max_floors || 10;
  const maxH = s.max_h || 30;
  const plotM2 = s.plot_m2 || s.plot_area || 1000;
  const erv = val.erv || 700;
  const inOA = !!(mom.opportunity_area);

  // ── Floor plate + core + lease span triangulation
  const plateSizeEst = Math.round(plotM2 * 0.65);
  const coreM2 = Math.round(plateSizeEst * 0.22);
  const niaPF = plateSizeEst - coreM2;
  const bsa30 = maxH >= 30 || maxF >= 10;
  const bsa18 = maxH >= 18 || maxF >= 6;
  const leaseSpan = plateSizeEst >= 1500 ? 11 : plateSizeEst >= 800 ? 9 : 7;
  const meetsMinSpan = leaseSpan >= 7;
  const structSystem = leaseSpan >= 10 ? 'composite steel or post-tensioned concrete (10-14m column-free spans)' : leaseSpan >= 8 ? 'RC flat slab or composite frame (8-10m spans)' : 'RC flat slab - 7m clear span is achievable but the minimum for institutional occupiers';

  let massingNarrative = `At an estimated ${plateSizeEst}m² gross plate, the core allocation of ~${coreM2}m² (22%) leaves approximately ${niaPF}m² NIA per floor. ${meetsMinSpan ? `A ${structSystem} would achieve the ${leaseSpan}m clear lease span that institutional occupiers require` : `A ${structSystem} is needed - the plate geometry is tight and the structural grid will need careful resolution to meet the 7m minimum span`}. `;
  if(bsa30) {
    massingNarrative += `The second staircase requirement above 30m eats further into that NIA figure - on a plate of this size the efficiency loss is material and should be modelled before committing to floors above that threshold. `;
  } else if(bsa18) {
    massingNarrative += `The scheme sits below the second staircase threshold (30m), which means the plate efficiency on upper floors is not penalised by additional core. That is a quiet advantage over taller schemes competing for similar occupiers. `;
  }
  massingNarrative += `The net-to-gross ratio is where the architecture earns its money - a well-resolved core and structural grid on this plate could realistically hold 78-82% efficiency.`;

  // ── Carbon + sustainability triangulated with heritage
  let carbonNarrative = '';
  if(heritTier === 'blocking' || heritTier === 'navigable') {
    carbonNarrative = `The heritage position and the carbon imperative point in the same direction here. Retrofit and adaptive reuse carry significantly lower embodied carbon than demolition and rebuild - typically 30-60% less across the full lifecycle. On the balance of it, a retention-led strategy is likely to be both the most plannable and the most defensible on sustainability grounds. That alignment should be made explicit in the Design and Access Statement - it is a planning asset, not just an environmental one.`;
  } else if(heritTier === 'clean' && maxF >= 10) {
    carbonNarrative = `New build at ${maxF}F carries a substantial embodied carbon burden that GLA policy now scrutinises from RIBA Stage 2 onwards. BREEAM Excellent is the credible minimum; schemes that can demonstrate a genuine circular economy strategy (GLA SPG) tend to find more constructive engagement at planning. The carbon story in the D&A Statement needs to be substantive - GLA and LPA officers in this context are experienced at spotting a thin narrative.`;
  } else {
    carbonNarrative = `Embodied carbon modelling should be initiated at RIBA Stage 2 - not retrofitted at Stage 3. At ${maxF}F in ${heritTier === 'manageable' ? 'a managed heritage context' : 'a clean development context'}, BREEAM Excellent is achievable without heroic measures. GLA circular economy requirements apply above 1,000m² GIA - worth understanding the implication for specification and procurement before Stage 3.`;
  }

  // ── Programme note
  const preAppMonths = (heritTier === 'blocking' || heritTier === 'navigable') ? '6-9' : '3-5';
  const planningMonths = maxF >= 10 ? '18-24' : '12-18';
  const buildMonths = maxF >= 12 ? '30-36' : maxF >= 8 ? '24-30' : '18-24';
  const progNote = `Indicative programme: pre-app ${preAppMonths} months, planning decision ${planningMonths} months post-submission, construction ${buildMonths} months. Total end-to-end from site control: ${(parseInt(preAppMonths)+parseInt(planningMonths)+parseInt(buildMonths)+12)} months is a reasonable planning assumption before testing against lender requirements.`;

  return `<p style="font:400 12px/1.75 Inter,sans-serif;color:#374151;margin-bottom:10px">${massingNarrative}</p><p style="font:400 12px/1.75 Inter,sans-serif;color:#374151;margin-bottom:10px">${carbonNarrative}</p><p style="font:400 11px/1.6 Inter,sans-serif;color:#6b7280">${progNote}</p>`;
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
