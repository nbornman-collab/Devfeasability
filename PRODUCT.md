# PRODUCT.md - D/A Product Direction
*Locked: 2026-03-22. Last updated: 2026-03-24 (evening).*
*Validated by virtual user panel (5 personas). T0/T1 information architecture locked 2026-03-24 with psychology framework.*

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

### Purpose (LOCKED - 🦞 2026-03-24)

T0 is the art of attraction. It does NOT withhold or tease - it demonstrates genuine intelligence depth. Every data point shown freely is chosen because it OPENS a question the user didn't have before. The report answers those questions.

**The psychology:**
- **Zeigarnik Effect**: unfinished questions stay open in the brain. Sentence 3 of the analyst hook is always an unresolved question. The user physically cannot forget it.
- **Information Gap Theory** (Loewenstein): curiosity is triggered by showing enough that the user realises there's MORE they don't know. T0 expands what you want to know - it doesn't contract what you can see.
- **Competence attraction**: 3 lines of D/P/A commentary prove the system understands the site. "They know their shit" is the most powerful B2B conversion signal. More powerful than any locked padlock.
- **Reciprocity**: give real value freely. The user feels the quality. Paying feels like a fair exchange, not a toll.

**The rule: T0 is generous with insight. But every insight opens a door you can only walk through in T1.**

### Three entry points (all lead to T0 site view)

1. **London Top 100 / Borough Top 25** - showmanship, ranked leaderboard. Mostly spectacle - and it should be.
2. **Enter a postcode** - direct search. User knows their site, wants intelligence on it.
3. **Click around the map** - browse/discover. Serendipitous exploration.

All three land at the same T0 site-level view within `/discover`.

### Current state (live)
- 155 verified London underutilised sites: Southwark (57) + City of London (24) + Hackney (39)
- Dark-v11 map, pitch 0 browse / pitch 52 site focus
- **Two-mode UX:** Browse (ranked list + map pins) → Site Focus (full panel transformation)
- Ranking: score desc → GDV desc → plotM2 desc → planScore desc → alphabetical (no tied ranks)
- Ribbon: Total GDV + Floor Area NIA (live sum from site data)

### T0 site view - what it shows and WHY

Every item creates a specific question answered in T1:

| T0 shows (free) | Question it creates (resolved in T1) |
|---|---|
| Score 84/100 + verdict badge | "Why 84? What drags it down? What lifts it?" |
| Est. GDV £45M | "Does the scheme actually stack? What's the profit margin? At what yield?" |
| Planning appetite 8.5/10 | "What precedents? Which specific approvals? What got refused nearby?" |
| Heritage: Navigable | "Navigable HOW? What's the strategy? What height does heritage cap?" |
| +4F additional floors | "What massing? Podium + tower? What efficiency? Single or dual staircase?" |
| 3 visible factor bars | "What about the 3 locked ones? Are they the ones that kill the deal?" |
| Analyst hook sentence 1 (opportunity) | Engagement: "this is real" |
| Analyst hook sentence 2 (constraint) | Doubt: "but there's a complication..." |
| Analyst hook sentence 3 (unresolved question) | The itch: an open loop the brain cannot close without the report |

### T0 site view - implementation

- Square satellite thumbnail (180x180, Mapbox static)
- Score + verdict pill + address + borough chip
- 6 headline metrics: GDV / added floors / new NIA / planning score / plot area / heritage tier
- **Analyst hook (3 sentences):** opportunity signal → constraint tension → unresolved question. Each sentence escalates desire. By sentence 3 the user has an open loop.
- **Teased factor bars:** 3 visible (Planning Appetite, Available Sky, Rent Headroom) with relative fill + 3 locked (Heritage Shadow, Title Complexity, Transport Position) showing bar hint but no score
- **Specific CTA:** "See why this scores X/100 → +XF · planning precedents · does it stack at current land value?"

### What T0 does NOT show (the line - LOCKED)

The line is not about quantity. It's about RESOLUTION. T0 raises questions. T1 resolves them.

