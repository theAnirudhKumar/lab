#!/usr/bin/env python3
"""Assemble each src/<slug>.html into <slug>/index.html (one standalone file,
no dependencies) and write a README per project plus the hub page.

    python3 build.py
"""
import os, re, html

ROOT = os.path.dirname(os.path.abspath(__file__))
rd = lambda *p: open(os.path.join(ROOT, *p), encoding='utf-8').read()

ICSDROP = '''<div class="drop" id="drop" tabindex="0" role="button" aria-label="Choose a calendar file"><strong>Drop a calendar file here</strong><span>.ics export from Google Calendar, Outlook or Apple Calendar. Or click to choose.</span><input id="file" type="file" accept=".ics,text/calendar" hidden></div>
<div class="btns"><button id="sample">Try with a sample calendar</button></div><div class="err" id="err" role="alert"></div>'''
ACTIONS = '<div class="btns" style="justify-content:center"><button class="primary" id="png" disabled>Download image</button><button id="copy" disabled>Copy text</button></div>'
FOOT = '<p class="priv">Runs entirely in your browser. Nothing is uploaded and there is no tracking.</p>'

# slug: (title, one-line pitch, input, how to get it, hook for the launch post)
META = {
 'meeting-receipt': ('Meeting Receipt', 'What your meetings really cost, as a receipt. Drop in a calendar and set your hourly rate.', 'A calendar .ics export', 'Same export as Work Wrapped.', 'My meetings cost N this month.'),
 'work-wrapped': ('Work Wrapped', 'Your year in meetings as a shareable card, Spotify Wrapped style.', 'A calendar .ics export', 'Google Calendar: Settings, Import and export, Export. Outlook: Calendar, Share or Publish, save as .ics. Apple Calendar: File, Export.', 'I spent N working days in meetings this year. What is yours?'),
 'calendar-horoscope': ('Calendar Horoscope', 'Your calendar reveals your work personality, lucky hour and what to avoid.', 'A calendar .ics export', 'Same export as Work Wrapped.', 'My calendar says I am The Marathoner. What are you?'),
 'could-it-be-an-email': ('Could It Have Been an Email?', 'One score for how much of your calendar could have been an email.', 'A calendar .ics export', 'Same export as Work Wrapped.', 'My calendar scores 42%. Post yours.'),
 'meeting-bingo': ('Meeting Bingo', 'A shareable bingo card of the phrases every meeting produces. Same seed gives friends the same card.', 'Nothing, or your own phrases', 'Open it, click phrases as you hear them, share the link.', 'Playing this in my 2pm. Join in with the link.'),
 'inbox-receipt': ('Inbox Receipt', 'Your email as a receipt, with the Reply-All Tax: what pile-on replies cost everyone.', 'A Gmail Takeout .mbox file or .eml files', 'Google Takeout, choose Mail only, export. The file is read in your browser, one header at a time, and bodies are skipped.', 'The reply-all tax on my inbox is N hours. Check yours.'),
 'binge-receipt': ('Binge Receipt', 'Your Netflix history as a receipt: hours, top shows, longest binge and the late-night share.', 'Netflix ViewingActivity.csv', 'Netflix: Account, Security and Privacy, Download your personal information, request. The CSV is ViewingActivity.csv.', 'I watched N days of Netflix. Receipt inside.'),
 'buzzword-decoder': ('Buzzword Decoder', 'A daily five-question game: translate corporate speak into plain English. Emoji results to share.', 'Nothing', 'Open it once a day.', 'Buzzword Decoder 4/5. Beat me.'),
 'dither-booth': ('Dither Booth', 'Turn any photo into a thermal-receipt print, ASCII art, halftone or duotone poster.', 'A photo', 'Drop an image or click to choose it.', 'I got printed on a receipt.'),
 'fitness-wrapped': ('Fitness Wrapped', 'Your year of movement from a Strava or Apple Health export, as a shareable card.', 'Strava activities.csv or Apple Health export.xml', 'Strava: Settings, My Account, Download or delete your account. Apple Health: Health app, your profile, Export All Health Data.', 'I covered N km this year. Card inside.'),
 'shelf-receipt': ('Shelf Receipt', 'Your Goodreads or Letterboxd year as a receipt.', 'Goodreads library export or Letterboxd diary.csv', 'Goodreads: My Books, Import and export. Letterboxd: Settings, Import and export.', 'I read N books this year. Receipt inside.'),
 'listening-receipt': ('Listening Receipt', 'Your Spotify listening as a receipt: hours, top artists, top tracks, late-night share.', 'Spotify Extended streaming history .json files', 'Spotify: Account, Privacy, Download your data, Extended streaming history.', 'I listened for N days nonstop. Receipt inside.'),
 'chat-awards': ('Group Chat Awards', 'Drop in a WhatsApp export and hand out the awards: the Chatterbox, the Ghost, the Night Owl and more.', 'A WhatsApp chat export .txt', 'WhatsApp: open the chat, menu, More, Export chat, Without media.', 'Our group chat awards. Who is the Ghost?'),
 'receipt-of-me': ('Receipt of Me', 'A joke receipt of your week, year or relationship. Always marked as not a real receipt.', 'Nothing', 'Pick a template and edit the lines.', 'The receipt of my week.'),
 'daily-guess': ('Daily Guess', 'Five daily guesses, three years and two distances, the same for everyone. Emoji grid to share.', 'Nothing', 'Open it once a day.', 'Daily Guess 11/15. Beat me.'),
}

