# Binge Receipt

Your Netflix history as a receipt: hours, top shows, longest binge and the late-night share.

Open `index.html` in any browser. It is one file with no dependencies, so it also works hosted on GitHub Pages or any static host.

## Use it

- **You bring:** Netflix ViewingActivity.csv.
- **How to get it:** Netflix: Account, Security and Privacy, Download your personal information, request. The CSV is ViewingActivity.csv.
- **You get:** a card or receipt you can download as an image or copy as text.

## Privacy

Everything runs in the browser. Nothing is uploaded, there are no network calls and no tracking. Reading a file means the browser reads it locally and never sends it anywhere.

## Launch hook

"I watched N days of Netflix. Receipt inside."

## Ship it

1. Create an empty repository named `binge-receipt` and copy this folder into it.
2. Turn on GitHub Pages (main branch, root) or upload `index.html` to any static host.
3. Post the hook with your own card attached.

The shared code (calendar parser, card drawing, styles) lives in `../shared` in the lab and is inlined into each page by `build.py`. After editing anything in `src` or `shared`, run `python3 build.py` from the lab folder.
