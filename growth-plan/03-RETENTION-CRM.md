# Pillar 3 — Retention & CRM
**Specialist: Retention & CRM** · Hair by Sha · 28 July 2026

---

## Scope: what is deliberately NOT here

You flagged that referral and lapsed-client win-back are already built. They are, and I have not rebuilt them. Already live in Resend from the previous engagement:

| Already done | Status |
|---|---|
| Referral announcement, reminder, capacity close | 3 broadcasts scheduled 4 / 19 / 25 Aug |
| Referral new-client welcome | Template `referral-new-client-welcome` |
| Referral reward-ready | Template `referral-reward-ready` |
| Lapsed win-back | Written, deliberately not scheduled (no last-visit data) |

**This pillar covers the two lifecycle emails that did not exist**, both of which are the highest-leverage remaining sends for a colour salon:

1. **Review request** — 2 days post-appointment
2. **Rebooking prompt** — at the colour-due mark

These are not filler. The review email feeds directly into the biggest gap the SEO audit found (no Google Business Profile, no review volume, out-ranked at your own address by a 57-review neighbour). The rebooking email attacks retention directly, which is half the stated objective.

---

## Why these two, and why in this order

A colour client's lifecycle has exactly two moments where a well-timed email changes revenue:

**Day 2 — the verdict moment.** The first wash has happened. They've styled it themselves once. This is when a client silently decides whether they're coming back. Catching a problem here converts a quiet non-returner into a loyal client. Catching a happy client here converts them into a review.

**Week 6–10 — the drift moment.** Regrowth becomes visible. The client either books, or postpones and drifts. Salon churn is almost never a decision; it's a postponement that never got reversed. One email at the right week is the difference.

Everything else in the lifecycle is noise by comparison.

---

## Email R1 — Review request

**Sent:** 2 days after the appointment
**Template alias:** `review-request` · **published and live in Resend**
**Subject:** `How's it sitting?`

### The design logic

It opens by **inviting complaints before asking for praise.** That ordering is deliberate and it matters:

- An unhappy client gets a private route to say so instead of leaving a 3-star review. You catch the problem.
- A happy client has to actively register their own satisfaction before the ask lands, which makes the review far more likely.
- It reads like a craftsperson who cares, not a business farming ratings.

Offering to fix work free of charge is stated plainly. For a specialist charging premium colour prices, that is a confidence signal, not a liability.

The review ask is justified honestly: *"I don't run ads. Reviews are how people find me."* True, specific, and it gives the client a reason that isn't "help my metrics."

### Live copy

> Hi {{CLIENT_NAME}},
>
> Two days in is usually when you really know. The first wash is done, you've styled it yourself once, and it either behaves or it doesn't.
>
> So, honestly: how is {{SERVICE}} sitting?
>
> If something isn't right, tell me. Reply to this email and say what's bothering you. Toner sitting warmer than you wanted, a section that won't sit flat, anything. I'd far rather fix it than have you live with it, and I don't charge to put my own work right.
>
> And if you're happy with it, could I ask you something small?
>
> **Leave me a Google review**
>
> It takes about a minute and it genuinely changes which salon comes up when someone in Camberwell searches for a colourist. I don't run ads. Reviews are how people find me.
>
> Either way, thank you for your time in the chair.
>
> Sha

**Variables:** `CLIENT_NAME` · `SERVICE` · `REVIEW_LINK`

