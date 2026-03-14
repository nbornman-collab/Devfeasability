# Architectural Design Notes
## For DevFeasibility floor plan logic
## Status: DRAFT — awaiting vet from Nic Bornman

---

## 1. LEASE SPANS

> *Core question: how deep can a floor plate go before daylight, fire, or leasability breaks down?*

### Commercial Office — by Tenant Type

| Tenant type | Lease depth (core face → glass) | Typical plate depth total | Notes |
|---|---|---|---|
| Standard Grade A open-plan | 7.5–9m | 15–18m | BCO sweet spot |
| Legal / professional services | 6–8m | 12–16m | Some cellular, needs shallower spans |
| Tech HQ / flexible workspace | 8–10m | 16–20m | Breakout zones, collaboration areas |
| Financial services (standard) | 7.5–9m | 15–18m | Similar to Grade A |
| **Trading floor** | **12–20m+** | **24–40m+** | Deep open plan, wider structural grid, raised floor essential. NOT fully column-free — columns remain but at wider centres (12–15m grid). Fully column-free = crazy floor structure, not viable. |
| Boutique / HQ single-tenant | 6–8m | 10–14m | Often wants perimeter cellular, terraces |
| Data-heavy / back office | 9–12m | 18–24m | Deep plan acceptable, less daylight dependency |

**Key rule:** Depth beyond 18m from perimeter (not core face) typically requires either:
- An **atrium** or lightwell (break the plate in two ~9m spans)
- A **BS 8206 daylight assessment** to demonstrate compliance
- Mechanical ventilation only (no natural vent) — reduces BREEAM score

### Residential

| Type | Max depth | Notes |
|---|---|---|
| Single-aspect flat | 8–10m | Daylight limits depth sharply |
| Dual-aspect flat | 12–14m total | 6–7m each side of circulation |
| Corner unit | 14–16m | Two windows, more flexibility |
| Corridor width | 1.8m min | 2.1m preferred for MfS compliance |

---

## 2. CORE DESIGN

### Core Ratios (from Nic)

| Use | Core % of GIA | Notes |
|---|---|---|
| Commercial office | **20–25%** | Lifts + stairs + WC + risers + lobby |
| Residential | **~30%** | Higher corridor/stair/lobby ratio per unit |

✅ VETTED (Nic 2026-03-13): % of GIA confirmed.

### Core Sizing by Floor Plate (commercial)

| GIA / floor | Core area (22%) | Approx core dims | Lifts | Stairs |
|---|---|---|---|---|
| 2,000 sqm | ~440 sqm | 20m × 22m | 4–6 | 2 |
| 1,200 sqm | ~264 sqm | 16m × 16m | 2–4 | 2 |
| 800 sqm | ~176 sqm | 13m × 14m | 2 | 2 |
| **500 sqm** | **~110 sqm** | **10m × 11m** | **1–2** | **2** | ← **Option C tower: tight** |
| 300 sqm | ~66 sqm | 8m × 8m | 1 | 2 | Very slender — side core likely |

**Note on Option C (22F tower at 40% coverage):**
Floor plate ≈ 1,551 × 0.40 × 0.75 = ~466 sqm GIA/floor
Core at 22% = ~103 sqm → leaves ~363 sqm NIA
Lease span check: plate ~22m × 21m, core ~10m × 10m → 6m each side ⚠️ Below BCO 7.5m ideal
→ **Flag as leasability risk in pro forma**

### Core Position Logic (updated from Nic, 2026-03-13)

**The real driver is views + shape, not geometry alone.**

1. **Views come first** — premium outlook (river, park, skyline) stays as leasable NIA. Core never goes on the best elevation if avoidable.

2. **Core offset from envelope** — not centred geometrically. Position is driven by establishing *workable lease spans* across the usable parts of the plate. The core is placed where it best divides the floor into viable lease bays.

