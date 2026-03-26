import fs from 'fs';
import https from 'https';

const API_KEY = 'AIzaSyBJvGIHywOe1tLWcBh0O0Hc0KDd6RUBKHI';
const DATA_PATH = '/data/.openclaw/workspace/devfeasibility-app/public/data/southwark-sites.json';

function haversineM(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchGeocode(lat, lng) {
  return new Promise((resolve, reject) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function calcAreaFromViewport(viewport) {
  const { northeast: ne, southwest: sw } = viewport;
  const widthM = haversineM(sw.lat, sw.lng, sw.lat, ne.lng);
  const heightM = haversineM(sw.lat, sw.lng, ne.lat, sw.lng);
  return widthM * heightM;
}

async function main() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const data = JSON.parse(raw);
  const sites = data.sites;

  const toUpdate = sites.filter(s => !s.plot || s.plot === 0);
  console.log(`Found ${toUpdate.length} sites needing plot estimation`);

  const log = [];
  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < sites.length; i++) {
    const site = sites[i];
    if (site.plot && site.plot > 0) continue;

    console.log(`[${i + 1}/${sites.length}] Processing: ${site.name}`);

    try {
      const geo = await fetchGeocode(site.lat, site.lng);

      if (geo.status !== 'OK' || !geo.results || geo.results.length === 0) {
        console.log(`  ⚠️  No results (status: ${geo.status})`);
        errors++;
        log.push({ name: site.name, result: 'no_results', status: geo.status });
        await sleep(500);
        continue;
      }

      // Find the first result with a viewport
      let viewport = null;
      for (const result of geo.results) {
        if (result.geometry && result.geometry.viewport) {
          viewport = result.geometry.viewport;
          break;
        }
      }

      if (!viewport) {
        console.log(`  ⚠️  No viewport found`);
        errors++;
        log.push({ name: site.name, result: 'no_viewport' });
        await sleep(500);
        continue;
      }

      const rawArea = calcAreaFromViewport(viewport);
      const estimatedPlot = Math.round(rawArea * 0.6);

      if (estimatedPlot < 200 || estimatedPlot > 50000) {
        console.log(`  ⚠️  Area out of range: ${estimatedPlot}m² (raw: ${Math.round(rawArea)}m²) — skipping`);
        skipped++;
        log.push({ name: site.name, result: 'out_of_range', rawArea: Math.round(rawArea), estimatedPlot });
        await sleep(500);
        continue;
      }

      site.plot = estimatedPlot;
      site.plotEstimated = true;
      updated++;
      console.log(`  ✅ plot = ${estimatedPlot}m² (raw bbox: ${Math.round(rawArea)}m²)`);
      log.push({ name: site.name, result: 'updated', rawArea: Math.round(rawArea), estimatedPlot });

    } catch (err) {
      console.log(`  ❌ Error: ${err.message}`);
      errors++;
      log.push({ name: site.name, result: 'error', error: err.message });
    }

    await sleep(500);
  }

  // Write updated JSON
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  console.log(`\n✅ Done. Updated: ${updated}, Skipped (out of range): ${skipped}, Errors: ${errors}`);
  console.log('\nUpdate log:');
  log.forEach(l => console.log(JSON.stringify(l)));
}

main().catch(console.error);
