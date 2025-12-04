export default {
  name: 'siteSettings',
  title: 'Sidinställningar & Kontakt',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel (bara för internt bruk)',
      type: 'string',
      initialValue: 'Kontaktuppgifter',
      readOnly: true, 
    },
    {
      name: 'address',
      title: 'Gatuadress',
      type: 'string',
    },
    {
      name: 'postalAddress',
      title: 'Postnummer & Ort',
      type: 'string',
    },
    {
      name: 'email',
      title: 'E-post',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Telefonnummer',
      type: 'string',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram Länk',
      type: 'url',
    },
    {
      name: 'facebookUrl',
      title: 'Facebook Länk',
      type: 'url',
    }
  ]
}