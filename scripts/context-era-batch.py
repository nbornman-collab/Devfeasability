#!/usr/bin/env python3
"""
Batch context_era classification for Hackney, City, and remaining Southwark sites.

Era tiers (from WORKING_PROTOCOL):
  A = pre-1920 (Georgian/Victorian/Edwardian) - heritage dominant
  B = 1920-1945 (interwar, mansion blocks)
  C = 1945-1985 (post-war commercial/resi) - full redevelopment viable
  D = 1985+ (modern commercial) - optimisation play

Classification approach:
  - Manual classification based on known London urban fabric
  - NHLE density as supporting signal (high listed count = older fabric)
  - Conservation area status as signal
  - Address/name/zone as primary indicators
"""

import json

# Manual classifications based on London knowledge
# Format: partial name match -> era
HACKNEY_ERAS = {
    # City Fringe / Shoreditch - Victorian warehouse district, heavily listed
    "Old Street Triangle": "B",          # Interwar/post-war commercial, some Victorian
    "50-60 Commercial Street": "A",       # Deep Victorian/Georgian - Spitalfields, 65 listed in 150m
    "Worship Street EC2A": "B",           # Victorian warehouses but heavily rebuilt post-war
    "Shoreditch High Street South": "A",  # Victorian commercial strip
    "Sun Street / Finsbury Square": "B",  # Interwar commercial
    "Curtain Road Warehouse District": "A", # Victorian warehouses
    "Hoxton Square Fringe": "A",          # Georgian/Victorian
    "Pitfield Street Industrial": "C",    # Post-war industrial
    "Eagle Wharf East": "C",              # Post-war industrial, no listed buildings
    "St Leonards Hospital": "A",          # Victorian institutional, Grade I/II* nearby
    "130 Kingsland Road": "A",            # Victorian terraces/commercial
    "Kingsland Road Industrial Corridor": "B", # Mixed interwar industrial
    "Eagle Wharf Road": "C",              # Post-war light industrial
    "40-43 Andrews Road": "C",            # Post-war bus garage/industrial
    "51-61 Mare Street": "B",             # Interwar commercial frontage
    "Former Rose Lipman Library": "C",    # 1960s brutalist library
    "164-170 Mare Street": "A",           # Victorian, II* adjacent
    "27-38 Well Street": "B",             # Interwar/Victorian mix
    "182 Mare Street": "B",               # Interwar institutional (college)
    "Florfield Road Cluster": "C",        # Post-war light industrial
    "Tesco Metro, Well Street": "C",      # Modern retail on post-war site
    "Former CLR James Library": "C",      # 1960s/70s public building
    "1, 3, 5, 7 Dalston Lane": "B",       # Interwar commercial, Dalston curve
    "2-16 Ashwin St": "B",               # Interwar commercial
    "36-42 Kingsland High Street": "A",   # Victorian high street
    "333-337 Mare Street": "B",           # Interwar commercial
    "55 Morning Lane": "B",              # Interwar/post-war
    "Kingsland Shopping Centre": "C",     # 1960s/70s shopping centre
    "Hackney Central Overground": "C",    # Post-war station rebuild
    "339-357 Mare Street": "A",           # Victorian commercial, listed on-site
    "Ridley Road": "A",                   # Victorian market area
    "Travis Perkins, 111 Dalston": "A",   # Victorian, listed on-site
    "Clapton Bus Garage": "B",            # Interwar bus garage
    "230 Dalston Lane": "B",              # Interwar, station area
    "Birkbeck Mews": "A",                # Victorian mews, listed on-site
    "Lower Clapton Health Centre": "B",   # Interwar institutional
    "Tram Depot, 38-40 Upper Clapton": "B", # Edwardian/interwar tram depot
    "71-73 Lordship Road": "A",           # Victorian (St Mary's Lodge)
    "Yard Buildings, 318 Green Lanes": "C", # Post-war yard buildings
}

CITY_ERAS = {
    # City of London - almost everything has medieval/Victorian fabric underneath
    # but the sites themselves are mostly post-war/modern office towers
    "1 Liverpool Street": "D",            # Modern office complex (2000s rebuild)
    "Norton Folgate, Spitalfields": "A",  # Victorian/Georgian, edge of Spitalfields CA
    "Stone House and 128-170 Bishopsgate": "D", # Modern tower, 5 listed within 50m
    "10 Trinity Square": "A",             # Historic precinct, Tower of London buffer
    "Sugar Quay, Lower Thames Street": "B", # Post-war on medieval/Victorian footprint
    "Barts Square, Little Britain": "A",  # Historic Smithfield area
    "Curtain Road, Worship Street": "B",  # Victorian warehouses
    "Crown Place, Earl Street": "D",      # Modern office district
    "Ocean House, Little Moorfields": "C", # Post-war office, but Grade I nearby (Barbican)
    "15-16 Minories": "C",               # Post-war commercial
    "Land at Royal Mint Street": "B",     # Interwar/Victorian industrial
    "Aldgate Place, Whitechapel High Street": "C", # Post-war, recently redeveloped areas
    "Fenchurch Place, EC3": "B",          # Victorian commercial core
    "100 Leadenhall Street": "D",         # Modern City office zone
    "Fleet Street East, EC4": "A",        # Historic Fleet Street, 44 listed in 150m
    "Holborn Viaduct Development Site": "B", # Victorian infrastructure
    "Cannon Street Station Oversite": "A", # Victorian station, 38 listed in 150m
    "Moorgate Station Oversite": "B",     # Victorian/Edwardian station
    "Smithfield Market, EC1": "A",        # Grade II* Victorian market
    "Bunhill Fields adjacent, EC1": "A",  # Historic burial ground, 74 listed in 150m
    "Blackfriars Gateway, EC4": "C",      # Post-war commercial
    "Bourne Estate South, Holborn": "B",  # Interwar social housing
}

