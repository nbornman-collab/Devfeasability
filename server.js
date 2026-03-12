const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN || '';

app.use(express.static(path.join(__dirname, 'public')));

// Serve mapbox token
app.get('/api/config', (req, res) => {
  res.json({ mapboxToken: MAPBOX_TOKEN });
});

// UK geocoding via Mapbox
app.get('/api/geocode', async (req, res) => {
  try {
    const text = encodeURIComponent(req.query.text);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${MAPBOX_TOKEN}&country=gb&bbox=-0.51,51.28,0.33,51.69&types=address,poi&limit=5`;
    const r = await fetch(url);
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Reverse geocode (Mapbox)
app.get('/api/reverse', async (req, res) => {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.query.lng},${req.query.lat}.json?access_token=${MAPBOX_TOKEN}&country=gb&types=address`;
    const r = await fetch(url);
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Overpass API — get building footprint + tags near a point
app.get('/api/building', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const radius = req.query.radius || 30;
    const query = `[out:json][timeout:10];(way["building"](around:${radius},${lat},${lng});relation["building"](around:${radius},${lat},${lng}););out body;>;out skel qt;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const r = await fetch(url);
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Land Registry Price Paid — recent sales near a point
app.get('/api/land-registry', async (req, res) => {
  try {
    const { postcode } = req.query;
    if (!postcode) return res.json([]);
    const pc = postcode.replace(/\s/g, '+');
    const url = `https://landregistry.data.gov.uk/data/ppi/transaction-record.json?propertyAddress.postcode=${pc}&_pageSize=10&_sort=-transactionDate`;
    const r = await fetch(url);
    const data = await r.json();
    res.json(data.result?.items || []);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// EPC data lookup by postcode
app.get('/api/epc', async (req, res) => {
  try {
    const { postcode } = req.query;
    if (!postcode) return res.json([]);
    // EPC API requires auth token — for now return empty and we'll add later
    // const url = `https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=${postcode}&size=5`;
    res.json([]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Borough lookup from coordinates using a simple bounds check
app.get('/api/borough', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    // Use Mapbox reverse geocode to get locality/district
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&types=district,locality&country=gb`;
    const r = await fetch(url);
    const data = await r.json();
    const district = data.features?.find(f => f.place_type?.includes('district'));
    const locality = data.features?.find(f => f.place_type?.includes('locality'));
    res.json({
      borough: district?.text || locality?.text || 'Unknown',
      fullName: district?.place_name || locality?.place_name || '',
      postcode: data.features?.find(f => f.place_type?.includes('postcode'))?.text || ''
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/version', (req, res) => {
  res.json({ version: '4.0.0-london', built: new Date().toISOString(), engine: 'london-planning-v1' });
});

app.listen(PORT, () => console.log(`DevFeasibility v4 (London) running on port ${PORT}`));
