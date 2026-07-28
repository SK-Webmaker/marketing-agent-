#!/usr/bin/env python3
"""
Build the visual 30-day action plan as a self-contained HTML artifact.

Rendered social assets are embedded as base64 thumbnails, since the artifact
CSP blocks external hosts.
"""
import base64, io
from pathlib import Path
from PIL import Image

HERE = Path(__file__).parent
OUT = HERE / "out"
DEST = HERE / "action-plan.html"

def thumb(name, width=420, quality=78):
    p = OUT / f"{name}.png"
    if not p.exists():
        print(f"  ! missing {name}")
        return ""
    im = Image.open(p).convert("RGB")
    h = int(im.height * (width / im.width))
    im = im.resize((width, h), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=quality, optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode()
    print(f"  {name}: {len(b64)//1024} KB")
    return f"data:image/jpeg;base64,{b64}"

A = {n: thumb(n) for n in [
    "feed-01-thursdays-fridays", "feed-02-referral-offer", "feed-03-grey-blending",
    "feed-04-before-after-TEMPLATE", "story-01-thursdays-fridays",
    "story-02-review-ask", "story-03-blonde-question",
]}

CSS = """
:root{
  --ink:#1A1614; --ink-2:#28231F; --cream:#FAF8F5; --cream-2:#F2EFE8;
  --sand:#E6DFD6; --taupe:#8B7F74; --bronze:#9A6C43; --bronze-soft:#C9AE92;
  --ground:var(--cream); --panel:#FFFFFF; --text:#241E1A; --text-2:#5A5049;
  --rule:var(--sand); --accent:var(--bronze);
  --do:#9A6C43; --auto:#4F6B5A; --wait:#8A5A4A;
  --shadow:0 1px 2px rgba(26,22,20,.05), 0 8px 24px -12px rgba(26,22,20,.18);
}
@media (prefers-color-scheme:dark){
  :root{
    --ground:#141110; --panel:#1D1917; --text:#EFE9E3; --text-2:#A79C93;
    --rule:#332C27; --accent:#C9946A; --bronze:#C9946A;
    --do:#C9946A; --auto:#7FA189; --wait:#C08A78;
    --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 24px -12px rgba(0,0,0,.6);
  }
}
:root[data-theme="dark"]{
  --ground:#141110; --panel:#1D1917; --text:#EFE9E3; --text-2:#A79C93;
  --rule:#332C27; --accent:#C9946A; --bronze:#C9946A;
  --do:#C9946A; --auto:#7FA189; --wait:#C08A78;
  --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 24px -12px rgba(0,0,0,.6);
}
:root[data-theme="light"]{
  --ground:#FAF8F5; --panel:#FFFFFF; --text:#241E1A; --text-2:#5A5049;
  --rule:#E6DFD6; --accent:#9A6C43; --bronze:#9A6C43;
  --do:#9A6C43; --auto:#4F6B5A; --wait:#8A5A4A;
  --shadow:0 1px 2px rgba(26,22,20,.05), 0 8px 24px -12px rgba(26,22,20,.18);
}

*{box-sizing:border-box}
body{margin:0;background:var(--ground);color:var(--text);
  font:400 16px/1.62 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased}
.serif{font-family:Georgia,"Iowan Old Style","Times New Roman",serif;font-weight:400;letter-spacing:-.02em}
.wrap{max-width:1120px;margin:0 auto;padding:0 28px}
.eyebrow{font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--accent);font-weight:600}

/* masthead */
.top{background:var(--ink);color:#FAF8F5;padding:60px 0 56px;margin-bottom:64px}
:root[data-theme="dark"] .top{background:#0E0C0B}
.top .eyebrow{color:var(--bronze-soft)}
.top h1{margin:20px 0 0;font-size:clamp(34px,5.4vw,56px);line-height:1.04}
.top p{margin:22px 0 0;max-width:60ch;color:#B9AFA6;font-size:17px}
.stat-row{display:flex;flex-wrap:wrap;gap:14px;margin-top:38px}
.stat{background:rgba(250,248,245,.06);border:1px solid rgba(250,248,245,.12);
  padding:14px 20px;min-width:150px}
.stat b{display:block;font-size:26px;font-family:Georgia,serif;font-weight:400;color:#FAF8F5}
.stat span{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#9C918A}

section{margin-bottom:72px}
h2{font-size:clamp(24px,3.2vw,32px);margin:0 0 8px;line-height:1.16}
.sub{color:var(--text-2);margin:0 0 32px;max-width:66ch}

/* habits */
.habits{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(210px,1fr))}
.habit{background:var(--panel);border:1px solid var(--rule);padding:22px;box-shadow:var(--shadow);
  display:flex;flex-direction:column;gap:10px}
.habit .n{font-family:Georgia,serif;font-size:13px;color:var(--accent)}
.habit b{font-size:16px;line-height:1.35}
.habit p{margin:0;font-size:14px;color:var(--text-2);line-height:1.55}

/* weeks */
.week{border-top:2px solid var(--ink);padding-top:22px;margin-bottom:52px}
:root[data-theme="dark"] .week{border-top-color:var(--bronze)}
.week-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:16px;margin-bottom:24px}
.week-head h3{margin:0;font-size:22px;font-family:Georgia,serif;font-weight:400}
.week-head .when{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--text-2)}
.cards{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
.card{background:var(--panel);border:1px solid var(--rule);box-shadow:var(--shadow);
  display:flex;flex-direction:column;overflow:hidden}
.card img{width:100%;display:block;border-bottom:1px solid var(--rule)}
.card .body{padding:16px 18px 18px;display:flex;flex-direction:column;gap:8px;flex:1}
.card .tag{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);font-weight:600}
.card b{font-size:15px;line-height:1.35}
.card p{margin:0;font-size:13.5px;color:var(--text-2);line-height:1.55}
.card .cap{margin-top:auto;padding-top:12px;border-top:1px solid var(--rule);
  font-size:12.5px;color:var(--text-2);font-style:italic;line-height:1.5}

/* chips */
.chip{display:inline-block;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;
  padding:4px 9px;border:1px solid currentColor;font-weight:600}
.c-do{color:var(--do)} .c-auto{color:var(--auto)} .c-wait{color:var(--wait)}

/* table */
.tbl-wrap{overflow-x:auto;border:1px solid var(--rule);background:var(--panel);box-shadow:var(--shadow)}
table{border-collapse:collapse;width:100%;min-width:640px;font-size:14.5px}
th,td{text-align:left;padding:14px 18px;border-bottom:1px solid var(--rule);vertical-align:top}
th{font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--text-2);
  font-weight:600;background:var(--cream-2)}
:root[data-theme="dark"] th{background:#241F1C}
@media (prefers-color-scheme:dark){th{background:#241F1C}}
tr:last-child td{border-bottom:0}
td.num{font-variant-numeric:tabular-nums;color:var(--text-2);width:1%;white-space:nowrap}
td b{font-weight:600}

/* flags */
.flags{display:grid;gap:12px}
.flag{background:var(--panel);border:1px solid var(--rule);border-left:3px solid var(--wait);
  padding:16px 20px}
.flag b{display:block;font-size:15px;margin-bottom:5px}
.flag p{margin:0;font-size:14px;color:var(--text-2);line-height:1.55}
.flag.ok{border-left-color:var(--auto)}

footer{border-top:1px solid var(--rule);padding:32px 0 64px;color:var(--text-2);font-size:13.5px}
a{color:var(--accent)}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
@media (prefers-reduced-motion:no-preference){
  .card,.habit{transition:transform .18s ease, box-shadow .18s ease}
  .card:hover,.habit:hover{transform:translateY(-2px)}
}
"""

def card(asset, tag, title, desc, caption):
    im = f'<img src="{A[asset]}" alt="{title}">' if A.get(asset) else ""
    return f"""<div class="card">{im}<div class="body">
      <span class="tag">{tag}</span><b>{title}</b><p>{desc}</p>
      <div class="cap">{caption}</div></div></div>"""

HTML = f"""<title>Hair by Sha — 30-Day Growth Plan</title>
<style>{CSS}</style>

<div class="top"><div class="wrap">
  <div class="eyebrow">Hair by Sha · Camberwell · 30-day plan</div>
  <h1 class="serif">Fill the chair, then keep it full.</h1>
  <p>Everything below is built to do two things: get more people booking, and get the
  ones who come back sooner. The referral emails already send themselves. This is the rest.</p>
  <div class="stat-row">
    <div class="stat"><b>6&ndash;8</b><span>Thu/Fri slots a week</span></div>
    <div class="stat"><b>161</b><span>Clients on the list</span></div>
    <div class="stat"><b>3</b><span>Emails already scheduled</span></div>
    <div class="stat"><b>7</b><span>Assets ready to post</span></div>
  </div>
</div></div>

<div class="wrap">

<section>
  <h2 class="serif">The five habits</h2>
  <p class="sub">If nothing else on this page happens, do these. The first one alone
  outperforms the entire email and social programme, and costs nothing.</p>
  <div class="habits">
    <div class="habit"><span class="n">01</span><b>Rebook in the chair</b>
      <p>Before they reach the counter, offer two named times. Never &ldquo;when suits you?&rdquo;
      &mdash; that ends in &ldquo;I'll text you.&rdquo;</p></div>
    <div class="habit"><span class="n">02</span><b>Set up Google Business Profile</b>
      <p>You're eligible as a chair renter. Put signage on your station first &mdash;
      verification depends on it.</p></div>
    <div class="habit"><span class="n">03</span><b>Email two days after</b>
      <p>Ask how it's sitting. Fix anything wrong. Then ask for the review.</p></div>
    <div class="habit"><span class="n">04</span><b>Email when colour is due</b>
      <p>Two named slots again. Root colour at 4&ndash;5 weeks, foils at 8&ndash;10,
      balayage at 10&ndash;14.</p></div>
    <div class="habit"><span class="n">05</span><b>Film everything</b>
      <p>Phone on a tripod, every colour service. Edit once a week in one 45-minute block.</p></div>
  </div>
</section>

<section>
  <h2 class="serif">Four weeks of content</h2>
  <p class="sub">Every image below is a finished file in <code>social-assets/out/</code> at full
  Instagram resolution &mdash; 1080&times;1350 for feed, 1080&times;1920 for stories and TikTok.
  All photography is real Hair by Sha client work. Captions are written; copy and paste them.</p>

  <div class="week">
    <div class="week-head"><h3>Week 1</h3><span class="when">Thursday &amp; Friday launch</span>
      <span class="chip c-auto">Referral email sends 4 Aug</span></div>
    <div class="cards">
      {card("feed-01-thursdays-fridays","Feed · Tue","Thursdays &amp; Fridays",
        "Lead with the capacity news. Strongest single image in the set.",
        "&ldquo;Two new days. Thursdays and Fridays are open &mdash; my quietest, so the appointment goes at your pace, not the diary's. Booking link in bio.&rdquo;")}
      {card("story-01-thursdays-fridays","Story · Tue","Same news, vertical",
        "Post to Story same day. Add a link sticker straight to Kairo.",
        "Add a poll: &ldquo;Which suits you better &mdash; Thursday morning or Friday afternoon?&rdquo;")}
      {card("feed-02-referral-offer","Feed · Sat","The referral offer",
        "Mirrors the email your clients just received. Reinforcement, not repetition.",
        "&ldquo;If anyone's ever asked who does your hair &mdash; send them my way. They get 10% off their first visit, you get 15% off your next. No codes. They just mention your name.&rdquo;")}
    </div>
  </div>

  <div class="week">
    <div class="week-head"><h3>Week 2</h3><span class="when">Grey blending</span>
      <span class="chip c-do">Highest-value untapped keyword</span></div>
    <div class="cards">
      {card("feed-03-grey-blending","Feed · Tue","Blending, not chasing",
        "Grey blending is on your site with no dedicated content anywhere. Low competition, high intent, older and higher-spend client.",
        "&ldquo;Coverage gives you a hard line in four weeks. Blending softens the grow-out so your regrowth stops being a deadline &mdash; most clients get eight to ten weeks instead of four.&rdquo;")}
      {card("feed-04-before-after-TEMPLATE","Feed · Thu","Before / after frame",
        "Reusable template. Drop your own before shot into the left panel &mdash; the after side and branding are done.",
        "&ldquo;Six months of grown-out box dye and a lot of &lsquo;I've just given up on it.&rsquo; We went dimensional rather than flat.&rdquo;")}
      {card("story-03-blonde-question","Story · Thu","Straight answer",
        "Honesty as positioning. Answering &lsquo;no&rsquo; publicly builds more trust than any testimonial.",
        "&ldquo;Ask me anything about your colour &mdash; I'll give you the honest answer, including when it's no.&rdquo;")}
    </div>
  </div>

  <div class="week">
    <div class="week-head"><h3>Week 3</h3><span class="when">Colour correction &amp; proof</span>
      <span class="chip c-auto">Referral reminder sends 19 Aug</span></div>
    <div class="cards">
      {card("story-02-review-ask","Story · Tue","Review ask",
        "Pair with the review email. Reviews are what stop Google filtering your listing out in favour of Hair Hut's 57.",
        "&ldquo;If I've done your hair and you were happy &mdash; a Google review takes a minute and it's genuinely how people find me. I don't run ads.&rdquo;")}
      {card("feed-04-before-after-TEMPLATE","Feed · Thu","Correction before / after",
        "Same template, correction work. This is your highest-ticket, highest-intent service.",
        "&ldquo;Box dye correction. Four hours, three processes, and a lot of patience. This is my favourite kind of appointment.&rdquo;")}
      {card("feed-01-thursdays-fridays","Feed · Sat","Availability, again",
        "Reposting availability is not repetition &mdash; only a fraction saw it the first time.",
        "&ldquo;Still a couple of Thursdays and Fridays open this month. They're the calm ones.&rdquo;")}
    </div>
  </div>

  <div class="week">
    <div class="week-head"><h3>Week 4</h3><span class="when">The person behind the chair</span>
      <span class="chip c-auto">Capacity close sends 25 Aug</span></div>
    <div class="cards">
      {card("story-03-blonde-question","Story · Tue","Q&amp;A round two",
        "Run an actual question sticker first, then answer the real ones. Far better than inventing questions.",
        "&ldquo;Anything you've always wanted to ask a colourist. No such thing as a silly one.&rdquo;")}
      {card("feed-02-referral-offer","Feed · Thu","Referral, final push",
        "Last reinforcement while the email campaign is still live.",
        "&ldquo;Last call on this &mdash; send someone my way this month and you'll both have something off.&rdquo;")}
      {card("feed-03-grey-blending","Feed · Sat","Grey blending, part two",
        "Your best-performing theme deserves a second angle. Reuse the frame, change the story.",
        "&ldquo;&lsquo;I'm not ready to be grey, but I'm tired of the four-week deadline.&rsquo; That's the exact brief blending solves.&rdquo;")}
    </div>
  </div>

  <p class="sub" style="margin-top:-18px"><b>Sha on camera is the one format I can't pre-make.</b>
  It's also the highest-trust content a one-chair salon has. One 20-second piece to camera a week,
  filmed on your phone, beats any designed graphic here.</p>
</section>

<section>
  <h2 class="serif">What to do, in order</h2>
  <p class="sub">Owner and effort against each. The first four are the ones that move bookings.</p>
  <div class="tbl-wrap"><table>
    <thead><tr><th></th><th>Task</th><th>Who</th><th>Effort</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td class="num">1</td><td><b>Google Business Profile.</b> Signage on the station first, then create the listing with your own hours and phone.</td><td>Sha</td><td>2 hrs</td><td><span class="chip c-do">Do first</span></td></tr>
      <tr><td class="num">2</td><td><b>Rebooking ask, every appointment.</b> Two named times.</td><td>Sha</td><td>0</td><td><span class="chip c-do">Do first</span></td></tr>
      <tr><td class="num">3</td><td><b>Google review link</b> into the review email template.</td><td>Sha</td><td>5 min</td><td><span class="chip c-wait">After #1</span></td></tr>
      <tr><td class="num">4</td><td><b>Send the review email</b> two days after each appointment.</td><td>Sha</td><td>90 sec each</td><td><span class="chip c-wait">After #3</span></td></tr>
      <tr><td class="num">5</td><td><b>Close both duplicate Fresha listings.</b> They still take bookings into a system you've left.</td><td>Sha</td><td>30 min</td><td><span class="chip c-do">This week</span></td></tr>
      <tr><td class="num">6</td><td><b>Point <code>@infusion_hair_</code> at <code>@hairbysha_c</code></b> &mdash; pinned post and bio link, or archive it.</td><td>Sha</td><td>20 min</td><td><span class="chip c-do">This week</span></td></tr>
      <tr><td class="num">7</td><td><b>Start the tally sheet.</b> Appointments this week, how many rebooked in-chair. Two numbers.</td><td>Sha</td><td>30 sec/day</td><td><span class="chip c-do">This week</span></td></tr>
      <tr><td class="num">8</td><td><b>Film every colour service.</b> Don't edit yet. Just capture.</td><td>Sha</td><td>0</td><td><span class="chip c-do">This week</span></td></tr>
      <tr><td class="num">9</td><td><b>Post the week 1 assets.</b> They're rendered and ready.</td><td>Sha</td><td>10 min</td><td><span class="chip c-do">This week</span></td></tr>
      <tr><td class="num">10</td><td><b>Rebooking emails</b> at each service's due mark.</td><td>Sha</td><td>25 min/wk</td><td><span class="chip c-auto">Week 3+</span></td></tr>
      <tr><td class="num">11</td><td><b>Verify site schema</b> survived the rebuild; run PageSpeed.</td><td>Dev</td><td>45 min</td><td><span class="chip c-wait">Needs site access</span></td></tr>
      <tr><td class="num">12</td><td><b>Service pages</b> &mdash; colour correction, grey blending, K18.</td><td>Dev + content</td><td>Month 2&ndash;3</td><td><span class="chip c-auto">Later</span></td></tr>
    </tbody>
  </table></div>
</section>

<section>
  <h2 class="serif">Before anything goes public</h2>
  <p class="sub">Confirmations and honest limits. Nothing here has been estimated or invented.</p>
  <div class="flags">
    <div class="flag ok"><b>Resolved &mdash; you're eligible for your own Google listing</b>
      <p>Renting a chair inside Hair Hut doesn't block it. You meet Google's practitioner test:
      clients ask for you by name, you set your own hours and prices. The real risk is Google's
      local filter hiding whichever listing has fewer reviews &mdash; Hair Hut has 57. That's why
      reviews are urgent, not optional.</p></div>
    <div class="flag ok"><b>Resolved &mdash; Kairo is the booking system, and the links are right</b>
      <p>All three scheduled emails and both retention templates point at it correctly.</p></div>
    <div class="flag"><b>Retention can't be measured yet</b>
      <p>Kairo was just installed, so there's no history. A real retention rate needs one full
      colour cycle, 8&ndash;14 weeks. Targets are set forward from now. The lapsed win-back email
      stays parked until roughly six months of history exists.</p></div>
    <div class="flag"><b>Testimonials must be real</b>
      <p>The earlier site build carried placeholders explicitly marked for replacement.
      Don't publish any quote that isn't a real, attributable client.</p></div>
    <div class="flag"><b>Confirm &ldquo;20+ years&rdquo; and &ldquo;K18 certified&rdquo;</b>
      <p>Both are on the live site. Certification claims carry real risk if challenged &mdash;
      make sure the documentation exists.</p></div>
    <div class="flag"><b>Client consent on before/after photos</b>
      <p>Confirm for each image before it goes to social.</p></div>
  </div>
</section>

<footer><div class="wrap" style="padding:0">
  Hair by Sha · 1 Prospect Hill Rd, Camberwell VIC 3124 · 0452 611 799<br>
  Full detail in the growth plan documents. Assets in <code>social-assets/out/</code>.
  Photography is real client work &mdash; no stock, no AI-generated hair.
</div></footer>

</div>
"""

DEST.write_text(HTML)
print(f"\n{DEST}  {len(HTML)//1024} KB")
