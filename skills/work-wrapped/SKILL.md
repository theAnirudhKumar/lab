---
name: work-wrapped
description: >
  Builds a "Work Wrapped" year in review from a calendar: hours in meetings, working days equivalent, busiest weekday, longest back-to-back run, number of different people, and a share-ready text block. Trigger on "work wrapped", "my year in meetings", "year in review for my calendar", "how many hours did I spend in meetings this year", "calendar wrapped", or when the user uploads a .ics file and wants a recap. Reads a connected calendar (Google Calendar, Outlook or similar) read-only, or an uploaded .ics file. Asks which period first. Not for deciding what to cut (meeting-audit) or pricing meetings (meeting-receipt).
---

# Work Wrapped

A year of meetings leaves no trace, so nobody feels the total. This skill adds it up and presents it like a yearly recap, short and shareable.

The failure it prevents: **a calendar that was busy all year and produced no number anyone could react to.**

---

## Step 1: Ask first

One short message, every question skippable:

1. **Period.** Default: the last 12 months. Offer the last 6 or 3 months, or this calendar year.
2. **Names.** "Will you post this? If so I will leave meeting names out." Default: leave names out when sharing.

## Step 2: Get the events

Use a connected calendar if one is available (list events for the period, read only), otherwise an uploaded .ics file. Say which source was used. Never create, edit, accept, decline or cancel anything.

Count an event only when two or more people attend after removing declined invitees and rooms, it is not all-day or cancelled, and it lasts 5 minutes to 10 hours. Expand recurring events once per occurrence. If attendees are hidden, treat the meeting as 2 people and say so.

## Step 3: Work out the numbers

- Total meetings, total hours, and hours divided by 8 as working days
- Busiest weekday by hours
- Longest back-to-back run: consecutive meetings on one day with 10 minutes or less between them
- Different people: unique attendee addresses, or "n/a" if hidden
- The single meeting series that took the most hours (omit the name if names are off)

State only what the data shows. Do not compare with other people or quote benchmarks.

## Step 4: Print the recap

```
WORK WRAPPED  |  Nov 2025 to Nov 2026

411 hours in meetings.
That is 51 full working days.

Meetings            614
Busiest day         Monday
Longest run         3 in a row
Different people    38
```

Then one line: "Want the picture version? The free browser tool in this folder builds a downloadable card from the same file."

## Failure modes

- **Counting declined invitations.** Remove them or the total is inflated
- **Double counting a series.** Expand it once per occurrence, honour exceptions and cancellations
- **Leaking meeting names.** Hide them when the user will post it
- **Judging.** The recap reports. It does not scold

## Reference files

None. This skill is self-contained.
