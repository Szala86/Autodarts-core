<!-- README.hu.md (Magyar) -->

# Autodarts – CORE (Userscript)

**Nyelvek:** [English](README.md) · [Magyar](README.hu.md) · [Deutsch](README.de.md)

> ⚠️ Jogi/egyéb: Ez egy közösségi fejlesztés, **nem hivatalos Autodarts kiegészítő**.
# Autodarts CORE

**Céloldal:** `https://play.autodarts.io/*`  
**Típus:** Violentmonkey / Tampermonkey userscript Autodartshoz

## Mire való?

Az **Autodarts CORE** az Autodarts mérkőzésnézetét alakítja át és bővíti. Saját, böngészőben mentett beállításokkal lehet személyre szabni a játékoskártyákat, dobáskártyákat, hátteret, darts táblát, falvédőt, dobástörténetet és extra vizuális funkciókat.

> A script az Autodarts aktuális felületére épül. Nagyobb Autodarts-frissítés után előfordulhat, hogy valamelyik elrendezési elem frissítésre szorul.

## Telepítés

1. Telepítsd a **Violentmonkey** vagy **Tampermonkey** bővítményt.
2. Hozz létre egy új userscriptet.
3. Illeszd be a teljes CORE scriptet, majd mentsd el.
4. Nyisd meg az Autodartsot, és indíts vagy nyiss meg egy mérkőzést.
5. A lebegő fogaskerék gombbal, vagy a **Shift + F** billentyűvel nyitható meg a CORE panel.

## Fő funkciók

### Játéknézet és kinézet

- kétoldalas CORE nézet vagy az eredeti Autodarts nézet;
- helyi háttérkép feltöltése (`JPG`, `PNG`, `WebP`);
- állítható háttér-overlay szín és áttetszőség;
- kompakt kezelőpanel;
- magyar, angol és német nyelvű panel.

### Játékoskártyák

- játékosnév és átlag sor ki- vagy bekapcsolása;
- név és átlag a pontszám fölött vagy alatt;
- állítható pontszám-, név- és átlagméret;
- külön játékoskártya-háttér és áttetszőség;
- saját betűtípus feltöltése;
- aktív játékos szín-, keret- és fényléskiemelése;
- saját, görgethető teljes dobástörténet automatikus ugrással a legújabb dobáshoz.

### Dobáskártyák

- dobások megjelenítése pontértékként, például `T20 → 60`;
- eredeti jelölés megjelenítése a sarokban, például `T20`;
- állítható betűméret, szín, áttetszőség és kártyaháttér;
- külön hover/kijelölési szín;
- külön összérték-kártya beállítások;
- külön Checkout és Tipp szín-, betű- és háttérbeállítások;
- külön font tölthető fel a játékoskártyákhoz, dobáskártyákhoz és összérték-kártyához.

### Dobásjavítás

A dobáskártyákra kattintva saját javítófelület használható. Választható módok:

- **Kikapcsolva** – nincs CORE javító;
- **Kompakt** – gyors gombos javítás;
- **Kör alakú** – szorzóválasztás, majd görgős számtárcsa.

A javítás az Autodarts natív javítási folyamatán keresztül kerül alkalmazásra. A nyitott javítás `Esc` billentyűvel megszakítható.

### Egyedi darts tábla és falvédő

- saját tábla- és falvédőkép feltöltése (`PNG`, `JPG`, `WebP`);
- méret, eltolás és a táblakép forgatása;
- natív tábla áttetszőség és méretezés;
- átlátszó PNG falvédő és tábla használata ajánlott.

### Extrák

- tripla találat animáció kiemelt találatokra;
- győzelmi hang és hangerő;
- áthelyezhető, méretezhető óra widget;
- Safe Mode a túl nagy, a kijelzőn már nem biztonságos méretek korlátozására;
- export/import JSON-ba a beállítások átviteléhez;
- diagnosztikai és szelektor-ellenőrző eszközök.

## Presetek és mentés

Három külön beállításprofil használható:

- **Preset A** – `Shift + 1`
- **Preset B** – `Shift + 2`
- **Preset C** – `Shift + 3`

A beállítások, képek, fontok, panelpozíció és órapozíció az adott böngésző `localStorage` tárhelyében mentődnek. Másik böngészőbe vagy gépre az **Export / Import** funkcióval vihetők át.

## Gyorsbillentyűk

| Billentyű | Funkció |
|---|---|
| `Shift + F` | CORE panel megnyitása / bezárása |
| `Shift + 1 / 2 / 3` | Preset A / B / C |
| `Shift + M` | Safe Mode ki / be |
| `Shift + H` | Súgó ki / be |
| `Shift + T` | Óra ki / be |
| `Shift + R` | Óra pozíció és stílus reset |
| `Esc` | Panel bezárása vagy javítás megszakítása |
| `Ctrl + ↑ / ↓` | Óra méretének változtatása |

## Rövid hibaelhárítás

- **Elcsúszott a felület:** próbáld az eredeti Autodarts nézetet, majd töltsd újra az oldalt.
- **Autodarts-frissítés után hiba van:** a Skin vagy Layout szelektorai módosításra szorulhatnak.
- **Stylebotot használsz:** kapcsold ki az Autodarts oldalán, mert ütközhet a CORE saját CSS-ével.
- **Eltűnt a panel vagy a fogaskerék:** a panelben használd a panel- és főgombpozíció visszaállítását.
- **Teljes kikapcsolás:** a CORE főkapcsolója oldal-újratöltéssel lép életbe; kikapcsolt állapotban egy `CORE OFF` gombbal kapcsolható vissza.


## Licenc
Ajánlott egy `LICENSE` fájl hozzáadása.
