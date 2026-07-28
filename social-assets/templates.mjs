/**
 * Render ready-to-post Instagram / TikTok assets for Hair by Sha.
 *
 * Every template uses the brand system taken from the live site's design
 * tokens, and every photograph is a real Hair by Sha client result. No stock,
 * no AI-generated hair.
 *
 *   node templates.mjs
 *
 * Outputs to out/ at native platform dimensions:
 *   feed   1080 x 1350  (4:5, the tallest Instagram allows — max feed real estate)
 *   story  1080 x 1920  (9:16, also correct for TikTok)
 */
import { chromium } from 'playwright';
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, 'out');
const PHOTOS = resolve(HERE, '../campaigns/referral-thu-fri/assets/email');
mkdirSync(OUT, { recursive: true });

const img = (f) => {
  const p = join(PHOTOS, f);
  if (!existsSync(p)) { console.warn(`  ! missing ${f}`); return ''; }
  return `data:image/jpeg;base64,${readFileSync(p).toString('base64')}`;
};

const C = {
  ink: '#1A1614', cream: '#FAF8F5', sand: '#E6DFD6',
  taupe: '#998C80', bronze: '#AF7F55', bronzeSoft: '#C9AE92',
};

const base = (w, h, body) => `
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400&family=Outfit:wght@300;400;500&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${w}px;height:${h}px;overflow:hidden;font-family:'Outfit',Helvetica,Arial,sans-serif;
       -webkit-font-smoothing:antialiased}
  .serif{font-family:'Fraunces',Georgia,serif;font-weight:300;letter-spacing:-.02em}
  .eyebrow{font-size:${Math.round(w*.0165)}px;letter-spacing:.34em;text-transform:uppercase;font-weight:400}
  .full{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
</style>
<body>${body}</body>`;

/* ---------- FEED 1080x1350 ---------- */

const feedAvailability = base(1080, 1350, `
<div style="position:relative;width:1080px;height:1350px;background:${C.ink}">
  <img class="full" src="${img('hero-balayage.jpg')}" style="opacity:.62">
  <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(26,22,20,.25) 0%,rgba(26,22,20,.20) 45%,rgba(26,22,20,.92) 100%)"></div>
  <div style="position:absolute;left:82px;right:82px;bottom:104px;color:${C.cream}">
    <div class="eyebrow" style="color:${C.bronzeSoft};margin-bottom:30px">Newly available</div>
    <div class="serif" style="font-size:112px;line-height:.98">Thursdays<br>&amp; Fridays</div>
    <div style="width:64px;height:1px;background:${C.bronze};margin:38px 0 30px"></div>
    <div style="font-size:31px;line-height:1.5;font-weight:300;color:#DCD4CC;max-width:760px">
      The quietest days in my week. Unhurried colour, and the whole room to yourself.
    </div>
  </div>
  <div class="eyebrow" style="position:absolute;top:74px;left:82px;color:${C.cream};opacity:.9">Hair by Sha · Camberwell</div>
</div>`);

