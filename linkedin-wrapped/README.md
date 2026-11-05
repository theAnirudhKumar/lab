# LinkedIn Wrapped

Your LinkedIn year as a shareable card: new connections, posts, reactions and comments. Totals only, never names.

Open `index.html` in any browser. It is one file with no dependencies, so it also works hosted on GitHub Pages or any static host.

## Use it

- **You bring:** LinkedIn data export CSVs: Connections.csv and optionally Shares, Reactions, Comments.
- **How to get it:** LinkedIn: Settings, Data privacy, Get a copy of your data.
- **You get:** a card or receipt you can download as an image or copy as text.

## Privacy

Everything runs in the browser. Nothing is uploaded, there are no network calls and no tracking. Reading a file means the browser reads it locally and never sends it anywhere.

## Launch hook

"I made N new connections on LinkedIn this year. Card inside."

## Ship it

1. Create an empty repository named `linkedin-wrapped` and copy this folder into it.
2. Turn on GitHub Pages (main branch, root) or upload `index.html` to any static host.
3. Post the hook with your own card attached.

The shared code (calendar parser, card drawing, styles) lives in `../shared` in the lab and is inlined into each page by `build.py`. After editing anything in `src` or `shared`, run `python3 build.py` from the lab folder.
