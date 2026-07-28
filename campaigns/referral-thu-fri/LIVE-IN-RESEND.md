# What is live in Resend

Set up 28 July 2026. Nothing further needs doing in the dashboard: the three broadcasts below send themselves.

---

## Scheduled broadcasts

All send to the **All Clients** segment (161 contacts), from `Sha from Hair by Sha <sha@mail.hairbyshacamberwell.com>`, reply-to `shamalkaskiridena@gmail.com`. Times are 10:30am Melbourne (00:30 UTC).

| When | Email | Subject |
|---|---|---|
| **Tue 4 Aug 2026** | 01 Announcement (plain text style) | `Who does your hair?` |
| **Wed 19 Aug 2026** | 02 Reminder | `Think of one person` |
| **Tue 25 Aug 2026** | 03 Capacity close | `The two quietest days in my week` |

Email 1 is the **plain version**, deliberately: no images, two links, 2.7 KB. It reads like a personal note, which is the best available shot at the Gmail Primary tab, and it carries the P.S. asking readers to drag it across or reply. See `INBOX-PLACEMENT.md`.

Emails 2 and 3 are the full designed versions. By the time they land, a portion of the list will have replied or moved the sender, which improves placement on its own.

### Note on the 30-day scheduling cap
Resend will not accept a `scheduled_at` more than 30 days out. Email 3 was therefore set to **25 Aug** rather than the 1 Sep in the original 8-week plan. The sequence is slightly tighter than designed but the order and spacing still work.

---

## Published templates (triggered, one-to-one)

These have no fixed date because they depend on a real referral happening. Both are published and ready to send from Resend → Templates in a couple of clicks.

| Template | Alias | Send when |
|---|---|---|
| 04 New client welcome | `referral-new-client-welcome` | A referred client books |
| 05 Referral reward ready | `referral-reward-ready` | **Within 24h** of the referred client attending |

Variables fill in automatically with sensible fallbacks:

- `NEW_CLIENT_NAME` (fallback "there" / "Your friend")
- `REFERRER_NAME` (fallback "your friend" / "there")
- `APPT_DAY_TIME` (fallback "your upcoming appointment") — template 04 only

**Email 05 is the highest-value message in the whole campaign for the capacity goal.** It hands an existing client an already-earned reason to rebook, and points them at Thursday or Friday. Do not let it slip.

---

## Segments

| Segment | Contacts | Used by |
|---|---|---|
| **All Clients** | 161 | All three scheduled broadcasts |
| Lapsed clients (not seen 6+ months) | 0 | Nothing yet — see below |
| General | 0 | Unused (pre-existing) |

The 161 contacts already existed in the account but belonged to no segment, so broadcasts could not target them. They were bulk re-imported with `upsert` into **All Clients**: 161 updated, 0 created, 0 failed. The two contacts who had unsubscribed were deliberately excluded from the import so their opt-out stands.

---

## Removed: the lapsed-client email

`06-lapsed-reactivation` was built and briefly scheduled, then **deleted at the owner's instruction**.

The reason: the contact list carries only name and email, with no last-visit date, so a genuine lapsed segment could not be built. Pointed at All Clients it would have told people who came in last week that "it's been a while", which is worse than not sending it.

The email itself is still in the repo (`emails/06-lapsed-reactivation.html`) and is good. To run it later:

1. Export clients with their last-visit date from the booking system.
2. Filter to those not seen in 6+ months.
3. Import that CSV into the **Lapsed clients** segment (already created, currently empty).
4. Create a broadcast from `dist/06-lapsed-reactivation.html` against that segment.

---

## Deliverability settings confirmed

| | |
|---|---|
| Domain `mail.hairbyshacamberwell.com` | verified |
| DKIM / SPF | verified |
| DMARC on root domain | present (`p=none`), inherited by the subdomain |
| Open tracking | off |
| Click tracking | off |

Tracking is off on purpose. Link tracking rewrites every URL to a third-party domain and adds a pixel, both of which push mail toward Promotions. The trade-off is that Resend will not report open or click rates for these sends. Judge the campaign on Thursday and Friday bookings instead, which is the number that actually matters.

---

## The one thing still manual

Nothing in the email system. But the campaign only works if the offline half happens:

- **Ask for the referral in the chair**, once, lightly, when a client is happy with the result.
- **Record every referral** in `referral-tracker.csv` the moment you hear it.
- **Send template 05 within 24 hours** of a referred client attending.
- **Offer Thursday or Friday first** when booking anyone in. Two named times, never "when suits you?"

Per `CAMPAIGN-STRATEGY.md`, rebooking clients onto Thu/Fri at the chair outperforms this entire email campaign and costs nothing. The emails support that; they do not replace it.
