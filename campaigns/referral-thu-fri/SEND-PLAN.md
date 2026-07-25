# Send Plan — Referral campaign (Thursday/Friday capacity)

**Goal:** fill Sha's newly-opened Thursday and Friday appointments.
**Mechanism:** word-of-mouth referral. Referrer gets 15% off their next visit; new client gets 10% off their first. Reward is only released after the new client attends.
**Channel:** Resend broadcast to the existing client list, plus two triggered one-to-one emails.

---

## 1. Subject lines & preview text

Test the primary against the alternate on the first send. Everything after that uses the winner's tone.

### Email 1 — Announcement

| | |
|---|---|
| **Primary subject** | `"Who does your hair?"` |
| **Alternate (A/B)** | `I've never properly thanked you for this` |
| **Third option** | `A thank you — 15% for you, 10% for them` |
| **Preview text** | `You get asked it all the time. From now on, the answer is worth something.` |

The primary is a question the reader genuinely gets asked by other people — it creates a small jolt of recognition in the inbox. The alternate trades curiosity for warmth; worth testing because this list is a relationship list, not a promo list.

### Email 2 — Reminder

| | |
|---|---|
| **Primary subject** | `Think of one person` |
| **Alternate** | `One name is all it takes` |
| **Preview text** | `Not a list. Not a campaign. Just one person you already had in mind.` |

### Email 3 — Capacity / close

| | |
|---|---|
| **Primary subject** | `The two quietest days in my week` |
| **Alternate** | `Thursdays and Fridays, while they're still open` |
| **Preview text** | `Space, no clock-watching, and the whole room to yourself.` |

### Email 4 — New client welcome *(triggered)*

| | |
|---|---|
| **Subject** | `You're booked in, {{NEW_CLIENT_NAME}}` |
| **Preview text** | `Your 10% is already on your booking — here's what to expect.` |

### Email 5 — Referrer reward ready *(triggered)*

| | |
|---|---|
| **Subject** | `{{NEW_CLIENT_NAME}} came in — your 15% is ready` |
| **Preview text** | `Nothing to print, nothing to quote. I'll take it off before you pay.` |

### Sender identity

Use `Sha — Hair by Sha <sha@hairbyshacamberwell.com>`. A personal first name in the From field is the single biggest open-rate lever on a list like this. **Do not** send from `no-reply@` — email 3 explicitly invites replies, and replies are a booking channel.

---

## 2. Schedule

Send Tuesday or Wednesday mid-morning (9:30–10:30am AEST). Avoid Thursday and Friday sends — those are now working days in the chair.

| # | Email | When | Audience |
|---|---|---|---|
| 1 | Announcement | Day 0, Tue 10am | All clients seen in the last 18 months |
| 2 | Reminder | Day 8, Wed 10am | Opened #1 but hasn't referred, **plus** non-openers (resend #1 with the alternate subject) |
| 3 | Capacity / close | Day 18, Tue 10am | Everyone still on list who hasn't booked since day 0 |
| 4 | New client welcome | On booking | Referred new clients only |
| 5 | Reward ready | Within 24h of the new client's appointment | The referrer |

Emails 4 and 5 are the ones that make the program actually work. Email 5 is the highest-value message in the set for the Thursday/Friday goal — it hands an existing client a concrete, already-earned reason to rebook.

### Suppression rules
- Exclude anyone with a booking already in the diary for the next 14 days from email 3's booking push (they'll feel spammed) — or send them email 3 with the referral block only.
- Anyone who refers someone drops out of emails 2 and 3 and into email 5's flow.

---

## 3. Resend setup

1. **Domain auth first.** SPF, DKIM and DMARC on `hairbyshacamberwell.com` before any broadcast. Without it a 300-person send to Gmail/Outlook will land in Promotions at best.
2. **Warm gently.** If the domain has never sent bulk mail, send email 1 in three batches over three days (~⅓ of the list each) rather than all at once.
3. **Unsubscribe.** Replace `{{UNSUBSCRIBE}}` with Resend's `{{{RESEND_UNSUBSCRIBE_URL}}}` merge tag. Required by law (Spam Act 2003) and by Gmail/Yahoo bulk sender rules.
4. **Always send both parts.** Attach the `.txt` alongside the `.html` — a plain-text alternative measurably improves inbox placement.
5. **Physical address** is already in every footer. Keep it there; it's a legal requirement.

### Build

```bash
node build.mjs --assets https://hairbyshacamberwell.com/email/referral
```

Outputs send-ready files to `dist/`. Paste the HTML into Resend's broadcast editor (or pass it via the API).

### Image hosting

Images **must** be at absolute public URLs — embedded/base64 images are stripped by Gmail. Upload everything in `assets/email/` to a public path and point `--assets` at it.

> Not verified from this environment: `hairbyshacamberwell.com` was unreachable behind the sandbox's network policy, so the default asset base is an assumption. Confirm the real path before sending, and send yourself a test first.

Every image has real `alt` text and no message depends on images loading — roughly a third of recipients will see the text-only version first.

---

## 4. Pre-send checklist

- [ ] SPF / DKIM / DMARC verified in Resend
- [ ] Assets uploaded; every image loads over HTTPS from the live URL
- [ ] Test send to Gmail, Outlook, and an iPhone — check the offer block stacks correctly on the phone
- [ ] "Send it as a text" link opens the messages app with the text pre-written (test on a real iPhone **and** an Android)
- [ ] Fresha booking link opens the right calendar and Thursday/Friday slots are actually released and bookable
- [ ] Unsubscribe link works
- [ ] Phone number `0452 611 799` confirmed correct *(currently sourced from Instagram — verify)*
- [ ] Sha has the tracking sheet open and knows the five steps (see `REFERRAL-SOP.md`)

---

## 5. What to measure

Track these in a single sheet; nothing here needs software.

| Metric | Where from | Healthy for a list like this |
|---|---|---|
| Open rate | Resend | 35–50% (warm personal list) |
| Click rate | Resend | 3–8% |
| Referrals named | Tracking sheet | — |
| Referral → attended | Tracking sheet | 50–70% of named referrals |
| **Thu/Fri appointments booked** | Fresha | **the actual goal** |
| Rewards redeemed | Tracking sheet | 60%+ within 12 weeks |

The number that decides whether this worked is *Thursday and Friday appointments booked in the 8 weeks after send* — not opens.

### Expected scale, honestly

On a warm single-stylist list, 2–5% of recipients typically refer someone within a campaign window. On a 300-person list that's roughly **6–15 referrals**, of which perhaps 4–10 attend. Add the rebookings triggered by email 5 and the direct Thu/Fri bookings from emails 1–3, and a realistic outcome is **15–30 filled Thursday/Friday slots over 8 weeks**. Good, not transformative — referral programs compound over quarters, not weeks. Keep it running permanently rather than treating it as a one-off.

---

## 6. Offer scope — settled

The offer stands exactly as specified: **15% / 10%, no codes, reward after attendance, both discounts valid on any day.**

Restricting the new client's 10% to Thursday/Friday was considered and **rejected on sound grounds**: Fresha won't surface a day that's already booked out, so the booking system does the steering on its own. A discount restriction would add friction and a reason to say no, without adding any capacity control the calendar isn't already providing.

The Thu/Fri push therefore lives entirely in the copy and in what Sha offers verbally — which is where it belongs. See `REFERRAL-SOP.md` → *Where the Thursday/Friday goal fits*: offering the day out loud ("I've got a lovely quiet Thursday morning, or a Friday at two — which suits?") does more work than any discount rule.
