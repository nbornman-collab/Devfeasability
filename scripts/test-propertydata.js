#!/usr/bin/env node
// PropertyData API test — site boundary + plot size
// Usage: PROPERTYDATA_KEY=xxx node scripts/test-propertydata.js

const API_KEY = process.env.PROPERTYDATA_KEY;
if (!API_KEY) { console.error('Set PROPERTYDATA_KEY env var'); process.exit(1); }

const BASE = 'https://api.propertydata.co.uk';

const SITES = [
  { name: '100 Leadenhall St',  lat: 51.5137673, lng: -0.0801551, postcode: 'EC3A 3BP', expected: '~1551m² footprint, ~2382m² INSPIRE' },
  { name: '1 Silk Street',       lat: 51.52033,   lng: -0.09163,   postcode: 'EC2Y 8HQ', expected: '5709m² (Nic confirmed), complex campus' },
  { name: 'Tower 42 (control)',  lat: 51.51567,   lng: -0.08514,   postcode: 'EC2N 1HQ', expected: 'Standalone tower — should be clean single title' },
];

async function get(path) {
  const url = `${BASE}${path}&key=${API_KEY}`;
  const r = await fetch(url);
  const text = await r.text();
  try { return JSON.parse(text); }
  catch { return { error: text.substring(0, 200) }; }
}

(async () => {
  for (const site of SITES) {
    console.log('\n' + '='.repeat(60));
    console.log(`SITE: ${site.name}`);
    console.log(`Expected: ${site.expected}`);
    console.log('─'.repeat(60));

    // Step 1: find freeholds by coordinate
    const fh = await get(`/freeholds?lat=${site.lat}&long=${site.lng}`);
    
    if (fh.error || !fh.data) {
      // Try by postcode
      console.log('Coordinate lookup failed, trying postcode...');
      const fhpc = await get(`/freeholds?postcode=${encodeURIComponent(site.postcode)}`);
      console.log('Postcode result:', JSON.stringify(fhpc, null, 2).substring(0, 800));
      continue;
    }

    const titles = fh.data?.freeholds || fh.data || [];
    console.log(`Found ${Array.isArray(titles) ? titles.length : '?'} freehold title(s)`);

    if (Array.isArray(titles) && titles.length > 0) {
      // Show headline for each title
      for (const t of titles.slice(0, 3)) {
        console.log(`  Title: ${t.title_number || t.titleNumber || JSON.stringify(t).substring(0,100)}`);
      }

      // Step 2: get full boundary for first title
      const titleNo = titles[0].title_number || titles[0].titleNumber;
      if (titleNo) {
        console.log(`\nFetching full boundary for ${titleNo}...`);
        const detail = await get(`/title?title=${titleNo}`);
        
        if (detail.data) {
          const d = detail.data;
          console.log(`  Plot size: ${d.plot_size || d.plotSize || 'not returned'} m²`);
          console.log(`  Tenure: ${d.tenure || 'unknown'}`);
          console.log(`  Proprietor: ${d.proprietors?.[0]?.name || 'unknown'}`);
          const coords = d.boundary?.coordinates?.[0] || d.coordinates;
          if (coords) {
            console.log(`  Boundary vertices: ${coords.length}`);
            console.log(`  Bbox: ${JSON.stringify(coords.reduce((b,c) => ({
              minLng: Math.min(b.minLng,c[0]), maxLng: Math.max(b.maxLng,c[0]),
              minLat: Math.min(b.minLat,c[1]), maxLat: Math.max(b.maxLat,c[1])
            }), { minLng:999,maxLng:-999,minLat:999,maxLat:-999 }))}`);
          } else {
            console.log('  No boundary coordinates in response');
          }
          console.log('  Full response keys:', Object.keys(d));
        } else {
          console.log('Title detail:', JSON.stringify(detail, null, 2).substring(0, 600));
        }
      }
    } else {
      console.log('Raw response:', JSON.stringify(fh, null, 2).substring(0, 600));
    }

    await new Promise(ok => setTimeout(ok, 500)); // rate limit
  }
})();