# Remaining Southwark sites
SOUTHWARK_ERAS = {
    "Kwik Fit and Gibbs & Dandy, Grove Vale": "B",  # Interwar commercial
    "Aylesbury Phase 2": "C",             # 1960s-70s estate
    "Aylesbury Phase 3": "C",             # 1960s-70s estate
    "123 Grove Park": "A",               # Victorian residential, 14 listed in 150m
    "Aylesbury Phase 4a-c": "C",          # 1960s-70s estate
    "Aylesbury Plot 18": "C",             # 1960s-70s estate
    "Aylesbury Site 7": "C",              # 1960s-70s estate (despite NHLE - adjacent to Walworth)
    "Dulwich Community Hospital": "B",    # Interwar institutional
    "Railway Rise, East Dulwich": "C",    # Post-war railway land
    "Aylesham Centre and Peckham Bus Station": "C", # 1980s shopping centre
    "Guys and St Thomas Trust Rehabilitation": "C", # Post-war institutional
    "Land between St Thomas Street, Fenning Street, Melior Place": "A", # Victorian Bermondsey
    "Mandela Way": "C",                  # Post-war industrial
    "Dulwich Hamlet Champion Hill Stadium": "C", # Post-war sports ground
    "Land between the railway arches": "B", # Victorian railway arches
    "Bricklayers Arms": "C",             # Post-war commercial/industrial
    "636 Old Kent Road": "C",            # Post-war retail
    "Marlborough Grove": "A",            # Victorian, 35 listed in 150m inc Grade I
    "Land bounded by Glengall Road, Latona Road": "C", # Post-war
    "4/12 Albany Road": "B",             # Interwar/Victorian mix
    "Aylesbury Phase 1 Site 1a": "C",    # 1960s-70s estate
    "Aylesbury Phase 1": "C",           # 1960s-70s estate
    "Newington Triangle": "C",           # Post-war commercial
    "49 Lomond Grove": "C",             # Post-war
    "99 Lomond Grove": "B",             # Interwar residential
    "Iceland, 118-132 Camberwell Road": "B", # Victorian/Edwardian high street
    "London Fire and Emergency Planning": "C", # Post-war institutional
    "Land Between Camberwell Station Road and Warner Road": "C", # Post-war
    "Denmark Hill Campus East": "B",      # Interwar institutional
    "330-344 Walworth Road": "A",         # Victorian high street, Grade I nearby
    "Chatelaine House, Walworth Road": "C", # Post-war tower block
    "107 Dunton Road": "C",              # Post-war retail
    "Butterfly Walk": "C",              # 1980s shopping centre
    "Harmsworth Quays": "C",            # Post-war industrial/retail
    "96-120 Old Kent Road": "C",         # Post-war retail
    "760, 812 Old Kent Road": "C",       # Post-war retail
    "Elephant & Castle Shopping Centre": "C", # 1960s brutalist (now being rebuilt)
    "Morrisons, Walworth Road": "C",     # Post-war retail
}


def match_era(site_name, era_map):
    """Find matching era from partial name match."""
    for pattern, era in era_map.items():
        if pattern.lower() in site_name.lower():
            return era
    return None


def main():
    changes = {"hackney": 0, "city": 0, "southwark": 0}
    
    configs = [
        ("public/data/hackney-sites.json", HACKNEY_ERAS, "hackney"),
        ("public/data/city-sites.json", CITY_ERAS, "city"),
        ("public/data/southwark-sites.json", SOUTHWARK_ERAS, "southwark"),
    ]
    
    for filepath, era_map, borough in configs:
        with open(filepath) as f:
            data = json.load(f)
        
        sites = data["sites"]
        for site in sites:
            if site.get("context_era"):
                continue  # Already classified
            
            name = site.get("name", "")
            era = match_era(name, era_map)
            
            if era:
                site["context_era"] = era
                changes[borough] += 1
                print(f"  {borough}: {name} -> {era}")
            else:
                print(f"  {borough}: UNMATCHED: {name}")
        
        with open(filepath, "w") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\nClassified: Hackney={changes['hackney']}, City={changes['city']}, Southwark={changes['southwark']}")
    print(f"Total: {sum(changes.values())}")


if __name__ == "__main__":
    main()
