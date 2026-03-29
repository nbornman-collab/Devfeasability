const express = require('express');
const { buildPDClasses, applyConstraints } = require('./lib/pd-engine');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN || '';
const OS_API_KEY = process.env.OS_API_KEY || 'LX85JnG1cHTIXA5bpRGHJmA1QDrHHJWZ';

// -- Test pages fetched live from GitHub to bypass Docker layer cache --
// Railway's BuildKit caches COPY layers aggressively; fetching from raw GitHub
// ensures test pages always reflect the latest commit on main.
const GITHUB_RAW = 'https://raw.githubusercontent.com/nbornman-collab/Devfeasability/main';
const TEST_PAGES = ['t1-scroll', 't1-v2', 't1-v3', 't1-redesign'];
const testPageCache = {};

async function fetchTestPage(name) {
  try {
    const res = await fetch(`${GITHUB_RAW}/public/test/${name}.html`);
    if (res.ok) {
      testPageCache[name] = await res.text();
      console.log(`[test-pages] fetched ${name}.html from GitHub (${testPageCache[name].length} bytes)`);
    }
  } catch (e) {
    console.warn(`[test-pages] could not fetch ${name}.html: ${e.message}`);
  }
}

// Fetch all test pages - awaited before server listens (see bottom of file)

// Simple in-memory cache for Overpass/external API responses (5 min TTL)
const apiCache = new Map();
const CACHE_TTL = 5 * 60 * 1000;
function cachedFetch(url, timeoutMs = 10000) {
  const cached = apiCache.get(url);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return Promise.resolve(cached.data);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { signal: controller.signal })
    .then(r => { clearTimeout(timeout); return r.text(); })
    .then(text => {
      try {
        const data = JSON.parse(text);
        apiCache.set(url, { data, ts: Date.now() });
        if (apiCache.size > 500) { const oldest = apiCache.keys().next().value; apiCache.delete(oldest); }
        return data;
      } catch {
        // Overpass sometimes returns XML errors
        console.warn('cachedFetch: non-JSON response from', url.substring(0, 80), text.substring(0, 100));
        return { elements: [] };
      }
    })
    .catch(e => { clearTimeout(timeout); console.warn('cachedFetch timeout/error:', e.message); return { elements: [] }; });
}


// ── PD Checker ────────────────────────────────────────────────────────────────
app.get('/discover', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'discover.html'));
});

app.get('/cesium-demo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cesium-demo.html'));
});

app.get('/pd-demo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pd-demo.html'));
});

app.get('/pd', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pd.html'));
});

app.get('/api/pd-check', async (req, res) => {
  const address = req.query.address;
  if (!address) return res.json({ error: 'Address required' });

  try {
    // Geocode via Google Maps API
    const mapsKey = process.env.GOOGLE_MAPS_API_KEY;
    let lat, lng, formattedAddress, lpa;
    
    if (mapsKey) {
      const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address + ', England')}&key=${mapsKey}&region=gb`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();
      if (geoData.results && geoData.results.length > 0) {
        const r = geoData.results[0];
        lat = r.geometry.location.lat;
        lng = r.geometry.location.lng;
        formattedAddress = r.formatted_address;
        // Extract borough/LPA from address components
        const district = r.address_components.find(c => c.types.includes('administrative_area_level_2'));
        const locality = r.address_components.find(c => c.types.includes('postal_town') || c.types.includes('locality'));
        lpa = district ? district.long_name : (locality ? locality.long_name : 'Your Local Authority');
      }
    } else {
      // Fallback: OSM Nominatim
      const nomUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1&countrycodes=gb`;
      const nomRes = await fetch(nomUrl, { headers: { 'User-Agent': 'DA-DevFeasibility/1.0' } });
      const nomData = await nomRes.json();
      if (nomData && nomData.length > 0) {
        lat = parseFloat(nomData[0].lat);
        lng = parseFloat(nomData[0].lon);
        formattedAddress = nomData[0].display_name;
        lpa = 'Your Local Authority';
      }
    }

    if (!lat) return res.json({ error: 'Address not found. Please try with a full UK postcode.' });

    // Check constraints (simplified - using known London conservation area bbox as proxy)
    // In production: query conservation area polygon dataset
    const inLondon = lat > 51.28 && lat < 51.72 && lng > -0.55 && lng < 0.35;
    const inConservation = false; // placeholder - would query conservation area dataset
    const article4 = false; // placeholder - would query Article 4 dataset
    const listed = false; // placeholder - would query Historic England API
    const propertyType = 'semi-detached'; // placeholder - would come from VOA/AddressBase

    const baseClasses = buildPDClasses(propertyType);
    const classes = applyConstraints(baseClasses, inConservation, article4, listed);

    res.json({
      address: formattedAddress || address,
      lat, lng, lpa,
      propertyType,
      inConservation, article4, listed,
      classes
    });
  } catch(e) {
    console.error('PD check error:', e);
    res.json({ error: 'Unable to process this address. Please try again.' });
  }
});

// Force no caching on HTML and JS files - prevents corporate proxies serving stale content
app.use((req, res, next) => {
  const isHtml = req.path.endsWith('.html') || req.path === '/' || !req.path.includes('.');
  const isJs = req.path.endsWith('.js');
  if (isHtml || isJs) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
  }
  next();
});
// Serve test pages from GitHub-fetched in-memory cache (bypasses Docker COPY layer cache)
app.get('/test/:page', (req, res, next) => {
  const name = req.params.page.replace('.html', '');
  if (testPageCache[name]) {
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    return res.send(testPageCache[name]);
  }
  next(); // fall through to static if not cached yet
});

// No-cache for HTML files - prevents stale in-app browser cache (Safari/Telegram)
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
    }
  }
}));

// ── Tier routes: /t1/:site, /t2/:site, /t3/:site ──────────────────────────
// T1 Scout  — site overview (placeholder until built)
// Removed sites — redirect to homepage (100LH planning granted Jan 2025; 1SS unverified)
const REMOVED_SITES = ['100-leadenhall', '1-silk-st', '185-park-street'];
app.use(['/t1/:site', '/t2/:site', '/t3/:site'], (req, res, next) => {
  const site = req.params.site;
  if (REMOVED_SITES.includes(site)) return res.redirect('/');
  next();
});

