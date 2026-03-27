#!/usr/bin/env python3
"""
Borough Site Screener v1
========================
Pulls brownfield register, conservation areas, listed buildings, and Article 4
areas from planning.data.gov.uk for any London borough. Scores and ranks sites.

Usage:
  python3 scripts/borough-screener.py --borough southwark
  python3 scripts/borough-screener.py --borough city-of-london
  python3 scripts/borough-screener.py --all-london
"""

import json, math, time, sys, os
from urllib.request import urlopen, Request
from urllib.parse import urlencode
from urllib.error import HTTPError

# ── Borough codes (ONS) ────────────────────────────────────────────────────
BOROUGHS = {
    "southwark":        {"code": "E09000028", "name": "Southwark"},
    "city-of-london":   {"code": "E09000001", "name": "City of London"},
    "hackney":          {"code": "E09000012", "name": "Hackney"},
    "tower-hamlets":    {"code": "E09000030", "name": "Tower Hamlets"},
    "lambeth":          {"code": "E09000022", "name": "Lambeth"},
    "camden":           {"code": "E09000007", "name": "Camden"},
    "islington":        {"code": "E09000019", "name": "Islington"},
    "westminster":      {"code": "E09000033", "name": "Westminster"},
    "newham":           {"code": "E09000025", "name": "Newham"},
    "greenwich":        {"code": "E09000011", "name": "Greenwich"},
    "lewisham":         {"code": "E09000023", "name": "Lewisham"},
    "wandsworth":       {"code": "E09000032", "name": "Wandsworth"},
    "kensington":       {"code": "E09000020", "name": "Kensington and Chelsea"},
    "hammersmith":      {"code": "E09000013", "name": "Hammersmith and Fulham"},
    "barking":          {"code": "E09000002", "name": "Barking and Dagenham"},
    "brent":            {"code": "E09000004", "name": "Brent"},
    "ealing":           {"code": "E09000009", "name": "Ealing"},
    "enfield":          {"code": "E09000010", "name": "Enfield"},
    "haringey":         {"code": "E09000014", "name": "Haringey"},
    "hounslow":         {"code": "E09000018", "name": "Hounslow"},
    "redbridge":        {"code": "E09000026", "name": "Redbridge"},
    "richmond":         {"code": "E09000027", "name": "Richmond upon Thames"},
    "waltham-forest":   {"code": "E09000031", "name": "Waltham Forest"},
    "bexley":           {"code": "E09000004", "name": "Bexley"},
    "bromley":          {"code": "E09000006", "name": "Bromley"},
    "croydon":          {"code": "E09000008", "name": "Croydon"},
    "harrow":           {"code": "E09000015", "name": "Harrow"},
    "havering":         {"code": "E09000016", "name": "Havering"},
    "hillingdon":       {"code": "E09000017", "name": "Hillingdon"},
    "kingston":         {"code": "E09000021", "name": "Kingston upon Thames"},
    "merton":           {"code": "E09000024", "name": "Merton"},
    "sutton":           {"code": "E09000029", "name": "Sutton"},
    "barnet":           {"code": "E09000003", "name": "Barnet"},
}

# NHLE API
NHLE_URL = "https://services-eu1.arcgis.com/ZOdPfBS3aqqDYPUQ/ArcGIS/rest/services/National_Heritage_List_for_England_NHLE_v02_VIEW/FeatureServer/0/query"

# planning.data.gov.uk base
PDATA_URL = "https://www.planning.data.gov.uk/entity.geojson"

# ── Geometry helpers ────────────────────────────────────────────────────────
def point_in_polygon(lng, lat, polygon):
    """Ray casting for point-in-polygon."""
    n = len(polygon)
    inside = False
    j = n - 1
    for i in range(n):
        xi, yi = polygon[i]
        xj, yj = polygon[j]
        if ((yi > lat) != (yj > lat)) and (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi):
            inside = not inside
        j = i
    return inside

