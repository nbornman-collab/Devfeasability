// Development Intelligence - 1 Southwark Bridge Road, 1 Southwark Bridge Road, SE1 9HA
// Source: EPC (19389m² GIA, PLACEHOLDER), GLA DataMap
// HMLR title: PENDING verification
// Polygon: approximate from 7900m² plot area; replace with traced polygon
const SITE_INTELLIGENCE = {
  polygon: [[-0.094952, 51.507038], [-0.093868, 51.507038], [-0.093868, 51.507982], [-0.094952, 51.507982], [-0.094952, 51.507038]],
  site: '1 Southwark Bridge Road',
  borough: 'Southwark',
  use: 'office',
  address: '1 Southwark Bridge Road, SE1 9HA',
  plot_area_m2: 7900,
  existing_gea_m2: 19389,
  existing_floors: 7,
  existing_height_m: 28.0,
  ftf_m: 4.0,
  max_height_m: 64.0,
  max_floors: 16,
  hmlr_title: null,
  owner: null,
  epc_rating: 'unknown',
  factors: {
    sky: {
      label: 'Available Sky',
      score: 7.5, weight: 2.5,
      existing_m: 28.0,
      precedent_m: 96.0,
      insight: '7F office at 28m in the London Bridge/Bankside OA - major underutilisation of a large CAZ plot. Site is 44% of the height envelope for this corridor (London Bridge tower cluster at 69F/224m). Even a conservative 16F scheme represents a 2.3x increase in floor space.'
    },
    value: {
      label: 'Rent Headroom',
      score: 8.0, weight: 2.0,
      insight: 'Grade B Southwark CAZ office at £60-65/sqft. New-build Grade A at this address would achieve £75-85/sqft. 6-major-app history suggests active developer interest. Large plot (0.79ha) enables a genuine tower scheme - not just incremental uplift.'
    },
    momentum: {
      label: 'Planning Tailwind',
      score: 9.0, weight: 2.0,
      opportunity_area: { name: 'London Bridge/Bankside Opportunity Area', ref: 'London Plan 2021 Policy SD1' },
      precedents: [{"name": "Bankside 123 (Stanhope/British Land)", "ref": "Southwark ref 12/AP/1482", "desc": "10F office, SE1 CAZ. Approved 2013. Comparable office intensification on Southwark riverside corridor."}, {"name": "Courage Brewery Site", "ref": "Southwark ref 09/AP/1290", "desc": "Mixed-use 12F scheme, 100m east. Confirms LPA appetite for tall commercial intensification at Southwark Bridge approach."}],
      insight: 'London Bridge/Bankside OA + CAZ + 6 major apps = maximum planning momentum. This is the same policy envelope that enabled Southwark Needle (The Shard, 95F, 310m) 500m east. The LPA has consistently approved tall commercial schemes in this OA. Title Stack is the primary constraint.'
    },
    heritage: {
      label: 'Heritage Shadow',
      score: 7.0, weight: 1.5,
      insight: 'Some heritage sensitivity - Bankside Conservation Area is 500m east, Southwark Cathedral (Grade I) is 700m northeast. LVMF: no direct protected vista through site but proximity to London Bridge/Tower Bridge views means a 16F scheme will require LVMF views analysis. Heritage score reflects real but manageable constraint.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 5.0, weight: 1.5,
      titles: null,
      tenure: 'Unknown - HMLR verification required',
      owner: null,
      insight: 'Large office complex - 6 major apps suggests multiple ownership interests or complex leasehold structure. 19,389m² GEA building at £900-1,200/m² capital value = £17-23M existing asset. Institutional ownership likely. Corporate disposal would require board/trustee approval. Score penalised for complexity - HMLR verification critical.'
    },
    transport: {
      label: 'Station Gravity',
      score: 9.5, weight: 0.5,
      ptal: '6b',
      insight: 'Exceptional connectivity. London Bridge station (National Rail + Northern + Jubilee) 400m. Borough station (Northern) 300m. Waterloo (National Rail + multiple Tube) 750m. PTAL 6b - amongst the highest in London.'
    }
  }
};