const feedReferral = base(1080, 1350, `
<div style="position:relative;width:1080px;height:1350px;background:${C.cream};padding:96px 82px;display:flex;flex-direction:column">
  <div class="eyebrow" style="color:${C.bronze}">A thank you, from Sha</div>
  <div class="serif" style="font-size:104px;line-height:1.0;color:${C.ink};margin-top:52px">
    &ldquo;Who does<br><em style="color:${C.bronze};font-style:italic">your hair?</em>&rdquo;
  </div>
  <div style="font-size:31px;line-height:1.6;color:#4A423C;margin-top:40px;font-weight:300;max-width:820px">
    Send someone my way and you'll both get something for it.
  </div>
  <div style="display:flex;gap:14px;margin-top:44px;height:330px">
    <img src="${img('trio-1.jpg')}" style="flex:1;height:100%;object-fit:cover">
    <img src="${img('trio-3.jpg')}" style="flex:1;height:100%;object-fit:cover">
  </div>
  <div style="display:flex;gap:0;margin-top:auto;border-top:1px solid ${C.sand};padding-top:46px">
    <div style="flex:1">
      <div class="eyebrow" style="color:${C.taupe};font-size:15px">You receive</div>
      <div class="serif" style="font-size:96px;color:${C.ink};line-height:1;margin-top:16px">15%</div>
      <div style="font-size:25px;color:#4A423C;margin-top:12px;font-weight:300">off your next visit</div>
    </div>
    <div style="width:1px;background:${C.sand};margin:0 52px"></div>
    <div style="flex:1">
      <div class="eyebrow" style="color:${C.taupe};font-size:15px">They receive</div>
      <div class="serif" style="font-size:96px;color:${C.ink};line-height:1;margin-top:16px">10%</div>
      <div style="font-size:25px;color:#4A423C;margin-top:12px;font-weight:300">off their first</div>
    </div>
  </div>
  <div style="font-size:23px;color:${C.taupe};margin-top:44px;font-style:italic">
    No codes. No links. They just mention your name.
  </div>
</div>`);

const feedGrey = base(1080, 1350, `
<div style="position:relative;width:1080px;height:1350px;background:${C.cream}">
  <img src="${img('hero-layers.jpg')}" style="position:absolute;top:0;left:0;width:1080px;height:620px;object-fit:cover">
  <div style="position:absolute;top:620px;left:0;right:0;bottom:0;padding:76px 82px">
    <div class="eyebrow" style="color:${C.bronze}">Grey blending</div>
    <div class="serif" style="font-size:82px;line-height:1.06;color:${C.ink};margin-top:34px">
      Blending grey, not<br>chasing it.
    </div>
    <div style="font-size:30px;line-height:1.62;color:#4A423C;margin-top:36px;font-weight:300;max-width:860px">
      Coverage gives you a hard line in four weeks. Blending softens the grow-out, so your
      regrowth stops being a deadline. Most clients get eight to ten weeks instead.
    </div>
    <div style="position:absolute;bottom:64px;left:82px;font-size:23px;color:${C.taupe}">
      hairbyshacamberwell.com
    </div>
  </div>
</div>`);

const feedBeforeAfter = base(1080, 1350, `
<div style="position:relative;width:1080px;height:1350px;background:${C.ink}">
  <div style="display:flex;height:1180px">
    <div style="flex:1;position:relative;border-right:3px solid ${C.ink}">
      <div style="position:absolute;inset:0;background:#2A2420;display:flex;align-items:center;justify-content:center">
        <div style="text-align:center;color:${C.taupe}">
          <div class="eyebrow" style="font-size:17px;color:${C.bronzeSoft}">Drop in</div>
          <div class="serif" style="font-size:52px;color:${C.cream};margin-top:18px">BEFORE</div>
          <div style="font-size:20px;margin-top:14px;max-width:280px;line-height:1.5">
            Replace with your own before photo
          </div>
        </div>
      </div>
    </div>
    <div style="flex:1;position:relative">
      <img src="${img('hero-balayage.jpg')}" style="width:100%;height:100%;object-fit:cover">
      <div class="eyebrow" style="position:absolute;bottom:34px;left:34px;color:${C.cream};text-shadow:0 2px 10px rgba(0,0,0,.6)">After</div>
    </div>
  </div>
  <div style="height:170px;display:flex;align-items:center;justify-content:space-between;padding:0 60px">
    <div class="serif" style="font-size:40px;color:${C.cream}">Hair by Sha</div>
    <div class="eyebrow" style="color:${C.bronzeSoft}">Camberwell</div>
  </div>
</div>`);

/* ---------- STORY 1080x1920 ---------- */

