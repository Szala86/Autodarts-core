# Autodarts CORE

Az **Autodarts CORE** egy böngészőben futó userscript a
[play.autodarts.io](https://play.autodarts.io/) felületéhez. A célja egy
jobban alakítható, két játékosra optimalizált játéknézet, érintőképernyőn is
használható dobásjavítás, valamint egyedi tábla- és kártyamegjelenés.

> Nem hivatalos Autodarts-kiegészítő. Az Autodarts felületének frissítései
> időnként userscript-frissítést tehetnek szükségessé.

## Aktuális verzió

- Userscript: [`src/Autodarts_CORE_v1101.user.js`](src/Autodarts_CORE_v1101.user.js)
- Verzió: `2.6.65-v1101-native-multiplayer-name-row`
- Részletes fejlesztési napló: [`PROJECT_CHANGELOG.md`](PROJECT_CHANGELOG.md)

## Fő funkciók

### Játéknézet

- Választható kétoldalas CORE és eredeti Autodarts elrendezés.
- A játékos-, dobás- és Darts Zoom kártyák mindkét nézetben a rendelkezésre álló helyhez igazodnak.
- A dobáskártyák automatikus középre igazítása a két játékoskártya között.
- Helyi háttérkép feltöltése, WQHD-minőség és automatikus tárhelyhez igazítás,
  színes overlay és áttetszőség.
- Kamera-, számos- és normál táblanézethez igazodó középső terület.
- Kompatibilitási igazítások a **Tools for Autodarts** rejtett oldalsávjához
  és Darts Zoom kártyáihoz.
- A **Tools for Autodarts** GIF/reaction overlay célzott megjelenítése.

### Játékoskártyák

- Saját háttérszín és áttetszőség.
- Feltölthető egyedi betűtípus.
- Pontszám, név és átlag megjelenítése, méretezése és elrendezése.
- Saját, görgethető dobástörténet.
- Aktív játékos színe, kerete és glow-ja.
- Külön állítható színű és áttetszőségű győztes-, illetve túldobás/BUST állapot.
- Győzelmi konfetti és beállítható győzelmi hang.

### Dobás- és összkártyák

- A dobásérték, sarokjelölés, összérték, Tipp és Checkout külön állítható.
- Saját színek, áttetszőség, háttér és hover állapot.
- Külön feltölthető betűtípus a dobáskártyákhoz és az összkártyához.
- Tripla találat animációja.
- Stabil Undo/Next, illetve Bouncer/Mégse/OK gombpozíció.

### Érintéses dobásjavítás

A dobáskártyára koppintva két javítófelület közül lehet választani:

- **Kör javító:** szorzóválasztó és végtelenül görgethető számkerék.
- **Kompakt javító:** a javítandó érték körüli legvalószínűbb dobások nagy,
  érintésbarát gombokon.
- A funkció teljesen kikapcsolható.
- Az Alkalmaz és a Mégse bezárja a javítást, majd visszaadja a játék vezérlését.

### Egyedi tábla

- Helyi JPG, PNG vagy WebP táblakép feltöltése.
- Külön falvédő/surround kép feltöltése; átlátszó PNG ajánlott.
- A tábla, a falvédő és a teljes csoport külön méretezhető és pozicionálható.
- A táblakép forgatható, a natív dobásréteg áttetszősége állítható.
- A natív dobásjelölők az egyedi kép fölött maradnak.
- A gyári állapotjelző glow automatikusan a táblához vagy a falvédőhöz igazodik.

### Beállítások

- Három külön profil: Preset A, B és C.
- Magyar, angol és német kezelőfelület.
- Beállítások exportálása és importálása.
- Safe Mode és kompakt panel.
- Mozgatható, formázható óra widget.
- Főkapcsoló az egész Autodarts CORE ki- és bekapcsolásához.

## Telepítés

1. Telepíts egy userscript-kezelőt, például
   [Violentmonkeyt](https://violentmonkey.github.io/) vagy Tampermonkeyt.
2. Hozz létre egy új userscriptet.
3. A létrehozott script teljes tartalmát cseréld le az
   [`Autodarts_CORE_v1101.user.js`](src/Autodarts_CORE_v1101.user.js) fájl
   tartalmára.
4. Mentsd el, majd frissítsd a `play.autodarts.io` oldalt.
5. Ügyelj rá, hogy egyszerre csak egy Autodarts CORE-verzió legyen engedélyezve.

## Használat

- A lebegő fogaskerék gombbal vagy `Shift+F`-fel nyitható meg a panel.
- `Shift+1`, `Shift+2`, `Shift+3`: Preset A, B, C.
- `Shift+M`: Safe Mode.
- `Shift+H`: súgó.
- `Esc`: panel vagy megnyitott javító bezárása.

A képek, betűtípusok és beállítások helyben, az adott böngészőben tárolódnak.
A script nem igényel külső háttérkép-URL-t.

## Hibaelhárítás

- Ha az oldal lassú vagy nem tölt be, először ellenőrizd, hogy nincs-e több
  CORE-verzió egyszerre bekapcsolva.
- Kapcsold ki az ugyanazt a felületet módosító Stylebot-szabályokat.
- Frissítsd teljesen az oldalt a userscript cseréje után.
- Hibajelentésnél add meg a script verzióját, a böngészőt, a képernyőképet és
  a hiba pontos lépéseit.
- A betöltött verzió a böngésző konzoljában a
  `window.__AD_CORE_VERSION__` értékével ellenőrizhető.

## Fejlesztés és ellenőrzés

A teljes userscriptet minden módosítás után szintaktikailag ellenőrizni kell:

```powershell
node --check .\src\Autodarts_CORE_v1101.user.js
```

Alternatív projektellenőrzés:

```powershell
node .\scripts\validate-userscript.js .\src\Autodarts_CORE_v1101.user.js
```

A régi verziók és diagnosztikák az `archive/` könyvtárban csak
visszakeresésre szolgálnak.
