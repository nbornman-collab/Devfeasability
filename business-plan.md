# DevFeasibility — Business Plan
## D/A Studio · Development / Architecture · London, 2026

---

# Executive Summary

## The Opportunity

London's development market operates on incomplete, fragmented information.

- 60,000+ planning applications annually in London alone
- SME developers spend £2,000–5,000 per site on early-stage consultant fees before committing
- No single tool combines planning constraints, massing, and financial viability in one place

**DevFeasibility closes that gap.**

---

# The Problem

## How Sites Get Evaluated Today

- Planning consultant: £2,000–5,000 per site appraisal
- Zoning data: manually pulled from local authority portals
- Financial viability: separate Argus models built from scratch
- Massing: architect engagement before any deal is confirmed

**Result: most sites never get properly evaluated. Deals get missed.**

---

# The Solution

## DevFeasibility — A Deal Origination Engine

Enter any London address. Get back in 60 seconds:

- Full planning constraints and zoning analysis
- 3D massing envelope with GFA calculations
- Development financial pro forma (GDV, TDC, profit, IRR)
- Permitted Development rights check
- Seller motivation indicators

**Built by architects. Designed for developers.**

---

# Product

## Tier Architecture

**T1 Scout** — Free
- Borough-level screener
- Planning constraint overview
- Lead acquisition layer

**T2 Appraise** — £299–499/mo
- Full massing + zoning analysis
- Development pro forma
- Core professional product

**T3 Present** — £499/mo+
- Polished client-ready report output
- White-label options
- For consultants, agents, development teams

**T4 Commission**
- Design pipeline from tool to studio engagement
- First-call advantage from site knowledge

---

# The PD Opportunity

## Residential Permitted Development Checker

A separate high-volume product for the residential market.

**What it does:**
- Article 4 direction check per address
- Conservation area and listed building flags
- Class A–C PD rights breakdown (extensions, lofts, outbuildings)
- Prior Approval vs Permitted guidance
- CIL liability indicator

**Target customers:**
- Homeowners planning extensions
- Small builders and contractors
- Residential architects doing early-stage client advice
- Planning consultants doing PD advisory work

**Pricing:**
- £99 per report (one-off)
- £49/month professional subscription (unlimited checks)

---

# Market Size

## Addressable Market — UK

**B2B Professional Market (T2/T3)**
- Active SME developers, land agents, planning consultants
- UK total addressable: ~8,000–12,000 potential seats
- London primary: ~3,000–5,000
- Realistic 3-year capture: 300–800 subscribers
- At £399/mo average: **£1.4–3.8M ARR**

**Residential PD Market**
- ~200,000 planning applications per year in England (majority residential)
- Small builders, homeowners, resi architects: TAM in the millions
- Professional sub market: 10,000–50,000 potential subscribers
- At £49/mo: **£6M–29M ARR at scale**

**Combined ceiling (5-year, multi-city):** £5–15M ARR

---

# Business Model

## Revenue Streams

**Primary — SaaS Subscriptions**
- T2 Appraise: £299–499/mo per seat
- T3 Present: add-on or bundled
- PD Checker Pro: £49/mo

**Secondary — Per-Report**
- PD Checker one-off: £99/report
- High-volume one-off use cases

**Tertiary — API & White-Label**
- PropTech platforms, estate agents, mortgage tools
- £500–2,000/mo per integration

**Ancillary — Data & Intelligence**
- Borough-level development intelligence reports
- Sold to councils, housing associations, institutional investors
- £2,000–5,000 per report

**Pipeline — Design Commissions (T4)**
- Transparent opt-in pathway to D/A Studio design services
- Tool knowledge creates first-call advantage
- One commission: £50,000–150,000 fee income

---

# Revenue Projections

## 3-Year Model

**Year 1 — Prove the model**
- Target: 25–50 paying subscribers (T2/T3)
- Revenue: £90,000–240,000
- Focus: London B2B, product-market fit, 0 to £5k MRR

