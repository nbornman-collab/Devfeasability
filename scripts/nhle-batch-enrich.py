#!/usr/bin/env python3
"""
Batch NHLE enrichment for all sites across Southwark, Hackney, and City.
Uses ArcGIS bbox query (envelope) around each site's lat/lng.
Writes nhle_listings array + nhle_count + nhle_verified + nhle_date to each site.
"""

import json
import sys
import time
import urllib.request
import urllib.parse
from datetime import datetime, timezone

NHLE_URL = (
    "https://services-eu1.arcgis.com/ZOdPfBS3aqqDYPUQ/ArcGIS/rest/services/"
    "National_Heritage_List_for_England_NHLE_v02_VIEW/FeatureServer/0/query"
)

# ~50m radius in degrees at London latitude
D_LAT_50 = 0.00045
D_LNG_50 = 0.00072

# ~150m for adjacent check
D_LAT_150 = 0.00135
D_LNG_150 = 0.00217

DATA_DIR = "public/data"
FILES = [
    "southwark-sites.json",
    "hackney-sites.json",
    "city-sites.json",
]


def query_nhle(lat, lng, d_lat, d_lng):
    """Query NHLE within bbox around point. Returns list of {name, grade, nhle_id}."""
    bbox = f"{lng - d_lng},{lat - d_lat},{lng + d_lng},{lat + d_lat}"
    params = urllib.parse.urlencode({
        "geometry": bbox,
        "geometryType": "esriGeometryEnvelope",
        "inSR": "4326",
        "spatialRel": "esriSpatialRelIntersects",
        "outFields": "Name,Grade,ListEntry",
        "f": "json",
        "resultRecordCount": 100,
    })
    url = f"{NHLE_URL}?{params}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Headroom/1.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read())
        results = []
        for f in data.get("features", []):
            a = f["attributes"]
            results.append({
                "name": a.get("Name", "Unknown"),
                "grade": a.get("Grade", "?"),
                "nhle_id": str(a.get("ListEntry", "")),
            })
        return results
    except Exception as e:
        print(f"  ERROR querying NHLE: {e}", file=sys.stderr)
        return None


def classify_nhle(listings_50m, listings_150m):
    """Determine heritage constraint level from NHLE results."""
    grades_50 = [l["grade"] for l in listings_50m]
    grades_150 = [l["grade"] for l in listings_150m if l not in listings_50m]

    if any(g in ("I", "II*") for g in grades_50):
        return "blocking"  # FULL_CONSERVATION
    if any(g == "II" for g in grades_50):
        return "navigable"  # RETAIN_AND_ADAPT
    if any(g in ("I", "II*") for g in grades_150):
        return "navigable"
    if any(g == "II" for g in grades_150):
        return "manageable"
    return "clean"


def main():
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    total_enriched = 0
    total_skipped = 0

    for filename in FILES:
        filepath = f"{DATA_DIR}/{filename}"
        print(f"\n=== Processing {filename} ===")

        with open(filepath) as f:
            data = json.load(f)

        sites = data["sites"]
        modified = 0

        for i, site in enumerate(sites):
            name = site.get("name", f"Site {i}")
            lat = site.get("lat")
            lng = site.get("lng")

            if not lat or not lng:
                print(f"  SKIP {name}: no coordinates")
                total_skipped += 1
                continue

            # Query 50m radius
            listings_50 = query_nhle(lat, lng, D_LAT_50, D_LNG_50)
            if listings_50 is None:
                print(f"  SKIP {name}: API error")
                total_skipped += 1
                time.sleep(1)
                continue

            # Query 150m radius
            listings_150 = query_nhle(lat, lng, D_LAT_150, D_LNG_150)
            if listings_150 is None:
                listings_150 = listings_50  # fallback

            constraint = classify_nhle(listings_50, listings_150)

            # Deduplicate 150m list (includes 50m results)
            seen = set()
            all_listings = []
            for l in listings_150:
                key = l["nhle_id"]
                if key not in seen:
                    seen.add(key)
                    all_listings.append(l)

            # Write to site
            site["nhle_listings"] = all_listings
            site["nhle_count_50m"] = len(listings_50)
            site["nhle_count_150m"] = len(all_listings)
            site["nhle_constraint"] = constraint
            site["nhle_verified"] = True
            site["nhle_date"] = today

            grade_summary = {}
            for l in all_listings:
                g = l["grade"]
                grade_summary[g] = grade_summary.get(g, 0) + 1

            print(f"  {name}: 50m={len(listings_50)}, 150m={len(all_listings)}, "
                  f"constraint={constraint}, grades={grade_summary}")

            modified += 1
            total_enriched += 1

            # Rate limit: 0.3s between requests
            time.sleep(0.3)

        # Write back
        with open(filepath, "w") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"  Wrote {modified} sites to {filename}")

    print(f"\nDone. Enriched: {total_enriched}, Skipped: {total_skipped}")


if __name__ == "__main__":
    main()
