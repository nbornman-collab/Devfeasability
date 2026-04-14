const fs = require('fs');
const vm = require('vm');

const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(
  fs.readFileSync('/data/.openclaw/workspace/devfeasibility-app/public/lib/site-model.js', 'utf8'),
  sandbox,
  { filename: 'site-model.js' }
);
const HeadroomSiteModel = sandbox.window.HeadroomSiteModel;

function loadJson(path) {
  const raw = JSON.parse(fs.readFileSync(path, 'utf8'));
  return Array.isArray(raw) ? raw : (raw.sites || Object.values(raw));
}

function toNumber(...vals) {
  for (const v of vals) {
    if (v === null || v === undefined || v === '') continue;
    const n = Number(String(v).replace(/[ab]$/i, ''));
    if (Number.isFinite(n)) return n;
  }
  return 0;
}

function canonicalSite(site) {
  return HeadroomSiteModel.buildCanonicalSite({
    ...site,
    borough: site.borough || site._borough || 'City of London'
  });
}

function strategy(site, aggressive, addF) {
  const canonical = canonicalSite(site);
  const text = `${site.name || ''} ${site.address || ''}`.toLowerCase();
  if (canonical.typology === 'city-oversite' || canonical.typology === 'oversite') return 'Oversite / rail deck intensification';
  if (canonical.typology === 'southwark-restructure' || canonical.typology === 'estate-restructure') return 'Estate / campus restructure';
  if (/(garage|depot|trading estate|industrial|warehouse|works|car park|vacant)/.test(text)) return 'Full redevelopment';
  if (aggressive && addF >= 6) return 'Partial retention + major intensification';
  if (addF >= 4) return 'Adaptive reuse + major vertical extension';
  return 'Commercial uplift';
}

const files = [
  '/data/.openclaw/workspace/devfeasibility-app/public/data/southwark-sites.json',
  '/data/.openclaw/workspace/devfeasibility-app/public/data/city-sites.json',
  '/data/.openclaw/workspace/devfeasibility-app/public/data/hackney-sites.json'
];

const rows = files.flatMap(loadJson).map(site => {
  const flags = site.flags || {};
  const canonical = canonicalSite(site);
  const policy = canonical.planningPolicy || {};
  const fabric = canonical.fabricProfile || {};
  const mf = toNumber(canonical.maxFloors, site.max_floors, site.mf, 0);
  const ef = toNumber(canonical.existingFloors, site.existing_floors, 0);
  const addF = Math.max(0, mf - ef);
  const plot = toNumber(canonical.plotM2, site.plot, site.plotM2, site.site_area, 0);
  const ptal = toNumber(flags.ptal, site.ptal, 0);
  const aggressiveCandidate = !!(fabric.redevelopmentFriendly && fabric.lowHeritage);
  const precedent = (policy.majorUplift ? 3 : 0) + (flags.inOA || flags.oa ? 2 : 0) + (flags.inCAZ || flags.caz ? 2 : 0);
  const marketExcitement =
    ((policy.planScoreBoost || 0) * 4) +
    (aggressiveCandidate ? 14 : fabric.lowHeritage ? 5 : 0) +
    Math.min(addF * 2.2, 28) +
    Math.min(ptal, 6) +
    precedent +
    (plot >= 2000 ? 6 : plot >= 1000 ? 3 : 0);

  return {
    name: site.name || site.address,
    borough: site.borough || site._borough || 'City of London',
    address: site.address || '',
    zone: policy.zone,
    maxFloors: mf,
    existingFloors: ef,
    addF,
    ptal,
    typology: canonical.typology,
    aggressiveCandidate,
    strategy: strategy(site, aggressiveCandidate, addF),
    marketExcitement: Math.round(marketExcitement),
    watchout: flags.inConservation ? 'Conservation sensitivity' : (site.nhle_tier === 'blocking' ? 'Heritage block risk' : 'Needs fast planning sense-check')
  };
});

const exciting = rows
  .filter(r => r.marketExcitement >= 28 && r.addF >= 5)
  .sort((a,b) => b.marketExcitement - a.marketExcitement || b.addF - a.addF)
  .slice(0, 20);

console.log(JSON.stringify(exciting, null, 2));
