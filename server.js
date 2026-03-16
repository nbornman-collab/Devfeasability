const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN || '';
const OS_API_KEY = process.env.OS_API_KEY; // set in Railway env vars

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

app.use(express.static(path.join(__dirname, 'public')));

// ── Tier routes: /t1/:site, /t2/:site, /t3/:site ──────────────────────────
// T1 Scout  — site overview (placeholder until built)
// T2 Appraise — massing tool
// T3 Present  — full PDF report
app.get('/t2/:site', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'massing', `${req.params.site}.html`));
});
const T3_ALIASES = { '100-leadenhall': '100-leadenhall-street' };
app.get('/t3/:site', (req, res) => {
  const name = T3_ALIASES[req.params.site] || req.params.site;
  res.sendFile(path.join(__dirname, 'public', 'reports', `${name}.html`));
});
app.get('/t1/:site', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'scout', `${req.params.site}.html`));
});

// Borough screener — /borough/:name → public/borough/:name.html
app.get('/borough/:name', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'borough', `${req.params.name}.html`));
});

// Serve mapbox token
app.get('/api/config', (req, res) => {
  res.json({ mapboxToken: MAPBOX_TOKEN });
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

// ── PropertyData Plot Boundary ─────────────────────────────────────────────
const PROPERTYDATA_KEY = process.env.PROPERTYDATA_KEY || 'ZUMC9NNHVH';
const PD_BASE = 'https://api.propertydata.co.uk';

// In-memory cache: key = "lat,lng" or "postcode" → result (TTL 24h)
const pdCache = new Map();
const PD_TTL = 24 * 60 * 60 * 1000;

async function pdGet(path) {
  const sep = path.includes('?') ? '&' : '?';
  const url = `${PD_BASE}${path}${sep}key=${PROPERTYDATA_KEY}`;
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

// GET /api/plot-boundary?lat=...&lng=...&postcode=...
// Returns GeoJSON feature with legal boundary + ownership from PropertyData
app.get('/api/plot-boundary', async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const postcode = req.query.postcode || '';
  if (!lat || !lng) return res.status(400).json({ error: 'lat and lng required' });

  const cacheKey = `${lat.toFixed(5)},${lng.toFixed(5)}`;
  const cached = pdCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < PD_TTL) return res.json(cached.data);

  try {
    // Step 1: find freeholds by coordinate, fall back to postcode
    let fhData = null;
    try {
      const fh = await pdGet(`/freeholds?lat=${lat}&long=${lng}`);
      if (fh.status === 'success' && fh.data?.length) fhData = fh.data;
    } catch (_) {}

    if (!fhData && postcode) {
      const fhpc = await pdGet(`/freeholds?postcode=${encodeURIComponent(postcode)}`);
      if (fhpc.status === 'success' && fhpc.data?.length) fhData = fhpc.data;
    }

    if (!fhData || !fhData.length) {
      return res.json({ status: 'no_data', source: 'propertydata', features: [] });
    }

    // Step 2: pick best title + fetch full detail
    const best = pickBestTitle(fhData, lat, lng);
    const titleNo = best.title_number;
    const detail = await pdGet(`/title?title=${titleNo}`);

    if (!detail.data) return res.json({ status: 'no_title', title_number: titleNo, features: [] });

    const d = detail.data;
    const poly = d.polygons?.[0];
    const coords = poly?.coords || [];

    // Convert plot_size (acres) → m²
    const plotSizeAcres = parseFloat(d.plot_size || poly?.polygon_size || 0);
    const areaSqm = Math.round(plotSizeAcres * 4047);

    // Build GeoJSON polygon [lng, lat] pairs
    const ring = coords.map(c => [c.lng, c.lat]);
    if (ring.length > 0 && (ring[0][0] !== ring[ring.length-1][0] || ring[0][1] !== ring[ring.length-1][1])) {
      ring.push(ring[0]); // close ring
    }

    const feature = {
      type: 'Feature',
      properties: {
        title_number: titleNo,
        title_class: d.class || best.class,
        area_sqm: areaSqm,
        plot_size_acres: plotSizeAcres,
        owner: d.ownership?.details?.owner || null,
        owner_type: d.ownership?.details?.owner_type || null,
        owner_address: d.ownership?.details?.owner_address || null,
        date_registered: d.ownership?.details?.date_added || null,
        leaseholds: d.leaseholds?.length || 0,
        polygon_count: d.polygon_count || 1,
        vertices: coords.length,
        source: 'PropertyData / HMLR',
        all_titles: fhData.length
      },
      geometry: ring.length > 3 ? {
        type: 'Polygon',
        coordinates: [ring]
      } : null
    };

    const result = { status: 'ok', source: 'propertydata', features: [feature] };
    pdCache.set(cacheKey, { data: result, ts: Date.now() });
    res.json(result);

  } catch (e) {
    console.error('plot-boundary error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

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
app.get('/api/plot-boundary', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ error: 'lat/lng required' });
    const buf = 0.0015; // ~150m — large enough to capture big commercial sites
    const minLon = (parseFloat(lng) - buf).toFixed(6);
    const minLat = (parseFloat(lat) - buf).toFixed(6);
    const maxLon = (parseFloat(lng) + buf).toFixed(6);
    const maxLat = (parseFloat(lat) + buf).toFixed(6);

    // WFS 1.1.0 format — confirmed working with HMLR INSPIRE
    // BBOX order for EPSG:4326: minLat,minLon,maxLat,maxLon
    const url = `https://inspire.landregistry.gov.uk/inspire/ows` +
      `?service=WFS&version=1.1.0&request=GetFeature` +
      `&typeName=inspire:RegisteredPoleland` +
      `&maxFeatures=20` +
      `&srsName=EPSG:4326` +
      `&bbox=${minLat},${minLon},${maxLat},${maxLon},EPSG:4326`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    let text = '';
    try {
      const r = await fetch(url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'devfeasibility/1.0 (nbornman@gmail.com)' }
      });
      clearTimeout(timeout);
      text = await r.text();
    } catch (fetchErr) {
      clearTimeout(timeout);
      return res.json({ type: 'FeatureCollection', features: [], error: fetchErr.message });
    }

    // Parse GML response → GeoJSON
    const features = [];
    const memberRe = /<inspire:RegisteredPoleland[^>]*>([\s\S]*?)<\/inspire:RegisteredPoleland>/g;
    let m;
    while ((m = memberRe.exec(text)) !== null) {
      const xml = m[1];
      const titleMatch = xml.match(/<inspire:TITLE_NO[^>]*>(.*?)<\/inspire:TITLE_NO>/);
      const titleNo = titleMatch ? titleMatch[1].trim() : '';
      const rings = [];
      const posRe = /<gml:posList[^>]*srsDimension="2"[^>]*>([\s\S]*?)<\/gml:posList>|<gml:posList[^>]*>([\s\S]*?)<\/gml:posList>/g;
      let pr;
      while ((pr = posRe.exec(xml)) !== null) {
        const raw = (pr[1] || pr[2] || '').trim();
        const nums = raw.split(/\s+/).map(Number).filter(n => !isNaN(n));
        if (nums.length < 6) continue;
        const coords = [];
        for (let i = 0; i < nums.length - 1; i += 2) {
          // HMLR GML in EPSG:4326 is latitude-first — swap to lon,lat for GeoJSON
          const a = nums[i], b = nums[i + 1];
          // Detect axis order: UK lat ~51, UK lon ~ -0.1
          if (Math.abs(a) > 10) coords.push([b, a]); // a=lat, b=lon → swap
          else coords.push([a, b]); // already lon,lat
        }
        if (coords.length >= 3) rings.push(coords);
      }
      if (rings.length > 0) {
        features.push({
          type: 'Feature',
          geometry: { type: 'Polygon', coordinates: rings },
          properties: { titleNo, source: 'hmlr-inspire' }
        });
      }
    }

    res.json({ type: 'FeatureCollection', features, count: features.length });
  } catch (e) {
    res.status(500).json({ type: 'FeatureCollection', features: [], error: e.message });
  }
});

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
app.get('/api/borough', async (req, res) => {
  try {
    const { lat, lng } = req.query;

    // Strategy 1: postcodes.io — free, accurate borough from point-in-polygon
    try {
      const pcRes = await fetch(`https://api.postcodes.io/postcodes?lon=${lng}&lat=${lat}&limit=1`);
      const pcData = await pcRes.json();
      if (pcData.result && pcData.result.length > 0) {
        const r = pcData.result[0];
        const borough = r.admin_district || 'Unknown';
        return res.json({
          borough: borough,
          fullName: `${borough}, London`,
          postcode: r.postcode || '',
          ward: r.admin_ward || '',
          parish: r.parish || ''
        });
      }
    } catch (e) { /* fall through to Mapbox */ }

    // Strategy 2: Mapbox reverse geocode (fallback)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&types=district,locality,place&country=gb`;
    const r = await fetch(url);
    const data = await r.json();
    const district = data.features?.find(f => f.place_type?.includes('district'));
    const locality = data.features?.find(f => f.place_type?.includes('locality'));
    const postcode = data.features?.find(f => f.place_type?.includes('postcode'));
    res.json({
      borough: district?.text || locality?.text || 'Unknown',
      fullName: district?.place_name || locality?.place_name || '',
      postcode: postcode?.text || ''
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

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
        // RelativeHeightMaximum = height above ground (metres)
        // RelativeHeightMinimum = base above ground (0 for ground-level, >0 for elevated)
        const p = f.properties;
        f.properties._heightMax = p.RelativeHeightMaximum || p.relativeheightmaximum || p.heightMax || null;
        f.properties._heightMin = p.RelativeHeightMinimum || p.relativeheightminimum || p.heightMin || 0;
        // Estimated existing floors and GIA
        if (f.properties._heightMax && f.properties._area) {
          const floors = Math.round(f.properties._heightMax / 3.5);
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
// Requires EPC_EMAIL + EPC_API_KEY from epc.opendatacommunities.org (free)
const EPC_EMAIL = process.env.EPC_EMAIL || 'nbornman@gmail.com';
const EPC_API_KEY = process.env.EPC_API_KEY || 'c471dfb99d2721e8ed59b70630fcb36bedad2714';

app.get('/api/epc', async (req, res) => {
  const { address, postcode, uprn, type } = req.query;
  if (!EPC_EMAIL || !EPC_API_KEY) return res.status(503).json({ error: 'EPC credentials not configured', hint: 'Set EPC_EMAIL and EPC_API_KEY' });

  const auth = Buffer.from(`${EPC_EMAIL}:${EPC_API_KEY}`).toString('base64');
  const endpoint = (type === 'domestic') ? 'domestic' : 'non-domestic';
  let query = '';
  if (uprn) query = `uprn=${uprn}`;
  else if (postcode) query = `postcode=${encodeURIComponent(postcode)}&size=5`;
  else if (address) query = `address=${encodeURIComponent(address)}&size=5`;
  else return res.status(400).json({ error: 'address, postcode or uprn required' });

  try {
    const url = `https://epc.opendatacommunities.org/api/v1/${endpoint}/search?${query}`;
    const r = await fetch(url, {
      headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json', 'User-Agent': 'devfeasibility/1.0' },
      signal: AbortSignal.timeout(10000)
    });
    if (!r.ok) return res.status(r.status).json({ error: `EPC API ${r.status}` });
    const data = await r.json();
    // EPC API returns {column-names:[...], rows:[{...}]}
    const rows = data.rows || data.certificates || [];
    const results = rows.slice(0, 5).map(row => ({
      address: row['address'] || [row['address1'],row['address2'],row['address3']].filter(Boolean).join(', '),
      postcode: row['postcode'],
      uprn: row['uprn'],
      floorArea: parseFloat(row['floor-area'] || row['total-floor-area'] || 0),
      epcRating: row['asset-rating-band'] || row['current-energy-rating'],
      assetRating: row['asset-rating'],
      lodgementDate: row['lodgement-date'] || row['lodgement-datetime'],
      propertyType: row['property-type'],
      floorAreaUnit: 'm²'
    })).filter(r => r.floorArea > 0);
    res.json({ results, count: results.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Debug — raw HMLR response (remove after fixing parser)
app.get('/api/plot-boundary-debug', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const buf = 0.0015;
    const minLon = (parseFloat(lng) - buf).toFixed(6);
    const minLat = (parseFloat(lat) - buf).toFixed(6);
    const maxLon = (parseFloat(lng) + buf).toFixed(6);
    const maxLat = (parseFloat(lat) + buf).toFixed(6);
    const url = `https://inspire.landregistry.gov.uk/inspire/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=inspire:RegisteredPoleland&maxFeatures=5&srsName=EPSG:4326&bbox=${minLat},${minLon},${maxLat},${maxLon},EPSG:4326`;
    const r = await fetch(url, { headers: { 'User-Agent': 'devfeasibility/1.0' }, signal: AbortSignal.timeout(15000) });
    const text = await r.text();
    res.set('Content-Type', 'text/plain').send(text.substring(0, 4000));
  } catch (e) { res.status(500).send(e.message); }
});

app.get('/api/version', (req, res) => {
  res.json({ version: '4.3.0-london', built: new Date().toISOString(), engine: 'london-planning-v2' });
});

app.listen(PORT, () => console.log(`DevFeasibility v4.3 (London) running on port ${PORT}`));
