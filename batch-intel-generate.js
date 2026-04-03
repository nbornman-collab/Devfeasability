#!/usr/bin/env node
/**
 * Batch intelligence file generator for sites without intel files.
 * 1. Reverse geocode to get postcode
 * 2. Fetch OSM building polygon via Overpass
 * 3. Generate minimal intelligence file with polygon + basic data
 * 4. Run consolidation lookup via PropertyData
 * 5. Update site JSONs with consolidation data
 */

const fs = require('fs');
const path = require('path');

const INTEL_DIR = path.join(__dirname, 'public', 'lib');
const DATA_DIR = path.join(__dirname, 'public', 'data');
const PD_KEY = 'ZUMC9NNHVH';
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

const DELAY_MS = 1500; // rate limit delay
const OVERPASS_DELAY = 2000; // overpass is stricter

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchJSON(url, timeout = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const r = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

// Get existing intel site names
function getExistingIntel() {
  const names = new Set();
  const files = fs.readdirSync(INTEL_DIR).filter(f => f.startsWith('intelligence-') && f.endsWith('.js'));
  for (const fname of files) {
    const content = fs.readFileSync(path.join(INTEL_DIR, fname), 'utf8');
    const nm = content.match(/site:\s*["']([^"']*)["']/);
    if (nm) names.add(nm[1].trim());
  }
  return names;
}

// Get sites missing intel files
function getMissingSites() {
  const existing = getExistingIntel();
  const missing = [];
  for (const jf of ['southwark-sites.json', 'city-sites.json', 'hackney-sites.json']) {
    const filePath = path.join(DATA_DIR, jf);
    const sites = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const arr = Array.isArray(sites) ? sites : (sites.sites || Object.values(sites));
    for (const s of arr) {
      const name = s.name || s.address || '';
      if (name && !existing.has(name)) {
        missing.push({
          name,
          address: s.address || s.name || '',
          lat: parseFloat(s.lat) || 0,
          lng: parseFloat(s.lng) || 0,
          borough: s.borough || '',
          use: s.use || '',
          maxFloors: s.max_floors || s.maxFloors || 8,
          score: parseInt(s.score) || 0,
          inOA: !!(s.oa || s.in_oa),
          inCAZ: !!(s.caz || s.in_caz),
          inCons: !!(s.in_cons || s.cons),
          ptal: s.ptal || '',
          hectares: s.hectares || (s.plot ? s.plot / 10000 : 0),
          plotM2: s.plot || Math.round((s.hectares || 0.05) * 10000),
          source: jf
        });
      }
    }
  }
  return missing;
}

// Reverse geocode to get postcode
async function getPostcode(lat, lng) {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&country=gb&types=postcode`;
    const data = await fetchJSON(url);
    if (data.features && data.features.length > 0) {
      return data.features[0].text || data.features[0].place_name;
    }
  } catch (e) {}
  return null;
}

// Fetch OSM building polygon via Overpass
async function getOSMPolygon(lat, lng, address) {
  // Try address match first, then radius
  const strategies = [];

  // Strategy 1: address match
  const addrMatch = address.match(/^(\d[\-\d]*[a-zA-Z]?)\s+(.+?)(?:,.*)?$/);
  if (addrMatch) {
    const num = addrMatch[1];
    const street = addrMatch[2].replace(/,.*$/, '').trim();
    const q = `[out:json][timeout:8];way["building"]["addr:housenumber"="${num}"]["addr:street"~"${street}",i](around:200,${lat},${lng});out body;>;out skel qt;`;
    strategies.push(q);
  }

  // Strategy 2: radius search
  const q2 = `[out:json][timeout:8];(way["building"](around:40,${lat},${lng}););out body;>;out skel qt;`;
  strategies.push(q2);

  for (const query of strategies) {
    try {
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
      const data = await fetchJSON(url, 12000);
      const elements = data.elements || [];
      const ways = elements.filter(e => e.type === 'way' && e.nodes && e.nodes.length >= 3);
      const nodes = elements.filter(e => e.type === 'node');
      const nodeMap = {};
      for (const n of nodes) nodeMap[n.id] = n;

      if (ways.length === 0) continue;

      // Filter out non-building ways (parks, green space, etc)
      const buildingWays = ways.filter(w => {
        const tags = w.tags || {};
        // Must have building tag OR be specifically tagged as a development site
        if (tags.building) return true;
        if (tags.landuse === 'construction' || tags.landuse === 'brownfield') return true;
        // Reject green space, parks, water
        if (tags.leisure || tags.landuse === 'grass' || tags.landuse === 'park' ||
            tags.landuse === 'recreation_ground' || tags.natural) return false;
        return true;
      });
      const usableWays = buildingWays.length > 0 ? buildingWays : ways;

      // Pick the largest way by node count (likely the main building)
      const bestWay = usableWays.sort((a, b) => (b.nodes || []).length - (a.nodes || []).length)[0];
      const coords = bestWay.nodes
        .map(nid => nodeMap[nid])
        .filter(Boolean)
        .map(n => [parseFloat(n.lon.toFixed(6)), parseFloat(n.lat.toFixed(6))]);

      if (coords.length < 3) continue;
      // Ensure closed
      if (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1]) {
        coords.push([coords[0][0], coords[0][1]]);
      }

      // Extract height info
      const tags = bestWay.tags || {};
      const height = parseFloat(tags.height) || parseFloat(tags['building:height']) || null;
      const levels = parseInt(tags['building:levels']) || null;

      return { coords, height, levels, name: tags.name || null };
    } catch (e) {
      // Try next strategy
    }
  }
  return null;
}

// Generate slug for filename
function toSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

// Generate intelligence file content
function generateIntelFile(site, polygon, postcode, osmData) {
  const existingHeight = osmData?.height || (site.maxFloors * 0.45 * 3.5);
  const existingFloors = osmData?.levels || Math.max(1, Math.round(site.maxFloors * 0.45));
  const plotArea = site.plotM2 || 500;
  const ftf = site.use === 'residential' || site.use === 'resi' ? 3.15 : (site.maxFloors <= 8 ? 3.5 : 4.0);
  const maxHeight = site.maxFloors * ftf;

  const polyStr = JSON.stringify(polygon);

  return `// Development Intelligence - ${site.name}
// Auto-generated batch intel file
const SITE_INTELLIGENCE = {
  polygon: ${polyStr},
  site: "${site.name.replace(/"/g, '\\"')}",
  borough: '${site.borough}',
  use: '${site.use || 'mixed'}',
  address: "${(site.address || site.name).replace(/"/g, '\\"')}${postcode ? ', ' + postcode : ''}",
  plot_area_m2: ${plotArea},
  existing_gea_m2: ${Math.round(plotArea * existingFloors * 0.85)},
  existing_floors: ${existingFloors},
  existing_height_m: ${Math.round(existingHeight * 10) / 10},
  ftf_m: ${ftf},
  max_height_m: ${Math.round(maxHeight * 10) / 10},
  max_floors: ${site.maxFloors},
  hmlr_title: null,
  owner: null,
  epc_rating: 'PLACEHOLDER',
  factors: {
    sky: { label: 'Available Sky', score: 6.0, weight: 2.5, existing_m: ${Math.round(existingHeight * 10) / 10}, insight: "${site.name} - auto-generated. Verify existing height." },
    value: { label: 'Rent Headroom', score: 6.0, weight: 2.0, insight: "${site.borough} ${site.use || 'mixed-use'}. Verify market data." },
    momentum: { label: 'Planning Tailwind', score: ${site.inOA ? 7.5 : 6.0}, weight: 2.0, insight: "${site.inOA ? 'Opportunity Area - GLA support for intensification.' : 'Standard planning context.'}" },
    heritage: { label: 'Heritage Shadow', score: 7.0, weight: 1.5, insight: "Auto-generated. Verify heritage constraints." },
    acquisition: { label: 'Title Stack', score: 6.0, weight: 1.5, titles: null, tenure: 'Unknown', owner: null, insight: "HMLR data pending." },
    transport: { label: 'Transport Links', score: ${site.ptal ? (parseFloat(site.ptal) >= 5 ? 8.5 : parseFloat(site.ptal) >= 3 ? 7.0 : 5.5) : 6.0}, weight: 0.5, ptal: '${site.ptal || "unknown"}', insight: "${site.ptal ? 'PTAL ' + site.ptal : 'PTAL unknown'}." }
  },
  environment: {
    flood_zone: 1,
    surface_water_risk: 'unknown',
    historic_landfill: false,
    contamination_screening: 'unknown',
    strategic_noise: 'unknown',
    air_quality: { aqma: true, aqma_name: '${site.borough} AQMA', note: 'Assumed borough-wide AQMA. Verify.' }
  },
  ecology: {
    bng_mandatory: true,
    bng_note: 'Mandatory BNG (10% uplift). Verify habitat baseline.',
    tpo_on_site: false,
    tpo_adjacent: false,
    protected_species_risk: 'unknown'
  },
  _meta: {
    generated: '${new Date().toISOString().split('T')[0]}',
    source: 'batch-intel-generate',
    polygon_source: '${polygon ? 'osm' : 'bbox-estimate'}',
    needs_verification: true
  }
};
`;
}

// Consolidation scoring (same as batch-consolidation.js)
function isNearPolygon(lat, lng, polygon, margin = 0.0003) {
  const lats = polygon.map(p => p[1]), lngs = polygon.map(p => p[0]);
  return lat >= Math.min(...lats) - margin && lat <= Math.max(...lats) + margin &&
         lng >= Math.min(...lngs) - margin && lng <= Math.max(...lngs) + margin;
}
function distM(lat1, lng1, lat2, lng2) {
  const dlat = (lat1 - lat2) * 110540, dlng = (lng1 - lng2) * 111320 * Math.cos(lat1 * Math.PI / 180);
  return Math.sqrt(dlat * dlat + dlng * dlng);
}
function scoreConsolidation(titles) {
  const n = titles.length;
  if (n <= 1) return { tier: 'single', label: 'Single Freehold', titles_total: n, titles_vacant: 0, titles_occupied: n, total_leaseholds: 0, vacant_ratio: 0 };
  const totalLH = titles.reduce((s, t) => s + t.leaseholds, 0);
  const vc = titles.filter(t => t.leaseholds === 0).length;
  const vr = vc / n;
  let tier, label;
  if (n <= 3 && vr >= 0.5) { tier = 'easy'; label = 'Easy Assembly'; }
  else if (n <= 6 && vr >= 0.3) { tier = 'play'; label = 'Assembly Play'; }
  else if (n <= 6) { tier = 'moderate'; label = 'Moderate Assembly'; }
  else if (vr >= 0.5) { tier = 'play'; label = 'Assembly Play'; }
  else { tier = 'complex'; label = 'Complex Assembly'; }
  return { tier, label, titles_total: n, titles_vacant: vc, titles_occupied: n - vc, total_leaseholds: totalLH, vacant_ratio: Math.round(vr * 100) };
}

async function runConsolidation(postcode, polygon) {
  if (!postcode) return null;
  try {
    const pc = postcode.replace(/\s+/g, '+');
    const url = `https://api.propertydata.co.uk/freeholds?key=${PD_KEY}&postcode=${pc}&max_results=20`;
    const data = await fetchJSON(url);
    if (data.status !== 'success') return null;

    const cx = polygon.reduce((s, p) => s + p[0], 0) / polygon.length;
    const cy = polygon.reduce((s, p) => s + p[1], 0) / polygon.length;
    const titlesInSite = [];
    for (const t of (data.data || [])) {
      for (const p of (t.polygons || [])) {
        if (isNearPolygon(p.lat, p.lng, polygon, 0.0003)) {
          titlesInSite.push({ title_number: t.title_number, leaseholds: p.leaseholds || 0, dist_m: Math.round(distM(p.lat, p.lng, cy, cx)) });
        }
      }
    }
    return scoreConsolidation(titlesInSite);
  } catch (e) { return null; }
}

