const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

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

// Reverse geocode (lat/lng to address via NYC geocoder)
app.get('/api/reverse', async (req, res) => {
  try {
    const url = `https://geosearch.planninglabs.nyc/v2/reverse?point.lat=${req.query.lat}&point.lon=${req.query.lng}`;
    const r = await fetch(url);
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
