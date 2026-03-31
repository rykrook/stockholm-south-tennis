export default {
  name: 'campEntry',
  title: 'Läger-inlägg',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titel', type: 'string' },
    { name: 'date', title: 'Datum', type: 'date' },
    { name: 'image', title: 'Bild', type: 'image', options: { hotspot: true } },
    { name: 'text', title: 'Beskrivning', type: 'text' },
  ],
}