# Madrid, entre amigos

A mobile-first weekend guide for Bastien, Sam, Fer and José, 23–25 October 2026.

## Features

- Three-day itinerary, with a short historical guide for each landmark.
- MapLibre/OpenFreeMap maps, filtered by day, with both starting metro stations.
- Optional surprise mode: future names, pins and directions unlock at explicit Madrid times, or by a voluntary early peek.
- Separate nearby ideas and alternatives, without changing the main itinerary.
- Directions from the visitor’s location, Pacífico or Quintana; Wikipedia and source links.
- Browser-local visited stops and reveal preferences.
- Responsive mobile navigation, accessible buttons, keyboard-friendly dialogs and reduced-motion support.

## Development

No build or package installation is required. Serve `dist/` with any static web server. Run checks with Node 22+:

```sh
npm test
```

Content lives in `dist/data.js`; behaviour in `dist/app.js`; appearance in `dist/style.css`.

## Publishing

A GitHub Pages workflow is included. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**. Private repositories require a GitHub plan that supports Pages for private repositories. A Pages site may be public even when its repository is private: choose the intended audience before enabling it. No access-control claim is made by this client-side application.

The project is also prepared for static Sites hosting. The Sites-specific `.openai/hosting.json` is maintained only in the hosting checkout, not this GitHub repository.

## Information and privacy

The content was checked on 23 October 2026. It is a dated curated guide, not a live updates service. Opening hours, fares, routes, queues and event timings can change. Links to official sources are included in the app. Google Maps handles current routing.

Home pins are the Pacífico and Quintana metro stations, **not exact flats**. Street names were supplied by the hosts; no building number or personal contact details are included.

Surprise mode is a playful presentation feature, **not security**. All content is in the client-side source, and visitors can reveal it voluntarily. It uses explicit ISO offsets for the 25 October daylight-saving change. Reveals and visited choices are per browser, not shared between friends. Local storage is optional; the guide still works if unavailable.

Maps need an internet connection. If tiles or the map library fail, individual Google Maps directions remain available. No offline caching of map tiles is attempted. Map pins are approximate and should not be used as entrance-level navigation.

## Sources and attribution

Official visitor information: MAN, Museo del Prado, Museo Reina Sofía, Madrid City Council, CRTM, Madrid Tourism and venue websites. Bars without a dedicated Wikipedia article link to a clearly labelled neighbourhood article. The app includes sources beside the relevant details.

Map data © OpenStreetMap contributors, available under ODbL, with OpenFreeMap and OpenMapTiles attribution displayed by the map. MapLibre GL JS 5.8.0 is loaded from unpkg (BSD-3-Clause). No API key is needed. The postcard illustration is an original decorative SVG, not a geographic diagram.