3. **Weird / re-entrant spaces → core goes there** — irregular shapes from London's organic street pattern create corners, acute angles, and recesses that are poor for open-plan leasing. These are prime core locations (stairs, WC, risers, plant). Waste nothing.

4. **Primary core is compact** — one tight cluster of lifts + main stairs. Efficient, easy to locate by occupiers, structurally rational.

5. **Satellite cores / secondary stairs** go in:
   - Awkward corners that don't lease well
   - Far ends of deep or elongated plates (to satisfy 45m travel distance)
   - Recesses and notches in irregular polygons
   - This is NOT a design failure — it's London practice

6. **London's organic plan shapes** — rare to get a clean rectangle in the City. Most sites have chamfers, step-backs, party wall kinks, or irregular street frontages. The core strategy responds to this directly.

**Implication for DevFeasibility floor plan logic:**
- Analyse the site polygon for re-entrant corners, acute angles, or narrow recesses → these are candidate core/stair locations
- Find the longest unobstructed elevation (likely the primary street frontage or best views) → protect that as NIA
- Primary core should be compact — roughly square in plan
- Satellite stairs placed to achieve 45m travel distance coverage of the whole plate
- Flag if plate geometry forces a stair into a prime elevation (design problem — note it)

**For 100 Leadenhall specifically:**
- Site is roughly rectangular with a notch in the SW corner
- Primary elevation likely north (Leadenhall Street) or east (views to cluster)
- The SW notch / re-entrant is the natural satellite stair location
- Primary core should sit mid-plate, slightly north-of-centre

---

## 3. FIRE — TRAVEL DISTANCES (ADB Vol 2, Table 2)

> *Reference: Approved Document B (Fire Safety), Volume 2 — Buildings other than dwellinghouses*

| Escape condition | Max travel distance | Notes |
|---|---|---|
| **One direction only** (dead end) | **18m** | No alternative exit route |
| **More than one direction** | **45m** | Standard offices with alternative exits |
| **With sprinklers** | **60m** | ADB allows 1/3 increase on 45m limit |
| Dead-end corridor (sprinklered) | 25m | From dead end to nearest stair |

**Practical implication for floor plate design:**
- 45m travel distance from any point → staircase coverage radius ≈ 45m
- Standard 15m-deep Grade A plate: 2 stairs at opposite ends comfortably covers 45m
- Very deep/large plate: 3rd stair may be needed if 45m circle leaves uncovered zone
- Sprinkler system (required >18m) buys you the 60m limit — more planning in tall buildings

### Staircase Count Triggers

| Condition | Min stairs | Notes |
|---|---|---|
| Any floor area | 2 | Minimum alternative escape |
| Travel distance >45m without sprinklers | 3+ | Or redesign plate |
| Travel distance >60m with sprinklers | 3+ | Hard limit |
| Building >18m (BSA) | 2 protected | Building Safety Act |
| Single stair building | Special case | Only if every flat has alternative means — resi only |

✅ VETTED (Nic 2026-03-13): Fire engineer's judgement call — no single ADB table reference. Geometry informs the case.

---

## 4. ATRIUM DESIGN

### Why an Atrium?

Atriums are the design solution when a floor plate exceeds comfortable daylight/lease depth:

| Plate depth | Solution |
|---|---|
| ≤18m | No atrium needed — standard windows adequate |
| 18–24m | Atrium recommended — splits plate into 2× ~9-12m lease spans |
| >24m | Atrium or lightwell generally required (daylight, NV compliance) |

### Atrium Types

| Type | Description | Use |
|---|---|---|
| **Linear** | Long slot down building centre | Deep rectangular plates — 2 facing flanks |
| **Central** | Square void at building core | Large floor plates (e.g., 40m × 40m) |
| **Corner** | L-shaped or corner void | Irregular sites, allows diagonal floor plate |
| **Lightwell** | Small, non-inhabited void | Purely for daylight/ventilation, no occupancy |

### Atrium Economics

