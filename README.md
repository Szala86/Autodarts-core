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

## Install (Violentmonkey / Tampermonkey)
1. Open this link:
   **Install:** https://raw.githubusercontent.com/Szala86/Autodarts-core/main/autodarts-core.user.js
2. Your userscript manager will show an install page → click **Install**.

## Updates
The script has `@updateURL` and `@downloadURL`, so Violentmonkey can update automatically.
- Violentmonkey: Dashboard → script → **Check for updates**

## Important note about Stylebot
If you use **Stylebot**, disable it for Autodarts while this script is active, because the CSS can conflict and cause double-styling.

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
Open an issue here:
https://github.com/Szala86/Autodarts-core/issues

## License
MIT (see LICENSE)
