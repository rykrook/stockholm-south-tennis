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
        name: 'email',
        title: 'E-post för kontaktknapp',
        type: 'string',
        description: 'Om denna fylls i visas en "Kontakta mig"-knapp under bion.',
        validation: (Rule: any) => Rule.email().warning('Bör vara en giltig e-postadress.'),
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
    },
    {
      name: 'signature',
      title: 'Signatur (Bild)',
      type: 'image',
      description: 'Ladda upp en bild på signaturen. Helst en PNG med genomskinlig bakgrund för bäst resultat.',
      options: { hotspot: true },
    },
  ]
}