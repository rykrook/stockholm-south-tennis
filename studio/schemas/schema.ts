import siteSettings from './siteSettings'
import program from './program'
import coach from './coach'
import gallery from './gallery'
import backgroundSettings from './backgroundSettings'
import campEntry from './campEntry'

// Localized field types (sv / en / es / fr)
import localeString from './localeString'
import localeText from './localeText'
import localeBlock from './localeBlock'

export const schemaTypes = [
  // Documents
  siteSettings,
  program,
  coach,
  gallery,
  backgroundSettings,
  campEntry,
  // Reusable localized object types
  localeString,
  localeText,
  localeBlock,
]
