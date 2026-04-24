# Top 100 Headroom Implementation Map

Status: Draft for approval before code changes
Depends on: `docs/top100-headroom-filter-spec.md`
Scope: Map approved product logic onto current code structure
Non-scope: No live code changes in this document

## 1. Goal

Replace the current shortlist-first ranking flow with a headroom-first flow:

1. **Site validity gate**
2. **Headroom verdict: Yes / No / Unclear**
3. **Upside ranking for Yes-sites only**
4. **Discover explanation layer**

This document shows exactly what survives, what gets replaced, and where the new logic should live.

## 2. Current implementation, as it stands

## 2.1 Main assembly path
Current Discover ranking is assembled in `public/discover.html` inside `normaliseSite(...)`.

That function currently:

- derives posture / height / precedent logic
- computes `planScore`
- builds canonical model via `HeadroomSiteModel.buildCanonicalSite(...)`
- reads legitimacy via `assessSiteLegitimacy(...)`
- reads shortlist decision via `deriveShortlistDecision(...)`
- computes final displayed `score`
- returns all fields used by the list, panel, and sort

## 2.2 Current sort order
Current Top 100 sort is in `loadSites()` in `public/discover.html`.

Actual order today:

1. `shortlistEligible`
2. `shortlistBucketPriority`
3. `shortlistClassPriority`
4. `shortlistStatusPriority`
5. `score`
6. `motScore`
7. `verified`
8. `planScore`
9. `plotM2`
10. alphabetical

This is the core problem. It is a shortlist workflow sort, not a headroom truth sort.

## 2.3 Current canonical model
`public/lib/site-model.js` currently provides:

- `buildPlanningPolicyProfile(...)`
- `buildFabricProfile(...)`
- `assessSiteLegitimacy(...)`
- `classifyShortlistSite(...)`
- `verifyShortlistStatus(...)`
- `deriveShortlistDecision(...)`
- `classifySiteTypology(...)`
- `buildCanonicalMetrics(...)`
- `deriveDevelopmentLogic(...)`
- `buildScenarioState(...)`
- `buildCanonicalSite(...)`

These functions are mixed together today inside a shortlist + scenario + score worldview.

## 3. Keep / Refactor / Remove map

## 3.1 Keep with minor adaptation
These are useful and should survive.

### `buildPlanningPolicyProfile(...)`
Keep as a **secondary amplifier**, not as headroom proof.

Use for:
- location quality
- policy support
- precedent context

Do not use for:
- deciding `Headroom = Yes` on its own

### `buildFabricProfile(...)`
Keep and strengthen.

Use for:
- later fabric
- poor modern stock
- redevelopment friendliness
- contribution to architectural expendability

### `buildCanonicalMetrics(...)`
Keep.

Use for:
- site area
- existing height
- existing floors
- rough existing / proposed GIA
- uplift geometry baseline

### `classifySiteTypology(...)`
Keep, but narrow its role.

Use for:
- structured context labelling
- routing to tests and explanation

Do not use for:
- broad automatic promotion into ranking bands

### `planningSignalSummary(...)` and `hydratePlanningSignal(...)`
Keep.

Use for:
- evidence updates
- progression checks
- live context enrichment

## 3.2 Keep but refactor hard
These functions are directionally useful but currently doing the wrong job.

### `assessSiteLegitimacy(...)`
Current role:
- keyword-based penalty engine
- partial credibility filter

New role:
- become `assessSiteValidity(...)`
- focus on real parcel validity and hard exclusions

Should answer:
- is this a real site candidate?
- is it obviously invalid for Top 100 purposes?

New outputs should include:
- `validSite` boolean
- `validityFlags[]`
- `validityExclusionCode`
- `validityReason`

### `deriveDevelopmentLogic(...)`
Current role:
- infers mode / type / posture / strategy

New role:
- support explanation and upside ranking only
- should not act as disguised headroom verdict logic

### `computePlanScore(...)`
Current role:
- injects policy/location value early

New role:
- planning support score inside upside ranking only
- cannot rescue a `No` or `Unclear` site

### `computeScore(...)`
Current role:
- blends raw score + posture + policy + utilisation into a single live score

New role:
- replaced by explicit upside scoring for `Yes` sites only
- current name / logic should not survive intact

## 3.3 Replace entirely
These should be retired from the main Top 100 path.

### `classifyShortlistSite(...)`
Problem:
- too broad
- creates bucket logic that feels operational, not truthful
- lets vague but interesting sites survive as shortlist candidates

Replacement:
- split into structured tests:
  - parcel specificity
  - architectural expendability
  - site scale / core viability
  - delivery type

