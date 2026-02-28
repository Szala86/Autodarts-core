<!-- README.hu.md (Magyar) -->

# Autodarts – CORE (Userscript)

**Nyelvek:** [English](README.md) · [Magyar](README.hu.md) · [Deutsch](README.de.md)

Közösségi userscript a **play.autodarts.io** oldalhoz: CORE panel, presetek, Skin/Layout, valamint sok “quality-of-life” extra.

> ⚠️ Jogi/egyéb: Ez egy közösségi fejlesztés, **nem hivatalos Autodarts kiegészítő**.

---

## Funkciók (kiemelve)

- **CORE vezérlőpanel** (húzható, kompakt mód, súgó)
- **3 preset (A/B/C)** + gyorsbillentyűk
- **HU/EN/DE** nyelv
- **Safe Mode** (nem enged extrém/veszélyes UI értékeket)
- **Skin / Layout modul**
  - UI méret (scale), játékos távolság (spacing)
  - Háttérkép URL + overlay áttetszőség
  - Player kártya háttérszín + áttetszőség
  - Opcionális **auto-kikapcsolás**, ha frissítés után “selector mismatch” gyanú van
- **Dobás → pontérték** (pl. T20 = 60) + opcionális sarok jelölés (eredeti)
- **Total overlay fix** (stabil kártya-méret, kiszámítható stílus)
- **Checkout tipp** jelölés
- **Aktív játékos kiemelés**
- **Tripla animáció**
- **Győzelem hang** (opcionális)
- **Lebegő óra** widget (húzható, méretezhető, 24h/másodperc toggle)
- **Board marker** (`ad-board-svg` class a tábla SVG-n)
- **Vissza az Autodartsba** gomb a `/boards` oldalon (touch/fullscreenhez jó)
- **Diagnosztika** fül (debug info + szelektor ellenőrzés)
- Presetek/állapot **Export / Import** (JSON)

---

## Követelmények

- Firefox / Chrome / Edge + userscript kezelő:
  - **Violentmonkey** (ajánlott)
  - Tampermonkey / Greasemonkey

---

## Telepítés

1. Telepíts egy userscript kezelőt (Violentmonkey/Tampermonkey).
2. Telepítsd a **dist** verziót (ajánlott):
   - https://raw.githubusercontent.com/Szala86/Autodarts-core/main/dist/autodarts-core.user.js
3. Nyisd meg: https://play.autodarts.io/
4. Panel: **Shift + F** (vagy a lebegő “fogaskerék” gomb)

> Tipp: ellenőrizd, hogy a Violentmonkey-ben csak **1 db** “Autodarts – CORE” script legyen bekapcsolva.

---

## Gyorsbillentyűk

- **Shift + F** — Panel ki/be
- **Shift + 1 / 2 / 3** — Preset A / B / C
- **Shift + M** — Safe Mode ki/be
- **Shift + H** — Súgó ki/be
- **Shift + T** — Óra ki/be
- **Shift + R** — Óra reset
- **ESC** — Panel bezár

---

## Használati megjegyzések

- **Skin/Layout vs Stylebot:** ha használsz Stylebotot a play.autodarts.io-hoz, kapcsold ki, mert ütközhet.
- **Pozíciók:** a panel/fogaskerék/óra húzható; a pozíció mentődik.
- **Export/Import:** Export gombbal JSON-ba menthetőek a beállítások.

---

## Hibaelhárítás

### Nem jelenik meg a panel
- Ellenőrizd, hogy a script **engedélyezve** van.
- Ha a VM “SyntaxError”-t jelez, a script nem tud elindulni.
- Ne legyen több CORE script egyszerre bekapcsolva.

### Skin elcsúszott Autodarts frissítés után
- Kapcsold be a Skin fülön az **auto-kikapcsolást mismatch esetén**.
- Ha figyelmeztető toast jön, valószínűleg az Autodarts megváltoztatta a `css-xxxxx` class neveket → a Skin szelektorokat frissíteni kell.

---

## Repo felépítés

- `src/` – szerkeszthető forrás
- `dist/` – “release” build (innen telepíts)

---

## Fejlesztés / Release lépések (rutin)

1. Módosítás: `src/autodarts-core.user.js`
2. Verzió emelés **két helyen**:
   - `// @version      x.y.z`
   - `const SCRIPT_VERSION = "x.y.z";`
3. Másold át a teljes `src` fájlt a `dist/autodarts-core.user.js`-be
4. Commit & push:
   - src commit
   - dist commit: “Release x.y.z”
5. A VM frissít innen:
   - https://raw.githubusercontent.com/Szala86/Autodarts-core/main/dist/autodarts-core.user.js

---

## Köszönet / 3rd party kredit

A projekt két funkciónál közösségi scriptekből indul ki (köszi!):

- **Back-to-AD-Button on Autodarts Board-Manager** — **MartinHH** (MIT)  
  https://greasyfork.org/en/scripts/490771-back-to-ad-button-on-autodarts-board-manager

- **Animate Triple Autodarts** — **amazingjin** (MIT)  
  https://greasyfork.org/scripts/490067-animate-triple-autodarts

---

## Hibajegy / támogatás

Ide jöhetnek bugok, ötletek:  
https://github.com/Szala86/Autodarts-core/issues
