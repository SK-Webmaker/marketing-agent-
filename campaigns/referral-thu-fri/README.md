# Hair by Sha — Referral Campaign

Fills Sha's newly-opened **Thursday and Friday** appointments by turning existing clients into referrers.

**Offer:** referrer gets 15% off their next appointment · new client gets 10% off their first · reward released only after the new client attends · no codes, no links, no forms.

---

## What's here

```
emails/          source HTML + plain-text, with {{PLACEHOLDERS}}
dist/            send-ready output (run build.mjs)
assets/          original photography
assets/email/    cropped + graded images to upload
previews/        desktop & mobile screenshots of every email
design-tests/    the three rejected design directions
CAMPAIGN-STRATEGY.md  the full plan: all five levers, 8-week calendar, scripts
SEND-PLAN.md          subject lines, schedule, Resend setup, metrics
REFERRAL-SOP.md       how Sha runs the program day to day
referral-tracker.csv
```

## The six emails

| # | File | Type | Job |
|---|---|---|---|
| 1 | `01-announcement` | Broadcast, day 0 | Announce the thank-you. Full design, photo-led. |
| 2 | `02-reminder` | Broadcast, day 8 | "Think of one person." Activation, not information. |
| 3 | `03-last-call` | Broadcast, day 18 | Thu/Fri capacity. Booking-led; referral secondary. |
| 4 | `04-new-client-welcome` | Triggered, on booking | Confirm the 10%, reduce no-shows, set the tone. |
| 5 | `05-reward-ready` | Triggered, after attendance | Close the loop and convert the reward into a Thu/Fri booking. |
| 6 | `06-lapsed-reactivation` | Broadcast, week 2 | Win back 6+ month lapsed clients. No discount, by design. |

Emails 4 and 5 are what make the program work rather than just announce it. **Email 5 is the highest-value message in the set for the capacity goal** — it hands an existing client an already-earned reason to rebook.

**Start with `CAMPAIGN-STRATEGY.md`.** The referral campaign delivers roughly 15–30 of the ~50–65 appointment slots the goal actually requires; the strategy document covers the other levers needed to close that gap — chiefly rebooking clients onto Thu/Fri at the chair, which outperforms the entire email campaign and costs nothing.

## Build & preview

```bash
python3 build-assets.py                    # crop + grade images from source photos
node build.mjs --assets https://…          # write send-ready files to dist/
node render.mjs emails/*.html              # screenshot desktop + mobile to previews/
```

---

## Design decisions

**Live HTML text, not an image.** The message and both CTAs are real text, not baked into a picture. Around a third of recipients see images-off on first open, image-only emails are a spam-filter signal, and text stays sharp on every screen. Photography supports the message; it never carries it.

**Real photography only.** Every image is Sha's actual client work. No AI-generated hair — fabricating results in a hair salon's marketing is both dishonest and instantly recognisable as generated, which is precisely the "AI slop" look to avoid. Images were cropped and warm-graded to sit in the brand palette; nothing was invented.

**Brand-exact.** Palette and type are lifted from the live site's design tokens: ink `#1A1614`, cream `#FAF8F5`, sand `#E6DFD6`, bronze `#AF7F55`; Fraunces → Georgia and Outfit → Helvetica as email-safe fallbacks. Square corners throughout, because `--radius: 0rem` is a defining trait of the brand.

**A pre-written text message as the primary CTA.** The referrer's action isn't clickable — "tell someone" happens offline. So the hero CTA opens their messages app with the referral already typed. The same words appear as visible text for desktop readers, who can copy them. This keeps the promised mechanic intact: the friend still just mentions a name.

**Table-based, 600px, inline styles.** Renders in Outlook. Media queries stack the two-column offer block cleanly on mobile; every email was rendered and checked at 390px with no horizontal overflow.

### Rejected directions

Three full variants were built and rendered before the final was assembled — see `design-tests/` and `previews/`.

| Variant | Verdict |
|---|---|
| **A — Editorial letter** (cream, photo-led) | **Basis of the final.** Matches the site's actual warmth, shows the work, left-aligned copy scans well. |
| **B — The invitation** (typographic, centred) | Most beautiful, least persuasive. Never shows a single result — fatal for a hair salon. Its "Who does your hair?" headline was kept. |
| **C — Dark luxe** (ink-dominant) | Striking, but fights the brand (the site is cream), risks forced dark-mode inversion, and reads colder than a referral ask should. |

The final combines A's layout, B's headline and framed offer block, and drops the three-photo strip — the images were tonally mismatched and repetitive, and added length without persuasive work.

### Image tools — tested, not used

The brief asked to trial Canva, Higgsfield and Picsart and pick the best.

All three are *connected* — the blockers were account-level, not connection-level:

| Tool | Blocker | Fix |
|---|---|---|
| **Canva** | Free-plan monthly AI/API quota exhausted | Resets monthly. Check Settings → Menu → Subscription → AI usage, or upgrade. |
| **Higgsfield** | Free plan, 0 credits, single workspace | Top up credits or upgrade the plan. |
| **Picsart** | Connected but toggled **off for this chat** | Enable it in the chat's connector settings. |

Assets were instead composed locally with Pillow (crop, warm grade, compress) from Sha's real photographs, which is the better answer regardless of availability: it gives exact brand control and keeps every depicted result genuine. If Canva credits are restored later, the natural use is a matching Instagram post and story to run alongside the email — not the email itself.

---

## Settled

- **Phone number `0452 611 799` — confirmed correct** by the owner. The site source's "verify before launch" note can be cleared.
- **Offer scope — confirmed as specified.** Both discounts stay valid any day. Restricting the new client's 10% to Thu/Fri was rejected: Fresha won't show a day that's already booked out, so the calendar handles capacity without adding friction to the offer. See `SEND-PLAN.md` §6.

## Open items

- **Confirm the image host path.** `hairbyshacamberwell.com` was unreachable from the build environment (network policy), so the default asset base in `build.mjs` is an assumption.
- **Replace the site's placeholder testimonials** with real Google/Fresha reviews before using any social proof in marketing.