// T2 Appraise — massing tool
app.get('/t2/:site', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'massing', `${req.params.site}.html`));
});
// T3 Present — full PDF report
app.get('/t3/:site', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'reports', `${req.params.site}.html`));
});
app.get('/t1/:site', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'scout', `${req.params.site}.html`);
  if (require('fs').existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    // Coming soon — site not yet onboarded
    const slug = req.params.site;
    const name = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    res.send(`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>T1 Scout · ${name} — D/A</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#f5f6f8;color:#1a1d2e;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;padding:40px 24px}
.da-nav{position:fixed;top:0;left:0;right:0;height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;background:rgba(255,255,255,.97);border-bottom:1px solid #e5e7eb;z-index:200}
.da-nav-logo{font:800 17px Inter,sans-serif;letter-spacing:-.5px;text-decoration:none;color:#0f172a}
.da-nav-logo .sl{color:#1d4ed8}
.box{max-width:480px;width:100%;background:#fff;border-radius:12px;border:1px solid #e5e7eb;padding:40px;text-align:center}
.chip{display:inline-block;background:#f3f4f6;color:#6b7280;font:600 10px Inter,sans-serif;text-transform:uppercase;letter-spacing:1.2px;padding:4px 12px;border-radius:4px;margin-bottom:20px}
h1{font:700 22px Inter,sans-serif;margin-bottom:8px}
p{font:400 14px Inter,sans-serif;color:#6b7280;line-height:1.6;margin-bottom:24px}
a.btn{display:inline-block;background:#4f46e5;color:#fff;font:600 13px Inter,sans-serif;text-decoration:none;padding:12px 28px;border-radius:8px}
a.btn:hover{background:#4338ca}
a.back{font:500 13px Inter,sans-serif;color:#6b7280;text-decoration:none;margin-top:16px;display:block}
a.back:hover{color:#1a1d2e}
</style></head>
<body>
<nav class="da-nav">
  <a href="/" class="da-nav-logo">D<span class="sl">/</span>A</a>
</nav>
<div class="box">
  <div class="chip">T1 Scout</div>
  <h1>${name}</h1>
  <p>Intelligence report not yet available for this site. It is in the onboarding queue - verified sites are added as analysis is completed.</p>
  <a class="btn" href="/borough/southwark">Back to Borough Screener</a>
  <a class="back" href="/">D/A Homepage</a>
</div>
</body></html>`);
  }
});

// Borough screener — /borough/:name → public/borough/:name.html
// Borough pages → redirect to unified Discover page
app.get('/borough/:name', (req, res) => {
  res.redirect(301, '/discover');
});

app.get('/methodology', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'methodology.html'));
});

