export default {
  name: 'program',
  title: 'Tennisprogram',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'T.ex. Junior Elite, Vuxenkurs, Privatlektioner',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Används för URL:en (t.ex. /program/junior-elite)',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      title: 'Huvudbild',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Kort beskrivning',
      type: 'text',
      rows: 3,
      description: 'Syns på startsidan i översikten.',
    },
    {
      name: 'detailedDescription',
      title: 'Detaljerad beskrivning',
      type: 'array', 
      of: [{type: 'block'}],
    },
    {
      name: 'price',
      title: 'Pris',
      type: 'string',
      description: 'T.ex. "2500 kr / termin" eller "Från 800 kr/h"',
    },
    {
      name: 'ageGroup',
      title: 'Åldersgrupp',
      type: 'string',
      options: {
        list: [
          {title: 'Barn (4-10 år)', value: 'kids'},
          {title: 'Junior (11-18 år)', value: 'junior'},
          {title: 'Vuxna', value: 'adults'},
          {title: 'Alla åldrar', value: 'all'},
        ],
      },
    },
  ],
}