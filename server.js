const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN || '';

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
app.get('/t3/:site', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'reports', `${req.params.site}.html`));
});
app.get('/t1/:site', (req, res) => {
  // T1 Scout — redirect to T2 until Scout page is built
  res.redirect(302, `/t2/${req.params.site}`);
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

// Land Registry INSPIRE — plot boundaries (WFS)
app.get('/api/plot-boundary', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const buffer = 0.0003; // ~30m
    const bbox = `${parseFloat(lng)-buffer},${parseFloat(lat)-buffer},${parseFloat(lng)+buffer},${parseFloat(lat)+buffer}`;
    const url = `https://inspire.landregistry.gov.uk/inspire/ows?service=WFS&version=2.0.0&request=GetFeature&typeNames=inspire:PREDEFINED&bbox=${bbox},urn:ogc:def:crs:EPSG::4326&outputFormat=application/json&count=5`;
    const r = await fetch(url);
    const text = await r.text();
    try { res.json(JSON.parse(text)); } catch { res.json({ features: [], error: 'Parse error', raw: text.substring(0, 200) }); }
  } catch (e) { res.status(500).json({ error: e.message }); }
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

// EPC data from Open Data Communities
app.get('/api/epc', async (req, res) => {
  try {
    const { postcode, address } = req.query;
    if (!postcode && !address) return res.json({ certificates: [] });
    // EPC API uses basic auth with empty username + API key, but open data endpoint is free
    const params = new URLSearchParams({ size: '5' });
    if (postcode) params.set('postcode', postcode.trim());
    if (address) params.set('address', address.trim());
    const url = `https://epc.opendatacommunities.org/api/v1/domestic/search?${params}`;
    const r = await fetch(url, {
      headers: { 'Accept': 'application/json', 'Authorization': 'Basic ' + Buffer.from('nbornman@gmail.com:e4446e7e0ddf7114800f23b27dbbd5e7ea7f0203').toString('base64') }
    });
    if (!r.ok) {
      // Try non-domestic (commercial)
      const url2 = `https://epc.opendatacommunities.org/api/v1/non-domestic/search?${params}`;
      const r2 = await fetch(url2, {
        headers: { 'Accept': 'application/json', 'Authorization': 'Basic ' + Buffer.from('nbornman@gmail.com:e4446e7e0ddf7114800f23b27dbbd5e7ea7f0203').toString('base64') }
      });
      if (!r2.ok) return res.json({ certificates: [] });
      const data2 = await r2.json();
      return res.json({ certificates: data2.rows || [], type: 'non-domestic' });
    }
    const data = await r.json();
    res.json({ certificates: data.rows || [], type: 'domestic' });
  } catch (e) { res.status(500).json({ error: e.message, certificates: [] }); }
});

app.get('/api/version', (req, res) => {
  res.json({ version: '4.3.0-london', built: new Date().toISOString(), engine: 'london-planning-v2' });
});

app.listen(PORT, () => console.log(`DevFeasibility v4.3 (London) running on port ${PORT}`));
