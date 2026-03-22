# PRODUCT.md - D/A Product Direction
*Locked: 2026-03-22. Last updated: 2026-03-22 (evening).*
*Validated by virtual user panel (5 personas: dev manager, acquisitions analyst, planning consultant, architect, PropTech investor).*

---

## What D/A Is

London's underutilised site intelligence platform. Not a site-finder (LandTech does that). Not a planning portal (PlanIt does that). D/A triangulates 200+ factors across **Development, Planning and Architecture** - scored, ranked, synthesised - and tells you whether a site stacks before you commit time or capital.

The moat: D does development massing and GDV. P does planning appetite, precedents, risk. A does heritage, constraints, building regs. Nobody else does all three together.

---

## Product Model (LOCKED)

| Layer | URL | Name | Access | Contains |
|-------|-----|------|--------|----------|
| Homepage | `/` | - | Free | Hero, D/P/A pillars, discovery modes |
| T0 | `/discover` | Discover | **Free** | 155 ranked London underutilised sites, intelligence hooks, teased scores |
| T1 | `/t1/:site` | Appraise | **Single payment** | Full intelligence + massing + financial model (merged) |
| T2 | `/t2/:site` | *(transitional)* | Redirecting into T1 | Deprecated as standalone - 24SS kept live for demo only |

**Borough screeners** (`/borough/*`) → 301 redirect to `/discover`. Dead as navigation.

---

## Pay Gate Structure (LOCKED)

**One gate only.** T0 is always free. Paying once unlocks the full site report (T1 + T2 merged content).

Double-gating is permanently off the table. Subscription tier is future - do not design for it now.

---

## Homepage (`/`)

Full-viewport dark London map (dark-v11, pitch 55, slow rotation).

**Visible on load (above fold):**
- D/P/A three glass pills: Development (Massing · GDV · NIA) / Planning (Appetite · Precedent · Risk) / Architecture (Heritage · Massing · Constraints)
- Hero text cycling: "Know every site. Before you [appoint / go to feasibility / go to planning / bid / build]" - settles on "bid." after 2 loops
- Live stats: sites / total GDV / boroughs / scored out of 100
- Primary CTA: Discover Sites → `/discover`

**Below fold (scroll):**
- Narrative: underutilised sites angle (car parks, low-rise industrial, single-storey in high-density)
- 4 discovery mode cards: London Top 100 / Borough Top 25 / Search by Address / Browse the Map
- Each deep-links to `/discover?mode=` with correct tab pre-selected

---

## T0 - Discover (`/discover`)

**Goal:** create desire, not satisfy it. Show enough to create a question. The report answers it.

### Current state (live)
- 155 verified London underutilised sites: Southwark (57) + City of London (24) + Hackney (39)
- Dark-v11 map, pitch 0 browse / pitch 52 site focus
- **Two-mode UX:** Browse (ranked list + map pins) → Site Focus (full panel transformation)
- Ranking: score desc → GDV desc → plotM2 desc → planScore desc → alphabetical (no tied ranks)
- Ribbon: Total GDV + Floor Area NIA (live sum from site data)

### Site Focus panel (what T0 shows - free)
- Square satellite thumbnail (180x180, Mapbox static)
- Score + verdict pill + address + borough chip
- 6 metrics: GDV / added floors / new NIA / planning score / plot area / heritage risk
- **Analyst hook:** 3-sentence site-specific paragraph (opportunity signal + constraint tension + unresolved question)
- **Teased factor bars:** 3 visible (Planning Appetite, Available Sky, Rent Headroom) + 3 locked (Heritage Shadow, Title Complexity, Transport Position) showing bar height but no score
- **Specific CTA:** "See why this scores X/100 → +XF · planning precedents · does it stack at current land value?"

### What T0 does NOT show (paid only)
- Planning analysis and precedents
- Heritage risk strategy
- Architecture constraints and Building Regs analysis
- Financial model / pro forma / IRR
- Massing scenarios and 3D model

---

## T1 - Appraise (single paid page)