const storyAvailability = base(1080, 1920, `
<div style="position:relative;width:1080px;height:1920px;background:${C.ink}">
  <img class="full" src="${img('hero-updo.jpg')}" style="opacity:.55">
  <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(26,22,20,.55) 0%,rgba(26,22,20,.25) 40%,rgba(26,22,20,.95) 100%)"></div>
  <div style="position:absolute;left:90px;right:90px;top:50%;transform:translateY(-50%);color:${C.cream};text-align:center">
    <div class="eyebrow" style="color:${C.bronzeSoft};font-size:19px">Newly available</div>
    <div class="serif" style="font-size:124px;line-height:1.0;margin-top:44px">Thursdays<br>&amp; Fridays</div>
    <div style="width:70px;height:1px;background:${C.bronze};margin:48px auto"></div>
    <div style="font-size:34px;line-height:1.55;font-weight:300;color:#DCD4CC">
      Quiet colour appointments.<br>The whole room to yourself.
    </div>
  </div>
  <div style="position:absolute;bottom:210px;left:0;right:0;text-align:center">
    <div class="eyebrow" style="color:${C.cream};opacity:.85;font-size:19px">Book · link in bio</div>
  </div>
</div>`);

const storyReview = base(1080, 1920, `
<div style="position:relative;width:1080px;height:1920px;background:${C.cream};padding:0 90px;display:flex;flex-direction:column;justify-content:center;text-align:center">
  <div class="eyebrow" style="color:${C.bronze};font-size:19px">A small favour</div>
  <div class="serif" style="font-size:104px;line-height:1.04;color:${C.ink};margin-top:48px">
    Happy with<br>your colour?
  </div>
  <div style="width:70px;height:1px;background:${C.bronze};margin:52px auto"></div>
  <div style="font-size:36px;line-height:1.6;color:#4A423C;font-weight:300">
    A Google review takes a minute<br>and it's how people find me.
  </div>
  <div style="font-size:29px;line-height:1.6;color:${C.taupe};margin-top:44px;font-style:italic">
    I don't run ads.
  </div>
  <div style="position:absolute;bottom:190px;left:0;right:0;text-align:center">
    <div class="eyebrow" style="color:${C.taupe};font-size:18px">Hair by Sha · Camberwell</div>
  </div>
</div>`);

const storyQuote = base(1080, 1920, `
<div style="position:relative;width:1080px;height:1920px;background:${C.ink};padding:0 92px;display:flex;flex-direction:column;justify-content:center">
  <div class="eyebrow" style="color:${C.bronzeSoft};font-size:19px">Straight answer</div>
  <div class="serif" style="font-size:88px;line-height:1.12;color:${C.cream};margin-top:52px">
    &ldquo;Can I go blonde<br>in one session?&rdquo;
  </div>
  <div style="width:70px;height:1px;background:${C.bronze};margin:56px 0"></div>
  <div style="font-size:36px;line-height:1.62;color:#B9AFA6;font-weight:300">
    Sometimes. It depends on what's already on your hair and how much it can take in a day.
    I'll tell you honestly at the consultation, even when the answer is no.
  </div>
  <div style="position:absolute;bottom:190px;left:92px">
    <div class="eyebrow" style="color:${C.cream};opacity:.8;font-size:18px">Free consultation · link in bio</div>
  </div>
</div>`);

const SET = [
  ['feed-01-thursdays-fridays', feedAvailability, 1080, 1350],
  ['feed-02-referral-offer', feedReferral, 1080, 1350],
  ['feed-03-grey-blending', feedGrey, 1080, 1350],
  ['feed-04-before-after-TEMPLATE', feedBeforeAfter, 1080, 1350],
  ['story-01-thursdays-fridays', storyAvailability, 1080, 1920],
  ['story-02-review-ask', storyReview, 1080, 1920],
  ['story-03-blonde-question', storyQuote, 1080, 1920],
];

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

for (const [name, html, w, h] of SET) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: join(OUT, `${name}.png`) });
  console.log(`  ${name}.png  ${w}x${h}`);
  await page.close();
}

await browser.close();
console.log(`\n${SET.length} assets -> out/`);
