# Hackney Borough - Research Notes
Last updated: 2026-03-19

## Planning Framework

### Hackney Local Plan 2033 (LP33)
- Adopted July 2020. Primary document until 2033.
- 23,000 new jobs + 118,000m² new office by 2033 - concentrated in Shoreditch
- Site Allocations Local Plan (SALP) 2016 - Shoreditch/Stamford Hill allocations still active pending AAPs

### Future Shoreditch Area Action Plan (AAP)
- **Status: IN CONSULTATION Jan-Apr 2026** - 15 opportunity sites identified
- ~500 homes + substantial office/retail by 2040
- Defines tall building as 30m+, designates specific zones where 30m+ permitted
- KEY document - will define final site boundaries and height limits for Shoreditch

### Tall Buildings Policy
- LP33: tall buildings must respect historic townscapes. NOT a tall building borough by default.
- Fringe City sites: Statement of Common Ground with City of London (March 2024)
- City Plan 2040: Broadwalk House site (City/Hackney border) identified for potential 75m+

### Article 4 Directions - IMPORTANT
- Shoreditch Article 4: restricts E-class (office) → C3 (residential) PD conversion
- Protects employment floor space - planning TAILWIND for office schemes
- Means viable office schemes face less competition from PD resi conversions

### Opportunity Areas
- City Fringe / Tech City OA covers Shoreditch (GLA layer 103) - score boost same as London Bridge OA

## Sub-Area Character

| Area | PTAL | Office NIA £/m² | Notes |
|------|------|-----------------|-------|
| Shoreditch E1/E2 | 6a/6b | £750-900 | Tech/creative, City fringe, Article 4 |
| Old Street / EC1V fringe | 6a | £700-850 | Silicon Roundabout, roundabout transformed Sept 2024 |
| Hoxton N1/EC2A | 5b/6a | £600-750 | Industrial heritage, less height precedent |
| Haggerston E8/E2 | 5a/5b | £500-650 resi | Canal-side |
| Dalston E8 | 5a/5b | £450-550 resi | Town centre |
| Hackney Central E9 | 4b/5a | £400-500 resi | Primary town centre |

## Known/Consented Sites - EXCLUDE FROM SCREENER

- **Bishopsgate Goodsyard** (Ballymore/Hammerson) - CONSENTED, Phase 1 construction 2025
- **One Fairchild Street** - 27F office, CONSENTED, construction ~2025
- **Haggerston Baths** - consented office conversion
- Old Street roundabout itself - public realm only

## Data Sources

- GLA layer 102: `borough LIKE '%Hackney%'` - site allocations
- GLA layer 103: City Fringe/Tech City OA spatial query
- Future Shoreditch AAP 15 sites: manual from hackney.gov.uk news (March 2026)
- Hackney Brownfield Register: hackney.gov.uk/planning (Jan 2026 update)
- PlanIt API for recent apps

## Scoring Adjustments vs Southwark

- Height cap: 30m default LP33. Shoreditch AAP zones up to 50m+. City fringe border up to 75m+ (City SoCG).
- Rent Headroom: Shoreditch ~= Southwark CAZ. Hoxton/Haggerston lower tier.
- Planning Tailwind: Article 4 = bonus for office. Future Shoreditch AAP = OA-equivalent for Shoreditch sites.
- Heritage: South Shoreditch Conservation Area real constraint - check per site.
- Station: Old Street, Shoreditch High Street, Dalston Jn, Hackney Central (all Overground).
