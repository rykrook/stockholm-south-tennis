import {supportedLanguages} from './languages'

// A longer multi-line text, per language.
export default {
  name: 'localeText',
  title: 'Lokaliserad text (lång)',
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
    type: 'text',
    rows: 3,
    fieldset: lang.isDefault ? undefined : 'translations',
  })),
}