> ⚠️ **Blocked until you send me one thing:** the `REVIEW_LINK` currently falls back to the website. It needs your **Google review short link**, which only exists once the Google Business Profile is live (Pillar 1, quick win #1). Until then this email works but the ask goes nowhere useful.

---

## Email R2 — Rebooking prompt

**Sent:** at the client's colour-due mark (see cadence table below)
**Template alias:** `rebooking-prompt` · **published and live in Resend**
**Subject:** `You're about due`

### The design logic

**It offers two specific slots, not an open question.** This is the single highest-impact mechanic in the whole retention system. "When suits you?" hands the client work and reliably produces "I'll text you," which never comes. Two named times converts dramatically better.

It also gives explicit permission to decline (*"if you'd rather stretch it out, that's completely fine"*). Counter-intuitively this raises response rates — it removes the pressure that makes people ignore the email entirely — and it protects the relationship with clients on a budget.

It steers toward Thursday and Friday, tying retention directly into the capacity goal.

### Live copy

> Hi {{CLIENT_NAME}},
>
> It's been {{WEEKS_SINCE}} since I did {{SERVICE}}, which puts you about due. Not urgent, just the point where most people start noticing the regrowth in the bathroom mirror before anyone else does.
>
> I've held two that would suit you:
>
> {{SLOT_ONE}}
> {{SLOT_TWO}}
>
> Reply with whichever works and I'll put it in. If neither does, tell me roughly when suits and I'll find something.
>
> Worth knowing: Thursdays and Fridays are my quietest days at the moment, so those appointments are the unhurried ones. Whole room to yourself.
>
> And if you'd rather stretch it out a bit longer, that's completely fine. Tell me and I'll check back in a few weeks instead.
>
> Sha

**Variables:** `CLIENT_NAME` · `SERVICE` · `WEEKS_SINCE` · `SLOT_ONE` · `SLOT_TWO`

### Send timing by service

Send at the **lower end** of each range. Early is recoverable; late means they've already booked elsewhere.

| Service | Send at | Reasoning |
|---|---|---|
| Root colour / grey blending | **4–5 weeks** | Regrowth is visible fastest and most bothersome |
| Foils / partial foils | **8–10 weeks** | The site's own copy positions this as the low-effort year-round option |
| Balayage | **10–14 weeks** | Explicitly sold as "low-maintenance colour plan" |
| Cut only | **6–8 weeks** | Shape loss |
| K18 / treatment | **6 weeks** | Pairs naturally with the next colour visit |

---

## The honest limitation

Both emails are **one-to-one sends, not automated broadcasts**, because they depend on per-client data Resend does not hold: what service they had, when, and which two slots are free.

**This is a manual send from a published template.** Roughly 90 seconds per client. For a one-chair salon seeing 15–20 clients a week, that is about 25 minutes a week total, and it is the highest-return 25 minutes in the business.

### To automate it properly, one thing has to change

Resend cannot trigger from appointments it cannot see. Real automation needs **Kairo booking data flowing into Resend** — either a native integration, a Zapier/Make bridge, or a webhook from the booking app.

> ⚠️ **Needs your input:** does Kairo expose webhooks, a Zapier integration, or an API? If yes, both of these become fully automatic and the manual step disappears. If you built `hairbysha-booking.onrender.com` yourself, this is straightforward — it can POST to Resend on appointment completion. Tell me which and I'll build it.

Until then: a weekly 25-minute block, Monday morning, working from the appointment list.

---

## Retention system beyond email

Email is one layer. The others cost nothing and matter more:

| Lever | Mechanism | Why |
|---|---|---|
| **Rebook in the chair** | Before they reach the counter, offer two named times | Beats every email. Already documented in the referral SOP. |
| **Colour plan, stated out loud** | "You'll want me again around week eight" | Sets the expectation of a cycle, not a one-off |
| **Note the personal detail** | Record one non-hair thing per client and open with it next time | Single strongest driver of loyalty in one-chair salons |
| **Home-care follow-through** | Tie K18 aftercare to the next visit | Protects the result, justifies the price, creates a reason to return |

---

## Success metrics — revised for reality

**✅ RESOLVED (confirmed by owner): Kairo was only just installed, and is now the main booking system.**

That is a material constraint and it changes this section honestly:

- **There is no usable history.** A 12-month export does not exist. Retention rate, average visit gap and true lapsed counts **cannot be calculated today**, and I am not going to model them from nothing.
- **Retention is a trailing metric.** Even with perfect data collection from today, a meaningful repeat rate for colour clients needs **8–14 weeks minimum** — one full cycle. A 90-day retention target measured from now would be measuring an incomplete cycle.

### So measure forward, not backward

| Phase | Window | What to measure |
|---|---|---|
| **Baseline build** | Weeks 1–8 | Just capture cleanly. Every appointment in Kairo with client, service, date. No targets. |
| **First read** | Weeks 8–12 | First real rebooking rate. This becomes the baseline everything else is judged against. |
| **Improvement** | Month 4+ | Now targets mean something |

### Measurable from day one (no history required)

These work immediately because they count events, not ratios against a past:

| Metric | Target from week 1 | Source |
|---|---|---|
| **Rebook-in-chair rate** | 40%+ of appointments leave with the next one booked | Tally on paper, or Kairo |
| **Google reviews** | 25+ in 90 days | GBP |
| **Review request → review** | 20–30% | Manual count |
| **R2 rebooking prompt → booking** | 30%+ reply rate | Reply count |
| **Thu/Fri slots filled per week** | 6–8 | Kairo |

### Deliberately deferred until data exists

- Retention rate — needs one full colour cycle
- Average weeks between visits — needs 2+ visits per client in Kairo
- **Lapsed segment and the win-back email** — needs last-visit dates. **Realistically 6+ months away**, since "lapsed" means not seen in 6 months and Kairo has no history to establish that.

> The 161 contacts already in Resend are the historical client list, but they carry **no last-visit date**, so they cannot be segmented by recency either. This is why the win-back email stays parked.

**One thing worth doing now:** start a simple tally sheet — appointments this week, how many rebooked in-chair. Two numbers, thirty seconds a day. That gives a usable baseline in a fortnight without waiting on Kairo reporting to mature.