def build():
    shared = {'/*@ICS*/': rd('shared', 'ics.js'), '/*@CARD*/': rd('shared', 'card.js')}
    css = rd('shared', 'base.css')
    for slug, (title, pitch, inp, how, hook) in META.items():
        path = os.path.join(ROOT, 'src', slug + '.html')
        if not os.path.exists(path):
            continue
        src = rd('src', slug + '.html')
        m = re.match(r'<!-- title: (.*?) \| (.*?) -->\n', src)
        t, d = (m.group(1), m.group(2)) if m else (title, pitch)
        src = src[m.end():] if m else src
        for k, v in shared.items():
            src = src.replace(k, v)
        src = src.replace('<!--@ICSDROP-->', ICSDROP).replace('<!--@ACTIONS-->', ACTIONS).replace('<!--@FOOT-->', FOOT)
        page = ('<!doctype html>\n<html lang="en"><head><meta charset="utf-8">'
                '<meta name="viewport" content="width=device-width, initial-scale=1">'
                '<title>%s</title><meta name="description" content="%s">\n<style>%s</style></head>\n<body><main>\n%s\n</main></body></html>\n'
                % (html.escape(t), html.escape(d), css, src))
        os.makedirs(os.path.join(ROOT, slug), exist_ok=True)
        open(os.path.join(ROOT, slug, 'index.html'), 'w', encoding='utf-8').write(page)
        readme = f'''# {title}

{pitch}

Open `index.html` in any browser. It is one file with no dependencies, so it also works hosted on GitHub Pages or any static host.

## Use it

- **You bring:** {inp}.
- **How to get it:** {how}
- **You get:** a card or receipt you can download as an image or copy as text.

## Privacy

Everything runs in the browser. Nothing is uploaded, there are no network calls and no tracking. Reading a file means the browser reads it locally and never sends it anywhere.

## Launch hook

"{hook}"

## Ship it

1. Create an empty repository named `{slug}` and copy this folder into it.
2. Turn on GitHub Pages (main branch, root) or upload `index.html` to any static host.
3. Post the hook with your own card attached.

The shared code (calendar parser, card drawing, styles) lives in `../shared` in the lab and is inlined into each page by `build.py`. After editing anything in `src` or `shared`, run `python3 build.py` from the lab folder.
'''
        open(os.path.join(ROOT, slug, 'README.md'), 'w', encoding='utf-8').write(readme)
        print('built', slug)
    # hub
    cards = ''.join(
        '<a class="t" href="%s/index.html"><b>%s</b><span>%s</span></a>' % (s, html.escape(v[0]), html.escape(v[1]))
        for s, v in META.items() if os.path.exists(os.path.join(ROOT, s, 'index.html')))
    hub = ('<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
           '<title>The Lab</title><meta name="description" content="Small free tools that turn your own data into something worth sharing. Everything runs in your browser.">\n'
           '<style>%s.tiles{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))}'
           '.t{display:block;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:18px;text-decoration:none;color:var(--ink)}'
           '.t:hover{border-color:var(--accent)}.t b{display:block;font-size:18px;margin-bottom:4px}.t span{color:var(--mute);font-size:14px}</style></head>\n'
           '<body><main><h1>The Lab</h1><p class="sub">Small, free tools that turn your own data into something worth sharing. Everything runs in your browser. Nothing is uploaded.</p>'
           '<div class="tiles">%s</div><p class="priv">No accounts, no tracking, no network calls.</p></main></body></html>\n' % (css, cards))
    open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(hub)

if __name__ == '__main__':
    build()
