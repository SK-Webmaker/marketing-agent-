# Landing in the Primary inbox, not Promotions

Diagnosis of the 26 July test sends, and what to do about it.

---

## What the account actually looks like

Checked directly against the live Resend account:

| Check | Result |
|---|---|
| Domain `mail.hairbyshacamberwell.com` | **verified** |
| DKIM | **verified** |
| SPF (MX + TXT) | **verified** |
| DMARC on `hairbyshacamberwell.com` | **present** (`v=DMARC1; p=none;`) — subdomains inherit it |
| Open tracking | **off** |
| Click tracking | **off** |
| Test send status | **delivered** |

**Authentication is not the problem.** Every check passes. Tracking is already off, which is the right setting — link tracking rewrites every URL to a third-party domain and adds a tracking pixel, both of which push mail toward Promotions and spam. Leave it off.

Broken authentication sends mail to **Spam**. This went to **Promotions**, which is a different thing entirely.

---

## The uncomfortable truth

**Promotions is not spam.** It is a normal inbox tab that Gmail users check, and it is where people look when they want offers.

**You cannot force Primary placement.** There is no header, no DNS record, no Resend setting, and no paid service that guarantees it. Gmail's tabs are a content classifier combined with each recipient's own engagement history. Anyone selling a guaranteed fix for this is lying.

And in this case, Gmail classified correctly. The designed announcement contains:

- a large hero image
- "15%" and "10%" set in 52px type
- two call-to-action buttons
- a multi-column table layout with background colours
- an unsubscribe link
- a preheader reading "worth 15% to you and 10% to them"

That is a promotional email by any reasonable definition. Expecting Primary from it is unrealistic.

---

## What actually moves the needle

### 1. Fix the From name (do this regardless)

The test went out as:

```
Shamalkaskiridena <shamalkaskiridena@mail.hairbyshacamberwell.com>
```

That reads like a system account. Use:

| Field | Value |
|---|---|
| From name | `Sha from Hair by Sha` |
| From address | `sha@mail.hairbyshacamberwell.com` |
| Reply-To | `shamalkaskiridena@gmail.com` |

Also drop the `[TEST]` prefix for real sends. Bracketed subject prefixes are a mild bulk-mail signal.

### 2. Send the first email as a plain personal note

This is the real lever, and it's why `01-announcement-plain.html` exists.

| | Designed version | Plain version |
|---|---|---|
| Size | 12.9 KB | **2.7 KB** |
| Images | 2 | **0** |
| Links | 5 | **2** |
| Buttons | 2 | 0 |
| Layout | nested tables, background panels | plain paragraphs |

A short, text-first email with no images and two links looks to Gmail like a person writing to a person, because that is what it is. It has a genuinely good chance of Primary, where the designed version has almost none.

This is not a downgrade. The announcement was always written as a personal note from Sha; the plain version simply stops dressing it up. For a one-chair salon, that arguably *is* the stronger creative.

### 3. Get one engagement signal per recipient

Once a recipient replies to an address, or adds it to their contacts, Gmail strongly favours Primary for that sender **from then on**. This is the only durable fix.

The plain email ends with:

> P.S. If this landed in your Promotions tab, drag it across to your main inbox and Gmail will keep me there from now on. Or just hit reply and say hello, that does the same thing.

Asking directly works, and it costs nothing.

### 4. Let the transactional reputation help

The booking software already sends confirmations from this same subdomain, and those land fine. That existing reputation is an asset. Do not do anything that damages it (see the subdomain caution in `SEND-PLAN.md`).

---

## Recommended plan

1. **Send email 1 as the plain version** (`01-announcement-plain.html`), from `Sha from Hair by Sha`, with the Reply-To set. Best shot at Primary, and it carries the P.S. ask.
2. **Send emails 2, 3 and 6 as the designed versions.** By then a chunk of the list has replied, dragged, or opened, so placement improves on its own — and these are genuinely promotional messages that belong in Promotions anyway.
3. **Stop optimising after that.** Chasing Primary past this point means gutting the design for diminishing returns.

---

## What to measure instead

Tab placement is not the goal. Bookings are.

A Promotions-tab email with a 35% open rate on a warm 300-person salon list is a good outcome. If opens come in healthy, placement is working well enough and the design is doing its job. Judge the campaign on Thursday and Friday appointments booked, not on which tab it landed in.