async function run() {
  const missing = getMissingSites();
  console.log(`Sites to process: ${missing.length}`);

  // Load existing consolidation data
  const consolPath = path.join(DATA_DIR, 'consolidation.json');
  let consolData = {};
  if (fs.existsSync(consolPath)) {
    consolData = JSON.parse(fs.readFileSync(consolPath, 'utf8'));
  }

  let processed = 0, polyFound = 0, pcFound = 0, consolFound = 0, errors = 0;

  for (const site of missing) {
    if (!site.lat || !site.lng) {
      console.log(`  ⏭️  ${site.name}: no lat/lng, skipping`);
      continue;
    }

    try {
      // 1. Reverse geocode for postcode
      const postcode = await getPostcode(site.lat, site.lng);
      if (postcode) pcFound++;
      await sleep(500);

      // 2. Fetch OSM polygon
      let polygon = null;
      let osmData = null;
      try {
        osmData = await getOSMPolygon(site.lat, site.lng, site.address);
        if (osmData && osmData.coords && osmData.coords.length >= 3) {
          polygon = osmData.coords;
          polyFound++;
        }
      } catch (e) {}
      await sleep(OVERPASS_DELAY);

      // 3. Fallback: generate bbox polygon from plot area
      if (!polygon) {
        const area = site.plotM2 || 500;
        const side = Math.min(Math.sqrt(area), 150); // cap at 150m side to avoid runaway bbox
        const latD = (side / 2) / 111320;
        const lngD = (side / 2) / (111320 * Math.cos(site.lat * Math.PI / 180));
        polygon = [
          [site.lng - lngD, site.lat - latD],
          [site.lng + lngD, site.lat - latD],
          [site.lng + lngD, site.lat + latD],
          [site.lng - lngD, site.lat + latD],
          [site.lng - lngD, site.lat - latD]
        ].map(c => [parseFloat(c[0].toFixed(6)), parseFloat(c[1].toFixed(6))]);
      }

      // 4. Write intel file
      const slug = toSlug(site.name);
      const fname = `intelligence-${slug}.js`;
      const content = generateIntelFile(site, polygon, postcode, osmData);
      fs.writeFileSync(path.join(INTEL_DIR, fname), content);

      // 5. Run consolidation lookup
      if (postcode && polygon) {
        const consol = await runConsolidation(postcode, polygon);
        if (consol) {
          consolData[site.name] = consol;
          consolFound++;
        }
        await sleep(DELAY_MS);
      }

      processed++;
      const emoji = osmData ? '🏗️' : '📦';
      const consolLabel = consolData[site.name] ? ` | ${consolData[site.name].label} (${consolData[site.name].titles_total}t)` : '';
      console.log(`${emoji} ${site.name}: poly=${polygon.length}pts, pc=${postcode || 'none'}${consolLabel}`);

    } catch (e) {
      console.log(`  ❌ ${site.name}: ${e.message}`);
      errors++;
      await sleep(DELAY_MS);
    }
  }

  // Save consolidation data
  fs.writeFileSync(consolPath, JSON.stringify(consolData, null, 2));

  // Update site JSONs with consolidation fields
  for (const jf of ['southwark-sites.json', 'city-sites.json', 'hackney-sites.json']) {
    const filePath = path.join(DATA_DIR, jf);
    let sites = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const arr = Array.isArray(sites) ? sites : (sites.sites || Object.values(sites));
    let updated = 0;
    for (const s of arr) {
      const name = s.name || s.address;
      if (consolData[name]) {
        const c = consolData[name];
        s.consolidation_tier = c.tier;
        s.consolidation_label = c.label;
        s.consolidation_titles = c.titles_total || 1;
        s.consolidation_vacant = c.titles_vacant || 0;
        s.consolidation_leaseholds = c.total_leaseholds || 0;
        s.consolidation_vacant_ratio = c.vacant_ratio || 0;
        updated++;
      }
    }
    if (updated > 0) {
      fs.writeFileSync(filePath, JSON.stringify(Array.isArray(sites) ? arr : sites, null, 2));
    }
    console.log(`📝 ${jf}: ${updated} consolidation fields updated`);
  }

  console.log(`\n✅ Done: ${processed} processed, ${polyFound} OSM polygons, ${pcFound} postcodes, ${consolFound} consolidation lookups, ${errors} errors`);
}

run().catch(e => { console.error(e); process.exit(1); });
