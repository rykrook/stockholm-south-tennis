export default {
  name: 'campEntry',
  title: 'Läger & Moments',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'localeString',
      description: 'T.ex. "Träningsläger Frankrike" eller "Sommarcamp 2024"',
    },
    {
      name: 'startDate',
      title: 'Startdatum',
      type: 'date',
      description: 'Används för att sortera lägren under "Kommande" eller "Tidigare"',
    },
   {
      name: 'text',
      title: 'Beskrivning',
      type: 'localeBlock',
      description: 'Använd verktygsfältet för att formatera texten, lägga till listor etc.',
    },
    {
      name: 'gallery',
      title: 'Bildgalleri',
      type: 'array',
      description: 'Lägg till en eller flera bilder. Den första bilden blir omslagsbild.',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
  ],
  preview: {
    select: {
      title: 'title.sv',
      media: 'gallery.0',
    },
  },
}