**Never in T0:**
- Planning precedent references (AP/ numbers, specific approval details, committee decisions)
- Heritage strategy or mitigation approach ("navigable" yes, "here's how to navigate it" no)
- Architecture constraints analysis or Building Regs (Part B/M/L/O)
- Financial model, pro forma, IRR, RLV, profit on cost, scenario modelling
- Massing scenarios, 3D model, floor plate options
- Comparable evidence or specific data sources
- Anything that lets you ACT on the site (T0 lets you ASSESS, T1 lets you ACT)

**The test:** if a user can make a go/no-go decision AND know their next step from T0 alone, T0 is showing too much. T0 should create confident interest, not confident action.

---

## T1 - Appraise (single paid page)

### Purpose (LOCKED - 🦞 2026-03-24)

T1 is the feast. Every question T0 opened, T1 closes with evidence. The user doesn't feel tricked - they feel rewarded. The insight matches or exceeds what T0 promised.

**"Rocketship level insight"** - the page must be so good the user keeps coming back. Not just data - synthesised intelligence that saves them weeks of consultant time. Every section triangulates >= 2 data sources into a conclusion neither alone could produce.

### Right panel structure (scroll order)
1. **Site Header** - address, chips, tags
2. **01 Development Scope** - max floors, GDV, ERV, NIA, EPC (live from API), return curve, existing GIA + FAR
3. **02 Planning Realm** - appetite score, OA, constraints, flags, specific precedents (AP/ refs), planning history
4. **03 Architecture + Massing** - heritage tier + strategy, heights context, Part B/BSA, Part M2, Part L2, Part O
5. **04 Massing + Financials** *(absorbs T2)* - scenario tabs (Low/Base/High), assumption sliders, full pro forma, RLV, 3D massing inline

### Left panel structure
- Hero: score + verdict + metrics grid (6 metrics)
- 2D/3D site map (boundary, existing + proposed massing)
- Factor bars (all 6 intelligence factors, full scores)

### T1 resolves every T0 question

| T0 question | T1 resolution |
|---|---|
| "Why 84?" | Full factor breakdown with scores + methodology |
| "Does it stack?" | Pro forma: GDV - TDC = profit, IRR, RLV at target margin |
| "What precedents?" | Specific AP/ refs, approval details, committee decisions |
| "Heritage - how?" | Strategy section: views analysis, daylight, height cap reasoning |
| "What massing?" | 3 scenarios with floor plates, efficiency, staircase analysis |
| "Locked factors?" | All 6 bars visible with full scores and context |

### Massing note
3D massing viewer in section 04 is inline, not full-screen. User sketches alongside it.

---

## Build Sequence (LOCKED)

**Phase 1 - T0 enrichment** ✅ DONE
- Intelligence hook (analyst paragraph per site, 3 sentences with open loop)
- Teased factor bars (3 visible / 3 locked)
- Specific score-personalised CTA
- Homepage D/P/A pillars, cycling hero text, discovery mode cards
- Analyst hook enriched with real planning data (owner, refs, application counts) - commit `0db3f03`

**Phase 2 - T1 pilot + EPC** ✅ DONE (24SS)
- Pilot page: `/t1/24-southwark-st` rebuilt with new design tokens
- Section 04 (Massing + Financials) built inline - commit `04018ba`
- EPC rule engine: server-side address matching + dedup + aggregation - commit `f1b5d98`
- EPC wired to all 63 T1 pages with real postcodes - commit `3a701be`

**Phase 3 - T1 visual rollout** - NEXT
- Test page confirmed: `/test/t1-redesign.html`
- 63 pages remaining: HTML structure update (not just token swap)
- Surgical rollout after Nic confirms test page matches product rules

**Phase 4 - Pay gate infrastructure**
- Stripe / auth / token system
- T0 CTA → payment flow → T1 unlock
- Do NOT launch T1 publicly until gate is in place (currently open URLs)

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

---

## PD Checker - Separate Product Strand (LOCKED - 🦞 2026-03-24)

### Different product, different customer, different psychology

PD Checker is NOT a sub-feature of D/A. It is a parallel product strand with its own funnel, pricing, and customer psychology. It shares the D/A brand and technical infrastructure but targets a fundamentally different buyer.

