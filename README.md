<!-- README.md (English) -->

# Autodarts CORE (Userscript)

A modular userscript for **play.autodarts.io** that adds a configurable **CORE panel** with presets and UI enhancements.

It includes:
- Presets A/B/C
- HU / EN / DE UI
- Safe Mode
- Toggleable Skin/Layout (integrated CSS)
- Throw value → points conversion (T20 → 60, D2 → 4, etc.)
- Total overlay fix
- Checkout tip highlighting
- Active player highlight
- Triple-hit animation
- Optional win music
- Floating clock widget
- Board marker utility
- Optional “Back to Autodarts” button on `/boards`

---

## Preview

### GIFs
![Panel + Clock](docs/anim_panel_and_clock.gif)
![Triple hit](docs/anim_triple_hit.gif)

### Screenshots
![General](docs/ui_panel_general.png)
![Skin / Layout](docs/ui_skin_layout.png)
![Throw points](docs/ui_throw_points.png)
![Total overlay](docs/ui_total_overlay.png)
![Checkout tip](docs/ui_checkout_tip.png)
![Clock widget](docs/ui_clock_widget.png)

---

## Supported pages
- `https://play.autodarts.io/matches/...` (match UI)
- `https://play.autodarts.io/boards` (optional back button)

---

## Hotkeys
- **Shift+F** — toggle panel
- **Shift+1 / Shift+2 / Shift+3** — Preset A / B / C
- **Shift+M** — Safe Mode toggle
- **Shift+H** — Help toggle
- **Shift+T** — Clock toggle
- **Shift+R** — Clock reset
- **ESC** — close panel

---

## Installation

### Violentmonkey (Firefox)
1. Install **Violentmonkey** add-on
2. Open the RAW script URL:
   ```txt
   https://raw.githubusercontent.com/Szala86/Autodarts-core/main/autodarts-core.user.js

Click Install

Tampermonkey (Chrome)

Same steps:

Install Tampermonkey

Open the RAW script URL:

https://raw.githubusercontent.com/Szala86/Autodarts-core/main/autodarts-core.user.js

Click Install

Updating

The userscript updates via your manager (Violentmonkey/Tampermonkey):

“Check for updates” (or automatic update if enabled)

Usage notes

Presets A/B/C store separate settings (so you can keep different looks or setups).

Safe Mode limits extreme values to avoid breaking the UI layout.

Skin / Layout integrates a CSS layout skin.
If you also use Stylebot, disable it for play.autodarts.io to avoid conflicts.

Credits / Attribution

This project integrates / is inspired by:

Back-to-AD-Button feature: based on MartinHH’s script

Animate Triple Autodarts / triple-hit animation idea: based on amazingjin’s script

(Names credited as requested. If you want, you can add direct source links here.)

Troubleshooting

If Autodarts updates and some selectors change, the Skin module may need an update.

Prefer stable selectors like:

#ad-ext-turn

#ad-ext-player-display

your own custom classes
over Chakra hashed classes (.css-xxxxx).

License

See LICENSE (if present) or add your preferred license file.
