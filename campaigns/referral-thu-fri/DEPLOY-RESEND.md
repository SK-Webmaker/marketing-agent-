# Deploying on Resend

Step by step, from nothing to sent. Do sections 1–3 once; repeat 4–6 for each broadcast.

> **One thing to verify yourself:** Resend's merge-tag syntax (§5.3). I couldn't reach `resend.com/docs` from the build environment to confirm it against the current version. Check it in the editor before sending — a wrong merge tag fails silently and mails "Hi {{FIRST_NAME}}" to your entire list.

---

## 1. Verify the sending domain *(do this first — everything else waits on DNS)*

1. Resend → **Domains** → **Add Domain** → `hairbyshacamberwell.com`.
2. Resend gives you DNS records — typically a **DKIM** `TXT`, an **SPF** (`TXT`/`MX` on a sending subdomain), and a recommended **DMARC** `TXT`.
3. Add them at whoever hosts the DNS for the domain (the registrar, or Vercel/Cloudflare if the site is hosted there).
4. Back in Resend, click **Verify**. Propagation is usually minutes, occasionally up to 24–48 hours.
5. Don't send anything until the domain shows **Verified**.

**Add DMARC even though it's optional.** Gmail and Yahoo's bulk-sender rules expect it, and without it a few hundred emails at once will land in Promotions or Spam. Start with:

```
v=DMARC1; p=none; rua=mailto:shamalkaskiridena@gmail.com
```

### Sender identity

| Field | Value |
|---|---|
| **From name** | `Sha from Hair by Sha` |
| **From address** | `sha@mail.hairbyshacamberwell.com` |
| **Reply-To** | `shamalkaskiridena@gmail.com` |

The From address **must** be on the verified domain, which is the `mail.` subdomain. You cannot send From a gmail.com address through Resend: it would fail DKIM/SPF alignment and land in spam.

The From address does not need to be a real mailbox. Resend can send from any address on a verified domain. That is exactly why Reply-To matters here: it routes every reply to the inbox Sha actually reads, so nothing bounces into a mailbox that doesn't exist.

A first name in the From name is the biggest single open-rate lever on a list like this. Never `no-reply@` — emails 3 and 6 both explicitly invite replies, and replies are a booking channel.

---

## 2. Host the images

Email images must be at public `https://` URLs. Embedded/base64 images are stripped by Gmail — the preview files use them for portability only.

1. Upload everything in `assets/email/` to a public path on the site, e.g. `https://hairbyshacamberwell.com/email/referral/`.
   *If the site is a Vite build, drop the folder in `public/email/referral/` and redeploy.*
2. Open one directly in a browser to confirm it loads over HTTPS with no login.
3. That URL is what you pass to the build in §4.

Any host works — the site, S3, Cloudinary. It just has to be public and permanent. Don't use a link-expiring service.

---

## 3. Create the audience and segments

Resend → **Audiences** → create **Hair by Sha — Clients**. Import from Fresha as CSV.

Map at minimum: `email`, `first_name`. Two extra columns make the whole plan work:

| Column | Why |
|---|---|
| `last_visit` | Splits active from lapsed |
| `first_name` | Personalisation, and the merge tag needs it |

You need three segments:

| Segment | Rule | Used by |
|---|---|---|
| **Active** | Seen in the last 18 months | Emails 1, 2, 3 |
| **Lapsed** | Not seen in 6+ months | Email 6 |
| **Referred** | Manually tagged from the tracker | Excluded from 2 and 3 |

Resend's segmentation is basic. If it can't express these, just export three separate CSVs from Fresha and keep three audiences. For a list this size that's simpler and takes ten minutes.

**Clean the list before the first send.** Remove obvious typos, role addresses (`info@`, `admin@`) and anything that's bounced before. One bad first send damages domain reputation for months.

---

## 4. Build the send-ready files

```bash
cd campaigns/referral-thu-fri
node build.mjs --assets https://hairbyshacamberwell.com/email/referral
```

Writes HTML + `.txt` for all six emails into `dist/`, with the image URLs, booking link and pre-written SMS link filled in.

Left templated on purpose, for Resend to fill: `{{UNSUBSCRIBE}}`, `{{REFERRER_NAME}}`, `{{NEW_CLIENT_NAME}}`, `{{APPT_DAY_TIME}}`.

---

## 5. Create the broadcast

### 5.1 New broadcast
Resend → **Broadcasts** → **Create Broadcast** → select the **Active** audience.

### 5.2 Paste the HTML
Switch the editor to **HTML / code** mode and paste the whole contents of `dist/01-announcement.html`.

Do **not** paste into the rich-text/visual editor — it will rewrite the table markup and break the layout in Outlook.

Also paste `dist/01-announcement.txt` into the plain-text field if the editor offers one. A text alternative measurably improves inbox placement.

### 5.3 Subject, preview text, merge tags

From `SEND-PLAN.md`:

