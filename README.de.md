<!-- README.de.md (Deutsch) -->

# Autodarts – CORE (Userscript)

**Sprachen:** [English](README.md) · [Magyar](README.hu.md) · [Deutsch](README.de.md)

Ein modulares Userscript für **play.autodarts.io**, das ein konfigurierbares **CORE Panel** mit Presets und UI-Features hinzufügt.

> ⚠️ Hinweis: Community-Projekt, **nicht offiziell** und nicht mit Autodarts verbunden.

## Features
- Presets **A/B/C**
- **HU / EN / DE** UI
- **Safe Mode**
- Schaltbares **Skin / Layout** (integriertes CSS)
- Wurfwert → Punkte (**T20 → 60**, **D2 → 4**, usw.)
- **Total overlay** Fix
- Checkout-Tipp Hervorhebung
- Hervorhebung des aktiven Spielers
- Triple-Treffer Animation
- Optionale Sieg-Musik
- Schwebendes Uhr-Widget
- Board-Marker Utility
- Optionaler **„Zurück zu Autodarts“** Button auf `/boards`

---

## Vorschau

### GIFs
<img src="docs/media/anim_panel_and_clock.gif" width="520" alt="Panel + Uhr" />
<br/>
<img src="docs/media/anim_triple_hit.gif" width="520" alt="Triple hit animation" />

### Screenshots
<img src="docs/media/ui_panel_general.png" width="320" alt="Allgemein" />
<img src="docs/media/ui_skin_layout.png" width="320" alt="Skin / Layout" />
<img src="docs/media/ui_throw_points.png" width="320" alt="Wurfpunkte" />
<img src="docs/media/ui_total_overlay.png" width="320" alt="Gesamtwert (overlay)" />
<img src="docs/media/ui_checkout_tip.png" width="320" alt="Checkout Tipp" />
<img src="docs/media/ui_clock_widget.png" width="320" alt="Uhr Widget" />

---

## Unterstützte Seiten
- Match UI: `https://play.autodarts.io/matches/...`
- Boards-Seite (optional): `https://play.autodarts.io/boards`

---

## Hotkeys
- **Shift+F** — Panel ein/aus
- **Shift+1 / Shift+2 / Shift+3** — Preset A / B / C
- **Shift+M** — Safe Mode umschalten
- **Shift+H** — Hilfe umschalten
- **Shift+T** — Uhr umschalten
- **Shift+R** — Uhr reset
- **ESC** — schließen

---

## Installation

### Violentmonkey (Firefox)
1. **Violentmonkey** installieren
2. RAW Script URL öffnen:
   `https://raw.githubusercontent.com/Szala86/Autodarts-core/main/autodarts-core.user.js`
3. **Install** klicken

### Tampermonkey (Chrome)
1. **Tampermonkey** installieren
2. RAW Script URL öffnen:
   `https://raw.githubusercontent.com/Szala86/Autodarts-core/main/autodarts-core.user.js`
3. **Install**

---

## Updates
Im Userscript-Manager:
- “Check for updates” (oder Auto-Update)

---

## Hinweise
- Presets A/B/C speichern getrennte Einstellungen.
- Safe Mode begrenzt extreme Werte, damit das UI stabil bleibt.
- Wenn du **Stylebot** für play.autodarts.io nutzt, bitte deaktivieren (Konflikte mit Skin/Layout möglich).

---

## Credits / Attribution
- **Back-to-AD-Button**: basiert auf **MartinHH**’s Script
- **Animate Triple Autodarts** / Triple Animation Konzept: basiert auf **amazingjin**’s Script

---

## Troubleshooting
Nach Autodarts-Updates können sich Chakra Hash-Klassen (`.css-xxxxx`) ändern.
Bevorzuge stabile Selektoren wie:
- `#ad-ext-turn`
- `#ad-ext-player-display`
- eigene Klassen

---

## Lizenz
Empfohlen: `LICENSE` Datei hinzufügen.
