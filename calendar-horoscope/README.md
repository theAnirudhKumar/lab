# Calendar Horoscope

Your calendar reveals your work personality, lucky hour and what to avoid.

Open `index.html` in any browser. It is one file with no dependencies, so it also works hosted on GitHub Pages or any static host.

## Use it

- **You bring:** A calendar .ics export.
- **How to get it:** Same export as Work Wrapped.
- **You get:** a card or receipt you can download as an image or copy as text.

## Privacy

Everything runs in the browser. Nothing is uploaded, there are no network calls and no tracking. Reading a file means the browser reads it locally and never sends it anywhere.

## Launch hook

"My calendar says I am The Marathoner. What are you?"

## Ship it

1. Create an empty repository named `calendar-horoscope` and copy this folder into it.
2. Turn on GitHub Pages (main branch, root) or upload `index.html` to any static host.
3. Post the hook with your own card attached.

The shared code (calendar parser, card drawing, styles) lives in `../shared` in the lab and is inlined into each page by `build.py`. After editing anything in `src` or `shared`, run `python3 build.py` from the lab folder.