// Serve mapbox token
app.get('/api/config', (req, res) => {
  res.json({ mapboxToken: MAPBOX_TOKEN, googleMapsKey: process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyBJvGIHywOe1tLWcBh0O0Hc0KDd6RUBKHI' });
});

// UK geocoding via Mapbox (bounded to Greater London)
app.get('/api/geocode', async (req, res) => {
  try {
    const text = encodeURIComponent(req.query.text);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${MAPBOX_TOKEN}&country=gb&bbox=-0.51,51.28,0.33,51.69&types=address,poi&limit=5`;
    const r = await fetch(url);
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Reverse geocode
app.get('/api/reverse', async (req, res) => {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.query.lng},${req.query.lat}.json?access_token=${MAPBOX_TOKEN}&country=gb&types=address,postcode,district,locality`;
    const r = await fetch(url);
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});


// In-memory cache: key = "lat,lng" or "postcode" → result (TTL 24h)
const pdCache = new Map();
const PD_TTL = 24 * 60 * 60 * 1000;

async function pdGet(path) {
  const sep = path.includes('?') ? '&' : '?';
  const r = await fetch(url);
  return r.json();
}

// Pick the best freehold title for a site:
// Private company + leaseholds = development building
// Government body (CoL/council) + 0 leaseholds = highway/public land (exclude)
const GOV_OWNERS = ['MAYOR AND COMMONALTY', 'CITY OF LONDON', 'LONDON BOROUGH', 'COUNCIL', 'SECRETARY OF STATE', 'TRANSPORT FOR LONDON', 'NETWORK RAIL', 'HIGHWAYS ENGLAND'];
function isGovOwner(title) {
  // Use title class or known patterns — at freeholds stage we don't have owner name,
  // so use leaseholds=0 + very high/low point count as highway proxy
  const p = title.polygons?.[0] || {};
  // Streets: many points (complex curve) but 0 leaseholds — penalise
  return p.leaseholds === 0 && p.num_points > 80;
}

function pickBestTitle(titles, lat, lng) {
  if (!titles || !titles.length) return null;
  const mLng = 111320 * Math.cos(lat * Math.PI / 180), mLat = 110540;
  return titles.map(t => {
    const p = t.polygons?.[0] || {};
    const dx = ((p.lat || lat) - lat) * mLat;
    const dy = ((p.lng || lng) - lng) * mLng;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const leaseholds = p.leaseholds || 0;
    // Penalise suspected highway titles (many points, 0 leaseholds)
    const highwayPenalty = isGovOwner(t) ? 0.1 : 1;
    // Reward leaseholds (occupied commercial buildings have tenants/floors)
    const leaseholdBoost = leaseholds > 0 ? (1 + Math.log(leaseholds + 1)) : 0.5;
    const score = (1 / (dist + 1)) * leaseholdBoost * highwayPenalty;
    return { ...t, _dist: dist, _score: score };
  }).sort((a, b) => b._score - a._score)[0];
}


// Overpass API — building footprint + tags
app.get('/api/building', async (req, res) => {
  try {
    const { lat, lng, address } = req.query;
    const radius = req.query.radius || 25;

    // Fire all strategies in parallel — use best result
    const promises = [];

    // Strategy 1: Address tag match (most precise)
    if (address) {
      const addrMatch = address.match(/^(\d+[\-\d]*[a-zA-Z]?)\s+(.+?)(?:,.*)?$/);
      if (addrMatch) {
        const num = addrMatch[1];
        const street = addrMatch[2].replace(/,.*$/, '').trim();
        const addrQuery = `[out:json][timeout:8];way["building"]["addr:housenumber"="${num}"]["addr:street"~"${street}",i](around:200,${lat},${lng});out body;>;out skel qt;`;
        promises.push(cachedFetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(addrQuery)}`, 10000).then(d => ({ strategy: 'addr', data: d })));
      }
    }

    // Strategy 2: Radius search (fast, reliable)
    const query = `[out:json][timeout:8];(way["building"](around:${radius},${lat},${lng}););out body;>;out skel qt;`;
    promises.push(cachedFetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`, 10000).then(d => ({ strategy: 'radius', data: d })));

    // Race — return first one with valid building ways
    const results = await Promise.allSettled(promises);
    // Prefer address match, then radius
    const addrResult = results.find(r => r.status === 'fulfilled' && r.value.strategy === 'addr');
    if (addrResult) {
      const ways = (addrResult.value.data.elements || []).filter(e => e.type === 'way' && e.tags);
      if (ways.length > 0) return res.json(addrResult.value.data);
    }
    const radiusResult = results.find(r => r.status === 'fulfilled' && r.value.strategy === 'radius');
    if (radiusResult) {
      const ways = (radiusResult.value.data.elements || []).filter(e => e.type === 'way' && e.tags);
      if (ways.length > 0) return res.json(radiusResult.value.data);
    }
    // All failed — return empty
    res.json({ elements: [] });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Overpass — nearby buildings context (wider radius for precedent)
app.get('/api/context-buildings', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const radius = req.query.radius || 200;
    const query = `[out:json][timeout:15];(way["building"](around:${radius},${lat},${lng}););out tags;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const data = await cachedFetch(url, 15000);
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// HM Land Registry INSPIRE — registered title polygons (WFS 2.0, GML → GeoJSON)

// Historic England — Listed Buildings near point
app.get('/api/listed-buildings', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const radius = req.query.radius || 200;
    // Historic England GIS endpoint
    const url = `https://historicengland.org.uk/api/geo/listed-buildings?lat=${lat}&lng=${lng}&radius=${radius}&format=json`;
    const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (r.ok) {
      res.json(await r.json());
    } else {
      // Fallback: use Overpass for heritage data
      const query = `[out:json][timeout:10];(node["heritage"](around:${radius},${lat},${lng});way["heritage"](around:${radius},${lat},${lng});node["listed_status"](around:${radius},${lat},${lng});way["listed_status"](around:${radius},${lat},${lng});node["HE_ref"](around:${radius},${lat},${lng});way["HE_ref"](around:${radius},${lat},${lng}););out tags;`;
      const oData = await cachedFetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`, 12000);
      res.json(oData);
    }
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Historic England — Conservation Areas
app.get('/api/conservation-areas', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const radius = req.query.radius || 100;
    // Try Overpass for conservation area boundaries
    const query = `[out:json][timeout:10];(way["boundary"="protected_area"]["protect_class"="22"](around:${radius},${lat},${lng});relation["boundary"="protected_area"]["protect_class"="22"](around:${radius},${lat},${lng});way["heritage"="conservation_area"](around:${radius},${lat},${lng});relation["heritage"="conservation_area"](around:${radius},${lat},${lng}););out tags;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const data = await cachedFetch(url, 12000);
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Environment Agency — Flood Zone
app.get('/api/flood-zone', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    // EA Flood Map for Planning — WMS GetFeatureInfo
    const buffer = 0.0001;
    const bbox = `${parseFloat(lng)-buffer},${parseFloat(lat)-buffer},${parseFloat(lng)+buffer},${parseFloat(lat)+buffer}`;
    const url = `https://environment.data.gov.uk/spatialdata/flood-map-for-planning-rivers-and-sea-flood-zone-3/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=Flood_Map_for_Planning_Rivers_and_Sea_Flood_Zone_3&bbox=${bbox},urn:ogc:def:crs:EPSG::4326&outputFormat=application/json&count=1`;
    const r3 = await fetch(url);
    let zone3 = false;
    try {
      const d3 = await r3.json();
      zone3 = d3.features && d3.features.length > 0;
    } catch {}
    
    const url2 = url.replace('Zone_3', 'Zone_2').replace('zone_3', 'zone_2');
    const r2 = await fetch(url2);
    let zone2 = false;
    try {
      const d2 = await r2.json();
      zone2 = d2.features && d2.features.length > 0;
    } catch {}

    let floodZone = 1;
    if (zone3) floodZone = 3;
    else if (zone2) floodZone = 2;

    res.json({ floodZone, zone2, zone3 });
  } catch (e) { res.status(500).json({ error: e.message, floodZone: null }); }
});


// GLA Planning DataMap — spatial policy checks (no API key required)
// MapServer: https://gis2.london.gov.uk/server/rest/services/apps/planning_data_map_02/MapServer
// Layer IDs: 103=OA, 107=CAZ, 205=Conservation Areas, 214=Listed Buildings,
//            213=Protected Vistas, 101=Brownfield, 102=Site Allocations,
//            108=SHLAA, 111-113=MCIL2 bands, 218=Thames Policy Area
app.get('/api/gla-planning', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'lat and lng required' });

  const GLA_BASE = 'https://gis2.london.gov.uk/server/rest/services/apps/planning_data_map_02/MapServer';
  const LAYERS = {
    opportunity_area:    103,
    caz:                 107,
    conservation_area:   205,
    listed_buildings:    214,
    protected_vista:     213,
    brownfield:          101,
    site_allocation:     102,
    shlaa:               108,
    mcil2_band:          111,  // check 111, 112, 113 for band
    thames_policy:       218,
  };

  const queryLayer = async (layerId, name) => {
    try {
      const url = `${GLA_BASE}/${layerId}/query?geometry=${lng},${lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&f=json`;
      const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
      const d = await r.json();
      const features = d.features || [];
      return { name, found: features.length > 0, count: features.length, data: features[0]?.attributes || null };
    } catch (e) {
      return { name, found: false, count: 0, error: e.message };
    }
  };

  // Run all queries in parallel
  const results = await Promise.all(
    Object.entries(LAYERS).map(([name, id]) => queryLayer(id, name))
  );

  // Also check MCIL2 bands 112 and 113
  const mcil2_112 = await queryLayer(112, 'mcil2_band2');
  const mcil2_113 = await queryLayer(113, 'mcil2_band3');

  const out = {};
  results.forEach(r => { out[r.name] = r; });
  // Resolve MCIL2 band
  if (out.mcil2_band.found) out.mcil2_band.band = 1;
  else if (mcil2_112.found) out.mcil2_band = { ...mcil2_112, band: 2 };
  else if (mcil2_113.found) out.mcil2_band = { ...mcil2_113, band: 3 };
  else out.mcil2_band = { name: 'mcil2_band', found: false, band: null };

  res.json({ ok: true, lat: parseFloat(lat), lng: parseFloat(lng), layers: out });
});

// TfL — PTAL score (via WebCAT proxy or nearest stations)
app.get('/api/ptal', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    // TfL StopPoint API — nearest stations
    const url = `https://api.tfl.gov.uk/StopPoint?lat=${lat}&lon=${lng}&stopTypes=NaptanMetroStation,NaptanRailStation,NaptanBusCoachStation&radius=800`;
    const r = await fetch(url);
    const data = await r.json();
    const stops = data.stopPoints || [];
    
    // Estimate PTAL from stop density and distance
    let ptalScore = 0;
    const metroStations = stops.filter(s => s.modes?.includes('tube') || s.modes?.includes('dlr') || s.modes?.includes('elizabeth-line'));
    const railStations = stops.filter(s => s.modes?.includes('national-rail') || s.modes?.includes('overground'));
    const busStops = stops.filter(s => s.modes?.includes('bus'));
    
    // Rough PTAL estimation
    if (metroStations.length >= 2) ptalScore += 3;
    else if (metroStations.length === 1) ptalScore += 2;
    if (railStations.length >= 1) ptalScore += 1;
    if (busStops.length >= 5) ptalScore += 2;
    else if (busStops.length >= 2) ptalScore += 1;
    
    // Clamp to 0-6b range
    const ptal = Math.min(ptalScore, 6);
    const ptalBand = ptal <= 1 ? '0-1' : (ptal <= 3 ? '2-3' : '4-6');
    
    res.json({
      ptal,
      ptalBand,
      nearestStations: stops.slice(0, 8).map(s => ({
        name: s.commonName,
        distance: s.distance,
        modes: s.modes,
        lines: s.lines?.map(l => l.name) || []
      }))
    });
  } catch (e) { res.status(500).json({ error: e.message, ptal: null }); }
});

// Planning London Datahub — recent applications near point
app.get('/api/planning-apps', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const radius = req.query.krad || 0.3; // km radius, default 300m
    // PlanIt API — free, spatial search, real planning data
    const url = `https://www.planit.org.uk/api/applics/json?lat=${lat}&lng=${lng}&krad=${radius}&limit=25&sort=-decided_date`;
    const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (r.ok) {
      const data = await r.json();
      // Parse and clean up for front-end
      const apps = (data.records || []).map(a => ({
        address: a.address || '',
        description: a.description || '',
        reference: a.uid || a.name || '',
        status: a.app_state || '',
        type: a.app_type || a.other_fields?.application_type || '',
        size: a.app_size || '',
        decidedDate: a.decided_date || '',
        startDate: a.start_date || '',
        decision: a.other_fields?.decision || a.app_state || '',
        decidedBy: a.other_fields?.decided_by || '',
        ward: a.other_fields?.ward_name || '',
        borough: a.area_name || '',
        distance: a.distance ? Math.round(a.distance * 1000) : null, // convert km to m
        url: a.url || a.link || '',
        docsUrl: a.other_fields?.docs_url || '',
        lat: a.location_y,
        lng: a.location_x,
        nComments: a.other_fields?.n_comments || 0,
        nDocs: a.other_fields?.n_documents || 0,
      }));
      res.json({ results: apps, total: data.records?.length || 0, source: 'planit' });
    } else {
      res.json({ results: [], source: 'unavailable' });
    }
  } catch (e) { res.status(500).json({ error: e.message, results: [] }); }
});

