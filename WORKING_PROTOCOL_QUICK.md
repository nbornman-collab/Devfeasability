# WORKING_PROTOCOL — QUICK REF
Full protocol: `WORKING_PROTOCOL.md` (load only when needed for specific rules)

## Mandatory every task
- Reply starts with 🐐
- Read the target file section before touching it
- State the plan (what changes, what doesn't, risks) — wait for approval on significant changes
- No bulk scripts across multiple files (ever)
- Visual changes: test page `/test/t1-redesign` ONLY — no live page until Nic approves
- Verify with evidence after every commit (not just HTTP 200)

## Hard locked values — never change without explicit instruction
- `EXISTING_HEIGHT`: 24SS=24.8m, 196BR=13.7m
- `SITE_COORDS` polygon data in intelligence files
- Mapbox camera angles on any page
- Layer order: `ctx-3d` → `existing-cap` → `podium-3d` → floor lines → `podium-edge`
- `fill-extrusion-base` for podium-3d: always 0 / `ctx-3d` opacity: always 0.20

## Language / style
- No em dashes — use regular dash
- No inline font-size in JS/HTML — CSS classes only (type.css)
- No inline color/background — CSS vars/classes only
- No AI references on product surface

## Load full WORKING_PROTOCOL.md when you need
Heritage rules · scoring weights · data source architecture · floor-to-floor heights · NHLE verification · API dependency gate · contractor rules
