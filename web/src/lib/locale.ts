import { useTranslation } from 'react-i18next';

/**
 * Resolve a possibly-localized Sanity value for the active language.
 *
 * Handles three shapes gracefully so the site never breaks during the
 * content migration:
 *  - localized object  { sv, en, es, fr }  -> picks active lang, falls back to sv
 *  - legacy plain string                   -> returned as-is
 *  - legacy Portable Text array            -> returned as-is
 */
export function pickLocale(value: any, lang: string): any {
  if (value == null) return value;
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value;
  const l = (lang || 'sv').split('-')[0];
  return value[l] ?? value.sv ?? '';
}

/** Hook returning a localize() bound to the current language (re-renders on switch). */
export function useLocalize() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'sv';
  return (value: any) => pickLocale(value, lang);
}
