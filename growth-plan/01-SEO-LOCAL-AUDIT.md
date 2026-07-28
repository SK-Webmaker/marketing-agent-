# Pillar 1 — SEO & Local Discovery Audit
**Specialist: SEO & Local Discovery** · Hair by Sha, Camberwell VIC · 28 July 2026

---

## Read this first: what I could and could not verify

Direct HTTP access to `hairbyshacamberwell.com` is blocked by this environment's network policy. Everything below is grounded in **search-engine-indexed content** (live, real) plus a local copy of an earlier version of the site. Nothing is assumed.

**Critical finding before anything else:** the site source I hold locally is **not the live site**. The live site shows "20+ years' experience", "K18 certified", "grey blending", and booking on **Kairo**. The local copy has none of those, uses different meta, and points at Fresha. The site has been rebuilt or substantially rewritten since that copy.

| | Local copy (stale) | Live site (indexed) |
|---|---|---|
| Title | `Hair by Sha — Boutique Hair Salon, Camberwell Melbourne` | `Hair by Sha \| Hair Colour Specialist Camberwell Melbourne` |
| Positioning | "boutique salon experience" | "expert hair colour specialist, 20+ years" |
| Services | balayage, blonde, colour, cuts, care | K18 foils, balayage, grey blending, cuts, colour correction, bridal |
| Booking | Fresha | Kairo |

**The live title is better than the old one.** `Hair Colour Specialist Camberwell Melbourne` targets the actual money keyword. Whoever wrote it did the right thing. Keep it.

### What I need from you to complete this audit
These cannot be inferred and I will not invent them:

1. **Access to the live site source or a crawl** (or unblock the domain) — needed for image alt text, heading hierarchy, internal linking, schema validation.
2. **Google Search Console access** — indexing status, actual query data, click-through rates.
3. **PageSpeed / Core Web Vitals** — run `pagespeed.web.dev` on the homepage and send me the LCP/CLS/INP numbers.
4. **Google Business Profile** — does one exist? See §3, this is the single biggest gap.

---

## 1. The headline problem: you are invisible in local search

I searched the way a real customer would. Here is what actually happens.

**Searching "Hair by Sha Camberwell" surfaces, in order:** two Fresha listings, the old Instagram, the website. **No Google Business Profile appeared in any search I ran.**

For a local service business, Google Business Profile *is* local SEO. It drives the map pack, "near me" results, and the knowledge panel. A salon without one is close to invisible for "hairdresser near me" — which is how most new clients search.

**This is the highest-value fix available and it is free.**

## 2. You are being outranked at your own address

`1 Prospect Hill Rd, Camberwell` returns **Camberwell Hair Salon (By Your Hair Hut)** — 4.7 stars, **57 reviews** — as the dominant business at that address. They have a Linktree, a Fresha listing, a Birdeye review profile, and an australia247 directory entry.

Hair by Sha appears at the same address with no comparable review presence.

Whether Your Hair Hut is the host salon Sha operates within, or a genuinely separate co-located business, the SEO effect is the same: **Google's entity resolution favours them.** Two businesses at one address, one with 57 reviews and one with almost none, means the review-rich entity wins the map pack.

> ⚠️ **Needs your confirmation:** what is the actual relationship between Hair by Sha and Your Hair Hut / Camberwell Hair Salon? Chair rental, sub-lease, former employer, unrelated neighbour? The fix is completely different depending on the answer, and I am not going to guess about a real business relationship.

## 3. Duplicate and competing listings

| Listing | Status | Problem |
|---|---|---|
| Fresha listing A (`...prospect-hill-road-i1nq0ttb`) | live | Duplicate |
| Fresha listing B (`...1-prospect-hill-rd-prospect-hill-road-gla3dq2c`) | live | Duplicate |
| Kairo (current booking system) | live on site | Correct destination |
| Instagram `@infusion_hair_` | live, still indexed | Old handle, splits brand equity |
| Instagram `@hairbysha_c` | live, correct | Current |

**Two live Fresha listings** split reviews and confuse NAP consistency. Worse, both still send bookings to a system the site no longer uses. A client who finds Fresha books into the wrong place.

**The old Instagram still ranks** for "Hair by Sha Camberwell". Anyone told "look up Hair by Sha" may land on the dormant account, see stale content, and bounce.

## 4. On-page: what I can verify

The live homepage is doing several things right:

- **Title tag** targets the commercial keyword properly.
- **Copy is specific and differentiated**: "20+ years", "K18 certified", "grey blending", "for busy professionals". That last phrase is a genuine ICP signal and rare in salon copy.
- **Service descriptions read like a specialist, not a directory listing** — "the full journey to blonde includes foils, toner and a K18 bond treatment"; "low-maintenance colour plan". This is good, intent-matching content.
- **Pricing transparency is handled honestly** — "starting guide, final pricing tailored to your hair length, thickness and finish".

The earlier version carried valid `HairSalon` schema with address, phone and geo. **Needs verification that this survived the rebuild** — schema is easy to lose in a redesign and it drives rich results.

## 5. Keyword opportunity

The site currently targets the head term. The gap is the **long tail that converts**, where a one-chair specialist can realistically rank against multi-stylist salons:

