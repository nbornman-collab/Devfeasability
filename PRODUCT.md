# PRODUCT.md - D/A Product Direction
*Locked: 2026-03-22. Validated by virtual user panel (5 personas: dev manager, acquisitions analyst, planning consultant, architect, PropTech investor).*

---

## Product Model (LOCKED)

### The three layers

| Layer | Name | Access | Contains |
|-------|------|--------|----------|
| T0 | Discover | **Free** | Borough screener, ranked sites, site cards with hooks |
| T1 | Site Report | **Single payment** | Full intelligence + massing + financial model |
| T2 | ~~Full Insight~~ | **Absorbed into T1** | No longer a separate page/product |

T2 as a standalone URL is deprecated. It stays live as a reference during transition only. All T2 content (3D massing, scenario sliders, pro forma, IRR) moves into T1's right panel.

---

## Pay Gate Structure (LOCKED)

**One gate only.** T0 is always free. Paying once unlocks the full site report (T1+T2 merged).

Double-gating (T1 paid + T2 paid separately) is permanently off the table. Panel was unanimous.

---

## T0 - The Hook Layer

**Goal:** create desire, not satisfy it. Show enough to make the user click through. Not enough to answer their question.

### What T0 site cards show (free):
- Site address + postcode
- Development Score (number + verdict pill: No Go / Marginal / Live)
- 3 headline numbers: GDV range, Max Floors, Planning Appetite score
- One flag: OA badge if applicable, or Heritage flag if present
- Satellite thumbnail

### What T0 does NOT show (paid only):
- Planning analysis
- Heritage risk + strategy
- Architecture constraints
- Financial model / pro forma
- Massing scenarios

**The hook principle:** the T0 card shows data that creates a question. The T1 report answers it.

---

## T1 - The Single Paid Page

### Right panel structure (scroll order):

1. **Site Header** - address, chips, tags
2. **01 Development Scope** - max floors, GDV, ERV, NIA, return curve
3. **02 Planning Realm** - appetite score, OA, constraints, flags, precedents
4. **03 Architecture + Massing** - heritage tier, heights, Part B/M/L/O refs
5. **04 Massing + Financials** *(absorbs T2)* - 3D map inline, scenario tabs (Option 1/2/3), sliders, pro forma, IRR, RLV

### Left panel structure:
- Hero: score + verdict + metrics grid (6 metrics)
- 2D locator map (site boundary, existing + proposed massing)
- Factor bars (6 intelligence factors)

### Massing section note:
The 3D massing viewer in section 04 is inline, not full-screen. Panel persona (architect) confirmed: needs to sketch alongside it, not navigate away to see it.

---

## Build Sequence (LOCKED)

**Phase 1 - T0 enrichment** (fast, high ROI)
- Richer site cards on borough screeners
- Show score + verdict + 3 headline numbers + flags on card
- Do this before anything else

**Phase 2 - T1 visual rollout** (in progress)
- Apply new design (off-white/amber) to all 63 T1 pages
- Currently: pilot on 24SS + test page confirmed

**Phase 3 - T2 absorption into T1**
- Add section 04 (Massing + Financials) to T1 right panel
- 3D massing inline, scenario sliders, pro forma
- Do NOT launch until it is genuinely complete - half-baked massing on a paid page kills trust

---

## Navigation (LOCKED)

Top nav: **D/A logo | site address | Discover / Appraise**
- "Appraise" is the only paid nav destination
- No "Full Insight" tab once T2 is absorbed
- Discover stays free, always accessible

**T0 → T1 entry point:** CTA button on site card in Discover ("View Site Report")
**T1 → massing:** scroll or jump-to within the same page (no separate URL)

---

## Subscription vs One-Off (FUTURE)

- **One-off users (prospectors/adhoc):** pay per site report. T0 is the acquisition layer.
- **Subscription users:** custom nav, faster access, saved reports, portfolio view. Different product surface - do not conflate with one-off UX now.

Subscription tier is a future product strand. Do not design for it yet.

---

## Deferred Actions (do after user feedback round)

- [ ] T0 card enrichment - richer hooks
- [ ] T1 design rollout to all 63 pages (after pilot confirmed)
- [ ] T2 absorption into T1 (section 04)
- [ ] T2 left panel: hero banner + metrics above map (layout fix, matches T1 structure)
- [ ] Real user feedback session (5-10 people from dev manager / acquisitions / planning / architect profiles)

---

## Panel Record

*Virtual panel, 2026-03-22. Five personas consulted.*

- **Marcus T.** (Dev Manager): Model B unanimously preferred. T0 hooks matter. Score + verdict + headline numbers on card = enough to click.
- **Priya N.** (Acquisitions Analyst): Volume user. T0 must filter fast. Planning appetite + heritage flag + GDV range on card = go/no-go in 30 seconds. Sliders and pro forma must be on the same page as planning intel.
- **Dom H.** (Planning Consultant): T0 enrichment must create a question, not answer it. Show score + verdict + OA flag = enough. Full analysis = paid. Model B fixes the perceived value gap of Model A.
- **Yemi A.** (Architect): Needs intel + massing + financials on one page. 3D massing inline preferred. Print-ready working document value proposition.
- **Rachel V.** (PropTech Investor): Model B stronger product logic. Sequence: T0 enrichment first (fast), T1 merger second (slower). Do not launch merged T1 until genuinely complete.

---

## Milestones

### milestone/discover-v1 - 2026-03-22
*Tagged commit: `0eee727`*

First complete T0 Discovery page. London-first unified interface.

- Full-canvas 3D massing map (satellite-streets-v12, building extrusions)
- Glassmorphism right panel (50% width) floating over the map
- London Top 100 / Borough Top 30 / Address Search modes
- Site cards: spring bounce on select, spotlight fade on non-selected
- Grouped fillet card (rounded, lifted, amber border) when active
- Square satellite thumbnail + GDV + floors + NIA + planning score
- Narrative tension line + gated indicators + Unlock CTA
- Borough selector flies map to centroid
- FlyTo offset-corrected for panel width

Product direction locked same day:
- Single pay gate (T0 free, T1 = full paid product)
- T2 absorbed into T1 as section 04
- T0 hook = visual desire, not data satisfaction
