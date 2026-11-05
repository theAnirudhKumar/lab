# Lab

Small, free tools that turn your own data into something worth sharing. Fifteen of them, plus five skills for the same ideas inside an AI tool. Everything runs in the browser, nothing is uploaded, and each tool is one file with no dependencies.

Open `index.html` for the hub, or turn on GitHub Pages (main branch, root) and share the link.

## Tools

| Folder | What it does | Needs |
| :-- | :-- | :-- |
| `meeting-receipt` | What your meetings cost, with your own hourly rate | Calendar .ics |
| `work-wrapped` | Your year in meetings as a shareable card | Calendar .ics |
| `calendar-horoscope` | Work personality, lucky hour, day to avoid | Calendar .ics |
| `could-it-be-an-email` | One score for how much of your calendar could have been an email | Calendar .ics |
| `meeting-bingo` | Shareable bingo card of meeting phrases, same seed gives the same card | Nothing |
| `inbox-receipt` | Email receipt with the Reply-All Tax | Gmail Takeout .mbox or .eml |
| `binge-receipt` | Netflix history as a receipt | ViewingActivity.csv |
| `listening-receipt` | Spotify hours, top artists, top tracks, late-night share | Spotify extended streaming history .json |
| `shelf-receipt` | Your Goodreads or Letterboxd year as a receipt | Goodreads library export or Letterboxd diary.csv |
| `fitness-wrapped` | Your year of movement as a card | Strava activities.csv or Apple Health export.xml |
| `chat-awards` | WhatsApp group chat awards: the Chatterbox, the Ghost, the Night Owl | WhatsApp chat export .txt |
| `buzzword-decoder` | Daily five-question corporate speak game with an emoji result | Nothing |
| `daily-guess` | Three "what year" and two "how far" guesses a day, emoji grid | Nothing |
| `dither-booth` | Photo to thermal receipt, ASCII, halftone or duotone | A photo |
| `receipt-of-me` | A joke receipt of your week, year or relationship, always marked not a real receipt | Nothing |

`receipt-of-me` carries a "not a real receipt" notice on every image that cannot be turned off, because a tool that makes real-looking receipts could be used to fake expenses or refunds.

## Skills

`skills/` holds `meeting-receipt`, `work-wrapped`, `calendar-horoscope`, `could-it-be-an-email` and `inbox-receipt`. Each reads a connected calendar or mail account read-only, or an uploaded file, and asks for the hourly rate where money is involved. None sends, edits or deletes anything.

## How it is built

`shared/` holds the calendar parser (`ics.js`), the card and receipt drawing (`card.js`) and the styles (`base.css`). `src/` holds one source file per tool. `build.py` inlines the shared code and writes each tool's `index.html` and `README.md`, plus the hub `index.html`. `meeting-receipt` is hand-written and left alone.

```bash
python3 build.py
```

Edit `src` or `shared`, never the generated pages. CI fails if the generated pages are out of date.

## Splitting a tool out

Each folder is self-contained. To give a tool its own repository, copy its folder, turn on GitHub Pages and you are done.

## Known limits

- Strava, Apple Health, Goodreads, Letterboxd, Spotify and WhatsApp exports change format from time to time. The parsers follow the layouts as known and were tested on hand-made files in those shapes, not on real exports.
- WhatsApp day and month order is guessed from the dates in the file. If every date is ambiguous it defaults to month first.
- Daily puzzle facts and city coordinates were written from memory and need a spot-check before launch.
- Monthly calendar rules such as "second Tuesday" are approximated, and times use wall-clock time.
- "Could be an email" is a rule of thumb, not a verdict.
- Tested from local files in headless Chromium on sample data. Not yet tested on a hosted page or on real exports.

The research and launch plan are in `docs/next-project-plan.md`.

## Licence

MIT, see `LICENSE`.
