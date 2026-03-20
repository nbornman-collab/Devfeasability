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
    { key:'acquisition', label:'Title Stack',        f:F.acquisition, primary: F.acquisition.titles === 1 ? 'Single title' : F.acquisition.titles+' titles', secondary: F.acquisition.tenure+' · '+F.acquisition.jurisdiction },
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
    ['Title Stack',         F.acquisition.tenure+' · '+F.acquisition.titles+' title',     F.acquisition.score],
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
  const hf = si.heritage_framework;
  const tier = hf ? hf.tier : 'clean';
  // Derive viable strategies from heritage tier + site characteristics
  const F = si.factors;
  const skyScore = F && F.sky ? F.sky.score : 7;
  const herScore = F && F.heritage ? F.heritage.score : 7;
  const strategies = [];
  if (tier === 'blocking') {
    strategies.push({ label:'Adaptive Reuse', icon:'♻', why:'Listed fabric must be retained. Re-engineer the existing building for new use. Maximum planning certainty.', carbon:'Lowest embodied carbon. Retains existing structure.' });
    strategies.push({ label:'Partial Demolition + Extension', icon:'◧', why:'Remove later/poor-quality additions. Retain historic core. Negotiate heritage benefit with LPA.', carbon:'Medium - demolition of later additions only.' });
  } else if (tier === 'navigable') {
    strategies.push({ label:'Facade Retention', icon:'◫', why:'Retain historic street-level facade. New structure behind and above. Standard approach for navigable heritage settings.', carbon:'Moderate - new structure behind retained skin.' });
    strategies.push({ label:'Adaptive Reuse', icon:'♻', why:'Lowest risk route given heritage sensitivity. Re-engineer existing building. Design uplift through contemporary intervention.', carbon:'Lowest embodied carbon option.' });
    if (skyScore >= 7) strategies.push({ label:'Set-back Upper Floors', icon:'▲', why:'Step back from parapet at upper levels to reduce visual impact on listed setting. Enables additional storeys.', carbon:'Higher - full new build above retained lower floors.' });
  } else if (tier === 'manageable') {
    if (skyScore >= 7.5) strategies.push({ label:'New Build + Contextual Design', icon:'■', why:'Full redevelopment viable with strong contextual design response. Heritage Impact Assessment required. Design code must address character.', carbon:'Higher embodied carbon - offset by long operational life.' });
    strategies.push({ label:'Set-back Upper Floors', icon:'▲', why:'Retain/respect street-level character. Build above with contemporary set-back floors. NDHA/CA-sensitive approach.', carbon:'Medium - lower floors retained or rebuilt to match.' });
    strategies.push({ label:'Adaptive Reuse + Extension', icon:'◩', why:'Gut-refurb existing fabric and extend upward. Strong sustainability narrative for planning committee.', carbon:'Lowest option for this tier - retains existing structure.' });
  } else {
    if (skyScore >= 8) strategies.push({ label:'Full Redevelopment', icon:'■', why:'Clean site - maximum massing viable. No heritage constraint. Height and form limited only by local plan policy and design quality.', carbon:'Higher embodied carbon - offset by long operational life and performance.' });
    strategies.push({ label:'New Build - Phased', icon:'▣', why:'Phase delivery to manage cashflow and de-risk. Clean site allows flexible phasing strategy.', carbon:'Full new build - consider CLT or low-carbon structural frame.' });
    if (herScore >= 9) strategies.push({ label:'Adaptive Reuse', icon:'♻', why:'Even on a clean site, reuse may be viable if existing structure is sound. Strong ESG narrative.', carbon:'Best-in-class embodied carbon position.' });
  }
  const cards = strategies.map(s =>
    `<div style="background:#fff;border:1px solid #e5e7eb;border-radius:7px;padding:10px 12px;margin-bottom:7px">
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:5px">
        <span style="font-size:14px">${s.icon}</span>
        <span style="font:700 12px 'Inter',sans-serif;color:#0c0f1a">${s.label}</span>
      </div>
      <div style="font:400 10px/1.5 'Inter',sans-serif;color:#374151;margin-bottom:5px">${s.why}</div>
      <div style="font:500 9px 'Inter',sans-serif;color:#059669;text-transform:uppercase;letter-spacing:.5px">Carbon: ${s.carbon}</div>
    </div>`
  ).join('');
  return `<div>
    <div style="font:500 10px 'Inter',sans-serif;color:#6b7280;margin-bottom:10px">Viable development strategies for this site based on heritage tier, height potential and planning context.</div>
    ${cards}
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