### `verifyShortlistStatus(...)`
Problem:
- too easy to call `clear`
- sparse zero-count planning data can look cleaner than it is
- designed for shortlist workflow, not clean verdicting

Replacement:
- `assessProgressionStatus(...)`
- returns one of:
  - `gone`
  - `progressed`
  - `verified-current`
  - `unclear`

Only `verified-current` should support a clean headroom verdict.

### `deriveShortlistDecision(...)`
Problem:
- mixes legitimacy, class, status, bucket, and acquisition-style logic
- makes bucket / class / status primary ranking controls

Replacement:
- `assessHeadroomVerdict(...)`
- `scoreHeadroomUpside(...)`
- `buildDiscoverVerdict(...)`

### `shortlistEligible`, `shortlistBucketPriority`, `shortlistClassPriority`, `shortlistStatusPriority`
Problem:
- these are the spine of the current Top 100 distortion

Replacement:
- remove them from primary rank ordering
- keep only if needed for internal workflow or study-list routing

## 4. New target architecture

## 4.1 New canonical flow inside `buildCanonicalSite(...)`
`buildCanonicalSite(...)` should become the single place where the new chain is assembled.

Recommended order:

1. `buildPlanningPolicyProfile(...)`
2. `buildFabricProfile(...)`
3. `buildCanonicalMetrics(...)`
4. `classifySiteTypology(...)`
5. `assessSiteValidity(...)`
6. `assessProgressionStatus(...)`
7. `assessArchitecturalValue(...)`
8. `assessCoreViability(...)`
9. `assessHeadroomVerdict(...)`
10. `scoreHeadroomUpside(...)` if verdict is `Yes`
11. `buildDiscoverVerdict(...)`
12. scenario generation only as explanatory layer, never as proof gate

## 4.2 Proposed new canonical fields
Add these to the canonical site object.

### Validity / status
- `siteValidity`
- `siteValidityReason`
- `siteValidityFlags[]`
- `progressionStatus`
- `progressionReason`

### Headroom verdict
- `headroomVerdict` (`yes` / `no` / `unclear`)
- `headroomReasonPrimary`
- `headroomReasons[]`
- `headroomConfidence`

### Architectural / heritage distinction
- `architecturalValueBand`
- `architecturalValueReason`
- `heritageValueBand`
- `heritageValueReason`

### Scale / efficiency
- `coreViabilityBand`
- `coreViabilityReason`
- `upperFloorEfficiencyBand`
- `tallCapable` boolean

### Ranking
- `headroomUpsideScore`
- `headroomRankBand`
- `headroomSortKey`

## 5. New function set

## 5.1 `assessSiteValidity(site)`
Purpose:
- hard exclusion of non-sites and invalid Top 100 candidates

Tests:
- delivered / gone / obsolete
- oversite / air-rights / transport-led land
- open space / public realm / civic land
- strategic infrastructure / safeguarded land
- vague geography / generic boundary parcel
- institutional / campus / restructure without isolated parcel

Output:
- valid / invalid
- flags
- exclusion code
- reason

## 5.2 `assessProgressionStatus(site)`
Purpose:
- replace the current shortlist-clear / unclear logic

Outputs:
- `gone`
- `progressed`
- `verified-current`
- `unclear`

Rule:
- sparse zeroed planning objects can no longer mean `verified-current`

## 5.3 `assessArchitecturalValue(site)`
Purpose:
- explicitly separate architectural expendability from heritage

Tests:
- age / type / quality of stock
- poor later commercial stock
- low townscape contribution
- weak standalone building quality

Outputs:
- `low`
- `medium`
- `high`
- reasons

A low architectural value score is a major positive for headroom.

## 5.4 `assessCoreViability(site)`
Purpose:
- evaluate whether the site can absorb height efficiently

Tests:
- site area
- width / depth / geometry
- capacity to take a proper core
- likely upper-floor efficiency
- whether uplift above 8 floors remains commercially coherent

Outputs:
- `poor`
- `adequate`
- `strong`
- reasons

## 5.5 `assessHeadroomVerdict(site)`
Purpose:
- the main truth function

Reads:
- validity
- progression status
- heritage value
- architectural value
- utilisation / underbuilding
- scale / core viability
- planning support
- evidence confidence

Returns:
- `yes`
- `no`
- `unclear`
- primary reason
- supporting reasons

Rule:
- policy support cannot create `yes` by itself

## 5.6 `scoreHeadroomUpside(site)`
Purpose:
- rank only the `Yes` sites

Recommended dimensions:
- headroom strength
- prime location quality
- architectural expendability
- heritage freedom
- core viability / efficiency at height
- planning support
- evidence confidence

This replaces the current shortlist-priority-driven sort.

