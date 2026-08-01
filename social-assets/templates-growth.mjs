/**
 * Two-week acquisition set for Hair by Sha — 6 feed + 2 story.
 *
 * Brief: bring in new clients generally. No specific-day claims (the live
 * email campaign owns the Thursday/Friday message and these must not
 * contradict it), and no discounts. Education-led, with the free
 * consultation as the low-risk entry point for a first-time client.
 *
 * All photography is real Hair by Sha client work.
 *
 *   node templates-growth.mjs
 */
import { chromium } from 'playwright';
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, 'out-growth');
const PHOTOS = resolve(HERE, '../campaigns/referral-thu-fri/assets/email');
mkdirSync(OUT, { recursive: true });

const img = (f) => {
  const p = join(PHOTOS, f);
  if (!existsSync(p)) { console.warn(`  ! missing ${f}`); return ''; }
  return `data:image/jpeg;base64,${readFileSync(p).toString('base64')}`;
};

const C = {
  ink: '#1A1614', cream: '#FAF8F5', creamDeep: '#F2EFE8', sand: '#E6DFD6',
  taupe: '#998C80', bronze: '#AF7F55', bronzeSoft: '#C9AE92', body: '#4A423C',
};

const base = (w, h, body) => `
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400&family=Outfit:wght@300;400;500&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${w}px;height:${h}px;overflow:hidden;
       font-family:'Outfit',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
  .serif{font-family:'Fraunces',Georgia,serif;font-weight:300;letter-spacing:-.022em}
  .eyebrow{font-size:${Math.round(w*.0165)}px;letter-spacing:.34em;
           text-transform:uppercase;font-weight:400}
  .full{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .rule{height:1px;background:${C.bronze}}
</style>
<body>${body}</body>`;

/* ─── FEED 1080×1350 ─────────────────────────────────────────── */

// 1. Grey blending — the highest-intent, lowest-competition service
const greyBlending = base(1080, 1350, `
<div style="position:relative;width:1080px;height:1350px;background:${C.cream}">
  <img src="${img('hero-layers.jpg')}" style="width:1080px;height:560px;object-fit:cover">
  <div style="padding:64px 82px 0">
    <div class="eyebrow" style="color:${C.bronze}">Grey blending</div>
    <div class="serif" style="font-size:76px;line-height:1.06;color:${C.ink};margin-top:32px">
      Blending grey,<br>not chasing it.
    </div>
    <div class="rule" style="width:64px;margin:38px 0 34px"></div>
    <div style="font-size:31px;line-height:1.6;color:${C.body};font-weight:300;max-width:900px">
      Coverage draws a hard line four weeks later. Blending softens the grow-out, so
      your regrowth stops being a deadline &mdash; most clients get eight to ten weeks
      instead of four.
    </div>
  </div>
  <div class="eyebrow" style="position:absolute;bottom:58px;left:82px;color:${C.taupe}">
    Hair by Sha &middot; Camberwell
  </div>
</div>`);

// 2. Free consultation — the low-risk entry point for a first-time client
const consultation = base(1080, 1350, `
<div style="position:relative;width:1080px;height:1350px;background:${C.cream};padding:96px 82px;
            display:flex;flex-direction:column">
  <div class="eyebrow" style="color:${C.bronze}">Not sure where to start</div>
  <div class="serif" style="font-size:92px;line-height:1.04;color:${C.ink};margin-top:44px">
    The consultation<br>is <em style="color:${C.bronze};font-style:italic">free.</em>
  </div>
  <div style="font-size:31px;line-height:1.62;color:${C.body};margin-top:40px;
              font-weight:300;max-width:880px">
    Bring photos, or bring nothing. We'll talk through what your hair can actually
    take, what it'll cost, and how long it'll hold.
  </div>
  <div style="display:flex;gap:14px;margin-top:40px;height:300px">
    <img src="${img('trio-1.jpg')}" style="flex:1;height:100%;object-fit:cover">
    <img src="${img('trio-2.jpg')}" style="flex:1;height:100%;object-fit:cover">
    <img src="${img('trio-3.jpg')}" style="flex:1;height:100%;object-fit:cover">
  </div>
  <div style="display:flex;gap:16px;margin-top:38px;align-items:center">
    <img src="${img('sha-square.jpg')}" style="width:118px;height:118px;object-fit:cover">
    <div>
      <div class="serif" style="font-size:32px;color:${C.ink}">Sha</div>
      <div style="font-size:22px;color:${C.taupe};margin-top:6px;line-height:1.45">
        20+ years &middot; Colour specialist
      </div>
    </div>
  </div>
  <div style="margin-top:auto;border-top:1px solid ${C.sand};padding-top:32px">
    <div style="font-size:27px;line-height:1.5;color:${C.ink};font-style:italic"
         class="serif">
      No obligation, and I'll tell you honestly if the answer is no.
    </div>
  </div>
</div>`);