def parse_wkt_point(wkt):
    """Parse POINT(lng lat) WKT string."""
    if not wkt or "POINT" not in wkt:
        return None, None
    try:
        coords = wkt.replace("POINT(", "").replace("POINT (", "").replace(")", "").strip()
        parts = coords.split()
        return float(parts[0]), float(parts[1])
    except:
        return None, None

def extract_coords(feature):
    """Extract lng, lat from a GeoJSON feature."""
    geom = feature.get("geometry", {})
    if not geom:
        return None, None
    
    gtype = geom.get("type", "")
    coords = geom.get("coordinates", [])
    
    if gtype == "Point" and len(coords) >= 2:
        return coords[0], coords[1]
    elif gtype == "Polygon" and coords:
        # Centroid of first ring
        ring = coords[0]
        if ring:
            lng = sum(c[0] for c in ring) / len(ring)
            lat = sum(c[1] for c in ring) / len(ring)
            return lng, lat
    elif gtype == "MultiPolygon" and coords:
        # Centroid of first polygon
        ring = coords[0][0] if coords[0] else []
        if ring:
            lng = sum(c[0] for c in ring) / len(ring)
            lat = sum(c[1] for c in ring) / len(ring)
            return lng, lat
    
    return None, None

def extract_polygon(feature):
    """Extract polygon coordinates from a GeoJSON feature."""
    geom = feature.get("geometry", {})
    if not geom:
        return None
    gtype = geom.get("type", "")
    coords = geom.get("coordinates", [])
    if gtype == "Polygon" and coords:
        return coords[0]
    elif gtype == "MultiPolygon" and coords:
        return coords[0][0] if coords[0] else None
    return None

# ── Data fetching ───────────────────────────────────────────────────────────
def fetch_dataset(dataset, borough_code, limit=500):
    """Fetch a dataset from planning.data.gov.uk for a borough."""
    url = f"{PDATA_URL}?dataset={dataset}&geometry_reference={borough_code}&limit={limit}"
    try:
        with urlopen(url, timeout=60) as resp:
            data = json.loads(resp.read().decode())
        features = data.get("features", [])
        return features
    except Exception as e:
        print(f"  Error fetching {dataset}: {e}")
        return []

def fetch_nhle_nearby(lat, lng, radius_m=75):
    """Check NHLE entries near a point."""
    params = {
        "where": "1=1",
        "geometry": json.dumps({"x": lng, "y": lat, "spatialReference": {"wkid": 4326}}),
        "geometryType": "esriGeometryPoint",
        "spatialRel": "esriSpatialRelIntersects",
        "distance": radius_m,
        "units": "esriSRUnit_Meter",
        "outFields": "Name,Grade,ListEntry,Type",
        "returnGeometry": "false",
        "f": "json",
        "resultRecordCount": 10,
    }
    url = f"{NHLE_URL}?{urlencode(params)}"
    try:
        with urlopen(url, timeout=30) as resp:
            data = json.loads(resp.read().decode())
        return [
            {
                "name": f["attributes"].get("Name", ""),
                "grade": f["attributes"].get("Grade", ""),
                "list_entry": f["attributes"].get("ListEntry", ""),
            }
            for f in data.get("features", [])
        ]
    except:
        return []

