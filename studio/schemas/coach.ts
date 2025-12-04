export default {
  name: 'coach',
  title: 'Tränare',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Namn',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Roll / Titel',
      type: 'string',
      initialValue: 'Head Coach',
    },
    {
      name: 'image',
      title: 'Porträttbild',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'bio',
      title: 'Kort Biografi',
      type: 'text',
      rows: 4,
    },
    {
      name: 'philosophy',
      title: 'Tränarfilosofi (Citat)',
      type: 'string',
      description: 'Ett kort, kraftfullt citat. T.ex: "Hard work beats talent..."'
    }
  ]
}