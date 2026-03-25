#!/usr/bin/env python3
"""
NHLE Heritage Verification Script
Queries Historic England's National Heritage List for England (NHLE) via ArcGIS REST API.

For each site intelligence file:
1. Extracts centroid from polygon or centroid field
2. Queries NHLE for listed buildings within 50m radius
3. Reports: ON-SITE (within 15m), ADJACENT (15-50m)
4. Flags mismatches between current heritage tier and actual listing status

API: Historic England ArcGIS Feature Service (free, no auth)
Service: National_Heritage_List_for_England_NHLE_v02_VIEW

Usage:
  python3 nhle-heritage-check.py                    # Audit all sites
  python3 nhle-heritage-check.py --fix               # Audit + generate fix recommendations
  python3 nhle-heritage-check.py --site 24ss         # Check single site
"""

import json
import os
import re
import sys
import time
import urllib.request
import urllib.parse
from datetime import datetime

INTEL_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "lib")
NHLE_URL = "https://services-eu1.arcgis.com/ZOdPfBS3aqqDYPUQ/ArcGIS/rest/services/National_Heritage_List_for_England_NHLE_v02_VIEW/FeatureServer/0/query"

# Heritage response type thresholds
# If a Grade I/II* is ON-SITE or ADJACENT: minimum tier = FULL_CONSERVATION or RETAIN_AND_ADAPT
# If a Grade II is ON-SITE: minimum tier = RETAIN_AND_ADAPT
# If a Grade II is ADJACENT (15-50m): minimum tier = manageable (with correct data)

def get_centroid(filepath):
    """Extract centroid from intelligence file."""
    with open(filepath) as f:
        content = f.read()
    
    # Try polygon first
    poly_match = re.search(r'polygon:\s*\[((?:\[[-\d.]+\s*,\s*[-\d.]+\]\s*,?\s*)+)\]', content)
    if poly_match:
        try:
            coords_str = '[' + poly_match.group(1) + ']'
            coords = json.loads(coords_str)
            lngs = [c[0] for c in coords]
            lats = [c[1] for c in coords]
            return [sum(lngs)/len(lngs), sum(lats)/len(lats)]
        except:
            pass
    
    # Try centroid field
    cent_match = re.search(r'centroid:\s*\[\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\]', content)
    if cent_match:
        return [float(cent_match.group(1)), float(cent_match.group(2))]
    
    return None

def get_current_tier(filepath):
    """Extract current heritage tier from intelligence file."""
    with open(filepath) as f:
        content = f.read()
    match = re.search(r"tier:\s*'([^']*)'", content)
    return match.group(1) if match else 'unknown'

def query_nhle(lng, lat, radius_m=50):
    """Query NHLE for listed buildings within radius of point."""
    params = urllib.parse.urlencode({
        'where': '1=1',
        'geometry': f'{lng},{lat}',
        'geometryType': 'esriGeometryPoint',
        'inSR': '4326',
        'spatialRel': 'esriSpatialRelIntersects',
        'distance': str(radius_m),
        'units': 'esriSRUnit_Meter',
        'outFields': 'Name,Grade,ListEntry,hyperlink',
        'f': 'json',
        'resultRecordCount': '20'
    })
    
    try:
        req = urllib.request.Request(f"{NHLE_URL}?{params}")
        resp = urllib.request.urlopen(req, timeout=15)
        data = json.loads(resp.read())
        return data.get('features', [])
    except Exception as e:
        return f"ERROR: {e}"

def classify_distance(features, lng, lat):
    """Classify features as ON-SITE (within 15m centroid) or ADJACENT (15-50m)."""
    # We can't compute exact distance without BNG conversion, but the API already filters by radius.
    # Use two queries: 15m (on-site) and 50m (adjacent)
    return features  # For now, return all within the queried radius

def determine_minimum_tier(on_site, adjacent):
    """Determine minimum acceptable heritage tier based on NHLE data."""
    # Check on-site first
    for f in on_site:
        grade = f['attributes']['Grade']
        if grade in ('I', 'II*'):
            return 'FULL_CONSERVATION'
        if grade == 'II':
            return 'RETAIN_AND_ADAPT'
    
    # Check adjacent
    for f in adjacent:
        grade = f['attributes']['Grade']
        if grade in ('I', 'II*'):
            return 'navigable'  # Grade I adjacent = serious constraint
        if grade == 'II':
            return 'manageable'
    
    return 'clean'

