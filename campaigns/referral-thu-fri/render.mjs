/**
 * Render email HTML to PNG previews for visual review.
 *
 * Usage: node render.mjs <file.html> [...more]
 * Writes <name>-desktop.png (700px viewport) and <name>-mobile.png (390px).
 */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { basename, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, 'previews');
const TMP = resolve(HERE, '.render-tmp');
mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });

const SMS = 'sms:?&body=' + encodeURIComponent(
  "You should book in with Sha at Hair by Sha in Camberwell — she's who does my hair. " +
  "Mention my name when you book and you'll get 10% off your first appointment. hairbyshacamberwell.com"
);
const BOOKING = 'https://hairbysha-booking.onrender.com/book';

const files = process.argv.slice(2);
if (!files.length) { console.error('no input files'); process.exit(1); }

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

for (const file of files) {
  const src = resolve(file);
  const name = basename(src, '.html');

  const html = readFileSync(src, 'utf8')
    .replaceAll('{{ASSETS}}', pathToFileURL(resolve(HERE, 'assets/email')).href)
    .replaceAll('{{SMS}}', SMS)
    .replaceAll('{{BOOKING}}', BOOKING)
    .replaceAll('{{UNSUBSCRIBE}}', '#')
    // realistic sample merge data — raw {{TOKENS}} are long unbreakable strings
    // and would report false overflow in the preview
    .replaceAll('{{FIRST_NAME}}', 'Sarah')
    .replaceAll('{{REFERRER_NAME}}', 'Sarah')
    .replaceAll('{{NEW_CLIENT_NAME}}', 'Emily')
    .replaceAll('{{APPT_DAY_TIME}}', 'Thursday 14 August, 10:30am');

  const tmp = resolve(TMP, `${name}.html`);
  writeFileSync(tmp, html);

  for (const [label, width] of [['desktop', 700], ['mobile', 390]]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      deviceScaleFactor: 2,
    });
    await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
    const out = resolve(OUT, `${name}-${label}.png`);
    await page.screenshot({ path: out, fullPage: true });
    const { width: w, height: h } = await page.evaluate(() => ({
      width: document.body.scrollWidth, height: document.body.scrollHeight,
    }));
    console.log(`${name.padEnd(14)} ${label.padEnd(8)} ${w}x${h}`);
    await page.close();
  }
}

await browser.close();
