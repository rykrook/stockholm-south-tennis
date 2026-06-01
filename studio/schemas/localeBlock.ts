import {supportedLanguages} from './languages'

// Rich text (Portable Text) with images, per language.
export default {
  name: 'localeBlock',
  title: 'Lokaliserat innehåll',
  type: 'object',
  fieldsets: [
    {
      name: 'translations',
      title: 'Översättningar (EN / ES / FR)',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    name: lang.id,
    title: lang.title,
    type: 'array',
    of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}],
    fieldset: lang.isDefault ? undefined : 'translations',
  })),
}
