---
name: could-it-be-an-email
description: >
  Scores a calendar by the share of meeting time that probably could have been an email, with a verdict label and the meetings behind it. Trigger on "could this have been an email", "how many of my meetings could be emails", "email score for my calendar", "meeting overload score", "rate my calendar", or when the user uploads a .ics file and wants a single number. Reads a connected calendar read-only or an uploaded .ics file. The flagging rule is a stated rule of thumb, never a verdict. Not for deciding what to cancel (meeting-audit) or designing a meeting (meeting-design).
---

# Could It Be An Email

One number is easier to act on than a calendar. This skill produces that number and shows how it was reached.

The failure it prevents: **a score that feels authoritative but hides its rule.** The rule is printed every time.

---

## Step 1: Ask first

Period (default the last 4 weeks) and whether the user will post the result. Both skippable.

## Step 2: Get the events

Connected calendar first, read only, otherwise an uploaded .ics file. Count meetings with two or more people, not all-day, not cancelled, no declined invitees. Never write to the calendar.

## Step 3: Apply the rule

Flag a meeting when it has **no written agenda** (invite description under about 40 characters), runs **30 minutes or more**, and either has **6 or more people**, or is **recurring with 8 or more people**.

Weigh by person-hours: people times hours. Score is flagged person-hours divided by all person-hours, as a percentage.

## Step 4: Label

- Under 10: Suspiciously Efficient
- 10 to 29: Mostly Honest
- 30 to 54: Email With Extra Steps
- 55 and above: Certified Over-Meeted

## Step 5: Report

Print the score, the label, how many meetings were flagged out of the total, and an estimate of person-hours returnable, taken as half of the flagged person-hours and labelled as an estimate. Always print the rule. Offer one next move: run `meeting-audit` on the top three flagged series.

## Failure modes

- **Hidden rule.** Print it
- **Treating the score as a verdict.** A meeting with no agenda in the invite may still have a pre-read elsewhere. Say so
- **False precision.** Round, and call the saving an estimate

## Reference files

None. This skill is self-contained.
