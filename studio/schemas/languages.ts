// Languages supported across the site. Swedish is the source/default;
// the frontend falls back to Swedish when a translation is missing.
export const supportedLanguages = [
  {id: 'sv', title: 'Svenska 🇸🇪', isDefault: true},
  {id: 'en', title: 'English 🇬🇧'},
  {id: 'es', title: 'Español 🇪🇸'},
  {id: 'fr', title: 'Français 🇫🇷'},
]

export const baseLanguage = supportedLanguages.find((l) => l.isDefault)
