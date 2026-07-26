# Autodarts CORE

**Nyelvek:** [English](README.md) | [Magyar](README.hu.md) | [Deutsch](README.de.md)

Az Autodarts CORE egy nem hivatalos, böngészőben futó userscript a
[play.autodarts.io](https://play.autodarts.io/) felületéhez. Testreszabható
játéknézetet, érintésbarát dobásjavítást, egyedi táblamegjelenést,
játékoskártya-beállításokat, profilokat és vizuális effekteket ad.

> Közösségi projekt, amely nem áll kapcsolatban az Autodarts fejlesztőivel.

## Aktuális kiadás

- Verzió: `2.6.112-v1148-dart-toggle-view-reset`
- Kiadási fájl: [`autodarts-core.user.js`](autodarts-core.user.js)

## Fő funkciók

- Kétoldalas CORE és eredeti Autodarts elrendezés
- Reszponzív játékos-, dobás-, össz-, Tipp- és Checkout-kártyák
- Érintésbarát kör és kompakt dobásjavító
- Egyedi háttér-, darts tábla- és falvédőkép
- Név, átlag, pontszám, dobástörténet, aktív játékos, győztes és BUST állapot
- Preset A/B/C, Safe Mode, import/export, magyar/angol/német felület
- Óra, tripla animáció, győzelmi effektek és Tools for Autodarts kompatibilitás

## Telepítés

1. Telepíts userscript-kezelőt, például
   [Violentmonkeyt](https://violentmonkey.github.io/) vagy Tampermonkeyt.
2. Nyisd meg a RAW userscriptet:
   `https://raw.githubusercontent.com/Szala86/Autodarts-core/main/autodarts-core.user.js`
3. Engedélyezd a telepítést.
4. Egyszerre csak egy Autodarts CORE-verzió legyen bekapcsolva.
5. Kapcsold ki az ugyanazt a felületet módosító Stylebot-szabályokat.

## Frissítés

Használd a userscript-kezelő frissítési funkcióját. A kiadási fájl explicit
`@downloadURL` és `@updateURL` bejegyzésekkel a `main` ágra mutat.

## Hibaelhárítás

- Frissítés után töltsd újra teljesen a `play.autodarts.io` oldalt.
- Kapcsold ki a régebbi CORE-verziókat és az átfedő Stylebot-szabályokat.
- A betöltött verzió a böngésző konzoljában a
  `window.__AD_CORE_VERSION__` értékével ellenőrizhető.

## Licenc

Lásd: [LICENSE](LICENSE).