- Space lost to atrium void = **NIA cost**
- Typical Grade A atrium: 6–12m wide (2 service widths + 2 lease spans)
- A 9m × 30m atrium on a 1,500 sqm plate loses 270 sqm NIA/floor (~18%) — significant
- BUT: creates premium perimeter floors with atrium views — often commands higher rent
- Also: BREEAM credits (daylight), planning appeal (public benefit/visual interest)
- Net verdict: atrium adds cost but supports planning and rent premium in the right context

### Atrium Fire Strategy (ADB Clause 18 / BS EN 12101-6)

- Atrium is **not** a primary escape route — protected stairs must be separate
- Smoke control system mandatory: mechanical extraction from top of atrium
- Balconies/walkways onto atrium must have smoke curtains at each level
- BS EN 12101-6: smoke management by CFD analysis for complex geometries
- ✅ VETTED (Nic 2026-03-13): Natural ventilation via rooflights acceptable. Detailed fire strategy is Tier 3 — not required at feasibility stage.

---

## 5. STRUCTURAL GRID — COMMERCIAL

| Grid | Notes |
|---|---|
| **9.0m × 9.0m** | BCO preferred — car parking also works (3× 2.5m bays) |
| 9.0m × 12.0m | Common for open-plan offices, good lease span |
| 7.5m × 7.5m | Older buildings, more columns |
| 6.0m × 6.0m | Tight — constrains furniture/fit-out |
| **Column-free trading floor** | Requires transfer structure — PT slab or transfer beam at podium level |

---

## 6. VERTICAL TRANSPORT — BCO BENCHMARKS

| Parameter | Standard | Premium |
|---|---|---|
| Lift wait time | 30 seconds | 25 seconds |
| Occupancy basis | 1 person/12 sqm | 1 person/8 sqm |
| Lift capacity | 1,000–1,600 kg | 1,600–2,000 kg |
| Lifts for 2,000 sqm NIA @ 12 sqm/person | ~167 persons → 3 lifts | |
| Lifts for 500 sqm NIA | ~42 persons → 1–2 lifts | |

---

## 7. FLOOR-TO-FLOOR HEIGHTS

| Use | FTF | Breakdown |
|---|---|---|
| Grade A commercial | 4.0–4.5m | 2.7m clear + 150mm RAF + 100mm ceiling + 550mm services |
| Residential | 3.0–3.2m | 2.4m clear + structural + finishes |
| Ground floor retail/lobby | 5.0–6.0m | Entrance height proportioning |
| Plant floor | 4.5–6.0m | MEP routing, depends on system |
| Sky lobby / amenity floor | 5.0–6.0m | Event space, terrace access |

*Currently using 4.2m FTF in DevFeasibility — within BCO range. Keep.*

---

## 8. NIA EFFICIENCY BENCHMARKS

| Grade | NIA/GIA | |
|---|---|---|
| Grade A commercial (BCO 2019) | **80–85%** | Target |
| Residential | **70–78%** | Depends heavily on unit mix |
| Mixed-use | **75–80%** | Average |

*Currently using 82% commercial in DevFeasibility — correct.*

---

## 9. APPLICATION TO DEVFEASIBILITY

### Immediate logic improvements

- [x] Core at 22% GIA for commercial (not eyeballed)
- [ ] Core at 30% GIA for residential (when resi massing added)
- [ ] Core position: aspect ratio check → central vs side vs end
- [ ] Lease span annotation on plan SVG with flag if <7.5m
- [ ] Travel distance annotation: radius overlay from stair positions
- [ ] Staircase count auto-calculated from plate size + travel distance
- [ ] Atrium trigger flag: if plate depth >18m → flag "atrium may be required"
- [ ] Structural grid overlay (9m) on plan SVG

### Option C (22F Tower) Flags to Add
- Lease span 6m each side → below BCO minimum → label as **"Leasability Risk"**
- Core at 22% of 466 sqm plate = 103 sqm → 1–2 lifts only → label **"Lift capacity limited"**
- Needs sprinkler upgrade to achieve 60m travel distance

