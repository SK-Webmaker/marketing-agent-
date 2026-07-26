/**
 * Build standalone, self-contained preview files.
 *
 * Each output file is the REAL email HTML with every image inlined as a
 * base64 data URI — so it opens correctly in any browser, on any device,
 * with no hosting and no internet. This is for reviewing before deploy.
 *
 * NOTE: data URIs are for PREVIEW ONLY. Gmail strips them. The files you
 * actually send come from build.mjs and use hosted https:// image URLs.
 *
 *   node make-preview.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(HERE, 'emails');
const IMG = resolve(HERE, 'assets/email');
const OUT = resolve(HERE, 'preview');
mkdirSync(OUT, { recursive: true });

const BOOKING = 'https://hairbysha-booking.onrender.com/book';
const SMS = 'sms:?&body=' + encodeURIComponent(
  "You should book in with Sha in Camberwell — she's who does my hair. " +
  "Mention my name when you book and you'll get 10% off your first visit. " +
  "hairbyshacamberwell.com"
);

const dataUri = (file) => {
  const p = join(IMG, file);
  if (!existsSync(p)) { console.warn(`  ! missing image: ${file}`); return ''; }
  return `data:image/jpeg;base64,${readFileSync(p).toString('base64')}`;
};

// Subject + preview text, mirroring SEND-PLAN.md
const META = {
  '01-announcement':        ['1 · Announcement — day 0, broadcast', '"Who does your hair?"', 'You get asked it all the time. From now on, the answer is worth something.'],
  '02-reminder':            ['2 · Reminder — day 8, broadcast', 'Think of one person', 'Not a list. Not a campaign. Just one person you already had in mind.'],
  '03-last-call':           ['3 · Capacity close — day 18, broadcast', 'The two quietest days in my week', 'Space, no clock-watching, and the whole room to yourself.'],
  '04-new-client-welcome':  ['4 · New client welcome — triggered on booking', "You're booked in, Emily", 'Your 10% is already on your booking — here’s what to expect.'],
  '05-reward-ready':        ['5 · Reward ready — triggered after attendance', 'Emily came in — your 15% is ready', 'Nothing to print, nothing to quote. I’ll take it off before you pay.'],
  '06-lapsed-reactivation': ['6 · Lapsed reactivation — week 2, broadcast', "It's been a while", 'No hard sell, no guilt. Just two quiet new days and an open invitation.'],
};

const SAMPLE = {
  '{{REFERRER_NAME}}': 'Sarah',
  '{{NEW_CLIENT_NAME}}': 'Emily',
  '{{FIRST_NAME}}': 'Sarah',
  '{{APPT_DAY_TIME}}': 'Thursday 14 August, 10:30am',
};

const built = [];

for (const file of readdirSync(SRC).sort()) {
  if (!file.endsWith('.html')) continue;
  const name = basename(file, '.html');

  let html = readFileSync(join(SRC, file), 'utf8')
    .replaceAll('{{SMS}}', SMS)
    .replaceAll('{{BOOKING}}', BOOKING)
    .replaceAll('{{UNSUBSCRIBE}}', '#preview-unsubscribe');

  for (const [k, v] of Object.entries(SAMPLE)) html = html.replaceAll(k, v);

  // inline every {{ASSETS}}/<file> reference as base64
  html = html.replace(/\{\{ASSETS\}\}\/([\w.-]+)/g, (_, f) => dataUri(f));

  const [label, subject, preview] = META[name] ?? [name, '', ''];

  // a light "inbox" chrome so the review shows what the recipient sees first
  const chrome = `
<div style="max-width:600px;margin:0 auto 0;padding:18px 20px;background:#1A1614;color:#FAF8F5;
            font:14px/1.5 -apple-system,Helvetica,Arial,sans-serif;">
  <div style="font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#C9AE92;">${label}</div>
  <div style="margin-top:12px;font-size:11px;color:#8C8078;">FROM</div>
  <div style="font-size:15px;">Sha — Hair by Sha</div>
  <div style="margin-top:8px;font-size:11px;color:#8C8078;">SUBJECT</div>
  <div style="font-size:16px;font-weight:600;">${subject}</div>
  <div style="margin-top:8px;font-size:11px;color:#8C8078;">PREVIEW TEXT</div>
  <div style="font-size:13px;color:#B9AFA6;">${preview}</div>
</div>`;

  html = html.replace(/(<body[^>]*>)/i, `$1\n${chrome}\n`);

  writeFileSync(join(OUT, `${name}.html`), html);
  const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
  console.log(`  ${name}.html  ${kb} KB`);
  built.push([name, label, subject]);
}

// index
const index = `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hair by Sha — campaign preview</title>
<body style="margin:0;background:#EFEAE2;font:16px/1.6 -apple-system,Helvetica,Arial,sans-serif;color:#1A1614;">
<div style="max-width:640px;margin:0 auto;padding:48px 24px 64px;">
  <div style="font:11px/1 Helvetica,Arial,sans-serif;letter-spacing:.30em;text-transform:uppercase;color:#AF7F55;">Hair by Sha</div>
  <h1 style="font:400 40px/1.1 Georgia,serif;letter-spacing:-.02em;margin:18px 0 0;">Referral campaign preview</h1>
  <p style="color:#4A423C;margin:16px 0 0;">Six emails, exactly as a client will see them. Images are embedded, so these
  open anywhere — no internet needed. Open each on your phone as well as your laptop.</p>
  <p style="color:#998C80;font-size:14px;margin:12px 0 0;">These preview files inline the images for portability.
  The files you actually send (<code>dist/</code>) use hosted image URLs — Gmail strips embedded images.</p>
  <div style="margin-top:36px;">
  ${built.map(([n, label, subject]) => `
    <a href="./${n}.html" style="display:block;text-decoration:none;color:inherit;background:#FAF8F5;
       border:1px solid #E6DFD6;padding:22px 24px;margin-bottom:12px;">
      <div style="font:10px/1 Helvetica,Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#998C80;">${label}</div>
      <div style="font:400 21px/1.3 Georgia,serif;margin-top:10px;">${subject}</div>
    </a>`).join('')}
  </div>
</div></body>`;
writeFileSync(join(OUT, 'index.html'), index);

console.log(`\n${built.length} previews + index -> preview/`);
