import {supportedLanguages} from './languages'

// A short text that can be written in every supported language.
// Swedish shows first; the rest live in a collapsible "Översättningar" group.
export default {
  name: 'localeString',
  title: 'Lokaliserad text (kort)',
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
    type: 'string',
    fieldset: lang.isDefault ? undefined : 'translations',
  })),
}