# ── PTAL estimation ─────────────────────────────────────────────────────────
# Major London stations with approximate PTAL contribution
STATIONS = [
    (-0.0934, 51.5040, 6),  # London Bridge
    (-0.1052, 51.5036, 6),  # Waterloo
    (-0.1040, 51.4957, 6),  # Elephant & Castle
    (-0.1013, 51.5046, 6),  # Southwark
    (-0.0821, 51.5005, 5),  # Borough
    (-0.0636, 51.4982, 4),  # Bermondsey
    (-0.0499, 51.4979, 5),  # Canada Water
    (-0.0670, 51.4734, 4),  # Peckham Rye
    (-0.0856, 51.4684, 3),  # East Dulwich
    (-0.0763, 51.4804, 3),  # Queens Road Peckham
    (-0.0789, 51.5140, 6),  # Bank/Monument
    (-0.0886, 51.5152, 6),  # St Paul's
    (-0.0983, 51.5113, 6),  # Blackfriars
    (-0.1114, 51.5074, 6),  # Embankment
    (-0.0766, 51.5178, 6),  # Moorgate
    (-0.0816, 51.5188, 6),  # Liverpool Street
    (-0.0710, 51.5141, 6),  # Aldgate
    (-0.0755, 51.5098, 6),  # Tower Hill
    (-0.0610, 51.5053, 5),  # Wapping
    (-0.0473, 51.5095, 5),  # Shadwell
    (-0.0335, 51.5117, 5),  # Limehouse
    (-0.0395, 51.5267, 5),  # Bethnal Green
    (-0.0724, 51.5263, 5),  # Old Street
    (-0.0575, 51.5327, 4),  # Dalston
    (-0.0461, 51.5475, 4),  # Stoke Newington
    (-0.0548, 51.5225, 5),  # Hoxton
    (-0.0755, 51.5254, 5),  # Shoreditch High Street
    (-0.1342, 51.5303, 6),  # Kings Cross
    (-0.1227, 51.5299, 6),  # Angel
    (-0.1048, 51.5226, 6),  # Chancery Lane
    (-0.1196, 51.5174, 6),  # Holborn
    (-0.1002, 51.5152, 6),  # Temple
]

def estimate_ptal(lat, lng):
    """Estimate PTAL from station proximity."""
    best = 1
    for slng, slat, sptal in STATIONS:
        dist = math.sqrt((lng - slng)**2 + (lat - slat)**2) * 111000
        if dist < 400:
            best = max(best, sptal)
        elif dist < 800:
            best = max(best, sptal - 1)
        elif dist < 1200:
            best = max(best, sptal - 2)
    return min(6, max(1, best))

# ── Scoring engine ──────────────────────────────────────────────────────────
# Weights: sky 2.5, value 2.0, momentum 2.0, heritage 1.5, acquisition 1.5, transport 0.5
WEIGHTS = {"sky": 2.5, "value": 2.0, "momentum": 2.0, "heritage": 1.5, "acquisition": 1.5, "transport": 0.5}

def score_site(site, in_conservation, nhle_entries, ptal):
    """Score using 6-factor engine. Returns 0-100."""
    hectares = site.get("hectares", 0)
    status = site.get("planning_status", "")
    
    # 1. Available Sky - larger sites have more headroom
    if hectares >= 1.0:
        sky = 9
    elif hectares >= 0.5:
        sky = 8
    elif hectares >= 0.2:
        sky = 7
    elif hectares >= 0.1:
        sky = 6
    else:
        sky = 4
    
    # 2. Value - proxy from PTAL (high accessibility = high value zone)
    value = min(10, ptal * 1.5 + 1)
    
    # 3. Momentum - planning status
    if status == "permissioned":
        momentum = 9  # Already has permission = proven appetite
    elif status == "pending-decision":
        momentum = 7
    elif status == "not-permissioned":
        momentum = 6  # Allocated but no application yet = opportunity
    else:
        momentum = 5
    
    # 4. Heritage
    heritage = 10  # Start clean
    if in_conservation:
        heritage = 6  # Conservation area = navigable but constrained
    
    # NHLE entries nearby
    for e in nhle_entries:
        grade = e.get("grade", "")
        if grade == "I":
            heritage = min(heritage, 2)
        elif grade == "II*":
            heritage = min(heritage, 3)
        elif grade == "II":
            heritage = min(heritage, 5)
    
    # 5. Acquisition - larger sites with permission = cleaner
    if hectares >= 1.0 and status == "permissioned":
        acq = 9
    elif hectares >= 0.5:
        acq = 7
    elif status == "permissioned":
        acq = 7
    else:
        acq = 5
    
    # 6. Transport
    transport = min(10, ptal * 1.6)
    
    # Weighted total
    total_w = sum(WEIGHTS.values())
    raw = (
        sky * WEIGHTS["sky"] +
        value * WEIGHTS["value"] +
        momentum * WEIGHTS["momentum"] +
        heritage * WEIGHTS["heritage"] +
        acq * WEIGHTS["acquisition"] +
        transport * WEIGHTS["transport"]
    ) / total_w
    
    score = min(100, max(0, round(raw * 10)))
    
    return {
        "score": score,
        "factors": {
            "sky": round(sky, 1), "value": round(value, 1),
            "momentum": round(momentum, 1), "heritage": round(heritage, 1),
            "acquisition": round(acq, 1), "transport": round(transport, 1),
        }
    }