## 5.7 `buildDiscoverVerdict(site)`
Purpose:
- produce card / focus panel explanation

Output:
- `Headroom: Yes / No / Unclear`
- short explanation lines
- secondary upside line

## 6. Changes needed in `public/discover.html`

## 6.1 `normaliseSite(...)`
Current role:
- giant assembly point mixing posture, legitimacy, shortlist, score, and list outputs

New role:
- consume the canonical object from `buildCanonicalSite(...)`
- stop recreating or shadowing verdict logic locally

Required changes:
- remove reliance on `shortlist` as the main product truth
- read `headroomVerdict`, `headroomUpsideScore`, and explanation fields from canonical model
- keep only local UI-specific formatting, not shared logic

## 6.2 `loadSites()` sort block
Replace current sort with:

1. `headroomVerdict === yes`
2. `headroomUpsideScore desc`
3. `headroomConfidence desc`
4. `plotM2 desc` or other approved secondary tie-breaks
5. alphabetical

`No` and `Unclear` must not appear in Top 100 mode.

## 6.3 `filteredSites()`
Current Top 100 mode uses `shortlistSites.slice(0,100)`.

Replace with:
- Top 100 = `headroomVerdict === 'yes'`
- Study list / search may include `unclear`
- `no` excluded from ranking views, but may still be visible in explicit search / audit views if desired

## 6.4 Card and focus panel copy
Change display hierarchy from:
- score / verdict pill / shortlist flavour

to:
- `Headroom: Yes / No / Unclear`
- 2 to 4 reasons
- then secondary upside signal

## 7. What must not happen in implementation

- no fallback duplicate maths outside the canonical model
- no second scoring brain for Discover vs intelligence
- no policy-only promotion into `Yes`
- no soft use of `Unclear` as ranking filler
- no preservation of shortlist bucket / class / status as hidden primary ranking logic

## 8. Rollout order

## Phase 1 - Canonical model reset
Files:
- `public/lib/site-model.js`

Work:
- add new validity / progression / architectural / core / headroom functions
- keep old shortlist fields temporarily for backwards compatibility
- add new canonical fields alongside them

## Phase 2 - Discover consumes new truth
Files:
- `public/discover.html`

Work:
- make `normaliseSite(...)` read new canonical verdict fields
- switch Top 100 filter and sort
- change card / focus panel copy order

## Phase 3 - Clean-up
Files:
- `public/lib/site-model.js`
- `public/discover.html`
- any dependent surfaces using shortlist fields

Work:
- remove dead shortlist-first ranking logic
- remove legacy fields no longer needed
- align any other surface still reading old score semantics

## 9. Audit test set for rollout

This is the minimum evidence set before any new ranking is trusted.

## 9.1 Known false-positive controls
These should not survive as Top 100 `Yes` winners.

- `1 Silk Street` - advancing major planning application, not a clean Top 100 opportunity candidate. Source: `memory/2026-04-16.md#L100-L105`
- `100 Leadenhall Street` - gone / non-target example already flagged by Nic. Source: `memory/2026-04-16.md#L100-L105`
- station oversites - explicitly rejected as a class by Nic and must fail hard. Source: `memory/2026-04-16.md#L103-L105`
- generic boundary parcels such as:
  - `Land bounded by Glengall Road, Latona Road and Old Kent Road`
  - `Site Bordering Great Suffolk Street and Ewer Street`
- broad geography cases such as `Mandela Way`

## 9.2 Institutional / restructure controls
These should usually land as `No` or `Unclear`, not Top 100 `Yes`.

- `Salvation Army Headquarters, Newington Causeway`
- campus / hospital / estate / shopping-centre restructuring cases
- wharf / safeguarded / strategic-use edge cases such as `Chambers Wharf`

## 9.3 Positive archetype controls
These should rank strongly if the data supports them.

- prime location
- low architectural value building
- low heritage burden
- larger site
- proper core viable
- efficient uplift beyond 8 floors plausible

## 9.4 Mid-rise control group
Need examples that are legitimate `Yes` even if not tower plays.

Purpose:
- prevent overfitting to tall schemes only

## 10. Success test

The new implementation is only good if all of the following are true:

- bad current winners are removed or downgraded correctly
- vague sites no longer fill Top 100 slots
- `Unclear` sites no longer pollute the ranking
- prime low-value larger-format sites rise naturally
- strong mid-rise plays still survive as `Yes`
- Discover reads like a clear professional call, not an opaque score theatre

## 11. Practical definition of done

Implementation is only done when we can answer for each candidate:

1. Is this a real site?
2. Is there headroom?
3. Why?
4. If yes, how strong is it?
5. Why did it rank here?

If we cannot answer those cleanly, the new model is not done.
