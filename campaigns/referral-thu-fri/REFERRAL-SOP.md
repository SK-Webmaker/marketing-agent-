# Referral Program — How Sha runs it

One page. Print it, or keep it open on the salon iPad.

The whole program is deliberately manual because it has to survive a one-person salon on a busy day. There is no software, no codes and nothing for a client to lose.

---

## The offer

| | |
|---|---|
| **Referrer** (existing client) | 15% off their **next** appointment |
| **New client** | 10% off their **first** appointment |
| **Condition** | The referrer's 15% is only released **after the new client has attended** |
| **Limit** | One reward per new client. Not combined with other offers. |

A no-show or cancelled first appointment means no reward yet — it stays pending until they actually sit in the chair.

---

## The five steps

### 1 · The client refers someone
No forms, no links, no codes. They just say it:

> "You should book with Hair by Sha. Just mention my name when you book."

Email 1 gives them that line pre-written and a button that opens their messages app with it already typed.

### 2 · The new client books
Booking online or by message, they say:

> "Sarah Jones referred me."

**Catch it at booking.** If a name you don't recognise appears in the diary, ask before they arrive:
> "Lovely to have you booked in — can I ask how you heard about me?"

This one question is the whole tracking system. If it isn't asked, the referral is invisible and the referrer never gets thanked.

### 3 · Write it down immediately
Add a row to the tracker (`referral-tracker.csv`, or a notes app — anywhere consistent):

```
New client: Emily Smith   ·   Referred by: Sarah Jones   ·   Appt: Thu 14 Aug
```

Do it the moment you hear it. Not at the end of the day.

### 4 · After the appointment is attended
Only once they've actually been in:

- ✅ Apply the new client's **10%** to that appointment before taking payment.
- ✅ Add a note to the referrer's client file: **`15% referral reward available`**
- ✅ Send the referrer email 5 (`05-reward-ready`) within 24 hours — while the good feeling is fresh, and it prompts them to rebook.
- ✅ Mark the tracker row `Attended`.

### 5 · When the referrer books again
Before taking payment:

> "You've got your 15% from sending Emily my way — I've taken it off."

Then:
- ✅ Apply the 15%.
- ✅ **Delete the note from their file** so it can't be used twice.
- ✅ Mark the tracker row `Redeemed`.

---

## Saying it out loud

The email does the announcing, but most referrals start in the chair. Two moments are worth using:

**At the end of a great appointment** — when they're happy with the mirror:
> "If anyone asks who did it, send them my way — you'll both get something off. They just need to mention your name."

**When someone mentions a friend's hair problem** — they do this constantly:
> "Send her to me. First visit is 10% off if she mentions you, and you'll get 15% off your next one."

Don't push it. Once, lightly, at the right moment. This is a boutique salon; the referral should feel like a favour offered, not a sales close.

---

## Where the Thursday/Friday goal fits

The reason this program exists is to fill Thursdays and Fridays. So when you're offering a slot to a referred client, **offer Thursday or Friday first**:

> "I've got a lovely quiet Thursday morning, or a Friday at two — which suits?"

New clients have no habit yet. They'll take the day they're offered. This one sentence does more for the goal than the discount does.

---

## Edge cases

| Situation | What to do |
|---|---|
| Two people claim the same referral | First name recorded wins. Note it and move on. |
| The new client forgets to mention a name | If they say it before payment, honour it. After they've paid and left, honour the referrer's 15% anyway — the goodwill is worth more than the margin. |
| The referrer refers several people | Rewards stack as separate 15% credits, one per appointment. Don't combine them into a bigger discount. |
| A referred client no-shows | Reward stays pending, not cancelled. It releases if they rebook and attend. |
| The referrer has already left the salon before you remember | Text them. Email 5 exists exactly for this. |
| A new client asks for the discount on a package or existing offer | The 10% doesn't combine. Say so warmly — "it's one or the other, whichever saves you more." |

---

## The tracker

`referral-tracker.csv` — open it in Sheets or Excel. Six columns, nothing clever:

| Column | Notes |
|---|---|
| `date_referred` | When you heard about it |
| `new_client` | Their name |
| `referred_by` | The existing client |
| `appt_date` | First appointment |
| `status` | `Booked` → `Attended` → `Redeemed` (or `No-show`) |
| `notes` | Anything unusual |

Review it once a week — five minutes, Monday morning. Look for two things: rows sitting at `Attended` where the referrer hasn't rebooked (text them), and which existing clients refer more than once. Those people are the program.
