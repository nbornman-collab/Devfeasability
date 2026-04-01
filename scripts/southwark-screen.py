#!/usr/bin/env python3
"""
Southwark Algorithmic Site Screener
===================================
Pulls all commercial/institutional buildings from OpenStreetMap,
overlays policy zones, checks heritage, scores using 6-factor engine.
Outputs ranked JSON for discover page.
"""

import json, math, time, sys
from urllib.request import urlopen, Request
from urllib.parse import quote, urlencode
from urllib.error import HTTPError

# ── Config ──────────────────────────────────────────────────────────────────
NHLE_URL = "https://services-eu1.arcgis.com/ZOdPfBS3aqqDYPUQ/ArcGIS/rest/services/National_Heritage_List_for_England_NHLE_v02_VIEW/FeatureServer/0/query"
EPC_URL = "https://epc.opendatacommunities.org/api/v1/domestic/search"
EPC_KEY = "c471dfb99d2721e8ed59b70630fcb36bedad2714"
EPC_EMAIL = "nbornman@gmail.com"

# Southwark bounding box (approximate)
SW_BBOX = {
    "south": 51.44,
    "north": 51.52,
    "west": -0.12,
    "east": -0.03
}

# ── Opportunity Area polygons (approximate) ─────────────────────────────────
# These are simplified polygons for key OAs in Southwark
OA_ZONES = {
    "Bankside/Borough/London Bridge": [
        [-0.1100, 51.5080], [-0.0850, 51.5080], [-0.0850, 51.4990],
        [-0.0950, 51.4990], [-0.1050, 51.5010], [-0.1100, 51.5030],
        [-0.1100, 51.5080]
    ],
    "Elephant & Castle": [
        [-0.1050, 51.5010], [-0.0920, 51.5010], [-0.0920, 51.4900],
        [-0.1050, 51.4900], [-0.1050, 51.5010]
    ],
    "Old Kent Road": [
        [-0.0920, 51.4950], [-0.0500, 51.4780], [-0.0500, 51.4720],
        [-0.0920, 51.4870], [-0.0920, 51.4950]
    ],
    "Canada Water": [
        [-0.0550, 51.5020], [-0.0350, 51.5020], [-0.0350, 51.4900],
        [-0.0550, 51.4900], [-0.0550, 51.5020]
    ],
    "Peckham/Nunhead": [
        [-0.0750, 51.4780], [-0.0550, 51.4780], [-0.0550, 51.4680],
        [-0.0750, 51.4680], [-0.0750, 51.4780]
    ],
}

# CAZ boundary (northern Southwark, simplified)
CAZ_POLY = [
    [-0.1100, 51.5100], [-0.0750, 51.5100], [-0.0750, 51.4980],
    [-0.0950, 51.4980], [-0.1050, 51.5000], [-0.1100, 51.5020],
    [-0.1100, 51.5100]
]

# ── Geometry helpers ────────────────────────────────────────────────────────
def point_in_polygon(lng, lat, polygon):
    """Ray casting algorithm for point-in-polygon."""
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

def polygon_area_m2(coords):
    """Approximate area of a polygon in square metres using Haversine."""
    if len(coords) < 3:
        return 0
    # Use shoelace formula on projected coordinates
    R = 6371000  # Earth radius in metres
    lat0 = sum(c[1] for c in coords) / len(coords)
    cos_lat = math.cos(math.radians(lat0))
    
    area = 0
    n = len(coords)
    for i in range(n):
        j = (i + 1) % n
        xi = coords[i][0] * cos_lat * R * math.pi / 180
        yi = coords[i][1] * R * math.pi / 180
        xj = coords[j][0] * cos_lat * R * math.pi / 180
        yj = coords[j][1] * R * math.pi / 180
        area += xi * yj - xj * yi
    return abs(area) / 2

def centroid(coords):
    """Compute centroid of a polygon."""
    n = len(coords)
    if n == 0:
        return 0, 0
    lng = sum(c[0] for c in coords) / n
    lat = sum(c[1] for c in coords) / n
    return lng, lat