// 3. Before / after — reusable proof frame
const beforeAfter = (photo, tag) => base(1080, 1350, `
<div style="position:relative;width:1080px;height:1350px;background:${C.ink}">
  <div style="display:flex;height:1180px">
    <div style="flex:1;position:relative;border-right:3px solid ${C.ink};background:#2A2420;
                display:flex;align-items:center;justify-content:center">
      <div style="text-align:center;color:${C.taupe};padding:0 30px">
        <div class="eyebrow" style="font-size:17px;color:${C.bronzeSoft}">Drop in</div>
        <div class="serif" style="font-size:50px;color:${C.cream};margin-top:18px">BEFORE</div>
        <div style="font-size:20px;margin-top:16px;line-height:1.5">
          Replace with your own<br>before photo
        </div>
      </div>
    </div>
    <div style="flex:1;position:relative">
      <img src="${img(photo)}" style="width:100%;height:100%;object-fit:cover">
      <div class="eyebrow" style="position:absolute;bottom:34px;left:34px;color:${C.cream};
                  text-shadow:0 2px 12px rgba(0,0,0,.7)">After</div>
    </div>
  </div>
  <div style="height:170px;display:flex;align-items:center;justify-content:space-between;
              padding:0 60px">
    <div class="serif" style="font-size:38px;color:${C.cream}">${tag}</div>
    <div class="eyebrow" style="color:${C.bronzeSoft}">Hair by Sha</div>
  </div>
</div>`);

// 4. Colour correction — high-ticket, honest about the process
const correction = base(1080, 1350, `
<div style="position:relative;width:1080px;height:1350px;background:${C.ink}">
  <img class="full" src="${img('hero-balayage.jpg')}" style="opacity:.34">
  <div style="position:absolute;inset:0;
              background:linear-gradient(to bottom,rgba(26,22,20,.72),rgba(26,22,20,.94))"></div>
  <div style="position:absolute;inset:0;padding:96px 82px;display:flex;flex-direction:column">
    <div class="eyebrow" style="color:${C.bronzeSoft}">Colour correction</div>
    <div class="serif" style="font-size:82px;line-height:1.05;color:${C.cream};margin-top:38px">
      Box dye isn't<br>the end of it.
    </div>
    <div class="rule" style="width:64px;margin:40px 0 36px"></div>
    <div style="font-size:30px;line-height:1.62;color:#C9C0B8;font-weight:300;max-width:880px">
      It usually takes more than one session, and I'd rather tell you that upfront than
      wreck your hair getting there in a day. Correction is patient work. It's also my
      favourite kind.
    </div>
    <div style="margin-top:auto;font-size:26px;color:${C.bronzeSoft};font-style:italic"
         class="serif">
      Start with the free consultation.
    </div>
  </div>
</div>`);

// 5. Colour care — a real 3-step routine, so numbering is meaningful
const colourCare = base(1080, 1350, `
<div style="position:relative;width:1080px;height:1350px;background:${C.cream};padding:92px 82px;
            display:flex;flex-direction:column">
  <div class="eyebrow" style="color:${C.bronze}">Making it last</div>
  <div class="serif" style="font-size:80px;line-height:1.06;color:${C.ink};margin-top:36px">
    Three things that<br>cost you nothing.
  </div>
  <div style="margin-top:56px;display:flex;flex-direction:column;gap:40px">
    <div style="display:flex;gap:30px;align-items:flex-start">
      <div class="serif" style="font-size:30px;color:${C.bronzeSoft};padding-top:4px">01</div>
      <div>
        <div style="font-size:33px;color:${C.ink};line-height:1.3">Wait 72 hours to wash it</div>
        <div style="font-size:26px;color:${C.body};margin-top:10px;line-height:1.5;font-weight:300">
          The cuticle is still closing. Washing early is what pulls the toner out.
        </div>
      </div>
    </div>
    <div style="display:flex;gap:30px;align-items:flex-start">
      <div class="serif" style="font-size:30px;color:${C.bronzeSoft};padding-top:4px">02</div>
      <div>
        <div style="font-size:33px;color:${C.ink};line-height:1.3">Turn the water down</div>
        <div style="font-size:26px;color:${C.body};margin-top:10px;line-height:1.5;font-weight:300">
          Hot water opens the cuticle every wash. Lukewarm buys you weeks.
        </div>
      </div>
    </div>
    <div style="display:flex;gap:30px;align-items:flex-start">
      <div class="serif" style="font-size:30px;color:${C.bronzeSoft};padding-top:4px">03</div>
      <div>
        <div style="font-size:33px;color:${C.ink};line-height:1.3">Heat protectant, every time</div>
        <div style="font-size:26px;color:${C.body};margin-top:10px;line-height:1.5;font-weight:300">
          Not occasionally. Every time you put heat near it.
        </div>
      </div>
    </div>
  </div>
  <div class="eyebrow" style="margin-top:auto;color:${C.taupe}">Hair by Sha &middot; Camberwell</div>
</div>`);

