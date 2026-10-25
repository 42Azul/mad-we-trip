# Madrid, entre amigos

A mobile guide for Bastien, Sam, Fer and José, **23–25 October 2026**.

**Live site:** https://42azul.github.io/mad-we-trip/

## What is in the guide

- Friday arrival and dinner, Saturday’s old town / MAN / Gran Vía route, and Sunday’s three-person Tirso / Santa Ana churros / Toledo-Cebada flock / Rastro / Prado plan.
- City and Spanish history, a suggested two-hour MAN visit, and references beside the relevant claims.
- A street map with numbered stops, optional alternatives and host stations. OpenLayers renders it without WebGL.
- A **1656 map** switch using Madrid City Council’s georeferenced Texeira scan, with the same place pins for comparison. The scan’s rectangular extent is not an urban boundary.
- Google Maps routes with explicit origins, walking/transit choices and short multi-stop sections compatible with mobile waypoint limits.
- Alternatives that explain when they fit, what they replace, cost assumptions and drawbacks.
- Licensed photographs with creator, source and licence links. Neighbourhood views are labelled; no home photographs are included.
- Full English, Spanish and French text, with a remembered language selector in the header and detail panels. `?lang=en`, `?lang=es` and `?lang=fr` links override the saved preference. Proper names, addresses and navigation URLs stay canonical.
- Two-base logistics: Bastien with Fer in Pacífico, Sam with José in Quintana; separate Saturday breakfasts, a Sol meeting and Sunday churros together. Pair-specific outbound and return directions.
- Optional timed reveals and browser-local visited stops. Future names, photos, source links and destinations stay hidden until their reveal or an intentional preview.

## Development

Serve `dist/` with a static web server. There is no build step or package installation.

```sh
npm test
```

- `dist/data.js`: itinerary, history, alternatives, references and photo metadata.
- `dist/translations.js`: authored Spanish/French dictionaries keyed by the English source text.
- `dist/i18n.js`: language preference, reversible text/attribute localization and language controls. It never rewrites URLs or route data.
- `dist/app.js`: rendering, routes, maps and local preferences.
- `dist/style.css`: responsive layout.
- `dist/vendor/`: pinned OpenLayers 10.6.1 and ol-mapbox-style 13.6.0 browser bundles, CSS and licences.

The itinerary renders before map libraries load. Street tiles, historic imagery and photographs need an internet connection. If a map service is unavailable, the place list and Google Maps links remain available.

## Publishing

The workflow in `.github/workflows/pages.yml` verifies the guide and deploys the root entry plus `dist/` on pushes to `main`. The root entry opens `dist/` while preserving a section hash. The same layout also works when Pages is set to **Deploy from a branch → main → / (root)**. `.nojekyll` prevents a branch build from turning the README into the homepage. Both publishing modes therefore serve the same guide and asset paths.

A private Sites copy is maintained separately. Its `.openai/hosting.json` belongs to the Sites checkout and is not pushed into this GitHub repository.

## Information, images and privacy

Sources were checked **23 October 2026**; Sunday museum hours were rechecked **25 October 2026**. This is a dated plan, not a live opening-status, weather or availability service. The guide links to official sources and identifies budget allowances as estimates. No tables or tickets have been reserved.

Home map pins mark **Pacífico and Quintana stations**, not flats. No building numbers or contact details are published. Google Maps uses the selected starting station; choosing “My location” instead delegates location detection to Google Maps.

Surprise mode is a presentation feature, not access control: the data is in the page source and visitors can reveal it early. Local preferences and visited stops are per browser. Explicit ISO time offsets account for the Madrid daylight-saving change on 25 October.

Photographs are linked from Wikimedia Commons and include creator / source / licence metadata in `dist/data.js` and the visible captions. Images are resized, and card previews may be cropped. Original file pages provide full attribution and available resolutions. The Texeira map overview and sheet detail are public-domain reproductions; the map comparison uses the City Council’s georeferenced service with its own attribution.

Street map data: **© OpenStreetMap contributors**, OpenMapTiles and OpenFreeMap. Historic raster: **Ayuntamiento de Madrid, Geoportal**, Pedro Texeira’s 1656 map. A historic drawing’s georeferencing is approximate and should not be used for navigation. OpenLayers and ol-mapbox-style licences are included in `dist/vendor/`.

## Verification

`npm test` checks full translation coverage of content and rendered UI variants, plus pair assignments, breakfast order and route origins, Madrid reveal boundaries and Sunday DST, hidden markup, fixed route origins, mobile waypoint limits, transit-route constraints, itinerary integrity, reference IDs and photo attribution. Browser review also covers street and historic map rendering, real Google Maps route navigation, 360/390 px layouts, place details and filters.
