# Autodarts CORE – folytatási összefoglaló új csevegéshez
## Állapot: 2026-06-22

## Biztos alapok

### Layout OFF / normál, reszponzív oldal
A **v85** volt az utolsó olyan, a felhasználó által biztos alapnak elfogadott változat, ahol a fő CORE funkciók és a Layout OFF oldal jól működtek.

A v85-re épült, már működő elemek:
- teljes eredeti CORE panel és kinézet;
- HU / EN / DE nyelvváltás;
- presetek, export / import, Safe Mode;
- Skin és Layout kapcsolók;
- gyári és kétoldalas Layout ON / OFF kapcsolás;
- saját teljes history / dobáslista a játékoskártyán;
- saját history: az eredeti chalkboard méretéhez igazított, összes dobást mutató, fix betűméretű, belső görgetésű, mindig utolsó dobásra (alulra) ugró lista;
- Player Card betűtípus a saját historyra is hat;
- aktív játékos kiemelése működött;
- Layout OFF esetén a név/átlag sor megjelenítés ON/OFF, teljes sorméret, név és átlag felül/alul működik;
- dobás- és összérték-kártyák kis nézetben is 110 px magasak;
- Undo / Next sor a játékoskártyák és dobáskártyák közti tényleges térközzel azonos távolságra van a dobáskártyák alatt.

Utolsó elfogadott mérföldkövek:
- **v80**: saját history automatikus alulra görgetése;
- **v81**: aktív játékos kiemelés;
- **v84**: név- és átlag-sor láthatósága;
- **v85**: Player Card font a historyra is hat.

A v86–v100 Layout ON próbálkozások; ezek nem tekinthetők biztos alapnak.

---

## Jelenlegi cél: Layout ON / kétoldalas tájolás (2 játékos)

Referencia:
- `Screenshot_2026-04-02_221106.png`
- `AD_Landscape_mode.txt`

Külső szerkezet:

```text
bal játékoskártya | középső dobássáv + dartstábla | jobb játékoskártya
```

### Külső geometria
1. A bal és jobb játékoskártya legyen azonos szélességű és magasságú.
2. A két játékoskártya szélesebb legyen a v100-as próbánál.
3. A játékoskártyák mérsékelt külső margóval az oldal két szélén legyenek.
4. A dobássor a két játékoskártya **belső széle közötti teljes sávhoz** igazodjon.
5. A dobássor bal és jobb oldali távolsága a játékoskártyáktól azonos legyen.
6. A dobássor: balról összérték-kártya, utána három dobáskártya.
7. Mind a négy felső kártya szélessége fix legyen:
   - összérték: külön fix slot;
   - dobás 1: fix slot;
   - dobás 2: fix slot;
   - dobás 3: fix slot.
   A slotok nem változhatnak üres, MISS, normál dobás, checkout, tipp, bust stb. esetén.
8. A kártyák legyenek magasabbak a mostani ON próbáknál.
9. A dobássor felső széle a játékoskártyák felső szintjével legyen egy vonalban vagy nagyon közel hozzá.
10. A dartstábla legyen kisebb a v91–v100 képeknél, hogy a dobássor lejjebb férjen.
11. Undo / Next közvetlenül a dobássor alatt, középre igazítva legyen, ne a táblára vagy a jobb kártyára csússzon.
12. A sarkok mérsékelten, közel négyzetes stílusban legyenek lekerekítve; ne legyenek túl kerekek.
13. Az aktív játékos jelzése ne zöld függőleges csík legyen. A CORE saját, beállítható kiemelése maradjon.

### Játékoskártya belső felépítése Layout ON módban
A kártya tartalma függőleges blokkos rendben legyen, ne sorban egymás mellett:

```text
felül:       nagy pontszám
alatta:      stat / meta / átlag
középen:     avatar + név + jelvények
alul:        saját teljes history lista (görgethető)
```

A history:
- a SAJÁT, teljes dobáslistás history legyen, nem az Autodarts rövid natív historyja;
- minden dobást mutasson;
- az utolsó dobásra automatikusan görgessen;
- ne zsugorítsa a betűt sok sor esetén;
- a játékoskártyán BELÜL, alul legyen;
- ne lógjon ki a kártyából;
- React által kezelt natív history DOM-ot nem szabad `appendChild`-dal mozgatni vagy `remove()`-val törölni.

