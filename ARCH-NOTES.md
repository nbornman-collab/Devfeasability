# Architectural Design Notes
## For DevFeasibility floor plan logic

---

## Core Ratios (from Nic, 2026-03-13)

| Use | Core % of GIA |
|---|---|
| Commercial office | 20–25% |
| Residential | ~30% |

**Core includes:** lifts, stairs, toilets, risers, plant, lobbies

---

## Core Position Logic

| Building type | Core position | Why |
|---|---|---|
| Skinny / linear (depth <15m) | Side core | Maximise lease depth on primary elevation; central core would kill NIA |
| Rational / deep (depth >15m) | Central core | Efficient dual-aspect, even lease spans all round |
| Tower (slender) | Central core | Structural efficiency; equal lease spans on all four elevations |
| Tower (rectangular/blade) | Side or end core | Maximise single-direction views |

---

## Lease Span (Commercial vs Resi)

**Commercial office:**
- Typical lease depth: 12–18m (BCO standard)
- 15m is the sweet spot — allows 7.5m from core face to window (daylight rule)
- Deep plates (18m+) require atria or lightwells
- Open-plan preferred — no cellular subdivision
- BCO recommended occupancy: 1 person per 8–10 sqm NIA (dense) → 12–15 sqm (standard)

**Residential:**
- Much shallower lease span: 8–12m typical
- Every room needs daylight — no deep plan
- Dual aspect preferred for ventilation and outlook
- Single-aspect acceptable in dense urban, but not ideal

---

## NIA Efficiency Benchmarks

| Grade | NIA/GIA | Notes |
|---|---|---|
| Grade A commercial | 80–85% | BCO 2019 target |
| Residential | 70–80% | Depends on unit mix |
| Mixed-use | 75–80% | |

---

## Floor-to-Floor Heights (FTF)

| Use | FTF | Notes |
|---|---|---|
| Commercial Grade A | 4.0–4.5m | BCO: 2.7m clear ceiling + raised floor + services |
| Residential | 3.0–3.2m | |
| Ground retail/lobby | 5.0–6.0m | Generous entrance proportion |
| Plant floors | 4.5–6.0m | MEP routing |

---

## Building Safety Act (2022) — Thresholds

| Height | Requirement |
|---|---|
| >18m OR >7 storeys | Higher Risk Building — BSA applies |
| <18m | Standard — Approved Doc B |
| >18m commercial | Dual staircase required |
| >18m residential | Dual staircase mandatory (post-Grenfell) |

---

## Commercial Tower Typology (City of London)

**Podium + tower model (standard):**
- Podium: matches street wall height (typically 20–30m / 5–7F)
- Tower: steps back 3–6m from podium face
- Podium floor plates: large (full site), ~1,000–2,000 sqm NIA
- Tower floor plates: smaller, ~500–800 sqm NIA (slender towers 400–600)

**Single-aspect vs dual-aspect:**
- City towers: dual-aspect preferred (all-round views premium)
- Slender towers (<30m wide): can achieve quad-aspect

---

## Floor Plan Layout Principles

1. **Core first** — position relative to building geometry
2. **Lease span** — measure from core face to external wall (commercial 7.5–9m ideal)
3. **Structural grid** — 9m typical for commercial; 7.5m possible; 6m for resi
4. **WC provision** — 1 WC per ~10 persons (CIBSE Guide G)
5. **Escape routes** — max 45m travel distance (ADB Vol.2)
6. **Lifts** — 1 lift per ~70–100 persons for commercial; BCO recommends 30-sec wait time

---

## Key Reference: BCO Guide to Specification 2019
Primary UK benchmark for Grade A commercial office design.
- Raised access floor: 150mm typical
- Suspended ceiling: 100–125mm
- Clear height: minimum 2,700mm (2,500mm acceptable with BMS justification)
- Structural grid: 9m preferred, 9×9m or 9×12m
- Loading: 3.5 kN/sqm general office, 7.5 kN/sqm on 10% of area

---

## TODO: Apply to DevFeasibility
- [ ] Core ratio: set core = 22% of GIA for commercial, 28% for resi
- [ ] Core position: check aspect ratio → side vs central
- [ ] Lease span annotation on floor plan SVG
- [ ] Structural grid overlay (9m) on plan
- [ ] FTF: use 4.2m commercial, 3.1m resi (already implemented)
- [ ] NIA efficiency: 82% commercial (already close to BCO), 75% resi when added
