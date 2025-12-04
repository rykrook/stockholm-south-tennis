export default {
  name: 'testimonial',
  title: 'Omdömen',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Namn',
      type: 'string',
      description: 'T.ex. Anna Svensson',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Roll',
      type: 'string',
      description: 'T.ex. "Mamma till elitjunior" eller "Motionär"',
    },
    {
      name: 'quote',
      title: 'Citat',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Betyg (1-5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule: any) => Rule.min(1).max(5),
    }
  ]
}