def main():
    args = sys.argv[1:]
    single_site = None
    fix_mode = False
    
    for arg in args:
        if arg == '--fix':
            fix_mode = True
        elif arg.startswith('--site='):
            single_site = arg.split('=')[1]
        elif arg == '--site' and args.index(arg) + 1 < len(args):
            single_site = args[args.index(arg) + 1]
    
    # Collect intelligence files
    files = []
    for f in sorted(os.listdir(INTEL_DIR)):
        if not f.startswith("intelligence-") or not f.endswith(".js"):
            continue
        name = f.replace("intelligence-", "").replace(".js", "")
        if single_site and name != single_site:
            continue
        files.append((name, os.path.join(INTEL_DIR, f)))
    
    print(f"NHLE Heritage Verification - {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"Sites to check: {len(files)}")
    print("=" * 90)
    
    issues = []
    clean = []
    errors = []
    
    for name, filepath in files:
        centroid = get_centroid(filepath)
        if not centroid:
            errors.append(f"  NO CENTROID: {name}")
            continue
        
        current_tier = get_current_tier(filepath)
        lng, lat = centroid
        
        # Query at 15m (on-site) and 50m (adjacent)
        on_site = query_nhle(lng, lat, 15)
        if isinstance(on_site, str):
            errors.append(f"  API ERROR ({name}): {on_site}")
            continue
        time.sleep(0.3)
        
        adjacent_raw = query_nhle(lng, lat, 50)
        if isinstance(adjacent_raw, str):
            errors.append(f"  API ERROR ({name}): {adjacent_raw}")
            continue
        time.sleep(0.3)
        
        # Remove on-site entries from adjacent list
        on_site_ids = {f['attributes']['ListEntry'] for f in on_site}
        adjacent = [f for f in adjacent_raw if f['attributes']['ListEntry'] not in on_site_ids]
        
        min_tier = determine_minimum_tier(on_site, adjacent)
        
        # Tier severity ranking
        tier_rank = {'clean': 0, 'manageable': 1, 'navigable': 2, 'RETAIN_AND_ADAPT': 3, 'FULL_CONSERVATION': 4}
        current_rank = tier_rank.get(current_tier, 0)
        min_rank = tier_rank.get(min_tier, 0)
        
        has_issue = min_rank > current_rank or on_site or adjacent
        
        if on_site or adjacent:
            status = "MISMATCH" if min_rank > current_rank else "OK (data present)"
            marker = "🚨" if min_rank > current_rank else "⚠️"
            
            entry = {
                'name': name,
                'current_tier': current_tier,
                'min_tier': min_tier,
                'on_site': [(f['attributes']['Name'], f['attributes']['Grade'], f['attributes']['ListEntry']) for f in on_site],
                'adjacent': [(f['attributes']['Name'], f['attributes']['Grade'], f['attributes']['ListEntry']) for f in adjacent],
                'mismatch': min_rank > current_rank
            }
            issues.append(entry)
            
            print(f"\n{marker} {name} (current: {current_tier}, minimum: {min_tier})")
            if on_site:
                print(f"  ON-SITE (<15m):")
                for n, g, le in entry['on_site']:
                    print(f"    - {n} | Grade {g} | NHLE {le}")
            if adjacent:
                print(f"  ADJACENT (15-50m):")
                for n, g, le in entry['adjacent']:
                    print(f"    - {n} | Grade {g} | NHLE {le}")
            if min_rank > current_rank:
                print(f"  ACTION: Upgrade tier from '{current_tier}' to minimum '{min_tier}'")
        else:
            clean.append(name)
    
    # Summary
    print("\n" + "=" * 90)
    print(f"SUMMARY")
    print(f"  Total sites checked: {len(files)}")
    print(f"  Clean (no listed buildings within 50m): {len(clean)}")
    print(f"  Heritage context found: {len(issues)}")
    mismatches = [i for i in issues if i['mismatch']]
    print(f"  TIER MISMATCHES (upgrades needed): {len(mismatches)}")
    if errors:
        print(f"  Errors: {len(errors)}")
        for e in errors:
            print(f"    {e}")
    
    if mismatches:
        print(f"\n🚨 CRITICAL FIXES REQUIRED:")
        for m in mismatches:
            print(f"  {m['name']}: {m['current_tier']} -> {m['min_tier']}")
            for n, g, le in m['on_site']:
                print(f"    ON-SITE: {n} (Grade {g}, NHLE {le})")
            for n, g, le in m['adjacent']:
                print(f"    ADJACENT: {n} (Grade {g}, NHLE {le})")
    
    return 1 if mismatches else 0

if __name__ == '__main__':
    sys.exit(main())