---

## Sources / References
- BCO Guide to Specification 2019 (paywalled — key benchmark)
- Approved Document B Vol 2 (2019) — fire/escape
- BS EN 12101-6 — smoke management in atriums
- BS 8206 Part 2 — daylight/sunlight assessment
- Building Safety Act 2022 — higher risk buildings >18m
- CIBSE Guide G — WC provision
- *Nic Bornman direct input (2026-03-13)* — core ratios, position logic, lease span principles

---

## 10. MASSING STRATEGY — CONTEXT-DRIVEN SETBACKS

> ✅ STANDARD FOR ALL SITES — agreed Nic Bornman 2026-03-14

### Principle

**Setbacks are justified by context, not applied by formula.**

A massing that diminishes uniformly on all sides (the "wedding cake") is structurally clumsy and architecturally unconvincing. Stepped massing must be driven by site-specific reading of neighbours, heritage assets, views, and structural logic.

---

### Setback Logic — which faces hold, which recess

For each site, assess the four principal faces before allocating setbacks:

| Face condition | Default stance | Reason |
|---|---|---|
| Primary street frontage | **Hold** | Maintains street wall, continuity with neighbours |
| Heritage asset sightline (Listed bldg, conservation area) | **Recess** | Primary face for setback — reduces perceived bulk from sensitive receptor |
| Active secondary street | **Hold or minimal recession** | Preserves street enclosure, commercial animation |
| Rear / party wall / service yard | **Recess** | Least visible, most flexibility |
| Neighbouring tall building close by | **Hold or negotiate** | Mirror face often helps mutual shading balance; stepping away can increase mutual overshadowing |

**Process:**
1. Map the site — identify heritage assets within 200m, protected views, active frontages, secondary streets
2. Identify the **primary receptor face** — which elevation is most visible from the sensitive asset?
3. That face recesses. **All other faces hold** unless there is a specific, named reason.
4. Document the reason for each face decision in the massing rationale narrative.

---

### Structural Logic — when does stepping make sense?

Stepping is NOT free. Each step introduces:
- A column transfer or outrigger (structural cost)
- A change in structural grid (coordination cost)
- A reduction in plate area (commercial cost — fewer NIA sqm)

**When a step is justified:**
- Planning requirement: protected view coridor, daylight/sunlight assessment, LVMF cone
- Structural transfer already programmed: plant floor, sky lobby, podium crown — use it
- Commercial: sky terrace creates premium identity floor, justifies rent uplift on floors above
- Heritage: specific heritage view requires bulk reduction at a defined height

**When a step is NOT needed:**
- "It's what we always do" — not a reason
- Making the tower "look slender" without wind/view justification
- Equal reduction on all faces — usually means the context hasn't been read

---

### "Does the building need to get smaller as it goes up?"

Not automatically. Assess per option:

| Situation | Answer |
|---|---|
| Below 45m, street-engaged height | One step (at cornice height) often appropriate for planning legibility |
| 45–80m, cluster context | Hold consistent plate unless specific view/daylight trigger. Consistency = structural and commercial efficiency |
| 80m+, landmark scale | Stepping on selected faces (not all) can be argued. But if the cluster has consistent plates (22 Bishopsgate, Heron Tower), holding is defensible |
| Structural transfer programmed (sky lobby, MEP floor) | Use it as the setback level — structurally rational, avoids additional transfer |

**Key test:** *"What specific constraint forces this face to step at this height?"*
If the answer is "nothing specific", hold the plate and argue it.

---

### Implementation in DevFeasibility

- Each option has `podiumHeight`, `setbackM`, `towerFootprintPct`
- 3D render uses two-box geometry: podium at full plate, tower with S/E recession only
- `sbS = setbackM` (south — primary recession face in most London sites, heritage/daylight)
- `sbE = setbackM × 0.6` (east — partial hold for street activity)
- N and W faces always hold (adjust per site if context differs)
- Each option page carries a **Massing Strategy** narrative paragraph explaining:
  - Which faces hold and why (named specific context reason)
  - What structural logic governs the step level
  - Whether further diminution above the step is justified