// Land Registry Price Paid
app.get('/api/land-registry', async (req, res) => {
  try {
    const { postcode } = req.query;
    if (!postcode) return res.json({ results: [] });
    const pc = encodeURIComponent(postcode.trim());
    const url = `https://landregistry.data.gov.uk/data/ppi/transaction-record.json?propertyAddress.postcode=${pc}&_pageSize=10&_sort=-transactionDate`;
    const r = await fetch(url);
    const data = await r.json();
    res.json({ results: data.result?.items || [] });
  } catch (e) { res.status(500).json({ error: e.message, results: [] }); }
});

// Borough lookup from coordinates

// (old EPC handler removed — replaced by /api/epc below with correct credentials)

// ── OS Places API — address → UPRN + precise inside-building point ──
// This is the foundation for reliable polygon fetching at any UK address
app.get('/api/os-places', async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: 'q required' });
    if (!OS_API_KEY) return res.status(503).json({ error: 'OS_API_KEY not configured' });

    const url = `https://api.os.uk/search/places/v1/find` +
      `?query=${encodeURIComponent(q)}&maxresults=3&key=${OS_API_KEY}`;

    const r = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'devfeasibility/1.0' },
      signal: AbortSignal.timeout(10000)
    });
    if (!r.ok) {
      const t = await r.text();
      return res.status(r.status).json({ error: `OS Places ${r.status}`, detail: t.substring(0, 200) });
    }

    const data = await r.json();
    const results = (data.results || []).map(item => {
      const d = item.DPA || item.LPI || {};
      return {
        uprn: d.UPRN,
        address: d.ADDRESS || d.LPI_KEY,
        lat: parseFloat(d.LAT || d.LATITUDE || 0),
        lng: parseFloat(d.LNG || d.LONGITUDE || d.LONG || 0),
        postcode: d.POSTCODE,
        classCode: d.CLASSIFICATION_CODE
      };
    }).filter(r => r.lat && r.lng);

    res.json({ results, count: results.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// BNG (OSGB36 EPSG:27700) → WGS84 lon/lat converter
// Accurate to ~5m — sufficient for site boundary display
function bngToWgs84(E, N) {
  const a=6377563.396,b=6356256.910,F0=0.9996012717;
  const lat0=0.85521133,lon0=-0.034906585,N0=-100000,E0=400000;
  const e2=1-(b*b)/(a*a),n=(a-b)/(a+b),n2=n*n,n3=n*n*n;
  const dN=N-N0;
  let lat=lat0+dN/(a*F0);
  for(let i=0;i<10;i++){
    const M=a*F0*((1+n+1.25*n2+1.25*n3)*(lat-lat0)-(3*n+3*n2+2.625*n3)*Math.sin(lat-lat0)*Math.cos(lat+lat0)+(1.875*n2+1.875*n3)*Math.sin(2*(lat-lat0))*Math.cos(2*(lat+lat0))-(35/24)*n3*Math.sin(3*(lat-lat0))*Math.cos(3*(lat+lat0)));
    if(Math.abs(dN-M)<1e-5)break;
    lat=lat+(dN-M)/(a*F0);
  }
  const nu=a*F0/Math.sqrt(1-e2*Math.sin(lat)**2);
  const rho=a*F0*(1-e2)/Math.pow(1-e2*Math.sin(lat)**2,1.5);
  const eta2=nu/rho-1,t=Math.tan(lat),s=1/Math.cos(lat);
  const dE=E-E0;
  const VII=t/(2*rho*nu);
  const VIII=t/(24*rho*nu**3)*(5+3*t**2+eta2-9*t**2*eta2);
  const IX=t/(720*rho*nu**5)*(61+90*t**2+45*t**4);
  const X=s/nu,XI=s/(6*nu**3)*(nu/rho+2*t**2);
  const XII=s/(120*nu**5)*(5+28*t**2+24*t**4);
  const XIIA=s/(5040*nu**7)*(61+662*t**2+1320*t**4+720*t**6);
  const latOut=lat-VII*dE**2+VIII*dE**4-IX*dE**6;
  const lonOut=lon0+X*dE-XI*dE**3+XII*dE**5-XIIA*dE**7;
  return [lonOut*180/Math.PI, latOut*180/Math.PI]; // [lon, lat] GeoJSON order
}

function fixOSCoords(coords) {
  // Detect BNG (values > 1000) and convert; otherwise pass through
  if (!coords || !coords.length) return coords;
  const sample = Array.isArray(coords[0]) ? coords[0] : coords;
  if (Math.abs(sample[0]) > 1000) {
    // It's BNG — recursively convert
    if (Array.isArray(coords[0])) return coords.map(fixOSCoords);
    return bngToWgs84(coords[0], coords[1]);
  }
  if (Array.isArray(coords[0])) return coords.map(fixOSCoords);
  return coords;
}

// OS NGD API — building footprints (replaces broken HMLR WFS)
// Returns GeoJSON FeatureCollection of building parts around a point
app.get('/api/os-buildings', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ error: 'lat/lng required' });
    if (!OS_API_KEY) return res.status(503).json({ error: 'OS_API_KEY not configured' });

    // iLat/iLng = precise inside-building point from OS Places API
    // When provided: use tiny bbox (guaranteed to hit only the containing building)
    // When absent: fall back to rough centroid with larger buf
    const iLat = req.query.iLat ? parseFloat(req.query.iLat) : parseFloat(lat);
    const iLng = req.query.iLng ? parseFloat(req.query.iLng) : parseFloat(lng);
    const buf = req.query.iLat ? 0.0001 : parseFloat(req.query.buf || '0.001'); // 7m if precise, ~100m fallback
    const minLon = (iLng - buf).toFixed(6);
    const minLat = (iLat - buf).toFixed(6);
    const maxLon = (iLng + buf).toFixed(6);
    const maxLat = (iLat + buf).toFixed(6);

    // OS NGD Features API — bld-fts-buildingpart collection
    // CRS84 = WGS84 lon/lat (GeoJSON standard). bbox-crs tells API our bbox is also in CRS84.
    const CRS84 = 'http://www.opengis.net/def/crs/OGC/1.3/CRS84';
    const url = `https://api.os.uk/features/ngd/ofa/v1/collections/bld-fts-buildingpart/items` +
      `?bbox=${minLon},${minLat},${maxLon},${maxLat}` +
      `&bbox-crs=${encodeURIComponent(CRS84)}` +
      `&crs=${encodeURIComponent(CRS84)}` +
      `&limit=50` +
      `&key=${OS_API_KEY}`;

    const r = await fetch(url, {
      headers: {
        'Accept': 'application/geo+json',
        'User-Agent': 'devfeasibility/1.0',
        'Content-Crs': `<${CRS84}>`
      },
      signal: AbortSignal.timeout(12000)
    });

    if (!r.ok) {
      const errText = await r.text();
      return res.status(r.status).json({ error: `OS API ${r.status}`, detail: errText.substring(0, 200) });
    }

    const fc = await r.json();
    const qLat = parseFloat(lat), qLng = parseFloat(lng);

    // Point-in-polygon (ray casting) for WGS84 coords
    function pip(px, py, ring) {
      let inside = false;
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
        if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) inside = !inside;
      }
      return inside;
    }

    // Fix coordinates + score each building
    (fc.features || []).forEach(f => {
      if (f.geometry && f.geometry.coordinates) {
        f.geometry.coordinates = f.geometry.coordinates.map(ring => fixOSCoords(ring));
        const ring = f.geometry.coordinates[0] || [];
        // Area
        let area = 0;
        for (let i = 0; i < ring.length - 1; i++) {
          area += (ring[i][0] * ring[i+1][1]) - (ring[i+1][0] * ring[i][1]);
        }
        f.properties._area = Math.abs(area / 2) * 111320 * 69500;
        // Centroid distance to query point
        const cLon = ring.reduce((s,c) => s + c[0], 0) / ring.length;
        const cLat = ring.reduce((s,c) => s + c[1], 0) / ring.length;
        const dLon = (cLon - qLng) * 69500, dLat = (cLat - qLat) * 111320;
        f.properties._dist = Math.sqrt(dLon*dLon + dLat*dLat);
        // Does this building contain the query point?
        f.properties._contains = pip(qLng, qLat, ring);
        // Pass through OS height fields for 3D extrusion
        // OS NGD height fields (all in metres above ground):
        // RelativeHeightMaximum  = ridge height (highest point)
        // RelativeHeightRoofBase = eaves height (base of roof / top of walls)
        // RelativeHeightMinimum  = base height (0 for ground-level)
        const p = f.properties;
        f.properties._heightMax     = p.RelativeHeightMaximum  || p.relativeheightmaximum  || null;
        f.properties._heightRoofBase= p.RelativeHeightRoofBase || p.relativeheightroofbase || null;
        f.properties._heightMin     = p.RelativeHeightMinimum  || p.relativeheightminimum  || 0;

        // Roof pitch calculation (requires ridge + eaves + half-span from footprint)
        if (f.properties._heightMax && f.properties._heightRoofBase && f.properties._area) {
          const rise = f.properties._heightMax - f.properties._heightRoofBase;
          // Span = WIDTH of building (short axis), not length.
          // Ridge runs along the long axis, so pitch = arctan(rise / half-short-dimension).
          const ring = f.geometry.coordinates[0] || [];
          let maxEdge = 0, minEdge = Infinity;
          for (let i = 0; i < ring.length - 1; i++) {
            const dx = (ring[i+1][0] - ring[i][0]) * 69500;
            const dy = (ring[i+1][1] - ring[i][1]) * 111320;
            const len = Math.sqrt(dx*dx + dy*dy);
            if (len > 0.5) { // ignore trivial edges (corners)
              maxEdge = Math.max(maxEdge, len);
              minEdge = Math.min(minEdge, len);
            }
          }
          // Use shortest principal dimension as span (perpendicular to ridge)
          // Fallback to sqrt(area) if polygon is complex / non-rectangular
          const shortSpan = minEdge < Infinity ? minEdge : Math.sqrt(f.properties._area || 50);
          const halfSpan = shortSpan / 2;
          if (rise > 0 && halfSpan > 0) {
            f.properties._roofPitchDeg = Math.round(Math.atan(rise / halfSpan) * 180 / Math.PI);
            f.properties._roofRise = parseFloat(rise.toFixed(2));
            f.properties._roofEaves = parseFloat(f.properties._heightRoofBase.toFixed(2));
            f.properties._roofRidge = parseFloat(f.properties._heightMax.toFixed(2));
          }
        }

        // Estimated existing floors and GIA
        if (f.properties._heightMax && f.properties._area) {
          const ftf = f.properties._heightRoofBase || f.properties._heightMax;
          const floors = Math.round(ftf / 3.15); // 3.15m residential FTF
          f.properties._estFloors = floors;
          f.properties._estGIA = Math.round(f.properties._area * floors);
        }
      }
    });

    // Selection: prefer buildings that contain the query point; fallback to nearest
    const containing = (fc.features || []).filter(f => f.properties._contains);
    if (containing.length) {
      // Among containing buildings, pick largest (handles multi-part campuses)
      containing.sort((a,b) => (b.properties._area||0) - (a.properties._area||0));
      fc.features = fc.features; // keep all for context overlay
      fc._best = 0;
      // Tag the best
      const best = containing[0];
      best.properties._selected = true;
    } else {
      // No containing building — pick nearest centroid
      (fc.features || []).sort((a,b) => (a.properties._dist||999) - (b.properties._dist||999));
      if (fc.features[0]) fc.features[0].properties._selected = true;
    }

    res.json(fc);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── EPC API — floor area for any UK building (commercial + residential) ──
