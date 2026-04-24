# Top 100 Headroom Filter Spec

Status: Draft for approval before implementation
Owner intent: Nic approved direction on 2026-04-24
Scope: Top 100 ranking logic and Discover verdict grammar
Non-scope: No live code changes in this document

## 1. Purpose

The Top 100 must remain a Top 100 list.

But it is no longer a list of the most interesting, policy-supported, or shortlist-friendly sites.
It becomes a list of the 100 strongest sites where **legitimate headroom is present**.

The engine must answer two questions in order:

1. **Is there legitimate headroom?**
2. **If yes, how good does it get?**

Anything that fails question 1 does not compete in the Top 100.
Anything that is still unresolved stays out of the Top 100 until evidence improves.

## 2. Core principles

### 2.1 Primary truth
The primary product truth is:

- **Headroom = Yes**
- **Headroom = No**
- **Headroom = Unclear**

This comes before all secondary ranking.

### 2.2 Top 100 rule
The Top 100 contains **Headroom = Yes** sites only.

- `No` sites are excluded.
- `Unclear` sites go to a separate study pool, not the Top 100.

### 2.3 Real parcel rule
The Top 100 is about real sites, not fuzzy geography.

A site must be a specific parcel or clearly bounded development site.
Broad allocation areas, vague corridor parcels, masterplan geography, and non-site placeholders do not enter the Top 100.

### 2.4 Headroom first, targetability second
This is not a black-book / off-market product.
The first call is not "can I buy it tomorrow?"
The first call is "does real headroom exist here?"

But obvious non-sites, gone sites, and operationally locked sites still fail the filter because they are not legitimate Top 100 headroom candidates.

### 2.5 Tall-capable is a major positive, not a universal requirement
The most valuable archetype is often:

- prime location
- low architectural value existing building
- no meaningful heritage value
- large enough site for a proper core
- efficient floorplates above 8 floors
- real capacity for scalable uplift

This archetype should dominate the top tier.

But a site can still be `Headroom = Yes` without being a tower play.
Strong mid-rise sites remain valid.

## 3. Required stage order

The ranking chain becomes:

1. **Site validity gate**
2. **Headroom gate: Yes / No / Unclear**
3. **Upside ranking for Yes-sites only**
4. **Discover explanation layer**

No later stage can rescue a site that failed an earlier stage.

## 4. Stage 0 - Site validity gate

This stage answers:

**Is this a real, current, legitimate site candidate at all?**

If the answer is no, the site is excluded before the headroom test.

### 4.1 Hard exclusions
Exclude if any of the following are true:

- already delivered / built / gone
- clearly progressed into active redevelopment pipeline
- station oversite / air-rights / operational transport land
- open space / public realm / civic square / burial ground / non-site land
- strategic infrastructure / utility / safeguarded land
- vague masterplan geography rather than a specific parcel
- campus / estate / institutional restructure without a clearly isolated target parcel
- protected open space or equivalent untouchable designation

### 4.2 Evidence standard
A site is only treated as valid if there is enough evidence to describe it as a real parcel.

Positive signals include:

- specific address or parcel name
- identifiable polygon / boundary
- identifiable existing building or buildings
- identifiable title / owner / parcel definition
- evidence that the site is not already obsolete as an opportunity

If parcel identity is too vague, move to `Unclear` pool or exclude depending on severity.

## 5. Stage 1 - Headroom gate

This is the main decision.

### 5.1 Headroom = Yes
Call `Yes` only when there is positive evidence that meaningful additional built capacity exists.

A `Yes` site should satisfy:

- **real parcel** - specific and legible site
- **real uplift capacity** - underbuilt relative to local context / envelope / planning reality
- **replaceable or intensifiable fabric** - existing built form is genuinely expendable, underperforming, or low-yielding
- **constraints are navigable** - heritage, townscape, operational, or planning constraints do not kill the case
- **evidence is sufficient** - not just location optimism

A `Yes` call should usually be backed by at least **three** of the following:

