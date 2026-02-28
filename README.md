# Autodarts CORE (Userscript)

All-in-one userscript for https://play.autodarts.io:
- CORE panel with presets (A/B/C)
- HU/EN/DE language toggle
- Safe Mode limits
- Throw cards: S/D/T → points + optional original label in corner
- Total overlay fix
- Checkout highlight
- Active player highlight
- Triple hit animation
- Win sound
- Floating clock widget
- Optional Back-to-Autodarts button on `/boards`
- Optional integrated Skin/Layout module (replaces Stylebot CSS)

## Install
Use Violentmonkey/Tampermonkey and install from:
dist/autodarts-core.user.js (raw)

## Development
Edit: src/autodarts-core.user.js  
Release: copy src → dist, bump @version + SCRIPT_VERSION, commit & push.

Open this URL (RAW userscript):
https://raw.githubusercontent.com/Szala86/Autodarts-core/main/autodarts-core.user.js

Your userscript manager will show an install page → click **Install**.

## Updates
The script includes `@updateURL` and `@downloadURL`, so Violentmonkey can update automatically.
- Violentmonkey: Dashboard → this script → **Check for updates**

## Stylebot note (important)
If you also use **Stylebot** on Autodarts, **disable it for this site** (or turn off your Autodarts Stylebot rules),
because it can conflict with this script (double styling / broken layout).

## Hotkeys
- Shift+F — open/close panel
- Shift+1/2/3 — Preset A/B/C
- Shift+M — Safe Mode toggle
- Shift+H — Help toggle
- Shift+T — Clock toggle
- Shift+R — Clock reset
- ESC — close panel

## Screenshots
Put screenshots into: `docs/screenshots/`

## Issues / Feature requests
https://github.com/Szala86/Autodarts-core/issues

## License
MIT (see LICENSE)
