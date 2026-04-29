# CesiumJS / 3D Contractor Brief

## Project
D/A — Development & Architecture Intelligence (London)
Live: https://web-production-9d1a0.up.railway.app

## Engagement

Two separate scopes. Can be one person or two. NDA + IP assignment required before any repository access.

---

## Scope A — Photorealistic 3D Context (CesiumJS)

### What exists
- Mapbox GL JS v3.4.0 maps across the product
- Custom fill-extrusion layers for proposed massing (commercial sites + residential extensions)
- Current context buildings: Mapbox Standard style (better than before, still OSM-derived boxes)

### What we want
Replace or augment context building rendering with **Google Photorealistic 3D Tiles** via CesiumJS:
- Real captured building geometry (pitched roofs, dormers, irregular shapes)
- LOD appropriate to zoom level
- Embedded in existing page layout (not full-screen takeover)

### Key pages
1. `/pd-demo` - residential PD checker (map currently at pitch 55, zoom 19)
2. `/t2/24-southwark-st` - commercial massing explorer (pitch varies)

### Technical constraints
- Must work within fixed-height panel layout (map is one side, panel is the other)
- Google Maps API key is available (server-side env var)
- The existing custom massing layers (OS NGD footprint extrusions) must still render on top
- Do NOT break existing Mapbox functionality on other pages

### Deliverable
- Working `/cesium-demo` page with Google 3D tiles rendering London at zoom 19, pitch 55
- Buildings rendering with correct roof shapes (test address: 70 Nithdale Road SE18 3PD)
- Documentation on how to integrate into existing Mapbox pages

### Reference
`public/cesium-demo.html` exists as a starting point. Ground elevation sampling was partially implemented.

---

## Scope B — Building Polygon Accuracy

### What exists
- OS NGD `bld-fts-buildingpart` API integration (server.js `/api/os-buildings`)
- Returns: footprint polygon, ridge height, eaves height, floor count estimate
- Roof pitch calculated from relative height difference + shortest edge span

### What we want
Improve building polygon quality and roof geometry:
- Better selection of the correct building part (main house body, not garage/extension)
- Roof pitch accuracy - current LIDAR-derived values can be 15-20° off
- Side return detection (is there a gap alongside the house, and which side?)
- Ideally: distinguish roof type (hip, gable, mansard) from footprint + height data

### Technical constraints
- Uses OS DataHub API (key available)
- Must work for any UK residential address, not just test addresses
- Response time target: under 3 seconds

### Deliverable
- Updated `/api/os-buildings` endpoint with improved building part selection and roof geometry
- Test results for 10 diverse UK addresses (different roof types, periods, densities)

---

## Access & IP

- NDA + IP assignment required before any repository access
- Scoring weights and commercial intelligence methodology NOT shared
- Residential PD logic (pd-engine.js) access on need-to-know basis only
- No sharing of site data, client data, or financial models

## Stack

- Node.js 22, Express (server.js)
- Mapbox GL JS v3.4.0
- CesiumJS 1.x (Scope A)
- Railway deployment (auto-deploy from GitHub `main`)
- GitHub: https://github.com/nbornman-collab/Devfeasability.git

## Contact

Nic Bornman — via D/A
