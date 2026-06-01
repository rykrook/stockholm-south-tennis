export default {
  name: 'program',
  title: 'Tennisprogram',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'localeString',
      description: 'T.ex. Junior Elite, Vuxenkurs, Privatlektioner',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Används för URL:en (t.ex. /program/junior-elite). Genereras från den svenska titeln.',
      options: {
        source: (doc: any) => doc?.title?.sv,
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
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
      type: 'localeText',
      description: 'Syns på startsidan i översikten.',
    },
    {
      name: 'detailedDescription',
      title: 'Detaljerad beskrivning',
      type: 'localeBlock',
    },
    {
      name: 'price',
      title: 'Pris',
      type: 'localeString',
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
    {
      name: 'content',
      title: 'Detaljerat innehåll (Träningsupplägg/Schema)',
      type: 'localeBlock',
    },
  ],
  preview: {
    select: {
      title: 'title.sv',
      media: 'mainImage',
    },
  },
}
