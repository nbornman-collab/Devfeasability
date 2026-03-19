// Development Intelligence - Copeland Industrial Park, Copeland Road, Peckham, SE15 3SN
// Source: EPC (3500m² GIA, PLACEHOLDER), GLA DataMap
// HMLR title: PENDING verification
// Polygon: OSM way 83516804 (verified), centroid=[-0.064591, 51.456215]
const SITE_INTELLIGENCE = {
  polygon: [[-0.064091, 51.455837], [-0.064506, 51.455741], [-0.06461, 51.455916], [-0.064719, 51.455891], [-0.065039, 51.45643], [-0.064781, 51.45649], [-0.064796, 51.456516], [-0.064656, 51.456548], [-0.064668, 51.456568], [-0.064543, 51.456597], [-0.064091, 51.455837]],
  site: 'Copeland Industrial Park',
  borough: 'Southwark',
  use: 'industrial',
  address: 'Copeland Road, Peckham, SE15 3SN',
  plot_area_m2: 11700,
  existing_gea_m2: 3500,
  existing_floors: 2,
  existing_height_m: 8.0,
  ftf_m: 4.0,
  max_height_m: 48.0,
  max_floors: 12,
  hmlr_title: null,
  owner: null,
  epc_rating: 'unknown',
  factors: {
    sky: {
      label: 'Available Sky',
      score: 8.5, weight: 2.5,
      existing_m: 8.0,
      precedent_m: 72.0,
      insight: 'Large 1.17ha industrial site sits at 2 storeys - highly underutilised. No tall buildings in the immediate Peckham catchment but the plot scale gives massing flexibility. Industrial conversion to residential (Approved Use Class C3) or mixed-use is the strongest value play.'
    },
    value: {
      label: 'Rent Headroom',
      score: 9.0, weight: 2.0,
      insight: 'Industrial EUV is the lowest land value class in London. Conversion to residential or commercial adds substantial GDV uplift. At £5,500-6,500/m² residential NSA in SE15, a 10-12F scheme would generate GDV of £35-50M against an industrial site that would sell for £4-6M as-is.'
    },
    momentum: {
      label: 'Planning Tailwind',
      score: 7.5, weight: 2.0,
      opportunity_area: { name: 'Not in OA', ref: 'n/a' },
      precedents: [{"name": "Peckham Levels", "ref": "Southwark ref 16/AP/1746", "desc": "7-storey mixed-use car park conversion, SE15. Approved 2016. Confirms LPA appetite for creative industrial intensification."}, {"name": "Surrey Canal Road", "ref": "Southwark ref 13/AP/3096", "desc": "Residential-led regeneration, 0.8ha industrial site Bermondsey. Approved 2014. Industrial-to-residential conversion precedent."}],
      insight: 'Peckham is an established regeneration target. No OA designation but Southwark Local Plan positively encourages intensification of underused industrial land. LPA track record: creative uses and residential conversion both approved at comparable SE15 sites. Lower planning tailwind than SE1 corridor but no hostile policy environment.'
    },
    heritage: {
      label: 'Heritage Shadow',
      score: 9.0, weight: 1.5,
      insight: 'No heritage constraints. Peckham industrial area - no listed buildings, no conservation area, no protected vistas. Cleanest heritage profile of any candidate site.'
    },
    acquisition: {
      label: 'Title Stack',
      score: 6.5, weight: 1.5,
      titles: null,
      tenure: 'Unknown - HMLR verification required',
      owner: null,
      insight: 'Industrial park - potentially multiple industrial unit leaseholders. Freehold owner likely a property company or pension fund. Checked Companies House: ownership unclear - HMLR verification required. If single freehold: clean assembly. If multiple freeholds: complex.'
    },
    transport: {
      label: 'Station Gravity',
      score: 7.0, weight: 0.5,
      ptal: '3',
      insight: 'PTAL 3. Peckham Rye station (Overground) 750m. Bus-served. Below the SE1 corridor for connectivity but acceptable for residential. Elizabeth line at Canada Water (Jubilee/Overground interchange) 2km east.'
    }
  }
};