### Right panel structure (scroll order)
1. **Site Header** - address, chips, tags
2. **01 Development Scope** - max floors, GDV, ERV, NIA, return curve
3. **02 Planning Realm** - appetite score, OA, constraints, flags, precedents
4. **03 Architecture + Massing** - heritage tier, heights, Part B/M/L/O refs
5. **04 Massing + Financials** *(absorbs T2)* - 3D map inline, scenario tabs, sliders, pro forma, IRR, RLV

### Left panel structure
- Hero: score + verdict + metrics grid (6 metrics)
- 2D/3D site map (boundary, existing + proposed massing)
- Factor bars (6 intelligence factors)

### Current rollout status
- 64 pages total in `/public/scout/`
- 24SS pilot rebuilt with new design (off-white/amber tokens, new layout)
- `/test/t1-redesign.html` = canonical review URL for all visual work
- Remaining 63 pages: old design, rollout pending Nic sign-off on test page
- Section 04 (Massing + Financials): not yet built

### Massing note
3D massing viewer in section 04 is inline, not full-screen. User sketches alongside it.

---

## Build Sequence (LOCKED)

**Phase 1 - T0 enrichment** ✅ DONE
- Intelligence hook (analyst paragraph per site)
- Teased factor bars (3 visible / 3 locked)
- Specific score-personalised CTA
- Homepage D/P/A pillars, cycling hero text, discovery mode cards

**Phase 2 - T1 visual rollout** - IN PROGRESS
- Test page confirmed: `/test/t1-redesign.html`
- Pilot page: `/t1/24-southwark-st`
- 63 pages remaining: surgical rollout, one file at a time, after Nic confirms test page

**Phase 3 - T2 absorption into T1**
- Add section 04 (Massing + Financials) to T1 right panel
- 3D massing inline, scenario sliders, pro forma
- Do NOT launch until genuinely complete - half-baked massing on a paid page kills trust

---

## Navigation (LOCKED)

**Homepage nav:** D/A logo | Discover | Appraise | Explore Sites CTA
**T0 Discover nav:** D/A logo | Discover (active) | Appraise
**T1 Appraise nav:** D/A logo | site address | Discover | Appraise (active)

- "Discover" always → `/discover`
- "Appraise" → `/t2/24-southwark-st` (demo) until T1 section 04 is live
- No "Full Insight" in nav anywhere
- PD Check not in D/A nav (separate product strand)

---

## Milestones

### milestone/discover-v1 - 2026-03-22
*Tagged commit: `0eee727`*

First complete T0 Discovery page. London-first unified interface.

### Homepage rebuild - 2026-03-22
*Commit: `5095f2c` onwards*

Full homepage rebuild from scratch. Dark rotating map, D/P/A pillars, cycling hero text, discovery mode cards with deep-links. Borough screeners redirected permanently.

### T0 intelligence hook - 2026-03-22
*Commit: `cf98610`*

Focus panel transformed from data display to conversion mechanic:
- Analyst hook generator (site-specific 3-sentence paragraph)
- Teased factor bars (3 visible / 3 locked)
- Score-personalised CTA

---

## Panel Record

*Virtual panel, 2026-03-22. Five personas consulted.*

- **Marcus T.** (Dev Manager): Single pay gate unanimously preferred. T0 hooks matter. Score + verdict + headline numbers on card = enough to click.
- **Priya N.** (Acquisitions Analyst): T0 must filter fast. Planning appetite + heritage flag + GDV range = go/no-go in 30 seconds. Sliders and pro forma on same page as planning intel.
- **Dom H.** (Planning Consultant): T0 must create a question, not answer it. Score + verdict + OA flag = enough. Full analysis = paid. Single gate fixes the perceived value gap.
- **Yemi A.** (Architect): Intel + massing + financials on one page. 3D massing inline preferred. Print-ready working document.
- **Rachel V.** (PropTech Investor): Sequence matters: T0 enrichment first (fast, high ROI), T1 merger second (slower). Do not launch merged T1 until genuinely complete.
