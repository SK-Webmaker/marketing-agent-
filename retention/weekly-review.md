# The Monday 20 minutes

Open `rebooking-tracker.csv`. Sort by `due_date`. Work top down.

## 1. Log last week (5 min)
For every client seen, add a row. The only field that needs thought is
`cycle_weeks` — everything else is copy-paste.

| Service | cycle_weeks |
|---|---|
| Root colour / grey blending | **5** |
| Foils / partial foils | **9** |
| Balayage | **12** |
| Cut only | **7** |
| K18 / treatment | **6** |

`due_date` = `last_visit` + `cycle_weeks`. The helper below fills it in for you.

## 2. Mark who rebooked in the chair (2 min)
`rebooked_in_chair` = Yes / No. **This is the number that matters most.**
Count Yes ÷ total. That is your rebook rate. Write it down each week.

## 3. Send R1 review emails (5 min)
Anyone seen 2 days ago with `r1_review_sent` = No.
Resend → Templates → `review-request`. Fill name + service. Send. Mark Yes.

## 4. Send R2 rebooking emails (5 min)
Anyone whose `due_date` is this week or past, `status` = Due or Overdue,
and `rebooked_in_chair` = No.
Resend → Templates → `rebooking-prompt`. **Put two real open times in it.**
Mark `r2_rebook_sent` = Yes.

## 5. Text the badly overdue (3 min)
Anyone 3+ weeks past due who hasn't answered the email. A text from Sha
personally outperforms any email:

> Hi [name], it's Sha. You're about due for your [service] — I've got a
> Thursday morning or a Friday afternoon free in the next fortnight if
> either suits. No rush either way.

## Status values

| Status | Meaning |
|---|---|
| `Booked` | Next appointment already in the diary. Nothing to do. |
| `Due` | Inside the due window. Send R2. |
| `Overdue` | Past due, no booking. Send R2, then text. |
| `Lapsed` | 6+ months. Leave for the win-back campaign. |
| `Stop` | Asked not to be contacted. Never contact again. |

## What to write down each week

Four numbers, in a note on your phone:

```
Week ending __/__
Appointments:        __
Rebooked in chair:   __   (target 60%)
Reviews gained:      __
Thu/Fri filled:      __ / 8
```

That is the entire measurement system. Four numbers a week beats a dashboard
nobody opens.
