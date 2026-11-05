# Work Wrapped

Your year in meetings as a shareable card, Spotify Wrapped style.

Open `index.html` in any browser. It is one file with no dependencies, so it also works hosted on GitHub Pages or any static host.

## Use it

- **You bring:** A calendar .ics export.
- **How to get it:** Google Calendar: Settings, Import and export, Export. Outlook: Calendar, Share or Publish, save as .ics. Apple Calendar: File, Export.
- **You get:** a card or receipt you can download as an image or copy as text.

## Privacy

Everything runs in the browser. Nothing is uploaded, there are no network calls and no tracking. Reading a file means the browser reads it locally and never sends it anywhere.

## Launch hook

"I spent N working days in meetings this year. What is yours?"

## Ship it

1. Create an empty repository named `work-wrapped` and copy this folder into it.
2. Turn on GitHub Pages (main branch, root) or upload `index.html` to any static host.
3. Post the hook with your own card attached.

The shared code (calendar parser, card drawing, styles) lives in `../shared` in the lab and is inlined into each page by `build.py`. After editing anything in `src` or `shared`, run `python3 build.py` from the lab folder.