| Priority | Keyword theme | Why it fits |
|---|---|---|
| High | `grey blending Camberwell` / `grey coverage Melbourne` | Explicitly on the live site, low competition, high-intent, older/higher-spend client |
| High | `K18 treatment Melbourne` / `K18 salon near me` | Branded product search, few local salons certified, buyer already educated |
| High | `colour correction Camberwell` | High-ticket, urgent intent, low volume but extremely high conversion |
| Medium | `balayage Camberwell` | Competitive but core service |
| Medium | `hair colour specialist Camberwell Junction` | "Moments from Camberwell Junction" already appears in your content |
| Low | `bridal hair Camberwell` | Seasonal, worth a page eventually |

**Colour correction and grey blending are the two most underexploited.** Both are high-margin, both are on the site already with no dedicated page, and both attract clients who become long-term retainers — which is exactly the retention goal.

## 6. Competitor scan

⚠️ **Verification note:** my first search surfaced "Hiikuss Hair Salon Camberwell" with 986 reviews. On checking, **that salon is in Camberwell, London** — an Afro-Caribbean specialist in South London, not a Melbourne competitor. I excluded it. Flagging this because the Camberwell name collision will pollute any keyword or competitor research you run, and it is an easy trap.

| Competitor | Position | Strength | Where Sha wins |
|---|---|---|---|
| **Camberwell Hair Salon / Your Hair Hut** — 1 Prospect Hill Rd (same address) | 4.7★, 57 reviews | Review volume, directory presence, Linktree, owns the address in Google's eyes | Specialism. They read as a general salon; Sha is a colour specialist with 20+ years and K18 certification. |
| **Second Avenue Hair & Beauty** — Rear of 614 Burke Rd | Established 1992, own domain `secondave.com.au` | Longevity, brand recognition, positions on "seamless blondes, platinum, soft balayage" | One-to-one service. Second Ave is a multi-chair salon; Sha's differentiator is the whole room to yourself. |
| **Generic Camberwell salons** (Bookwell/Fresha directory pool) | Aggregator-dependent | Volume via marketplaces | Direct booking + owned website + named stylist relationship |

**Strategic read:** you will not out-review Your Hair Hut quickly, and you should not try to out-generalise Second Avenue. The winnable position is **narrow specialist** — the person in Camberwell you go to specifically for colour, correction and grey blending, not for a haircut on a Saturday.

---

## Prioritised fix list

### Quick wins — this week, minimal cost

| # | Fix | Why | Owner |
|---|---|---|---|
| 1 | **Create/claim Google Business Profile.** Category "Hair Salon" + secondary "Hairdresser". Exact NAP: `Hair by Sha, 1 Prospect Hill Rd, Camberwell VIC 3124, 0452 611 799`. Add hours including the new Thu/Fri. | Biggest single local visibility gap. Free. | Sha |
| 2 | **Kill or redirect the duplicate Fresha listings.** Pick one, close the other, and point the survivor's booking link at Kairo. | Bookings are leaking to a dead system | Sha |
| 3 | **Decide the fate of `@infusion_hair_`.** Either put a pinned post + bio link directing to `@hairbysha_c`, or rename/archive it. | Stops splitting brand equity and losing referred traffic | Content Lead |
| 4 | **Verify `HairSalon` schema survived the rebuild.** Test at `search.google.com/test/rich-results`. Add `aggregateRating` only once real reviews exist. | Drives rich results, easy to lose in redesign | Dev |
| 5 | **Run PageSpeed on the homepage** and send me the numbers. The old build used a heavy animation stack (Framer Motion + Lenis smooth scroll), which is a common LCP/INP risk. | Can't fix what isn't measured | Dev |
| 6 | **Add the Google review link to every touchpoint** — booking confirmation, post-appointment email, Instagram bio. | Review count is the direct lever on the map pack | Sha |

### Strategic investments — next 1–3 months

| # | Investment | Why | Effort |
|---|---|---|---|
| 7 | **Dedicated service pages** for Colour Correction, Grey Blending, and K18 Treatment | Three highest-intent, lowest-competition terms. One page each, 600–900 words, real before/after photos, priced honestly. | Medium |
| 8 | **Google review engine** — target 25+ reviews in 90 days | Only durable way to compete with a 57-review neighbour at the same address. See the email sequence in Pillar 3. | Ongoing |
| 9 | **Resolve the shared-address entity problem** | Depends on your answer to §2. May need a suite/unit number on GBP to distinguish the two businesses. | Depends |
| 10 | **Local content: "Camberwell Junction" geographic anchor** | Already in your copy. Build on it — being findable for the junction, not just the suburb. | Low, ongoing |
| 11 | **Reclaim the `@infusion_hair_` audience properly** | That account has real accumulated followers. Migrate them deliberately rather than abandoning them. | Low |

---

## What success looks like for this pillar

⚠️ **Baselines needed from you before targets mean anything.** I will not invent numbers.

| Metric | Baseline | 90-day target | Source |
|---|---|---|---|
| Google Business Profile — exists? | **unknown, likely none** | Live, verified, 20+ photos | GBP |
| Google reviews | **unknown** | 25+ | GBP |
| Map pack presence for "hairdresser Camberwell" | **unknown** | Top 3 | Manual check |
| Organic sessions | **need GSC** | +40% | Search Console |
| Bookings attributed to organic/GBP | **need Kairo data** | Establish baseline first | Kairo |

**Send me:** Search Console access (or a screenshot of the last 3 months' queries), the PageSpeed numbers, current Google review count, and confirmation on the Your Hair Hut relationship. With those, this becomes a measurable plan rather than a directional one.
