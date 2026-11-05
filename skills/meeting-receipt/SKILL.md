---
name: meeting-receipt
description: >
  Turns a calendar into a receipt of what meetings cost, in hours and money, with a verdict and a shareable text block. Trigger on "meeting receipt", "price my meetings", "what do my meetings cost", "how much time do I spend in meetings", "receipt for my week", "my calendar as a receipt", "meeting cost this month", or when the user uploads a .ics file or asks for their calendar to be analysed for cost. Reads events from a connected calendar (Google Calendar, Outlook, or any calendar connector) or from an uploaded .ics file or pasted list. Always asks for the user's hourly rate, or annual pay to derive it, before computing money. Read-only: never edits, cancels or sends anything. Not for deciding which recurring meetings to kill (meeting-audit) or designing one upcoming meeting (meeting-design).
---

# Meeting Receipt

A meeting costs more than it feels like, because the cost is spread across everyone in the room and nobody sees the bill. This skill prints the bill.

The failure it prevents: **a calendar that feels busy, with no number attached, so nobody changes it.**

It is deliberately light and a little fun. The receipt is meant to be shared. The deeper work (what to cut and how) belongs to `meeting-audit`, and this skill hands off to it.

---

## Step 1: Ask before computing anything

Ask these in one short message, then wait. Every question is skippable, and each has a default so the user never gets stuck.

1. **Hourly rate.** "What should I use for an average cost per person-hour? You can give a number, or give your yearly pay and I will convert it." Conversion: annual pay divided by 2,080 working hours. Say the result back so the user can correct it.
   - Say plainly that the rate is applied to *everyone* in the room, so a blended average is fine and an exact figure is not needed.
   - If the user declines or does not know, use 60 per hour and label it **an assumption on the receipt itself**. Do not skip the cost line.
2. **Currency.** Default to the symbol the user wrote the rate in, otherwise ask once.
3. **Period.** Default to the last 4 weeks. Offer this week, this month, or a custom range.
4. **Share safety.** "Do you plan to post this? If so I will hide meeting titles." Default: hide titles when the user says they will share.

Never ask for salary details beyond what is needed for the rate, and never store them. Use the figure for this receipt only.

## Step 2: Get the events

Use the first source that works, and tell the user which one was used.

1. **A connected calendar.** If a calendar tool is available, list events for the period. Read only. Never create, update, cancel, accept or decline anything.
2. **An uploaded .ics file.** Parse SUMMARY, DTSTART, DTEND or DURATION, RRULE, EXDATE, STATUS, ATTENDEE (with PARTSTAT) and DESCRIPTION. Expand recurring events across the period for daily, weekly (with BYDAY) and monthly rules. Approximate anything more exotic and say so.
3. **Pasted text.** A list of meetings with day, length and head count is enough.
4. **None of the above.** Offer the free browser version in this repository's `98_Temp/2026-11-05-meeting-receipt/index.html`, or ask the user to paste a week by hand.

If a calendar is connected but returns nothing, say so and offer the .ics route rather than guessing.

## Step 3: Decide what counts

Count an event as a meeting only if all of these hold:

- Two or more people attend after removing declined invitees and rooms
- It is not all-day, not cancelled, and not marked free
- It is between 5 minutes and 10 hours long

Count each occurrence in the period separately. For attendees, use the invite list. If the list is missing or hidden, ask once for a rough number; if still unknown, treat it as 2 and flag the row as uncertain.

## Step 4: Do the arithmetic

For each meeting:

- Your hours = occurrences x length in hours
- Person-hours = your hours x attendees
- Cost = person-hours x hourly rate

Totals: meetings, your hours, person-hours, cost, and your hours as a share of a 40-hour week times the number of weeks.

**State the formula once on the receipt output.** Only time in the room is counted, so every number is a floor. Do not quote benchmarks or other people's averages.

## Step 5: Flag what looks shrinkable

Mark a meeting with `!` when it is 30 minutes or more, has 6 or more attendees, and has no written agenda (description under about 40 characters). This is a rule of thumb, not a verdict. Say so.

For the potential saving, use 40 percent of the flagged meetings' cost and label it an estimate. Do not present it as money saved.

## Step 6: Print the receipt

Use this layout, monospaced, in a code block, so it can be pasted anywhere. Keep to about 40 characters wide.

```
           MEETING RECEIPT
        Nov 2 to Nov 29 (4 wk)
----------------------------------------
MEETINGS                              31
YOUR HOURS IN MEETINGS              16.5
PERSON-HOURS (EVERYONE)              264
SHARE OF A 40H WEEK                  10%
----------------------------------------
            MOST EXPENSIVE
All-hands x4                      $9,120
  38 people, 60 min  !
Weekly Product Sync x4            $2,640
  11 people, 60 min  !
----------------------------------------
TOTAL                            $15,810
4 look like they could shrink
Potential saving (est.)           $5,364
----------------------------------------
 Some of this could be an email.
   Rate used: $60/person-hour (assumed)
```

Show the six most expensive meetings. If titles are hidden, call them "Meeting 1", "Meeting 2" and so on. Always print the rate used and whether it was given or assumed.

Pick the one-line verdict by these rules:

- Meetings above half of working time: "More than half your working time is meetings."
- Above 30 percent: "A third of your week is spoken for."
- Three or more flagged: "Some of this could be an email."
- Otherwise: "A healthy load. Guard it."

## Step 7: Offer one next move

After the receipt, offer exactly one of these, whichever fits:

- If anything is flagged: "Want me to run `meeting-audit` on the top three and draft the message to change them?"
- If the user wants a picture: point to the free browser version, which builds a downloadable image from an .ics file and never uploads it.
- If nothing is flagged: say the load looks healthy and stop.

Do not send, schedule or change anything. The receipt is information.

## Output

In this order:

1. Which source the events came from, and the period
2. The rate used, and whether it was given, converted or assumed
3. The receipt in a code block
4. One next move

## Failure modes

- **Skipping the rate question.** The money line is the whole point. Ask, and default visibly if the user will not answer.
- **Counting people who declined.** Remove them, or the cost is inflated.
- **Double counting recurring events.** Expand the series once per occurrence in the period, and honour EXDATE and cancellations.
- **Presenting the saving as real.** It is an estimate from a rule of thumb. Label it.
- **Leaking titles.** If the user will post the receipt, hide titles by default. Titles often carry client names.
- **Writing to the calendar.** This skill is read-only, always.
- **Judging the user.** The receipt reports. It does not scold.

## Reference files

None. This skill is self-contained.
