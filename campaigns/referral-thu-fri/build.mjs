/**
 * Build send-ready email HTML into dist/.
 *
 *   node build.mjs --assets https://hairbyshacamberwell.com/email/referral
 *
 * Replaces {{ASSETS}}, {{SMS}} and {{BOOKING}}. Leaves {{UNSUBSCRIBE}} and the
 * per-recipient merge tags ({{REFERRER_NAME}} etc.) in place — Resend fills
 * those at send time.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(HERE, 'emails');
const DIST = resolve(HERE, 'dist');
mkdirSync(DIST, { recursive: true });

const argAssets = process.argv.indexOf('--assets');
const ASSETS = argAssets > -1
  ? process.argv[argAssets + 1].replace(/\/$/, '')
  : 'https://hairbyshacamberwell.com/email/referral';

const BOOKING = 'https://hairbysha-booking.onrender.com/book';

// Pre-filled SMS. "sms:?&body=" is the form that behaves on both iOS and
// Android; desktop clients ignore it, which is why the message is also shown
// as visible text in every email that uses this link.
const SMS = 'sms:?&body=' + encodeURIComponent(
  "You should book in with Sha in Camberwell. She's who does my hair. " +
  "Mention my name when you book and you'll get 10% off your first visit. " +
  "hairbyshacamberwell.com"
);

let n = 0;
for (const file of readdirSync(SRC).sort()) {
  if (!/\.(html|txt)$/.test(file)) continue;

  let out = readFileSync(join(SRC, file), 'utf8')
    .replaceAll('{{ASSETS}}', ASSETS)
    .replaceAll('{{SMS}}', SMS)
    .replaceAll('{{BOOKING}}', BOOKING)
    // Resend's broadcast unsubscribe merge tag. Resend requires triple braces
    // and auto-fills this for any email sent to an Audience — leave it as-is
    // once pasted in, do not delete it.
    .replaceAll('{{UNSUBSCRIBE}}', '{{{RESEND_UNSUBSCRIBE_URL}}}');

  // strip the leading developer comment block — internal notes only, never
  // meant to be pasted into the sending tool
  if (file.endsWith('.html')) {
    out = out.replace(/<!--[\s\S]*?-->\n?/g, '');
  }

  writeFileSync(join(DIST, file), out);
  console.log(`  ${file}`);
  n++;
}

console.log(`\n${n} files -> dist/`);
console.log(`assets base: ${ASSETS}`);
console.log('\nStill templated (Resend fills at send time):');
console.log('  {{UNSUBSCRIBE}} {{REFERRER_NAME}} {{NEW_CLIENT_NAME}} {{APPT_DAY_TIME}}');