- site is materially underbuilt for its location
- existing building has low architectural value
- existing building has low or no heritage value
- later poor-quality fabric or low-grade stock
- parcel is large enough for meaningful uplift
- site can support efficient massing rather than token rooftop addition only
- planning context supports intensification
- comparable precedents exist nearby

### 5.2 Headroom = No
Call `No` when real headroom is absent or immaterial.

Examples:

- site already built out to a sensible local intensity
- heritage / townscape constraint kills meaningful uplift
- operational / civic / infrastructure condition kills meaningful uplift
- site is too small or too awkward to carry viable additional mass
- only trivial uplift is plausible
- progressed / gone / locked site

### 5.3 Headroom = Unclear
Call `Unclear` when the current evidence is insufficient to make a clean Yes / No decision.

Examples:

- parcel identity is still vague
- planning status is not verified
- existing building value / contribution not yet understood
- geometry, area, or floors are too inferred
- possible uplift exists, but not yet evidentially defensible

`Unclear` is not a soft yes.
It does not enter the Top 100.

## 6. Architectural value vs heritage value

These must be treated as separate variables.

### 6.1 Heritage value
Heritage value covers:

- statutory listing
- conservation area context
- locally listed / designated heritage signals
- direct setting impacts on important assets
- strong townscape sensitivity where evidenced

### 6.2 Architectural value
Architectural value covers the quality and contribution of the existing building itself, whether listed or not.

Questions:

- Is the building architecturally weak or generic?
- Is it low-grade later stock?
- Does it make little positive contribution to townscape?
- Is it the sort of building a planner would be comfortable losing or materially reworking?

### 6.3 Rule
A site can have:

- low heritage value + low architectural value = strongest demolition / replacement candidate
- low heritage value + moderate architectural value = possible headroom, more caution
- no listing but high townscape contribution = not automatically expendable

The engine must stop treating "not listed" as equivalent to "architecturally disposable".

## 7. Prime headroom archetype

The premium Headroom Top 100 archetype is:

- prime urban location
- low-value existing architecture
- low heritage friction
- larger site area
- enough width/depth to take a proper core
- efficient upper-floor massing possible
- credible route beyond 8 floors without collapsing efficiency

These sites should score disproportionately well at the ranking stage.

## 8. Core viability and efficiency test

This is a major secondary differentiator among Yes-sites.

### 8.1 Why it matters
The best headroom sites are not just sites where more floors are theoretically possible.
They are sites where added height can be absorbed **efficiently**.

The filter must favour sites that can support:

- a decent core
- sensible floorplate depth / width
- viable upper-floor NIA/GIA efficiency
- scalable uplift rather than awkward residual additions

### 8.2 Positive signals
Strong positive signals:

- site large enough to hold a proper core without killing lettable area
- efficient floorplates above 8 floors plausible
- geometry supports vertical stacking cleanly
- tall or taller mid-rise massing improves, rather than destroys, commercial logic

### 8.3 Negative signals
Negative signals:

- tiny or pinched floorplates
- awkward geometry that collapses efficiency at height
- token vertical extension only
- site too constrained to support viable circulation / servicing

### 8.4 Rule
Core viability and efficiency should **not** determine Yes / No on their own.
But once a site is `Yes`, they should be heavily weighted in ranking.

## 9. Stage 2 - Upside ranking for Yes-sites only

Once Headroom = Yes is confirmed, rank by quality of upside.

## 9.1 Ranking dimensions
Recommended dimensions, in descending importance:

1. **Headroom strength**
   - magnitude of real uplift
   - underbuilding intensity
   - credible extra floors / area

2. **Prime location quality**
   - strength of submarket
   - locational quality for high-value intensified development

3. **Architectural expendability**
   - low-value existing building
   - poor modern stock
   - low contribution fabric

4. **Heritage / townscape freedom**
   - low friction ranks higher
   - navigable friction sits in the middle
   - high friction drags hard

5. **Core viability and efficiency at height**
   - ability to carry a proper core
   - upper-floor efficiency
   - scalability beyond 8 floors where plausible

6. **Planning support**
   - OA / CAZ / corridor support
   - nearby precedents
   - policy appetite

7. **Evidence confidence**
   - verified geometry, site facts, planning status, parcel clarity

