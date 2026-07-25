# Product Marketing Context — Hair by Sha

Single source of truth for all marketing skills in this workspace. Derived from the live site source (`SK-Webmaker/HairbySha`).

## Business

| | |
|---|---|
| **Name** | Hair by Sha |
| **Owner / stylist** | Shamalka Kiridena ("Sha") — sole operator |
| **Type** | Boutique one-chair hair salon |
| **Location** | 1 Prospect Hill Rd, Camberwell VIC 3124, Melbourne, Australia |
| **Phone / SMS** | 0452 611 799 (`tel:+61452611799`) |
| **Booking** | Fresha — https://www.fresha.com/a/hair-by-sha-melbourne-prospect-hill-road-i1nq0ttb |
| **Website** | https://hairbyshacamberwell.com/ |
| **Instagram** | [@infusion_hair_](https://www.instagram.com/infusion_hair_/) |
| **Hours** | Mon–Fri 10am–6pm · Sat–Sun 10am–5pm |

## Positioning

A boutique, one-on-one alternative to the busy commercial salon. The value is **Sha's undivided attention** — one client at a time, honest advice, and colour built around the health of the hair rather than a rushed result. Clients come for the relationship as much as the outcome.

**Category:** boutique hair colourist & stylist, Camberwell / inner-east Melbourne.

**Differentiators**
1. One-to-one — you get Sha for the whole appointment, not passed between juniors.
2. Honest consultation — a free, no-obligation plan including budget and timeline.
3. Hair-health-first colour — lightening and correction built around condition.
4. Calm boutique room, not a salon floor.

## ICP

**Primary:** women 28–55 in Camberwell, Hawthorn, Glen Iris, Balwyn, Surrey Hills. Professional or parent, values a stylist who remembers her, willing to pay for care and consistency over the cheapest chair. Often arrives after a bad experience elsewhere (brassy blonde, botched colour, feeling rushed).

**Secondary:** men wanting a consistent precision cut; occasion clients (updos, events).

**Core jobs-to-be-done**
- "Make my colour look natural and grow out well so I'm not back in 4 weeks."
- "Fix what the last salon did without wrecking my hair."
- "I want someone who listens and remembers what I like."

## Services

| # | Service | Positioning line |
|---|---|---|
| 01 | Balayage & Foils | Dimensional, lived-in colour |
| 02 | Blonde Transformations | Subtle brightening to statement blonde, without the brass |
| 03 | Colour & Correction | Roots, refresh, grey coverage and repair |
| 04 | Cuts & Styling | Precision cutting for women and men |
| 05 | Treatments & Care | Deep repair and lasting shine |
| 06 | Free Consultation | Complimentary, no obligation — every transformation starts here |

## Voice & tone

Editorial, warm, unhurried, quietly premium. Australian English. Sha speaks in first person — the brand *is* a person, so marketing should sound like her, not like a chain.

**Do:** short declarative sentences · sensory, specific detail · em-dashes and considered pauses · lowercase restraint in eyebrows · confident understatement.
**Don't:** exclamation marks · "AMAZING!!" salon-speak · emoji spam · hype adjectives · corporate marketing voice · anything that reads generated.

## Brand system

**Palette** (from `tailwind.config.ts` / `index.css`)

| Token | HSL | Hex | Use |
|---|---|---|---|
| ink | 24 15% 9% | `#1A1614` | Primary text, dark panels |
| ink-soft | 25 12% 14% | `#28231F` | Secondary dark |
| cream | 40 33% 97% | `#FAF8F5` | Page background |
| cream-deep | 38 28% 93% | `#F2EFE8` | Alternate panel |
| sand | 35 24% 87% | `#E6DFD6` | Rules, borders, fills |
| taupe | 29 11% 55% | `#998C80` | Muted text, captions |
| bronze | 28 36% 51% | `#AF7F55` | Accent, CTA, numerals |
| bronze-soft | 31 34% 68% | `#C9AE92` | Accent on dark |

**Type**
- Display: Fraunces (variable serif), light weight, tight tracking, `-0.02em`.
- Body: Outfit (sans).
- Eyebrow: 11px, uppercase, `0.32em` letter-spacing.
- **Email fallbacks:** Fraunces → Georgia, serif. Outfit → Helvetica Neue, Arial, sans-serif. (Web fonts are unreliable in Outlook/Gmail — the design must hold up entirely on fallbacks.)

**Other**
- `--radius: 0rem` — **square corners everywhere.** No rounded buttons. This is a defining brand trait.
- Generous whitespace, hairline rules, editorial numerals ("01", "02").
- Motion easing `cubic-bezier(0.22, 1, 0.36, 1)` (irrelevant in email, noted for landing pages).

## Photography

Real client work shot in-salon on a phone — warm daylight, plants, mirrors, natural tones. Authentic rather than editorial.

**Rule: never use AI-generated images of hair results.** Depicting fabricated results as Sha's work is dishonest and reads instantly as generated. AI/design tools may be used for typography, texture, and layout composition only.

Available real assets (in `campaigns/*/assets/`): `photo-balayage.jpg`, `photo-layers.jpg`, `photo-updo.jpg`, `photo-sha-card.jpg` (portrait of Sha).

## Constraints & notes

- Email is sent via **Resend** — the owner has the full existing-client email list.
- Sole operator: no marketing team, no CRM automation. Anything operational must be doable by one person with a phone and a notes app.
- Testimonials currently on the site are **placeholders** and must be replaced with real Google/Fresha reviews before being used in marketing.
- Phone number was sourced from Instagram — confirm before publishing.

## Current objective

Fill **Thursday and Friday** appointment slots. Sha has taken on additional hours/days and that new capacity is empty. All campaign work should route demand specifically to Thu/Fri.
