# Heritage Massing Rules - Auto-Setback and Facade Retention Framework

## The Problem

Our current massing model extrudes floors uniformly from the site polygon regardless of heritage context. For Victorian and pre-war buildings, this produces massing that would be refused at pre-app. One comparison screenshot at launch destroys credibility.

## Classification: 5 Heritage Response Types

Every site gets classified into one of these based on building age, listing status, conservation area, and character:

### Type 1: UNRESTRICTED
- **Trigger:** Post-1980 building, no listing, not in CA, no character value
- **Massing rule:** Full-plate extrusion from ground. No setback required.
- **Cost impact:** None
- **Examples:** 1990s office blocks, surface car parks, modern retail sheds

### Type 2: CONTEXTUAL
- **Trigger:** Post-war (1945-1980), no listing, may be in CA buffer zone
- **Massing rule:** Full-plate extrusion permitted but material palette must respond to context. No physical setback.
- **Cost impact:** +2% facade treatment premium
- **Examples:** 1960s commercial blocks, brutalist structures (unless locally listed)

### Type 3: SETBACK REQUIRED
- **Trigger:** Pre-war (pre-1945) OR in Conservation Area OR locally listed OR identified as non-designated heritage asset (NDHA)
- **Massing rule:** New floors above existing parapet/roofline MUST set back minimum 1.5m from primary facades (street-facing). Secondary facades: 1.0m minimum.
- **How it works:** Podium floors match existing footprint. Tower/upper floors use reduced footprint = `polygon inset by setback distance on facade sides`.
- **Coverage reduction:** Typically 15-25% loss of upper floor plate vs full polygon
- **Cost impact:** +5% construction cost (structural transfer, irregular floorplates)
- **NIA impact:** -3% efficiency (irregular plates where new meets old)
- **Examples:** Victorian commercial buildings outside CA, inter-war warehouses, identified NDHAs

### Type 4: FACADE RETENTION
- **Trigger:** Grade II listed OR in Conservation Area with "positive contributor" status OR Victorian/Edwardian with significant architectural detail (ornamental stonework, terracotta, decorative brickwork)
- **Massing rule:** Primary facade(s) retained in situ. New structure built behind facade with minimum 300mm cavity. Upper floors set back minimum 2.0m from retained facade line. Roof addition must be "subservient" (typically lightweight, recessive materials - zinc/glass).
- **Coverage reduction:** 25-40% loss of upper floor plate
- **Cost impact:** +12-18% construction cost (temporary works, propping, structural interface)
- **Programme impact:** +3-4 months
- **NIA impact:** -5% efficiency
- **Cost breakdown:**
  - Temporary facade propping: £400-600/m2 of retained facade area
  - Structural interface (new frame to old facade): £150-250/m2 GIA
  - Survey/monitoring during works: £50-80k fixed
- **Examples:** 24 Southwark Street (Victorian stock brick commercial), many Bankside/Borough High St buildings

### Type 5: FULL CONSERVATION
- **Trigger:** Grade I or II* listed OR within World Heritage Site buffer OR Scheduled Ancient Monument
- **Massing rule:** No vertical extension permitted in most cases. Lateral or subterranean expansion only. Any intervention subject to Listed Building Consent with Heritage Statement.
- **Coverage reduction:** N/A (existing envelope preserved)
- **Cost impact:** Varies enormously - often 2-3x standard construction
- **Examples:** Tate Modern (Grade II*), some City churches

---

## Auto-Classification Logic

```
function classifyHeritage(site) {
  // Hard classifications first
  if (site.listing === 'I' || site.listing === 'II*' || site.whs_buffer) return 'FULL_CONSERVATION';
  if (site.listing === 'II') return 'FACADE_RETENTION';
  
  // Conservation Area + positive contributor
  if (site.conservation_area && site.ca_positive_contributor) return 'FACADE_RETENTION';
  
  // Age-based with character assessment
  const age = estimateBuildingAge(site);
  
  if (age === 'victorian' || age === 'edwardian' || age === 'georgian') {
    // Victorian+ with significant detail = facade retention
    if (site.architectural_detail >= 2) return 'FACADE_RETENTION'; // ornamental stonework, terracotta, decorative brick
    // Victorian+ without major detail = setback
    return 'SETBACK';
  }
  
  if (age === 'interwar') return 'SETBACK';
  if (age === 'pre-war') return 'SETBACK'; // catch-all pre-1945
  
  // Conservation Area but modern building
  if (site.conservation_area) return 'CONTEXTUAL';
  
  // Post-war
  if (age === 'postwar') return 'CONTEXTUAL';
  
  return 'UNRESTRICTED';
}
```