// EPC API - old service (Basic auth) + new service (Bearer token)
// Old: epc.opendatacommunities.org (Basic auth with email + key - CONFIRMED WORKING 2026-03-24)
// New: get-energy-performance-data.communities.gov.uk (Bearer token - API not yet live as of 2026-03-24)
// EPC_BEARER_TOKEN (new service, saved for when API goes live): pI98EtYLD2gvVS5lkcfRoAYYRvxh3kIOAzHmDY8h16t2oRMRtkCOf8vpECIrEHao
const EPC_EMAIL = process.env.EPC_EMAIL || 'nbornman@gmail.com';
const EPC_API_KEY = process.env.EPC_API_KEY || 'c471dfb99d2721e8ed59b70630fcb36bedad2714';

// ── EPC Rule Engine: address matching + deduplication ──────────────────────
// Locked 2026-03-24. Three rules:
//   1. No fallback: if no address match → return empty, never sum whole postcode
//   2. Sort by lodgementDate DESC before dedup (most recent cert wins)
//   3. Address match requires BOTH house number AND street keyword
function epcMatchSite(certs, targetAddr) {
  if (!targetAddr || !certs.length) return certs; // no filter requested → return all

  const norm = s => s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim();
  const target = norm(targetAddr);

  // Extract house numbers: "24" from "24 Southwark Street", "128","170" from "128-170 Bishopsgate"
  const numMatches = target.match(/\b(\d+(?:\s*-\s*\d+)?)\b/g) || [];
  const houseNums = [];
  for (const nm of numMatches) {
    houseNums.push(nm.replace(/\s/g, ''));
    // Also split ranges: "128-170" → ["128", "170"]
    if (nm.includes('-')) nm.split('-').forEach(n => houseNums.push(n.trim()));
  }

  // Extract street keyword: longest non-trivial word from address (skip numbers, "street", "road", "london" etc)
  const STOP = new Set(['street','st','road','rd','lane','ln','way','place','pl','square','sq',
    'avenue','ave','court','ct','drive','dr','close','cl','crescent','cres','terrace','row',
    'london','floor','ground','first','second','third','fourth','fifth','unit','suite',
    'basement','the','and','of','at','in','to']);
  const words = target.split(/[\s,]+/).filter(w => w.length > 2 && !STOP.has(w) && !/^\d/.test(w));
  const streetKw = words.sort((a, b) => b.length - a.length)[0] || '';

  if (!houseNums.length && !streetKw) return certs;

  // Match: cert address must contain at least one house number AND the street keyword
  const matched = certs.filter(c => {
    const ca = norm(c.address);
    const hasNum = houseNums.length === 0 || houseNums.some(n => {
      // Match "24" as word boundary: "24 " or "24," or "-24" or "24-"
      return new RegExp(`\\b${n}\\b`).test(ca);
    });
    const hasStreet = !streetKw || new RegExp(`\\b${streetKw}\\b`).test(ca);
    return hasNum && hasStreet;
  });

  return matched; // may be empty → caller shows nothing
}