**This logic applies to all future sites — update face roles when adding a new site based on its specific heritage/view/frontage context.**

---


---

## 11. DEVELOPMENT APPRAISAL — MARKET ASSUMPTIONS & METHODOLOGY

> Research basis: Cushman & Wakefield Q4 2025 London Office MarketBeat, BCO Guide to Specification 2023,
> BCIS cost data, City of London CIL schedule 2024/25, RICS Red Book methodology.
> All figures indicative — final inputs from instructed agent and QS.

---

### 11.1 City of London Office Market Context (Q4 2025)

**Occupational market:**
- Annual City of London take-up: ~9.5M sqft pa (consistent 2023–2025, per C&W)
- Grade A share of leasing: **74%** — record high in 2025. Flight to quality is structural, not cyclical.
- City Core Grade A supply: **1.1 years** only (vs 10-year avg 1.7 years) → acute undersupply
- Implication: well-specified new City office is a landlord's market. Void risk is lower than historical norms for Grade A.

**Prime rents (ERV) — City of London / EC3 Eastern Cluster:**

| Specification | ERV Range | Central Assumption |
|---|---|---|
| Prime City Core, mid-rise (BCO Cat A) | £700–800/sqm NIA pa | **£750/sqm** |
| Leadenhall/Lime St area (our site) | £660–750/sqm NIA pa | **£700/sqm** |
| Upper floor premium (top quartile, City views) | +15–25% on base ERV | **+20%** |
| Grade B existing stock | £420–500/sqm NIA pa | **£450/sqm** |

**Effective rent (after incentives):**
- Rent-free: ~12–15 months on 10–15 year lease (1 month per year of term)
- Effective ERV = Gross ERV × (1 – rent-free/lease term) ≈ **Gross ERV × 0.88**
- Agent letting fees: 15% of first year's rent

---

### 11.2 Investment Market — Net Initial Yields

| Scenario | NIY | Comment |
|---|---|---|
| Prime City Grade A, low-rise (≤6F) | 4.50–5.00% | Smaller lot size, broader investor pool |
| Prime City Grade A, mid-rise (7–14F) | 4.25–4.75% | Institutional grade, tight availability |
| Prime City, tower (15F+, speculative) | 4.75–5.25% | Planning risk premium + longer void |
| **Reference case (Option B, 60m)** | **4.50%** | Central assumption |

---

### 11.3 Construction Costs — City of London (2025, BCIS basis)

**Per sqm of GIA** — not NIA. The correct cost basis for development appraisal.

| Building type | Cost range (£/sqm GIA) | Central (£/sqm GIA) |
|---|---|---|
| Low-rise commercial (≤6F, Option A basis) | £3,800–4,500 | **£4,100** |
| Mid-rise commercial (7–14F, Option B basis) | £4,500–5,500 | **£5,000** |
| Tower (15F+, Option C basis — core-intensive) | £5,500–7,000 | **£6,250** |

**Key cost drivers as height increases:**
- Core becomes proportionally larger and more complex (structural, MEP)
- Curtain wall area per sqm GIA increases (more perimeter per floor in slender tower)
- Transfer structure at podium crown (Option B/C)
- Sky lobby fit-out, additional evacuation lifts (BSA requirement >18m)
- Extended programme → higher preliminaries, supervision, finance
- BCIS TPI inflation: ~+4–6% pa projected 2025–26

**Demolition + enabling (this site):** £1.5–2.5M (existing 6F office, Leadenhall St)
**Professional fees:** 12–15% of construction cost (design, PM, legal, statutory)
**CIL (City of London Eastern Cluster, office, 2024/25):** £200/sqm NIA
**S106 (estimated, negotiated):** £500K–£2M depending on planning obligation scope