# ── Main pipeline ───────────────────────────────────────────────────────────
def screen_borough(borough_key):
    """Run full screening pipeline for one borough."""
    if borough_key not in BOROUGHS:
        print(f"Unknown borough: {borough_key}")
        print(f"Available: {', '.join(sorted(BOROUGHS.keys()))}")
        return None
    
    info = BOROUGHS[borough_key]
    code = info["code"]
    name = info["name"]
    
    print(f"\n{'='*60}")
    print(f"SCREENING: {name} ({code})")
    print(f"{'='*60}")
    
    # 1. Fetch brownfield register
    print(f"\n1. Fetching brownfield register...")
    brownfield = fetch_dataset("brownfield-land", code, limit=500)
    print(f"   {len(brownfield)} brownfield sites")
    
    # 2. Fetch conservation areas
    print(f"2. Fetching conservation areas...")
    conservation = fetch_dataset("conservation-area", code, limit=200)
    print(f"   {len(conservation)} conservation areas")
    
    # Build conservation area polygons for overlay
    ca_polys = []
    for feat in conservation:
        poly = extract_polygon(feat)
        if poly and len(poly) >= 3:
            ca_name = feat.get("properties", {}).get("name", "Unknown CA")
            ca_polys.append({"name": ca_name, "polygon": poly})
    print(f"   {len(ca_polys)} with usable polygons")
    
    # 3. Fetch listed buildings (for reference count)
    print(f"3. Fetching listed buildings...")
    listed = fetch_dataset("listed-building-outline", code, limit=1000)
    print(f"   {len(listed)} listed buildings")
    
    # 4. Fetch Article 4 areas
    print(f"4. Fetching Article 4 areas...")
    article4 = fetch_dataset("article-4-direction-area", code, limit=500)
    print(f"   {len(article4)} Article 4 areas")
    
    # 5. Process brownfield sites
    print(f"\n5. Scoring {len(brownfield)} sites...")
    
    # Filter: minimum 0.05 hectare (500m2)
    MIN_HECTARES = 0.05
    
    scored_sites = []
    nhle_checked = 0
    
    for i, feat in enumerate(brownfield):
        props = feat.get("properties", {})
        lng, lat = extract_coords(feat)
        
        if lng is None or lat is None:
            continue
        
        hectares = float(props.get("hectares", 0) or 0)
        if hectares < MIN_HECTARES:
            continue
        
        addr = props.get("site-address", "")
        ref = props.get("reference", props.get("name", ""))
        status = props.get("planning-permission-status", "unknown")
        dwellings = props.get("minimum-net-dwellings", "0")
        notes = props.get("notes", "")
        
        # Check conservation area overlay
        in_conservation = False
        ca_name = None
        for ca in ca_polys:
            if point_in_polygon(lng, lat, ca["polygon"]):
                in_conservation = True
                ca_name = ca["name"]
                break
        
        # NHLE check (rate limited)
        nhle = []
        if nhle_checked < 150:  # Cap NHLE calls
            nhle = fetch_nhle_nearby(lat, lng, radius_m=75)
            nhle_checked += 1
            if nhle_checked % 10 == 0:
                time.sleep(2)  # Rate limit
        
        # PTAL
        ptal = estimate_ptal(lat, lng)
        
        # Score
        site_data = {"hectares": hectares, "planning_status": status}
        result = score_site(site_data, in_conservation, nhle, ptal)
        
        site = {
            "name": addr or ref,
            "address": addr,
            "borough": name,
            "lat": round(lat, 6),
            "lng": round(lng, 6),
            "score": result["score"],
            "verified": False,
            "hectares": hectares,
            "flags": {
                "inOA": False,  # Would need OA boundary data
                "inCAZ": False,  # Would need CAZ boundary data
                "inConservation": in_conservation,
                "conservationArea": ca_name,
                "ptal": ptal,
                "floodZone": 1,
            },
            "planning_ref": ref,
            "planning_status": status,
            "max_dwellings": dwellings,
            "heritage_nearby": nhle,
            "factors": result["factors"],
            "desc": f"Brownfield register site, {hectares:.2f} ha" +
                    (f", {status}" if status != "unknown" else "") +
                    (f", CA: {ca_name}" if ca_name else "") +
                    f", PTAL {ptal}",
            "source": "planning.data.gov.uk/brownfield-land",
        }
        
        scored_sites.append(site)
        
        if (i + 1) % 25 == 0:
            print(f"   Processed {i+1}/{len(brownfield)}...")
    
    # Sort by score
    scored_sites.sort(key=lambda s: s["score"], reverse=True)
    
    # Output
    print(f"\n{'='*60}")
    print(f"RESULTS: {name}")
    print(f"{'='*60}")
    print(f"Sites screened: {len(scored_sites)} (>= {MIN_HECTARES} ha)")
    
    if scored_sites:
        print(f"Score range: {scored_sites[-1]['score']} - {scored_sites[0]['score']}")
        
        ca_count = sum(1 for s in scored_sites if s["flags"]["inConservation"])
        heritage_count = sum(1 for s in scored_sites if s.get("heritage_nearby"))
        print(f"In conservation area: {ca_count}")
        print(f"Heritage nearby: {heritage_count}")
        
        print(f"\nTop 25:")
        for i, s in enumerate(scored_sites[:25]):
            ca_flag = " [CA]" if s["flags"]["inConservation"] else ""
            h_flag = " [NHLE]" if s.get("heritage_nearby") else ""
            print(f"  {i+1:3d}. {s['score']:3d} | {s['name'][:50]:50s} | {s['hectares']:5.2f} ha | PTAL {s['flags']['ptal']}{ca_flag}{h_flag}")
    
    # Save results
    out_dir = "scripts/screen-results"
    os.makedirs(out_dir, exist_ok=True)
    
    full_path = f"{out_dir}/{borough_key}-full.json"
    with open(full_path, "w") as f:
        json.dump(scored_sites, f, indent=2)
    print(f"\nFull results: {full_path}")
    
    # Discover-ready format
    discover = []
    for s in scored_sites:
        discover.append({
            "name": s["name"],
            "address": s["address"],
            "borough": s["borough"],
            "lat": s["lat"],
            "lng": s["lng"],
            "score": s["score"],
            "verified": False,
            "flags": s["flags"],
            "desc": s["desc"],
            "source": s["source"],
            "planning_ref": s["planning_ref"],
        })
    
    discover_path = f"{out_dir}/{borough_key}-discover.json"
    with open(discover_path, "w") as f:
        json.dump(discover, f, indent=2)
    print(f"Discover-ready: {discover_path}")
    
    return scored_sites

# ── CLI ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Borough Site Screener")
    parser.add_argument("--borough", "-b", help="Borough key (e.g. southwark)")
    parser.add_argument("--all-london", action="store_true", help="Screen all London boroughs")
    parser.add_argument("--list", action="store_true", help="List available boroughs")
    args = parser.parse_args()
    
    if args.list:
        for key, info in sorted(BOROUGHS.items()):
            print(f"  {key:25s} {info['code']}  {info['name']}")
        sys.exit(0)
    
    if args.all_london:
        for key in sorted(BOROUGHS.keys()):
            screen_borough(key)
            time.sleep(5)  # Rate limit between boroughs
    elif args.borough:
        screen_borough(args.borough)
    else:
        # Default: screen Southwark
        screen_borough("southwark")
