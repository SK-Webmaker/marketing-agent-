#!/usr/bin/env python3
"""
Recompute due_date and status in rebooking-tracker.csv.

    python3 update-due-dates.py

due_date = last_visit + cycle_weeks. Status is set from today's date unless
it is already Booked, Lapsed or Stop, which are never overwritten.
"""
import csv, datetime, pathlib

P = pathlib.Path(__file__).parent / "rebooking-tracker.csv"
TODAY = datetime.date.today()
KEEP = {"Booked", "Lapsed", "Stop"}

rows = list(csv.DictReader(P.open()))
counts = {}

for r in rows:
    try:
        lv = datetime.date.fromisoformat(r["last_visit"].strip())
        due = lv + datetime.timedelta(weeks=int(r["cycle_weeks"]))
        r["due_date"] = due.isoformat()
        if r["status"].strip() not in KEEP:
            days_since = (TODAY - lv).days
            if days_since >= 182:
                r["status"] = "Lapsed"
            elif TODAY > due + datetime.timedelta(weeks=3):
                r["status"] = "Overdue"
            elif TODAY >= due - datetime.timedelta(days=7):
                r["status"] = "Due"
            else:
                r["status"] = "Scheduled"
    except Exception:
        r["status"] = r.get("status") or "Check row"
    counts[r["status"]] = counts.get(r["status"], 0) + 1

rows.sort(key=lambda r: r.get("due_date") or "9999")
with P.open("w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=rows[0].keys()); w.writeheader(); w.writerows(rows)

print(f"{len(rows)} clients, sorted by due date\n")
for k in ("Overdue", "Due", "Scheduled", "Booked", "Lapsed", "Stop", "Check row"):
    if k in counts:
        print(f"  {k:<10} {counts[k]}")
print("\nAction: send R2 to everyone marked Overdue or Due.")
