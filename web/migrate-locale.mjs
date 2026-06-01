// One-off migration: wrap existing single-language Sanity values into the new
// localized shape { sv: <value> }. Non-destructive — your text is preserved,
// just moved into the Swedish sub-field so it's no longer "stuck" on the old type.
//
// Usage (from web/):
//   SANITY_WRITE_TOKEN=xxx node migrate-locale.mjs           # dry run
//   SANITY_WRITE_TOKEN=xxx node migrate-locale.mjs --apply   # write changes
//
// Safe to re-run: already-migrated fields (objects) are skipped.
import {createClient} from '@sanity/client';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN env var.');
  process.exit(1);
}
const APPLY = process.argv.includes('--apply');

const client = createClient({
  projectId: '4jvp9hxf',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token,
  useCdn: false,
});

// Which fields became localized, per document type.
// str  = was a plain string  -> { sv: string }
// blk  = was Portable Text[]  -> { sv: array }
const MAP = {
  siteSettings: {str: ['heroTitle', 'heroTitleAccent', 'bannerText', 'heroSubtitle'], blk: []},
  program: {str: ['title', 'price', 'description'], blk: ['content', 'detailedDescription']},
  coach: {str: ['role', 'philosophy', 'bio'], blk: []},
  campEntry: {str: ['title'], blk: ['text']},
  gallery: {str: ['scrollingText'], blk: []},
};

const preview = (v) =>
  Array.isArray(v)
    ? `[${v.length} block(s)]`
    : typeof v === 'string'
    ? JSON.stringify(v.length > 60 ? v.slice(0, 60) + '…' : v)
    : JSON.stringify(v);

let docs = 0;
let fields = 0;
let errors = 0;

for (const [type, cfg] of Object.entries(MAP)) {
  const results = await client.fetch(`*[_type == $type]`, {type});
  for (const doc of results) {
    const set = {};
    for (const f of cfg.str) {
      if (typeof doc[f] === 'string') set[f] = {sv: doc[f]};
    }
    for (const f of cfg.blk) {
      if (Array.isArray(doc[f])) set[f] = {sv: doc[f]};
    }
    const keys = Object.keys(set);
    if (!keys.length) continue;

    docs++;
    fields += keys.length;
    console.log(`\n${APPLY ? 'APPLY' : 'DRY '}  ${doc._id}  (${type})`);
    for (const k of keys) console.log(`   ${k}: ${preview(doc[k])}  ->  { sv: … }`);

    if (APPLY) {
      try {
        await client.patch(doc._id).set(set).commit({autoGenerateArrayKeys: true});
      } catch (e) {
        errors++;
        console.log(`   ⚠ failed: ${e.message}`);
      }
    }
  }
}

console.log(
  `\n${APPLY ? 'APPLIED' : 'DRY RUN'}: ${fields} field(s) across ${docs} document(s)${
    errors ? `, ${errors} error(s)` : ''
  }.`,
);
if (!APPLY) console.log('Looks right? Re-run with --apply to write the changes.');
