# María Fernanda Molina Ron Portfolio Preview V4

This is the lighter visual direction for the portfolio. It keeps the same static HTML, CSS and vanilla JavaScript architecture, with Leaflet for the hero map.

## Preview in Firefox

1. Extract the ZIP.
2. Open the extracted folder.
3. Double-click `index.html`.
4. Keep an internet connection active so the web fonts and Leaflet map tiles can load.
5. In Firefox, press `Ctrl + Shift + M` to test phone and tablet widths.

## V3 changes

- Replaced the almost-black visual system with an off-white, pale teal and warm neutral palette.
- Kept a dark footer for contrast.
- Added a portrait placeholder in the About section.
- Changed the personal section to three future photo slots: soccer, hiking and singing.
- Updated teaching experience to 140+ students per year.
- Added Institut Polytechnique de Paris and a link to the GenHack page.
- Made the three top proof items use a consistent title, institution/project and place pattern.
- Removed the generic introductory sentences from Capabilities and Experience.
- Simplified the language section and Italian note.
- Updated the LinkedIn URL.
- Removed the three CV download placeholders. A single general CV can be added later only if desired.
- Final project media, PDFs and missing project links are still intentionally pending.

## Future media structure

```text
media/
  profile/
    portrait.jpg
  projects/
    thesis/
    genhack/
    mobility/
    avalanche/
    gis-software/
  hobbies/
    soccer.jpg
    hiking.jpg
    singing.jpg
  icons/
```


## V4 personal media

The About portrait and the Soccer, Hiking and Singing images are now integrated in `media/profile/` and `media/hobbies/`. The CSS uses `object-fit: cover` and per-image `object-position` values so the original files can remain uncropped.
