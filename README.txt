RISHI & NAADHAM — WEDDING WEBSITE
==================================

WHAT'S INSIDE
-------------
index.html              The website itself
assets/images/*.jpg      The 7 backgrounds you provided (hero, temple, river,
                         golden path, footer scenes)
assets/video/lotus-reveal.mp4   The animation that plays when a guest taps
                         the lotus in the "Sacred Date" section

HOW TO VIEW IT
---------------
Just double-click index.html to open it in any browser (Chrome, Safari,
Edge, Firefox). Everything will load correctly as long as the "assets"
folder stays in the same directory as index.html — don't separate them.

HOW TO PUT IT ONLINE
----------------------
Upload this whole folder (index.html + assets/) as-is to any static host:
  - Netlify / Vercel: drag-and-drop the folder in their dashboard
  - GitHub Pages: push the folder to a repo and enable Pages
  - Any regular web hosting / cPanel: upload via FTP into public_html

No build step, server, or database is needed — it's a plain static site.

ADD BACKGROUND MUSIC (OPTIONAL)
---------------------------------
The music toggle button (top right) is wired up but has no audio file yet.
Add your own track as an MP3 named "ambient.mp3" inside the assets folder:

  assets/ambient.mp3

The site already looks for it at that path — nothing else to change.

EDITING TEXT / DETAILS
------------------------
Open index.html in any text editor. All the copy (names, dates, family
details, venue, contact numbers) is plain, readable text inside the HTML —
search for the section you want (Ctrl/Cmd+F for words like "Vismaya",
"Kasinathan", "RSVP", etc.) and edit directly.

A NOTE ON PRIVACY
--------------------
Phone numbers and home addresses are included exactly as shown in your
reference designs. Once this site is live and the link is shared, that
information becomes effectively public — double check you're comfortable
with that before sending it out widely.

RSVP FORM
-----------
The RSVP form has no backend/database — when a guest submits it, it shows
a thank-you message and offers a pre-filled WhatsApp link to the first
contact number so their response reaches you directly. If you'd like RSVPs
collected into a spreadsheet instead, that would need a small backend
(e.g. a Google Form embed or a simple form service) — just ask and it can
be added.
