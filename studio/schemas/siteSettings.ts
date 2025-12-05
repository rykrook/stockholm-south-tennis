export default {
  name: 'siteSettings',
  title: 'Sidinställningar & Kontakt',
  type: 'document',
  fields: [
    // --- KONTAKTUPPGIFTER ---
    {
      name: 'title',
      title: 'Titel (bara för internt bruk)',
      type: 'string',
      initialValue: 'Kontaktuppgifter & Sidinställningar',
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
    },
    // --- HERO SEKTION ---
    {
      name: 'heroImage',
      title: 'Hero Bild (Bakgrund)',
      type: 'image',
      description: 'Bilden som visas högst upp. (Ignoreras om video laddas upp)',
      options: { hotspot: true },
    },
    {
      name: 'heroVideo',
      title: 'Hero Video (Bakgrund) - Valfritt',
      type: 'file',
      description: 'Ladda upp en kort loopad video (MP4). Om denna är tom visas bilden istället. Håll den under 10MB för snabb laddning!',
    },
    {
      name: 'heroTitle',
      title: 'Hero Rubrik (Rad 1)',
      type: 'string',
      description: 'Den vita texten. T.ex: "Utveckla ditt spel"',
    },
    {
      name: 'heroTitleAccent',
      title: 'Hero Rubrik (Guld/Accent)',
      type: 'string',
      description: 'Den färgade texten på rad 2. T.ex: "till nästa nivå"',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Underrubrik',
      type: 'text',
      rows: 3,
      description: 'Texten under rubriken.',
    },
    // --- LOGO ---
    {
      name: 'logo',
      title: 'Huvudlogotyp',
      type: 'image',
      description: 'Ladda upp en PNG med transparent bakgrund. Denna används i både Navbar och Footer. Optimala mått är 900x250px.',
      options: { hotspot: true },
    },
    // --- NOTIS BANNER ---
    {
      name: 'bannerActive',
      title: 'Visa Notis-banner',
      type: 'boolean',
      description: 'Slå på denna för att visa en banner högst upp på sidan.',
      initialValue: false,
    },
    {
      name: 'bannerText',
      title: 'Banner Text',
      type: 'string',
      description: 'Texten som ska stå i bannern.',
      hidden: ({ document }: any) => !document?.bannerActive, // Dölj fältet om bannern är avstängd (Smart UX!)
    },
    {
      name: 'bannerLink',
      title: 'Länk (Valfritt)',
      type: 'string',
      description: 'Vart ska man hamna om man klickar på texten? Lämna tomt för ingen länk.',
      hidden: ({ document }: any) => !document?.bannerActive,
    },
  ]
}