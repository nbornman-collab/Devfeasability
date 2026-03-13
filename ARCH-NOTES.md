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
| **Trading floor** | **12–20m+** | **24–40m+** | Deep open plan, column-free critical, raised floor essential |
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

**FLAG FOR NIC:** Are these of GIA or NIA? Assumed GIA. If NIA, the gross area impact is larger.

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

### Core Position Logic

| Building geometry | Core type | Rationale |
|---|---|---|
| Square / deep plate (depth >15m both ways) | **Central** | Efficient lift grouping, equal spans all round |
| Rectangular, depth ratio <1:2 | **Central or offset central** | Standard commercial podium |
| Skinny / linear (one dim <12m) | **Side core** | Central would kill lease depth |
| Blade / tower (very slender, one dim <10m) | **End core** | Maximise uninterrupted floor plate |
| Very large plate (>2,000 sqm) | **Dual core** | Single core = excessive travel distances |

**For DevFeasibility logic:**
- Compute plate aspect ratio (width:depth)
- If <1:1.5 → central core
- If 1:1.5–1:3 → offset or side core
- If >1:3 → end core
- If plate >2,000 sqm → dual core (flag)

### Core Orientation
- Rotate long axis of core to face **primary elevation** (street / landmark / view)
- This maximises lease depth on the prime face and positions stairs on secondary facades
- **FLAG FOR NIC:** Is this always the rule, or does structural efficiency sometimes override?

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

**FLAG FOR NIC:** Does 3rd staircase have a specific ADB table reference, or is this a judgement call based on coverage geometry?

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
- **FLAG FOR NIC:** Any simpler approaches (e.g., natural ventilation via rooflights) that still comply?

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