# ── Overpass query ──────────────────────────────────────────────────────────
def run_overpass(query):
    """Run a single Overpass query and return parsed JSON."""
    url = "https://overpass-api.de/api/interpreter"
    data = f"data={quote(query)}".encode()
    req = Request(url, data=data, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    with urlopen(req, timeout=180) as resp:
        return json.loads(resp.read().decode())

def fetch_overpass_buildings():
    """Fetch commercial/institutional buildings in Southwark from OSM."""
    print("Querying Overpass API for Southwark buildings (chunked)...")
    
    # Southwark bbox: south,west,north,east
    bbox = "51.44,-0.12,51.52,-0.03"
    
    # Run separate queries for each building type to avoid timeout
    building_types = [
        "office", "commercial", "industrial", "warehouse",
        "retail", "hotel", "civic", "government", "public",
    ]
    
    all_elements = []
    
    for btype in building_types:
        query = f"""[out:json][timeout:60];
way["building"="{btype}"]({bbox});
out body;
>;
out skel qt;"""
        print(f"  Fetching building={btype}...")
        try:
            result = run_overpass(query)
            all_elements.extend(result.get("elements", []))
            time.sleep(2)  # Rate limit
        except Exception as e:
            print(f"    Error: {e}")
            continue
    
    # Also fetch buildings with office= tag and large buildings with height
    extra_queries = [
        f'[out:json][timeout:60];way["building"]["office"]({bbox});out body;>;out skel qt;',
        f'[out:json][timeout:60];way["building"="yes"]["building:levels"](if:t["building:levels"]>3)({bbox});out body;>;out skel qt;',
    ]
    
    for q in extra_queries:
        print(f"  Fetching extra query...")
        try:
            result = run_overpass(q)
            all_elements.extend(result.get("elements", []))
            time.sleep(2)
        except Exception as e:
            print(f"    Error: {e}")
            continue
    
    # Parse elements - build node index, extract ways
    nodes = {}
    ways = []
    relations = []
    seen_way_ids = set()
    
    for el in all_elements:
        if el["type"] == "node":
            nodes[el["id"]] = (el["lon"], el["lat"])
        elif el["type"] == "way":
            if el["id"] not in seen_way_ids:
                ways.append(el)
                seen_way_ids.add(el["id"])
        elif el["type"] == "relation":
            relations.append(el)
    
    print(f"  Raw: {len(ways)} ways, {len(relations)} relations, {len(nodes)} nodes")
    
    # Convert ways to polygons with metadata
    buildings = []
    for way in ways:
        tags = way.get("tags", {})
        node_ids = way.get("nodes", [])
        coords = [nodes[nid] for nid in node_ids if nid in nodes]
        
        if len(coords) < 3:
            continue
        
        area = polygon_area_m2(coords)
        if area < 400:  # Min 400m2 footprint
            continue
        
        lng, lat = centroid(coords)
        
        name = tags.get("name", "")
        addr_street = tags.get("addr:street", "")
        addr_num = tags.get("addr:housenumber", "")
        addr = f"{addr_num} {addr_street}".strip() if addr_street else ""
        
        building_type = tags.get("building", "yes")
        height_str = tags.get("height", tags.get("building:levels", ""))
        
        # Estimate height/floors
        floors = 0
        if "building:levels" in tags:
            try:
                floors = int(tags["building:levels"])
            except:
                pass
        elif "height" in tags:
            try:
                h = float(tags["height"].replace("m", "").strip())
                floors = max(1, int(h / 3.5))
            except:
                pass
        
        buildings.append({
            "osm_id": way["id"],
            "name": name,
            "address": addr,
            "lat": round(lat, 6),
            "lng": round(lng, 6),
            "footprint_m2": round(area),
            "floors": floors,
            "building_type": building_type,
            "tags": tags,
            "coords": coords,
        })
    
    print(f"  Filtered: {len(buildings)} buildings with footprint >= 400m2")
    return buildings

# ── NHLE heritage check ────────────────────────────────────────────────────
def check_nhle_nearby(lat, lng, radius_m=100):
    """Check for NHLE entries within radius of a point."""
    # Convert radius to degrees (approximate)
    r_deg = radius_m / 111000
    
    params = {
        "where": f"1=1",
        "geometry": json.dumps({
            "x": lng, "y": lat,
            "spatialReference": {"wkid": 4326}
        }),
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
        features = data.get("features", [])
        entries = []
        for f in features:
            attrs = f.get("attributes", {})
            entries.append({
                "name": attrs.get("Name", ""),
                "grade": attrs.get("Grade", ""),
                "list_entry": attrs.get("ListEntry", ""),
                "type": attrs.get("Type", ""),
            })
        return entries
    except Exception as e:
        print(f"  NHLE error at {lat},{lng}: {e}")
        return []

# ── Policy zone checks ─────────────────────────────────────────────────────
def check_policy_zones(lat, lng):
    """Check which policy zones a point falls within."""
    zones = {
        "inOA": False,
        "oa_name": None,
        "inCAZ": False,
        "inConservation": False,  # Would need conservation area polys
    }
    
    for name, poly in OA_ZONES.items():
        if point_in_polygon(lng, lat, poly):
            zones["inOA"] = True
            zones["oa_name"] = name
            break
    
    zones["inCAZ"] = point_in_polygon(lng, lat, CAZ_POLY)
    
    return zones

# ── PTAL lookup (approximate from location) ─────────────────────────────────
def estimate_ptal(lat, lng):
    """Estimate PTAL from proximity to major stations."""
    # Key stations with PTAL contribution
    stations = [
        (-0.0934, 51.5040, "London Bridge", 6),
        (-0.1052, 51.5036, "Waterloo", 6),
        (-0.1040, 51.4957, "Elephant & Castle", 6),
        (-0.1013, 51.5046, "Southwark", 6),
        (-0.0821, 51.5005, "Borough", 5),
        (-0.0636, 51.4982, "Bermondsey", 4),
        (-0.0499, 51.4979, "Canada Water", 5),
        (-0.0499, 51.4929, "Surrey Quays", 3),
        (-0.0568, 51.4839, "South Bermondsey", 2),
        (-0.0670, 51.4734, "Peckham Rye", 4),
        (-0.0856, 51.4684, "East Dulwich", 3),
        (-0.0893, 51.4735, "Peckham", 4),
        (-0.0935, 51.4738, "Denmark Hill", 4),
        (-0.0920, 51.4831, "Camberwell", 3),
        (-0.0763, 51.4804, "Queens Road Peckham", 3),
        (-0.0394, 51.4833, "New Cross Gate", 4),
    ]
    
    best_ptal = 1
    for slng, slat, sname, sptal in stations:
        dist = math.sqrt((lng - slng)**2 + (lat - slat)**2) * 111000  # approx metres
        if dist < 400:
            best_ptal = max(best_ptal, sptal)
        elif dist < 800:
            best_ptal = max(best_ptal, sptal - 1)
        elif dist < 1200:
            best_ptal = max(best_ptal, sptal - 2)
    
    return min(6, max(1, best_ptal))

# ── Scoring engine ──────────────────────────────────────────────────────────
# Weights: sky 2.5, value 2.0, momentum 2.0, heritage 1.5, acquisition 1.5, transport 0.5
WEIGHTS = {
    "sky": 2.5,
    "value": 2.0,
    "momentum": 2.0,
    "heritage": 1.5,
    "acquisition": 1.5,
    "transport": 0.5,
}

def score_site(building, zones, nhle_entries, ptal):
    """Score a site using the 6-factor engine. Returns 0-100."""
    
    # 1. Available Sky (potential for upward extension)
    # Higher for low-rise buildings in areas allowing height
    existing_floors = building.get("floors", 0) or 3  # assume 3 if unknown
    max_potential = 20 if zones["inOA"] else (12 if zones["inCAZ"] else 8)
    sky_headroom = max(0, max_potential - existing_floors)
    sky_score = min(10, sky_headroom * 1.5)
    
    # 2. Rent Headroom (value uplift potential)
    # OA + CAZ = highest value zone
    if zones["inCAZ"] and zones["inOA"]:
        value_score = 9
    elif zones["inOA"]:
        value_score = 8
    elif zones["inCAZ"]:
        value_score = 7.5
    else:
        value_score = 5
    
    # 3. Planning Momentum (appetite for development)
    if zones["inOA"]:
        momentum_score = 9  # OA = policy backing for intensification
    elif zones["inCAZ"]:
        momentum_score = 7
    else:
        momentum_score = 4.5
    
    # 4. Heritage Shadow
    heritage_score = 10  # Start at 10 (no heritage = best)
    grade_i = any(e["grade"] == "I" for e in nhle_entries)
    grade_ii_star = any(e["grade"] == "II*" for e in nhle_entries)
    grade_ii = any(e["grade"] == "II" for e in nhle_entries)
    is_listed_itself = any(
        e["grade"] in ("I", "II*", "II") and 
        (building.get("name", "").lower() in e.get("name", "").lower() or
         e.get("name", "").lower() in building.get("name", "").lower())
        for e in nhle_entries
    ) if nhle_entries and building.get("name") else False
    
    if is_listed_itself:
        if grade_i:
            heritage_score = 1  # Grade I on site = near impossible
        elif grade_ii_star:
            heritage_score = 2
        elif grade_ii:
            heritage_score = 4
    elif grade_i:
        heritage_score = 5  # Grade I adjacent
    elif grade_ii_star:
        heritage_score = 6
    elif grade_ii:
        heritage_score = 7
    
    # 5. Acquisition (title complexity proxy)
    # Larger footprint = likely single owner, simpler
    footprint = building.get("footprint_m2", 0)
    if footprint > 2000:
        acq_score = 8
    elif footprint > 1000:
        acq_score = 7
    elif footprint > 500:
        acq_score = 6
    else:
        acq_score = 5
    
    # Bonus: 1980s+ buildings likely simpler title
    building_type = building.get("building_type", "")
    if building_type in ("office", "commercial", "industrial", "warehouse"):
        acq_score = min(10, acq_score + 1)
    
    # 6. Transport
    transport_score = min(10, ptal * 1.6)
    
    # Weighted total
    total_weight = sum(WEIGHTS.values())
    raw = (
        sky_score * WEIGHTS["sky"] +
        value_score * WEIGHTS["value"] +
        momentum_score * WEIGHTS["momentum"] +
        heritage_score * WEIGHTS["heritage"] +
        acq_score * WEIGHTS["acquisition"] +
        transport_score * WEIGHTS["transport"]
    ) / total_weight
    
    # Scale to 0-100
    score = min(100, max(0, round(raw * 10)))
    
    return {
        "score": score,
        "factors": {
            "sky": round(sky_score, 1),
            "value": round(value_score, 1),
            "momentum": round(momentum_score, 1),
            "heritage": round(heritage_score, 1),
            "acquisition": round(acq_score, 1),
            "transport": round(transport_score, 1),
        }
    }

# ── Main pipeline ───────────────────────────────────────────────────────────
def main():
    print("=" * 60)
    print("SOUTHWARK ALGORITHMIC SITE SCREENER")
    print("=" * 60)
    
    # Step 1: Fetch buildings from OSM
    buildings = fetch_overpass_buildings()
    
    if not buildings:
        print("No buildings found. Exiting.")
        sys.exit(1)
    
    # Step 2: Score each building
    scored_sites = []
    total = len(buildings)
    
    for i, bldg in enumerate(buildings):
        pct = round((i + 1) / total * 100)
        name_or_addr = bldg.get("name") or bldg.get("address") or f"OSM:{bldg['osm_id']}"
        
        if i % 10 == 0:
            print(f"  [{pct}%] Processing {i+1}/{total}: {name_or_addr[:50]}")
        
        # Policy zones
        zones = check_policy_zones(bldg["lat"], bldg["lng"])
        
        # NHLE check (rate limit: 1 per 0.5s)
        nhle = check_nhle_nearby(bldg["lat"], bldg["lng"], radius_m=75)
        if i > 0 and i % 5 == 0:
            time.sleep(1)  # Rate limit NHLE
        
        # PTAL
        ptal = estimate_ptal(bldg["lat"], bldg["lng"])
        
        # Score
        result = score_site(bldg, zones, nhle, ptal)
        
        # Build site entry
        display_name = bldg.get("name") or bldg.get("address") or f"Building at {bldg['lat']:.4f}, {bldg['lng']:.4f}"
        
        # Skip if score too low
        if result["score"] < 40:
            continue
        
        site = {
            "name": display_name,
            "address": bldg.get("address", ""),
            "borough": "Southwark",
            "lat": bldg["lat"],
            "lng": bldg["lng"],
            "score": result["score"],
            "verified": False,
            "flags": {
                "inOA": zones["inOA"],
                "inCAZ": zones["inCAZ"],
                "inConservation": zones["inConservation"],
                "ptal": ptal,
                "floodZone": 1,  # Default - would need EA API for real data
            },
            "footprint_m2": bldg["footprint_m2"],
            "existing_floors": bldg.get("floors", 0),
            "building_type": bldg.get("building_type", "unknown"),
            "osm_id": bldg["osm_id"],
            "oa_name": zones.get("oa_name"),
            "heritage_nearby": [
                {"name": e["name"], "grade": e["grade"], "entry": e["list_entry"]}
                for e in nhle
            ] if nhle else [],
            "factors": result["factors"],
            "desc": f"Algorithmic screen: {bldg.get('building_type', 'building')}, {bldg.get('footprint_m2', 0)}m2 footprint" +
                    (f", {bldg.get('floors', '?')}F existing" if bldg.get('floors') else "") +
                    (f", in {zones.get('oa_name', 'OA')}" if zones["inOA"] else "") +
                    (f", CAZ" if zones["inCAZ"] else "") +
                    f", PTAL {ptal}",
        }
        
        scored_sites.append(site)
    
    # Sort by score descending
    scored_sites.sort(key=lambda s: s["score"], reverse=True)
    
    # Output
    print(f"\n{'=' * 60}")
    print(f"RESULTS: {len(scored_sites)} sites scored >= 40")
    print(f"{'=' * 60}")
    
    # Top 20 preview
    print(f"\nTop 20:")
    for i, s in enumerate(scored_sites[:20]):
        heritage_flag = " [HERITAGE]" if s.get("heritage_nearby") else ""
        print(f"  {i+1:3d}. {s['score']:3d} | {s['name'][:45]:45s} | {s.get('footprint_m2', 0):5d}m2 | PTAL {s['flags']['ptal']}{heritage_flag}")
    
    # Save full results
    out_path = "scripts/southwark-screen-results.json"
    with open(out_path, "w") as f:
        json.dump(scored_sites, f, indent=2)
    print(f"\nFull results saved to {out_path}")
    
    # Save discover-ready format (top 100)
    discover_sites = []
    for s in scored_sites[:100]:
        discover_sites.append({
            "name": s["name"],
            "address": s["address"],
            "borough": "Southwark",
            "lat": s["lat"],
            "lng": s["lng"],
            "score": s["score"],
            "verified": False,
            "flags": s["flags"],
            "desc": s["desc"],
            "source": "algorithmic_screen_v1",
            "osm_id": s["osm_id"],
        })
    
    discover_path = "scripts/southwark-screened-top100.json"
    with open(discover_path, "w") as f:
        json.dump(discover_sites, f, indent=2)
    print(f"Discover-ready top 100 saved to {discover_path}")
    
    # Stats
    oa_count = sum(1 for s in scored_sites if s["flags"]["inOA"])
    caz_count = sum(1 for s in scored_sites if s["flags"]["inCAZ"])
    heritage_count = sum(1 for s in scored_sites if s.get("heritage_nearby"))
    print(f"\nStats:")
    print(f"  In OA: {oa_count}")
    print(f"  In CAZ: {caz_count}")
    print(f"  Heritage nearby: {heritage_count}")
    print(f"  Score range: {scored_sites[-1]['score']} - {scored_sites[0]['score']}")

if __name__ == "__main__":
    main()
