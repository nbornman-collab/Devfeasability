// PD Rules Engine - GPDO 2015 (as amended)
// National rules only. Article 4 and conservation area constraints applied as flags.

function applyConstraints(classes, inConservation, article4, listed) {
  return classes.map(c => {
    let verdict = c.verdict;
    let note = c.note || '';
    if(listed) {
      verdict = 'red';
      note = 'Listed buildings require Listed Building Consent for almost all works, regardless of PD rights.';
    } else if(inConservation) {
      const restrictedInCA = ['Class A - Two-storey rear extension','Class B - Roof extension / Dormer','Class AA - Upward extension'];
      if(restrictedInCA.includes(c.name)) {
        verdict = 'red';
        note = (note ? note + ' ' : '') + 'Conservation area: this class of development is not permitted without full planning permission in a conservation area.';
      } else if(verdict === 'green') {
        verdict = 'amber';
        note = (note ? note + ' ' : '') + 'Conservation area: materials must match existing, no cladding on street-facing elevations. Confirm with your LPA.';
      }
    } else if(article4) {
      if(verdict === 'green') verdict = 'amber';
      note = (note ? note + ' ' : '') + 'Article 4 direction removes some or all PD rights here. Confirm which classes are affected with your LPA before proceeding.';
    }
    const verdictLabel = verdict==='green'?'Permitted':verdict==='amber'?'Prior Approval / Check LPA':'Planning Required';
    return {...c, verdict, verdictLabel, note};
  });
}

function buildPDClasses(propertyType) {
  const isHouse = propertyType !== 'flat';
  const isDetached = propertyType === 'detached';
  const isSemiOrDetached = ['detached','semi-detached'].includes(propertyType);

  const classes = [
    {
      name: 'Class A - Single-storey rear extension',
      desc: 'Single-storey rear extensions are the most common PD project. Standard route: 4m (detached) or 3m (other). Larger extensions up to 8m/6m available via Neighbour Consultation Scheme with Prior Approval.',
      verdict: 'green',
      rules: [
        {label:'Max depth (standard)',value:isDetached?'4m without Prior Approval':'3m without Prior Approval',limit:isDetached?'4m':'3m',pass:true},
        {label:'Larger extension scheme',value:isDetached?'Up to 8m with Prior Approval':'Up to 6m with Prior Approval',pass:true,warn:false},
        {label:'Max height at eaves',value:'No higher than existing eaves',pass:true},
        {label:'Materials',value:'Must match existing house in appearance',pass:true},
      ],
      paNote: 'Neighbour Consultation Scheme: LPA notifies neighbours; if no objections in 42 days, Prior Approval granted. Fee: ~£120.'
    },
    {
      name: 'Class A - Two-storey rear extension',
      desc: 'Two-storey rear extensions permitted under Class A with tighter restrictions. NOT permitted in conservation areas.',
      verdict: 'amber',
      rules: [
        {label:'Max depth',value:'3m from original rear wall',limit:'3m',pass:true},
        {label:'Rear boundary distance',value:'Must be 7m+ from rear boundary',limit:'7m',pass:true},
        {label:'Roof pitch',value:'Must match existing',pass:true},
        {label:'Conservation areas',value:'NOT permitted',pass:false},
      ],
      note: 'Two-storey extensions attract more LPA scrutiny. Confirm before proceeding.'
    },
    {
      name: 'Class B - Roof extension / Dormer',
      desc: 'Dormer windows and roof extensions for additional floor space. NOT permitted on front elevations or in conservation areas.',
      verdict: isHouse ? 'amber' : 'red',
      rules: [
        {label:'Max volume',value:isSemiOrDetached?'50m³ additional roof space':'40m³ (terraced)',limit:isSemiOrDetached?'50m³':'40m³',pass:true},
        {label:'Front elevation',value:'NOT permitted facing highway',pass:false},
        {label:'Max height',value:'Cannot exceed existing roof ridge',pass:true},
        {label:'Set back from eaves',value:'Must be 20cm+ from eaves',pass:true},
      ]
    },
    {
      name: 'Class AA - Upward extension',
      desc: 'Add 1-2 additional storeys to a house. Introduced 2020. Requires Prior Approval. NOT permitted in conservation areas.',
      verdict: 'amber',
      rules: [
        {label:'Detached houses',value:'Up to 2 additional storeys (max 4 total)',pass:true},
        {label:'Other houses',value:'Up to 1 additional storey',pass:true},
        {label:'Max additional height',value:isDetached?'3.5m above existing roof':'3m above existing roof',pass:true},
        {label:'Prior Approval',value:'Required - LPA assesses design, amenity, appearance',pass:false,warn:true},
        {label:'Structural report',value:'Engineering assessment required',pass:true,warn:true},
      ],
      paNote: 'Fee: £334 per storey. LPA has 8 weeks. Conservation areas: NOT permitted.'
    },
    {
      name: 'Class E - Outbuildings / Garden rooms',
      desc: 'Garden rooms, home offices, sheds, garages. Must be within the curtilage of the house and not forward of the principal elevation.',
      verdict: isHouse ? 'green' : 'red',
      rules: [
        {label:'Max coverage',value:'Cannot exceed 50% of curtilage (excl. house footprint)',limit:'50%',pass:true},
        {label:'Near-boundary height',value:'2.5m max if within 2m of boundary',limit:'2.5m',pass:true},
        {label:'Max height (pitched)',value:'4m dual pitch / 3m single pitch',limit:'4m/3m',pass:true},
        {label:'Forward of principal elevation',value:'NOT permitted',pass:false},
        {label:'Purpose',value:'Incidental use only - no sleeping',pass:true},
      ]
    },
  ];

  return classes;
}

module.exports = { buildPDClasses, applyConstraints };