**Year 2 — Build the engine**
- Target: 150–300 subscribers + PD Checker launch
- Revenue: £500,000–1,200,000
- First hire (commercial/product), Manchester expansion

**Year 3 — Scale**
- Target: 400–800 B2B subscribers + PD at volume
- Revenue: £1,500,000–3,500,000
- 3–4 UK cities, API licensing, white-label revenue active

---

# Go-To-Market

## How We Acquire Customers

**Content-Led Growth (Primary)**
- "The 50 most underbuilt sites in London" — flagship piece
- Borough-level development intelligence posts
- LinkedIn as primary distribution channel
- SEO: "PD rights checker", "development feasibility London", "can I build an extension"

**Professional Network (Secondary)**
- Architecture and planning community relationships
- SOM network: institutional credibility
- Early adopter developer case studies with named references

**Partnership & Distribution (Year 2+)**
- Estate agency groups (Savills, Knight Frank, JLL)
- Planning portal integrations
- Mortgage and finance platform API deals

**Why content works here:**
Property professionals in London are active on LinkedIn. One post about underbuilt sites in Hackney gets shared by the people we're selling to.

---

# Competitive Landscape

## How We Compare

**Nimbus Maps** — land intelligence, strong aerial data, no massing or pro forma
**Aprao** — development appraisal only, no planning constraints or massing
**LandInsight / Kamma** — ownership data focus, no architectural layer
**Glenigan / Barbour ABI** — planning data aggregation, enterprise pricing, no financial model
**Local authority tools** — constraint data only, no commercial output

**Our differentiation:**
- Only tool that combines constraints + massing + financial viability in one output
- Architectural quality of output — options feel designed, not computed
- Founder credibility: SOM Senior Design Architect (15+ years)
- Tool-to-commission pipeline is unique — no competitor has this model

---

# Technology

## Stack and Data

**Infrastructure**
- Node.js application, Railway deployment
- Mapbox for spatial visualisation
- Horizontally scalable, ~95% gross margin at current scale

**Data Sources (all free/open)**
- Planning constraints: OSM, PlanIt API, EA WFS
- Building data: OS NGD, OSM Overpass
- EPC ratings: Open Data Communities API
- Transport: TfL StopPoint API
- Ownership: Land Registry (HMLR)
- Conservation areas, flood zones, listed buildings: open government data

**Moat:**
- Planning rules engine is proprietary (coded per LPA and use class)
- Data integration layer took months to build and validate
- Each new city module = significant barrier to replication

---

# The Team

## Founder

**Nicolaas Bornman — Founder & Director**

- Senior Design Architect, Skidmore Owings & Merrill (SOM), London
- 15+ years across major commercial and residential projects
- Deep expertise in London planning policy, massing, and development economics
- Track record of delivery at institutional scale

**What the founding team brings:**
- Planning system expertise: validates data quality that competitors can't match
- Design credibility: architectural layer is the product differentiator
- Industry network: direct access to the professional users we're selling to
- Technical co-founder or commercial hire: Year 1 priority

---

# Roadmap

## 2026–2028

**Q1–Q2 2026 — Foundation**
- Launch T2/T3 with paywall
- 5 paying customers, prove CAC
- Disclaimer framework, ToS, data accuracy audit

**Q3–Q4 2026 — Traction**
- 25–50 subscribers
- PD Checker MVP launch
- First commercial hire
- Manchester data layer

**2027 — Scale**
- 150–300 subscribers
- PD Checker at volume (SEO active)
- API licensing first deals
- Birmingham expansion
- Seed raise consideration (£500k–£1.5m)

**2028 — Growth**
- 400–800 subscribers
- 3–4 UK cities live
- White-label and data report revenue material
- Series A or acquisition conversation

---

# Risk & Mitigation

## Key Risks

