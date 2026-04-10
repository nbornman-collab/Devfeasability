# Headroom - Site Qualification Data Sources

## Purpose

This is the running list for improving **site legitimacy / fake-site suppression** in Headroom.

The problem is not just geometry. The app still sometimes treats plazas, station land, churchyards, forecourts, residual strips, and other non-standalone parcels as if they are real development sites.

This file tracks:
- what we already use
- what each source actually does
- what it does **not** do
- what free datasets we can add
- what paid datasets are worth considering later

---

## Current stack - what we already have

### 1. HMLR / title polygon logic
**Use now:** partial / indirect

**What it helps with**
- title polygon / parcel geometry
- some ownership/title structure context
- rough parcel definition

**What it does not solve**
- whether the parcel is actually a standalone development site
- public realm vs operational land vs plaza vs churchyard
- whether title geometry is fragmented, weird, or misleading

**Current issue**
A title polygon can still be a terrible proxy for a developable site.

---

### 2. OSM / Overpass building footprint fallback
**Use now:** yes

**What it helps with**
- better footprint shape than a rough bbox
- some building-level geometry
- existing height / levels sometimes available

**What it does not solve**
- site legitimacy
- ownership
- whether a plaza / forecourt / leftover space is a site
- whether the selected footprint is the right building in a dense urban condition

**Current issue**
Useful for geometry. Weak for qualification.

---

### 3. GLA Planning DataMap
**Use now:** yes

**What it helps with**
- Opportunity Area
- CAZ
- conservation area
- site allocations
- listed context and planning designations

**What it does not solve**
- whether land is public realm / station land / open space / forecourt
- whether parcel is operational land
- whether a named location is actually a standalone site

**Current issue**
Strong planning context. Weak site-legitimacy filter.

---

### 4. NHLE / listed context
**Use now:** yes

**What it helps with**
- heritage risk
- listed context
- conservation implications

**What it does not solve**
- whether something is a site at all

---

### 5. EPC / external area truth
**Use now:** partly / targeted

**What it helps with**
- NIA / GIA truth
- better floorspace baseline than simplified 3D

**What it does not solve**
- site legitimacy
- public realm suppression

---

## What the current stack is missing

We are still missing a proper **site qualification layer** that can answer:

1. Is this a real standalone site?
2. Is this public realm / civic space / open space / forecourt / churchyard?
3. Is this operational transport land or station land?
4. Is this just a weird title polygon, strip, or linked residual parcel?
5. Is this something that should be suppressed or kicked to manual review before 3D massing is shown?

---

## Free targets we can use now

### A. TfL GIS Open Data
**Cost:** free

**Potential value**
- station footprints / transport operational context
- rail / transport land suppression
- helps stop station-adjacent nonsense from being treated as sites

**Adds beyond physical filtering**
- infrastructure legitimacy check
- operational land exclusion
- stronger intelligence around delivery complexity / ownership reality

**Priority:** HIGH

---

### B. London Datastore - Designated Open Space / related layers
**Cost:** free

**Potential value**
- protected open space
- public open land context
- obvious non-site suppression

**Adds beyond physical filtering**
- policy-backed exclusion logic
- prevents public realm / open space being framed as opportunity
- improves trust, especially in dense central London

**Priority:** HIGH

---

### C. City of London open data / local GIS layers
**Cost:** free

**Potential value**
- local civic/public realm/open space layers
- potentially better City-specific suppression of plazas, churchyards, and odd land fragments

**Adds beyond physical filtering**
- more accurate local interpretation in the exact borough where weird false positives are surfacing

**Priority:** HIGH for City-specific cleanup

---

### D. Borough open space / civic land datasets
**Cost:** free

**Potential value**
- borough-specific parks / civic space / open space
- local suppression layer

**Adds beyond physical filtering**
- more local planning/policy-aware qualification

**Priority:** MEDIUM

---

### E. GiGL / POPS / open space availability
**Cost:** mixed

**Potential value**
- privately owned public space
- public-realm-like places that are not ordinary development sites

**Adds beyond physical filtering**
- strongest route to catching spaces that are not technically roads or parks but still not real development parcels

**Priority:** MEDIUM-HIGH if accessible cleanly

---

## Paid targets to consider later

### 1. OS NGD / Ordnance Survey data
**Cost:** likely licence / usage based, not simple cheap SaaS

**What it adds**
- stronger physical truth
- better land / building / topographic context
- more authoritative geometry and parcel context than OSM

**What it still does not solve alone**
- whether land is commercially/developmentally legitimate

**Value to intelligence**
- improves physical truth
- improves confidence in geometry
- helps stop bad footprint / bad parcel interpretation

**Priority:** HIGH if budget allows

---

### 2. LandTech / LandInsight
**Public pricing seen:**
- Starter: ~£60/mo
- Pro: ~£180/mo
- Unlimited: sales

**What it adds**
- ownership context
- parcel / planning intelligence
- strategic land context
- better site assembly / site reality understanding

**Value to intelligence**
- improves actual “is this a real site?” logic
- better owner / land / planning context
- not just suppression, but stronger opportunity intelligence

**Priority:** HIGHER leverage than pure geometry spend

---

### 3. SearchLand / Nimbus / similar
**Cost:** likely sales / enterprise-ish

**What it adds**
- planning-led site identification
- title / planning / opportunity intelligence
- site-sourcing logic closer to commercial use

**Value to intelligence**
- biggest improvement to site qualification logic
- expensive and probably overkill until Headroom is further proven

**Priority:** later-stage

---

## Recommended integration order

### Immediate
1. TfL GIS Open Data
2. London Datastore designated open space
3. City of London local public realm/open space layer

### Next
4. GiGL / POPS if accessible
5. borough-level open space / civic land layers

### Paid later
6. LandTech Pro
7. OS NGD
8. SearchLand / Nimbus-style intelligence stack

---

## Product view

### Free stack gives us
- better fake-site suppression
- better public realm suppression
- better transport-land suppression
- stronger trust in what *not* to mass

### Paid stack gives us
- better ownership truth
- better parcel/site legitimacy
- better planning/opportunity intelligence
- stronger confidence in what *is* a real site

---

## Working principle

**Not every polygon is a site.**

The qualification engine should move toward this sequence:
1. is it a real standalone site?
2. is it protected / public / operational / residual land?
3. if uncertain, suppress or send to manual review
4. only then rank and mass it

---

## Current tactical move

Already live:
- fake-site suppression heuristics for obvious plazas / churchyards / forecourts / strips

Next likely move:
- add free transport/open-space/public-realm datasets as proper suppression layers