## Building Age Estimation

Where we don't have exact build date, derive from:
1. **EPC data** - sometimes includes construction age band
2. **Architectural style signals** - stock brick + sash windows = Victorian; Portland stone cladding = inter-war; concrete frame visible = post-war
3. **OS mapping** - first appearance on historic OS maps (available via NLS)
4. **Default:** If in inner London CAZ and building appears pre-1945, default to SETBACK minimum

## Setback Geometry

For Type 3 (SETBACK) and Type 4 (FACADE_RETENTION):

```
// Identify primary facades (street-facing edges of polygon)
// Setback = inset those edges only, not the full polygon

function computeSetbackPolygon(sitePolygon, primaryFacadeEdges, setbackM) {
  // For each primary facade edge, offset inward by setbackM
  // Keep non-primary edges at original position
  // This creates an irregular upper floor plate
  
  // Simplified: if all edges are primary (corner site), 
  // upper plate = bufferPoly(polygon, -setbackM_in_degrees)
  
  // If only 1-2 edges are primary (mid-terrace),
  // inset only those edges
}
```

**Degree conversion:** 1.5m setback ~ 0.0000135 degrees longitude at London latitude

## Cost Model Integration

The cost engine needs these additions per heritage type:

| Parameter | Type 1 | Type 2 | Type 3 | Type 4 | Type 5 |
|-----------|--------|--------|--------|--------|--------|
| Cost multiplier | 1.00 | 1.02 | 1.05 | 1.15 | N/A |
| NIA efficiency adj | 0% | 0% | -3% | -5% | N/A |
| Upper floor coverage | 100% | 100% | 80% | 65% | N/A |
| Programme add (months) | 0 | 0 | 0 | 3 | N/A |
| Facade retention cost | 0 | 0 | 0 | £400-600/m2 | N/A |
| Setback (primary) | 0m | 0m | 1.5m | 2.0m | N/A |
| Setback (secondary) | 0m | 0m | 1.0m | 1.5m | N/A |

## Impact on 24 Southwark Street

**Current classification:** `manageable` (Type 3 equivalent)
**Proposed classification:** `FACADE_RETENTION` (Type 4)

**Why:** Victorian commercial building (c.1885), stock brick with some decorative detailing, Bankside context with strong character. Even though not listed, any developer proposing demolition or unsympathetic rooftop addition would face P8 refusal from Southwark.

**Impact on numbers (Base scenario):**
- Upper floor coverage: 65% (was assumed 65% for tower, but now podium floors also affected)
- Cost multiplier: 1.15 (was 1.00)
- NIA efficiency: 0.76 (was 0.81)
- Programme: +3 months → finance cost increases
- Estimated GDV impact: -8-12%
- Estimated PoC impact: -3-5 points

## Massing Visual Changes

For the 3D massing view:
1. **Existing building** renders as amber extrusion (current)
2. **Podium floors (behind facade)** render at existing footprint but with facade line marked
3. **Upper floors (setback)** render at REDUCED footprint, visually stepped back
4. **Floor lines** on upper floors show the smaller plate

This creates the characteristic "stepped" massing that you see on every heritage-adjacent London development - podium + setback tower. Much more credible than a uniform extrusion.

## Precedent Validation

Successful heritage-response developments in Bankside/Southwark:
- **Bankside Mix (180-188 Great Suffolk St):** Victorian warehouse, facade retained, 6 floors added behind at 2m setback, approved 2019
- **The Shard Place (London Bridge St):** Retained Victorian railway arches, new tower set back significantly from heritage elements
- **Flat Iron Square:** Victorian rail arches retained with contemporary additions set back from original fabric
- **Neo Bankside:** New-build but responded to Tate Modern setting with articulated massing

## Implementation Priority

1. Add `heritage_response_type` field to SITE_INTELLIGENCE (manual for now, auto-classify later)
2. Wire Type into cost multiplier in S04 engine
3. Compute setback polygon for upper floors in massing view
4. Adjust NIA efficiency per Type
5. Add programme months to finance calculation
6. Update synthesis text to reference the heritage response

**Phase 2:** Auto-classify from EPC age band + conservation area + listing data
