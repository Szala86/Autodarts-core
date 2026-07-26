# Autodarts CORE

**Sprachen:** [English](README.md) Â· [Magyar](README.hu.md) Â· [Deutsch](README.de.md)

Autodarts CORE ist ein inoffizielles Userscript fĂĽr
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
- Presets A/B/C, Safe Mode, Import/Export und HU/EN/DE-OberflĂ¤che
- Uhr, Triple-Animation, Sieges-Effekte und Tools-for-Autodarts-KompatibilitĂ¤t

## Installation

1. Einen Userscript-Manager wie
   [Violentmonkey](https://violentmonkey.github.io/) oder Tampermonkey installieren.
2. Das RAW-Userscript Ă¶ffnen:
   `https://raw.githubusercontent.com/Szala86/Autodarts-core/main/autodarts-core.user.js`
3. Installation bestĂ¤tigen.
4. Nur eine Autodarts-CORE-Version gleichzeitig aktivieren.
5. Stylebot-Regeln deaktivieren, die dieselbe Autodarts-OberflĂ¤che verĂ¤ndern.

## Aktualisierung

Die Update-Funktion des Userscript-Managers verwenden. Die Release-Datei enthĂ¤lt
explizite `@downloadURL`- und `@updateURL`-EintrĂ¤ge fĂĽr den `main`-Branch.

## Fehlerbehebung

- `play.autodarts.io` nach einem Update vollstĂ¤ndig neu laden.
- Ă„ltere CORE-Versionen und ĂĽberlappende Stylebot-Regeln deaktivieren.
- Die geladene Version ist in der Browser-Konsole ĂĽber
  `window.__AD_CORE_VERSION__` prĂĽfbar.

## Lizenz

Siehe [LICENSE](LICENSE).