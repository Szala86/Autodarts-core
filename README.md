<!-- README.md (English) -->

# Autodarts – CORE (Userscript)

**Languages:** [English](README.md) · [Magyar](README.hu.md) · [Deutsch](README.de.md)

Community-made userscript for **play.autodarts.io** that adds a powerful control panel, presets, UI/skin options and quality-of-life improvements.

> ⚠️ Disclaimer: This project is community-made and **not** affiliated with Autodarts.

---

## Features (highlights)

- **CORE control panel** (drag & drop, compact mode, help)
- **3 presets (A/B/C)** + hotkeys (quick switching)
- **HU/EN/DE** language support
- **Safe Mode** (prevents extreme/unsafe UI settings)
- **Skin / Layout module**
  - UI scale, player spacing
  - Background URL + overlay alpha
  - Player card background color + opacity
  - Optional **auto-disable** if a selector mismatch is detected after an Autodarts update
- **Throw → Points** (e.g. T20 = 60) + optional original label in the corner
- **Total overlay fix** (stable layout, predictable styling)
- **Checkout tip** marker
- **Active player highlight**
- **Triple hit animation**
- **Win sound** (optional)
- **Floating clock** widget (drag, scale, 24h toggle, seconds toggle)
- **Board marker** (adds `ad-board-svg` class to the board SVG)
- **Back-to-Autodarts button** on `/boards` (useful for touch/fullscreen)
- **Diagnostics tab** (debug info + selector checks)
- JSON **Export / Import** for presets & settings

---

## Requirements

- Firefox / Chrome / Edge + a userscript manager:
  - **Violentmonkey** (recommended)
  - Tampermonkey / Greasemonkey

---

## Installation

1. Install a userscript manager (Violentmonkey/Tampermonkey).
2. Install from the **dist** build (recommended):
   - https://raw.githubusercontent.com/Szala86/Autodarts-core/main/dist/autodarts-core.user.js
3. Open https://play.autodarts.io/  
4. Press **Shift + F** to open the CORE panel (or use the floating gear button).

> Tip: Make sure only **one** “Autodarts – CORE” script is enabled in your userscript manager.

---

## Hotkeys

- **Shift + F** — Toggle panel
- **Shift + 1 / 2 / 3** — Preset A / B / C
- **Shift + M** — Safe Mode toggle
- **Shift + H** — Help toggle
- **Shift + T** — Clock toggle
- **Shift + R** — Clock reset
- **ESC** — Close panel

---

## Usage notes

- **Skin/Layout vs Stylebot:** If you use Stylebot on play.autodarts.io, disable it to avoid conflicts.
- **Positions:** Panel, gear button and clock can be dragged. Positions are remembered.
- **Export/Import:** Use the **Export** button to save presets/settings into a JSON file.

---

## Troubleshooting

### The panel doesn’t appear
- Check that the script is **enabled** in Violentmonkey/Tampermonkey.
- Ensure there is no “SyntaxError” shown by the userscript manager (a syntax error prevents loading).
- Make sure you don’t have multiple CORE scripts enabled at once.

### Skin looks broken after an Autodarts update
- Enable **auto-disable on mismatch** in *Skin / Layout*.
- If you see a warning toast, Autodarts may have changed CSS class names (`css-xxxxx`). In that case the Skin selectors may need an update.

---

## Repository structure

- `src/` – editable source
- `dist/` – release build (the script you install from)

---

## Development / Release (copy-paste routine)

1. Edit: `src/autodarts-core.user.js`
2. Bump version in **two places**:
   - `// @version      x.y.z`
   - `const SCRIPT_VERSION = "x.y.z";`
3. Copy `src/autodarts-core.user.js` → `dist/autodarts-core.user.js` (entire file)
4. Commit & push:
   - commit for src changes
   - commit “Release x.y.z” for dist update
5. Userscript managers will update from:
   - https://raw.githubusercontent.com/Szala86/Autodarts-core/main/dist/autodarts-core.user.js

---

## Credits / Third-party work

This project integrates and adapts ideas/code from community scripts (thank you!):

- **Back-to-AD-Button on Autodarts Board-Manager** — by **MartinHH** (MIT)  
  https://greasyfork.org/en/scripts/490771-back-to-ad-button-on-autodarts-board-manager

- **Animate Triple Autodarts** — by **amazingjin** (MIT)  
  https://greasyfork.org/scripts/490067-animate-triple-autodarts

---

## Support / Issues

Please report bugs and requests here:  
https://github.com/Szala86/Autodarts-core/issues
