---
name: calendar-horoscope
description: >
  Gives a playful but numbers-backed "work personality" reading from a calendar: a type such as The Marathoner or The Monk, a lucky hour, a day to avoid, and the share of the week spent in meetings. Trigger on "calendar horoscope", "what does my calendar say about me", "my work personality", "read my calendar", "my meeting type", or when the user uploads a .ics file and wants something fun. Reads a connected calendar read-only or an uploaded .ics file, over the last 4 weeks by default. Entertainment with real arithmetic underneath. Not for advice on what to cancel (meeting-audit).
---

# Calendar Horoscope

The shape of a week says something true about how someone works. This skill reads that shape, names the type, and keeps it light.

The failure it prevents: **a reading that is pure flattery with nothing behind it.** Every claim here comes from a number.

---

## Step 1: Ask first

Period (default the last 4 weeks; offer 8 or 12) and whether the user will post it. Both skippable.

## Step 2: Get the events

Connected calendar first (read only), otherwise an uploaded .ics file. Use weekdays, 9:00 to 18:00, and meetings with two or more people. Never write to the calendar.

## Step 3: Measure

- **Load:** meeting hours divided by 40 times the weeks
- **Back to back:** share of meetings starting within 10 minutes of the previous one
- **One to one share:** share of meetings with exactly two people
- **Big room share:** share with 10 or more people
- **Early share:** starting before 10:00. **Late share:** ending after 17:30
- **Lucky hour:** the working hour most often completely free across the period
- **Avoid:** the weekday with the most meeting hours

## Step 4: Pick the type, first match wins

1. Load above 50 percent and back to back above 50 percent: **The Marathoner**
2. Big rooms above 25 percent: **The Town Crier**
3. One to ones above 50 percent: **The Diplomat**
4. Late above 20 percent: **The Night Owl**
5. Early above 30 percent: **The Early Bird**
6. Load below 15 percent: **The Monk**
7. Otherwise: **The Juggler**

## Step 5: Write the reading

Three short lines: the type, one deadpan sentence in that type's voice, then the lucky hour, the day to avoid and the load percentage. Show the numbers behind it so the user can check. Offer the picture version from the browser tool.

## Failure modes

- **Flattery without numbers.** Always show the measures
- **Overclaiming.** It is a reading, not a diagnosis. Say so once
- **Counting solo blocks.** Only meetings with two or more people count

## Reference files

None. This skill is self-contained.
