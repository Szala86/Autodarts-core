<!-- README.de.md (Deutsch) -->

# Autodarts – CORE (Userscript)

**Sprachen:** [English](README.md) · [Magyar](README.hu.md) · [Deutsch](README.de.md)

Community-Userscript für **play.autodarts.io**: CORE-Panel, Presets, Skin/Layout und viele Quality-of-Life-Features.

> ⚠️ Hinweis: Community-Projekt, **nicht offiziell** und nicht mit Autodarts verbunden.

---

## Features (Highlights)

- **CORE Control Panel** (drag & drop, kompakter Modus, Hilfe)
- **3 Presets (A/B/C)** + Hotkeys
- **HU/EN/DE** Sprachunterstützung
- **Safe Mode** (verhindert extreme UI-Einstellungen)
- **Skin / Layout Modul**
  - UI-Skalierung, Spieler-Abstand
  - Background-URL + Overlay-Transparenz
  - Hintergrundfarbe/Transparenz für Player-Karten
  - Optionales **Auto-Off** bei Selector-Mismatch nach Autodarts-Update
- **Wurf → Punkte** (z.B. T20 = 60) + optionales Original-Label in der Ecke
- **Total Overlay Fix** (stabiles Layout)
- **Checkout Hinweis** Markierung
- **Aktiver Spieler Highlight**
- **Triple Animation**
- **Win Sound** (optional)
- **Floating Clock** (drag, scale, 24h toggle, seconds toggle)
- **Board Marker** (`ad-board-svg` Klasse für das Board-SVG)
- **Back-to-Autodarts Button** auf `/boards` (Touch/Vollbild)
- **Diagnose Tab** (Debug Info + Selector Checks)
- JSON **Export / Import** für Presets & Einstellungen

---

## Voraussetzungen

- Firefox / Chrome / Edge + Userscript-Manager:
  - **Violentmonkey** (empfohlen)
  - Tampermonkey / Greasemonkey

---

## Installation

1. Userscript-Manager installieren (Violentmonkey/Tampermonkey).
2. Installation aus **dist** (empfohlen):
   - https://raw.githubusercontent.com/Szala86/Autodarts-core/main/dist/autodarts-core.user.js
3. Öffnen: https://play.autodarts.io/  
4. Panel öffnen: **Shift + F** (oder per Gear-Button)

> Tipp: Bitte nur **ein** “Autodarts – CORE” Script aktiv lassen.

---

## Hotkeys

- **Shift + F** — Panel an/aus
- **Shift + 1 / 2 / 3** — Preset A / B / C
- **Shift + M** — Safe Mode an/aus
- **Shift + H** — Hilfe an/aus
- **Shift + T** — Uhr an/aus
- **Shift + R** — Uhr Reset
- **ESC** — Panel schließen

---

## Hinweise

- **Skin/Layout vs Stylebot:** Wenn Stylebot auf play.autodarts.io aktiv ist, bitte deaktivieren (Konflikte möglich).
- **Positionen:** Panel/Gear/Uhr sind frei verschiebbar, Position wird gespeichert.
- **Export/Import:** Exportiert/Importiert Einstellungen als JSON.

---

## Troubleshooting

### Panel erscheint nicht
- Script ist aktiv?
- Userscript-Manager meldet “SyntaxError”? Dann lädt das Script nicht.
- Mehrere CORE Scripts gleichzeitig aktiv? Bitte nur eins.

### Skin nach Autodarts Update kaputt
- “Auto-Disable bei Mismatch” im Skin-Tab aktivieren.
- Bei Warn-Toast: Autodarts hat vermutlich `css-xxxxx` Klassen geändert → Skin-Selektoren müssen aktualisiert werden.

---

## Repo Struktur

- `src/` – Source (editierbar)
- `dist/` – Release Build (von hier installieren)

---

## Development / Release

1. Bearbeiten: `src/autodarts-core.user.js`
2. Version erhöhen (2 Stellen):
   - `// @version      x.y.z`
   - `const SCRIPT_VERSION = "x.y.z";`
3. `src` komplett nach `dist/autodarts-core.user.js` kopieren
4. Commit & Push:
   - src Commit
   - dist Commit: “Release x.y.z”
5. Update-Quelle:
   - https://raw.githubusercontent.com/Szala86/Autodarts-core/main/dist/autodarts-core.user.js

---

## Credits / 3rd party

- **Back-to-AD-Button on Autodarts Board-Manager** — **MartinHH** (MIT)  
  https://greasyfork.org/en/scripts/490771-back-to-ad-button-on-autodarts-board-manager

- **Animate Triple Autodarts** — **amazingjin** (MIT)  
  https://greasyfork.org/scripts/490067-animate-triple-autodarts

---

## Support / Issues

Bugs & Feature Requests:  
https://github.com/Szala86/Autodarts-core/issues
