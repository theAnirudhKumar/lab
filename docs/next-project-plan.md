# Next project plan: Meeting Receipt

> Moved into the `lab` repository on 2026-11-05. Where this plan says "its own repo", the decision was one repo for now, split later if a tool takes off.

Date: 2026-11-05. Written after surveying the GitHub account and the public Claude skills market.

## What the account shows

- **Audience:** non-technical professionals (Hustlyst: "AI tools for people who don't code"; CS Pulse: customer success practitioners).
- **Proven format:** paste text into a chat, get a usable verdict. Used in `meeting-design`, `work-design` and `customer-success-skills`. No terminal, no keys.
- **Larger builds:** the bigger products already in progress each need setup, so none of them can spread by itself.
- **Gap:** every skill repo needs a person to already own Claude and install a skill. There is no zero-install front door, and no output built to be shared.

## What the market shows

Secondary sources (unverified, check GitHub before quoting) say the big Claude skill repos are developer-heavy, and that non-coder plug-and-play is thin. Viral open source is almost always one of: a tiny tool with an instantly shareable output, or a huge curated list. A curated list is a slow build. A shareable output is a weekend.

## Ideas ranked

| # | Idea | Why it could spread | Cost to build | Verdict |
| :-- | :-- | :-- | :-- | :-- |
| 1 | **Meeting Receipt**: drop in a calendar, get a receipt of what meetings cost | Everyone has meetings and an opinion about them. Result is a screenshot people post. No signup, no upload. Funnels into `meeting-design`. | Days (built) | **Build now** |
| 2 | Skills front door: a no-install web page that runs any skill from your three skill repos on pasted text | Removes the install barrier for all 60+ skills | 1 to 2 weeks, needs an API key and cost control | Next, after #1 shows pull |
| 3 | "Awesome" list for non-coders | Lists are what the big repos are | Slow, needs curation | Fold into Hustlyst |
| 4 | Community as a Service playbook | Differentiated, from the Product Lab log | Writing, not code | Separate track |

## Why Meeting Receipt first

1. It is a viral object, not a product: the receipt image is the unit of sharing.
2. It is private by design (runs in the browser, no network calls), which is a selling point and removes any data risk.
3. It reuses the existing audience and gives `meeting-design` a front door it does not have today.
4. It is cheap to test. If a launch post gets no pull, little was lost.

## Build status

- Done: single-file web app, `index.html`. Parses .ics (folded lines, UTC and local times, daily, weekly and monthly recurrence, COUNT, UNTIL, EXDATE, declined, cancelled, all-day), computes hours, person-hours and cost, flags likely-shrinkable meetings, exports a PNG and copyable text, optional hide-titles mode.
- Tested in headless Chromium on sample and edge-case calendars, desktop and mobile widths.
- Known limits: monthly rules like "second Tuesday" are approximated, timezones use wall-clock time, "could shrink" is a heuristic (6 or more people, 30 minutes or more, no written agenda), and the 40 percent saving is an assumption.

## Launch plan

1. **Home:** move to its own public repo or a `meeting-design` subfolder, and host as a static page (GitHub Pages or Hostinger zip upload, as used for hustlyst.com).
2. **Own receipt first:** run it on your real calendar with titles hidden and post the image. A real number beats a sample.
3. **Post:** one LinkedIn post and one Hustlyst issue, "I priced my meetings", linking the tool. Use the Distribution Pack format already in Hustlyst rules.
4. **Measure:** visits, receipts downloaded (add a privacy-friendly counter only if wanted), stars on `meeting-design`. Go or no-go after two weeks: under 200 visits and no reshares means stop and move to idea 2.
5. **Follow-ups if it lands:** Slack and Outlook paste mode, a team version that sums several .ics files, a "what to cut" export that feeds `meeting-design` directly.

## Decisions for you

- Where it should live (own repo, `meeting-design`, or `hustlyst.com`).
- Whether to put a counter on it.
- Whether to go straight to idea 2 in parallel.