---

## Mi romlott el a korábbi ON próbákban

### v86–v91
- A külső geometria részben abszolút CSS-sel, részben régi inline stílusokkal ment.
- Dobáskártyák túl magasan / rossz középsávban jelentek meg.
- Undo / Next többször a táblára vagy a jobb kártyára csúszott.
- A játékoskártyák túl keskenyek maradtak.
- A tábla túl nagy maradt.
- A belső player card tartalom nem követte a referencia függőleges sorrendjét.

### v92–v94
- Az összérték-kártya szélessége stabil lett.
- A három dobáskártya szélessége állapottól függően tovább változott.
- Ennek oka: üres / MISS / checkout / tipp / bust / normál dobás eltérő natív komponensekből vagy wrapperből renderelődik.
- Nem elég csak `.ad-ext-turn-throw` vagy egyetlen `css-xxxxx` osztályt célozni.

### v95–v100
- A dobássor bal oldali hézaga továbbra is nagyobb maradt, mint a jobb oldali.
- A v97–v100 próbák láthatóan nem azt az elemet mozgatták, amelyik ténylegesen a négy kártya megjelenített pozícióját vezérli.
- Több ilyen verzió képernyőn változatlan maradt.
- A v100 nem működő alap.

---

## Kötelező munkaszabályok

1. **Ne írd újra a teljes CORE panelt.**
   A v65-ös teljes újraírás reszponzív oldala jó volt, de eltűntek a CORE funkciók. A teljes régi panel, state, nyelvváltás és kapcsolók maradjanak.

2. **A v85 legyen a funkcionális összehasonlítási alap.**
   A jelenlegi v100 csak a sikertelen ON próbák megértéséhez kell.

3. **Ne találgatással javíts.**
   Előbb élő DOM-méréssel azonosítani kell a négy látható kártya tényleges pozicionáló szülőjét.

4. **Ne használj instabil Chakra `css-xxxxx` osztályt elsődleges, tartós szelektorként.**
   Stabilabb kiindulás: `#ad-ext-player-display`, `#ad-ext-turn`, `ad-ext-...` osztályok, közvetlen gyermekstruktúra, gombok.

5. **Ne mozgasd és ne töröld a React history elemet.**
   Korábbi `appendChild` / `.remove()` React `DOMException: Node.removeChild` hibát okozott.

6. **Layout OFF-hoz nem szabad nyúlni.**
   Az ON javítások csak egyértelmű `html.ad-core-layout-on` feltétel alatt fussanak.

7. **A korábbi fix 110 px dobáskártya-magasság maradjon.**
   Ne a magasságot vedd vissza; a kisebb tábla és a helyes külső sáv oldja meg a helyet.

8. **Mindig teljes kész userscript legyen.**
   Ne patch, ne cserefüggvény. Verziószám emelés. Fájl `/mnt/data` alatt. Csak sandbox letöltési link.

9. **A script betöltését ellenőrizni kell.**
   Legyen `console.log("[ad-core] <version> loaded")` és `window.__AD_CORE_VERSION__`. Ha nem fut, előbb szintaxis- és futási hiba ellenőrzés, nem új CSS folt.

---

## Mit kell feltölteni az új beszélgetésbe

### Kötelező
1. A teljes **v85** script:
   `Autodarts_v85_history_uses_player_font.txt`

2. A legutóbbi **v100** script:
   `Autodarts_v100_layout_on_surface_centering_actions.txt`

3. Referencia CSS:
   `AD_Landscape_mode.txt`

4. Referencia kép:
   `Screenshot_2026-04-02_221106.png`

5. Egy jelenlegi hibás Layout ON screenshot, ahol látszik:
   - bal oldalon nagyobb a hézag a dobássor és játékoskártya között;
   - Undo/Next rossz helyen van;
   - a négy felső kártya állapottól függően más szélességű.

### Erősen ajánlott: új DOM-diagnosztika
Még a következő kódmódosítás előtt, pontosan azon a scriptverzión, amit javítani kell, kell egy célzott diagnosztika, amely külön kiírja:

