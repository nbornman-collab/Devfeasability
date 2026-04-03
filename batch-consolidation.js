#!/usr/bin/env node
/**
 * Batch consolidation opportunity enrichment
 * Queries PropertyData freeholds API per site postcode,
 * counts titles within/near the site polygon,
 * writes consolidation data back to site JSONs + intel files
 */

const fs = require('fs');
const path = require('path');

const API_KEY = 'ZUMC9NNHVH';
const INTEL_DIR = path.join(__dirname, 'public', 'lib');
const DATA_DIR = path.join(__dirname, 'public', 'data');

// Rate limit: PropertyData allows ~1 req/sec
const DELAY_MS = 1200;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

// Extract postcodes + polygons from intelligence files
function loadIntelSites() {
  const sites = [];
  const files = fs.readdirSync(INTEL_DIR).filter(f => f.startsWith('intelligence-') && f.endsWith('.js'));
  
  for (const fname of files) {
    const content = fs.readFileSync(path.join(INTEL_DIR, fname), 'utf8');
    const nm = content.match(/site:\s*["']([^"']*)["']/);
    const addr = content.match(/address:\s*["']([^"']*)["']/);
    const pm = content.match(/polygon:\s*(\[[\[\]\-\d.,\s]+\])/);
    
    if (!nm) continue;
    
    const pcMatch = addr ? addr[1].match(/[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}/) : null;
    const polygon = pm ? JSON.parse(pm[1]) : null;
    
    if (pcMatch && polygon && polygon.length >= 3) {
      sites.push({
        name: nm[1],
        postcode: pcMatch[0].replace(/\s+/g, ' '),
        polygon,
        file: fname
      });
    }
  }
  return sites;
}

// Check if a lat/lng point is roughly within a polygon bounding box + margin
function isNearPolygon(lat, lng, polygon, marginDeg = 0.0003) {
  const lats = polygon.map(p => p[1]);
  const lngs = polygon.map(p => p[0]);
  const minLat = Math.min(...lats) - marginDeg;
  const maxLat = Math.max(...lats) + marginDeg;
  const minLng = Math.min(...lngs) - marginDeg;
  const maxLng = Math.max(...lngs) + marginDeg;
  return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
}

// Distance in metres between two lat/lng points
function distM(lat1, lng1, lat2, lng2) {
  const dlat = (lat1 - lat2) * 110540;
  const dlng = (lng1 - lng2) * 111320 * Math.cos(lat1 * Math.PI / 180);
  return Math.sqrt(dlat * dlat + dlng * dlng);
}

// Score consolidation opportunity
function scoreConsolidation(titlesInSite) {
  const n = titlesInSite.length;
  if (n <= 1) return { score: 0, label: 'Single Freehold', tier: 'single' };
  
  const totalLH = titlesInSite.reduce((s, t) => s + t.leaseholds, 0);
  const vacantCount = titlesInSite.filter(t => t.leaseholds === 0).length;
  const vacantRatio = vacantCount / n;
  
  // Scoring: fewer titles + more vacant = easier assembly
  let tier, label;
  if (n <= 3 && vacantRatio >= 0.5) {
    tier = 'easy'; label = 'Easy Assembly';
  } else if (n <= 6 && vacantRatio >= 0.3) {
    tier = 'play'; label = 'Assembly Play';
  } else if (n <= 6) {
    tier = 'moderate'; label = 'Moderate Assembly';
  } else if (vacantRatio >= 0.5) {
    tier = 'play'; label = 'Assembly Play';
  } else {
    tier = 'complex'; label = 'Complex Assembly';
  }
  
  return {
    score: Math.round((vacantRatio * 5 + (1 / n) * 5) * 10) / 10,
    label,
    tier,
    titles_total: n,
    titles_vacant: vacantCount,
    titles_occupied: n - vacantCount,
    total_leaseholds: totalLH,
    vacant_ratio: Math.round(vacantRatio * 100)
  };
}

async function run() {
  const sites = loadIntelSites();
  console.log(`Found ${sites.length} sites with postcodes + polygons`);
  
  const results = {};
  let processed = 0;
  let errors = 0;
  
  for (const site of sites) {
    try {
      const pc = site.postcode.replace(/\s+/g, '+');
      const url = `https://api.propertydata.co.uk/freeholds?key=${API_KEY}&postcode=${pc}&max_results=20`;
      const data = await fetchJSON(url);
      
      if (data.status !== 'success') {
        console.log(`  ⚠️  ${site.name} (${site.postcode}): ${data.message || 'API error'}`);
        errors++;
        await sleep(DELAY_MS);
        continue;
      }
      
      // Polygon centroid
      const cx = site.polygon.reduce((s, p) => s + p[0], 0) / site.polygon.length;
      const cy = site.polygon.reduce((s, p) => s + p[1], 0) / site.polygon.length;
      
      // Find titles within or near site polygon
      const titlesInSite = [];
      const titlesNearby = [];
      
      for (const title of (data.data || [])) {
        for (const poly of (title.polygons || [])) {
          const inSite = isNearPolygon(poly.lat, poly.lng, site.polygon, 0.0002);
          const dist = distM(poly.lat, poly.lng, cy, cx);
          
          const entry = {
            title_number: title.title_number,
            class: title.class,
            lat: poly.lat,
            lng: poly.lng,
            leaseholds: poly.leaseholds || 0,
            num_points: poly.num_points,
            dist_m: Math.round(dist)
          };
          
          if (inSite) {
            titlesInSite.push(entry);
          } else if (dist < 150) {
            titlesNearby.push(entry);
          }
        }
      }
      
      const consolidation = scoreConsolidation(titlesInSite);
      consolidation.titles_in_site = titlesInSite;
      consolidation.titles_nearby = titlesNearby.length;
      
      results[site.name] = consolidation;
      processed++;
      
      const emoji = consolidation.tier === 'easy' ? '🟢' : 
                     consolidation.tier === 'play' ? '🟡' : 
                     consolidation.tier === 'single' ? '⚪' :
                     consolidation.tier === 'moderate' ? '🟠' : '🔴';
      console.log(`${emoji} ${site.name}: ${consolidation.label} (${consolidation.titles_total || 1} titles, ${consolidation.titles_vacant || 0} vacant, ${consolidation.total_leaseholds || 0} LH)`);
      
    } catch (e) {
      console.log(`  ❌ ${site.name}: ${e.message}`);
      errors++;
    }
    
    await sleep(DELAY_MS);
  }
  
  // Write results to a consolidation data file
  const outPath = path.join(DATA_DIR, 'consolidation.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Done: ${processed} processed, ${errors} errors`);
  console.log(`📄 Results: ${outPath}`);
  
  // Now update site JSONs with consolidation data
  for (const jsonFile of ['southwark-sites.json', 'city-sites.json', 'hackney-sites.json']) {
    const filePath = path.join(DATA_DIR, jsonFile);
    let sites = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const isArray = Array.isArray(sites);
    const arr = isArray ? sites : (sites.sites || Object.values(sites));
    let updated = 0;
    
    for (const s of arr) {
      const name = s.name || s.address;
      if (results[name]) {
        const c = results[name];
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
      fs.writeFileSync(filePath, JSON.stringify(isArray ? arr : sites, null, 2));
      console.log(`📝 ${jsonFile}: ${updated} sites updated`);
    }
  }
}

run().catch(e => { console.error(e); process.exit(1); });
