# Autodarts CORE

**Sprachen:** [English](README.md) | [Magyar](README.hu.md) | [Deutsch](README.de.md)

Autodarts CORE ist ein inoffizielles Userscript für
[play.autodarts.io](https://play.autodarts.io/). Es bietet ein konfigurierbares
Match-Layout, touchfreundliche Wurfkorrektur, benutzerdefinierte Board-Darstellung,
Spielerkarten, Profile und visuelle Effekte.

> Community-Projekt, nicht offiziell und nicht mit Autodarts verbunden.

## Aktuelle Version

- Version: `2.6.112-v1148-dart-toggle-view-reset`
- Release-Datei: [`autodarts-core.user.js`](autodarts-core.user.js)

## Hauptfunktionen

- Zweiseitiges CORE-Layout und originales Autodarts-Layout
- Responsive Spieler-, Wurf-, Gesamt-, Tipp- und Checkout-Karten
- Touchfreundliche Ring- und Kompakt-Korrektur
- Eigene Hintergrund-, Dartboard- und Surround-Bilder
- Name, Average, Score, Wurfverlauf, aktiver Spieler, Sieg- und BUST-Status
- Presets A/B/C, Safe Mode, Import/Export und HU/EN/DE-Oberfläche
- Uhr, Triple-Animation, Sieges-Effekte und Tools-for-Autodarts-Kompatibilität

## Installation

1. Einen Userscript-Manager wie
   [Violentmonkey](https://violentmonkey.github.io/) oder Tampermonkey installieren.
2. Das RAW-Userscript öffnen:
   `https://raw.githubusercontent.com/Szala86/Autodarts-core/main/autodarts-core.user.js`
3. Installation bestätigen.
4. Nur eine Autodarts-CORE-Version gleichzeitig aktivieren.
5. Stylebot-Regeln deaktivieren, die dieselbe Autodarts-Oberfläche verändern.

## Aktualisierung

Die Update-Funktion des Userscript-Managers verwenden. Die Release-Datei enthält
explizite `@downloadURL`- und `@updateURL`-Einträge für den `main`-Branch.

## Fehlerbehebung

- `play.autodarts.io` nach einem Update vollständig neu laden.
- Ältere CORE-Versionen und überlappende Stylebot-Regeln deaktivieren.
- Die geladene Version ist in der Browser-Konsole über
  `window.__AD_CORE_VERSION__` prüfbar.

## Lizenz

Siehe [LICENSE](LICENSE).