- **Subject:** `"Who does your hair?"`
- **Preview text:** `You get asked it all the time. From now on, the answer is worth something.`

Then replace the placeholders with Resend's real merge tags:

| In the file | Replace with |
|---|---|
| `{{UNSUBSCRIBE}}` | Resend's unsubscribe variable — believed to be `{{{RESEND_UNSUBSCRIBE_URL}}}` |
| any first-name use | Resend's contact variable — believed to be `{{{FIRST_NAME}}}` |

**Resend uses triple braces, not double.** Confirm both against the editor's own variable menu before sending — this is the item I couldn't verify. Always set a fallback for first name so an empty field never renders as "Hi ,".

The announcement is deliberately written to work *without* a first name, so if the data is patchy you can leave personalisation out entirely and lose nothing.

### 5.4 Unsubscribe is not optional
Australian Spam Act 2003 requires a functional unsubscribe and a physical address. The address is already in every footer. Make sure the unsubscribe merge tag resolves — click it in the test.

---

## 6. Test before you send

Send a test to yourself. Then actually check it:

- [ ] Opens correctly in **Gmail** (web + phone app), **Outlook**, and **Apple Mail**
- [ ] On a phone: the 15% / 10% block stacks into two rows and nothing scrolls sideways
- [ ] All images load — no broken icons, no red X
- [ ] Turn images **off** and confirm it still reads and sells. Roughly a third of opens start this way.
- [ ] **"Send it as a text"** opens the messages app with the message pre-written — test on a real **iPhone and Android**. On desktop it may do nothing, which is why the words are also visible as text.
- [ ] **Booking button** opens Fresha, and Thursday/Friday slots are genuinely released and bookable
- [ ] Unsubscribe link works
- [ ] Subject and preview text look right in the inbox list, not just when opened
- [ ] Nothing shows a raw `{{...}}` anywhere

Then send a second test to a friend on a different provider. Your own inbox is biased — it already trusts mail from you.

### Warm the domain
If this domain has never sent bulk mail, split email 1 into **three batches over three days** (~⅓ of the list each) rather than one send. A cold domain sending 300 at once looks exactly like spam.

---

## 7. Send

Send **Tuesday or Wednesday, 9:30–10:30am AEST**. Never Thursday or Friday — those are now working days in the chair, and replies need answering.

Schedule it rather than sending live, so you're not tempted to fiddle. Then leave it alone for 48 hours before judging anything.

---

## 8. The triggered emails (4 and 5)

These go to **one person at a time**, so don't build automation for them. For a sole operator the practical route:

**Option A — Resend single send (recommended).** Keep `dist/04-*.html` and `dist/05-*.html` saved. When one's needed: Resend → **Emails** → new email → paste the HTML → replace `Emily` / `Sarah` / the appointment time by hand → send. Two minutes.

**Option B — API**, if you ever want it automated later:

```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Sha from Hair by Sha <sha@mail.hairbyshacamberwell.com>",
    "reply_to": "shamalkaskiridena@gmail.com",
    "to": ["client@example.com"],
    "subject": "Emily came in, your 15% is ready",
    "html": "…contents of dist/05-reward-ready.html…",
    "text": "…contents of dist/05-reward-ready.txt…"
  }'
```

Verify the endpoint against current Resend docs before wiring anything up.

**Timing matters more than tooling.** Email 5 within **24 hours** of the referred client's appointment. That's the whole point of it — it closes the loop while the goodwill is live and converts the reward into a Thursday/Friday booking.

---

## 9. Send order recap

| Week | Send | Audience |
|---|---|---|
| 1, Tue | `01-announcement` | Active |
| 2, Tue | `06-lapsed-reactivation` | Lapsed |
| 3, Wed | `02-reminder` | Active, minus referrers · resend 01 to non-openers with the alternate subject |
| 5, Tue | `03-last-call` | Active, minus anyone booked in the next 14 days |
| ongoing | `04` / `05` | Individuals, on trigger |

---

## 10. If something goes wrong

| Problem | Cause | Fix |
|---|---|---|
| Landed in Promotions/Spam | Domain auth, or cold domain | Verify SPF/DKIM/DMARC; warm up in batches; keep image-to-text ratio low (already is) |
| Layout broken in Outlook | Pasted into the visual editor | Re-paste into HTML mode. Never let the WYSIWYG touch it. |
| Images not showing | Wrong asset path, or not public | Open an image URL directly in a private browser window |
| `{{FIRST_NAME}}` visible in the sent email | Wrong brace count or unmapped field | Triple braces; set a fallback; re-test |
| Very low opens (<25%) | Sender name or subject | Send from "Sha from Hair by Sha", not the business name |
| Unsubscribes spike | Too frequent, or wrong segment | Three broadcasts in eight weeks is the ceiling for this list |
| Bounces >3% | Stale list | Clean it and re-import; don't keep sending to bouncing addresses |