**Data accuracy** → Prominent disclaimers on all outputs; regular data validation sprints; professional users understand tool is preliminary assessment

**Market cycle** → Churn risk in down market; annual pricing encourages commitment; PD Checker is counter-cyclical (homeowners extend when they can't afford to move)

**Competition** → Nimbus or Aprao could build toward this space; architectural layer and commission pipeline are hard to replicate; speed of execution matters

**Founder-led sales** → Commercial hire is Year 1 priority; content-led model reduces dependency on direct sales; product quality drives word of mouth

**Regulatory change** → Planning policy changes affect data layer; built-in update cycle; each LPA update is a moat-building event for us, not a threat

---

# The Ask

## What We're Building Toward

**Immediate (bootstrapped):**
- 25 paying customers → operational independence from SOM
- £5,000 MRR → proof of concept

**Year 2 seed raise (£500k–£1.5m):**
- Commercial / product hire
- Multi-city expansion
- PD Checker marketing spend
- Gives: 300+ subscribers, £1M+ ARR run rate

**Exit scenarios:**
- Trade sale to PropTech platform (Rightmove, CoStar, Zoopla): £5–15M
- VC-backed growth to £5M+ ARR: £25–50M exit
- Design studio + SaaS portfolio: long-term independent operating company

---

# Summary

## Why This Works

- **Real problem:** developers waste thousands on sites that don't stack up
- **Real product:** built, live, and generating interest today
- **Real moat:** architectural expertise + planning rules engine + commission pipeline
- **Real market:** London alone is a multi-million ARR opportunity; UK + international is transformational
- **Right founder:** only someone with SOM-level credentials can build the trusted layer between planning policy and development economics

**DevFeasibility is not a data aggregator. It is the first tool that makes the first meeting with a developer feel like the third meeting.**

---

# Organisational Model

## The AI Director Structure

DevFeasibility and D/A Studio operate on a three-layer model that maximises leverage while preserving professional accountability:

```
Nic Bornman  ←  Creative direction + professional sign-off
     ↓
Ace (AI Director)  ←  Orchestration, context, coordination
     ↓
Specialist agents  ←  Compute, research, generation, analysis
```

**Layer 1 — Human principal:** Nic carries the design vision and professional liability. Whatever the system produces, a qualified architect reviews and signs off before it reaches a client. This is non-negotiable and is a feature, not a constraint.

**Layer 2 — AI director:** Persistent context, project memory, and coordination. Knows the decisions made, the constraints in play, and which specialist to route each task to. Not replaceable by a generic model — value accrues through accumulated context.

**Layer 3 — Engine room agents:** Interchangeable specialists. A Grasshopper compute agent that takes parameters and returns geometry. A planning policy agent that scrapes LPA documents and flags constraints. A valuation agent that runs GDV models against comparable sales. Best tool for the job, swapped out as better ones emerge.

## Why This Matters Commercially

This is not "AI replaces architects." It is:

> **Senior architect + AI director delivers faster, cheaper, with the same professional accountability.**

That framing survives a planning inquiry. It survives a funding conversation. It survives the question every risk-averse developer or planning committee will ask: *"But who is responsible?"*

Answer: the same person who was always responsible — the qualified professional at the top. The AI accelerates the work; the human owns the output.

## The Scaling Trajectory

- **Year 1:** Ace as orchestrator, Nic as sole principal. Tool handles T1–T3 automatically.
- **Year 2:** First specialist agents added (parametric massing, planning policy scraping). T4 commission pipeline grows.
- **Year 3+:** Agent team expands. D/A Studio operates as a studio at a fraction of traditional overhead, with output velocity that no conventional practice can match.

---

# Appendix

## Contact & Links

**D/A Studio**
Development / Architecture

- **App:** devfeasibility-production.up.railway.app
- **Studio:** DA Studio

*This document contains forward-looking projections based on market research and comparable company data. All financial figures are estimates.*
