# Social assets — ready to post

Rendered at native platform dimensions. Every photograph is real Hair by Sha
client work. No stock, no AI-generated hair.

| File | Size | Use |
|---|---|---|
| `feed-01-thursdays-fridays.png` | 1080×1350 | Feed — capacity launch |
| `feed-02-referral-offer.png` | 1080×1350 | Feed — referral offer |
| `feed-03-grey-blending.png` | 1080×1350 | Feed — grey blending education |
| `feed-04-before-after-TEMPLATE.png` | 1080×1350 | Feed — reusable before/after frame |
| `story-01-thursdays-fridays.png` | 1080×1920 | Story / TikTok — capacity |
| `story-02-review-ask.png` | 1080×1920 | Story — review request |
| `story-03-blonde-question.png` | 1080×1920 | Story — straight-answer Q&A |

`feed-04` is a template: the left panel is a labelled placeholder for Sha's own
"before" photo. The right side and branding are finished.

## Rebuilding

```bash
node templates.mjs          # re-render all assets to out/
python3 build-artifact.py   # rebuild the visual plan page
```

Edit `templates.mjs` to change copy or swap photography. Brand tokens are taken
from the live site's design system: ink #1A1614, cream #FAF8F5, sand #E6DFD6,
taupe #998C80, bronze #AF7F55.