---

### 11.4 Finance Assumptions (2025)

| Item | Rate / Basis |
|---|---|
| Senior debt rate | SONIA (~5%) + 250–300bps spread ≈ **7.5–8.0% pa** |
| Loan-to-cost | 55–65% of Total Development Cost |
| Finance calc | 60% of TDC × rate × (construction programme / 2) |
| Dividing by 2 approximates progressive drawdown on an S-curve |
| Arrangement fee | 1.0–1.5% of facility |

---

### 11.5 Development Programme

| Option | Planning | Construction | Let-up | **Total** |
|---|---|---|---|---|
| A — 10F / 42m | 12–18 months | 24–30 months | 6–9 months | **42–57 months** |
| B — 14F / 60m | 18–24 months (EIA, pre-app) | 30–36 months | 9–12 months | **57–72 months** |
| C — 22F / 92m | 24–36 months (GLA referral, LVMF, wind) | 36–48 months | 12–18 months | **72–102 months** |

Finance period = construction + let-up phase (planning typically funded separately / land cost).

---

### 11.6 Profit Target — Speculative City Office

| Risk level | Profit on cost target | Rationale |
|---|---|---|
| Low (Option A, consented-height-zone) | 15–18% | Planning certainty, shorter programme |
| Medium (Option B, EIA required) | 18–22% | LVMF study, wind, longer programme |
| High (Option C, GLA referral) | 22–28% | Exceptional planning risk, 6–8 year total programme |

---

### 11.7 Existing Use Value (EUV) — 100 Leadenhall baseline

For development viability, RLV must exceed EUV.

| Assumption | Value |
|---|---|
| Existing NIA (6F, ~80% efficiency) | ~4,700 sqm |
| Current passing rent (Grade B, older stock) | ~£450/sqm pa |
| Gross ERV existing | ~£2.1M pa |
| Capitalised at 5.5% (secondary City) | **~£38M EUV** |

Development is viable if RLV > £38M. Development uplift = RLV – EUV.

---

### 11.8 Correct Appraisal Structure (RICS Red Book / industry standard)

```
GDV  = Total NIA × Gross ERV (£/sqm pa) / NIY
     - Less: letting incentives (rent free) discounted at NIY
     - Less: agent fees (15% of first year rent)
     = Adjusted GDV

TDC  = Construction (GIA × cost/sqm GIA)
     + Demolition + enabling
     + Professional fees (12–15% of construction)
     + CIL (NIA × £200/sqm)
     + S106 (negotiated lump sum)
     + Finance (60% of TDC × rate × programme/2)
     + Contingency (5–10% of construction)

Profit target = TDC × profit-on-cost % (see 11.6)

RLV  = Adjusted GDV – TDC – Profit target
Uplift = RLV – EUV

Viable if: RLV > EUV
```

---

### 11.9 Scenario Presentation (Architectural Role)

**We do NOT determine the inputs — that is the developer and their agent's job.**

Our role is to:
1. Show we understand the structure of the appraisal
2. Describe the scenarios that each massing option creates
3. Flag the key sensitivities (rent, yield, construction cost) that make or break each option
4. Present ranges, not point estimates — honest about uncertainty

**Narrative framing per option:**

- **Option A**: "Lowest construction cost/sqm, lowest planning risk, shortest programme. Viable at current market rents without premium assumptions. Most immediately actionable."
- **Option B**: "Moderate uplift over existing. Requires City Core ERV (£700/sqm) and 4.5% yield to achieve 18–20% profit on cost. Sky terrace creates a premium floor identity. LVMF assessment a key risk."
- **Option C**: "Highest GDV potential but significant cost and programme risk. Construction cost premium (£6,250/sqm) and extended programme (6–8 years total) require premium rents (£750+/sqm upper floors) and a risk-adjusted yield. Requires exceptional design quality to justify to planners and investors."

---