## 9.2 Explicit ranking bias
The ranking should deliberately favour:

- prime + expendable + low-heritage + larger-format sites
- especially where a strong core and efficient tall or taller mid-rise outcome is plausible

This is the part of the market where the biggest headroom prize sits.

## 9.3 Explicit anti-bias rule
Policy context cannot substitute for parcel truth.

A site must not rank highly just because it is in:

- a famous corridor
- an Opportunity Area
- a CAZ location
- a strong PTAL location

Those are amplifiers, not proof.

## 10. Treatment of uncertainty

### 10.1 Unclear pool
Create a separate study pool for `Headroom = Unclear` sites.

Purpose:

- preserve potentially good sites
- keep the Top 100 clean
- show where more verification work could unlock value

### 10.2 No soft promotion
Unclear sites cannot be promoted into the Top 100 by:

- good location alone
- motivated seller signals
- generic planning optimism
- vague parcel language

## 11. Discover output grammar

Discover should lead with the headroom verdict, not the score.

### 11.1 Primary label
- **Headroom: Yes**
- **Headroom: No**
- **Headroom: Unclear**

### 11.2 Supporting language
Show 2 to 4 short reason chips or lines.

#### Headroom: Yes
Examples:

- underbuilt prime-site parcel
- low-value existing fabric
- low heritage friction
- decent core possible
- efficient uplift above 8F plausible
- strong local precedent

#### Headroom: No
Examples:

- already progressed
- operational transport land
- fully built out
- heritage constraint too strong
- campus / restructure case
- not a real standalone parcel

#### Headroom: Unclear
Examples:

- planning status not verified
- parcel too vague
- building contribution not yet assessed
- geometry / floors too inferred

### 11.3 Secondary line
Only after the verdict:

- `Upside: Modest / Strong / Exceptional`
- or a factual uplift cue such as `+6F likely` or `~11,500 m² uplift potential`

The verdict comes first. The ambition comes second.

## 12. Data and evidence rules

### 12.1 Required evidence hierarchy
A `Yes` call should rely on a combination of:

- parcel-specific geometry / area
- existing building evidence
- heritage / designation evidence
- local planning / precedent evidence
- enough dimensional logic to support the uplift claim

### 12.2 Evidence penalties
If any of the following are largely inferred rather than evidenced, ranking should be capped or the site moved to `Unclear`:

- site area
- existing height / floors
- parcel identity
- planning status
- basis for max envelope / credible uplift

### 12.3 Generated scenarios rule
Generated scenarios are explanatory only until core site facts are verified.
They cannot be treated as proof of headroom.

## 13. Future implementation mapping

This document implies the following implementation split:

### 13.1 Replace current shortlist-first mindset
Current flow overweights shortlist bucket / class / status before real score.
Future flow must gate by headroom truth first.

### 13.2 Separate functions needed
Implementation should separate:

- `assessSiteValidity()`
- `assessHeadroomVerdict()`
- `scoreHeadroomUpside()`
- `renderHeadroomReasons()`

### 13.3 Existing logic that remains useful
Useful current components likely to survive in adapted form:

- legitimacy exclusion logic
- heritage / conservation constraints
- planning policy profiles as secondary amplifiers
- fabric profile logic
- utilisation logic
- precedent logic

### 13.4 Existing logic that must stop dominating
These must stop acting as substitutes for headroom truth:

- shortlist bucket priority
- shortlist class priority
- shortlist status priority
- generic parcel tolerance
- corridor / postcode optimism

## 14. Test set for rollout

Before implementation is accepted, test against:

- known false positives from current top 10 / top 50
- station oversites
- delivered / gone examples
- generic allocation parcels
- institutional / campus / restructure cases
- strong prime low-value building cases
- strong mid-rise but non-tower cases

The test question is simple:

- did the site get the correct Yes / No / Unclear verdict?
- if Yes, is it ranked in the right band?

## 15. Final rule

The Top 100 is not trying to answer:

- what is most exciting
- what is most buyable
- what has the biggest planning story

It is trying to answer:

**Which 100 sites have the strongest defensible legitimate headroom?**
