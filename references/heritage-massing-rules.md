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

### Type 3: RETAIN AND ADAPT (default for pre-1930 in reasonable condition)
- **Trigger:** Pre-1930 building in reasonable structural condition, regardless of listing status. This is now the DEFAULT response for anything with heritage character. The sustainability climate (GLA Whole Life Carbon, Southwark P69, LETI guidance) means the planning officer's starting position is "prove why you can't keep this building."
- **Massing rule:** Existing structure retained and adapted. Roof extension permitted (typically 2-3 floors max) with mandatory setback of 1.5-2.0m from primary facades. New floors must be visually subservient - lightweight materials (zinc, glass, metal cladding), recessive colour palette. No increase to existing footprint at ground.
- **What this means for our model:** The existing building NIA is KEPT and UPGRADED, not demolished and rebuilt. Additional floors are the uplift, not the whole scheme.
- **Coverage reduction:** Upper floors 65-80% of existing footprint (setback)
- **Cost model:** Split into two: (a) retrofit of existing floors at £1,800-2,500/m2, (b) new floors above at £4,000-5,500/m2. Blended rate is LOWER than full new-build.
- **Embodied carbon advantage:** 50-70% lower WLC than demolish-and-rebuild. This is a material planning consideration.
- **NIA impact:** Existing floors keep current efficiency (often lower, 70-75%). New floors above achieve 80%+.
- **Programme:** Often SHORTER than new-build (no demolition, no facade propping)
- **Planning advantage:** Strong. Aligns with every policy direction. Much easier pre-app conversation.
- **Examples:** Most Victorian commercial buildings in Bankside, Borough, Bermondsey. Most inter-war warehouse conversions.

### Type 4: FACADE RETENTION (last resort before demolition)
- **Trigger:** Building too structurally compromised or functionally obsolete for Type 3, but facade has heritage/streetscape value that must be preserved. OR Grade II listed where interior has no significance. This is a HARDER sell than it used to be - the sustainability argument cuts against gutting a building just to keep its face.
- **Planning reality:** You now need a Whole Life Carbon assessment showing that facade retention + new-build produces better outcomes than retrofit. Many LPAs are pushing back on facade retention as performative conservation.
- **Massing rule:** Primary facade(s) retained in situ. New structure behind with 300mm cavity. Upper floors set back 2.0m minimum. Roof must be subservient.
- **Coverage reduction:** 25-40% loss of upper floor plate
- **Cost impact:** +12-18% construction cost (propping, structural interface, monitoring)
- **Programme impact:** +3-4 months
- **NIA impact:** -5% efficiency
- **Cost breakdown:**
  - Temporary facade propping: £400-600/m2 of retained facade area
  - Structural interface (new frame to old facade): £150-250/m2 GIA
  - Whole Life Carbon assessment: £25-40k
  - Survey/monitoring during works: £50-80k fixed
- **Examples:** Severely deteriorated listed buildings, some fire-damaged structures

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
  
  // The key threshold: pre-1930 in reasonable condition = RETAIN AND ADAPT
  // This is the sustainability-first default. Burden of proof is on demolition.
  const age = estimateBuildingAge(site);
  const isPreWar = ['georgian','victorian','edwardian','interwar'].includes(age) || site.build_year < 1930;
  
  if (isPreWar && site.structural_condition !== 'poor') {
    // Pre-1930 building in OK condition: retain and adapt is the default
    return 'RETAIN_AND_ADAPT';
  }
  
  // Pre-1930 but structurally compromised: facade retention if facade has value
  if (isPreWar && site.structural_condition === 'poor') {
    if (site.listing === 'II' || site.facade_significance >= 2) return 'FACADE_RETENTION';
    return 'CONTEXTUAL'; // truly derelict with no facade value
  }
  
  // Listed Grade II (any age): retain and adapt unless structurally impossible
  if (site.listing === 'II') {
    return site.structural_condition === 'poor' ? 'FACADE_RETENTION' : 'RETAIN_AND_ADAPT';
  }
  
  // Conservation Area
  if (site.conservation_area) {
    if (site.ca_positive_contributor) return 'RETAIN_AND_ADAPT';
    return 'CONTEXTUAL';
  }
  
  // Post-war (1930-1980)
  if (age === 'postwar' || (site.build_year >= 1930 && site.build_year < 1980)) return 'CONTEXTUAL';
  
  return 'UNRESTRICTED';
}
```

**Key principle:** Pre-1930 in reasonable condition = RETAIN AND ADAPT. Always. The burden is on the developer to prove why demolition is justified, not on the heritage officer to prove why it shouldn't be demolished. The sustainability climate has flipped this.

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

**Current classification:** `manageable` (assumed full new-build)
**Proposed classification:** `RETAIN_AND_ADAPT` (Type 3)

**Why:** Victorian commercial building (c.1885), stock brick, solid structural condition (RREEF maintained as income asset). In the current sustainability climate, any pre-app conversation starts with "why can't you keep this building?" The answer for 24SS is: you can, and you should. Retrofit the existing floors, add 3-4 floors above with setback.

**What changes:**
- **Existing 6 floors:** Retrofitted, not demolished. Cost: ~£2,200/m2 (not £4,200)
- **Additional floors above:** 3-4 max (not 4-6), set back 1.5m from primary facades
- **Upper floor plate:** ~65-75% of existing footprint (setback reduces plate)
- **Total proposed:** 9-10F max (not 10-12F)
- **Embodied carbon:** 50-60% lower than demolish-and-rebuild scenario
- **Planning advantage:** Massive. Aligns with Southwark P8, P69. Pre-app conversation is about design quality, not principle.

**Impact on Base scenario numbers:**
- GDV: Lower (fewer new floors, smaller upper plates)
- Construction: Lower blended rate (retrofit existing + new above)
- PoC: May actually IMPROVE because cost drops faster than revenue
- RLV: Likely similar or better (lower TDC offsets lower GDV)
- Programme: Shorter (no demolition phase)

**The honest conclusion:** Retain-and-adapt is not just the heritage-compliant answer - it may be the better financial answer too. Lower risk, faster consent, shorter programme, lower embodied carbon (which is now a marketing advantage for occupier ESG requirements).

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