### Two customers

**1. Mum and pop (consumer - primary volume)**
- About to spend £50-80k of life savings on an extension
- Don't speak planning language (GPDO, Prior Approval, Article 4 mean nothing)
- Terrified of getting it wrong, getting refused, or enforcement action
- Found you on Google at 10pm searching "can I extend my semi-detached house"
- Need certainty before they commit money
- Buy once, never return (one house, one extension)

**2. The pro (residential architect/builder - subscription)**
- Does 5+ extensions per month
- Already knows the rules - buying SPEED, not knowledge
- Answers a client question in 2 minutes instead of 2 hours
- Found you through industry word-of-mouth
- Repeat buyer, subscription candidate

### Psychology: anxiety reduction, not competence attraction

D/A sells to professionals through demonstrated competence (Zeigarnik, information gap).
PD sells to consumers through anxiety reduction and partial certainty.

The fear is the hook:
- "What if I spend £50k and it gets refused?"
- "What if the council serves enforcement?"
- "Dave the builder says it's fine - but is it?"

### PD desire chain (T0 equivalent)

1. **Type your address** - emotional connection: "they know MY house"
2. **PD Rights status** - "Available ✓" or "Restricted ⚠" (reduces or heightens anxiety)
3. **Massing envelope** - 3D shape showing maximum PD volume on THEIR house (creates vision)
4. **The catch** - "Specific rules for your house determine exactly how much" (information gap)
5. **Gate** - £149 for the full report

### PD 3-sentence hook (different from D/A)

1. **Certainty signal**: "Your PD rights are intact / restricted" (reduces anxiety)
2. **Vision**: the envelope showing what's possible (creates excitement)
3. **The gap**: "But there are specific rules for YOUR house" (the itch)

### What PD T0 shows freely
- PD rights status (available / restricted / removed)
- Article 4 flag (yes/no, which classes affected)
- Conservation area flag
- 3D massing envelope (the SHAPE of what's possible, not dimensions)
- One-line summary in plain English

### What PD T0 does NOT show (paid report)
- Exact dimensional limits per GPDO class
- Prior Approval requirements (neighbour consultation, conditions)
- Building Regulations cost implications (Part B, L, M, O in plain language)
- Wrap-around rules and phased build strategy
- What needs planning permission vs PD vs Prior Approval (the ladder)
- Cost estimates for each extension type
- Plain English: what you can build, what you need permission for, what it'll roughly cost

### PD pricing (LOCKED)

| Tier | Price | Buyer | What they get |
|---|---|---|---|
| **Free check** | £0 | Everyone | Address → PD status + Article 4 flag. One line. Funnel entry. |
| **Full report** | **£149** | Mum and pop | All GPDO classes, dimensions, PA requirements, Building Regs, cost estimates, plain English |
| **5-pack** | £120 each (£595) | Small practices | For architects/builders doing several extensions |
| **Pro monthly** | **£249/month** | Practices | Unlimited reports. For firms doing 5+ extensions/month |

£149 not £120: signals professional service, not discount product. 5-pack makes volume buyers feel smart.

### PD language rule

The report speaks mum's language, not planning language.
- Bad: "GPDO Schedule 2 Part 1 Class A permits a single-storey rear extension not exceeding 4m from the rear wall"
- Good: "You can extend the back of your house by up to 4 metres without planning permission. That's roughly enough for a kitchen-diner."

### Launch timing

PD launches AFTER D/A has 10+ paying customers (estimated Month 4-5 post-ILR).
Reason: different marketing (SEO/Google Ads vs relationships), different support burden (homeowners ask basic questions). Splitting focus before D/A is proven risks both.

Exception: the free PD check can go live earlier as a passive funnel builder and SEO play (3-6 months to rank on Google).

### PD to commission pipeline (future - T4)

PD report → homeowner needs drawings → "Need an architect? D/A Studio designs extensions."
The PD report is a lead generation tool for architectural commissions.
This is the T4 strand from the original product model. Do not build until PD has 100+ paid reports.