function epcDedup(certs) {
  // Sort by lodgement date DESC → most recent first
  const sorted = [...certs].sort((a, b) => (b.lodgementDate || '').localeCompare(a.lodgementDate || ''));
  // Deduplicate by normalised address + propertyType → keep most recent
  const seen = new Set();
  return sorted.filter(c => {
    const key = c.address.toLowerCase().replace(/[^a-z0-9]/g, '') + '|' + (c.propertyType || '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function epcAggregate(certs) {
  const deduped = epcDedup(certs);
  const totalGia = deduped.reduce((s, c) => s + c.floorArea, 0);
  const ratings = deduped.filter(c => c.epcRating).map(c => c.epcRating);
  const worstRating = [...ratings].sort().reverse()[0] || null;
  const bestRating = [...ratings].sort()[0] || null;
  const toLet = deduped.filter(c => /to let/i.test(c.transactionType)).length;
  const avgBenchmark = deduped.length > 0
    ? Math.round(deduped.reduce((s, c) => s + (c.existingBenchmark || 0), 0) / deduped.length)
    : 0;
  return {
    totalGia,
    certCount: deduped.length,
    worstRating,
    bestRating,
    toLet,
    avgBenchmark,
    certs: deduped
  };
}

app.get('/api/epc', async (req, res) => {
  const { address, postcode, uprn, type, filterAddress } = req.query;
  if (!EPC_EMAIL || !EPC_API_KEY) return res.status(503).json({ error: 'EPC credentials not configured', hint: 'Set EPC_EMAIL and EPC_API_KEY' });

  const auth = Buffer.from(`${EPC_EMAIL}:${EPC_API_KEY}`).toString('base64');
  const endpoint = (type === 'domestic') ? 'domestic' : 'non-domestic';
  let query = '';
  if (uprn) query = `uprn=${uprn}`;
  else if (postcode) query = `postcode=${encodeURIComponent(postcode)}&size=50`;
  else if (address) query = `address=${encodeURIComponent(address)}&size=25`;
  else return res.status(400).json({ error: 'address, postcode or uprn required' });

  try {
    const url = `https://epc.opendatacommunities.org/api/v1/${endpoint}/search?${query}`;
    const r = await fetch(url, {
      headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json', 'User-Agent': 'devfeasibility/1.0' },
      signal: AbortSignal.timeout(10000)
    });
    if (!r.ok) return res.status(r.status).json({ error: `EPC API ${r.status}` });
    const data = await r.json();
    const rows = data.rows || data.certificates || [];
    const allCerts = rows.map(row => ({
      address: row['address'] || [row['address1'],row['address2'],row['address3']].filter(Boolean).join(', '),
      postcode: row['postcode'],
      uprn: row['uprn'],
      lmkKey: row['lmk-key'],
      floorArea: parseFloat(row['floor-area'] || row['total-floor-area'] || 0),
      epcRating: row['asset-rating-band'] || row['current-energy-rating'],
      assetRating: parseInt(row['asset-rating'] || row['current-energy-efficiency'] || 0),
      lodgementDate: row['lodgement-date'] || row['lodgement-datetime'],
      propertyType: row['property-type'],
      buildingLevel: row['building-level'],
      existingBenchmark: parseInt(row['existing-stock-benchmark'] || 0),
      transactionType: row['transaction-type'] || '',
      floorAreaUnit: 'm²'
    })).filter(r => r.floorArea > 0);

    // Apply site-specific filtering if filterAddress provided
    const matched = filterAddress ? epcMatchSite(allCerts, filterAddress) : allCerts;

    // If filtering was requested but returned nothing → return empty (Rule 1: no fallback)
    if (filterAddress && matched.length === 0) {
      return res.json({ results: [], count: 0, aggregate: null, filtered: true, rawCount: allCerts.length });
    }

    const agg = epcAggregate(matched);
    res.json({
      results: agg.certs,
      count: agg.certCount,
      aggregate: {
        totalGia: agg.totalGia,
        certCount: agg.certCount,
        worstRating: agg.worstRating,
        bestRating: agg.bestRating,
        toLet: agg.toLet,
        avgBenchmark: agg.avgBenchmark
      },
      filtered: !!filterAddress,
      rawCount: allCerts.length
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Debug — raw HMLR response (remove after fixing parser)

// ── HMLR INSPIRE WMS proxy (CORS bypass) ─────────────────────────────────
// Converts XYZ tile coords → EPSG:3857 bbox → fetches HMLR WMS → returns PNG
app.get('/api/hmlr-tile/:z/:x/:y', async (req, res) => {
  const { z, x, y } = req.params;
  const n = Math.pow(2, parseInt(z));
  const R = 6378137;
  const xMin = (parseInt(x) / n) * 2 * Math.PI * R - Math.PI * R;
  const xMax = ((parseInt(x) + 1) / n) * 2 * Math.PI * R - Math.PI * R;
  const yMax = Math.atan(Math.sinh(Math.PI * (1 - 2 * parseInt(y) / n))) * 180 / Math.PI;
  const yMin = Math.atan(Math.sinh(Math.PI * (1 - 2 * (parseInt(y) + 1) / n))) * 180 / Math.PI;
  // Convert lat/lng y bounds to EPSG:3857 metres
  const toMercY = lat => Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360)) * R;
  const bbox = `${xMin.toFixed(2)},${toMercY(yMin).toFixed(2)},${xMax.toFixed(2)},${toMercY(yMax).toFixed(2)}`;
  const params = new URLSearchParams({
    SERVICE:'WMS', VERSION:'1.3.0', REQUEST:'GetMap',
    LAYERS:'inspire:CP.CadastralParcel', STYLES:'',
    CRS:'EPSG:3857', BBOX:bbox,
    WIDTH:'256', HEIGHT:'256', FORMAT:'image/png', TRANSPARENT:'TRUE'
  });
  try {
    const r = await fetch(`https://inspire.landregistry.gov.uk/inspire/ows?${params}`);
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=86400');
    const buf = await r.arrayBuffer();
    res.send(Buffer.from(buf));
  } catch(e) {
    res.status(502).send('WMS proxy error');
  }
});

app.get('/api/version', (req, res) => {
  res.json({ version: '4.3.0-london', built: new Date().toISOString(), engine: 'london-planning-v2' });
});



// ── Building data from OS NGD — real footprint polygon + height ───────────
const buildingDataCache = new Map();
// Street View thumbnail — metadata first to get actual camera position, then compute bearing
const svCache = new Map();
app.get('/api/streetview-thumbnail', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'lat and lng required' });
  const KEY = process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyBJvGIHywOe1tLWcBh0O0Hc0KDd6RUBKHI';
  if (!KEY) return res.status(503).json({ error: 'Street View API key not configured' });

  const cacheKey = `${parseFloat(lat).toFixed(4)},${parseFloat(lng).toFixed(4)}`;
  if (svCache.has(cacheKey)) return res.json(svCache.get(cacheKey));

  try {
    // Step 1: get actual Street View camera position
    const metaUrl = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&radius=80&source=outdoor&key=${KEY}`;
    const meta = await fetch(metaUrl).then(r => r.json());

    if (meta.status !== 'OK') {
      return res.json({ found: false, status: meta.status });
    }

    const camLat = meta.location.lat;
    const camLng = meta.location.lng;

    // Step 2: bearing from camera to building
    const toRad = d => d * Math.PI / 180;
    const toDeg = r => r * 180 / Math.PI;
    const dLng = toRad(parseFloat(lng) - camLng);
    const y = Math.sin(dLng) * Math.cos(toRad(parseFloat(lat)));
    const x = Math.cos(toRad(camLat)) * Math.sin(toRad(parseFloat(lat))) -
              Math.sin(toRad(camLat)) * Math.cos(toRad(parseFloat(lat))) * Math.cos(dLng);
    const heading = Math.round((toDeg(Math.atan2(y, x)) + 360) % 360);

    // Step 3: build static image URL
    const imgUrl = `https://maps.googleapis.com/maps/api/streetview?size=320x180&location=${lat},${lng}&heading=${heading}&pitch=10&fov=80&radius=80&source=outdoor&key=${KEY}`;

    const result = { found: true, url: imgUrl, heading, camLat, camLng };
    svCache.set(cacheKey, result);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/building-data', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'lat and lng required' });
  try {
    const delta = 0.0015;
    const bbox = `${parseFloat(lng)-delta},${parseFloat(lat)-delta},${parseFloat(lng)+delta},${parseFloat(lat)+delta}`;
    const url = `https://api.os.uk/features/ngd/ofa/v1/collections/bld-fts-buildingpart/items?bbox=${bbox}&limit=100&key=${process.env.OS_API_KEY || 'LX85JnG1cHTIXA5bpRGHJmA1QDrHHJWZ'}`;
    const d = await fetch(url).then(r => r.json());
    const features = (d.features || []).filter(f => f.geometry && f.geometry.type === 'Polygon');
    if (!features.length) return res.json({ found: false });
    // Find tallest building part - proxy for main structure
    features.sort((a,b) => (b.properties.relativeheightmaximum||0)-(a.properties.relativeheightmaximum||0));
    const tallest = features[0];
    const coords = tallest.geometry.coordinates[0];
    const maxH = tallest.properties.relativeheightmaximum || 0;
    // Area from polygon (Shoelace)
    let area = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      area += coords[i][0] * coords[i+1][1] - coords[i+1][0] * coords[i][1];
    }
    area = Math.abs(area) / 2 * 111320 * Math.cos(parseFloat(lat) * Math.PI/180) * 110540;
    res.json({ found: true, polygon: coords, height: maxH, area: Math.round(area), parts: features.length });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});
// ── Generate Render — Gemini 3 Pro image generation ────────────────────────
const RENDER_PROMPT = `Transform the provided architectural massing image from an isometric parallel view into a 1-point perspective view while preserving the exact proportions and geometry of the buildings.

Style: physical architectural study model.

Context buildings: matte white foam architectural model with minimal detail.

Proposed design: two-tone timber massing (light natural timber and slightly darker timber) with clear separation between the tones.

Maintain all horizontal floor slab lines and massing articulation exactly as in the original.

Lighting: soft studio lighting as if photographed in an architecture studio, subtle shadows, clean white background, highly controlled light.

Material expression: smooth model materials, crisp edges, no realism beyond model scale.

Camera: 35mm architectural photography perspective, eye-level 1-point perspective, mild depth but not exaggerated.

Composition: centered architectural model photograph, neutral studio backdrop, minimal distraction.

Important constraints:
- do not change proportions
- do not change massing geometry
- only transform the projection from isometric to 1-point perspective
- maintain the floor lines and volumes exactly
- context remains white, proposal remains two-tone timber`;

const renderCooldown = new Map(); // ip → last call timestamp
app.post('/api/generate-render', express.json({ limit: '10mb' }), async (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  const last = renderCooldown.get(ip) || 0;
  if (Date.now() - last < 60000) {
    return res.status(429).json({ error: `Cooldown active — wait ${Math.ceil((60000-(Date.now()-last))/1000)}s before generating again` });
  }
  renderCooldown.set(ip, Date.now());
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) return res.status(400).json({ error: 'imageBase64 required' });
    const GEMINI_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_KEY) return res.status(500).json({ error: 'GEMINI_API_KEY not set' });

    const body = JSON.stringify({
      contents: [{
        parts: [
          { text: RENDER_PROMPT },
          { inlineData: { mimeType: 'image/png', data: imageBase64.replace(/^data:image\/\w+;base64,/, '') } }
        ]
      }],
      generationConfig: { responseModalities: ['image', 'text'] }
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${GEMINI_KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }
    );
    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts || [];
    const imgPart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));
    if (!imgPart) {
      console.error('No image in Gemini response:', JSON.stringify(data).slice(0, 400));
      return res.status(502).json({ error: 'No image returned', detail: data.error?.message });
    }
    res.json({ imageBase64: `data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}` });
  } catch (e) {
    console.error('generate-render error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

// Fetch test pages from GitHub before accepting connections (bypasses Docker COPY cache)
Promise.all(TEST_PAGES.map(fetchTestPage)).then(() => {
  console.log('[test-pages] fetch complete, starting server');
  app.listen(PORT, () => console.log(`DevFeasibility v4.3 (London) running on port ${PORT}`));
}).catch(() => {
  // Start anyway if fetch fails - static files are fallback
  app.listen(PORT, () => console.log(`DevFeasibility v4.3 (London) running on port ${PORT} (test-pages fallback mode)`));
});

// ── Companies House API ─────────────────────────────────────────────────────
app.get('/api/company/:number', async (req, res) => {
  const CH_KEY = process.env.COMPANIES_HOUSE_API_KEY || '0bc63988-71f1-4bf5-bc42-26a393b96ebb';
  const { number } = req.params;
  if (!number || !/^\d{6,8}$/.test(number)) return res.status(400).json({ error: 'Invalid company number' });
  try {
    const auth = Buffer.from(CH_KEY + ':').toString('base64');
    const r = await fetch(`https://api.company-information.service.gov.uk/company/${number.padStart(8,'0')}`, {
      headers: { 'Authorization': `Basic ${auth}` }
    });
    if (!r.ok) return res.status(r.status).json({ error: `CH API ${r.status}` });
    const d = await r.json();
    res.json({
      name: d.company_name,
      number: d.company_number,
      status: d.company_status,
      type: d.type,
      incorporated: d.date_of_creation,
      address: d.registered_office_address,
      sicCodes: d.sic_codes,
      accounts: d.accounts,
      lastAccounts: d.accounts?.last_accounts?.made_up_to
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Company officers (directors)
app.get('/api/company/:number/officers', async (req, res) => {
  const CH_KEY = process.env.COMPANIES_HOUSE_API_KEY || '0bc63988-71f1-4bf5-bc42-26a393b96ebb';
  const { number } = req.params;
  if (!number || !/^\d{6,8}$/.test(number)) return res.status(400).json({ error: 'Invalid company number' });
  try {
    const auth = Buffer.from(CH_KEY + ':').toString('base64');
    const r = await fetch(`https://api.company-information.service.gov.uk/company/${number.padStart(8,'0')}/officers`, {
      headers: { 'Authorization': `Basic ${auth}` }
    });
    if (!r.ok) return res.status(r.status).json({ error: `CH API ${r.status}` });
    const d = await r.json();
    res.json({
      total: d.total_results,
      officers: (d.items || []).map(o => ({
        name: o.name,
        role: o.officer_role,
        appointed: o.appointed_on,
        resigned: o.resigned_on || null,
        nationality: o.nationality
      }))
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