/* ─── STORY 1080×1920 ────────────────────────────────────────── */

// 6. K18 — explains the certification the site leads on
const k18 = base(1080, 1920, `
<div style="position:relative;width:1080px;height:1920px;background:${C.ink};padding:0 92px;
            display:flex;flex-direction:column;justify-content:center">
  <div class="eyebrow" style="color:${C.bronzeSoft};font-size:19px">K18 certified</div>
  <div class="serif" style="font-size:94px;line-height:1.06;color:${C.cream};margin-top:50px">
    What a bond<br>treatment<br>actually does.
  </div>
  <div class="rule" style="width:70px;margin:54px 0"></div>
  <div style="font-size:35px;line-height:1.62;color:#B9AFA6;font-weight:300">
    Lightening breaks the bonds inside the hair. K18 reconnects them, which is why
    your ends still feel like hair after a full head of foils rather than like straw.
  </div>
  <div style="font-size:29px;line-height:1.6;color:${C.bronzeSoft};margin-top:44px;font-style:italic"
       class="serif">
    It's not a conditioner. It's structural.
  </div>
  <div class="eyebrow" style="position:absolute;bottom:190px;left:92px;color:${C.cream};
              opacity:.8;font-size:18px">Hair by Sha &middot; Camberwell</div>
</div>`);

// 7. Straight answer — honesty as positioning
const straightAnswer = base(1080, 1920, `
<div style="position:relative;width:1080px;height:1920px;background:${C.cream};padding:0 92px;
            display:flex;flex-direction:column;justify-content:center">
  <div class="eyebrow" style="color:${C.bronze};font-size:19px">Straight answer</div>
  <div class="serif" style="font-size:86px;line-height:1.1;color:${C.ink};margin-top:50px">
    &ldquo;Can I go blonde<br>in one session?&rdquo;
  </div>
  <div class="rule" style="width:70px;margin:54px 0"></div>
  <div style="font-size:35px;line-height:1.62;color:${C.body};font-weight:300">
    Sometimes. It depends on what's already on your hair and how much it can take in
    a day. I'll tell you honestly at the consultation, including when the answer is no.
  </div>
  <div style="font-size:29px;line-height:1.6;color:${C.taupe};margin-top:44px;font-style:italic"
       class="serif">
    Ask me anything. There's no silly question.
  </div>
  <div class="eyebrow" style="position:absolute;bottom:190px;left:92px;color:${C.taupe};
              font-size:18px">Free consultation &middot; link in bio</div>
</div>`);

const SET = [
  ['w1-01-feed-grey-blending',    greyBlending,                              1080, 1350],
  ['w1-02-feed-consultation',     consultation,                              1080, 1350],
  ['w1-03-feed-before-after',     beforeAfter('hero-balayage.jpg', 'Balayage'), 1080, 1350],
  ['w1-04-story-k18',             k18,                                       1080, 1920],
  ['w2-05-feed-colour-correction',correction,                                1080, 1350],
  ['w2-06-feed-colour-care',      colourCare,                                1080, 1350],
  ['w2-07-feed-before-after',     beforeAfter('hero-updo.jpg', 'Styled'),    1080, 1350],
  ['w2-08-story-straight-answer', straightAnswer,                            1080, 1920],
];

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

for (const [name, html, w, h] of SET) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(420);
  await page.screenshot({ path: join(OUT, `${name}.png`) });
  console.log(`  ${name}.png  ${w}x${h}`);
  await page.close();
}

await browser.close();
console.log(`\n${SET.length} posts -> out-growth/`);