- `#ad-ext-player-display` rect;
- bal és jobb játékoskártya rect;
- dartstábla rect;
- összérték-kártya látható rect;
- mindhárom dobáskártya látható rect;
- a négy kártya közvetlen pozicionáló szülőjének teljes DOM útvonala és rect-je;
- Undo és Next gomb rect + DOM útvonal;
- a fő dobássor wrapper, tényleges sor wrapper és látható card surface külön `position`, `transform`, `inset`, `left`, `top`, `width`, `height`, `display`, `flex`, `grid` adatai;
- minden releváns inline style;
- az aktív játékoskártya tényleges markerének osztálya / attribútuma.

A korábbi probe nem volt elegendő, mert más scriptállapotból és más ON változatból készült.

---

## Javasolt munkamenet

### 0. Előkészítés
- Violentmonkey/Tampermonkey alatt csak EGY CORE script legyen engedélyezve.
- Konzolban ellenőrizni kell a betöltött verziót.

### 1. Teljes CORE funkciók megőrzése
- v85 maradjon a funkcionális viszonyítási alap.
- v100-ból csak bizonyíthatóan működő, kizárólag ON módosítások használhatók.

### 2. Egyetlen ON geometriakezelő
Egyetlen, kontrollált függvény kezelje a teljes ON geometriát, például:
```js
applyLayoutOnReferenceGeometry()
```
Követelmények:
- csak `LAYOUT_ENABLED === true` és 2 játékos esetén;
- `requestAnimationFrame` + debounce;
- resize után frissül;
- nincs végtelen megfigyelőhurok, vibrálás, kattinthatatlanság.

### 3. Kötelező javítási sorrend
1. bal és jobb játékoskártya geometria;
2. közöttük a valódi középső sáv;
3. fix slotos összérték + 3 dobáskártya csoport;
4. csoport tényleges vízszintes középre igazítása;
5. Undo/Next a csoport alatt;
6. kisebb tábla;
7. belső player card stack;
8. saját history;
9. aktív kiemelés.

### 4. Fix kártyaslotok
A négy felső kártya külső slotjának nem szabad változnia. Az állapotváltozás csak a slot belső tartalmát cserélheti. Ha a React DOM más wrapperben rendereli az állapotokat, a valódi látható slot-wrapper azonosítandó; React gyereket tilos eltávolítani vagy mozgatni.

---

## Végső elfogadási feltételek

### Layout OFF
- Minden korábbi funkció maradjon működő.
- Saját history scrollozható, alulra ugrik.
- Név/átlag sor ON/OFF, méret és pozíció működik.
- Aktív kiemelés működik.

### Layout ON
- A referencia képre hasonló háromoszlopos arányok.
- Szélesebb, azonos oldalkártyák.
- A dobássor két oldalon azonos távolságra a player cardoktól.
- Négy felső kártya állapottól független, rögzített slotgeometriával.
- Kisebb dartstábla, dobássor a player cardok felső szintjén.
- Undo/Next közvetlenül a dobássor alatt.
- Belső player card tartalom egymás alatt.
- Saját history alul, görgethető, automatikusan alul álló listával.
- Nincs zöld függőleges csík, hacsak külön vissza nem kérik.
- Nincs vibrálás, ugrálás, kattinthatatlanság.
- Nincs React `DOMException: Node.removeChild`.

---

## Rövid indítóüzenet új beszélgetéshez

„Az Autodarts CORE Layout ON módját kell célzottan újraépíteni a feltöltött v85 funkcionális alap és az AD_Landscape_mode referencia alapján. Layout OFF-hoz nem szabad nyúlni. Előbb a teljes ON külső háromoszlopos geometriát kell élő DOM-méréssel bemérni, különösen az összérték + három dobáskártya tényleges pozicionáló hostját, mert v97–v100 rossz wrapper elemet célzott és ezért a képernyőn nem változott semmi. A végcél a referencia screenshot szerinti külső elrendezés, vertikális player-card tartalom, alul lévő saját görgethető history, fix szélességű összérték + három dobáskártya, és stabil Undo/Next pozíció.”
