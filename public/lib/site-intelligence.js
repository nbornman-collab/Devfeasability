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

// ── Export ───────────────────────────────────────────────────────────────────
if (typeof module !== 'undefined') module.exports = { computeSiteScore, renderIntelligenceT1, renderIntelligenceT2, scoreRingSVG };
