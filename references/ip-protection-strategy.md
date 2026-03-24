# IP Protection Strategy - D/A

## The Question
"Once this person is hired, how do I protect the product from being copied?"

## Short Answer
Three layers: legal (contracts), technical (architecture), and practical (information asymmetry). No single layer is enough. Together they make copying painful enough that it's not worth it.

---

## Layer 1 - Legal (contracts before access)

### NDA (Non-Disclosure Agreement)
- Sign BEFORE any repo access, any codebase viewing, any briefing doc
- Cover: scoring methodology, intelligence weights, site data, financial models, client data
- Duration: 2 years post-engagement minimum
- Jurisdiction: England and Wales
- Include: injunctive relief clause (you can get a court order to stop them, not just claim damages later)

### IP Assignment
- All work product created during engagement belongs to D/A (not the contractor)
- Explicitly includes: code, algorithms, data models, visual designs, documentation
- "Work for hire" clause - they have no residual rights
- Moral rights waiver (UK CDPA 1988 s.77-89) - prevents them claiming authorship credit

### Non-Compete (limited)
- UK courts are hostile to broad non-competes, so keep it narrow:
- "Will not build or contribute to a competing London development feasibility platform for 12 months"
- Geographic scope: London. Product scope: development intelligence scoring + massing.
- Broader than this and a court won't enforce it.

### Restrictive covenants
- Non-solicitation of clients/contacts for 12 months
- Non-poaching of other D/A contractors/staff for 12 months

---

## Layer 2 - Technical (architecture that limits exposure)

### What they see vs what they don't

**CesiumJS contractor sees:**
- The 3D rendering layer (cesium-demo.html)
- Building polygon data (OS NGD footprints)
- Massing geometry (site polygon + floor count + height)

**CesiumJS contractor does NOT see:**
- Scoring algorithm or weights (site-intelligence.js)
- Intelligence synthesis engine (synthesisDevScope, synthesisPlanning, synthesisArchitecture)
- Financial model (ERV, NIY, GDV calculations)
- Planning appetite methodology
- Heritage classification logic
- Site data JSONs with scoring fields

### How to enforce this
- Separate repo or branch with ONLY the files they need
- Or: `.gitignore`-style access control - give them a fork with intelligence files stripped
- API-only interface: they consume building data via `/api/os-buildings`, never see the scoring layer
- Code review every PR before merge - nothing goes into main without your eyes

### Database rights (UK specific)
- UK has **sui generis database right** (Copyright and Rights in Databases Regulations 1997)
- If you've invested substantial effort in obtaining, verifying, or presenting site data, the database itself is protected
- This covers: your 155 verified sites, their scores, their intelligence files, the curated dataset
- Even if someone copies the code, they can't legally copy the database
- Duration: 15 years from completion, renews with substantial new investment

---

## Layer 3 - Practical (information asymmetry)

### What makes D/A hard to copy even with the code

1. **The scoring weights are calibrated judgment, not formula.** Available Sky x2.5, Heritage Shadow x1.5 - these came from architectural expertise applied to real sites. A developer could build the same formula but wouldn't know the multipliers that make it useful.

2. **155 verified sites with manual intelligence.** Each has hand-written synthesis, verified polygons, checked planning refs. That's months of work. Code doesn't replicate it.

3. **The architectural judgment layer.** synthesisArchitecture() references Part B/M/L/O, floor plate efficiency (22% core), lease span minimums. This isn't data - it's professional knowledge encoded. A web developer can't replicate the judgment even if they have the code.

4. **Continuous enrichment.** By the time someone copies v1, you're on v3 with more sites, better hooks, refined scoring. First-mover advantage in a curated dataset compounds.

---

## Recommended Sequence

1. **Before first meeting:** NDA signed (use a template, don't draft from scratch - costs £200-400 from a solicitor, or use Docusign/PandaDoc template)
2. **Before repo access:** IP assignment signed
3. **During engagement:** separate branch/fork with intelligence files stripped. API-only access to scoring data.
4. **On completion:** code review, merge to main, revoke repo access
5. **Post-engagement:** NDA + non-compete remain in force

---

## Cost to Set Up

- NDA template: £200-400 one-off (solicitor) or £0 (template service like Rocket Lawyer)
- IP assignment: usually bundled with NDA
- Separate repo/branch: 30 mins setup
- Solicitor review of both docs: £500-800

Total: under £1,000 for proper protection. Worth it.

---

## What This Doesn't Protect Against

- Someone building a competing product from scratch using public data (legal, can't prevent)
- A contractor who understands the concept and builds their own version with different code (hard to prove, NDA helps but isn't bulletproof)
- LandTech/Nimbus adding similar features (they have their own data, this is market competition)

The real moat isn't legal protection - it's the combination of architectural expertise, curated data, and continuous improvement that makes D/A worth paying for. The legal layer just prevents cheap copying.
