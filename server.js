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

// Proxy geocoder
app.get('/api/geocode', async (req, res) => {
  try {
    const url = `https://geosearch.planninglabs.nyc/v2/search?text=${encodeURIComponent(req.query.text)}`;
    const r = await fetch(url);
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Proxy PLUTO
app.get('/api/pluto', async (req, res) => {
  try {
    const url = `https://data.cityofnewyork.us/resource/64uk-42ks.json?bbl=${req.query.bbl}`;
    const r = await fetch(url);
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Proxy lot geometry from MapPLUTO ArcGIS
app.get('/api/lot-geom', async (req, res) => {
  try {
    const bbl = req.query.bbl;
    const url = `https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/MAPPLUTO/FeatureServer/0/query?where=BBL='${bbl}'&outFields=*&f=geojson&resultRecordCount=1`;
    const r = await fetch(url);
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Reverse geocode
app.get('/api/reverse', async (req, res) => {
  try {
    const url = `https://geosearch.planninglabs.nyc/v2/reverse?point.lat=${req.query.lat}&point.lon=${req.query.lng}`;
    const r = await fetch(url);
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(PORT, () => console.log(`DevFeasibility v2 running on port ${PORT}`));
