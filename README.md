# Autodarts CORE (Userscript)

**Nyelvek:** [English](README.md) · [Magyar](README.hu.md) · [Deutsch](README.de.md)

A modular userscript for **play.autodarts.io** that adds a configurable **CORE panel** with presets and UI enhancements.

> ⚠️ Disclaimer: This project is community-made and **not** affiliated with Autodarts.

## Features
- Presets **A/B/C**
- **HU / EN / DE** UI
- **Safe Mode**
- Toggleable **Skin / Layout** (integrated CSS)
- Throw value → points conversion (**T20 → 60**, **D2 → 4**, etc.)
- **Total overlay** fix
- Checkout tip highlighting
- Active player highlight
- Triple-hit animation
- Optional win music
- Floating clock widget
- Board marker utility
- Optional **“Back to Autodarts”** button on `/boards`

---

## Preview

### GIFs
<img src="docs/media/anim_panel_and_clock.gif" width="520" alt="Panel + Clock" />
<br/>
<img src="docs/media/anim_triple_hit.gif" width="520" alt="Triple hit animation" />

### Screenshots
<img src="docs/media/ui_panel_general.png" width="320" alt="General tab" />
<img src="docs/media/ui_skin_layout.png" width="320" alt="Skin / Layout tab" />
<img src="docs/media/ui_throw_points.png" width="320" alt="Throw points" />
<img src="docs/media/ui_total_overlay.png" width="320" alt="Total overlay" />
<img src="docs/media/ui_checkout_tip.png" width="320" alt="Checkout tip" />
<img src="docs/media/ui_clock_widget.png" width="320" alt="Clock widget" />

---

## Supported pages
- Match UI: `https://play.autodarts.io/matches/...`
- Boards page (optional back button): `https://play.autodarts.io/boards`

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
1. Install **Violentmonkey**
2. Open the RAW script URL:
   `https://raw.githubusercontent.com/Szala86/Autodarts-core/main/autodarts-core.user.js`
3. Click **Install**

### Tampermonkey (Chrome)
1. Install **Tampermonkey**
2. Open the RAW script URL:
   `https://raw.githubusercontent.com/Szala86/Autodarts-core/main/autodarts-core.user.js`
3. Click **Install**

---

## Updating
Use your userscript manager:
- “Check for updates” (or automatic updates if enabled)

---

## Usage notes
- Presets A/B/C store separate settings.
- Safe Mode limits extreme values to keep the UI stable.
- If you use **Stylebot** on play.autodarts.io, disable it to avoid conflicts with the integrated Skin/Layout module.

---

## Credits / Attribution
This project integrates / is inspired by:
- **Back-to-AD-Button** feature: based on **MartinHH**’s script
- **Animate Triple Autodarts** / triple-hit animation concept: based on **amazingjin**’s script

---

## Troubleshooting
Autodarts updates may change Chakra hashed classes (`.css-xxxxx`).
Prefer stable selectors like:
- `#ad-ext-turn`
- `#ad-ext-player-display`
- custom classes you control

---

## License
