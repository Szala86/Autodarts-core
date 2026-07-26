# Autodarts CORE projekt valtozasnaplo

Letrehozva: 2026-06-26  
Hely: `C:\Users\Zoli\Documents\Codex\Autodarts_CORE_Codex_Project`

Ez a fajl a projekt folytonossagi naploja. Minden kovetkezo erdemi modositasnal
ide is keruljon be egy uj bejegyzes, hogy barmikor vissza lehessen lepni egy
korabbi allapotra.

## Naplozasi szabaly innentol

- Minden userscript valtozas uj `src/Autodarts_CORE_vNNNN.user.js` fajlba menjen.
- A valtozast ebbe a fajlba is be kell irni a munka vegen.
- A bejegyzes tartalmazza:
  - datum/idopont, ha ismert;
  - erintett fajl(ok);
  - mi valtozott;
  - mi maradt szandekosan erintetlen;
  - teszt/ellenorzes eredmenye;
  - ismert kockazat vagy kovetkezo lepes.
- Userscript modositas utan kotelezo a `node --check`.
- Az `archive/` tovabbra is csak elozo anyag/diagnosztika, nem aktiv fejlesztesi alap.

## Aktualis allapot röviden

- Elfogadott aktualis alap: `src/Autodarts_CORE_v1083.user.js`
  - Az eredeti Autodarts-nezet dobaskartyai keretmentesek, allando 8 px-es sarokkal.
  - Az eredeti nezet Tools for Autodarts zoom-burkoloja a dobaskartya meretehez igazodik.
  - A gyoztes es BUST jatekoskartya szine es atlatszosaga kulon allithato.
  - Harom technikai tajekoztato szoveg kikerult a beallitaspanelbol.
- Legfrissebb fejlesztoi verzio: `src/Autodarts_CORE_v1096.user.js`
  - A WQHD hatter rövid Blob URL-lel jelenik meg, ismetelt tobb megabajtos CSS-iras nelkul.
  - A board-only Tools GIF a tenylegesen lathato tabla meretet kapja.
  - A D1-D20 javitas a dupla gyuru biztonsagos kozepe fele kerult.
  - A csatolt v1091 jelenlegi kod tobbi mukodese valtozatlanul megmaradt.

## Verzios esemenyek

### Kiindulo aktiv alap - v1025

- Fajl: `src/Autodarts_CORE_v1025.user.js`
- Projektutasitas szerint ez volt az egyetlen aktiv alap.
- Az `archive/` mappa csak elozmeny/diagnosztika.
- Nem regresszalhato elemek:
  - v1005/v1011 felso dobaskartya-, Undo/Next- es jatekoskartya-geometria;
  - kartyak ertekeinek kozepre igazítása;
  - keretmentes dobas-, Tipp-, Checkout- es jatekoskartyak;
  - Tipp/Checkout natív osztaly szerinti felismerese;
  - helyi hatterkep-feltoltes;
  - score/name/avg csuszkatartomanyok;
  - sajat history es Undo top row megorzese.

### v1026 - hibas probalkozas

- Fajl: `src/Autodarts_CORE_v1026.user.js`
- Cel: elso modositascsomag a menupontok/board funkcio korul.
- Felhasznaloi visszajelzes: a script nem jelent meg az oldalon.
- Allapot: hibas probanak tekintendo, nem hasznalando visszaallasi pontkent.

### v1027 - mukodo /boards vissza gomb eltavolitas

- Fajl: `src/Autodarts_CORE_v1027.user.js`
- Alap: v1025.
- Valtozas:
  - `/boards` oldali "Vissza az Autodartsba" utility gomb kikapcsolva.
  - A hozza tartozo menu sor elrejtve/kiveve.
  - Belső dirtyBm agak megmaradtak a stabilitas miatt.
- Felhasznaloi visszajelzes: mukodik.

### v1028 - passziv board diagnosztika

- Fajl: `src/Autodarts_CORE_v1028.user.js`
- Valtozas:
  - Board marker panelre bekerult egy passziv board SVG diagnosztika masolas gomb.
- Cel:
  - Megallapitani, hogy a tábla natív SVG-e alkalmas-e custom board kep retegre.
- Diagnosztikai eredmeny:
  - Egy natív board SVG van.
  - `viewBox="0 0 1000 1000"`.
  - `canvasCount: 0`.
  - `boardCandidateCount: 1`.

### v1029 - elso custom board kep reteg

- Fajl: `src/Autodarts_CORE_v1029.user.js`
- Valtozas:
  - Helyi JPG/PNG/WebP tabla kep feltoltes.
  - A feltoltott kep a natív board SVG ala kerult.
  - A natív board megmaradt mukodo dobásretegen.
  - Uj beallitasok:
    - `CUSTOM_BOARD_ENABLED`
    - `CUSTOM_BOARD_DATA_URL`
    - `CUSTOM_BOARD_NATIVE_OPACITY`
- Ellenőrzés:
  - `node --check` sikeres.
- Felhasznaloi visszajelzes:
  - Kep es natív tabla kozott elcsuszas volt.

### v1030 - custom tabla kep kalibracio

- Fajl: `src/Autodarts_CORE_v1030.user.js`
- Valtozas:
  - Tablakep meret, X/Y eltolás es forgatas csuszkak.
  - Uj beallitasok:
    - `CUSTOM_BOARD_SCALE`
    - `CUSTOM_BOARD_OFFSET_X`
    - `CUSTOM_BOARD_OFFSET_Y`
    - `CUSTOM_BOARD_ROTATE_DEG`
- Ellenőrzés:
  - `node --check` sikeres.
- Felhasznaloi visszajelzes:
  - Fedes mar jo, de a natív kor szamok zavaroan ralogtak a feltoltott kepre.

### v1031 - natív kor szamok elrejtese

- Fajl: `src/Autodarts_CORE_v1031.user.js`
- Valtozas:
  - `CUSTOM_BOARD_HIDE_NATIVE_TEXT` beallitas.
  - Panel kapcsolo: `Natív számok elrejtése`.
  - CSS: board SVG `text` elemek elrejthetok.
- Ellenőrzés:
  - `node --check` sikeres.
- Felhasznaloi visszajelzes:
  - Natív kor szamok eltuntek, de a feltoltott tabla halvany maradt, mert a natív tablat nem lehetett teljesen nullara venni dobaspont-vesztes nelkul.

### v1032 - hibas marker-only probalkozas

- Fajl: `src/Autodarts_CORE_v1032.user.js`
- Cel:
  - Natív tabla grafika nullazhato legyen, de a dobaspontok maradjanak.
- Megoldasi kiserlet:
  - Natív SVG alakzatok opacity-je kulon kezelve.
  - `circle` elemek teljesen lathatok maradtak.
- Felhasznaloi visszajelzes:
  - Nem jo.
  - Feltoltott kep nem latszott rendesen.
  - Nullara vett natív tablanal nagy szurke teli kor maradt.
- Ok:
  - A natív tabla nagy kitolto korei is `circle` elemek voltak.
- Allapot:
  - Hibas probalkozas, nem hasznalando visszaallasi pontkent.

### v1033 - kis circle marker izolacio

- Fajl: `src/Autodarts_CORE_v1033.user.js`
- Valtozas:
  - Csak valoszinu kis, szines marker korok maradtak lathatok.
  - Nagy natív board korok eltunhettek 0% natív opacity mellett.
- Ellenőrzés:
  - `node --check` sikeres.
- Felhasznaloi visszajelzes:
  - Dobasjelolok nem latszottak.
- Ok:
  - A valodi marker nem csak egyszeru `circle`/`cx`/`cy`/`r` mintaba esett.
- Allapot:
  - Reszben hasznos irany, de onmagaban nem elfogadott.

### v1034 - getBBox alapu kis SVG marker felismeres

- Fajl: `src/Autodarts_CORE_v1034.user.js`
- Valtozas:
  - Marker-felismeres kiterjesztve:
    - `circle`
    - `ellipse`
    - `path`
    - `rect`
    - `polygon`
    - `polyline`
    - `line`
  - `getBoundingClientRect()` es `getBBox()` alapú kis meretu, szines alakzat felismeres.
  - Board SVG belso observer hozzaadva, hogy kesobb bekerulo/módosulo dobaspontok is ujra jelolodjenek.
- Ellenőrzés:
  - `node --check` sikeres.
- Felhasznaloi visszajelzes:
  - Pötty mar latszik, kiveve 25 es bull zónan.
- Ok:
  - A kozephez tul kozel levo elemeket a script kizarta, nehogy natív bull korok jojjenek vissza.

### v1035 - elfogadott dobaspont/bull es glow javitas

- Fajl: `src/Autodarts_CORE_v1035.user.js`
- Valtozas:
  - 25/bull zónában is lathato maradhat a dobaspont, ha nagyon kis marker meretu.
  - Natív bull nagy korei tovabbra sem jonnek vissza.
  - Aktualisnak vett dobaspont pulzalo kekes glowt kap.
  - Aktualis marker: DOM-sorrend szerinti utolso felismert marker.
- Ellenőrzés:
  - `node --check` sikeres.
- Felhasznaloi visszajelzes:
  - "Oké ez eddig rendbe."
- Allapot:
  - Elfogadott mukodesi alap.

### v1036 - Egyedi tabla menu, falvedo reteg, kozos meretezes

- Fajl: `src/Autodarts_CORE_v1036.user.js`
- Alap: v1035.
- Valtozas:
  - Menu atnevezve:
    - `Eszkoz - Board marker` -> `Egyedi tabla`
    - EN/DE cimkek is frissitve.
  - Uj falvedo kep funkcio:
    - `CUSTOM_SURROUND_ENABLED`
    - `CUSTOM_SURROUND_DATA_URL`
    - `CUSTOM_SURROUND_SCALE`
    - `CUSTOM_SURROUND_OFFSET_X`
    - `CUSTOM_SURROUND_OFFSET_Y`
  - Uj kozos meretezes:
    - `CUSTOM_BOARD_GROUP_SCALE`
    - Panel csuszka: teljes tabla + falvedo merete.
  - CSS retegek:
    - falvedo: board host `::after`, legalul;
    - feltoltott tabla kep: board host `::before`;
    - natív SVG/dobasmarker: legfelul.
- Ellenőrzés:
  - `node --check` sikeres.
- Megjegyzes:
  - A v1035 dobaspont/glow javitas megmaradt.
  - Felhasznaloi eles tesztrol meg nincs visszajelzes ebben a naploban.

### v1037 - Egyedi tabla menu tisztitas

- Fajl: `src/Autodarts_CORE_v1037.user.js`
- Alap: v1036.
- Felhasznaloi keres:
  - A `Nativ szamok elrejtese` opcio keruljon ki, mert nincs ra szukseg.
  - Az `Egyedi tabla` menupont melletti bal oldali pipalos kapcsolo keruljon ki, mert bekapcsolva a tabla bal felulre ugrott es kicsire osszement.
- Valtozas:
  - `CUSTOM_BOARD_HIDE_NATIVE_TEXT` kivezetve a default configbol es a panelbol.
  - A custom board apply ag mar mindig eltavolitja a régi `data-ad-custom-board-hide-text` attribútumot.
  - Az `Egyedi tabla` bal oldali modul sor most mar csak navigacio, nincs mellette checkbox.
  - A legacy `BOARD_MARKER` default `false`.
  - `applyBoardMarkerNow()` v1037-tol nem ad hozza `ad-board-svg` osztalyt, csak eltavolitja a régi beragadt osztalyt.
  - A board panelbol a régi `Marker frissites most` gomb kikerult.
  - A board panel informacios szovege frissult, jelzi hogy a régi Board marker kapcsolo kivezetve.
- Szandekosan erintetlen:
  - v1035 dobaspont/bull/glow logika.
  - v1036 falvedo kep es kozos meretezes.
  - Undo/Next, turn card es player card geometria.
- Ellenőrzés:
  - `node --check src/Autodarts_CORE_v1037.user.js` sikeres.
- Megjegyzes:
  - Ha a felhasznalo tesztje szerint v1037 stabil, ezt lehet uj elfogadott alapnak jelolni.

### v1038 - egyedi tabla retegsorrend, status glow, reset

- Datum/idopont: 2026-06-26 17:44:40 +02:00
- Fajl: `src/Autodarts_CORE_v1038.user.js`
- Alap: v1037.
- Felhasznaloi keres:
  - A tabla es minden hozza tartozo elem a hatter elott legyen.
  - A jatekos- es dobaskartyak a tablaelemek elott maradjanak.
  - A teljes tabla + falvedo meretcsuszka mehessen kisebbre; 65% legyen az alap.
  - Az `Egyedi tabla` reset gombja mukodjon.
  - A falvedo mellett is latszodjon a board allapotjelzo glow.
- Valtozas:
  - Board host retegsorrend:
    - falvedo kep legalul;
    - feltoltott tabla kep;
    - natĂ­v SVG/dobasmarker reteg;
    - sajat status glow overlay.
  - A player display es turn card hostok z-index vedelmet kaptak, geometriai atiras nelkul.
  - Uj beallitasok:
    - `CUSTOM_STATUS_GLOW_ENABLED`
    - `CUSTOM_STATUS_GLOW_STRENGTH`
  - A status glow szine a board koruli natĂ­v style/box-shadow/filter szinekbol probal atvett zold/piros/sarga allapotot rajzolni; ha nem talal szint, zoldre esik vissza.
  - A teljes tabla + falvedo meret alapja `0.65`, a csuszka minimuma `0.35`.
  - Az `Egyedi tabla` ful bekerult a jobb felso reset engedelyezett fulek koze.
  - A board reset visszaallitja:
    - custom board kep bekapcsolas/adat/meret/eltolas/forgatas/native opacity;
    - teljes board+surround meret;
    - status glow kapcsolo/erosseg;
    - falvedo kep bekapcsolas/adat/meret/eltolas.
- Szandekosan erintetlen:
  - v1035 dobaspont/bull/current marker glow felismeres.
  - v1037 legacy menu toggle es natĂ­v szam elrejtes kivezetese.
  - Undo/Next, turn card es player card geometria.
  - Helyi hatterkep-feltoltes.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1038.user.js` sikeres.
- Ismert kockazat / kovetkezo lepes:
  - Eles Autodarts oldalon kell visszaneznie, hogy a natĂ­v status szin detektalasa minden allapotban jol koveti-e a zold/piros/sarga glowt.
  - Ha a glow szine nem koveti az allapotot, passziv diagnosztikat kell kerni a board host kornyeki style/class ertekekrol.

### v1039 - falvedo koruli kulso status glow gyuru es fekete hatterkocka vedelme

- Datum/idopont: 2026-06-26 17:57:13 +02:00
- Fajl: `src/Autodarts_CORE_v1039.user.js`
- Alap: v1038.
- Felhasznaloi keres:
  - Ha falvedo kep aktĂ­v, a status glow ne a falvedo mogott vagy elotte takarva jelenjen meg, hanem a falvedo kore nagyitva.
  - Ha nincs falvedo kep, a status glow maradjon a tabla korul.
  - NatĂ­v tabla attetszoseg novelese mellett ne jelenjen meg fekete kocka a tabla korul.
- Valtozas:
  - A status glow overlay gyurus, atlatszo kozepu kulso arnyek lett.
  - Falvedo aktĂ­v allapotban a glow gyuru:
    - a falvedo meretehez igazodik;
    - koveti a falvedo X/Y eltolĂˇsat;
    - nem rajzol belso/inset fĂ©nyt a tabla vagy falvedo tetejere.
  - Falvedo nelkul a glow kisebb, a tabla koruli gyuru marad.
  - A custom board host es a natĂ­v board SVG explicit `background: transparent` beallitast kapott.
  - Uj belso jeloles:
    - `data-ad-custom-board-backdrop="1"`
  - A script megprobalja felismerni es elrejteni a teljes SVG-meretu, sotet `rect` hatteralakzatot, amely a fekete negyzetet okozhatja.
- Szandekosan erintetlen:
  - v1035 dobaspont/bull/current marker glow felismeres.
  - v1038 reset, meretcsuszka es z-index vedelem.
  - Undo/Next, turn card es player card geometria.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1039.user.js` sikeres.
- Ismert kockazat / kovetkezo lepes:
  - Ha a fekete kocka nem `rect` alaku natĂ­v SVG hatterbol jon, tovabbi passziv board diagnosztika kell a konkret DOM/SVG elem azonositasahoz.
  - Ha a falvedo nagyon nagyra vagy erosen eltolva van allitva, a glow gyuru koveti, de lehet hogy erĂ´sseg/meret finomhangolas kell.

### v1040 - automatikus status glow es tabla kattintas visszaallitasa

- Datum/idopont: 2026-06-26 18:08:32 +02:00
- Fajl: `src/Autodarts_CORE_v1040.user.js`
- Alap: v1039.
- Felhasznaloi keres:
  - A glowot ne kelljen kapcsolgatni.
  - Ne legyen glow erossegcsuszka.
  - Ha falvedo van, automatikusan a falvedo kore keruljon; ha nincs, automatikusan a tabla kore.
  - A tabla kattintas/dobas ujra mukodjon.
- Valtozas:
  - `CUSTOM_STATUS_GLOW_ENABLED` es `CUSTOM_STATUS_GLOW_STRENGTH` kivezetve az aktiv default configbol.
  - A board panelbol kikerult:
    - status glow kapcsolo;
    - status glow erossegcsuszka.
  - A status glow most mindig automatikusan mukodik, ha egyedi tabla/falvedo reteg aktĂ­v:
    - falvedo aktĂ­v es feltoltott falvedo kep eseten a falvedo kulso gyurujehez igazodik;
    - falvedo nelkul a tabla koruli gyuru marad.
  - A v1039-ben elrejtett sotet natĂ­v SVG backdrop most `visibility: visible` es `pointer-events: all` mellett `opacity: 0`.
  - Cel: a fekete kocka ne latszodjon, de az SVG hatter tovabbra is kattinthato cel legyen, hogy az Autodarts dobas/kattintas logika ne blokkolodjon.
- Szandekosan erintetlen:
  - v1035 dobaspont/bull/current marker glow felismeres.
  - v1038/v1039 meretezes, reset es falvedo gyuru pozicionalas.
  - Undo/Next, turn card es player card geometria.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1040.user.js` sikeres.
  - `CUSTOM_STATUS_GLOW`, `customStatusGlow`, `statusGlowSlider` aktiv hivatkozas nincs a v1040-ben.
- Ismert kockazat / kovetkezo lepes:
  - Eles oldalon ellenorizni kell, hogy a tabla kattintas visszatert-e.
  - Ha tovabbra sem mukodik a kattintas, a kovetkezo lepes passziv board event/click-target diagnosztika, mert akkor nem csak a teljes meretu SVG backdrop volt a blokkolas oka.

### v1041 - csak gyari status glow, dupla glow eltavolitasa

- Datum/idopont: 2026-06-26 18:18:53 +02:00
- Fajl: `src/Autodarts_CORE_v1041.user.js`
- Alap: v1040.
- Felhasznaloi keres:
  - Ne legyen dupla glow.
  - A sajat status glow helyett eleg a gyari Autodarts glow.
- Valtozas:
  - A sajat `data-ad-custom-status-glow` overlay CSS-e kikerult.
  - A sajat status glow JS letrehozo/szin- es pozicioszamolo logikaja kikerult.
  - Az apply ag mar nem hoz letre sajat status glow elemet.
  - A korabbi verziobol bent maradhato `data-ad-custom-status-glow="1"` DOM elem frissiteskor torlodik.
  - A status glow miatt korabban hozzaadott felesleges parent `class/style` observer kikerult.
- Szandekosan erintetlen:
  - v1040 natĂ­v SVG backdrop kattinthatosagi javitas.
  - v1035 dobaspont/bull/current marker glow felismeres.
  - Falvedo es egyedi tabla kep meretezes/pozicionalas.
  - Undo/Next, turn card es player card geometria.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1041.user.js` sikeres.
  - A sajat glowbol csak a cleanup selector maradt: `data-ad-custom-status-glow`.
- Ismert kockazat / kovetkezo lepes:
  - Falvedo mellett csak a gyari glow fog latszani. Ha a gyari glowot a falvedo kep takarja, akkor azt kulon, diagnosztikaval kell megnezni, de nem kerul vissza sajat dupla glow alapbol.

### v1042 - natĂ­v glow box-shadow atadasa a falvedo retegre

- Datum/idopont: 2026-06-26 18:28:59 +02:00
- Fajl: `src/Autodarts_CORE_v1042.user.js`
- Alap: v1041.
- Felhasznaloi keres:
  - Ha csak a tabla latszik, a gyari glow jol mukodik.
  - Ha falvedo aktĂ­v, a gyari glow ne a tabla korul maradjon, hanem ugorjon a falvedo kore.
  - Ne jojjon vissza dupla/sajat glow.
- Valtozas:
  - A sajat status glow overlay tovabbra sincs visszahozva.
  - Uj belso jelolesek:
    - `data-ad-custom-native-glow-active`
    - `data-ad-custom-native-glow-source`
  - Falvedo aktĂ­v allapotban a script megkeresi a board kornyezeteben a natĂ­v Autodarts glow `box-shadow` forrasat.
  - A talalt natĂ­v `box-shadow` erteket CSS valtozoba teszi:
    - `--ad-custom-native-glow-shadow`
  - A falvedo `::after` retege ugyanazt a box-shadow erteket kapja.
  - Az eredeti glow-forras `box-shadow:none`-t kap falvedo aktĂ­v allapotban, hogy ne legyen dupla.
  - Falvedo kikapcsolasakor vagy custom board reteg tisztitasakor a forrasjeloles es CSS valtozo torlodik, igy a gyari tabla-koruli glow visszaall.
- Szandekosan erintetlen:
  - v1040 natĂ­v SVG backdrop kattinthatosagi javitas.
  - v1041 sajat status glow overlay eltavolitasa.
  - v1035 dobaspont/bull/current marker glow felismeres.
  - Falvedo es egyedi tabla kep meretezes/pozicionalas.
  - Undo/Next, turn card es player card geometria.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1042.user.js` sikeres.
- Ismert kockazat / kovetkezo lepes:
  - Ha az Autodarts egy adott allapotban nem `box-shadow`, hanem mas CSS technika peldaul `filter: drop-shadow()` alapjan rajzolja a glowt, akkor a falvedo koruli atadas nem fogja atvenni. Ebben az esetben passziv diagnosztika kell a konkret natĂ­v glow forrasrol.

### v1043 - stabilabb natĂ­v glow atadas inditas/dobas kozben

- Datum/idopont: 2026-06-26 19:35:31 +02:00
- Fajl: `src/Autodarts_CORE_v1043.user.js`
- Alap: v1042.
- Felhasznaloi visszajelzes:
  - Jatek inditasakor falvedovel a glow alig latszik.
  - Falvedo ki/be kapcsolas utan rendesen megjelenik.
  - Dobasok inditasakor a glow eltunik.
- Feltetelezett ok:
  - A v1042 tul koran vagy DOM-atmeneti pillanatban olvasta ki a natĂ­v `box-shadow`-t.
  - Inditaskor gyenge/meg nem teljes erteket kapott el.
  - Dobas kozbeni DOM-frissiteskor ures vagy felkesz ertek irhatta felul a jo glowt.
- Valtozas:
  - Uj belso konstansok/allapotok:
    - `CUSTOM_BOARD_NATIVE_GLOW_GOOD_SCORE`
    - `CUSTOM_BOARD_NATIVE_GLOW_RETRY_DELAYS`
    - `customBoardNativeGlowCache`
    - `customBoardNativeGlowRetryTimer`
    - `customBoardNativeGlowRetryCount`
  - A script csak akkor frissiti a cache-t, ha eleg eros/hasznalhato gyari glowt talal.
  - Ha falvedo aktĂ­vnal csak gyenge vagy ures gyari glow ertek erheto el:
    - nem torli a falvedo koruli glowt;
    - az utolso jo cache-elt `box-shadow`-t hasznalja;
    - rövid kesleltetett ujraolvasast utemez.
  - A kesleltetett ujraolvasas csak falvedo aktĂ­v allapotban fut.
- Szandekosan erintetlen:
  - v1042 natĂ­v glow atadasi CSS (`data-ad-custom-native-glow-*`).
  - v1041 sajat status glow eltavolitasa.
  - v1040 kattinthato backdrop javitas.
  - v1035 dobaspont/bull/current marker glow felismeres.
  - Undo/Next, turn card es player card geometria.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1043.user.js` sikeres.
- Ismert kockazat / kovetkezo lepes:
  - Ha tovabbra is halvany vagy eltuno glow latszik, passziv diagnosztika kell a natĂ­v glow forrasrol inditas utan es dobas utan, mert lehet, hogy nem `box-shadow`, hanem mas CSS tulajdonsag valtozik.

### v1044 - falvedo glow illesztese PNG atlatszosag/alak szerint

- Datum/idopont: 2026-06-26 19:50:55 +02:00
- Fajl: `src/Autodarts_CORE_v1044.user.js`
- Alap: v1043.
- Felhasznaloi visszajelzes:
  - Egyes falvedo kepeknel a glow merete jo.
  - Mas falvedo kepeknel a glow tul nagy, mert a kor nem a lathato falvedo peremet koveti.
- Feltetelezett ok:
  - A v1043 a falvedo `::after` geometriai dobozara tette a gyari `box-shadow`-t.
  - A PNG-kben a lathato falvedo-kor es a kep/pszeudoelem doboza nem minden assetnel ugyanott van.
- Valtozas:
  - A falvedo retegre mar nem kozvetlen geometriai `box-shadow` kerul.
  - A gyari glow `box-shadow` ertekebol:
    - kiolvasasra kerul a dominans glow szin;
    - becsult blur meret keszul;
    - ebbol `filter: drop-shadow(...) drop-shadow(...)` lanc epul.
  - Uj helper:
    - `customBoardCssRgba`
    - `customBoardBestNativeGlowRgb`
    - `customBoardNativeGlowPxValues`
    - `customBoardNativeGlowFilterFromShadow`
  - A `customBoardNativeGlowCache` mar `filter` erteket is tarol.
  - A falvedo `::after` retege `--ad-custom-native-glow-filter` alapjan kapja a glowt.
  - A régi `--ad-custom-native-glow-shadow` megmarad belso/diagnosztikai ertekkent, de nem az rajzolja a falvedo glowt.
- Szandekosan erintetlen:
  - v1043 stabil cache es kesleltetett ujraolvasas.
  - v1041 sajat status glow overlay eltavolitasa.
  - v1040 kattinthato backdrop javitas.
  - v1035 dobaspont/bull/current marker glow felismeres.
  - Undo/Next, turn card es player card geometria.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1044.user.js` sikeres.
- Ismert kockazat / kovetkezo lepes:
  - Az alakzatkovetes akkor mukodik jol, ha a falvedo PNG atlatszo hatteru. Olyan JPG vagy nem atlatszo PNG eseten, ahol a hatter is lathato pixel, a drop-shadow a teljes kepteruletet kovetheti.
  - Ha egy adott asset meg mindig tul nagy glowt ad, akkor vagy a PNG elokeszitesen kell javitani, vagy kulon automatikus alpha-bounds merest kell bevezetni.

### v1045 - indulaskori keskeny glow csik elkerulese

- Datum/idopont: 2026-06-26 19:59:33 +02:00
- Fajl: `src/Autodarts_CORE_v1045.user.js`
- Alap: v1044.
- Felhasznaloi visszajelzes:
  - A v1044 mar jol illeszti a glowt minden tesztelt falvedohoz.
  - Jatekindulaskor viszont meg csak egy keskeny csikban latszik.
  - Falvedo ki/be kapcsolas utan jo lesz.
- Feltetelezett ok:
  - Indulaskor az Autodarts meg csak egy keskeny/felkesz natĂ­v `box-shadow` erteket ad.
  - A v1044 ezt meg elfogadhatta es cache-elhette.
- Valtozas:
  - Uj minimum meretfeltetel:
    - `CUSTOM_BOARD_NATIVE_GLOW_MIN_MAX_PX`
  - Uj helper:
    - `customBoardNativeGlowMaxPx`
  - A glow cache csak akkor frissul, ha:
    - a szin/erosseg score eleg jo;
    - es a `box-shadow` pixelmerete nem tul kicsi.
  - A retry idosor hosszabb lett:
    - `[120, 300, 700, 1400, 2400, 3600]`
  - Ha falvedo aktĂ­vnal csak gyenge/keskeny natĂ­v glow forras van:
    - a script nem teszi ra ezt a falvedore;
    - a talalt eredeti forrast ideiglenesen elnyomja, hogy ne latszodjon tabla-koruli keskeny csik;
    - kesleltetett ujraolvasast utemez.
- Szandekosan erintetlen:
  - v1044 PNG-alakhoz illesztett `drop-shadow` megoldas.
  - v1043 cache es retry alaplogika.
  - v1041 sajat status glow overlay eltavolitasa.
  - v1040 kattinthato backdrop javitas.
  - v1035 dobaspont/bull/current marker glow felismeres.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1045.user.js` sikeres.
- Ismert kockazat / kovetkezo lepes:
  - Inditaskor rövid ideig inkabb nem latszhat glow, amig a teljes gyari ertek meg nem erkezik. Ez szandekosabb, mint a rossz keskeny csik cache-elese.
  - Ha tovabbra is csik marad, passziv diagnosztika kell az indulaskori natĂ­v `box-shadow` ertekrol.

### Stabil alap kijeloles - v1045

- Datum/idopont: 2026-06-26 20:27:19 +02:00
- Stabil alap: `src/Autodarts_CORE_v1045.user.js`
- Felhasznaloi visszajelzes:
  - "Egyenlore ez legyen a stabil alapunk most mar. Egesz jol mukodik."
- Jelentes:
  - A tovabbi fejleszteseket innen kell inditani uj verzios userscript fajlba.
  - A korabbi v1035 elfogadott alap helyett most a v1045 a projekt aktualis stabil visszalepesi pontja.
- Ellenőrzés:
  - Kod nem valtozott ebben a lepesben, ez csak naplo/statusz frissites.

### v1046 - Tools for Autodarts kompatibilis dobaskartya-igazitas

- Datum/idopont: 2026-06-27 11:01:39 +02:00
- Fajl: `src/Autodarts_CORE_v1046.user.js`
- Alap: a felhasznalo altal elfogadott stabil v1045.
- Felhasznaloi visszajelzes:
  - A Tools for Autodarts kiegeszito el tudja rejteni a bal oldali Autodarts menut.
  - Ilyenkor a dobaskartyak es a ket jatekoskartya kozotti kulso hezagok nem maradnak megbizhatoan szimmetrikusak.
  - Keres: a teljes dobaskartya-csoport mindig a ket jatekoskartya kozott legyen kozepen, a kiegeszitovel egyutt is.
- Valtozas:
  - A v100.3 elfogadott `-45px` turn-host alapeltolas megmaradt.
  - Uj CSS korrekcios valtozo: `--ad-core-v1046-turn-shift-x`.
  - Uj, keson futo meresi reteg:
    - a ket lathato jatekoskartya belso szelet meri;
    - a negy lathato dobaskartya teljes csoportjat meri;
    - csak annyi vizszintes korrekciot ad a mar letezo `#ad-ext-turn` transformhoz, hogy a ket kulso hezag egyenlo legyen.
  - A meres a valos renderelt kartyakra epul, nem a kiegeszito nevere vagy valtozo osztalyaira.
  - Ujr mer React/CORE frissites, ablakmeret-valtozas, teljes kepernyo valtas utan, valamint 800 ms-os konnyu ellenorzessel a tisztan CSS-es kiegeszito-valtasok miatt.
  - A korrekcio visszaall, amikor az oldalso menu vagy az eredeti elrendezes visszater.
  - A poziciovaltozas utan az Undo/Next igazitas ujrafut.
  - Passziv ellenorzesi adat: `window.__AD_CORE_V1046_LANE__`.
- Szandekosan erintetlen:
  - Jatekoskartyak merete es pozicionalasi szabalyai.
  - Dobaskartyak szelessege, magassaga, belso tartalma es ertek-kozepre igazitas.
  - Undo/Next elfogadott fuggoleges hezaga es jobb szelhez igazitasanak logikaja.
  - Egyedi tabla, falvedo, glow, dobaspontok es board kattintas.
  - Tipp/Checkout felismeres es keretmentes megjelenes.
  - History/Undo felso sor megorzese, hatterkep-feltoltes es csuszkatartomanyok.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1046.user.js` sikeres.
  - A verziojelzesek es az uj meresi reteg jelenlete statikusan ellenorizve.
- Ismert kockazat / kovetkezo lepes:
  - A felhasznaloi teszt sikeres: a kiegeszitovel modositott elrendezesben is mukodik.

### Stabil alap kijeloles - v1046

- Datum/idopont: 2026-06-27 11:23:54 +02:00
- Stabil alap: `src/Autodarts_CORE_v1046.user.js`
- Felhasznaloi visszajelzes:
  - "Oke ez mukodik."
- Jelentes:
  - A Tools for Autodarts kompatibilis dobaskartya-igazitas elfogadva.
  - A tovabbi fejlesztesek aktualis visszaallasi pontja a v1046.

### v1047 - indulaskori glow frissites es kozos akciogomb-pozicio

- Datum/idopont: 2026-06-27 11:23:54 +02:00
- Fajl: `src/Autodarts_CORE_v1047.user.js`
- Alap: a felhasznalo altal elfogadott stabil v1046.
- Felhasznaloi visszajelzes:
  - Jatekindulaskor a falvedo koruli glow alig latszik.
  - Falvedo ki- majd visszakapcsolasa utan a glow helyreall.
  - Dobas javitasakor az Undo/Next helyett megjeleno Bouncer/Cancel/OK sor elcsuszik.
- Azonositott ok:
  - A glow atvitel az elso elfogadhato indulaskori `box-shadow` mintat cache-elhette, majd a teljes gyari glow kesobbi kialakulasa utan nem volt biztos ujraolvasas.
  - A korabbi akciogomb-felismeres kifejezetten az Undo/Next parra epult.
- Valtozas - glow:
  - Falvedo mellett 500 ms-onkent celzottan ujraolvassa a gyari glow forrast.
  - Az ellenorzes csak a glow atvitelt frissiti, nem epiti ujra az egesz tablat.
  - Ha ugyanahhoz az allapotszinhez mar van nagyobb glow cache, egy kesobbi kisebb/felkesz minta nem ronthatja le.
  - A gyari allapotszin valtozasa tovabbra is frissitheti a cache-t.
- Valtozas - akciogombok:
  - Az Undo/Next tenyleges sorpoziciojat jobb szel + felso koordinata formaban megjegyzi.
  - Felismeri a Bouncer/Cancel/OK javitasi sort.
  - A javitasi sort ugyanahhoz a jobb szelhez es felso vonalhoz helyezi.
  - Ha meg nincs eltett Undo/Next pozicio, a negy dobaskartya jobb szelbol es also vonalabol szamol azonos fallback poziciot.
  - Normal modba visszaterve eltavolitja a sajat korrekcios poziciot, majd ujrafuttatja a meglevo v95/v1005 Undo/Next igazitasokat.
  - Passziv ellenorzesi adat: `window.__AD_CORE_V1047_ACTION_ROW__`.
- Szandekosan erintetlen:
  - v1046 Tools for Autodarts kompatibilis dobaskartya-kozepre igazitas.
  - Dobas- es jatekoskartyak merete, belso tartalma es kozepre igazitas.
  - Egyedi tabla/falvedo meretezese, dobaspontok es board kattintas.
  - Tipp/Checkout felismeres, history/Undo felso sor, hatterkep es csuszkatartomanyok.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1047.user.js` sikeres.
  - Verzioszammezok, glow watcher, cache-vedelem es Bouncer/Cancel/OK felismeresi utak statikusan ellenorizve.
- Ismert kockazat / kovetkezo lepes:
  - Elo felhasznaloi teszt kell friss jatekinditassal, falvedo kapcsolgatasa nelkul.
  - Kulon ellenorizni kell a javitasi modba belepes es az Undo/Next modba visszateres poziciojat.

### Stabil alap kijeloles - v1047

- Datum/idopont: 2026-06-27 11:56:39 +02:00
- Stabil alap: `src/Autodarts_CORE_v1047.user.js`
- Felhasznaloi visszajelzes:
  - "Oke mind ketto mukodik."
- Elfogadott mukodes:
  - A falvedo glow jatekinditas utan kapcsolgatas nelkul helyreall.
  - A Bouncer/Cancel/OK javitasi sor az Undo/Next poziciojat tartja.

### v1048 - tablaallapot megtartasa es alap tabla meretezese

- Datum/idopont: 2026-06-27 11:56:39 +02:00
- Fajl: `src/Autodarts_CORE_v1048.user.js`
- Alap: a felhasznalo altal elfogadott stabil v1047.
- Felhasznaloi visszajelzes:
  - Dobas javitasakor a tabla es a falvedo röviden alapmeretre ugrik, majd visszaall a beallitott meretre.
  - Keres: az alap/nativ tabla merete is legyen allithato.
- Azonositott ok:
  - Az `applyCustomBoardImageLayer()` minden frissites elejen torolte a korabbi host-allapotot.
  - Javitas modban a React atmenetileg felkesz vagy meg nem felismerheto tabla SVG-t adhat, igy a torles utan csak egy kesobbi frissites tudta visszatenni a skala- es falvedoallapotot.
- Valtozas:
  - A tabla SVG-k felismerese most a korabbi reteg torlese elott tortenik.
  - Ha atmenetileg nincs teljes felismerheto tabla SVG, a script valtoztatas nelkul megtartja az utolso ervenyes host-allapotot.
  - Uj konfiguracio: `CUSTOM_BOARD_NATIVE_SCALE`, alapertelmezett ertek `1`.
  - Uj csuszka: `Alap tabla merete (egyedi kep nelkul)`, tartomanya 35-145%.
  - A nativ meretezes kulon `data-ad-native-board-scale-host` reteget hasznal.
  - 100%-os alapertelmezesnel nem kerul uj transform a nativ tabla hostjara.
  - Feltoltott tabla vagy falvedo mellett tovabbra is a meglevo `Teljes tabla + falvedo merete` csuszka az ervenyes, hogy a kep es a dobaspontok kalibracioja ne valjon szet.
  - Az uj ertek bekerult a board tab reset/preset konfiguraciojaba es a HU/EN/DE feliratokba.
- Szandekosan erintetlen:
  - v1047 glow watcher es Bouncer/Cancel/OK pozicionalas.
  - v1046 Tools for Autodarts kompatibilis dobaskartya-igazitas.
  - Egyedi tabla/falvedo meglevo skala-, eltolasi es forgatasi tartomanyai.
  - Dobaspontok, board kattintas, history/Undo es Tipp/Checkout.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1048.user.js` sikeres.
  - Verzioszam, uj konfiguracio, reset-kulcs, harom nyelvi cimke, CSS host es atmeneti SVG-vedelem statikusan ellenorizve.
- Ismert kockazat / kovetkezo lepes:
  - Felhasznaloi teszt: az alap tabla meretcsuszka mukodik.
  - A tabla/falvedo meretugras javitas modban tovabbra is fennall; a v1048 emiatt nem stabil visszaallasi pont.

### Menu-osszevonasi javaslat

- A v1049-ben implementalva, a Diagnosztika lathato felulet nelkul.
- Javasolt fo menuk:
  - `Altalanos`: preset, Safe Mode es altalanos kapcsolok; a Diagnosztika itt lehetne lenyithato halado resz.
  - `Kinezet es elrendezes`: a jelenlegi Skin + Elrendezes + Aktiv jatekos kiemeles.
  - `Tabla`: alap tabla meret + egyedi tabla + falvedo.
  - `Dobaskartyak`: Dobaspontok + Sarok jeloles + Osszertek + Checkout tipp, kulon belso szekciokkal.
  - `Effektek es extrak`: Tripla animacio + Gyozelmi hang + Ora.
- Ezzel a jelenlegi sok kulon sor nagyjabol ot ertheto tematikus menure csokkenne.

### v1049 - tartos tabla-hid, ot fo menu, lathato diagnosztika eltavolitasa

- Datum/idopont: 2026-06-27 12:29:53 +02:00
- Fajl: `src/Autodarts_CORE_v1049.user.js`
- Alap: v1048, a mukodo alap tabla meretcsuszka megtartasaval; stabil visszaallasi pont tovabbra is v1047.
- Felhasznaloi visszajelzes:
  - Az alap tabla meretezese mukodik.
  - A tabla es falvedo javitas mod alatti meretugrasa tovabbra is fennall.
  - A menu-osszevonasi javaslat alkalmazando.
  - A Diagnosztika csak akkor maradjon, ha valos felhasznaloi ertelme van.
- Valtozas - tablaallapot:
  - Uj gyokerallapotok orzik a nativ skala, custom tabla, falvedo es glow CSS valtozoit.
  - A `:has(> svg.ad-board-svg)` tartos CSS-hid az uj React-hostot mar a JavaScript ujrafelismerese elott a beallitott skala- es kepallapottal rajzolja.
  - A custom tabla/falvedo teljes host-csere kozben is ugyanazokat a gyokerbol orokolt valtozokat kapja.
  - A glow filter is gyokerallapotkent megmarad a host-csere alatt.
- Valtozas - menu:
  - Ot lathato fo menu maradt:
    - `Altalanos`
    - `Kinezet es elrendezes`
    - `Tabla`
    - `Dobaskartyak`
    - `Effektek es extrak`
  - A kapcsolodo régi oldalak belso fulekkent maradtak elerhetok.
  - Az egyes funkciok kapcsoloi a sajat belso ful tetejere kerultek.
  - A bal oldali cim `Beallitasok` lett.
- Valtozas - diagnosztika:
  - A lathato Diagnosztika fo menupont kikerult.
  - Az Egyedi tabla panel lathato board-diagnosztika gombja kikerult.
  - A belso diagnosztikai fuggvenyek megmaradtak kesobbi karbantartasi hibakereseshez, de nem foglalnak helyet a napi feluleten.
- Szandekosan erintetlen:
  - v1048 alap tabla meretcsuszka.
  - v1047 glow watcher es javitasi akciogomb-pozicio.
  - v1046 Tools for Autodarts kompatibilis dobaskartya-igazitas.
  - Minden korabbi beallitas, presetkulcs es reszletes resetlogika.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1049.user.js` sikeres.
  - A lathato diagnosztika-menu es board-diagnosztika gomb statikus darabszama 0.
  - Az ot focsoport, a belso fulek, a helyi kapcsolok es a tartos tabla CSS-hid jelenlete statikusan ellenorizve.
- Ismert kockazat / kovetkezo lepes:
  - Elo teszt kell javitas modba belepeskor a meretugrasra.
  - Elo teszt kell mind az ot fo menu, minden belso ful es azok kapcsoloi kozotti navigaciora.
- Felhasznaloi visszajelzes:
  - A menu-osszevonas jo lett.
  - A tabla es falvedo javitasi mod alatti meretugrasa nem javult meg.

### v1050 - Jateknezet es Jatekoskartyak menu, celzott meretugras-naplo

- Datum: 2026-06-27
- Fajl: `src/Autodarts_CORE_v1050.user.js`
- Alap: v1049; stabil visszaallasi pont tovabbra is v1047.
- Valtozas - menu:
  - Hat lathato fo csoport van:
    - `Altalanos`
    - `Jateknezet`
    - `Jatekoskartyak`
    - `Egyedi tabla`
    - `Dobaskartyak`
    - `Effektek es extrak`
  - A `Jateknezet` kizarolag a `Ketoldalas CORE nezet` es az `Eredeti Autodarts nezet` kozotti valasztast tartalmazza.
  - A `Jatekoskartyak` belso fulei: `Skin`, `Tartalom`, `Aktiv jatekos`.
  - A jatekoskartya hattere, atlatszosaga es egyedi betutipusa a `Skin` ala kerult.
  - A betutipus resetkulcsai is a `Skin` resethez kerultek.
  - A `Tartalom` alatt maradt a nev/atlag lathatosaga, elhelyezese es a kartya tartalmanak meretezese.
  - A technikai automatikus elrendezes-kikapcsolas kapcsoloja kikerult a lathato feluletrol; a belso vedelmi beallitas megmaradt.
- Valtozas - tabla meretugras diagnosztika:
  - A dobaskartyara torteno kattintas utan 4,5 masodpercig passzivan mintazza a tabla SVG, host, gyoker CSS-allapot es transzformaciok valtozasait.
  - Az elemek futasideju azonositot kapnak csak a naploban, igy bizonyithato lesz, ha a React uj hostot vagy uj SVG-t hoz letre.
  - Az `Egyedi tabla` panelen ideiglenes `Meretugras naplo masolasa` gomb masolja a legutobbi rogzitest.
  - A naplozo nem klonoz, nem mozgat es nem torol React/Autodarts DOM-elemet.
- Szandekosan erintetlen:
  - v1047 glow watcher es javitasi akciogomb-pozicio.
  - v1046 Tools for Autodarts kompatibilis dobaskartya-igazitas.
  - A tabla-, falvedo- es dobaspontretegek jelenlegi mukodese.
  - A history es Undo vedelme, valamint a kartya-geometria.
- Ellenőrzés:
  - A teljes userscript metadata blokkja es a v1050 verzioszam megvan.
  - A hat focsoport, a har jatekoskartya-alful, az egyetlen betutipus-vezerlo blokk es a celzott naplozo statikusan ellenorizve.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1050.user.js` sikeres.
- Ismert kockazat / kovetkezo lepes:
  - A meretugras meg nincs javitottnak minositve. Elo reprodukcio utan a masolt atmeneti naplo alapjan keszulhet celzott javitas.
  - A v1050 menunavigacio es resetek elo felhasznaloi tesztje szukseges.
- Beert felhasznaloi diagnosztika:
  - Javitas modba belepeskor a React lecsereli a tabla SVG-t es annak hostjat.
  - A régi SVG/host futasideju azonositoja `1/2`, az uje `8/9`.
  - A beallitott `CUSTOM_BOARD_GROUP_SCALE` vegig `0.62` marad, tehat az ertek nem veszik el.
  - Az uj host merete es transformja idoben: `988 px / 1.00`, majd `795 px / 0.804848`, vegul `613 px / 0.62`.
  - Kovetkeztetes: a lathato meretugras oka az uj host orokolt CSS transform-atmenete, nem kesoi konfiguracio vagy hibas meretertek.

### v1051 - menu finomitas, CORE fokapcsolo, azonnali tablaszkalazas

- Datum: 2026-06-27
- Fajl: `src/Autodarts_CORE_v1051.user.js`
- Alap: v1050; stabil visszaallasi pont tovabbra is v1047.
- Valtozas - Jateknezet es Skin:
  - A `Jatekoskartyak / Skin` tetejerol kikerult a generikus `Funkcio bekapcsolva` kapcsolo.
  - A rejtett régi `SKIN_ENABLED` presetenkent automatikusan igaz, amig a teljes CORE be van kapcsolva.
  - A Stylebot-kompatibilitasi szoveg rövidebb lett es atkerult a `Jateknezet` ala.
  - A `Jateknezet` uj `Autodarts CORE bekapcsolva` fokapcsolot kapott.
  - Kikapcsolaskor a fokapcsolo helyi bongeszotaroloba ment, majd ujratolti az oldalt, igy a userscript tobbi resze egyaltalan nem indul el.
  - Kikapcsolt allapotban egy kis `CORE OFF` gomb marad, amely visszakapcsolja a scriptet es ujratolti az oldalt.
- Valtozas - menu szovegtordeles:
  - A panelen a szavakon beluli tordeles es automatikus elvalasztas tiltva van.
  - A belso fulek legalabb a sajat teljes szavuk szelesseget megtartjak.
  - Ha a fulek egyutt nem fernek el, a fulcsik vizszintesen gorgetheto, ahelyett hogy peldaul a `Dobaspontok` utolso betuje uj sorba kerulne.
- Valtozas - betutipus felulet:
  - A `Nagy fajlok lassithatjak...` / ures nev alapertelmezes segedszoveg kikerult a jatekos- es dobaskartya betutipus-feluleterol.
- Valtozas - tabla meretugras:
  - A naploval bizonyitott host `transform`-atmenet `transition:none !important` szaballyal le lett tiltva a nativ es custom tabla hostjan.
  - Az uj React-host igy koztes `1.00` es `0.804848` meret nelkul azonnal a beallitott skalan jelenik meg.
  - A v1050 ideiglenes meretugras-naplozoja es lathato masologombja kikerult.
- Szandekosan erintetlen:
  - v1047 glow watcher es javitasi akciogomb-pozicio.
  - v1046 Tools for Autodarts kompatibilis dobaskartya-igazitas.
  - A glow-, dobaspont-, history- es Undo-mukodes.
  - A tabla es falvedo mentett meret-, eltolasi es kepbeallitasai.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1051.user.js` sikeres.
  - A v1050 atmeneti naplozo, masologomb es font-segedszovegek hianya statikusan ellenorizve.
  - A fokapcsolo, a szotordeles-vedelem es a ket tabla-host `transition:none` szabalya statikusan ellenorizve.
- Ismert kockazat / kovetkezo lepes:
  - Elo teszt kell javitas modba belepeskor, hogy a meretanimacio valoban megszunt-e.
  - Elo teszt kell a teljes CORE ki- es visszakapcsolasara, valamint a negy `Dobaskartyak` alful szovegere.
- Felhasznaloi visszajelzes:
  - A tabla javitas mod alatti meretbeesese megszunt.
  - A `Dobaskartyak` almenui nem tornek szet egy szot, de emiatt vizszintesen gorgethetove valt a fulsor.
  - Cancel utan a kivalasztott dobasjelolo eltunik, es csak oldalfrissitesre vagy uj dobasra jelenik meg.
  - Az animaciok erezhetoen nagyon laggossa valtak.

### v1052 - nem gorgetos almenuk, Cancel marker resync, observer optimalizalas

- Datum: 2026-06-27
- Fajl: `src/Autodarts_CORE_v1052.user.js`
- Alap: v1051; a mukodo tabla-meretugras-javitas megtartva.
- Valtozas - almenuk:
  - A negy belso fulet tartalmazo csoportok ket oszlopos racsban jelennek meg.
  - A vizszintes gorgetes kikerult.
  - A feliratok szokoznel legfeljebb tobb sorba torhetnek, de a globalis szotordeles-vedelem miatt egyetlen szo nem szakad szet.
  - A fuleken stabil minimum magassag tartja egyben a racsot.
- Valtozas - Cancel utani dobaspont:
  - A custom board markerfigyelo teljes `dirtyBoard` ujrafeldolgozas helyett celzott marker-ujraazonositast vegez.
  - Markerre hatassal levo DOM-valtozas utan `80`, `260` es `700` ms kesleltetessel ujraellenorzi a dobaspontokat.
  - A Cancel gomb kattintasa kulon is elinditja ugyanezt a harfazisu marker-resyncet.
  - Ez kezeli azt az esetet, amikor a React a Cancel utan tobb lepesben allitja vissza a marker alakzatat.
- Valtozas - teljesitmeny:
  - A board observer mar nem figyeli a `transform` es `style` animacios attribútumokat.
  - A path alaku tablaelemek animacios attributumvaltozasa nem indit markerfrissitest; csak gyermekcsere, megjelolt marker vagy circle/ellipse geometria.
  - A dokumentumszintu observer nem tekint minden uj SVG ikont dartstablanak; csak az `isBoardSvg` felteteleinek megfelelo SVG indit teljes board-frissitest.
  - A dokumentumszintu observer nem hiv altalanos CORE-frissitest minden DOM-mutaciora.
  - A dobaskartya- es jatekoskartya-observerek attribútumok kozul csak a `class` valtozasat figyelik, nem a kepkockankent valtozo inline `style` animaciot.
- Szandekosan erintetlen:
  - v1051 azonnali tablaszkalazasa es CORE fokapcsoloja.
  - v1047 glow watcher es akciogomb-pozicio.
  - v1046 Tools for Autodarts kompatibilis dobaskartya-geometria.
  - History, Undo es a mentett tabla/falvedo beallitasok.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1052.user.js` sikeres.
  - A ketoszlopos negyfules racs, a har marker-resync kesleltetes, a Cancel hook es a szukitett observerek statikusan ellenorizve.
- Ismert kockazat / kovetkezo lepes:
  - Elo teszt kell Cancel utan a marker visszateresere.
  - Elo teszt kell a tripla-, kartya- es glow-animaciok folyamatossagara.
  - Elo teszt kell normal dobas, javitas elfogadasa es uj React tabla-host letrejotte mellett.

### v1053 - jatekoskartya informacios blokk fuggoleges kozepre igazitasa

- Datum: 2026-06-27
- Fajl: `src/Autodarts_CORE_v1053.user.js`
- Alap: v1052; annak menu-, marker-, teljesitmeny- es tablaszkalazasi javitasai valtozatlanok.
- Felhasznaloi igeny:
  - A pontszam, nev es atlagsor kozos blokkja mindig a kartyateto es a history teteje kozotti szabad terulet fuggoleges kozepen legyen.
  - Ez sorok kikapcsolasa es barmelyik meretbeallitas utan is maradjon igaz.
- Valtozas:
  - A tenylegesen aktiv v91 ketjatekos kartyareteg `.ad-core-v91-content` oszlopa `justify-content:flex-start` helyett `justify-content:center` erteket kapott.
  - A v91 mar korabban pontos also paddinggel lefoglalta a history magassagat es a koztuk levo rest; a center igazitas ezen megmaradt szabad savon belul mukodik.
  - A nev vagy atlag `display:none` allapota automatikusan kiveszi a sort a flexmeretbol.
  - A pontszam, nev es atlag tenyleges betumerete modositja a flexblokk magassagat, ezert meretezes utan is ujrakozepre kerul.
- Szandekosan erintetlen:
  - A jatekoskartyak kulso merete es helye.
  - A history merete, helye, gorgetese es sorai.
  - A nev/atlag sorrendje, lathatosagi kapcsoloi es merettartomanyai.
  - A v1005/v1011 dobaskartya- es akciogomb-geometria.
- Ellenőrzés:
  - A v1052 es v1053 kozotti tartalmi diff a metadata mellett egyetlen CSS tulajdonsag: a v91 jatekoskartya informacios oszlop igazítása.
  - A dobaskartyasor `justify-content:flex-start` beallitasa valtozatlan maradt.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1053.user.js` sikeres.
- Ismert kockazat / kovetkezo lepes:
  - Elo teszt kell mindket sor lathato, csak nev, csak atlag, illetve mindketto rejtett allapotban.
  - Elo teszt kell minimum, alap es maximum pontszam/nev/atlag meretekkel.

### v1054 - Cancel marker, allapotkartyak, hang, betukozep es teljesitmeny

- Datum: 2026-06-27
- Fajl: `src/Autodarts_CORE_v1054.user.js`
- Alap: v1053; annak elfogadott jatekoskartya-kozepezese valtozatlan.
- Referencia:
  - A felhasznalo altal csatolt korai `2.5.6` userscript allapot-hatter es teljesitmeny mukodese.
  - A régi kodbol nem keszult teljes visszaemeles; csak a kert viselkedesek relevans elveit hasonlitottuk ossze.
- Valtozas - Cancel utani dobaspont:
  - Javitas modba lepes elott a lathato natív dobaspontok tabla-aranyos koordinatai rogzulnek.
  - Cancel utan a script ujra megkeresi a natív pontokat.
  - Csak a tenylegesen hianyzo pont kap script-sajat, fix overlay potlast.
  - Ha a natív pont visszater, a potlas automatikusan megszunik; OK, Bouncer vagy Next eseten szinten torlodik.
  - React/Autodarts DOM-elem nem lett klonozva, athelyezve vagy torolve.
- Valtozas - gyoztes es tuldobas hatter:
  - A v67 kozvetlen, `!important` jatekoskartya-hattere kikerult, mert elfedte a natív zold/piros allapotszint.
  - A normal sajat kartya-hatter tovabbra is a meglevo pseudo-retegen marad.
  - Az allapotfelismeres a panel es a natív player elem szinet is ellenorzi.
  - Allapotfrissites gyozelmi UI alatt is lefut.
- Valtozas - gyozelmi hang:
  - A lejatszas mar nem a dobaskartya szovegehez kotott.
  - A Finish/Next leg/Next set gyozelmi UI valodi megjelenesi elet figyeli.
  - Az aktiv polling es a jatekoskartya-observer is frissiti a hangallapotot.
- Valtozas - ora:
  - A Clock alol kikerult a masodik, generikus `Funkcio bekapcsolva` kapcsolo.
  - Az `Ora engedelyezese` maradt az egyetlen ora ki/be kapcsolo.
- Valtozas - feltoltott dobaskartya-betu:
  - A korabbi fix felfele tolás helyett kozos CSS valtozo ad optikai korrekciot.
  - Alap betunel a korabbi `-0.045em`, feltoltott betunel `+0.075em` az eltolás.
  - A normal dobas-, total- es specialis dobaskartya ugyanazt a korrekciot hasznalja.
- Valtozas - teljesitmeny:
  - A fo dinamikus CSS, a player-layout CSS, a skin CSS es a font-face blokkok csak valodi tartalmi valtozasnal irodnak ujra.
  - A statikus v91-v1016 style blokkok is csak egyszer kerulnek a dokumentumba, nem minden geometriai frissiteskor.
  - A mar korabban no-op-ra allitott v99 es v100 geometriai kiserletek felesleges turn-observere leallt.
  - A mukodo v94/v95/v1046 kartya- es akciogomb-geometria megmaradt.
- Szandekosan erintetlen:
  - v1053 score/name/avg kozepezes.
  - v1005/v1011 dobaskartya-, Undo/Next- es jatekoskartya-geometria.
  - Saját history es Undo top-row vedelem.
  - Egyedi tabla/falvedo meret, glow es kepbeallitasok.
- Ellenőrzés:
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1054.user.js` sikeres.
  - Metadata es belso `SCRIPT_VERSION` egyezik.
  - A Clock generikus duplakapcsoloja statikusan nincs jelen.
- Elo felhasznaloi visszajelzes:
  - Az oldal es az animaciok sebessege megfelelo lett.
  - A gyozelmi zene megszolal.
  - A gyoztes zold es a bust piros jatekoskartya-hatter mukodik.
  - A feltoltott dobaskartya-betu a kartya kozepehez kepest kissel lejjebb kerult.
  - A Cancel utan eltunt dobaspont tovabbra sem tert vissza.
- Ismert kockazat / kovetkezo lepes:
  - A Cancel utani dobaspont-potlast tovabb kell erositeni.

### v1055 - Kulon osszkartya-font, vizualis retegek es kiegeszito-igazitas

- Datum: 2026-06-27
- Fajl: `src/Autodarts_CORE_v1055.user.js`
- Alap: v1054 teljes masolata.
- Megorzott, elo teszttel igazolt v1054 mukodes:
  - megfelelo animacios sebesseg;
  - mukodo gyozelmi zene;
  - zold gyoztes es piros bust jatekoskartya.
- Valtozas - konfetti:
  - A jatekoskartya `.fireworks` retege a kartya geometriai kozepe helyett a tenyleges `.ad-ext-player-score` pontszam kozepehez igazodik.
  - A React/Autodarts elemek nem lettek athelyezve vagy klonozva.
- Valtozas - osszkartya sajat betutipusa:
  - Uj `TOTAL_CARD_CUSTOM_FONT`, `TOTAL_CARD_FONT_DATA_URL` es `TOTAL_CARD_FONT_FAMILY` beallitasok keszultek.
  - Az Osszkartya menuben kulon feltoltes, torles, aktivalas es family mezo jelent meg.
  - A numerikus osszeg es a natív BUST felirat is az osszkartya sajat fontlancat kapja.
  - A dobaskartya-font tobbe nem vezerli az osszkartya fontjat vagy optikai eltolását.
- Valtozas - dobaskartya feltoltott betu:
  - A v1054 `+0.075em` korrekcioja `+0.015em` ertekre valtozott, hogy a felirat ne keruljon a kozeppont ala.
- Valtozas - menu:
  - A teljes jatekter helyi hatterkepe, overlay szine es overlay atlatszosaga a Jatekoskartyak / Skin alol a Jateknezet menube kerult.
  - A Jatekoskartyak / Skin csak a jatekoskartya hatteret, atlatszosagat es betutipusat tartalmazza.
  - A kapcsolodo tab-reset kulcsok is az uj helyet kovetik.
- Valtozas - retegsorrend:
  - Ketjatekos CORE nezetben a jatekoskartya-reteg `z-index:20`.
  - A dobaskartya- es osszkartya-sav `z-index:110`, igy a jatekoskartyak mogotte maradnak.
- Valtozas - kameranezet gombsora:
  - A kamera alatt megjeleno `1`, `2`, `3` gombok kozos sora a tenyleges osszkartya kozepehez, alatta 12 px ressel igazodik.
  - Fix, felbontasfuggo koordinata helyett a renderelt kartya mereteit hasznalja.
- Valtozas - Tools for Autodarts Darts Zoom:
  - A kiegeszito kozepso nezetenek stabil `adt-zoom-1`, `adt-zoom-2`, `adt-zoom-3` azonositoi alapjan tortenik az igazitas.
  - Mindegyik zoomablak a megfelelo dobaskartya bal szelehez, szelessegehez es magassagahoz igazodik.
  - A zoomablak es a dobaskartya kozott 14 px fuggoleges res marad.
  - A kiegeszito DOM-elemei nem lettek athelyezve, klonozva vagy torolve.
- Valtozas - Cancel utani dobaspont:
  - A tabla keresese a custom attribútum mellett `svg.ad-board-svg` es a bizonyitott `isBoardSvg` felismerest is hasznalja.
  - A markermentes mar a teljes dobaskartya-sav nem interaktiv reszen torteno javitasinditast lefedi.
  - A lathatatlan natív marker nem szamit helyreallitottnak.
  - A fallback reteg `z-index:100`, a tabla folott es a dobaskartyak alatt.
  - Passziv allapot: `window.__AD_CORE_V1055_MARKER_FALLBACK__`.
- Teljesitmeny:
  - Nem keszult uj `setInterval`.
  - A kamera-, zoom- es konfetti-igazitas a meglevo ritka akciosor-frissitesre, illetve relevans DOM-valtozasnal egyetlen `requestAnimationFrame` utemre epul.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.19-v1055-card-font-marker-addon-alignment`.
  - A v1054 es v1055 fajlban egyarant 8 darab `setInterval` hivas van.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1055.user.js` sikeres.
- Elo teszt szukseges:
  - konfetti eredete mindket jatekos gyozelmenel;
  - BUST sajat osszkartya-betuvel;
  - Cancel utani marker 1, 2 es 3 dobassal;
  - kameranezet 1-2-3 gombsora;
  - Tools for Autodarts kozepso Darts Zoom igazitas tobb felbontason.

### v1056 - Player hatter, konfetti/180 szetvalasztas, zoom es marker erosites

- Datum: 2026-06-28
- Fajl: `src/Autodarts_CORE_v1056.user.js`
- Alap: v1055 teljes masolata.
- Megorzott, elo teszttel mar korabban igazolt mukodes:
  - megfelelo retegsorrend;
  - kulon dobaskartya- es osszkartya-font;
  - jateknezet hatterkezeles jo menuhelyen;
  - sebesseg es gyozelmi hang rendben maradt.
- Valtozas - player kartya hatter:
  - A player kartya sajat szine es atlatszosaga mar nem csak a kulso pseudo-layerre kerul, hanem a tenyleges kartya-feluletekre is.
  - Gyoztes/piros bust natĂ­v allapot eseten a sajat tint automatikusan visszalep, hogy a natĂ­v allapotszin maradjon lathato.
- Valtozas - konfetti es 180:
  - A teljes `.fireworks` host helyett csak a valoszinusitheto gyozelmi vizualis retegek kapnak score-kozeppontra igazito transzformaciot.
  - A lathato `180` szoveges allapotnal a script visszaengedi az eredeti 180 animaciohelyet.
  - Passziv allapot: `window.__AD_CORE_V1056_CELEBRATION__`.
- Valtozas - kamera/Tools for Autodarts igazitas:
  - A fix viewportos elhelyezes helyett a script most elobb megkeresi az adott elem valos containing blockjat, es ahhoz kepest pozicional.
  - A kamera `1 2 3` gombjai melletti kozeli spinner/plusz kontroll is ugyanabba az igazitasba kerul, ha ugyanazon csoport resze.
  - A Tools for Autodarts zoom tile-oknal a script feljebb maszik a megfelelo kartya-szeru wrapperig, nem vakon csak az `adt-zoom-*` belso elemre teszi a poziciot.
- Valtozas - Cancel utani marker:
  - A fallback marker reteg `z-index:112` lett, hogy biztosan a tabla felett maradjon.
  - A Cancel utani fallback mar azonnal is renderelni probal, nem csak kesleltetett timeoutokkal.
  - Extra 2000 ms-os ujraproba kerult be.
  - Ha a tabla SVG-je a Cancel utan mutalodik, a marker-observer ujrainditja a fallback helyreallitast is.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.20-v1056-confetti-zoom-player-bg-fixes`.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1056.user.js` sikeres.
- Elo teszt szukseges:
  - player kartya szin + atlatszosag valos valtozasa mindket oldalon;
  - gyozelmi konfetti indulasi pontja;
  - 180 animacio helye nem csuszott-e vissza;
  - kamera alatti gombsor spinnerrel egyutt;
  - Tools for Autodarts Darts Zoom a dobaskartyak alatt;
  - Cancel utani dobaspont visszajon-e frissites nelkul.

### v1057 - Player skin-hatter, szukitett font-hataskor, Undo reteg, konfetti es kenyszeritett Cancel marker

- Datum: 2026-06-28
- Fajl: `src/Autodarts_CORE_v1057.user.js`
- Alap: v1056 teljes masolata.
- Valtozas - player kartya hatter:
  - A jatekoskartya szin/atlatszosag nem csak a kulso panelre es pseudo-layerre kerul, hanem a belso valos kartya-wrapperre is.
  - Layout OFF natĂ­v `.css-y3hfdd` es Layout ON `.ad-core-v91-content` is megkapja a szint.
  - A natĂ­v gyoztes/bust allapotszinu kartya eseten ezek a plusz hatterek automatikusan atlatszora esnek vissza.
- Valtozas - player egyedi betutipus:
  - A player custom font mar nem a teljes `#ad-ext-player-display` gyokerre kerul ra.
  - Csak a valos szoveges feluletek kapjak meg: score, nev, avg es a script sajat history.
  - Ezzel a custom font mar kevesebb layout-metrikat tud feljebb tolni a kartyan.
- Valtozas - Undo/Next:
  - A normal Undo/Next akciosor `z-index:118` lett, igy a zoom kartyak fole kerul.
- Valtozas - konfetti:
  - A gyozelmi retegkereses mar nem csak a player panelen beluli canvasokra nez ra.
  - Az oldalon lathato, player kartyaval valosan atfedo canvas/wrapper retegek kozul is probal gyozelmi jelolteket talalni.
  - Passziv allapot: `window.__AD_CORE_V1057_CELEBRATION__`.
- Valtozas - Cancel utani marker:
  - A Cancel utan a fallback marker mar kenyszeritett modban a teljes utolso snapshotot kirakja, nem csak a hianyzonak erzett pontokat.
  - Ez a kenyszeritett lathatosag a kovetkezo akcioig tart, utana a korabbi logika tovabbra is takarit.
  - A marker snapshot figyeles ettol fuggetlenul megmarad, igy a natĂ­v reteg kesobbi visszaterese is tovabb kovetheto.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.21-v1057-player-skin-font-confetti-marker`.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1057.user.js` sikeres.
- Elo teszt szukseges:
  - player kartya szin es atlatszosag valoban latszik-e;
  - player custom font mar nem tolja-e fel a score/nev/history sorokat;
  - Undo/Next biztosan a zoom kartyak felett marad-e;
  - gyozelmi konfetti kozeppontja valtozott-e;
  - Cancel utan a kek dobaspont lathato-e azonnal.

### v1058 - Player skin, fontmetrika, zoom alatti akciosor es nyertes-konfetti

- Datum: 2026-06-28
- Fajl: `src/Autodarts_CORE_v1058.user.js`
- Alap: v1057 teljes masolata; a v1025 stabil alap es az eddigi kumulativ javitasok megmaradtak.
- Valtozas - player kartya hatterszin es atlatszosag:
  - A beallitas most a tenylegesen aktiv, kesoi skinretegben kerul a valos `.ad-core-v67-content` / `.css-y3hfdd` kartya-feluletre.
  - A korabbi v1057 szabaly a felulirt régi `ensureSkinCss()` retegben volt, ezert az elo oldalon nem tudott ervenyesulni.
  - Gyoztes vagy bust nativ allapotnal a sajat hatterszin tovabbra is atlatszora valt, hogy a zold/piros allapotszin latszodjon.
- Valtozas - player egyedi betutipus:
  - A custom font nem a teljes tartalomfa minden wrapperere kerul, hanem csak a tenyleges szoveglevelekre.
  - A score, nevsor, atlagsor es sajat history ugyanazt a fontot kapja, mikozben a wrapper-sormeretek a gyari Barlow Condensed metrikajan maradnak.
  - A script a gyari es a feltoltott font merheto ascent/descent adataibol optikai fuggoleges korrekciot szamol; meresi adat hianyaban 0.28 em biztonsagi korrekciot hasznal.
  - A fontmeres fajlonkent egyszer fut, normal frissitesenkent nem indul ujra.
- Valtozas - Tools for Autodarts zoom es Undo/Next:
  - Zoom nelkul az elfogadott v1005/v1011 akciosor-pozicio marad.
  - Lathato `adt-zoom-*` kartyaknal az Undo/Next sor a zoomkartyak tenyleges also ele plusz a megszokott res ala kerul.
  - Ugyanez az anchor oroklodik a Bouncer/Cancel/OK javitasi gombsorra.
- Valtozas - konfetti:
  - A kiegeszito retegkereses csak aktiv gyozelmi allapotban es csak a `0` pontot mutato nyertes kartyan adja hozza a `.fireworks` valos canvas/SVG gyermeket.
  - A nem gyozelmi 180 animacio utvonala nem kapja meg ezt a korrekciot.
  - Passziv allapot: `window.__AD_CORE_V1058_CELEBRATION__`.
- Nem erintett:
  - tabla/falvedo, glow, dobaspont es Cancel-marker kod;
  - dobaskartya-, osszkartya- es kamera-geometria;
  - history Undo-megorzese es a mar elfogadott 180 animacio.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.22-v1058-player-visual-alignment`.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1058.user.js` sikeres.
- Elo teszt szukseges:
  - player hatterszin es atlatszosag 0%, koztes es 100% erteken;
  - gyari/custom font valtasa utan score, nev, badge, atlag es history optikai kozepe;
  - Undo/Next zoom nelkul es harom zoomkartya alatt;
  - Bouncer/Cancel/OK helye zoom mellett;
  - konfetti indulasi pontja mindket jatekos gyozelmenel, valamint a 180 helye.

### v1059 - Firefox betoltesi ciklus azonnali javitasa

- Datum: 2026-06-28
- Fajl: `src/Autodarts_CORE_v1059.user.js`
- Alap: v1058 teljes masolata, a hibas font-DOM jeloles eltavolitasaval.
- Hiba oka:
  - A v1058 a player szoveglevelekre futas kozben uj CSS-osztalyt tett.
  - A projekt player `MutationObserver`-e minden `class` valtozasra teljes player-frissitest indit.
  - A frissites ujra lefuttatta a fontjelolest, ami Firefoxban onfenntarto frissitesi ciklust es "az oldal lelassitja a Firefox futasat" allapotot okozhatott.
- Javitas:
  - A teljes `adCoreV1058AnnotatePlayerFontLeaves` DOM-jeloles es annak annotate-wrapperje kikerult.
  - A Canvas `measureText` es `document.fonts.load` fontmeres is kikerult a betoltesi utvonalbol.
  - A font csak a mar letezo score/name/avg/history szelektorokon ervenyesul.
  - Az optikai korrekcio custom fontnal CSS-only `0.28em`; gyari fontnal `0em`.
  - A javitas nem ir `class` vagy `style` attribumot a megfigyelt player-kartya reszfaba.
- Megmaradt a v1058-bol:
  - kesoi aktiv skinretegben mukodo player-hatter;
  - zoomkartyak ala kerulo Undo/Next es javitasi anchor;
  - csak gyozelmi allapotban celzott konfetti, a 180 utvonal modositasa nelkul.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.23-v1059-firefox-loop-fix`.
  - A v1058 veszelyes `player-font-leaf`, `measureText` es `document.fonts.load` kodja nincs jelen.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1059.user.js` sikeres.
- Elo teszt szukseges:
  - oldal normal sebesseggel betolt-e Firefoxban;
  - player hatterszin/atlatszosag;
  - custom font pozicio;
  - zoom alatti akciosor;
  - konfetti.

### v1060 - Teljes visszaallas a betoltodo v1057 kodjara

- Datum: 2026-06-28
- Fajl: `src/Autodarts_CORE_v1060.user.js`
- Alap: a betoltodo `src/Autodarts_CORE_v1057.user.js` kozvetlen teljes masolata.
- Ok:
  - A v1059 a v1058 elso bizonyitott observer-ciklusat eltavolitotta, de a felhasznaloi elo tesztben az oldal tovabbra sem toltott be.
  - A betoltes helyreallitasa most fontosabb, mint a player-hatter/font/zoom/konfetti uj javitasainak megtartasa.
- Tartalom:
  - A v1058 es v1059 teljes kiegeszito javitoblokkja nincs jelen.
  - A v1060 es v1057 osszehasonlitasa szerint csak ket sor ter el:
    - metadata `@version`;
    - belso `SCRIPT_VERSION`.
  - Minden futasi logika a korabban betoltodo v1057-tel azonos.
- Fontos hasznalati feltetel:
  - A Tampermonkeyben egyszerre csak egy Autodarts CORE userscript lehet engedelyezve.
  - A v1058 es v1059 kikapcsolando; tobb verzio egyutt tobbszoros observereket es idozitoket indit.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.24-v1060-stable-v1057-rollback`.
  - `Compare-Object` csak a ket verziosort jelezte elteresnek a v1057-hez kepest.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1060.user.js` sikeres.
- Elo teszt szukseges:
  - csak v1060 engedelyezve, teljes Firefox oldalfrissites utan betolt-e az Autodarts.

### v1061 - Biztonsagos kozvetlen player/font/zoom/konfetti javitasok

- Datum: 2026-06-28
- Fajl: `src/Autodarts_CORE_v1061.user.js`
- Alap: a Firefoxban bizonyitottan betoltodo `src/Autodarts_CORE_v1060.user.js`.
- Biztonsagi korlatok:
  - Nincs uj `MutationObserver`.
  - Nincs uj `setInterval`.
  - Nincs uj `classList.add` vagy mas player-DOM osztalyiras.
  - Nincs uj `:has()` CSS-szelektor.
  - A v1060/v1061 statikus szamlalas mind a negy kategoriaban azonos.
- Player kartya hatterszin es atlatszosag:
  - A mar aktiv `adCoreV67SkinCss()` kapta meg a hatterszint.
  - A szin a meglevo `.ad-core-v67-content` / `.ad-core-v82-content` feluletre kerul.
  - Nativ gyoztes/bust allapotnal az `ad-native-state-bg` tovabbra is atlatszora kapcsolja a sajat szint.
- Player egyedi betutipus:
  - A meglevo `adCoreV82PlayerExtrasCss()` kapott CSS-only optikai korrekciot.
  - Gyari font: `0em`; feltoltott custom font: `0.28em`.
  - Erintett, mar letezo zonak: score, nev, atlag, Chakra nev/badge es sajat history cellak.
  - A korrekcio `translate` longhand, ezert nem valtoztat flex-meretet vagy kartya-geometriat.
- Tools for Autodarts zoom:
  - A zoomkartyak elhelyezese utan az Undo/Next sor a lathato zoomkartyak also ele ala kerul.
  - A javitasi Bouncer/Cancel/OK ugyanazt a frissitett anchort orokli.
  - Zoom eltunesekor csak egyszer all vissza a normal akciosor-hely, nincs folyamatos ujraszamolas.
- Konfetti:
  - A konfettireteg-kereses csak aktiv gyozelmi UI es `0` nyertes pontszam mellett fut.
  - Normal jatekban es 180 animacional azonnal ures listaval ter vissza, igy nem mozgatja a 180 effektet es nem keres vegig feleslegesen minden canvast.
- Nem erintett:
  - tabla, falvedo, glow es dobaspont kod;
  - kamera gombok es dobaskartya-geometria;
  - history/Undo tartalomlogika.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.25-v1061-safe-direct-fixes`.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1061.user.js` sikeres.
- Elo teszt szukseges:
  - Firefox betoltes, csak v1061 engedelyezve;
  - player hatterszin/atlatszosag;
  - custom font vizualis kozepe;
  - Undo/Next es Bouncer/Cancel/OK zoom alatt;
  - konfetti es valtozatlan 180 animacio.

### v1062 - Izolalt font-only tesztverzio

- Datum: 2026-06-28
- Fajl: `src/Autodarts_CORE_v1062.user.js`
- Alap: kozvetlenul a Firefoxban betoltodo `src/Autodarts_CORE_v1060.user.js`.
- Ok:
  - A v1061 elo tesztben nem toltott be.
  - A negy javitas egyideju visszahozasa nem tette lehetove a hibas resz biztos elkuloniteset.
- Egyetlen funkcios valtozas:
  - Csak a player custom font optikai `0.28em` fuggoleges korrekcioja kerult vissza.
  - Kizarolag mar letezo score, nev, atlag, badge es sajat history CSS-szelektorokat hasznal.
- Kifejezetten nincs benne a v1061-bol:
  - player hatterszin/atlatszosag uj javitasa;
  - zoom alatti Undo/Next uj helyezese;
  - konfetti win-gate modositas.
- Terhelesi ellenorzes v1060-hoz kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - `:has()` szelektor: 44 / 44.
  - `classList.add`: 65 / 65.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.26-v1062-font-only`.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1062.user.js` sikeres.
- Elo teszt szukseges:
  - csak v1062 engedelyezve betolt-e Firefoxban;
  - custom font fuggoleges pozicioja valtozott-e.

### v1063 - Nev egyszeres fontkorrekcio es izolalt kulso player-hatter

- Datum: 2026-06-28
- Fajl: `src/Autodarts_CORE_v1063.user.js`
- Alap: az elo tesztben betoltodo `src/Autodarts_CORE_v1062.user.js`.
- Felhasznaloi eredmeny a v1062-rol:
  - Az oldal betoltott.
  - A custom font score/atlag/history korrekcioja elfogadhato.
  - A nevsor szovege a sor aljara kerult.
- Nevkorrekcio:
  - Az `.ad-ext-player-name` es a belso `.chakra-text` egyszerre kapott `0.28em` eltolast, ami beagyazott DOM eseten osszeadodhatott.
  - A nevbox altalanos `.chakra-text` szelektora kikerult.
  - A nev sajat `.ad-ext-player-name` eleme tovabbra is egyszer kapja a korrekciot; a badge kulon marad.
- Player hatterszin es atlatszosag:
  - Kovetkezo izolalt funkciokent csak a kulso `#ad-ext-player-display > div` kartya kapja meg a mar letezo player RGB/opacity valtozokat.
  - A belso `.ad-ext-player` es content reteget nem irja felul.
  - A `panelHasNativeStateBg()` nem vizsgalja a kulso panel sajat hatteret, ezert a beallitas nem tudja onmagat nativ win/bust szinkent felismerni es class-ciklust inditani.
- Tovabbra sincs benne:
  - zoom alatti Undo/Next uj helyezese;
  - konfetti win-gate modositas.
- Terhelesi ellenorzes v1062-hoz kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - `:has()` szelektor: 44 / 44.
  - `classList.add`: 65 / 65.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.27-v1063-font-name-and-player-bg`.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1063.user.js` sikeres.
- Elo teszt szukseges:
  - csak v1063 engedelyezve betolt-e Firefoxban;
  - nev vizualisan a nevsor kozepehez kerult-e;
  - player hatterszin es atlatszosag valtozik-e;
  - gyoztes/bust nativ zold/piros allapot megmarad-e.

### v1064 - Fontonkenti automatikus metrika es zoom alatti akciosor

- Datum: 2026-06-28
- Fajl: `src/Autodarts_CORE_v1064.user.js`
- Alap: az elo tesztben betoltodo `src/Autodarts_CORE_v1063.user.js`.
- Felhasznaloi eredmeny a v1063-rol:
  - Az oldal betoltott.
  - A player hatterszin es atlatszosag mukodik.
  - A fix fonteltolas nem altalanosithato: minden feltoltott font mas lathato glyph-kozeppel rajzol.
- Automatikus fontmetrika:
  - A fix `0.28em` eltolast fontonkenti meres valtja.
  - A Canvas `TextMetrics` `actualBoundingBox*` es `fontBoundingBox*` adataibol a script a lathato glyph-kozeppontot meri.
  - Harom kulon mintat hasznal:
    - score: szamjegyek;
    - name: nev + szamjegyek;
    - stats: atlag/history karakterkeszlet.
  - Mindharom mintat a gyari `'Barlow Condensed'` ugyanazon meresehez igazitja.
  - Az eredmeny fontonkent cache-elt; azonos adat-URL/fontnev mellett nem mer ujra.
  - Fontbetoltes utan egyetlen normal `dirtyPlayers()` frissitest ker.
  - Passziv eredmeny: `window.__AD_CORE_V1064_FONT_METRICS__`.
- Zoom alatti Undo/Next:
  - A Tools for Autodarts zoomkartyak elhelyezese utan az akciosor a zoomkartyak valos also ele + normal res ala kerul.
  - `z-index:120`, ezert nem marad a zoomlapok mogott.
  - A frissitett anchor a Bouncer/Cancel/OK javitasi sorra is ervenyes.
  - Zoom kikapcsolasakor csak egyszer all vissza a normal hely.
- Biztonsagi ellenorzes v1063-hoz kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - `:has()` szelektor: 44 / 44.
  - `classList.add`: 65 / 65.
  - Uj fontbetoltesi Promise: font-tokenenkent egyszer.
- Tovabbra sincs benne:
  - konfetti win-gate modositas.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.28-v1064-auto-font-metrics-and-zoom-actions`.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1064.user.js` sikeres.
- Elo teszt szukseges:
  - csak v1064 engedelyezve betolt-e Firefoxban;
  - legalabb ket kulon custom font score/nev/atlag/history kozepe;
  - Undo/Next es Bouncer/Cancel/OK zoomkartyak alatt;
  - zoom kikapcsolasa utan normal akciosor-hely.

### v1065 - Metrika- es meretnormalizalt fontok, stabil zoom anchor

- Datum: 2026-06-29
- Fajl: `src/Autodarts_CORE_v1065.user.js`
- Alap: az elo tesztben betoltodo `src/Autodarts_CORE_v1064.user.js`.
- Felhasznaloi eredmeny a v1064-rol:
  - Az oldal betoltott.
  - A player hatterszin es atlatszosag mukodik.
  - A custom fontok baseline-ja es tenyleges glyph-merete fontonkent tovabbra is eltert.
  - A set/leg jelzo, dobaskartya es osszkartya szovege nem minden fonttal maradt kozepen.
  - Az Undo/Next a Tools for Autodarts zoom nezetben tul alacsonyra kerult.
- Custom font normalizalas:
  - Harom kulon metrika-alias keszul a player-, dobas- es osszkartyakhoz.
  - A Canvas `TextMetrics` a gyari `Barlow Condensed` es a feltoltott font tenyleges glyph-meretet es baseline-jat meri.
  - A `size-adjust` a feltoltott font rajzmagassagat a gyari fonthoz igazitja.
  - Az `ascent-override`, `descent-override` es `line-gap-override` a gyari sor- es baseline-metrikat adja az aliasnak.
  - Ugyanaz az alias oroklodik a player nev-, score-, atlag-, history- es set/leg elemeire.
  - A dobas- es osszkartyak sajat, egymastol fuggetlen font-aliasukat hasznaljak.
  - Fontonkent es szerepkoronkent egyszer mer; az eredmeny tokennel cache-elt.
  - Passziv eredmeny: `window.__AD_CORE_V1065_FONT_METRICS__`.
- Zoom alatti Undo/Next:
  - Az akciosor felso ele mindig a harom tenyleges zoomkartya legalsobb ele + 12 px.
  - A zoomhoz kotott korrekcio a normal geometriairas utan is ujraervenyesul.
  - A javitasi Bouncer/Cancel/OK sor ugyanazt a frissitett anchort kapja.
  - `z-index:120` megmarad, igy a gombok nem kerulnek a zoomkartyak moge.
- Nem erintett:
  - jatekos- es dobaskartya geometria;
  - sajat history es Undo-history vedelme;
  - hatterkep, tabla/falvedo es glow;
  - konfetti es Cancel utani dobaspont.
- Terhelesi ellenorzes v1064-hez kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - `:has()` szelektor: 44 / 44.
  - `classList.add`: 65 / 65.
  - `document.fonts.load` kodhely: 2 / 2.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.29-v1065-metric-font-aliases-and-zoom-anchor`.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1065.user.js` sikeres.
- Elo teszt szukseges:
  - csak v1065 engedelyezve betolt-e Firefoxban;
  - a harom korabban mutatott fonttal player nev/score/atlag/history/set-leg kozep;
  - kulon custom fonttal dobaskartya es osszkartya kozep;
  - Tools for Autodarts zoom alatt Undo/Next kozvetlenul a zoomkartyak alatt;
  - javitasnal Bouncer/Cancel/OK ugyanazon a helyen.

### v1066 - Zoom-akciosor koordinatajavitas es score-kozeprol indulo konfetti

- Datum: 2026-06-29
- Fajl: `src/Autodarts_CORE_v1066.user.js`
- Alap: `src/Autodarts_CORE_v1065.user.js`.
- Felhasznaloi eredmeny a v1065-rol:
  - A custom font normalizalas mukodik.
  - Az Undo/Next tovabbra is lent maradt a tabla mellett.
- Undo/Next bizonyitott okai:
  - A régi kompakt v76 szabaly a sor poziciojan felul magukat a gombokat is legfeljebb 120 px-szel lejjebb tolta.
  - A v1005 sor-transzformacio tovabbi 14 px-es eltolas maradhatott rajta.
  - A sor transzformalt Autodarts-szulo alatt van, ezert a viewport `top` ertek kozvetlen beirasa helyi koordinatakent ervenyesult.
- Zoom-akciosor javitas:
  - Aktiv Tools for Autodarts zoomnal a régi gomb- es sor-transzformaciok semlegesitve vannak.
  - A celpozicio a zoomkartyak valos also ele + 12 px.
  - A viewport celkoordinata a tenyleges transformed/offset containing block helyi koordinatajara alakul.
  - A sor jobb szele a jobb szelso zoomkartya jobb szelehez igazodik.
  - Zoom nelkul a v1066 sajat gombfelulirasai torlodnek, a régi normal elrendezes visszakapja a vezerlest.
  - A Bouncer/Cancel/OK sor ugyanazt a koordinata-konverziot hasznalja.
  - Passziv eredmeny: `window.__AD_CORE_V1066_ZOOM_ACTIONS__`.
- Konfetti eredet:
  - A régi kod minden animacios reteget a player panel kozepebol szamolt, kulso/fullscreen canvasnal is.
  - Most minden felismert animacios reteg sajat tenyleges kozepe igazodik a nyertes score elem kozepehez.
  - Egy globalis canvas csak egy, rangsorolt jatekos panelhez rendelheto, igy a masodik panel nem irhatja felul az elso beallitast.
  - A lathato 180 feliratot tartalmazo fireworks reteg tovabbra sincs mozgatva.
  - Passziv eredmeny: `window.__AD_CORE_V1066_CELEBRATION__`.
- Nem erintett:
  - a v1065 elfogadott custom font normalizalasa;
  - jatekos-, dobas- es osszkartya geometria;
  - tabla/falvedo/glow;
  - sajat history es Undo-history vedelem;
  - Cancel utani dobaspont.
- Terhelesi ellenorzes v1065-hoz kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - `setTimeout`: 44 / 44.
  - `:has()` szelektor: 44 / 44.
  - `classList.add`: 65 / 65.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.30-v1066-zoom-actions-and-score-confetti`.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1066.user.js` sikeres.
- Elo teszt szukseges:
  - Tools for Autodarts zoom mellett Undo/Next kozvetlenul a zoomkartyak alatt;
  - Bouncer/Cancel/OK ugyanazon a helyen;
  - zoom kikapcsolasakor normal Undo/Next pozicio;
  - nyerteskonfetti a nyertes score kozeperol;
  - 180 animacio helye valtozatlan.

### v1067 - Passziv konfetti DOM-diagnosztika

- Datum: 2026-06-30
- Fajl: `src/Autodarts_CORE_v1067.user.js`
- Alap: `src/Autodarts_CORE_v1066.user.js`.
- Felhasznaloi eredmeny a v1066-rol:
  - Az Undo/Next pozicio mukodik.
  - A custom fontok mukodnek.
  - A konfetti eredetjavitas nem mukodik.
- Dontes:
  - Ujabb vizualis feltetelezes helyett passziv DOM-diagnosztika keszult.
  - A v1066 konfetti-transformjai a diagnosztikai futasban nincsenek alkalmazva.
  - A mukodo Undo/Next- es fontjavitas valtozatlan maradt.
- Automatikus adatgyujtes:
  - A mar letezo player- es dokumentum-observer kapott celzott diagnosztikai horgot; uj observer nincs.
  - Csak canvas/SVG/fireworks/confetti/celebration/particle valtozasnal vagy aktiv gyozelmi allapotban keszul minta.
  - A mintak tartalmazzak:
    - player panelek es score elemek mereteit;
    - `.fireworks` retegek allapotat;
    - canvas bitmap- es CSS-mereteket;
    - relevans SVG- es wrapper-elemeket;
    - szulolancot, transformot, poziciot, overflow-t es panel-atfedest;
    - relevans DOM-mutaciok rövid osszefoglalasat.
  - Legfeljebb 12 minta marad sessionStorage-ban.
  - Passziv eredmeny: `window.__AD_CORE_V1067_CONFETTI_DIAG__`.
- Masolas:
  - A `Hang - Gyozelem` menuben ideiglenes `Konfetti diagnosztika masolasa` gomb jelent meg.
  - A gomb a korabbi automatikus mintakat es egy aktualis mintat JSON-kent a vagolapra masol.
- Nem erintett:
  - Undo/Next es Bouncer/Cancel/OK geometria;
  - custom font normalizalas;
  - 180 animacio;
  - tabla/falvedo/glow;
  - sajat history es Cancel utani dobaspont.
- Terhelesi ellenorzes v1066-hoz kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - `setTimeout` kodhely: 44 / 45; az egyetlen uj kesleltetes a celzott 320 ms-os diagnosztikai utominta.
  - `:has()` szelektor: 44 / 44.
  - `classList.add`: 65 / 65.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.31-v1067-passive-confetti-diagnostics`.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1067.user.js` sikeres.
- Szukseges elo teszt:
  - csak v1067 legyen engedelyezve;
  - egy lejatszott gyozelem utan a `Hang - Gyozelem` menuben a diagnosztikai gombbal masolni kell az adatot;
  - a kimasolt teljes JSON-t vissza kell kuldeni;
  - a vegleges konfetti-javitas csak ebbol a bizonyitott DOM-adatbol keszul.

### v1068 - Mert score-kozepes konfetti eredet

- Datum: 2026-06-30
- Fajl: `src/Autodarts_CORE_v1068.user.js`
- Alap: az elo tesztben mukodo Undo/Next- es fontjavitasokat tarto `src/Autodarts_CORE_v1066.user.js`.
- Bejovo bizonyitek:
  - A v1067 teljes elo konfetti JSON diagnosztikaja beerkezett.
  - A nyertes panel osztalya: `winnerAnimation`.
  - A nyertes belso allapota: `.ad-ext-player-winner`.
  - A konfetti nem canvas es nem SVG, hanem DOM `div` reszecskekbol all.
  - A score gyermeke egy nullameretu `confetti-explosion-container-*` horgony.
  - A reszecskek egy body alatti, teljes kepernyos `confetti-explosion-screen-*` portalban vannak.
  - A reszecskek kozos, nevtelen szuloje absolut pozicionalt kibocsato wrapper.
- Mert koordinatak a bekuldott 2560 x 1278 nezetben:
  - nyertes score rect: bal `237.4`, felso `278.3`, szelesseg `117.2`, magassag `234.9`;
  - score kozepe: `296.0`, `395.75`;
  - régi score-horgony: `237.4`, `513.3`, vagyis a score bal also sarka;
  - reszecske-wrapper eredet: `195.4`, `726.9`;
  - szukseges mert korrekcio: `+100.6 px`, `-331.15 px`.
- Javitas:
  - A dinamikus `confetti-explosion-container-*` horgony CSS-bol mar a letrejotte pillanataban a score 50% / 50% pontjara kerul.
  - A score csak `position:relative` tulajdonsagot kap; merete es elrendezese nem valtozik.
  - Tartalek JS-korrekcio a tenyleges fullscreen portal kozos emitter-wrapperet meri.
  - A wrapper sajat alappontja a nyertes score aktualis kozepehez igazodik.
  - Az eltolas idempotens: ugyanazon wrapper ujramerese nem halmozza a transformot.
  - A mar letezo dokumentum-observer csak a bizonyitott `confetti-explosion-*` DOM megjelenesekor keri az igazitast; uj observer nincs.
  - Passziv eredmeny: `window.__AD_CORE_V1068_CONFETTI__`.
- A v1067 ideiglenes diagnosztikai kodja es menugombja nincs a v1068-ban.
- Nem erintett:
  - Undo/Next es Bouncer/Cancel/OK geometria;
  - custom font normalizalas;
  - 180 animacio es `.fireworks`;
  - jatekos-, dobas- es osszkartya geometria;
  - tabla/falvedo/glow;
  - sajat history es Cancel utani dobaspont.
- Terhelesi ellenorzes v1066-hoz kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - `setTimeout`: 44 / 44.
  - `:has()` szelektor: 44 / 44.
  - `classList.add`: 65 / 65.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.32-v1068-measured-score-confetti-origin`.
  - `C:\Users\Zoli\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe --check src\Autodarts_CORE_v1068.user.js` sikeres.
- Elo teszt szukseges:
  - csak v1068 legyen engedelyezve;
  - a nyerteskonfetti a nyertes score kozeperol indul-e;
  - jobb oldali nyertesnel is a jobb oldali score kozepe a forras;
  - 180 animacio helye valtozatlan-e.

### v1069 - Erintobarat kor alaku dobasjavito

- Datum: 2026-06-30
- Fajl: `src/Autodarts_CORE_v1069.user.js`
- Alap: `src/Autodarts_CORE_v1068.user.js`.
- Cel:
  - A hibasan felismert dobas javitasa nagy, kis erintokepernyon is kenyelmesen hasznalhato vezerlessel.
  - A megoldas a gyari Autodarts javitasi folyamatat hasznalja, nem vezet be kulon meccsallapotot.
- Uj felulet:
  - Egy kitoltott dobaskartyara kattintva megnyilik a CORE sotet/cian temajahoz igazitott modal.
  - Negy nagy koriv valaszto: `SZIMPLA`, `DUPLA`, `TRIPLA`, `MISS / 25 / BULL`.
  - A kozepso szamvalaszto 1-20 kozott kattintassal, egergorgovel vagy fuggoleges erinteses huzassal allithato.
  - A felulet mutatja a jelenlegi dobast, az uj dobast es mindketto pontszamat.
  - Nagy `MEGSE` es `OK` gombok, billentyuzetes nyil- es Escape-kezeles.
  - Magyar, angol es nemet feliratok a CORE aktualis nyelve alapjan.
- Gyari integracio:
  - A dobaskartya eredeti kattintasa valtozatlanul lefut es megnyitja a nativ korrekcios modot.
  - Az `OK` a kivalasztott erteket koordinata-alapu kattintassal adja at a nativ javitotablanak, majd a gyari `OK` gombot hasznalja.
  - `MISS` eseten a gyari `Bouncer` gomb fut le.
  - A `MEGSE`, a bezaro gomb, a hatterre kattintas es az Escape a gyari `Cancel` folyamatot hasznalja.
  - A nativ `Bouncer / Cancel / OK` sor csak a modal idejere rejtett, bezaraskor az eredeti inline stilusa visszaall.
  - A Tools for Autodarts sajat `.correction-bg` ablaka csak a CORE modal nyitott idejere rejtett.
  - Hibakeresesi adat: `window.__AD_CORE_V1069_CORRECTION__`.
- Erintesvedelem:
  - A kozepso lista huzasa utan a bongeszo esetleges kovetkezo `click` esemenye nem lepteti meg egyszer az erteket.
- Szandekosan nem erintett:
  - jatekos-, dobas- es osszkartya geometria;
  - Undo/Next es zoom-kartya elhelyezes;
  - fontnormalizalas;
  - konfetti es 180 animacio;
  - tabla/falvedo/glow meretezes;
  - history es a meccsadatok kezelese;
  - React/Autodarts DOM-elemek nincsenek klonozva, athelyezve vagy torolve.
- Terhelesi ellenorzes v1068-hoz kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - Nincs uj folyamatos figyelociklus.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION` egyezik: `2.6.33-v1069-touch-magic-correction`.
  - `node --check src\Autodarts_CORE_v1069.user.js` sikeres.
- Elo teszt szukseges:
  - csak v1069 legyen engedelyezve;
  - S/D/T, 25, BULL es MISS javitasa;
  - `MEGSE` utan a dobaspont visszaallasa;
  - Tools for Autodarts bekapcsolt es kikapcsolt allapota;
  - kis erintokepernyos gorgetes es huzas;
  - custom tabla es nativ tabla melletti koordinatapontossag.

### v1070 - Kettos dobasjavito UI es vegtelen szamkerek

- Datum: 2026-07-01
- Fajl: `src/Autodarts_CORE_v1070.user.js`
- Alap: `src/Autodarts_CORE_v1069.user.js`.
- Beallitas:
  - Az `Effektek es extrak` csoport elso alfulere bekerult a `Dobasjavitas`.
  - Harom kizarolagos mod valaszthato: `Kikapcsolva`, `Kompakt`, `Kor alaku`.
  - Az alapertelmezett mod `Kor alaku`, ezert a v1069 viselkedese frissiteskor megmarad.
  - A beallitas presetenkent mentodik es a ful sajat Reset gombbal visszaallithato.
- Kompakt javito:
  - A javitando dobaskartyara kattintva ugyanazt a hover-szinu sticky kijelolest hasznalja.
  - 3 x 3 nagy erintesi mezo mutatja a kozepso szektor es a tabla ket valodi szomszedjanak D/S/T ertekeit.
  - Pelda: 18 javitasanal a szamok `1, 18, 4`, a szabvanyos tablasorrend szerint.
  - Kulon nagy `Miss`, `25` es `Bull` gombok maradtak.
  - A dupla/tripla mezok a tablaszektor piros-zold valtakozasat, a szimplak vilagos mezot hasznalnak.
  - Az aktualisan kivalasztott ertek cian keretet es glowot kap.
  - Nagy `MEGSE` es `ALKALMAZ` gombok; az Alkalmaz ugyanazt a nativ Autodarts korrekciot hivja, mint a kor alaku mod.
- Kor alaku javito:
  - A kozepso szamvalaszto mar nem szogletes doboz, hanem sotet, gorbitett, perspektivikus dobkerek.
  - A felso es also sorok 3D-s elforditast es fokozatos halvanyitast kapnak.
  - A szamsor mindket iranyban vegtelen: `... 18, 19, 20, 1, 2 ...`.
  - A `MISS / 25 / BULL` lista szinten korbefordul.
  - Egergorgo, nyilbillentyu, sorra kattintas es folyamatos erinteses huzas is lepteti.
- Kijeloles es jatekfolytatas:
  - `OK` / `ALKALMAZ`, `MEGSE`, bezaro X, hatterre kattintas es Escape utan torlodik a `data-ad-sel-throw-idx`.
  - Minden `.ad-click-selected` osztaly lekerul, a kartya elvesziti a fokuszt, majd a turn frissul.
  - Emiatt a hover-szinu kijeloles nem igenyel ujabb kartya-kattintast a jatek folytatasahoz.
  - Kikapcsolt modban a sajat sticky kijeloles es a ket CORE modal sem indul el.
- Szandekosan nem erintett:
  - a gyari nativ korrekcios allapot es meccsadat;
  - jatekos-, dobas- es osszkartya geometria;
  - Undo/Next es Tools zoom elhelyezes;
  - fontnormalizalas, konfetti es 180 animacio;
  - tabla/falvedo/glow, history es dobaspont-helyreallitas.
- Terhelesi ellenorzes v1069-hez kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - `setTimeout`: 50 / 50.
  - Nincs uj folyamatos figyelociklus.
- Logikai ellenorzes:
  - A 18 ket szomszedja a szabvanyos sorrendben: `1, 18, 4`.
- Szintaktikai ellenorzes:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.34-v1070-dual-touch-correction`.
  - `node --check src\Autodarts_CORE_v1070.user.js` sikeres.
- Elo teszt szukseges:
  - mindharom mod valtasa az Extrakban;
  - kompakt modban S/D/T, Miss, 25 es Bull;
  - kor modban 20 -> 1 es 1 -> 20 gorgetes;
  - Alkalmaz es Megse utan a kartya kijelolesenek megszunese;
  - custom es nativ tabla koordinatapontossaga;
  - Tools for Autodarts bekapcsolt es kikapcsolt allapota.

### v1071 - CORE tema es biztos Cancel utani kijelolestorles

- Datum: 2026-07-01
- Fajl: `src/Autodarts_CORE_v1071.user.js`
- Alap: `src/Autodarts_CORE_v1070.user.js`.
- Bejovo elo visszajelzes:
  - A kompakt es a kor alaku UI `MEGSE` gombja utan a dobaskartya kijelolese nem tunt el.
  - Mindket modal megjelenese eltert az Autodarts CORE sajat beallitasi paneljetol.
- Cancel javitas:
  - A gyari `Cancel` most a CORE modal bezarasa es sajat kijelolestorlese elott fut le.
  - A torles a React frissules utan rövid, veges pontokon ujra lefut: azonnal, 90 ms, 240 ms es 650 ms.
  - Minden korben torlodik a `data-ad-sel-throw-idx` es az `.ad-click-selected`.
  - Ha a React kozben lecsereli a turnt vagy a dobaskartyat, a javitas az aktualis elo `#ad-ext-turn` es az eredeti dobasi index alapjan folytatodik.
  - Az erintett kartya 650 ms-ig `.ad-core-correction-released` vedoosztalyt kap, amely felulirja a beragadt hover/focus/active hatterszint.
  - Uj kartya-kattintas azonnal leveszi ezt a vedoallapotot, ezert a kovetkezo javitas kijelolese normalisan mukodhet.
  - Ugyanez a lezarasi vedelem az `OK` / `ALKALMAZ` agra is ervenyes.
- CORE tema mindket modalon:
  - Kulso panel: `rgba(0,0,0,.78)`, 16 px sarok, vekony feher keret, 10 px blur es a CORE panellel azonos fekete arnyek.
  - Fejlec: `Autodarts CORE` zold badge, lokalizalt `Dobas javitasa` cim es a panel gombjaival azonos bezaro gomb.
  - Masodlagos gombok: feher, attetszo panelgombok 12 px sarokkal.
  - Elsoleges gombok es kijeloles: a CORE `rgba(60,255,120,...)` zold akcentusa.
  - Kor alaku UI: a szektor- es kerek-kijeloles cian helyett CORE-zold.
  - Kompakt UI: a keret, gombforma es aktiv kijeloles CORE-stilusu; a visszafogott piros/zold/krem tablaszinek csak ertekjelenteskent maradtak.
  - Elozet, racs es elvalasztok: a CORE menucsoportokkal azonos feher attetszo feluletek.
- Szandekosan nem erintett:
  - a ket javitasi mod valasztasa es erteklogikaja;
  - nativ Autodarts korrekcio es meccsallapot;
  - jatekos-, dobas- es osszkartya geometria;
  - Undo/Next, Tools zoom, fontok, konfetti, tabla/falvedo/glow es history.
- Terhelesi ellenorzes v1070-hez kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - Nincs uj folyamatos figyelociklus.
- Szintaktikai ellenorzes:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.35-v1071-core-themed-correction-release`.
  - `node --check src\Autodarts_CORE_v1071.user.js` sikeres.
- Elo teszt szukseges:
  - kompakt es kor modban `MEGSE`;
  - kompakt `ALKALMAZ` es kor `OK`;
  - kijeloles megszunese olyan esetben is, amikor a React lecsereli a kartya DOM-ot;
  - mindket modal vizualis osszhangja a CORE panellel.

### v1072 - Tartos kartyafeloldas es ivet koveto lokalizalt feliratok

- Datum: 2026-07-01
- Fajl: `src/Autodarts_CORE_v1072.user.js`
- Alap: `src/Autodarts_CORE_v1071.user.js`.
- Bejovo elo visszajelzes:
  - `MEGSE` utan a dobaskartya kijelolese a v1071-ben is visszatert.
  - A kor alaku UI Szimpla/Dupla/Tripla/Special feliratai nem voltak a cikkelyek kozepeben.
  - A feliratoknak kovetniuk kell a cikkely ivet es a kivalasztott nyelvet.
- Kijelolestorles javitas:
  - A v1071 650 ms utan eltavolitotta az `.ad-core-correction-released` vizualis feloldast.
  - A v1072 ezt mar nem idozitve szedi le; a feloldas a kartyahoz kotve megmarad.
  - A feloldas csak akkor torlodik, ha:
    - a felhasznalo ujra rabok ugyanarra a dobaskartyara;
    - a kartya dobaskodja tenylegesen megvaltozik;
    - a Dobasjavitas modot a menuben atallitjak/kikapcsoljak;
    - a React uj kartya-DOM-ot hoz letre.
  - A `data-ad-sel-throw-idx` es `.ad-click-selected` torles tovabbra is tobb React-frissitesi ponton fut le.
  - A release allapot eltarolja az eredeti dobaskodot, igy egy sikeres javitas utan az uj ertek automatikusan felszabaditja a kartyat.
- Kor alaku UI felirat-geometria:
  - A negy felirat hard-coded x/y es rotate elhelyezese megszunt.
  - Mindegyik cikkely sajat, 139.5 sugaru SVG kozepiv-pathot kapott.
  - A feliratok `textPath`, `startOffset=50%` es kozepso text-anchor segitsegevel az iv kozepen vannak.
  - A felso es also szoveg balrol jobbra olvashato.
  - A bal es jobb oldali szoveg a sajat cikkelyenek gorbuletet koveti.
- Lokalizacio:
  - Magyar: `SZIMPLA`, `DUPLA`, `TRIPLA`, `MELLE / 25 / BULL`.
  - Angol: `SINGLE`, `DOUBLE`, `TRIPLE`, `MISS / 25 / BULL`.
  - Nemet: `EINFACH`, `DOPPEL`, `TRIPEL`, `FEHLWURF / 25 / BULL`.
  - A kompakt UI Miss gombja is lokalizalt: `Melle`, `Miss`, `Fehlwurf`.
  - Cim, aria-label es tobbi modal-felirat tovabbra is a CORE aktualis HU/EN/DE nyelvet hasznalja.
- Szandekosan nem erintett:
  - kompakt ertekvalasztasi logika es tablaszomszedok;
  - vegtelen szamkerek;
  - nativ korrekcio es meccsallapot;
  - kartya-, tabla-, Undo/Next-, Tools zoom-, font-, konfetti- es history-funkciok.
- Terhelesi ellenorzes v1071-hez kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - `setTimeout`: 52 / 52.
  - Nincs uj folyamatos figyelociklus.
- Szintaktikai ellenorzes:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.36-v1072-persistent-release-curved-labels`.
  - `node --check src\Autodarts_CORE_v1072.user.js` sikeres.
- Elo teszt szukseges:
  - `MEGSE` utan a kartya maradjon normal hatteren 1 masodperc utan is;
  - uj kattintasnal a kijeloles ujra jelenjen meg;
  - sikeres javitas utan az uj dobaskod oldja fel a release allapotot;
  - mind a negy ivfelirat kozephelyzete;
  - HU/EN/DE feliratok kor es kompakt modban.

### v1073 - Elo gyari Cancel es szamos nezet passziv diagnosztika

- Datum: 2026-07-02
- Fajl: `src/Autodarts_CORE_v1073.user.js`
- Alap: `src/Autodarts_CORE_v1072.user.js`.
- Bejovo elo visszajelzes:
  - Az ivfeliratok helye es nyelve rendben van.
  - `MEGSE` utan a dobaskartya kijelolese tovabbra sem szunik meg.
  - A felso harom nativ tablamegjelenites kozul a szamos/manualis nezet balra ugrik es szetcsusztatja az oldalt.
- Cancel konkret kodhiba:
  - A korabbi kod a sessionben eltett Cancel gombot hasznalta akkor is, ha azt a React mar lecserelte vagy lecsatlakoztatta.
  - Ilyenkor a CORE modal bezarult gyari Cancel kattintas nelkul, ezert a nativ korrekcios allapot aktiv maradt.
- Cancel javitas:
  - A `MEGSE` aszinkron, ellenorzott lezarasi folyamat lett.
  - Mindig friss DOM-bol keres elo `Cancel` gombot.
  - Ha a gomb meg nincs kesz, legfeljebb 1600 ms-ig var a nativ Bouncer/Cancel/OK sorra.
  - Lecsatlakoztatott vagy disabled gombot nem tekint ervenyesnek.
  - Kattintas elott visszaallitja a korabban csak vizualisan elrejtett nativ akciosor stilusat.
  - A React gombcsere miatt egy friss ujrakereses es legfeljebb egy masodik Cancel kattintas engedelyezett.
  - A CORE modal csak elo Cancel megtalalasa es kattintasa utan zarul be.
  - Ha nincs elo Cancel, a modal nyitva marad es hibauzenetet mutat.
  - Passziv eredmeny: `window.__AD_CORE_V1073_CANCEL__`, benne a kattintasi kiserletek es a kartya elotte/utana allapota.
- Szamos nezet:
  - A kepernyokep alapjan a hibas kontener nem bizonyithato biztonsagosan.
  - A projekt DOM-szabalya szerint ebben a verzios lepesben nincs talalgatott CSS/geometriai javitas.
- Uj passziv nezetdiagnosztika:
  - Helye: `Jateknezet` menu, `Szamos nezet diagnosztika masolasa`.
  - Csak gombnyomasra fut; nincs uj observer vagy interval.
  - Rogziti:
    - viewport, dokumentum client/scroll szelesseg es oldal osztalyok;
    - layout/custom-board konfiguracio;
    - `#ad-ext-turn`, a negy turn surface es gyermekeik;
    - `#ad-ext-player-display` es a jatekospanelek;
    - Double/Triple/Miss/Bull/25/S1-S20 elemek es geometriai oseik;
    - felso nezetvalaszto gombok;
    - CORE altal megjelolt tabla-, kamera-, zoom- es akciosor kontenerek;
    - nagy SVG/canvas/video feluletek;
    - minden elemnel rect, lenyeges computed layout stilus, osztaly, DOM-path es CORE data attribitumok.
  - Passziv eredmeny: `window.__AD_CORE_V1073_VIEW_DIAG__`.
- Terhelesi ellenorzes v1072-hoz kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - Nincs uj folyamatos figyelociklus.
- Szintaktikai ellenorzes:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.37-v1073-live-cancel-view-diagnostics`.
  - `node --check src\Autodarts_CORE_v1073.user.js` sikeres.
- Kovetkezo elo lepes:
  - mindket javito UI-ban `MEGSE` teszt;
  - hibas szamos nezet kivalasztasa;
  - CORE panel -> `Jateknezet` -> `Szamos nezet diagnosztika masolasa`;
  - a teljes kimasolt JSON visszakuldese;
  - a szamos nezet vegleges geometriai javitasa csak ebbol a DOM-bizonyitekbol keszul.

### v1074 - Custom-only Megse es szamos nezet root-transzform javitas

- Datum: 2026-07-02
- Fajl: `src/Autodarts_CORE_v1074.user.js`
- Alap: `src/Autodarts_CORE_v1073.user.js`.
- Bejovo bizonyitek:
  - A v1073 teljes szamos-nezet JSON diagnosztikaja beerkezett.
  - A `MEGSE` a `Gyari javitasi nezet nem erheto el` uzenetnel nem engedte bezarni a CORE modalt.
- Cancel bizonyitek es javitas:
  - Ebben a kornyezetben a CORE javito ugy is megnyilhat, hogy nincs nativ Bouncer/Cancel/OK sor.
  - A nativ Cancel hianya ezert ervenyes `custom-only` allapot, nem blokkolando hiba.
  - `MEGSE` most azonnal bezarja a CORE modalt es lefuttatja a sajat tartos kartyafeloldast.
  - Ha a gyari korrekcios sor mar el, az elo Cancel tovabbra is lefut.
  - Ha a gyari sor kesve jelenik meg, 100, 280 es 650 ms-nal veges utokereses probalja egyszer lezarni.
  - A kesoi kattintas csak akkor ervenyes, ha egyszerre el egy csatlakoztatott, nem disabled Cancel es egy elo OK.
  - Passziv eredmeny: `window.__AD_CORE_V1074_CANCEL__`.
- Szamos nezet diagnosztikai teny:
  - Viewport: `2560 x 1278`.
  - A szamos tabla sajat kozepe helyesen 606 px szeles volt.
  - A teljes `#root` hibasan ezt kapta:
    - `data-ad-core-v1005-action-row="1"`;
    - `transform: matrix(1, 0, 0, 1, -560, 14)`.
  - Emiatt a teljes oldal es a fix jatekoskartya-host pontosan 560 px-lel balra csuszott.
  - A kozepso tartalom `15..1425` helyett root-korrekcio nelkul `575..1985` savba kerul.
- Root-transzform oka:
  - A v1005 Undo/Next kozos-szulo keresese minden osre tovabblepett.
  - Ha egyik os sem fert bele a `80..480 px` szelesseg es `<=110 px` magassag hatarba, a ciklus vegso nagy ose maradt az `actionRow`.
  - A szamos nezetben ez a teljes `#root` lett.
- Root-transzform javitas:
  - Az akciosor valtozo kezdetben `null`.
  - Csak az a kozos szulo fogadhato el, amely bizonyitottan:
    - tartalmazza az Undo es Next gombot;
    - 80..480 px szeles;
    - 20..110 px magas.
  - Ha nincs ilyen elem, nincs akciosor-transzform.
  - Minden korabban `data-ad-core-v1005-action-row` jelolt, de mar nem ervenyes elemrol lekerul:
    - a marker;
    - `transform`;
    - `translate`;
    - `will-change`.
  - Ez a v1073 altal tevesen megjelolt `#root` elemet is automatikusan visszaallitja.
- Diagnosztikai UI:
  - A bizonyitek beerkezese utan a `Szamos nezet diagnosztika masolasa` gomb kikerult a lathato Jateknezet menubol.
  - A passziv belso gyujto nem fut automatikusan.
- Szandekosan nem erintett:
  - a szamos tabla sajat 606 px-es gridje;
  - normal es kamera tabla nezet;
  - elfogadott turn-card geometria;
  - jatekoskartyak, Tools zoom, fontok, konfetti, tabla/falvedo/glow es history.
- Terhelesi ellenorzes v1073-hoz kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - `setTimeout`: 54 / 54.
  - Nincs uj folyamatos figyelociklus.
- Szintaktikai ellenorzes:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.38-v1074-custom-cancel-numeric-view-fix`.
  - `node --check src\Autodarts_CORE_v1074.user.js` sikeres.
- Elo teszt szukseges:
  - kompakt es kor UI `MEGSE` gyari javitasi sor nelkul;
  - szamos nezet kozephelyzete;
  - visszavaltas normal es kamera nezetre;
  - normal nezet Undo/Next pozicio valtozatlansaga.

### v1075 - Szamos nezet kozepso sav es tartos Megse-feloldas

- Datum: 2026-07-02
- Fajl: `src/Autodarts_CORE_v1075.user.js`
- Alap: `src/Autodarts_CORE_v1074.user.js`.
- Bejovo elo visszajelzes:
  - A szamos nezet mar nem tolta balra az oldalt.
  - A ketoldalas jatekoskartyak koze eso kozepso nezet meg belelogott a kartyakba.
  - A szamos nezet Undo/Next gombjai tul hosszuak lettek.
  - A CORE javito `MEGSE` gombja bezarta az ablakot, de a dobaskartya kijelolt hattere megmaradt.
- Szamos nezet celzott javitasa:
  - A bizonyitott Double/Triple/Miss/S1-S20 racs alapjan aktiv csak a javitas.
  - A 606 px-es szamracs merete valtozatlan maradt.
  - A ket 1410 px-es kulso burkolo aktualis szelessege a ket lathato jatekoskartya kozotti savhoz igazodik.
  - A burkolok a kozos szulojukon belul a szabad kozepso sav kozepehez igazodnak.
  - Az Undo/Next sor visszakerult a szamracs sajat dokumentumfolyamaba.
  - A ket gomb `92..160 px` kozotti kompakt, nem nyulo meretet kap.
  - A v1005/v95 altalanos akciosor-pozicionalas a megjelolt szamos nezetet nem irja felul.
  - Normal vagy kamera nezetre visszavaltaskor minden v1075 ideiglenes inline stilus visszaall.
- `MEGSE` utani kartya-feloldas:
  - A normal dobaskartya-hatter nagyobb CSS-specificitassal felulirja a nativ hover/selected kartyaosztalyt.
  - A hatter mellett a normal keret, belso arnyek es outline allapot is visszaall.
  - A kijelolestorles 900 es 1300 ms-nal is megismetlodik.
  - Ha a kesleltetett elo gyari Cancel kattintas fut le, utana kulon ujra megtortenik a CORE kijelolestorles.
- Szandekosan nem erintett:
  - a szamracs cellai es ertekei;
  - normal es kamera tabla nezet geometriaja;
  - elfogadott turn-card es jatekoskartya geometria;
  - Tools zoom, fontok, konfetti, tabla/falvedo/glow es history.
- Terhelesi ellenorzes v1074-hez kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - `setTimeout`: 54 / 54.
  - Nincs uj folyamatos figyelociklus.
- Szintaktikai ellenorzes:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.39-v1075-numeric-view-and-cancel-release`.
  - `node --check src\Autodarts_CORE_v1075.user.js` sikeres.
- Elo teszt szukseges:
  - szamos nezet 1920 es 2560 px szeles ablakban;
  - Undo/Next gombmeret es helyzet;
  - visszavaltas normal es kamera nezetre;
  - kompakt es kor UI `MEGSE` utani azonnali es 1.5 masodperces kartyahatter.

### v1076 - Szamos nezet fuggoleges tavolsag es valodi nativ Cancel

- Datum: 2026-07-02
- Fajl: `src/Autodarts_CORE_v1076.user.js`
- Alap: `src/Autodarts_CORE_v1075.user.js`.
- Bejovo elo visszajelzes:
  - A dobaskartya hover/kijelolt hattere `MEGSE` utan mar megszunt.
  - A nativ korrekcios allapot viszont aktiv maradt, ezert a Bouncer/Cancel/OK sor tovabbra is megjelent.
  - A szamos nezet vizszintesen mar kozepen volt, de a racs belelogott a felso dobaskartyakba/Tools zoom kartyakba.
  - Az Undo/Next a szamracsra csuszott.
- Szamos nezet javitasa:
  - A racs felso helyzete a lathato turn-card es Tools zoom feluletek also szelebol merodik.
  - A teljes szamos nezet legalabb 12 px tavolsagra kerul az utolso felso kartyatol.
  - Az Undo/Next sort a Tools zoom altalanos pozicionaloja ebben a nezetben mar nem irhatja felul.
  - Az Undo/Next kulon, fix es kompakt sor lett a szamracs jobb oldalan.
  - Ha ott nincs eleg hely, a gombsor a racs fole kerul, es a racs ehhez automatikusan lejjebb mozdul.
  - A nezet elhagyasakor a fuggoleges eltolast es minden ideiglenes stilust visszaallitja.
- `MEGSE` funkcio javitasa:
  - Elsokent a javito megnyitasakor mar bizonyitottan megtalalt es eltett nativ Cancel gombot hasznalja.
  - Egy elo Cancel kattintasahoz mar nem kovetel meg egyidejuleg ujra megtalalhato OK gombot.
  - Ha a mentett Cancel mar nem el, csak kozos nativ akciosorban talalt Cancel+OK par fogadhato el.
  - A bezaras utan 100, 280, 650 es 1000 ms-nal ellenorzo Cancel-probak futnak, ha a nativ korrekcios sor meg el.
  - A nativ Cancel utan a CORE kartya-feloldas is ujra lefut.
- Szandekosan nem erintett:
  - normal es kamera tabla nezet;
  - turn-card es jatekoskartya meret;
  - fontok, konfetti, tabla/falvedo/glow es history.
- Terhelesi ellenorzes v1075-hoz kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - `setTimeout`: 54 / 54.
  - Nincs uj folyamatos figyelociklus.
- Szintaktikai ellenorzes:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.40-v1076-numeric-clearance-native-cancel`.
  - `node --check src\Autodarts_CORE_v1076.user.js` sikeres.
- Elo teszt szukseges:
  - szamos nezet Tools zoommal es nelkule;
  - Undo/Next helye a racs mellett;
  - kompakt es kor UI `MEGSE`, majd a Bouncer/Cancel/OK sor eltunese.

### v1077 - Visszaallas es passziv nezet/Cancel diagnosztika

- Datum: 2026-07-03
- Fajl: `src/Autodarts_CORE_v1077.user.js`
- Alap: `src/Autodarts_CORE_v1075.user.js`.
- Visszaallasi dontes:
  - A v1076 elo tesztben nem javitotta meg a szamos nezetet.
  - A folyamatos fuggoleges meres-visszairas lathato kepremegest okozott.
  - A v1076 ezert elutasitott tesztverzio; a v1077 nem tartalmazza ezt a dinamikus eltolast.
  - A v1077 a korabbi, nem remego v1075 kodjara epul.
- Bejovo elo visszajelzes:
  - A szamos nezet tovabbra sem megfelelo.
  - A `MEGSE` utan a kartyahover megszunik, de a nativ javitasi funkcio aktiv marad.
  - A Bouncer/Cancel/OK gombok tovabbra is megmaradnak.
- Passziv diagnosztika:
  - A `Jateknezet` menube ideiglenesen bekerult a `Teljes hibadiagnosztika masolasa` gomb.
  - Egy kattintas 12 geometriai mintat gyujt 80 ms-os tavolsaggal.
  - A mintak tartalmazzak:
    - root, szamracs, panel, belso es kulso burkolok;
    - Undo, Next es kozos akciosor;
    - Tools zoom kartyak;
    - pozicio, meret, transform, translate, display, flex/grid es z-index adatok.
  - A gyujtes tartalmazza az osszes Bouncer/Cancel/OK/Undo/Next jellegu gombot es legfeljebb het szuloi szintjuket.
  - A nativ akciogombokra erkezo click esemenyek utolso 40 bejegyzese is bekerul, `isTrusted` es `defaultPrevented` adatokkal.
  - A `MEGSE` folyamat kulon elmenti az akciogombok allapotat bezaras elott es 700 ms utan.
  - A korabbi `window.__AD_CORE_V1074_CANCEL__` Cancel-trace is bekerul a masolt JSON-ba.
- Szandekosan nem valtozott:
  - nincs uj nezetgeometria vagy gombpozicionalas;
  - nincs uj Cancel-viselkedes vagy DOM-beavatkozas;
  - normal/kamera nezet, kartyak, fontok, konfetti, tabla/falvedo/glow es history.
- Terhelesi ellenorzes v1075-hoz kepest:
  - `MutationObserver`: 11 / 11.
  - `setInterval`: 8 / 8.
  - `setTimeout`: 55 / 54; az egyetlen uj elofordulas csak a kezzel inditott 960 ms-os mintavetelhez tartozik.
  - Nincs uj folyamatos figyelociklus.
- Szintaktikai ellenorzes:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.41-v1077-passive-view-cancel-diagnostics`.
  - `node --check src\Autodarts_CORE_v1077.user.js` sikeres.
- Kovetkezo elo lepes:
  - valassza ki a szamos nezetet;
  - reprodukalja a `MEGSE` utan megmarado Bouncer/Cancel/OK sort;
  - CORE panel -> `Jateknezet` -> `Teljes hibadiagnosztika masolasa`;
  - a teljes masolt szoveg visszakuldese.

### v1078 - Stabil szamos akciosor es kenyszeritett nativ Cancel

- Datum: 2026-07-03
- Fajl: `src/Autodarts_CORE_v1078.user.js`
- Alap: `src/Autodarts_CORE_v1077.user.js`.
- Beerkezett bizonyitek:
  - Ket teljes v1077 diagnosztika erkezett: egy a szamos nezetrol es egy a hibas `MEGSE` folyamatrol.
- Szamos nezet bizonyitott oka:
  - Ugyanaz a `css-1vu6p25` racs 606 es 1410 px szelesseg kozott valtakozott.
  - 606 px-es allapotban a racs helyesen kozepen volt: `left=977`, `width=606`.
  - A v1075 kezelo a panel/inner/shell elemeket 1410 px-re nyitotta, ettol a racs is 1410 px-re nott.
  - A 1410 px-es racs mar nem felelt meg a sajat 300..900 px felismeresi feltetelenek, ezert a kovetkezo kor visszaallitotta 606 px-re.
  - Ez az alkalmazas-visszaallitas ciklus okozta a lathato kepremegest.
  - Az Undo/Next sor bizonyitott DOM-ja: `chakra-stack css-1mov9g1`.
  - A hibas allapotban a sor `position:fixed`, `height:1278px`, a ket gomb pedig `71x1278px` volt.
  - A masik allapotban a sor 160 px magasra kerult, a gombok `92x160px` meretuek lettek.
- Szamos nezet javitasa:
  - A v1075 teljes racs/panel/shell meretezo fuggvenye tobbe nincs meghivva.
  - A nativ 606 px-es racs, panel es burkolok stilusa erintetlen marad.
  - A szamos nezetet a 24 kozvetlen Double/Triple/Miss/S1-S20 cella alapjan ismeri fel.
  - Kizarolag a bizonyitott Undo/Next sor kap stabil stilust:
    - `height/min-height/max-height: 48px`;
    - kompakt `92..160px` gombszelesseg;
    - 8 px gap;
    - fix pozicio a Tools zoom kartyak jobb szele alatt 12 px tavolsaggal.
  - Tools zoom nelkul ugyanaz a pozicio a negy turn-card also es jobb szelebol szamolodik.
  - A v1005, v95 es v1065 altalanos akciosor-pozicionalok a szamos akciosort nem irhatjak felul.
- `MEGSE` bizonyitott oka:
  - A valodi nativ gombok eltek es pontosan azonosithatok voltak:
    - Bouncer `121x48`;
    - Cancel `132x48`;
    - Ok `98x48`;
    - kozos sor: `chakra-stack css-1wegtvo`.
  - A Cancel minden probanal `connected=true`, de `disabled=true` volt.
  - Emiatt a v1077 mind a negy probat ervenytelennek minositette (`nativeCancel=custom-only`).
  - Egyetlen Cancel click esemeny sem keletkezett, ezert a nativ javitasi allapot nem zarult le.
- `MEGSE` javitasa:
  - A megtalalt Cancel csatlakozasa es kozos Cancel+OK allapota tovabbra is ellenorzott.
  - A kattintas idejere a valodi `HTMLButtonElement.disabled` allapot ideiglenesen feloldodik.
  - Ezutan a kod a nativ React Cancel gomb `click()` muveletet hivja.
  - Az eredeti disabled allapotot a kovetkezo taskban visszaadja, ha az elem meg el.
  - Ha a nativ sor nem tunt el, 120, 360 es 800 ms-nal ujabb ellenorzott probak futnak.
  - A CORE kartyakijeloles torlese a nativ Cancel utan is megmarad.
- Diagnosztikai UI:
  - A v1077 ideiglenes `Teljes hibadiagnosztika masolasa` gomb kikerult a `Jateknezet` menubol.
- Szandekosan nem erintett:
  - a szamracs merete es cellai;
  - normal es kamera tabla nezet;
  - turn-card es jatekoskartya geometria;
  - fontok, konfetti, tabla/falvedo/glow es history.
- Terhelesi ellenorzes:
  - `MutationObserver`: 11.
  - `setInterval`: 8.
  - Nincs uj folyamatos figyelociklus.
- Szintaktikai ellenorzes:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.42-v1078-stable-numeric-actions-forced-cancel`.
  - `node --check src\Autodarts_CORE_v1078.user.js` sikeres.
- Elo teszt szukseges:
  - szamos nezet stabil 606 px-es racsa legalabb 10 masodpercig;
  - Undo/Next `48px` magas helyzete Tools zoommal es nelkule;
  - kompakt es kor UI `MEGSE`, majd a Bouncer/Cancel/OK sor eltunese.

### v1079 - Szamos nezet felso tavolsag es React Cancel handler

- Datum: 2026-07-03
- Fajl: `src/Autodarts_CORE_v1079.user.js`
- Alap: `src/Autodarts_CORE_v1078.user.js`.
- Bejovo elo visszajelzes:
  - A szamos nezet remegese megszunt.
  - Az Undo/Next merete es helye megfelelo lett.
  - A kozepso szamos resz teteje meg belelogott a Tools zoom/dobaskartyakba.
  - A `MEGSE` DOM-szintu ideiglenes engedelyezese utan a nativ javitasi allapot tovabbra sem zarult le.
- Szamos nezet celzott javitasa:
  - A nativ 606 px-es racs szelessege es cellageometriaja tovabbra is erintetlen.
  - A shell csak `margin-top` erteket kap; nincs transform, translate vagy szelessegiras.
  - A margot a lathato zoom/turn kartya also szele es a shell eredeti teteje kozotti kulonbseg adja, plusz 12 px tavolsag.
  - Az elo peldaban ez a korabbi meres alapjan kb. 54..63 px.
  - Az elozo margot a kod levonja a kovetkezo meresbol, ezert nincs felhalmozodas.
  - A nezet elhagyasakor az eredeti margin es a belso offset marker visszaall.
  - Az Undo/Next bizonyitott v1078 pozicioja nem valtozott.
- `MEGSE` tovabbi bizonyitott oka:
  - A natív Cancel DOM `disabled` attributumanak torlese nem eleg, mert a React sajat props/fiber allapotaban a gomb tovabbra is disabled.
  - Emiatt a React esemenyrendszer a DOM `click()` esemenyt a sajat disabled props alapjan is elnyomhatja.
- React Cancel javitas:
  - A kod a valodi Cancel DOM elemen keresi a React `__reactProps$...` vagy `__reactFiber$...` kapcsolatot.
  - Ha talal sajat `onClick` kezelot, azt kozvetlenul hivja meg egy minimalis click-esemeny objektummal.
  - Ez ugyanazt a nativ Autodarts Cancel handlert futtatja, DOM elem mozgatasa, klonozasa vagy torlese nelkul.
  - Ha nincs elerheto React handler vagy hibaval ter vissza, megmarad a v1078 ideiglenesen engedelyezett DOM-click fallback.
  - A Cancel trace rogzitett `invocation` erteke megmutatja: `react-props`, `react-fiber` vagy `dom-click`.
  - A 120/360/800 ms-os ellenorzo probak megmaradtak.
- Szandekosan nem erintett:
  - szamracs szelesseg es cellak;
  - Undo/Next elfogadott v1078 geometriaja;
  - normal es kamera tabla nezet;
  - turn-card/jatekoskartya, fontok, konfetti, tabla/falvedo/glow es history.
- Terhelesi ellenorzes:
  - `MutationObserver`: 11.
  - `setInterval`: 8.
  - Nincs uj folyamatos figyelociklus.
- Szintaktikai ellenorzes:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.43-v1079-numeric-clearance-react-cancel`.
  - `node --check src\Autodarts_CORE_v1079.user.js` sikeres.
- Elo teszt szukseges:
  - szamos racs felso 12 px tavolsaga es stabilitasa;
  - Undo/Next valtozatlan helye;
  - kompakt es kor UI `MEGSE`, majd a Bouncer/Cancel/OK sor eltunese.

### v1080 - Undo marker takaritas, szamos ujraigazitas es player allapotszinek

- Datum: 2026-07-04
- Fajl: `src/Autodarts_CORE_v1080.user.js`
- Alap: `src/Autodarts_CORE_v1079.user.js`.
- Bejovo elo visszajelzes:
  - A `MEGSE` vegre bezarja a nativ javitasi allapotot.
  - Normal dobast koveto Undo eltavolitja a kek markert.
  - `MEGSE` utan vegrehajtott Undo eseten a fallback marker viszont megmaradt.
  - A szamos nezet alaphelyzete jo, de Double/Triple valasztas utan a React ujrarendereles visszaallitotta a hibas felso helyet es megnyujtotta az Undo/Next sort.
  - A korabbi zold nyertes es piros BUST jatekoskartya-allapot eltunt.
- Undo utani marker:
  - Az Undo bekerult a Cancel utan kenyszeritett marker fallbacket lezaró akciok koze.
  - Az Undo a `ad-core-correction-released` kartyaosztalyt es kapcsolodo ideiglenes adatokat is eltavolitja.
  - A nativ Undo mukodeshez es a sajat history tartalomlogikajahoz nem nyul.
- Szamos nezet:
  - A szamracs barmely valasztasa utan a kod torli a rövid eletu grid-cache-t.
  - Az igazitas azonnal, majd 60, 180 es 420 ms-nal vegesen ujrafut, hogy a Double/Triple React-csere utan az uj shell es akciosor is megkapja a v1078/v1079 geometriat.
  - Nincs uj `MutationObserver`, `setInterval` vagy folyamatos meres-visszairas.
  - A nativ racs merete es cellageometriaja tovabbra sem valtozik.
- Jatekoskartya-allapot:
  - A nyertes allapot a korabban diagnosztikaval igazolt `winnerAnimation` es `.ad-ext-player-winner` jeloleseket hasznalja.
  - A BUST allapotot natív bust-osztaly vagy a lathato BUST osszkartya es a natív aktivjatekososztaly egyutt azonositja.
  - A nyertes kartya atlatszo zold, a tuldoott kartya atlatszo piros reteget kap.
  - A sajat allapotosztalyok nem vesznek reszt a kovetkezo felismeresben, ezert az allapotszin nem tud beragadni.
- README:
  - A régi, v1025-os belso Codex-leiras helyett GitHubra szant magyar felhasznaloi `README.md` keszult.
  - Tartalmazza a funkciokat, telepitest, hasznalatot, gyorsbillentyuket, hibaelharitast es a projekt korlatait.
- Szandekosan nem erintett:
  - turn-card es jatekoskartya geometria;
  - tabla/falvedo meretezes es glow;
  - fontmetrikak, konfetti es zene;
  - history es Undo tartalomkezelese.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.44-v1080-marker-numeric-player-states`.
  - `node --check src\Autodarts_CORE_v1080.user.js` sikeres.
- Elo teszt szukseges:
  - dobas -> javito -> `MEGSE` -> Undo utan a kek marker eltunik-e;
  - Double es Triple utan a szamos panel es az Undo/Next helye valtozatlan marad-e;
  - gyozelemnel zold, BUST-nal piros jatekoskartya megjelenik, majd az allapot utan eltunik-e.

### v1081 - Szorzoallapotot koveto szamos racs es valodi player allapotfelulet

- Datum: 2026-07-04
- Fajl: `src/Autodarts_CORE_v1081.user.js`
- Alap: `src/Autodarts_CORE_v1080.user.js`.
- Bejovo elo visszajelzes:
  - A `MEGSE` utani Undo mar helyesen eltavolitja a kek markert.
  - A markerlogika ezzel elo tesztben elfogadott; a v1081 nem modositja.
  - Double vagy Triple utan a szamos panel tovabbra is a kartyak moge ugrott, az Undo/Next pedig megnyult.
  - A zold nyertes es piros BUST jatekoskartya nem jelent meg.
- Szamos nezet bizonyitott forrasoka:
  - A v1078/v1080 rácsfelismero csak `S1..S20` cellakat fogadott el.
  - Double/Triple valasztas utan a cellak `D` vagy `T` prefixet kaphatnak, ezert a rács es az akciosor kikerult a vedett numeric geometria alol.
- Szamos nezet javitasa:
  - A felismero most `S`, `D` es `T` prefixu szegmensekbol egyarant elfogad legalabb 18 kulonbozo szamot.
  - Az `1` es `20`, valamint Double, Triple es Miss tovabbra is kotelezo azonosito.
  - Ezert a v1079 felso tavolsag es a v1078 fix Undo/Next meret szorzovalasztas utan is aktiv marad.
- Player allapotszin bizonyitott forrasoka:
  - A v1080 a zold/piros szint a player `::before` retegere tette.
  - A kesobbi v96 stilus az aktiv jatekos ugyanezen `::before` reteget `content:none` es `display:none` szaballyal kikapcsolja.
- Player allapotszin javitasa:
  - A sikertelen pseudo-reteges szin kikerult.
  - A zold/piros tint a tenyleges kulso jatekoskartya-feluletre kerul a legutolso v67 skin-stilusban.
  - A belso player/content feluletek allapot alatt atlatszok, igy nem takarjak el a kulso allapotszint.
- README:
  - Az aktualis userscript- es ellenorzesi hivatkozasok v1081-re frissultek.
- Terhelesi korlat:
  - Nincs uj `MutationObserver`.
  - Nincs uj `setInterval`.
  - Nincs React DOM mozgatas, klonozas vagy torles.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.45-v1081-multiplier-grid-player-state-surfaces`.
- Elo teszt szukseges:
  - Double es Triple utan a szamos panel felso helye;
  - Undo/Next merete es helye szorzovalasztas utan;
  - zold nyertes es piros BUST jatekoskartya, majd az allapotszin megszunese.

### v1082 - BUST felismeres es stabil dobaskartyasav allapotanimacio alatt

- Datum: 2026-07-04
- Fajl: `src/Autodarts_CORE_v1082.user.js`
- Alap: `src/Autodarts_CORE_v1081.user.js`.
- Bejovo elo visszajelzes:
  - A szamos nezet, a marker es a tobbi v1081 funkcio mukodik.
  - A zold gyoztes allapot megjelenik.
  - A piros BUST allapot nem jelenik meg.
  - Gyozelemnel es BUST-nal a jatekoskartya helyesen remeg, de vele egyutt a dobaskartyasav is elmozdul.
- BUST felismeres:
  - A korabbi regex csak kulon szo alaku `bust`/`busted` osztalynevet fogadott el.
  - A natív camelCase `bustAnimation` kisbetus alakja `bustanimation`, amely nem teljesitette a régi szohatart.
  - A felismero most ezt az animacios osztalynevet is elfogadja, igy ugyanaz a panel megkapja a piros allapotosztalyt.
- Dobaskartyasav stabilizalasa:
  - A v1046 kozepre igazitas normal esetben a ket player kartya pillanatnyi belso szelét meri.
  - Allapotanimacional a remego player kartya rectje valtozik, ezert a v1046 a dobaskartyasavot is utana mozgatta.
  - Nyertes vagy BUST player-allapot alatt a v1046 meres most valtoztatas nelkul visszater, es megtartja az utolso stabil turn-shift erteket.
  - A player kartya sajat nativ remegese erintetlen marad.
  - Az allapot megszunesekor a szokasos observer/schedule ujra elvegzi a normal kozepre igazítast.
- Szandekosan nem erintett:
  - v1080 marker- es Undo-takaritas;
  - v1081 S/D/T szamosracsfelismeres;
  - tabla, falvedo, glow, fontok, history, konfetti es zene.
- Terhelesi korlat:
  - Nincs uj `MutationObserver`.
  - Nincs uj `setInterval`.
  - Nincs React DOM mozgatas, klonozas vagy torles.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.46-v1082-bust-state-turn-lane-freeze`.
- Elo teszt szukseges:
  - BUST eseten piros lesz-e a megfelelo jatekoskartya;
  - nyertes es BUST remeges alatt a dobaskartyak teljesen helyben maradnak-e;
  - az allapot megszunese utan a normal kozepre igazitas valtozatlanul mukodik-e.

### v1083 - Eredeti nezet kartyapolirozas es allithato allapotszinek

- Datum: 2026-07-04
- Fajl: `src/Autodarts_CORE_v1083.user.js`
- Alap: `src/Autodarts_CORE_v1082.user.js`.
- Bejovo elo visszajelzes:
  - A piros es zold jatekoskartya-allapot, valamint a remeges mar helyesen mukodik.
  - Az eredeti Autodarts-nezetben a Tools for Autodarts zoomkartyai tul nagyok.
  - Az eredeti nezet dobaskartyain 0%-os hatternel halvany keret marad, dobas utan pedig a sarok jobban lekerekedik.
- Eredeti nezet dobaskartyai:
  - Az eredeti nezetben minden normal es javitasbol visszaadott dobaskartya kerete, outline-ja es belso arnyeka megszunik.
  - A sarok minden dobasi allapotban a ketoldalas nezettel azonos 8 px marad.
  - A ketoldalas CORE-nezet geometriaja es stilusszabalyai nem valtoztak.
- Tools for Autodarts Darts Zoom:
  - Az eredeti nezetben a felismero elfogadja a kiegészito magasabb kulso kartyaburkolójat is.
  - A felismert burkolo a hozzatarto dobaskartya meretet kapja, tartalma nem loghat ki belole.
  - A modositas csak az eredeti nezetre vonatkozik.
- Jatekoskartya allapotszinek:
  - A `Jatekoskartyak / Skin` menube kulon szinvalaszto es atlatszosag-csuszka kerult a gyoztes es a BUST allapothoz.
  - A korabbi zold/piros szinek es atlatszosagok maradtak az alapertelmezett ertekek.
  - A beallitasok presetenkent mentodnek, es a Skin reset visszaallitja oket.
- Paneltisztitas:
  - Kikerult az Egyedi tabla régi Board markerre utalo technikai leirasa.
  - Kikerult az Osszertek Total-overlay technikai leirasa.
  - Kikerult a jatekoskartya elrendezes mintaalapu atlagfelismeresre utalo leirasa.
- Szandekosan nem erintett:
  - piros/zold allapotfelismeres es jatekoskartya-remeges;
  - dobaskartyasav kozepre igazitasa;
  - szamos nezet, Undo/Next, markerek, tabla, falvedo, glow, fontok, history, konfetti es zene.
- Terhelesi korlat:
  - Nincs uj `MutationObserver`.
  - Nincs uj `setInterval`.
  - Nincs React DOM mozgatas, klonozas vagy torles.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.47-v1083-native-cards-state-colors`.
  - `node --check src/Autodarts_CORE_v1083.user.js`: sikeres.
- Elo teszt szukseges:
  - eredeti nezetben a dobaskartyak keret- es sarokallapota uresen, dobas utan es javitas utan;
  - Tools for Autodarts Darts Zoom merete az eredeti nezetben;
  - gyoztes es BUST szin-, illetve atlatszosag-csuszkak.

### v1084 - Reszponziv ket nezet es dobasjavitas az eredeti elrendezesben

- Datum: 2026-07-05
- Fajl: `src/Autodarts_CORE_v1084.user.js`
- Alap: `src/Autodarts_CORE_v1083.user.js`.
- Stabil alap visszajelzes:
  - A v1083 eredeti-nezetes dobaskartya-stilusa mukodik.
  - A zoommeret, a gyoztes/BUST szin- es atlatszosag-beallitasok mukodnek.
  - A harom kert technikai szoveg nem jelenik meg.
  - A v1083 ettol a ponttol elfogadott visszaallasi alap.
- Eredeti nezet dobasjavitasa:
  - A sajat kor es kompakt javito megnyitasat egy ketoldalas elrendezeshez tarto kozepre-igazito feltetel blokkolta.
  - A kattintaskezelo mar nem fugg a ketoldalas geometriatol; tovabbra is csak valodi, nem ures dobaskartyarol es bekapcsolt javitomodnal nyit.
  - A nativ javitasi muvelet, valamint az Alkalmaz/Megse lezaras valtozatlan maradt.
- Ketoldalas CORE nezet:
  - Normal viewporton a v1083 elfogadott kartyameretek maradnak.
  - Low-height es ultralow viewporton a dobaskartya magassaga kisebb, viewportbol szamolt tartomanyt kap.
  - A dobas- es osszkartyak kompakt minimumszelessege lejjebb kerult, hogy a teljes negykartyas sor beferjen.
  - A Darts Zoom tovabbra is a forras dobaskartya meretet kapja, es resize/fullscreen esemenynel azonnal ujraigazodik.
- Eredeti Autodarts-nezet:
  - Ket jatekosnal a player kartyak szelessege, oldaltavolsaga, felso es also helye folytonosan igazodik a viewporthoz.
  - A pontszam-, nev- es atlagsor a kartya sajat kontenerszelessegehez igazodik; nagy felbontason megtartja a korabbi maximumot.
  - A kompakt dobaskartya-magassagok ujra ervenyesulnek a korabbi fix 110 px helyett.
  - A nativ turn-sor kartyai kis felbontason zsugorodhatnak, mikozben a nagy felbontasu 110 px-es alap megmarad.
  - A valtozas ket jatekosra celzott; az 1, illetve 3-6 jatekos geometriaja nincs felulirva.
- Szandekosan nem erintett:
  - v1083 keretmentes dobaskartyak es zoom-burkolo felismeres;
  - piros/zold allapotszinek, remeges es beallitasok;
  - tabla, falvedo, glow, markerek, szamos nezet, history, konfetti es zene.
- Terhelesi korlat:
  - Nincs uj `MutationObserver`.
  - Nincs uj `setInterval`.
  - Ket passziv resize/fullscreen esemeny csak a mar letezo, `requestAnimationFrame`-mel osszevont zoomigazitast keri.
  - Nincs React DOM mozgatas, klonozas vagy torles.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.48-v1084-responsive-views-native-correction`.
  - `node --check src/Autodarts_CORE_v1084.user.js`: sikeres.
- Elo teszt szukseges:
  - kor es kompakt javito megnyitasa, Alkalmaz es Megse eredeti Autodarts-nezetben;
  - ketoldalas nezet dobas- es zoomkartyai normal, low-height es ultralow meretben;
  - eredeti nezet player-, dobas- es zoomkartyai ugyanebben a harom merettartomanyban.

### v1085 - Eredeti nezet reszponziv osztalyjavitas

- Datum: 2026-07-05
- Fajl: `src/Autodarts_CORE_v1085.user.js`
- Alap: `src/Autodarts_CORE_v1084.user.js`.
- Elo visszajelzes:
  - A v1084 ketoldalas nezete megfeleloen skalozodik.
  - Az eredeti nezetben a tablan kivuli elemek tovabbra sem skalozodtak.
- Bizonyitott ok:
  - A v1084 eredeti-nezetes player-geometriaja az `ad-core-v67-two-player` gyokerosztalyt varta.
  - Ezt az osztalyt a script csak bekapcsolt ketoldalas elrendezesnel adja hozza.
  - Az eredeti ketjatekos nezet valodi, elrendezestol fuggetlen jelolese az `ad-core-two-player`.
- Javitas:
  - A harom eredeti-nezetes player-geometria szelektor az `ad-core-two-player` osztalyt hasznalja.
  - Igy aktivva valik a folytonos kartya-szelesseg, oldalpozicio, felso/also tavolsag es a konteneralapu belso meretezes.
  - A v1084 dobas-, zoom- es javitofelulet-modositasai valtozatlanok.
- Szandekosan nem erintett:
  - a mar megfelelo ketoldalas geometria;
  - tabla, falvedo, glow, allapotszinek, markerek, szamos nezet, history, konfetti es zene.
- Terhelesi korlat:
  - Nincs uj observer, idozito vagy esemenykezelo.
  - Nincs React DOM mozgatas, klonozas vagy torles.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`: `2.6.49-v1085-native-responsive-class-fix`.
  - `node --check src/Autodarts_CORE_v1085.user.js`: sikeres.
- Elo teszt szukseges:
  - eredeti ketjatekos nezet player-, dobas- es zoomkartyainak skalozasa ablakmeretezes kozben;
  - a v1084 eredeti-nezetes kor es kompakt dobasjavitasa.

### Tovabbi egyszerusitesi velemeny - meg nem implementalt

- A Diagnosztika lathato UI-jat indokolt volt kivenni, a belso kodot viszont erdemes megtartani.
- Kovetkezo jeloltek a lathato feluletrol valo eltavolitasra vagy halado reszbe rejtesre:
  - `Aktiv frissites (ms)`: fejlesztoi jellegu, a mukodo 150 ms alapertelmezes eleg lehet.
  - `Auto kikapcsolas, ha frissites utan elcsuszik`: technikai vedohalo, normal felhasznalonak nem kell allitania.
  - Kezi font-family szovegmezok: a feltoltott betufajl nevebol automatikusan kepzett ertek altalaban eleg; a feltoltes/torles gombok maradjanak.
- Nem javasolt kivenni:
  - presetek, Safe Mode, resetek;
  - tabla/falvedo kalibracios csuszkak;
  - dobaskartya-szinek es meretek;
  - Kompakt mod, Ora, Tripla es Gyozelmi hang, mert most mar nem novelik a fo menupontok szamat.

## Assetek es segedscript-ek

### Saját generalt PNG asset csomag

- Mappa: `assets/custom_board/`
- Letrehozott fajlok:
  - `board_classic_clean_2400.png`
  - `board_blade_dark_2400.png`
  - `board_warm_sisal_2400.png`
  - `surround_matte_black_3000.png`
  - `surround_carbon_red_3000.png`
  - `surround_light_faceted_3000.png`
  - `surround_neon_blue_3000.png`
  - `preview_contact_sheet.png`
  - `README.md`
- Generator:
  - `scripts/generate_custom_board_assets.py`
- Cel:
  - Saját, jogilag tiszta, nem markazos/logos PNG csomag.
- Felhasznaloi visszajelzes:
  - A felhasznalo inkabb termekmintas/logos kepeket szeretne.

### Termekkep forraslista

- Fajl: `assets/product_refs/product_image_sources.md`
- Tartalom:
  - Winmau Blade 6/Triple Core forrasok.
  - Mission Samurai Infinity forrasok.
  - Unicorn Eclipse Ultra forrasok.
  - Winmau/Target falvedo forrasok.
- Fontos:
  - Ezek gyartoi/webshopos, logos termekkepek.
  - Nem sajat assetek, nem kezelendoek szabadon terjesztheto projektcsomagkent.

### JPG/WebP -> PNG konvertalo

- Fajl: `scripts/prepare_product_png.py`
- Cel:
  - Letoltott termekkepbol PNG keszitese.
  - `--mode board`: tabla kephez kor alaku vagassal.
  - `--mode surround`: falvedo kephez atlatszo kozep kivagassal.
  - `--white-bg` es `--bg-threshold`: feher/kozel feher hatter eltavolitasahoz.
- Ellenőrzés:
  - `python -m py_compile scripts/prepare_product_png.py` sikeres.
- Felhasznaloi nehezseg:
  - CMD es PowerShell parancsformak keveredtek.
  - CMD-ben nincs `& '...'` forma.
  - Ha `assets/product_refs` mappabol futtatja, a script utvonala:
    - `..\..\scripts\prepare_product_png.py`
- Aktuális allapot:
  - A felhasznalo kerte, hogy ezt a konvertalos temat most hagyjuk.

## Visszaallasi pontok

- Stabil eredeti alap: `src/Autodarts_CORE_v1025.user.js`
- Elso mukodo modositas: `src/Autodarts_CORE_v1027.user.js`
- Custom board kep kalibracio: `src/Autodarts_CORE_v1030.user.js`
- Natív szam elrejtes: `src/Autodarts_CORE_v1031.user.js`
- Elfogadott dobaspont/glow mukodes: `src/Autodarts_CORE_v1035.user.js`
- Aktualis elo teszttel reszben elfogadott alap: `src/Autodarts_CORE_v1066.user.js`
- Elfogadott stabil alap: `src/Autodarts_CORE_v1083.user.js`
- Legfrissebb tesztelendo verzio: `src/Autodarts_CORE_v1096.user.js`
- Biztonsagos helyreallito verzio: `src/Autodarts_CORE_v1060.user.js`

Kerulendo visszaallasi pontok:

- `src/Autodarts_CORE_v1026.user.js` - nem jelent meg az oldalon.
- `src/Autodarts_CORE_v1032.user.js` - nagy szurke kor maradt, kepet takarta.
- `src/Autodarts_CORE_v1033.user.js` - dobaspontok nem latszottak.
- `src/Autodarts_CORE_v1058.user.js` - Firefoxban player class-observer frissitesi ciklust okozhat.
- `src/Autodarts_CORE_v1059.user.js` - elo tesztben tovabbra sem toltotte be az oldalt.
- `src/Autodarts_CORE_v1061.user.js` - a negy kozvetlen javitassal egyutt elo tesztben nem toltotte be az oldalt.
- `src/Autodarts_CORE_v1076.user.js` - a szamos nezetet nem javitotta, es a folyamatos meres-visszairas kepremegest okozott.

### v1092 - Tools GIF overlay es WQHD hatterkep

- Datum: 2026-07-05
- Fajl: `src/Autodarts_CORE_v1092.user.js`
- Alap: a felhasznalo altal csatolt teljes
  `2.6.55-v1091-tools-gif-homepage-fix` userscript.
- Bizonyitott GIF-ok:
  - A v1091 csak a `#ad-ext-player-display` alatt keresett animalt mediat.
  - A Tools for Autodarts az aktiv animaciot ettol fuggetlen overlayben,
    `#gif-animation` azonositoju kepkent hozza letre.
- Javitas:
  - A kompatibilitasi reteg kozvetlenul a `#gif-animation` elemet es annak
    sajat overlayet emeli a CORE retegek fole.
  - Csak az overlay tenylegesen vagasban levo felmenoinek `overflow`
    korlatozasat oldja fel, es az attributumokat az animacio eltunesekor torli.
  - A teljes dokumentum attributumvaltozasainak figyelese megszunt; csak DOM
    elem hozzaadasa vagy eltavolitasa indit ellenorzest.
- Hatterkep:
  - Legfeljebb 2560 px hosszu elu, tarhelykorlatba fero kepnel az eredeti
    adat marad meg ujramintavetelezes es ujratomorites nelkul.
  - Nagyobb kepnel megmaradt a v1089 kulon, jo minosegu 2560 px-es tomoritese.
- Szandekosan erintetlen:
  - tabla- es falvedokep tomoritese;
  - kartya-, javito-, Undo/Next- es jatekosgeometria;
  - a csatolt v1091 tobbi funkcionalitasa.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.56-v1092-exact-tools-gif-wqhd-background`.
  - `node --check src/Autodarts_CORE_v1092.user.js`: sikeres.
- Elo teszt szukseges:
  - Tools for Autodarts GIF megjelenes teljes oldalas es tabla koruli modban;
  - WQHD hatter eles megjelenese 2560x1440 felbontason.

### v1093 - Adaptiv WQHD tarhelykezeles

- Datum: 2026-07-05
- Fajl: `src/Autodarts_CORE_v1093.user.js`
- Alap: `src/Autodarts_CORE_v1092.user.js`.
- Felhasznaloi visszajelzes:
  - A WQHD hatter feltoltesekor a bongeszo helyi tarhelyhibat jelzett.
- Bizonyitott ok:
  - A v1092 WQHD tomoritoje 3 500 000 karakterig engedte a kepet.
  - Az utana futtatott kozos `sanitizeImageDataUrl()` viszont tovabbra is a
    régi 1 650 000 karakteres hatart hasznalta, ezert a nagyobb WQHD kepet
    meg a tenyleges mentasi proba elott eldobta.
- Javitas:
  - A kepellenorzo merethatara parameterezheto lett; a tabla es falvedo régi
    1 650 000-es vedelme valtozatlan maradt.
  - A hatter eloszor eredeti minosegben probal menteni.
  - Kvotahibanal automatikusan csokkenti a WebP/JPEG kodolasi meretet, az elso
    ot probanal a 2560 px-es felbontast megtartva.
  - Csak tovabbi kvotahiba eseten csokkenti fokozatosan a felbontast.
  - Sikertelen sorozat utan az elozo hatter visszaall, mas preset kepe nem
    torlodik automatikusan.
- Szandekosan erintetlen:
  - Tools GIF kompatibilitas;
  - tabla- es falvedokep tomoritese;
  - kartya-, javito-, Undo/Next- es jatekosgeometria.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.57-v1093-adaptive-wqhd-storage`.
  - `node --check src/Autodarts_CORE_v1093.user.js`: sikeres.
- Elo teszt szukseges:
  - ugyanannak a korabban elutasitott hatterkepnek az ujrafeltoltese;
  - kepelesseg ellenorzese 2560x1440 kijelzon.

### v1094 - Shadow DOM GIF es lathato WQHD hatter

- Datum: 2026-07-06
- Fajl: `src/Autodarts_CORE_v1094.user.js`
- Alap: `src/Autodarts_CORE_v1093.user.js`.
- Felhasznaloi visszajelzes:
  - A mentett hatterkep nem jelent meg.
  - A Tools for Autodarts dobashoz rendelt GIF animacioja sem latszott.
- Bizonyitott hatter-ok:
  - A v1093 mentese 3 500 000 karakterig engedte a WQHD kepet.
  - A negy kesobbi megjelenitesi pont a régi 1 650 000-es ellenorzest
    hasznalta, ezert a mar elmentett kepet uresnek tekintette.
- Bizonyitott GIF-ok:
  - A Tools `initAnimations()` fuggvenye `createShadowRootUi()` segitsegevel,
    `autodarts-tools-animations` nevu nyitott Shadow Rootba mountolja az
    `Animations.vue` komponenst.
  - Emiatt a dokumentumszintu `getElementById("gif-animation")` nem erhette el
    az animacios kepet.
- Javitas:
  - A hatter mentese es mind a negy megjelenitesi pont kozos,
    3 500 000-es ellenorzot hasznal.
  - A script kozvetlenul az `autodarts-tools-animations` host nyitott
    Shadow Rootjat figyeli.
  - A belso `#gif-animation`, a sajat overlay es a kulso Shadow DOM host kulon
    retegbe kerul, a vagast okozo felmenok ideiglenes feloldasaval.
  - A teljes dokumentum altalanos GIF-keresese helyett csak a Tools host
    beillesztese/eltavolitasa es a sajat Shadow Root valtozasa indit ellenorzest.
  - Passziv allapotadat elerheto a
    `window.__AD_CORE_V1094_TOOLS_GIFS__` valtozoban.
- Szandekosan erintetlen:
  - adaptiv WQHD tomoritesi lepcso;
  - tabla- es falvedokep tomoritese;
  - kartya-, javito-, Undo/Next- es jatekosgeometria.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.58-v1094-shadow-gif-and-visible-wqhd`.
  - `node --check src/Autodarts_CORE_v1094.user.js`: sikeres.
- Elo teszt szukseges:
  - korabban elmentett vagy ujra feltoltott WQHD hatter megjelenese;
  - Tools dobashoz rendelt animacioja tabla elotti es teljes oldalas modban.

### v1095 - Tools esemenyek, teljesitmeny es javitasi koordinatak

- Datum: 2026-07-06
- Fajl: `src/Autodarts_CORE_v1095.user.js`
- Alap: `src/Autodarts_CORE_v1094.user.js`.
- Felhasznaloi visszajelzes:
  - A Tools GIF tovabbra sem jelent meg.
  - Harom MISS utan elmaradt a Tools `0` / no-score bemondasa.
  - D5 javitasnal a kattintasi pont a dupla gyurun kivulre kerult, es 0 lett.
  - A teljes oldal erosen belassult.
- Bizonyitott teljesitmeny-ok:
  - A tobb megabajtos Base64 hatter egyszerre tobb dinamikus CSS-be es inline
    stilusba kerult.
  - A v1015 hatteralkalmazas valtozatlan kepnel is ujra kiirta ugyanazt a
    `background-image` erteket.
- Teljesitmeny-javitas:
  - A mentett Base64 hatterbol forrasvaltaskor egyszeri Blob URL keszul.
  - A generalt CSS-ek es az inline hatter ezentul csak a rövid Blob URL-t
    tartalmazzak.
  - A sanitizer es a Blob URL eredmenye gyorsitotarazott.
  - A v1015 azonos hatter/szin/atlatszosag alairasnal kihagyja a stilusirast.
- Bizonyitott javitasi koordinata-ok:
  - Az SVG geometria a legnagyobb ismetlodo path-klasztert tekintette dobhato
    kulso sugarnak.
  - Egyes tablakeszleteknel ez mar a perem vagy szamgyuru sugara, ezert barmely
    dupla kicsuszhatott.
- Koordinata-javitas:
  - SVG, canvas es HTML felulet ugyanazt a tablaoldal 39%-anak megfelelo,
    stabil dobhato alapsugarat hasznalja.
  - Az S/D/T sugararanyok es a teljes huszszektoros sorrend kozos alapon fut.
  - A draga, minden path-ra meghivott `getBBox()` meressor megszunt.
- Tools GIF:
  - A Tools hivatalos `Animations.vue` kodja board-only modban a
    `#ad-ext-turn` kozvetlen kovetkezo testvere alatt keresi a
    `.showAnimations` meretet.
  - CORE nezetben ez 0x0 overlayt eredmenyezhetett.
  - A v1095 globalisan feloldja a lathato `.showAnimations`, egyedi tabla-host
    vagy nativ tabla valos meretet, es ezt fontos inline meretkent alkalmazza
    a Shadow DOM overlayre.
  - Full-page modban tovabbra is a teljes viewport marad a cel.
- Tools Caller:
  - A hivatalos Caller a harmadik dobast kovetoen a kor pontszamat jatsza le;
    harom MISS eseten ez a `0` trigger.
  - A CORE nem ad hozza masodik sajat no-score hangot, mert a Tools mukodesenek
    helyreallasakor az dupla bemondast okozna.
- Passziv diagnosztika:
  - A legutobbi dobaskartya-allapotok es elvart Tools triggerek a
    `window.__AD_CORE_V1095_TOOLS_TURN_EVENTS__` valtozoban vannak.
  - A teljes pillanatkep a
    `window.__AD_CORE_V1095_GET_TOOLS_DIAGNOSTICS__()` fuggvennyel kerheto le.
  - Masolas:
    `window.__AD_CORE_V1095_COPY_TOOLS_DIAGNOSTICS__()`.
- Szandekosan erintetlen:
  - Tools beallitasok es tarolt GIF/hang fajlok;
  - tabla- es falvedokep tomoritese;
  - kartya-, Undo/Next- es jatekosgeometria.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.59-v1095-tools-events-performance-and-correction`.
  - `node --check src/Autodarts_CORE_v1095.user.js`: sikeres.
- Elo teszt szukseges:
  - ugyanazon WQHD hatter melletti animacios sebesseg;
  - board-only es full-page Tools GIF;
  - harom MISS utani `0` / no-score Caller hang;
  - S1-S20, D1-D20, T1-T20, 25, Bull es MISS javitasok.

### v1096 - Dupla gyuru kozepe

- Datum: 2026-07-06
- Fajl: `src/Autodarts_CORE_v1096.user.js`
- Alap: `src/Autodarts_CORE_v1095.user.js`.
- Felhasznaloi visszajelzes:
  - A v1095 tobbi javitasa mukodik.
  - Sok dupla javitas tovabbra is MISS lett, mert a kek pont a dupla gyuru
    kulso szelen vagy azon kivul jelent meg.
- Javitas:
  - A D1-D20 kozos sugar-szorzoja `0.965` helyett `0.94`.
  - Ez a pontot a kulso drottol a dupla gyuru biztonsagos kozepe fele viszi.
  - A szektorszog, S/T sugar, 25, Bull es MISS nem valtozott.
- Szandekosan erintetlen:
  - v1095 Blob URL teljesitmeny-javitasa;
  - Tools GIF meretezese es passziv diagnosztikaja;
  - kartya-, Undo/Next- es jatekosgeometria.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.60-v1096-double-ring-center`.
  - `node --check src/Autodarts_CORE_v1096.user.js`: sikeres.
- Elo teszt szukseges:
  - D1-D20, kulonosen D5 es a szektorhatarokhoz kozeli duplak.

### v1097 - Teljesitmeny-kimelo GIF/Tools frissites

- Datum: 2026-07-07
- Fajl: `src/Autodarts_CORE_v1097.user.js`
- Alap: `src/Autodarts_CORE_v1096.user.js`.
- Felhasznaloi visszajelzes:
  - A dupla javitas mukodik.
  - Az oldal jatszhatatlanul lassunak erzodik.
- Javitas:
  - A Tools GIF kompatibilitasi reteg mar nem torli es epiti ujra globalisan
    a sajat jelolo attributumait minden futaskor.
  - A GIF overlay inline style irasa valtozas-alapu lett: ugyanarra a media,
    host es tabla-celmeret kombinaciora nem irja ujra ugyanazokat az ertekeket.
  - A tabla/GIF celterulet merese rövid ideig cache-elt, igy a gyakori
    frissitesek nem kerdezik le ujra feleslegesen a teljes tabla-kornyezetet.
  - A Tools animacios host felismerese ritkitott lett, hogy a teljes oldalas
    DOM valtozasok ne okozzanak sok node-on atfuto ellenorzest.
  - Resize/fullscreen es Shadow DOM GIF valtozas eseten tovabbra is ujrameri
    es ujrapozicionalja az overlayt.
- Szandekosan erintetlen:
  - Dobasjavitas koordinatai, beleertve a v1096 dupla sugarat;
  - kartya-, Undo/Next- es jatekosgeometria;
  - hatterkep tarolasi/tomoritesi logika;
  - Tools hang/GIF beallitasok.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.61-v1097-performance-throttle`.
  - `node --check src/Autodarts_CORE_v1097.user.js`: sikeres
    a Codex bundelt Node futtatokornyezetebol.
- Elo teszt szukseges:
  - normal jatek kozbeni sebesseg, dobasanimaciok es 180/fireworks;
  - Tools GIF megjelenes board-only es full-page modban;
  - WQHD feltoltott hatterrel torteno jatek.

### v1098 - Dobaskartya frissites es 3+ jatekos ketoldalas nezet

- Datum: 2026-07-08
- Fajl: `src/Autodarts_CORE_v1098.user.js`
- Alap: `src/Autodarts_CORE_v1097.user.js`.
- Felhasznaloi visszajelzes:
  - A v1097 mar nem jatszhatatlanul lassu, de meg lehetne gyorsabb.
  - A Tipp/Checkout es osszdobas kartyak neha rossz fonttal vagy rossz
    pozicioban jelentek meg.
  - Az osszdobas kartya neha nem nullazodott es az elozo jatekos erteket tartotta.
  - A ketoldalas nezet csak 2 jatekosnal mukodott, 3 vagy tobb jatekosnal is
    szukseg van ra.
- Javitas:
  - A ketoldalas layout aktiv feltetele 2 vagy tobb jatekosra bovult.
  - 3+ jatekosnal a player kartyak bal-jobb sorokba kerulnek, nem egymasra.
  - A Tipp/Checkout kartyak ertekfeliratait minden turn-frissitesnel ujra
    jeloli es kozepre zarja a script a beallitott dobaskartya fonttal.
  - Az osszdobas kartya erteke a harom lathato dobaskartyabol ujraszamolhato,
    ures korben pedig 0-ra all, igy kevesbe ragad be elozo kor/jatekos ertek.
  - A korabbi specialis kartya felismeresbol kikerult egy felesleges extra
    ujrafestes-hivas, hogy kisebb legyen a DOM-terheles.
- Szandekosan erintetlen:
  - Tools GIF / hatterkep tarolasi logika;
  - dobasjavitas koordinatai;
  - v1097 teljesitmeny cache es throttling;
  - eredeti Autodarts nezet nagyobb szerkezeti geometriaja.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.62-v1098-turn-card-refresh-and-multiplayer-layout`.
  - `node --check src/Autodarts_CORE_v1098.user.js`: sikeres
    a Codex bundelt Node futtatokornyezetebol.
- Elo teszt szukseges:
  - 2, 3 es 4 jatekos ketoldalas layoutja;
  - Tipp/Checkout/osszdobas font es pozicio jatek kozben;
  - uj kor vagy jatekosvaltas utan az osszdobas nullazasa.

### v1099 - 3+ jatekos kompakt kartyatartalom

- Datum: 2026-07-08
- Fajl: `src/Autodarts_CORE_v1099.user.js`
- Alap: `src/Autodarts_CORE_v1098.user.js`.
- Felhasznaloi visszajelzes:
  - 3+ jatekosnal a kartyak pozicioja jo, de a tartalom tul sok:
    history/atlag helyett csak a nev es pontszam kell.
  - A pontszam es nev csoportja legyen a kartya kozepen.
  - A nevek vege le volt vagva, a nev koruli jelzok tul nagy tavolsagot
    hagytak.
  - A dobaskartyak 3+ jatekosnal balra csusztak, nem a ket oldali
    jatekoskartya-oszlop kozepen voltak.
- Javitas:
  - 3+ jatekosnal kulon kompakt multi-player allapot kerul a rootra es a
    jatekoskartyakra.
  - 3+ jatekosnal a kartyan csak a nev es a pontszam marad lathato; az
    atlag/history sor rejtve marad inline display ertekek mellett is.
  - A nev es pontszam csoportja kozepre kerul, a nev sorbol a felesleges
    kiegeszito node-ok rejtve vannak, hogy a teljes nevnek tobb helye legyen.
  - 3+ jatekosnal a dobaskartya-sav nem kapja meg a ketjatekos -45px balra
    huzast, hanem a kozepso savban kozepre zar.
- Szandekosan erintetlen:
  - 2 jatekos elfogadott kartyageometriaja;
  - tabla, GIF, dobasjavitas es specialis Tipp/Checkout felismeres;
  - v1098 osszdobas ujraszamolas.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.63-v1099-multiplayer-card-content-center`.
  - `node --check src/Autodarts_CORE_v1099.user.js`: sikeres.
- Elo teszt szukseges:
  - 3, 4, 5 es 6 jatekosnal a nev/pont kozepre zarasa;
  - hosszu jatekosnevek olvashatosaga;
  - dobaskartyak kozepre igazodasa a ket oldali kartyak kozott.

### v1100 - 3+ jatekos overlay es dobaskartya-sav kozepre igazitas

- Datum: 2026-07-08
- Fajl: `src/Autodarts_CORE_v1100.user.js`
- Alap: `src/Autodarts_CORE_v1099.user.js`.
- Felhasznaloi visszajelzes:
  - 3+ jatekosnal a kartya pozicioja jo, de a nev es pont nem volt a kartya
    kozepen.
  - 5-6 jatekosnal gyakran csak a pontszam latszott, az sem kozepen.
  - A hosszu jatekosnevek levagodtak, es a nev melletti kis jelzo tul nagy
    tavolsagot hagyott.
  - A dobaskartya/osszkartya sav bal oldalon nekiert a jatekoskartyanak,
    jobb oldalon pedig tul sok hely maradt.
  - Az osszkartya bizonyos ures korokben megtarthatta az elozo jatekos
    erteket.
- Javitas:
  - 3+ jatekosnal a natív player-card tartalom el van rejtve, es egy
    script-sajat, csak nev + kis jelzo + pontszam overlay rajzolodik a kartya
    kozepere.
  - Az overlay dinamikusan meretezi a nevet es a pontszamot a kartya valos
    meretehez, ezert 3-6 jatekosnal is a kartya kozepen marad.
  - A dobaskartya-sav kozepre igazitasat a bal oldali kartya jobb szele es a
    jobb oldali kartya bal szele alapjan szamolja.
  - Az osszdobas ujraszamolasa ures/placeholder dobaskartyaknal 0-ra esik
    vissza, nem az elozo native total szovegre.
- Szandekosan erintetlen:
  - 2 jatekos elfogadott geometriaja;
  - tabla, GIF, dobasjavito UI es specialis dobasjavito koordinatak;
  - aktiv/gyoztes/bust szinek es animaciok.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.64-v1100-multiplayer-overlay-and-turn-center`.
  - `node --check src/Autodarts_CORE_v1100.user.js`: sikeres.
- Elo teszt szukseges:
  - 3, 4, 5 es 6 jatekosnal a teljes nev es pont kozepre zarasa;
  - dobaskartyak kozepre igazodasa a ket oldali kartyaoszlop kozott;
  - ures kor es jatekosvaltas utan az osszkartya 0-ra allasa.

### v1101 - Natív többjátékos névsor visszaállítás és kártyaérték frissítés

- Datum: 2026-07-11
- Fajl: `src/Autodarts_CORE_v1101.user.js`
- Alap: `src/Autodarts_CORE_v1100.user.js`.
- Felhasznaloi visszajelzes:
  - 3+ jatekosnal a nev es pont mar kozepen volt, de nem a régi,
    ketjatekos modban hasznalt nativ nevsort adta vissza.
  - 3+ jatekosnal a jatekoskartya tartalom beallitasai nem ervenyesultek.
  - Az osszkartya neha megtartotta az elozo jatekos erteket.
  - A Tipp/Checkout kartyaknal elofordult rossz betutipus es pontatlan
    kozepre igazitas.
  - A Tools for Autodarts GIF-ek bizonyos rövid megjeleneseknel nem
    jelentek meg.
- Javitas:
  - A v1100 sajat 3+ jatekos overlay-e ki lett veve a mukodesbol; a nativ
    nevsort nem rejti el a script, igy visszater a ketjatekos nevsor stilusa.
  - A 3+ jatekos nativ nevbox rugalmasabb lett, kisebb gap-pel es
    levagasmentesebb nevmegjelenitessel.
  - Az osszkartya layout modban nem esik vissza a stale nativ total szovegre;
    ures dobaskartyaknal 0-ra all.
  - A Tipp/Checkout ertekek kapnak direkt kozepre igazito es betutipus
    stilust a felismert ertek-elemen.
  - A Tools GIF figyelo gyorsabban probalja felismerni az uj overlay elemeket.
- Szandekosan erintetlen:
  - 2 jatekos elfogadott geometriaja;
  - tabla/falvedo logika, javito UI-k es specialis dobasjavito koordinatak;
  - aktiv/gyoztes/bust szinek es animaciok.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.65-v1101-native-multiplayer-name-row`.
  - `node --check src/Autodarts_CORE_v1101.user.js`: sikeres.
- Elo teszt szukseges:
  - 3, 4, 5 es 6 jatekosnal a nativ nevsort, teljes nevet es pontszamot;
  - jatekoskartya tartalom beallitasokat 3+ jatekosnal;
  - Tipp/Checkout fontot es kozepre igazodast;
  - ures kor es jatekosvaltas utan az osszkartya 0-ra allasat;
  - Tools for Autodarts GIF megjelenest.

### v1102 - GIF, specialis dobaskartya allapot, history javitas es tobbjatekos nevbeallitas

- Datum: 2026-07-11
- Fajl: `src/Autodarts_CORE_v1102.user.js`
- Alap: `src/Autodarts_CORE_v1101.user.js`.
- Felhasznaloi visszajelzes:
  - Az osszkartya mar jol mukodik.
  - A Tools for Autodarts GIF-ek tovabbra sem jelentek meg.
  - Tipp/Checkout utan a kovetkezo dobaskartya neha rossz szint, poziciot
    vagy specialis kartyastilust orokolt.
  - Javitas utan a sajat history nem cserelte le a javitott sort, es ezutan
    megallt a tovabbi history-frissites.
  - 3+ jatekosnal a nativ nevsor visszajott, de a menu beallitasai nem
    ervenyesultek megfeleloen.
  - Az osszkartya alatti kamera valasztok nem az Undo/Next sorhoz igazodtak.
- Javitas:
  - A Tipp/Checkout ertekfelulet minden ismert script-altal irt inline
    stilusat es dataset allapotat torli a script, mielott ugyanaz a DOM normal
    dobaskartyakent ujrahasznosulhat.
  - A specialis kartyafelismeres csak akkor veszi at a nativ css-* allapotot,
    ha a kartyan tenyleges Tipp/Checkout ertek is talalhato.
  - A Tipp es Checkout szovegszine az azonositas utan kozvetlenul is a
    beallitott kulon szinvaltozokra all, igy nem maradhat stale szin.
  - A sajat history azonos sorhossz, de eltero tartalom eseten a friss nativ
    historyt veszi at, ez a javitott dobasertekeket is atengedi.
  - Javitas megerositese utan tobblepcsos history/turn frissites fut.
  - 3+ jatekosnal a nativ nevsor mar a menubeallitas szerinti lathatosagot,
    sorrendet es meretezest kapja vissza; az atlag/history tovabbra is rejtve
    marad a suru tobbjatekos nezetben.
  - A kamera valaszto gombok az osszkartya bal szelevel indulnak, es ha van
    Undo/Next sor, annak magassagahoz igazodnak.
  - A Tools GIF kompatibilitas mar nem csak `img` elemre mukodik, hanem a
    Shadow DOM `#gif-animation` host altalanos HTMLElement formajara is.
- Szandekosan erintetlen:
  - Az elfogadott tabla/falvedo, board glow es javito UI geometria.
  - A 2 jatekos alap kartyageometriaja es a mar mukodo osszkartya logika.
  - A Tools for Autodarts sajat belso mukodese; csak megjelenitesi
    kompatibilitas tortent.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.66-v1102-gif-special-history-multiplayer`.
  - `node --check src/Autodarts_CORE_v1102.user.js`: sikeres.
- Elo teszt szukseges:
  - Tools for Autodarts GIF megjelenes miss/reaction es dobasanimacio mellett.
  - Tipp/Checkout utan a kovetkezo normal dobaskartya szine, fontja es
    pozicioja.
  - Dobas javitasa utan a history sora es a kovetkezo history-frissites.
  - 3, 4, 5 es 6 jatekosnal a nativ nevsor es menuvezerelek.
  - Kamera valaszto gombok pozicioja az osszkartya es Undo/Next sor mellett.

### v1109 - Jatekoskartya kapcsolok, nativ avatar es teljes nev

- Datum: 2026-07-12
- Fajl: `src/Autodarts_CORE_v1109.user.js`
- Alap: a felhasznalo altal aktualiskent atadott
  `C:\Users\Zoli\Desktop\Autodarts_CORE_v1108.txt`
  (`2.6.72-v1108-multiplayer-full-native-name-row`).
- Felhasznaloi visszajelzes:
  - Az Aktiv jatekos `Funkcio bekapcsolva` kapcsoloja nem valtoztatta meg
    megbizhatoan a kiemelest.
  - Ketoldalas CORE nezetben, 3+ jatekosnal a nev- es atlagsor kapcsoloja nem
    ervenyesult.
  - A kompakt sajat nevsor avatarja tul nagy lett, feher korong jelent meg
    mogotte, es az orszagjelzes sem a ketjatekos nativ megjelenest kovette.
  - Eredeti Autodarts nezetben a teljes jatekosnev tovabbra is levagodhatott.
- Javitas:
  - Az aktiv kiemeles kesobbi `:has(.ad-ext-player-active)` szabalyai most mar
    csak bekapcsolt funkcio mellett ervenyesek; a felismeres a melyebben levo
    nativ aktiv jelolest is elfogadja.
  - A 3+ jatekos kompakt nezet a nev- es atlagsor lathatosagat, sorrendjet es
    atlagmeretezeset ujra kozvetlenul a menubeallitasokbol veszi.
  - Az avatar kezeles a mar meglevo nativ DOM-elemet hasznalja; nem klonoz es
    nem helyez at React-elemet. Csak az avatar meretet es felesleges feher
    keret/hatter kromjat normalizalja, a kulon orszagjelzest erintetlenul hagyja.
  - A v1108 teljesnev-visszanyerese az eredeti Autodarts nezetre is kiterjed,
    es csak szukseg eseten kicsinyiti a nev betumeretet, hogy a teljes sor
    elferjen a kartyan.
- Szandekosan erintetlen:
  - Dobas-, Tipp-, Checkout- es osszkartya geometria es stilus.
  - Tabla/falvedo, marker, glow, GIF, history es dobasjavito logika.
  - Jatekoskartyak kulso merete es a ketoldalas oldalgeometria.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.73-v1109-player-row-controls-and-native-avatar`.
  - `node --check src/Autodarts_CORE_v1109.user.js`: sikeres.
  - A v1108-v1109 fajldiff csak a fenti celzott valtozasokat mutatja.
- Elo teszt szukseges:
  - Aktiv jatekos kapcsolo ki/be mindket jateknezetben.
  - 3, 4, 5 es 6 jatekosnal nev- es atlagsor ki/be, valamint a ket sor merete.
  - Avatar es orszagjelzes megjelenese rövid es hosszu nevekkel.
  - Teljes nev az eredeti Autodarts nezetben.

### v1110 - Egyseges nevsormagassag es stabil tobbjatekos geometria

- Datum: 2026-07-12
- Fajl: `src/Autodarts_CORE_v1110.user.js`
- Alap: `src/Autodarts_CORE_v1109.user.js`, amelyet a felhasznalo mukodo
  alapkent visszaigazolt az aktiv jatekos, nev/atlag kapcsolok es az eredeti
  nezet teljes nev megjelenitese szempontjabol.
- Felhasznaloi visszajelzes:
  - A kompakt 3-6 jatekos nevsor avataros valtozata magasabb volt az avatar
    nelkuli sornal.
  - A bot ikon mogul eltunt az eredeti sotet, szurke kor.
  - A dobaskartyak felso ele lejjebb volt a legfelso jatekoskartyaknal.
  - Az Undo/Next sor dobasallapot-valtaskor kicsit fel-le mozdult.
- Javitas:
  - A kompakt nativ azonositosor minden kartyan azonos, kartya- es
    beallitasfuggo, de avatarfuggetlen magassagot kap. A teljes sor nagyitasa
    helyett csak a nev betumerete csokken, ha a teljes nev maskepp nem fer el.
  - A mar letezo nativ avatar DOM marad a helyen. A jatekosavatar nem novelheti
    a sort, a bot ikon pedig sotet szurkeskek korkeretet kap. A CORE altal adott
    avatarstilus nezetvaltaskor teljesen lekerul.
  - Kizarolag 3-6 jatekos Ketoldalas CORE nezetben a negy dobaskartya mert
    felso ele a legfelso jatekoskartyak felso elehez igazodik minden
    ablakmeretben.
  - Ugyanebben a nezetben az Undo/Next vegso pozicioja a mar mert
    dobaskartya-csoporthoz igazodik. Atmeneti React DOM-csere alatt megtartja az
    utolso stabil poziciot, igy nem ugrik vissza a nativ helyere egy kepkockara.
  - Tools zoom es szamos javitasi nezet eseten a mar mukodo kulon elhelyezes
    marad az iranyado.
- Szandekosan erintetlen:
  - A v1005/v1011 ketjatekos dobaskartya-, Undo/Next- es jatekoskartya-
    geometria.
  - Dobas-, Tipp-, Checkout- es osszkartya tartalom, font, szin es keret.
  - Tabla/falvedo, marker, glow, GIF, history, Undo-adatkezeles es dobasjavito
    logika.
  - Eredeti Autodarts nezet es a React DOM szerkezete; nincs React elem
    klonozese, athelyezese vagy torlese.
- Statikus teljes beallitas-audit:
  - Mind a 14 aktiv menulapnak van renderelo aga.
  - 71 menubol hivatkozott konfiguracios kulcs es 74 resetkulcs szerepel az
    alapkonfiguracioban.
  - A harom nyelv menuforditasai teljesek; a Javitas cim a sajat dinamikus
    forditasi szolgaltatojabol jon.
  - A v1110 nem ad uj `MutationObserver`-t vagy `setInterval` ciklust.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.74-v1110-uniform-player-row-and-stable-turn-geometry`.
  - `node --check src/Autodarts_CORE_v1110.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1110 blokk es verziosorok eltavolitasa utan a fajl bytepontosan
    megegyezik a v1109 alappal.
- Elo teszt szukseges:
  - 3, 4, 5 es 6 jatekos avataros, avatar nelkuli es bot sorral.
  - Kulonbozo ablakmeretekben a jatekos- es dobaskartya felso elenek egyezese.
  - Undo/Next helye normal dobaskor, Tipp/Checkout, zoom es javitasi allapotban.
  - Az osszes jatekallapot teljes mukodeset statikus kodvizsgalat nem tudja
    bizonyitani, ehhez elo Autodarts meccs kell.

### v1111 - Nativ tobbjatekos nevsor es stabil felso geometria

- Datum: 2026-07-13
- Fajl: `src/Autodarts_CORE_v1111.user.js`
- Alap: `src/Autodarts_CORE_v1110.user.js` valtozatlan teljes masolata.
- Felhasznaloi visszajelzes:
  - A felso Autodarts menursor belelogott a dobaskartyakba.
  - Az Undo/Next sor meg néhány pixelt fel-le mozdult.
  - A 3-6 jatekos kompakt nevsorban a set/leg jelzo es a nativ
    avatar-nev-badge chip nem azonos magassaggal jelent meg.
  - A bot ikon sotet, szurke kore nem allt helyre minden DOM-valtozatban.
  - A nev- es pontszamcsuszka felso szakasza a korabbi 42 px-es, illetve
    168 px-es belso korlat miatt mar nem valtoztatta a lathato meretet.
- Javitas:
  - Kizarolag a 3-6 jatekos Ketoldalas CORE nezetben a felso HUD sor
    14-18 pixellel feljebb kerul; a dobaskartyak elfogadott geometriat ez nem
    irja at.
  - Az Undo/Next vegso pozicioja a lathato dobas- vagy Tools zoom kartyasor
    also elehez rogzul. Azonos nezetben a legfeljebb 12 pixeles atmeneti
    meresi ingadozast kiszuri, ezert a sor nem koveti a React-allapotvaltasok
    néhány pixeles remegeset.
  - A kompakt nevsor belso elemeire irt kulon font- es magassagkorlat
    lekerult. A teljes, mar meglevo nativ set/leg + avatar + nev + badge sor
    ugyanazzal az egesz-soros `zoom` elvvel meretezodik, mint a mukodo
    ketjatekos nevsor. Hosszu nevnel csak annyira csokken a nagyitas, hogy a
    teljes nev a kartyan belul maradjon.
  - A jatekosavatar atlatszo marad. A bot ikon kulon wrapperes es egyetlen
    IMG/SVG elemes DOM-valtozatban is sotet szurkeskek korkeretet kap.
  - A kompakt pontszam a beallitott 40-220%-os csuszkaerteket kozvetlenul
    ervenyesiti; a korabbi 168 px-es plafon nem nyeli el a felso tartomanyt.
- Szandekosan erintetlen:
  - A v1005/v1011 ketjatekos dobaskartya-, Undo/Next- es jatekoskartya-
    geometria.
  - Dobas-, Tipp-, Checkout- es osszkartya tartalom, font, szin es keret.
  - Tabla/falvedo, marker, glow, GIF, history, Undo-adatkezeles es dobasjavito
    logika.
  - Eredeti Autodarts nezet es a React DOM szerkezete; nincs React elem
    klonozese, athelyezese vagy torlese.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.75-v1111-native-multiplayer-row-and-fixed-hud-actions`.
  - `node --check src/Autodarts_CORE_v1111.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1111 blokk es verziosorok eltavolitasa utan a fajl bytepontosan
    megegyezik a v1110 alappal.
  - A v1111 nem ad uj `MutationObserver`-t, `setInterval` ciklust,
    DOM-klonozast vagy React-elem-mozgatast.
- Elo teszt szukseges:
  - 3, 4, 5 es 6 jatekosnal a ket chip azonos magassaga, emberi avatar,
    orszagjelzes es bot ikon.
  - Nev- es pontszamcsuszka teljes tartomanya rövid es hosszu nevekkel.
  - Felso HUD tavolsaga, valamint Undo/Next stabilitasa ures, dobott,
    Tipp/Checkout es Tools zoom allapotban.

### v1112 - Stabil akciogombok, kozepre zart sorok es meresi gyorsitas

- Datum: 2026-07-13
- Fajl: `src/Autodarts_CORE_v1112.user.js`
- Alap: `src/Autodarts_CORE_v1111.user.js` valtozatlan teljes masolata.
- Felhasznaloi visszajelzes:
  - Az Undo/Next sor 3-6 jatekos Ketoldalas CORE nezetben meg néhány pixelt
    fel-le mozdult.
  - Az atlagsor a jatekoskartya vizszintes kozepehez kepest eltolodott ket es
    tobb jatekosnal is.
  - Az atlatszo PNG avatar korul feher negyzet maradt.
  - Eredeti Autodarts nezetben a nev es az atlag nagy meretnel kilogott, a
    pontszam pedig 60% alatt nem kicsinyedett tovabb.
  - A gyakori DOM-meresek miatt az oldal erezhetoen belassult.
- Javitas:
  - A 3+ jatekos nezetben a régi v1005 14 px-es atmeneti transzformacio es a
    v95 ideiglenes akciogomb-pozicio nem fut le a vegleges v1112 igazitas elott.
    Az Undo/Next sor igy egyetlen rogzitett koordinatakezelot kap.
  - A nev- es atlagsor belso, tartalommeretu flexsorra valt, automatikus jobb-
    es bal margoval. A kert nagyitas megmarad, de a tenyleges meret a kartya
    belso szelessegenel megall.
  - Az emberi PNG avatar avatar-only szulolancanak feher hatter-, keret- es
    arnyekstilusa atlatszora valt. A nevchip es a bot sotet korkerete erintetlen.
  - Eredeti Autodarts nezetben a pontszam 40%-ig valoban kicsinyitheto. A
    pontszam, teljes nevsor es atlagsor maximalis lathato meretet a kartya belso
    szelessege korlatozza, igy a csuszka nem okozhat vizszintes kilogast.
  - A kompakt nevmeres es az eredeti nezet illesztese WeakMap gyorsitotarakat
    hasznal. Azonos DOM, szoveg, font, meret es beallitas mellett a draga
    szelessegmeres nem fut ujra; a geometriai veglegesites legfeljebb nagyjabol
    48 ms-onkent fut.
- Szandekosan erintetlen:
  - A v1111 mukodo felso HUD-pozicioja es a 3-6 jatekos pontszam-/nevcsuszka
    teljes tartomanya.
  - A v1005/v1011 ketjatekos dobaskartya-, Undo/Next- es jatekoskartya-
    geometria.
  - Dobas-, Tipp-, Checkout- es osszkartya tartalom, font, szin es keret.
  - Tabla/falvedo, marker, glow, GIF, history, Undo-adatkezeles es dobasjavito
    logika.
  - React DOM-elemek; nincs uj klonozas, athelyezes vagy torles.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.76-v1112-stable-actions-centered-rows-and-fit-performance`.
  - `node --check src/Autodarts_CORE_v1112.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1111-v1112 statikus osszevetes szerint nem kerult be uj
    `MutationObserver`, `setInterval`, `cloneNode` vagy masodik `start()` hivas.
- Elo teszt szukseges:
  - Undo/Next stabilitasa ures, dobott, Tipp/Checkout, Tools zoom es javitasi
    allapotban.
  - Atlag kozepre zarasa ket, harom, negy, ot es hat jatekosnal.
  - Atlatszo PNG avatar es bot avatar egyideju megjelenese.
  - Eredeti Autodarts nezet 40-130%-os pontszammal, hosszu nevvel es 240%-os
    atlagsorral kulonbozo ablakszelessegeken.
  - A teljesitmenyjavulas csak elo Autodarts meccsben merheto hitelesen.

### v1113 - Nativ nevsorok, nullaig meretezheto pontszam es kisebb terheles

- Datum: 2026-07-13
- Fajl: `src/Autodarts_CORE_v1113.user.js`
- Alap: `src/Autodarts_CORE_v1111.user.js` valtozatlan teljes masolata.
- Alapvalasztas oka:
  - A v1112 elo tesztje az Eredeti Autodarts nevsor es a bot avatar korabban
    mukodo megjeleneset visszarontotta, ezert a v1113 nem arra, hanem a stabil
    v1111-re epul.
- Felhasznaloi visszajelzes:
  - Eredeti Autodarts nezetben a nevsor rosszabb lett es az atlagsor nem a
    teljes jatekoskartya vizszintes kozepehez igazodott.
  - Ketoldalas CORE nezetben a bot sotet szurkeskek kore visszavaltozott, az
    atlatszo emberi PNG avatar es a nev kozott pedig nem maradt res.
  - Eredeti nezetben a pontszam 0-40% kozott nem valtoztatta a meretet.
  - A gyakori stilusujrairasok es DOM-meresek miatt az animaciok es
    allapotvaltasok erosen belassultak.
- Javitas:
  - Az Eredeti Autodarts nevsor a v1111 nativ sorat es annak bizonyitott
    illeszteset hasznalja; a v1112 altalanos `max-content`/egesz-soros nagyitasa
    nincs benne.
  - Az atlagsor belso szovege meretezodik es illeszkedik, mikozben a sor
    vizszintes pozicioja a tenyleges jatekoskartya kozepere korrigalodik.
  - Az emberi avatar kep koruli, kizarolag avatarhoz tartozo hatter atlatszo,
    a nev elott 4 px res marad. A bot avatar v1111-es sotet szurkeskek kore
    valtozatlan marad.
  - Eredeti Autodarts nezetben a pontszamcsuszka 0-130% teljes tartomanya
    folyamatosan ervenyesul; a 0-40% kozotti reszt nem nyeli el belso also korlat.
  - A skin CSS es a jatekoskartya kiegeszito stilus csak valodi beallitasvaltasnal
    epul ujra. A valtozatlan kartya-, nevsor-, atlag-, HUD- es geometriai meresek
    gyorsitotarbol futnak, az akciogomb-geometria legfeljebb nagyjabol 48
    ms-onkent frissul.
- Szandekosan erintetlen:
  - A v1005/v1011 ketjatekos dobaskartya-, Undo/Next- es jatekoskartya-
    geometria.
  - Dobas-, Tipp-, Checkout- es osszkartya tartalom, font, szin es keret.
  - Tabla/falvedo, marker, glow, GIF, history, Undo-adatkezeles es dobasjavito
    logika.
  - React DOM-elemek; nincs uj klonozas, athelyezes vagy torles.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.77-v1113-native-rows-zero-score-and-performance`.
  - `node --check src/Autodarts_CORE_v1113.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1111-v1113 statikus osszevetes szerint nem kerult be uj
    `MutationObserver`, `setInterval`, `cloneNode`, `appendChild` vagy masodik
    `start()` hivas.
- Elo teszt szukseges:
  - Eredeti Autodarts nevsor es atlagsor ket-hat jatekosnal, rövid es hosszu
    nevekkel.
  - Emberi atlatszo PNG avatar es bot avatar egyideju megjelenese Ketoldalas
    CORE nezetben.
  - Eredeti Autodarts pontszamcsuszka 0%, 10%, 20%, 40% es 130% erteken.
  - Undo/Next stabilitasa es az animaciok sebessege elo meccsben; a tenyleges
    teljesitmenyjavulas statikus ellenorzessel nem bizonyithato.

### v1114 - Elo media- es nezetvaltas, tobbjatekos atlag es kozepre zart dobaskartyak

- Datum: 2026-07-14
- Fajl: `src/Autodarts_CORE_v1114.user.js`
- Alap: `src/Autodarts_CORE_v1113.user.js`
- Jelzett hibak:
  - Ketoldalas CORE nezetben, harom-hat jatekosnal az avatarok es bot ikonok a
    jatek indulasa utan csak oldalfrissitesre kaptak meg a vegleges meretet es
    atlatszo/szurke kor alaku megjelenesuket.
  - A Tools GIF nativ es tukrozott peldanya egyszerre latszodhatott, ezert a GIF
    kep-a-kepben vagy savosan is megjelenhetett.
  - Nezetvaltas utan a v1113 geometriai gyorsitotara a korabbi nezet adatait
    tarthatta meg.
  - Harom vagy tobb jatekosnal az atlagsort harom kulon reteg is kenyszerbol
    elrejtette.
  - A dobaskartya-csoport savszamitasa csak az elso ket, bal szerint rendezett
    jatekoskartyat nezte; tobb sorban ezek akar ugyanabba a bal oldali oszlopba
    tartozhattak.
- Javitas:
  - A jatekoskepek `load` es a relevans identitas-DOM valtozasai csak az adott
    kartya v1113-as avatar/nev/atlag cache-et ervenytelenitik, majd a mar letezo
    frissitesi pipeline egyszer ujrailleszti azt.
  - Jatekosszam- vagy nezetvaltasnal azonnali, 90 ms-os es 720 ms-os egyszeri
    settle-pass fut. Nincs uj folyamatos meres, polling vagy MutationObserver.
  - A GIF tukor aktiv ideje alatt a nativ GIF `clip-path`-pal vizualisan ki van
    vagva, majd az eredeti stilus pontosan visszaall; igy egyetlen lathato GIF
    renderer marad.
  - A tobbjatekos atlagsor ugyanazt a megjelenitesi kapcsolot, sorrendet es
    60-240%-os meretezest koveti, mint a ketjatekos nezet.
  - Harom-hat jatekosnal a dobaskartyak lane-je a teljes bal oldali oszlop jobb
    szele es a teljes jobb oldali oszlop bal szele kozott szamolodik. A ketjatekos
    ag szamitasa valtozatlan maradt.
- Szandekosan erintetlen:
  - A v1005/v1011 ketjatekos kartya-, Undo/Next- es jatekoskartya-geometria,
    valamint a dobaskartyak merete.
  - Tipp/Checkout felismeres, font, szin, kozepre igazitas es keretkezeles.
  - Helyi hatter, tabla/falvedo, glow, marker, history, Undo-adatkezeles es
    dobasjavitas.
  - React/Autodarts DOM-elemek; nincs uj klonozas, athelyezes vagy torles.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.78-v1114-live-media-view-settle`.
  - `node --check src/Autodarts_CORE_v1114.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1113-v1114 statikus osszevetes szerint a `MutationObserver`,
    `setInterval`, `cloneNode` es `start()` hivasok szama nem nott.
- Elo teszt szukseges:
  - Hideg jatekinditas es nezetvaltas oldalfrissites nelkul 3-6 jatekossal,
    emberi PNG avatarral, bot ikonnal es bekapcsolt atlagsorral.
  - Tools GIF egyszeri, sav- es kep-a-kepben mentes megjelenese.
  - Dobaskartya-csoport egyenlo bal/jobb tavolsaga 3-6 jatekosnal.

### v1115 - Nezetvaltas, eredeti nezet atlaga es teljesitmeny-helyreallitas

- Datum: 2026-07-14
- Fajl: `src/Autodarts_CORE_v1115.user.js`
- Alap: `src/Autodarts_CORE_v1114.user.js`
- Elo teszttel megerositett v1114 eredmenyek:
  - A Tools GIF-ek helyesen jelennek meg.
  - A dobaskartya-csoport a bal es jobb jatekos-oszlop koze kerult.
  - Harom-hat jatekosnal az atlagsor koveti a megjelenitesi beallitast.
- Jelzett hibak:
  - Nezetvaltas utan tovabbra is oldalfrissites kellett a vegleges elrendezeshez.
  - Eredeti Autodarts nezetben, egy-ket jatekosnal az atlagsor a teljes kartya
    kozepere kerult, ezert a history terulete fele csuszott.
  - A v1114 szeles jatekoskartya-DOM megfigyeloje sajat stilusvaltozasokra is
    teljes meresi cache-uriteseket indithatott, es ettol az oldal belassulhatott.
- Javitas:
  - Eredeti Autodarts nezetben az atlagsor vizszintes kozepe a tenyleges
    pontszam-oszlop kozepehez igazodik. Ketoldalas CORE nezetben a mar elfogadott
    teljes kartyas kozepre igazitas valtozatlan.
  - Valodi nezetvaltaskor a script csak a sajat kompakt kartya- es
    avatarstilusait, valamint az elozo nezet meresi cache-eit engedi el. Ez a
    kozvetlen gombos es a presetbol erkezo nezetvaltast is lefedi.
  - A nezet DOM-ja utan egyetlen, 160 ms-os helyreigazitas fut; nem kerult be uj
    observer vagy polling.
  - A v1114 szeles mutation-alapu identitas-cache ervenytelenites kikerult. A
    meglevo celzott player observer es a media `load` esemeny maradt.
  - Az altalanos settle-pass az azonnali futas utan egyetlen 180 ms-os
    ellenorzest vegez; a 90/720 ms-os ketto kesleltetett pass es az ismetlodo
    `document.fonts.loadingdone` figyelo kikerult.
- Szandekosan erintetlen:
  - A mukodokent visszajelzett GIF-kompatibilitas es dobaskartya-lane.
  - A v1005/v1011 kartya-, Undo/Next- es jatekoskartya-geometria.
  - Tipp/Checkout, helyi hatter, tabla/falvedo, marker, glow, history,
    Undo-adatkezeles es dobasjavitas.
  - React/Autodarts DOM-elemek; nincs uj klonozas, athelyezes vagy torles.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.79-v1115-view-transition-average-performance`.
  - `node --check src/Autodarts_CORE_v1115.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1114-v1115 statikus osszevetes szerint a `MutationObserver`,
    `setInterval`, `cloneNode`, `appendChild`, `insertBefore` es
    `replaceChildren` elofordulasok szama nem nott.
- Elo teszt szukseges:
  - Eredeti Autodarts nezet egy es ket jatekossal: az atlagsor a nev- es
    pontszam-oszlop tengelyeben maradjon, a historyt ne fedje.
  - Ketoldalas CORE es Eredeti Autodarts nezet kozotti oda-vissza valtas
    oldalfrissites nelkul, valamint presetbol inditott valtas.
  - Hosszabb jatek alatti sebesseg, animaciok es kartyaertek-valtasok.

### v1116 - Atomi nezetvaltas es vegleges avatarpass

- Datum: 2026-07-14
- Fajl: `src/Autodarts_CORE_v1116.user.js`
- Alap: `src/Autodarts_CORE_v1115.user.js`
- Elo teszttel megerositett v1115 eredmenyek:
  - Az atlagsor mar megfelelo minden kiprobalt nezetben.
  - A korabbi oldal- es animaciolassulas megszunt.
- Jelzett hibak:
  - Eredeti es ketoldalas nezet kozotti valtaskor a korabbi nezetbol bent maradt
    CORE-geometria miatt az Undo/Next remegett, az avatar hattere visszafeheredett,
    es az oldal csak frissites utan allt vegleges helyre.
  - A bot nativ ikonja korul nem maradt meg megbizhatoan a szurke kor.
  - Harom-hat jatekos kompakt nevsoraban a nev kapszulaja magasabb lehetett a
    set/leg jelzo zold mezojenel.
- Javitas:
  - Nezetvaltaskor mindket iranyban torlodik minden CORE-tulajdonu, nezetfuggo
    panel-, avatar-, dobaskartya- es Undo/Next-pozicioallapot, tovabba a fuggoben
    levo régi geometriai RAF/idozito futasok.
  - A celnezet gyokerosztalyai azonnal frissulnek, majd ket kepkocka utan es egy
    220 ms-os vegso ellenorzesben ugyanaz a celzott elrendezesi lanc fut le.
  - A kompakt avatar minden erdemi geometria-, DOM- vagy kepvaltozas utan
    idempotensen ujra normalizalodik: emberi PNG-n atlatszo hatter, botnal az
    eredeti ikon mogott szurke kor marad. Azonos cache-allapotnal nincs uj meres.
  - A kompakt nev kapszulaja a tenyleges zold set/leg jelzo magassagat veszi at.
  - A hatterkepet hordo avatar-elemek `background-image` tulajdonsagat a script
    mar nem torli a feher keret eltavolitasakor.
- Szandekosan erintetlen:
  - A v1115-ben elfogadott atlagsor-igazitas es teljesitmenyjavitas.
  - A mukodo GIF-kompatibilitas, dobaskartya-lane, Tipp/Checkout es history.
  - A tabla, falvedo, marker, glow, dobasjavitas es helyi hatterfeltoltes.
  - React/Autodarts DOM-elemek; nincs uj klonozas, athelyezes vagy torles.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.80-v1116-atomic-view-transition-avatar`.
  - `node --check src/Autodarts_CORE_v1116.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1115-v1116 statikus osszevetesben a `MutationObserver`, `setInterval`,
    `cloneNode` es `appendChild` elofordulasok szama nem nott.
- Elo teszt szukseges:
  - Eredeti -> ketoldalas -> eredeti valtas oldalfrissites nelkul.
  - Undo/Next stabil pozicio valtas utan es az elso dobast kovetoen.
  - Atlatszo emberi avatar, szurke koros bot ikon, valamint azonos magassagu
    set/leg es nev kapszula harom-hat jatekosnal.
  - Atlag, GIF, animaciosebesseg es dobaskartya-lane regresszioellenorzese.

### v1117 - Nativ tabla-visszaallitas, botkor es egyjatekos ketoldalas nezet

- Datum: 2026-07-15
- Fajl: `src/Autodarts_CORE_v1117.user.js`
- Alap: `src/Autodarts_CORE_v1116.user.js`
- Elo teszttel megerositett v1116 eredmenyek:
  - Az emberi avatar es a nevmezok magassaga helyreallt.
  - Az oldal sebessege es teljesitmenye megfelelo.
- Jelzett hibak:
  - Ketoldalas CORE nezetbol Eredeti Autodarts nezetre valtva a tabla es mas
    geometriai allapotok csak oldalfrissites utan alltak helyre.
  - A bot ikonja mogul tovabbra is hianyzott a nativ megjeleneshez tartozo
    szurke kor.
  - Egyjatekos merkozesben a Ketoldalas CORE nezet nem tette oldalra az egyetlen
    jatekoskartyat.
- Feltart okok:
  - A v92 kozvetlen inline meretet irt a nativ tabla SVG-re es legfeljebb harom
    szuloelemere, de Eredeti nezetben ezeket nem allitotta vissza.
  - A v94-v100 regebbi dobaskartya- es Undo/Next-geometriai RAF/idozito reteg
    egy reszet a v1116 nezetvaltas meg nem torolte.
  - A vegso avatarpass a szurke hatter beallitasa utan ugyanazon bot SVG
    hatteret atlatszora irhatta.
  - A ketoldalas elrendezest a paneldarabszam `>= 2` feltetele egy jatekosnal
    kikapcsolta.
- Javitas:
  - A ketoldalas meretezes elott a script elmenti a tabla es erintett nativ
    szulok pontos inline ertekeit es prioritasaikat. Eredeti nezetre valtaskor
    ezeket oldalfrissites nelkul, eredeti allapotukban allitja vissza.
  - Nezetvaltaskor a v94-v100 fuggoben maradt RAF/idozito futasai is leallnak,
    es a hozzajuk tartozo sajat inline geometria torlodik.
  - Ha maga a bot SVG a kor celpontja, a vegso avatarpass mar megtartja rajta a
    szurke korhatteret.
  - A Ketoldalas CORE elrendezes egy jatekoskartyaval is aktiv; az egyetlen
    kartya a mar meglevo bal oldali kartya-geometriat hasznalja.
- Szandekosan erintetlen:
  - A v1116-ban helyreallt emberi avatar, nevkapszula es teljesitmeny.
  - Atlag, GIF, dobaskartya-lane, Tipp/Checkout, history es Undo-adatkezeles.
  - Tabla/falvedo grafika, marker, glow, dobasjavitas es helyi hatterfeltoltes.
  - React/Autodarts DOM-elemek; nincs uj klonozas, athelyezes vagy torles.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.81-v1117-view-restore-single-player-bot`.
  - `node --check src/Autodarts_CORE_v1117.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1116-v1117 statikus osszevetesben a `MutationObserver`, `setInterval`,
    `cloneNode`, `appendChild`, `insertBefore` es `replaceChildren`
    elofordulasok szama nem nott.
- Elo teszt szukseges:
  - Ketoldalas -> Eredeti -> Ketoldalas valtas oldalfrissites nelkul, hat
    jatekossal is.
  - Nativ tabla merete, dobaskartyak es Undo/Next stabilitasa minden valtas utan.
  - Szurke koros bot ikon harom-hat jatekosnal.
  - Egyjatekos Ketoldalas CORE nezet: bal oldali jatekoskartya es szabad kozepso
    jatekter.

### v1118 - Elo kartyasor-ujrakotes es egyjatekos history

- Datum: 2026-07-15
- Fajl: `src/Autodarts_CORE_v1118.user.js`
- Alap: `src/Autodarts_CORE_v1117.user.js`
- Elo teszttel megerositett v1117 eredmenyek:
  - Az egyjatekos Ketoldalas CORE nezet mar a bal oldali kartya-geometriat
    hasznalja.
  - Az emberi avatar es a nevmezok magassaga, valamint az oldal teljesitmenye
    megfelelo maradt.
- Jelzett hibak:
  - Egy jatekosnal a dobaskartyak hozzaertek a bal oldali jatekoskartyahoz, a
    history pedig a kicsi nativ mezoben, rossz helyen maradt.
  - Ket jatekosnal az aktiv jatekos elso valtasa utan a React altal ujra letrehozott
    nev-, pontszam- es atlagsor elveszitette a CORE-geometriat, ezert a tartalom
    osszecsuszott.
  - A bot ikon mogotti szurke kor nem maradt megbizhatoan lathato.
  - Jateknezet-valtas utan a nativ es CORE elemek merese nem minden esetben futott
    le az uj DOM vegleges allapotan; az oldal csak kezi frissites utan allt helyre.
- Javitas:
  - Az elfogadott sajat history renderer egyetlen bal oldali jatekoskartyaval is
    felcsatolodik, a ketjatekos history- es Undo-egyeztetes valtozatlan maradt.
  - Egy jatekosnal a kozepso dobassav mindket oldalan 20-32 px adaptiv belso
    tavolsag marad; a tabla merete es a ketjatekos geometria nem valtozik.
  - A meglevo celzott player-frissites utan az aktualis, React altal letrehozott
    egy- vagy ketjatekos nev-, pontszam- es atlagsor ujra megkapja a mar elfogadott
    CORE tartalomgeometriat. Nem kerult be uj observer vagy polling.
  - A bot avatar vegso normalizalasa megtartja az eredeti ikont, mogotte fix
    szurke korrel, atlatszo belso ikonhatterrel.
  - Valodi nezetvaltas utan a vegleges DOM-on egyszer lefut a gyokerosztalyok,
    geometriai cache-ek, kartyasorok, avatarok, GIF-ek es akciogombok celzott
    helyreigazitasa. A `dom-settled` fazis generacionkent egyetlen nativ
    `resize` esemenyt kap, hogy az Autodarts is ujramerje a sajat elemeit.
- Szandekosan erintetlen:
  - A v1005/v1011 dobaskartya-, Undo/Next- es jatekoskartya-geometria ket
    jatekosnal.
  - A mar elfogadott emberi avatar, nevkapszula, atlagsor es teljesitmeny.
  - Tipp/Checkout, GIF, tabla/falvedo, marker, glow, dobasjavitas, helyi hatter
    es history Undo-adatkezeles.
  - React/Autodarts DOM-elemek; nincs uj klonozas, athelyezes vagy torles.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.82-v1118-live-view-single-history`.
  - `node --check src/Autodarts_CORE_v1118.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1117-v1118 statikus osszevetesben a `MutationObserver`, `setInterval`,
    `cloneNode`, `appendChild`, `insertBefore` es `replaceChildren`
    elofordulasok szama nem nott.
- Elo teszt szukseges:
  - Egyjatekos Ketoldalas CORE: teljes meretu bal oldali history es res a
    jatekoskartya, illetve dobaskartyak kozott.
  - Ketjatekos Ketoldalas CORE: tobbszori jatekosvaltas utan se csusszon ossze a
    nev-, pontszam- vagy atlagsor.
  - Szurke koros bot ikon minden jatekosszamnal.
  - Ketoldalas -> Eredeti -> Ketoldalas valtas oldalfrissites nelkul; tabla,
    dobaskartyak, Undo/Next, avatarok es GIF-ek maradjanak stabilak.

### v1119 - Ketjatekos elo kartyatartalom es felso el stabilizalasa

- Datum: 2026-07-15
- Fajl: `src/Autodarts_CORE_v1119.user.js`
- Alap: `src/Autodarts_CORE_v1118.user.js`
- Elo teszttel megerositett v1118 eredmenyek:
  - Az egyjatekos Ketoldalas CORE elrendezes es a sajat history mar megjelenik.
  - Az oldal teljesitmenye megfelelo maradt.
- Jelzett hibak:
  - Ket jatekosnal a dobaskartyak felso ele lejjebb kerult a jatekoskartyak
    felso elenel.
  - Az elso jatekosvaltas utan a nev- es pontszamblokk lecsuszhatott a historyra,
    majd ebben az osszecsuszott allapotban maradt.
  - A bot ikon szurke kore mar kozelitett a nativ kinezethez, de meg tul kicsi
    lehetett.
  - Nezetvaltas utan maradhatott elozo nezetbol szarmazo kartyatartalom-kotes,
    ezert a vegleges allapot csak oldalfrissites utan allt helyre.
- Feltart ok:
  - React jatekosvaltaskor egy rövid renderfazisban a korabbi es az uj belso
    kartyatartalom is jelen lehetett. A szinkron ujrakotes mindket belso elemen
    meghagyhatta a CORE abszolut tartalomgeometriajat.
  - A dobassav felso pozicioja csak az alap v1005/v1011 eltolast hasznalta, nem
    a tenylegesen kirajzolt jatekoskartya felso elet.
  - A bot kor merete a betumeretbol, nem a tenyleges nevsor magassagabol indult.
- Javitas:
  - A script csak a sajat, mar nem aktualis v91 tartalom-, nev-, pontszam- es
    atlagsor-osztalyait, valamint a hozzajuk tartozo sajat CSS-valtozokat engedi
    el. React/Autodarts DOM-elemet nem mozgat, nem klonoz es nem torol.
  - Player-frissites, geometriaalkalmazas es nezetvaltas utan osszevont, ket
    kepkockas vegso pass az aktualis belso kartyatartalmat koti vissza. Nem kerult
    be uj observer, polling vagy idozito.
  - Ket jatekosnal a dobaskartyak tenyleges felso ele a bal oldali jatekoskartya
    felso elehez kap egy legfeljebb 48 px-es mert korrekciot. A v1005/v1011
    alapgeometria maradt a kiindulopont.
  - A bot szurke kore a tenyleges nevsor magassaganak 72%-abol szamolodik,
    22-36 px kozotti merettel; a nativ robot ikon a kor kozepen marad.
  - Nezetvaltas kezdeten a fuggoben levo vegso pass es az elozo felso korrekcio
    torlodik, a celnezet vegleges DOM-jan pedig uj, egyetlen kotest kap minden
    aktualis kartyasor.
- Szandekosan erintetlen:
  - A mukodo egyjatekos history es a history/Undo adatkezeles.
  - A dobaskartyak elfogadott vizszintes kiosztasa, ertekkozepre igazitas,
    Tipp/Checkout es keretmentes megjelenes.
  - Tabla/falvedo, marker, glow, GIF, dobasjavitas es helyi hatterfeltoltes.
- Ellenőrzés:
  - Metadata es belso `SCRIPT_VERSION`:
    `2.6.83-v1119-two-player-live-card-stability`.
  - `node --check src/Autodarts_CORE_v1119.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1118-v1119 statikus osszevetesben a `MutationObserver`, `setInterval`,
    `cloneNode`, `appendChild`, `insertBefore` es `replaceChildren`
    elofordulasok szama nem nott.
- Elo teszt szukseges:
  - Ketjatekos Ketoldalas CORE: dobaskartya es jatekoskartya felso el egy vonalban.
  - Az elso, majd legalabb harom tovabbi jatekosvaltas utan a nev, pontszam es
    atlagsor ne csusszon a historyra.
  - Bot ellenfelnel a nativhoz kozeli szurke kor es kozepre zart robot ikon.
  - Ketoldalas -> Eredeti -> Ketoldalas valtas oldalfrissites nelkul; a tabla,
    kartyatartalom, avatar es Undo/Next maradjon stabil.

### v1120 - Passziv ketjatekos elso-valtas diagnosztika

- Datum: 2026-07-15
- Fajl: `src/Autodarts_CORE_v1120.user.js`
- Alap: `src/Autodarts_CORE_v1119.user.js`
- Verzioszoveg: `2.6.84-v1120-passive-two-player-switch-diagnostics`
- A v1119 elo teszt eredmenye:
  - Ket jatekossal a kezdoallapot jo, de az elso aktivjatekos-valtaskor a
    jatekoskartya sarkai nagyobb sugarra valtanak.
  - Ugyanekkor a nev- es pontszamblokk visszaugrik a kartya kozepe/bal oldala
    fele, es ralep a history teruletere.
  - Bot ellenfelnel a dobaskartyasor felso ele lejjebb kerul, mint a
    jatekoskartya felso ele.
  - A bot ikon szurke kore tovabbra sem egyezik a kivant nativ megjelenessel.
- Bizonyitott gyanus pont:
  - A v67/v84/v91/v1109 felismeres az elso megtalalt
    `.ad-ext-player-score` es `.ad-ext-player-name` elembol indul.
  - A nagyobb sarok csak akkor jelenhet meg, ha az aktualis panelrol lemarad az
    `ad-core-v91-card` kotes, vagy a script egy mar lecserelt belso React-agra
    koti a tartalomosztalyokat.
  - A v1119 ugyanezt az elso-talalat alapu feloldast futtatta ujra, ezert a ket
    kepkockas ujraproba nem tudta megszuntetni a gyokerokot.
- Hozzaadott passziv meres:
  - A script elmenti a ketjatekos kezdoallapotot azonnal es ket animacios
    kepkocka utan.
  - Az elso aktivjatekos-valtaskor uj mintat keszit azonnal, egy kepkocka,
    ket kepkocka es 250 ms utan.
  - Mintankent rogzitve van mindket panel osztalya, sarka, merete, pozicioja,
    minden pontszam-/nevjelolt, a script altal tenylegesen feloldott
    content/name/score/avg ag, a history, az avatarjeloltek, a botfelismeres,
    valamint a dobaskartyasor merete es felso korrekcioja.
  - A meres nem allit stilust, nem mozgat React-elemet, nem ad hozza
    `MutationObserver`-t, pollingot vagy folyamatos idozitot.
- Diagnosztika kimentese az elso jatekosvaltas utan:
  - Firefox fejlesztoi konzolban:
    `window.__AD_CORE_COPY_V1120_DIAGNOSTICS__()`
  - A teljes szoveg tartalek valtozoja:
    `window.__AD_CORE_V1120_TWO_PLAYER_DIAGNOSTICS_TEXT__`
- Szandekosan erintetlen:
  - A kartyak jelenlegi CSS-e, geometriaja, saroksugara es tartalompozicioja.
  - A botikon merete/szine; ebben a verzioban csak a tenylegesen kivalasztott
    elem es annak stilusa kerul naplozasra.
  - History/Undo, Tipp/Checkout, GIF, tabla/falvedo, marker, glow,
    dobasjavitas es helyi hatter.
- Ellenőrzés:
  - `node --check src/Autodarts_CORE_v1120.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1119-v1120 statikus osszevetesben a `MutationObserver`, `setInterval`,
    `cloneNode`, `appendChild`, `insertBefore` es `replaceChildren`
    elofordulasok szama nem nott.
- Elo teszt szukseges:
  - Ketoldalas CORE, pontosan ket jatekos, kozuluk legalabb az egyik bot.
  - Egy teljes elso kor utan, amikor mar a masodik jatekos az aktiv, a fenti
    konzolfuggvennyel ki kell masolni es visszaadni a diagnosztikat.

### v1121 - Egykattintasos diagnosztika-kimentes

- Datum: 2026-07-15
- Fajl: `src/Autodarts_CORE_v1121.user.js`
- Alap: `src/Autodarts_CORE_v1120.user.js`
- Verzioszoveg: `2.6.85-v1121-one-click-two-player-diagnostics`
- Indok:
  - A Firefox konzoljat folyamatos hibauzenetek teszik hasznalhatatlanna, ezert
    a v1120 konzolparancsos kimentese a felhasznalonak nem elerheto.
- Modositas:
  - Az elso ketjatekos aktivjatekos-valtas teljes merese utan egy ideiglenes,
    CORE-stilusu `Diagnosztika masolasa` gomb jelenik meg az oldal aljan.
  - Egy kattintas a teljes JSON szoveget a vagolapra masolja.
  - Ha a Firefox blokkolja a vagolapot, a script automatikusan
    `Autodarts_CORE_v1121_two_player_diagnostics.txt` fajlkent menti.
  - Sikeres kimentes utan a gomb visszajelzest ad, majd 2,6 masodperc mulva
    eltunik.
  - A gomb script-sajat elem; React/Autodarts elemet nem mozgat, nem klonoz es
    nem torol.
- Szandekosan erintetlen:
  - A v1120 passziv mintavetele es minden jatekmeneti/kartya CSS.
  - Player-, dobaskartya-, history-, tabla-, GIF- es javitasi mukodes.
- Ellenőrzés:
  - `node --check src/Autodarts_CORE_v1121.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
- Elo teszt:
  - Ketoldalas CORE, pontosan ket jatekos, kozuluk legalabb az egyik bot.
  - Az elso jatekosvaltas utan megjeleno gombbal kell kimenteni es visszakuldeni
    a diagnosztikat.

### v1122 - Elo kulso jatekonkartyak ujrakotese

- Datum: 2026-07-15
- Fajl: `src/Autodarts_CORE_v1122.user.js`
- Alap: `src/Autodarts_CORE_v1119.user.js`
- Verzioszoveg: `2.6.86-v1122-live-outer-card-rebind`
- A v1121 elo diagnosztikajanak bizonyiteka:
  - Az alapallapot masodik animacios kepe utan mindket kulso jatekos panelen
    jelen volt az `ad-core-v91-card` osztaly es 8 px volt a sarokkerekites.
  - Az elso aktivjatekos-valtasnal az Autodarts felcserelte/ujra letrehozta a
    ket kulso panelt. Az uj elo elemeken az `ad-core-v91-card` osztaly mar a
    valtas utani 250 ms-os mintaban sem jelent meg, a sarokkerekites 22 px-re
    allt vissza.
  - A belso CORE score/name/average osztalyok megmaradtak, de a hianyzo kulso
    osztaly miatt a tartalom `position:absolute` helyett `position:static`
    lett. Ez bizonyitotta a nev- es pontszamblokk historyra ugrasat.
  - A bot avatar merete a mar 1,8-szorosra nagyitott, 79 px-es nevsorbol lett
    ujra kiszamolva, ezert 65 px-re nott, mikozben az emberi avatar 43 px volt.
- Modositas:
  - A meglevo ket animacios kepes stabilizalas csak akkor futtatja ujra a mar
    bevallt teljes CORE-geometriat, ha egy elo egy- vagy ketjatekos kulso panel
    elvesztette az `ad-core-v91-card` osztalyt.
  - A geometria gyorsitotar allapota ilyenkor egyszer ervenytelenedik, majd az
    aktualis React-panelek ujra feloldodnak; uj observer vagy polling ciklus nem
    kerult a scriptbe.
  - A bot avatar alapmerete most a skala elotti szamitott betumeretbol keszul,
    igy a szulo nagyitasa nem ervenyesul rajta ketszer.
- Szandekosan erintetlen:
  - Dobas- es osszkartyak, history/Undo, tabla/falvedo, GIF, javitas, hatter es
    minden menu- illetve csuszka-beallitas.
  - A v1119 elfogadott ketjatekos geometria es Undo/Next felso igazitas.
- Ellenőrzés:
  - `node --check src/Autodarts_CORE_v1122.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1119-v1122 diff csak a verzioszoveget, a bot avatar meretszamitasat es
    az elo kulso panel felteteles ujrakoteset tartalmazza.
- Elo teszt szukseges:
  - Ketoldalas CORE, pontosan ket jatekos, legalabb egy bot; az elso es tobbedik
    aktivjatekos-valtasnal a tartalom, sarokkerekites es dobaskartya felso ele.
  - Ketiranyu jateknezet-valtas, valamint egyjatekos ketoldalas nezet.

### v1123 - Kulon aktivjatekos-valtas ujrakotes

- Datum: 2026-07-16
- Fajl: `src/Autodarts_CORE_v1123.user.js`
- Alap: `src/Autodarts_CORE_v1122.user.js`
- Verzioszoveg: `2.6.87-v1123-dedicated-player-switch-rebind`
- Elo eredmeny a v1122-rol:
  - A felhasznaloi tesztben sem a kartyatartalom ugrasaban, sem a bot ikonban
    nem jelent meg lathato valtozas.
- Okpontositas:
  - A v1121 diagnosztika sajat, nem torolt mintavetele biztosan eszlelte a nativ
    aktiv index `0 -> 1` valtasat.
  - A v1122 javitasa ezzel szemben a minden koztes annotalasnal torolt es ujra
    utemezett altalanos stabilizalas resze maradt, ezert a React-valtas kozben
    nem volt garantalt a vegrehajtasa.
- Modositas:
  - A script ugyanarra az `annotatePlayerCardInfo` futasi utra kotott egy kulon
    aktivindex- es panelsorrend-figyelest, amelyen a v1121 a valtasat bizonyitotta.
  - Valodi valtas vagy hianyzo kulso geometriai osztaly eseten az ujrakotes
    azonnal, ket animacios kep alatt, majd egyszer 260 ms utan ellenoriz.
  - A korlatozott folyamatot a koztes React-annotalasok nem torlik es nem
    inditjak ujra; uj `MutationObserver`, `setInterval` vagy polling nincs.
  - A teljes geometria tovabbra is csak akkor fut, ha az elo egy- vagy
    ketjatekos panelrol tenylegesen hianyzik az `ad-core-v91-card` osztaly.
  - A v1122 skala elotti bot-avatar meretszamitasa valtozatlanul megmaradt.
- Szandekosan erintetlen:
  - Dobas- es osszkartyak, history/Undo, tabla/falvedo, GIF, javitas, hatter,
    beallitasok es a mar elfogadott ketoldalas geometria.
- Ellenőrzés:
  - `node --check src/Autodarts_CORE_v1123.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
- Elo teszt szukseges:
  - Ketoldalas CORE ket jatekossal, legalabb egy bottal: az elso jatekosvaltas
    utan a nev/pont maradjon a helyen, a sarok 8 px-es es a bot ikon kompakt.
  - Ezutan legalabb meg egy teljes kor es ketiranyu jateknezet-valtas.

### v1124 - Nativ bot-avatar es felso HUD tavolsag

- Datum: 2026-07-16
- Fajl: `src/Autodarts_CORE_v1124.user.js`
- Alap: `src/Autodarts_CORE_v1123.user.js`
- Verzioszoveg: `2.6.88-v1124-native-bot-avatar-hud-clearance`
- Elo teszttel megerositett v1123 eredmeny:
  - Az aktiv jatekos valtasa utani kartya- es tartalomgeometria helyreallt.
  - Nyitott vizualis hiba maradt a bot ikonon es a felso menursor a
    dobaskartyak felso elehez ert.
- Kepalapu meres:
  - Az aktualis es a kert bot-kor egyarant 43x43 pixeles volt, ezert a kor
    merete valtozatlan maradt.
  - A kert kor szine `rgb(45,55,72)`, az aktualis `rgb(52,65,84)` volt.
  - A kert robotjel 25x22, az aktualis 22x19 pixeles lathato meretet adott.
- Modositas:
  - A bot-avatar hattere minden meglevo avatar-normalizalasi agon azonos,
    `rgba(45,55,72,.98)` szint kapott.
  - A robotjel aranya 58%-rol 66%-ra nott, mikozben a mar helyes kormeret,
    nevsor- es jatekoskartya-geometria nem valtozott.
  - Az egy-ket jatekos Ketoldalas CORE nezet felso HUD sora 10-14 pixellel
    feljebb kerul, igy nem er a dobaskartyakhoz. A dobaskartyak pozicioja es
    merete valtozatlan.
- Szandekosan erintetlen:
  - Jatekoskartya-tartalom, history, Undo/Next, dobaskartya, tabla/falvedo,
    GIF, javitas, hatter es minden beallitas.
  - React/Autodarts DOM-elemek; nincs uj observer, polling, klonozas vagy
    elemmozgatas.
- Ellenőrzés:
  - `node --check src/Autodarts_CORE_v1124.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1123-v1124 statikus osszevetesben a `MutationObserver`, `setInterval`,
    `cloneNode`, `appendChild`, `insertBefore` es `replaceChildren`
    elofordulasok szama nem valtozott.
- Elo teszt szukseges:
  - Bot nevsor szine es robotjel-merete Ketoldalas CORE nezetben.
  - Felso menursor es dobaskartyak kozotti res normal, Tipp/Checkout es ures
    dobaskartya-allapotban.

### v1125 - Stabil eredeti-nezet visszaallitas, meresalapu HUD es kozepre zart bot ikon

- Datum: 2026-07-16
- Fajl: `src/Autodarts_CORE_v1125.user.js`
- Alap: `src/Autodarts_CORE_v1124.user.js`
- Verzioszoveg: `2.6.89-v1125-view-restore-hud-bot-center`
- Elo teszttel megerositett v1124 eredmeny:
  - A ketjatekos kartya- es tartalomgeometria, az oldal teljesitmenye es a
    dobaskartyak menuvel valo utkozese helyreallt.
  - Nyitott hiba maradt a Ketoldalas CORE -> Eredeti Autodarts valtas utan a
    Tools zoomkartyak es az Undo/Next poziciojaban; frissites helyreallitotta.
  - A bot kore es szine jo lett, de a robotjel a kor bal oldalan maradt.
- Okpontositas:
  - A nezeti atmenet mar torolte az altalanos akciogomb-geometriat, de a CORE
    altal rogzitett Tools zoom- es kamerakartya inline mereteit/pozicioit nem.
  - Emiatt az eredeti nezet elso merese meg a Ketoldalas CORE korabbi
    tartodobozat hasznalhatta, es ezt a hibas merest tartotta meg frissitesig.
  - A bot avatar celpont flex sora ket gyereket es 8 px-es `gap` erteket
    tartalmazott; a kulso kor kozepre igazitasat ez belul felretolta.
- Modositas:
  - Az eredeti nezetre valtaskor csak a CORE altal megjelolt zoom-, kamera- es
    akciogomb-poziciok szabadulnak fel; a React/Autodarts elemek nem mozognak.
  - A Tools zoom ujramerese a 220 ms-os DOM-rendezodes es egyetlen, korlatozott
    100 ms-os zarolepes utan fut. A korai meres addig fel van fuggesztve.
  - A zarolepes generaciovedett, ezert gyors oda-vissza nezetvaltasnal egy régi
    idozito nem irhatja felul az uj nezetet.
  - A bot sajat belso ikon-tartoja abszolut, teljes kor meretu kozepre zarast
    kapott; az emberi PNG avatar es a nevsor merete valtozatlan.
  - A felso HUD helye a lathato jatekoskartyak teteje es a nezeti terulet teteje
    kozotti szabad helybol merodik, minden felbontason ugyanazzal a szaballyal.
  - Az egy- es ketjatekos Ketoldalas CORE dobaskartya-felso igazitas tartomanya
    `-96..96 px`, igy alacsonyabb felbontason sem marad a jatekoskartya alatt.
- Szandekosan erintetlen:
  - Jatekoskartya-tartalom, history/Undo logika, tabla/falvedo, GIF, javitas,
    hatter, Tip/Checkout, osszkartya es minden menu- illetve csuszkaertek.
  - Nincs uj observer, polling, `setInterval`, klonozas vagy React-elemmozgas.
- Ellenőrzés:
  - `node --check src/Autodarts_CORE_v1125.user.js`: sikeres.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1124-v1125 osszevetesben a `MutationObserver`, `setInterval`,
    `cloneNode`, `insertBefore` es `replaceChildren` elofordulasok szama
    valtozatlan; `git diff --check` nem jelzett whitespace hibat.
- Elo teszt szukseges:
  - Ketoldalas CORE -> Eredeti Autodarts -> Ketoldalas CORE -> Eredeti
    Autodarts, oldalfrissites nelkul, bekapcsolt Tools zoommal.
  - Ures, normal es Tipp/Checkout dobaskartyak mellett Undo/Next, bot ikon es
    HUD tavolsag WQHD-n, majd egy kisebb felbontason.

### v1126 - Teljes zoomkartya-magassag es tenyleges HUD-sor igazitas

- Datum: 2026-07-16
- Fajl: `src/Autodarts_CORE_v1126.user.js`
- Alap: `src/Autodarts_CORE_v1125.user.js`
- Verzioszoveg: `2.6.90-v1126-hud-anchor-zoom-height`
- Elo teszttel megerositett v1125 eredmeny:
  - Eredeti Autodarts nezetre valtaskor a Tools zoomsor kb. 60 px magas maradt,
    mikozben oldalfrissites utan felvette a dobaskartyak kb. 90 px-es
    magassagat.
  - A felso menursor tovabbra is tul kozel maradt a dobaskartyak tetejehez.
- Okpontositas:
  - Az eredeti nezetben a ketoldalas CORE dobaskartya-gyujtoje szandekosan nem
    aktiv, ezert az elozo zoom-ujrameresi ag ott ures forraslistat kapott.
  - A nativ Tools zoom kulso kartya, a belso `adt-zoom` tarto es annak egyetlen
    rendereloje igy megorizhette a valtas elotti, kb. 60 px-es magassagot.
  - Az egyszeri zaromerest koveto kesobbi Tools/React meretvaltas mar nem
    inditott eredeti-nezetre ervenyes uj merest.
  - A korabbi HUD-szelektor a tenyleges gombsor mellett egy nagy, teljes
    jateknezetet tartalmazo szulot is celzott, ezert nem volt megbizhato a
    lathato menursor elmozdulasa.
- Modositas:
  - Eredeti nezetben a nativ felso dobaskartyak a mar bizonyitott altalanos
    kartya-felismeressel merodnek, fuggetlenul a ketoldalas elrendezes
    kapcsolojatol.
  - A harom zoomkartya ezt a dobaskartya-magassagot kapja; a sajat belso
    tartoja es kep-/canvas-/video-rendereloje is teljes magassagra feszul.
  - A csak eredeti nezetben alkalmazott inline magassagok mentve vannak, es
    ketoldalas nezetre visszavaltaskor visszaallnak.
  - Eredeti nezetre valtas utan harom rövid, generaciovedett ujrameres fut
    `180/420/760 ms` kesleltetessel, majd leall; nincs folyamatos figyeles.
  - A HUD-kereses a lathato, legalabb negy vezerlot tartalmazo valodi gombsort
    valasztja ki, es csak annak sajat `translate` erteket allitja.
  - A sor teteje a viewport teteje es a legfelso lathato jatekoskartya teteje
    kozotti szabad sav kozepere kerul minden nezetben es felbontason.
- Szandekosan erintetlen:
  - Jatekoskartya-tartalom, history/Undo logika, dobaskartya-adatok, tabla es
    falvedo, GIF, javitas, Tip/Checkout, hatter es minden menu-/csuszkaertek.
  - React/Autodarts DOM-elemek; nincs klonozas, athelyezes vagy torles.
- Ellenőrzés:
  - `node --check src/Autodarts_CORE_v1126.user.js`: sikeres a Codexhez
    csomagolt Node.js futtatoval.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1125-v1126 osszevetesben a `MutationObserver`, `setInterval`,
    `cloneNode`, `insertBefore` es `replaceChildren` elofordulasok szama
    valtozatlan; a fajlpar `git diff --check` vizsgalata nem jelzett
    whitespace hibat.
- Elo teszt szukseges:
  - Ketoldalas CORE -> Eredeti Autodarts valtas Tools zoommal, majd ugyanennek
    ellenorzese oldalfrissites nelkul normal, ures es Tipp/Checkout dobasnal.
  - Felso menursor kozepes tavolsaga WQHD-n es egy kisebb felbontason.

### v1127 - Nativ Tools zoommeret es kozos kep-jelolo koordinata

- Datum: 2026-07-16
- Fajl: `src/Autodarts_CORE_v1127.user.js`
- Alap: `src/Autodarts_CORE_v1126.user.js`
- Verzioszoveg: `2.6.91-v1127-native-tools-zoom`
- Elo teszttel bizonyitott v1126 regresszio:
  - Eredeti nezetben az elso zoomkartya elfoglalta a teljes zoomsort, a masodik
    es harmadik kartya pedig hajszalvekonyra zsugorodott.
  - A zoomkep es a kek dobasjelolo minden nezetben eltero meretezest kapott,
    ezert a pont nem ugyanazt a tablapoziciot mutatta, mint a fo tablan.
- Ok:
  - A v1126 a Tools sajat belso `img`/`canvas`/`svg` rendereloire es kozbenso
    tartoira is teljes szelesseget, teljes magassagot, flex novekedest es
    `object-fit: cover` meretezest kenyszeritett.
  - A Tools a tablakepet es a kek jelolot kulon retegen, kozos sajat
    koordinatarendszerben rajzolja; csak a kep retegenek nyujtasa szetvalasztotta
    a ket koordinatarendszert.
- Modositas:
  - A CORE nem ir felul semmilyen Tools zoomszelesseget, -magassagot, flexet,
    belso tartot, kepet, canvast, SVG-t vagy `object-fit` erteket.
  - A v1126 altal beallitott zoom-attributumok es mentett inline magassagok
    minden igazitasnal visszaallnak.
  - Eredeti nezetre valtas utan a mar meglevo harom rövid, generaciovedett
    idopontban csak nativ `resize` esemeny indul, hogy maga a Tools szamolja ujra
    a harom egyforma kartyat es a jelolo koordinatait.
  - A v1126 tenyleges HUD-sor felismerese es pozicionalasa valtozatlan maradt.
- Szandekosan erintetlen:
  - Jatekoskartyak, dobaskartya-adatok, history/Undo, tabla/falvedo, GIF,
    javitas, Tip/Checkout, hatter es menu-/csuszkaertekek.
  - React/Autodarts es Tools DOM-elemek; nincs klonozas, athelyezes vagy torles.
- Elo teszt szukseges:
  - Harom egymas utani dobas eredeti es ketoldalas nezetben: mindharom
    zoomkartya azonos szelessege, valamint a kek pont es a fo tabla jelolojenek
    azonos szektorpozicioja.
  - Ketoldalas CORE -> Eredeti Autodarts valtas oldalfrissites nelkul.

### v1128 - Stabil zoommagassag es teljes tablarejtes

- Datum: 2026-07-17
- Fajl: `src/Autodarts_CORE_v1128.user.js`
- Alap: `src/Autodarts_CORE_v1127.user.js`
- Verzioszoveg: `2.6.92-v1128-zoom-height-board-hide`
- Modositas:
  - Eredeti Autodarts nezetben a CORE minden ujrameres utan elengedi a korabbi
    fix Tools-zoom pozicionalast, majd a harom tenyleges kozos zoomkartya kulso
    magassagat a harom dobaskartya mert magassagahoz igazitja.
  - A zoom belso kep-, canvas-, SVG- es jeloloretege valtozatlan marad, igy a
    v1127-ben helyreallitott kep-pont koordinatarendszer nem valik szet.
  - Az `Egyedi tabla` menube bekerult a `Tabla teljes elrejtese` kapcsolo.
    Bekapcsolva a gyari tabla, az egyedi tabla, a falvedo, a glow es a
    dobasjelolok egyutt tunnek el, mikozben a tabla helye megmarad.
  - A futasideju `SCRIPT_VERSION` es a metadata `@version` ujra ugyanazt a
    v1128 verzioszoveget hasznalja.
- Szandekosan erintetlen:
  - Jatekoskartyak, dobaskartya-adatok, history/Undo, GIF, javitas,
    Tip/Checkout, hatter, felso HUD es a mar helyes zoomkep-jelolo koordinatak.
  - React/Autodarts es Tools DOM-elemek; nincs klonozas, athelyezes vagy torles.
- Ellenőrzés:
  - `node --check src/Autodarts_CORE_v1128.user.js`: sikeres a Codexhez
    csomagolt Node.js futtatoval.
  - `scripts/validate-userscript.js`: metadata, `@match`, `@version` es
    JavaScript szintaxis sikeres.
  - A v1127-v1128 statikus diff nem jelzett whitespace hibat.
- Elo teszt szukseges:
  - Ketoldalas CORE -> Eredeti Autodarts valtas harom Tools zoomkartyaval,
    oldalfrissites nelkul.
  - A `Tabla teljes elrejtese` ki- es visszakapcsolasa gyari, egyedi es
    falvedos tablaallapotban.

### Elfogadott mukodesi alap - v1128

- Datum: 2026-07-17
- A felhasznaloi elo teszt alapjan a v1128 minden korabban javitott funkcioja
  megfeleloen mukodik; a tovabbi fejlesztesek kiindulopontja ez a teljes fajl.
- Egyetlen fennmaradt, kulon kezelt hiba az eredeti Autodarts nezet
  osszertek-kartyajanak pontatlan szovegkozepre igazodasa.

### v1129 - Eredeti nezet osszertek-kartyajanak kozepre igazitasa

- Datum: 2026-07-17
- Fajl: `src/Autodarts_CORE_v1129.user.js`
- Alap: az elfogadott `src/Autodarts_CORE_v1128.user.js`
- Verzioszoveg: `2.6.93-v1129-original-total-center`
- Statusz: a tovabbi fejlesztesek uj fajlalapja; az egyetlen uj igazitas
  bongeszoben meg ellenorizendo.
- Modositas:
  - Kizarolag eredeti Autodarts nezetben az osszertek nativ ertekfelulete a
    teljes kartya teruletet kitolto, ket tengelyen kozepre zart reteget kap.
  - Az ertek ugyanazt az optikai betumetrika-korrekciot hasznalja, mint a mar
    helyesen kozepre igazitott CORE osszertek.
- Szandekosan erintetlen:
  - Az osszeg kiszamitasa, nullazasa, betutipusa, merete, szine es hattere.
  - Dobaskartyak, jatekoskartyak, history/Undo, Undo/Next, Tools zoom, tabla,
    GIF, javitas, Tip/Checkout, felso menu es minden mas nezet geometriaja.
  - React/Autodarts DOM-elemek; nincs klonozas, athelyezes vagy torles.
- Ellenőrzés:
  - A metadata `@version` es a belso `SCRIPT_VERSION` egyezik:
    `2.6.93-v1129-original-total-center`.
  - A kozvetlen `node --check` JavaScript szintaxisellenorzes sikeres.
  - A projektvalidator a metadata fejlécet, az Autodarts `@match` sort es a
    verzioszoveget elfogadta; a sajat kulso szintaxisfolyamata a sandboxban nem
    indult el, ezt a sikeres kozvetlen `node --check` kulon ellenorizte.
  - A v1128-v1129 statikus diff nem jelzett whitespace hibat, es csak a
    verzioszoveget meg az eredeti nezet celzott osszertek-igazitasat tartalmazza.
- Elo teszt szukseges:
  - Eredeti Autodarts nezetben ures korben a `0`, majd egy-, ket- es
    haromdobasos osszertek vizszintes es fuggoleges kozepre igazodasa.

### v1130 - Erintokijelzos dobaskartya-szin es reszponziv GIF-celterulet

- Datum: 2026-07-17
- Fajl: `src/Autodarts_CORE_v1130.user.js`
- Alap: `src/Autodarts_CORE_v1129.user.js`
- Verzioszoveg: `2.6.94-v1130-touch-card-gif-consistency`
- Modositas:
  - Durva mutatoeszkozon, peldaul erintokijelzon, valamint hibrid erinto+eger
    Windows rendszeren a bongeszo tartosan aktiv `hover`, `focus`, `active` es
    nativ kijelolesi allapotai mar nem festik narancssargara a normal
    dobaskartyat. A narancssarga kijeloles tovabbra is megmarad a CORE
    tenyleges dobasjavito kijelolesenel.
  - A Tipp/Checkout kartya altal beallitott hatterszin tulajdonjoga kovetheto.
    Ha a reszponziv React nezet ugyanazt a DOM-elemet ujra normal
    dobaskartyakent hasznalja, a régi specialis hatter, ertekstilus es
    jeloloosztaly eltavolodik, ezert a kovetkezo dobas ismet a beallitott normal
    szint kapja.
  - A Tools GIF helyet mar nem a kis felbontason is hasznalt
    `left-0 + top-0 + size-full` segedosztaly donti el. A tukrozott es a nativ
    GIF a tenylegesen lathato jatekterhez/tablahoz igazodik; teljes nezetu
    reszponziv cel eseten a lathato tabla a tartalek celterulet.
  - A GIF-celterulet rövid futasideju diagnosztikaja a
    `window.__AD_CORE_V1130_GIF_TARGET__` objektumban erheto el.
- Szandekosan erintetlen:
  - A v1129 eredeti osszertek-kozepre igazitas, a jatekoskartya- es
    dobaskartya-geometria, Undo/Next, history/Undo, zoom, tabla, javitas,
    hatter, felso menu es minden csuszkatartomany.
  - React/Autodarts es Tools DOM-elemek; nincs klonozas, athelyezes vagy torles.
- Ellenőrzés:
  - A metadata `@version` es a belso `SCRIPT_VERSION` egyezik:
    `2.6.94-v1130-touch-card-gif-consistency`.
  - A kozvetlen `node --check` sikeres a Codexhez csomagolt Node.js futtatoval.
  - A `scripts/validate-userscript.js` minden metadata-, `@match`, verzio- es
    JavaScript-ellenorzese sikeres.
  - A v1129-v1130 statikus diff nem jelzett whitespace hibat.
- Elo teszt szukseges:
  - Lanlipu erintokijelzon harom normal dobassal, majd Tipp/Checkout utani
    elhibazott dobassal a beallitott normal es kijelolesi szinek ellenorzese.
  - Ugyanazzal a Tools GIF-fel WQHD es kis felbontasu teljes kepernyon a
    tabla/jatekterhez kotott meret es pozicio osszehasonlitasa.

### v1131 - Tools GIF-hely es azonnali osszertek-nullazas

- Datum: 2026-07-17
- Fajl: `src/Autodarts_CORE_v1131.user.js`
- Alap: `src/Autodarts_CORE_v1130.user.js`
- Verzioszoveg: `2.6.95-v1131-tools-gif-mode-and-total-reset`
- Modositas:
  - A CORE GIF-tukor a Tools sajat Shadow DOM retegenek feluliras elott mert
    tenyleges helyet es meretet koveti. Nem a dobast vegzo jatekosbol, a tabla
    helyebol vagy a felbontasbol talalja ki a teljes kepernyos/kartyak kozotti
    megjelenitest.
  - A Tools reteg eredeti inline geometriaja minden kompatibilitasi menet utan
    visszaall, az elozo GIF celterulete pedig az animacio lezarasakor torlodik.
    Igy az egyik jatekos GIF-pozicioja nem oroklodhet a kovetkezo animaciora.
  - Bizonyitott aktivjatekos-valtaskor az osszertek azonnal `0`-t mutat. A
    nullazo reteg addig marad aktiv, amig az uj kor dobaskartyai tenylegesen meg
    nem valtoznak, ezert lassabb gepen sem jelenhet vissza az elozo jatekos
    osszege egy koztes ujrarajzolas miatt.
  - A legutobb mert Tools GIF-celterulet a
    `window.__AD_CORE_V1131_GIF_TARGET__` diagnosztikai objektumban ellenorizheto.
- Szandekosan erintetlen:
  - A v1130 erintokijelzos dobaskartya-szinei, Tipp/Checkout szinek es kartyak.
  - Zoom, tabla, jatekoskartyak, history/Undo, Undo/Next, javitas, felso menu,
    hatter es minden csuszkatartomany.
  - React/Autodarts es Tools DOM-elemek; nincs klonozas, athelyezes vagy torles.
- Ellenőrzés:
  - A metadata `@version` es a belso `SCRIPT_VERSION` egyezik:
    `2.6.95-v1131-tools-gif-mode-and-total-reset`.
  - A kozvetlen `node --check` es a projekt teljes userscript-validatora sikeres.
  - A v1130-v1131 statikus diff nem jelzett whitespace hibat.
- Elo teszt szukseges:
  - Azonos Tools GIF-beallitassal sajat es ellenfel dobasa WQHD, illetve Lanlipu
    teljes kepernyos nezetben.
  - Jatekosvaltas utan az osszertek azonnali `0`-ra valtasa, majd az uj jatekos
    elso dobasa utan a helyes uj osszeg megjelenese.

### v1132 - Felbontasfuggetlen Tools GIF-mod

- Datum: 2026-07-17
- Fajl: `src/Autodarts_CORE_v1132.user.js`
- Alap: `src/Autodarts_CORE_v1131.user.js`
- Verzioszoveg: `2.6.96-v1132-resolution-independent-tools-gif-mode`
- Modositas:
  - A GIF helyet mar nem a kis kijelzon esetleg teljes kepernyosre nott meresi
    teglalap minositi. A CORE meg a sajat kompatibilitasi felulirasai elott
    kiolvassa a Tools tenyleges megjelenitesi modjat.
  - A Tools `full-page` modjat az official `left-0 + top-0 + size-full`
    osztalykombinacio, a `board-only` modot pedig a Tools altal kiirt pixeles
    `left/top/width/height` geometria azonositja.
  - `full-page` eseten a GIF a viewportot kapja. `board-only` eseten a Tools
    eredeti tablageometriaja ervenyesul; ha ez kis felbontason tevesen teljes
    kepernyos meretu, a tenylegesen lathato tabla lesz a tartalek celterulet.
  - A vegso GIF-tukor a teljes régi kompatibilitasi lanc lefutasa utan ismet a
    felismert mod celteruletere kerul, igy egy régi meres nem irhatja felul.
  - Az aktualis mod es celterulet a
    `window.__AD_CORE_V1132_TOOLS_GIF_MODE__` diagnosztikai objektumban lathato.
- Szandekosan erintetlen:
  - A v1131 bizonyitottan mukodo azonnali osszertek-nullazasa teljes egeszeben.
  - Dobaskartya-szinek, Tipp/Checkout, zoom, tabla, jatekoskartyak,
    history/Undo, Undo/Next, javitas, hatter, felso menu es csuszkatartomanyok.
  - React/Autodarts es Tools DOM-elemek; nincs klonozas, athelyezes vagy torles.
- Ellenőrzés:
  - A metadata `@version` es a belso `SCRIPT_VERSION` egyezik:
    `2.6.96-v1132-resolution-independent-tools-gif-mode`.
  - A kozvetlen `node --check` es a projekt teljes userscript-validatora sikeres.
  - A v1131-v1132 statikus diff nem jelzett whitespace hibat.
  - A v1131 kodja a ket verzioszovegen kivul valtozatlan a v1132 blokk elott.
- Elo teszt szukseges:
  - A Lenovo ThinkCentre + Lanlipu kijelzon a Tools `Board Only` es `Full Page`
    modjanak kulon ellenorzese sajat es ellenfel dobasaival.
  - Ugyanez WQHD-n annak igazolasara, hogy a mar mukodo elhelyezes nem regredialt.

### v1133 - Teljes tabla + falvedo GIF-celterulet

- Datum: 2026-07-17
- Új fájl: `src/Autodarts_CORE_v1133.user.js`
- Alap: `src/Autodarts_CORE_v1132.user.js`
- Verzioszoveg: `2.6.97-v1133-whole-board-gif-target`
- Felhasznaloi visszajelzes a v1132-rol:
  - Az osszertek nullazasa mukodik.
  - A GIF csak feltoltott egyedi tablaval kapott tabla meretu celteruletet.
  - Gyari vagy teljesen elrejtett tablanal teljes kepernyore valtott.
  - Aktiv falvedonel csak a belso tabla meretet hasznalta, ezert a GIF tul kicsi
    lett a teljes tabla + falvedo egyseghez kepest.
- Modositas:
  - A `board-only` GIF-celterulet most elsokent a tenyleges tablareteget keresi:
    egyedi tablahost, elrejtett gyari tablahost, meretezett gyari tabla, nativ
    tabla-SVG, majd Tools `.showAnimations` horgony.
  - A gyari tabla felismerese nem fugg a mar kivezetett `ad-board-svg`
    osztalytol: a mar bizonyitott `isBoardSvg()` felismerest hasznalja.
  - Az elrejtett tabla megtartja a geometriai horgony szerepet, ezert a Tools
    `board-only` modja tabla nelkuli megjelenitesnel sem esik teljes kepernyore.
  - Az egyedi tabla kepenek merete, eltolasa es forgatasa beleszamit a
    celteruletbe.
  - Az atlatszo falvedo `::after` retegenek `-18%` kiterjesztese, merete es X/Y
    eltolasa is beleszamit. A GIF a tabla es falvedo kozos befoglalo teglalapjat
    kapja.
  - Ismeretlen Tools-mod eseten, ha bizonyithato tablageometria van, a script
    `board-only` tartalekra valt; az explicit `full-page` beallitas valtozatlan.
  - Uj passziv allapot: `window.__AD_CORE_V1133_WHOLE_BOARD_GIF_TARGET__`.
- Szandekosan erintetlen:
  - A v1131 mukodo osszertek-nullazasa es a v1132 GIF-modfelismerese.
  - Dobaskartyak, Tipp/Checkout, zoom, history/Undo, Undo/Next, jatekoskartyak,
    felso menu, hatter es javitasi funkciok.
  - React/Autodarts DOM-elemek; a v1133 nem mozgat, nem klonoz es nem torol
    alkalmazaselemet.
- Ellenőrzés:
  - A metadata `@version` es a belso `SCRIPT_VERSION` egyezik:
    `2.6.97-v1133-whole-board-gif-target`.
  - A kozvetlen `node --check`, a projekt userscript-validatora es a
    v1132-v1133 whitespace-diff ellenorzese sikeres.
- Elo teszt szukseges:
  - Tools `Board Only` mod gyari tablaval, elrejtett tablaval, egyedi tablaval,
    valamint egyedi tabla + falvedo kombinacioval.
  - Tools `Full Page` mod regresszioellenorzese Lenovo/Lanlipu es WQHD gepen.

### v1134 - Stabil Board only GIF-meret

- Datum: 2026-07-17
- Új fájl: `src/Autodarts_CORE_v1134.user.js`
- Alap: `src/Autodarts_CORE_v1133.user.js`
- Verzioszoveg: `2.6.98-v1134-stable-board-gif-size`
- Felhasznaloi visszajelzes a v1133-rol:
  - A GIF mar minden tablaallapotnal megjelenik.
  - Tools `Board only` + `contain` eseten a GIF eleinte kisebb, majd kozvetlenul
    az eltunese elott a helyes, nagyobb meretre ugrik.
- Modositas:
  - A CORE a Tools atmeneti, transzformacioval lekicsinyitett merete helyett az
    animacio nelkuli inline- vagy layout-meretet hasznalja.
  - A celterulet a Tools tenyleges doboza, a teljes tabla + falvedo es a korabbi
    tabla-celterulet kozul a legnagyobb ervenyes meret lesz.
  - A kivalasztott celmeret egy teljes GIF-futamra rogzitve marad, ezert az
    animacio vegen sem valthat mas meretre.
  - Az explicit Tools `Full page` mod tovabbra is erintetlen.
  - Uj passziv allapot: `window.__AD_CORE_V1134_STABLE_BOARD_GIF_SIZE__`.
- Szandekosan erintetlen:
  - Dobas- es osszertekkartyak, Tipp/Checkout, zoom, history/Undo, Undo/Next,
    jatekoskartyak, tabla- es falvedobeallitasok, felso menu es javitas.
  - React/Autodarts es Tools DOM-elemek; nincs mozgatas, klonozas vagy torles.
- Ellenőrzés:
  - A metadata `@version` es a belso `SCRIPT_VERSION` egyezik:
    `2.6.98-v1134-stable-board-gif-size`.
  - A kozvetlen `node --check` es a projekt teljes userscript-validatora sikeres.
- Elo teszt szukseges:
  - Tools `Board only` + `contain` modban a GIF merete az elso kepkockatol az
    eltunesig maradjon azonos a korabban csak a vegen latott nagyobb merettel.
  - Tools `Full page` mod regresszioellenorzese.

## Nyitott kerdesek / kovetkezo teendok

- v1134 elo tesztje Tools `Board only` + `contain` beallitassal: a GIF az elso
  kepkockatol az eltunesig azonos, nagyobb meretu marad-e.

- v1133 elo tesztje gyari, elrejtett, egyedi es falvedos tablaallapottal,
  tovabba kulon `Board Only` es `Full Page` Tools beallitassal.

- v1132 elo tesztje ugyanazzal a Tools GIF-fel es mindket megjelenitesi moddal
  WQHD-n, illetve a Lenovo ThinkCentre + Lanlipu kijelzon.

- v1131 elo tesztje a Tools altal beallitott GIF-hely megtartasaval sajat es
  ellenfel dobasa eseten, valamint az osszertek azonnali jatekosvaltasi
  nullazasaval.

- v1130 elo tesztje erintokijelzon a dobaskartya-szinekkel es ugyanazon Tools
  GIF-fel WQHD, illetve kis felbontas mellett.

- v1129 elo tesztje az eredeti Autodarts nezet osszertek-kartyajanak
  vizszintes es fuggoleges kozepre igazitasaval.

- v1127 elo tesztje harom Tools zoomkartyaval, kek jelolovel es ketiranyu
  nezetvaltassal.

- v1126 elo tesztje ketiranyu nezetvaltassal, Tools zoommal es a felso HUD
  meresalapu poziciojaval WQHD-n, majd kisebb felbontason.

- v1125 elo tesztje ketiranyu, tobbszori nezetvaltassal, Tools zoommal,
  Undo/Next gombokkal, bot ikonnal es kisebb felbontasu HUD-igazitassal.

- v1123 elo tesztje ketjatekos elso/tobbedik valtassal, bot avatarral,
  sarokkerekitessel, felso kartyaellel es ketiranyu nezetvaltassal.
- v1119 elo tesztje ketjatekos felso kartyaellel, tobbszori jatekosvaltassal,
  bot ikonnal es ketiranyu nezetvaltassal.
- v1116 elo tesztje ketiranyu nezetvaltassal, Undo/Next stabilitassal, emberi
  es bot avatarral, valamint kompakt nevsormagassaggal.
- v1114 elo tesztje hideg jatekinditassal, nezetvaltassal, tobbjatekos atlaggal,
  avatar/bot betoltessel, GIF-fel es kozepre zart dobaskartyakkal.
- v1113 elo tesztje nativ eredeti nevsorral, kozepre zart atlaggal, bot es
  atlatszo emberi avatarral, 0-130%-os pontszammal es teljesitmenymeressel.
- v1109 elo tesztje aktiv kiemelessel, 3-6 jatekos kapcsolokkal, avatarral es
  eredeti nezetbeli hosszu nevvel.
- v1102 elo tesztje GIF-fel, Tipp/Checkout utan, javitott historyval es 3-6 jatekossal.
- v1101 regresszio ellenorzes, ha v1102-ben uj vizualis hiba jelenik meg.
- v1099 elo tesztje 3-6 jatekossal.
- v1098 elo tesztje 3+ jatekossal es Tipp/Checkout kartyakkal.
- v1097 teljesitmeny elo tesztje WQHD hatterrel es Tools GIF-fel.
- v1096 D1-D20 javitas tovabbi elo tesztje.
- v1095 Tools GIF/Caller es teljes javitasi koordinata elo tesztje.
- v1094 WQHD hatter es Shadow DOM GIF elo tesztje.
- v1093 adaptiv WQHD hattermentes elo tesztje.
- v1092 Tools GIF overlay es WQHD hatter elo tesztje.
- v1085 eredeti nezet dobasjavitas elo tesztje mindket UI-val.
- v1085 eredeti nezet reszponziv kartyamereteinek elo tesztje.
- v1073 elo Cancel-gomb ujrakereses tesztje mindket javito UI-ban.
- v1073 szamos nezet teljes diagnosztikai JSON visszakuldese es elemzese.
- v1072 tartos `MEGSE` utani kartyafeloldas elo tesztje.
- v1072 ivet koveto feliratok vizualis ellenorzese HU/EN/DE nyelven.
- v1071 `MEGSE` utani kijelolestorles elo tesztje mindket javito UI-ban.
- v1071 CORE-tema vizualis ellenorzese kompakt es kor alaku modban.
- v1070 kettos dobasjavito UI elo tesztje mindharom Extrak-moddal.
- v1070 kartya-hover torlesenek ellenorzese Alkalmaz es Megse utan.
- v1070 vegtelen szamkerek erinto-, eger- es billentyutesztje.
- v1069 erintobarat dobasjavito elo tesztje S/D/T, 25, BULL es MISS ertekekkel.
- v1069 koordinatapontossag ellenorzese nativ es feltoltott egyedi tabla mellett.
- v1069 egyuttmukodes ellenorzese a Tools for Autodarts javito- es zoom funkcioival.
- v1068 mert konfetti-eredet elo tesztje bal es jobb oldali nyertessel.
- v1057 elo tesztje Cancel utan 1, 2 es 3 dobasponttal.
- v1051/v1052 CORE fokapcsolo ki- es visszakapcsolasanak elo tesztje.
- Dontes az Aktiv frissites, selector auto-vedelem es kezi font-family mezok kesobbi elrejteserol.
- Termekmintas/logos PNG workflow jelenleg felre van teve.
- Ha kesobb visszaterunk ra, a konvertalo scriptet lehet egyszerusiteni egy drag-and-drop vagy automatikus mappafeldolgozo megoldassal.

## 2026-07-19 - v1135 kommenttisztitas

- Új fájl: `src/Autodarts_CORE_v1135.user.js`.
- Alap: `src/Autodarts_CORE_v1134.user.js`.
- A metadata `@description` rövid, magyar leírásra valtozott.
- A régi verzionaplo-jellegu es fölösleges kommentek kikerultek.
- Csak néhány lényegi magyar eligazító komment maradt bent.
- Funkcionális működést nem módosítottam.
- Ellenőrzés: `node --check` sikeres.
- Ellenőrzés: `scripts/validate-userscript.js` sikeres.

## 2026-07-19 - v1136 rendezett tiszta alap

- Új fájl: `src/Autodarts_CORE_v1136.user.js`.
- Alap: `src/Autodarts_CORE_v1135.user.js`.
- Az elrontott magyar ékezetek javítva lettek a metadata leírásban és a megmaradt kommentekben.
- A kommenttörlésből visszamaradt nagy üres blokkok kikerültek.
- A fájl rendezettebb, sallangmentesebb formát kapott, funkcionális változtatás nélkül.
- Ellenőrzés: `node --check` sikeres.
- Ellenőrzés: `scripts/validate-userscript.js` sikeres.

## 2026-07-19 - v1137 tesztmód

- Új fájl: `src/Autodarts_CORE_v1137.user.js`.
- Alap: `src/Autodarts_CORE_v1136.user.js`.
- Az Effektek és extrák menübe bekerült a Tesztmód, alapból kikapcsolt állapotban.
- A tesztpanel vizuálisan próbálja az aktív, győztes és túldobott játékoskártya-állapotot, a dobáspöttyöt, a dobáskártya-kiemelést, a GIF-területet és a layout-frissítést.
- A tesztmód nem módosít valódi meccsadatot és kikapcsoláskor letakarítja a saját jelöléseit.
- Ellenőrzés: `node --check` sikeres.
- Ellenőrzés: `scripts/validate-userscript.js` sikeres.

## 2026-07-19 - v1138 tesztmod futasi hiba javitas

- Uj fajl: `src/Autodarts_CORE_v1138.user.js`.
- Alap: `src/Autodarts_CORE_v1137.user.js`.
- Javult egy hibas belso wrapper hivas, ami `adCoreV95ApplyBase is not defined` konzolhibat okozott.
- A modositast a bongeszos real teszt elokeszitesehez keszitettem, layout logikat nem valtoztattam.
- Ellenorzes: `node --check` sikeres.
- Ellenorzes: `scripts/validate-userscript.js` sikeres.

## 2026-07-26 - v1139 felso lenyilo menu retegrend

- Uj fajl: `src/Autodarts_CORE_v1139.user.js`.
- Alap: `src/Autodarts_CORE_v1138.user.js`.
- Ketoldalas CORE nezetben a felso HUD-sor es a lenyilo menu a kartyak, a tabla es a tobbi CORE reteg fole kerult.
- A modositas nem erinti a kartyak geometriajat, a zoomot vagy az eredeti Autodarts nezetet.
- Ellenorzes: `node --check` sikeres.
- Ellenorzes: `scripts/validate-userscript.js` sikeres.

## 2026-07-26 - v1140 erintos mozgatas es osszesito GIF javitas

- Uj fajl: `src/Autodarts_CORE_v1140.user.js`.
- Stabil alap: `src/Autodarts_CORE_v1139.user.js`.
- A Tipp es Checkout ertekek optikai fuggoleges kozepe javult, a normal dobaskartyak pozicioja nem valtozott.
- Az ora, a CORE panel es a fo gomb erintokepernyon folyamatos pointer kovetessel huzhato.
- A Finish utan megjeleno osszesito ablak alatt a gyozelmi GIF el van rejtve.
- A kartyageometria, a history, az Undo, a tabla es a nezeti elrendezesek nem valtoztak.
- Ellenorzes: `node --check` sikeres.
- Ellenorzes: `scripts/validate-userscript.js` sikeres.

## 2026-07-26 - v1141 Tipp/Checkout optikai kozep

- Uj fajl: `src/Autodarts_CORE_v1141.user.js`.
- Elfogadott stabil alap: `src/Autodarts_CORE_v1140.user.js`.
- A Tipp es Checkout ertekek fuggoleges optikai korrekcioja erosodott, hogy a szamok a dobaskartya kozepen jelenjenek meg.
- A normal dobaskartyak, az erintos mozgatas, a GIF-ek es a tobbi mukodo funkcio nem valtozott.
- Ellenorzes: `node --check` sikeres.
- Ellenorzes: `scripts/validate-userscript.js` sikeres.

## 2026-07-26 - v1142 Tipp/Checkout tovabbi optikai korrekcio

- Uj fajl: `src/Autodarts_CORE_v1142.user.js`.
- Alap: `src/Autodarts_CORE_v1141.user.js`.
- A kepernyokepek alapjan megmaradt 4-7 pixeles fuggoleges elteres miatt a Tipp es Checkout ertekek kulon korrekcioja `0.09em`-rol `0.15em`-re nott.
- A normal dobaskartyak es minden mas mukodo funkcio valtozatlan maradt.
- Ellenorzes: `node --check` sikeres.
- Ellenorzes: `scripts/validate-userscript.js` sikeres.

## 2026-07-26 - v1143 Tipp/Checkout tenyleges overlay javitas

- Uj fajl: `src/Autodarts_CORE_v1143.user.js`.
- Elfogadott stabil alap: `src/Autodarts_CORE_v1140.user.js`.
- Kiderult, hogy a lathato Tipp/Checkout overlay minden frissiteskor inline `transform: none !important` beallitast kapott, ezert a v1141 es v1142 CSS-korrekcioja nem ervenyesulhetett.
- A fuggoleges optikai korrekcio most kozvetlenul a tenylegesen kirajzolt overlay inline stilusaba kerult; a natív tartalekag ugyanezt a korrekciot hasznalja.
- A normal dobaskartyak, a kartya-geometria, az erintos mozgatas, a GIF-ek es a tobbi mukodo funkcio nem valtozott.
- Ellenorzes: `node --check` sikeres.
- Ellenorzes: `scripts/validate-userscript.js` sikeres.

## 2026-07-26 - v1144 kiegyensulyozott Tipp/Checkout kozep

- Uj fajl: `src/Autodarts_CORE_v1144.user.js`.
- Elfogadott stabil alap: `src/Autodarts_CORE_v1140.user.js`.
- A v1143 bizonyitotta, hogy a tenyleges overlay kapja a poziciot, de a `-0.195em` osszesitett korrekcio tul nagy volt, ezert az ertekek a kartyak tetejere kerultek.
- A lathato overlay es a nativ tartalekag most csak a normal dobaskartyaknal is hasznalt `--ad-turn-card-text-shift` alapkorrekciot kapja, tovabbi eltolas nelkul.
- A normal dobaskartyak es minden mas mukodo funkcio valtozatlan maradt.
- Ellenorzes: `node --check` sikeres.
- Ellenorzes: `scripts/validate-userscript.js` sikeres.

## 2026-07-26 - v1145 allithato nyilikon es egyedi PNG

- Uj fajl: `src/Autodarts_CORE_v1145.user.js`.
- Elfogadott stabil alap: `src/Autodarts_CORE_v1144.user.js`.
- A Dobaskartyak menube bekerult a nyilikon 25-250% kozotti meretezese.
- Atlatszo PNG toltheto fel a gyari vagy premium nyil helyere; torleskor az eredeti ikon automatikusan visszater.
- A megoldas csak a dobaskartyak `img[alt="Dart"]` elemet erinti, a kartyageometria, a Tipp/Checkout, a history, az Undo es a Tools zoom valtozatlan maradt.
- Ellenorzes: `node --check` sikeres.
- Ellenorzes: `scripts/validate-userscript.js` sikeres.

## 2026-07-26 - v1146 statikus nyilikon javitas

- Uj fajl: `src/Autodarts_CORE_v1146.user.js`.
- Stabil alap: `src/Autodarts_CORE_v1144.user.js`.
- A v1145 elo tesztje megmutatta, hogy a korabbi szelektor a dobas kozbeni animaciot erintette, nem az ures dobaskartyak statikus nyilikonjat.
- A meretezes most csak az ures dobaskartya statikus SVG- vagy nyilelemen ervenyesul.
- A feltoltott PNG kulon, a dobaskartya kozepere igazitott retegkent jelenik meg, es csak az ures kartya eredeti nyilikonjat takarja el.
- A dobasanimacio, a Tipp/Checkout, a kartyageometria, a history, az Undo es a Tools zoom nem valtozott.
- Ellenorzes: `node --check` sikeres.
- Ellenorzes: `scripts/validate-userscript.js` sikeres.

## 2026-07-26 - v1147 natív statikus nyílkép kezelése

- Új fájl: `src/Autodarts_CORE_v1147.user.js`.
- Elfogadott stabil alap: `src/Autodarts_CORE_v1144.user.js`.
- A felhasználó által megadott DOM alapján a statikus nyíl egy `img[alt="Dart"]` elem, inline `width: 120px` mérettel és SVG data URL képforrással.
- A méretezés most közvetlenül ennek az elemnek a szélességét módosítja, az egyedi PNG pedig közvetlenül az elem `src` értékét cseréli le.
- A gyári vagy prémium nyíl eredeti képforrása megmarad, ezért az egyedi PNG törlésekor visszaállítható.
- A már dobásértéket tartalmazó kártyák kimaradnak, így a dobásanimációt a funkció nem módosítja.
- A Tipp/Checkout, a kártyageometria, a history, az Undo és a Tools zoom nem változott.
- Ellenőrzés: `node --check` sikeres.
- Ellenőrzés: `scripts/validate-userscript.js` sikeres.
- Élő Firefox-ellenőrzés szükséges a tényleges Autodarts DOM-on.

## 2026-07-26 - v1148 nyílikon kapcsoló és reset javítás

- Új fájl: `src/Autodarts_CORE_v1148.user.js`.
- Elfogadott stabil alap: `src/Autodarts_CORE_v1147.user.js`.
- A Dobáskártyák menü egy kapcsolót kapott az egyedi nyílikon ki- és bekapcsolásához.
- Kikapcsoláskor a feltöltött PNG megmarad; visszakapcsoláskor azonnal újra használható. Új PNG feltöltése automatikusan bekapcsolja az egyedi ikont.
- A Játéknézet fejlécében lévő Reset gomb működőképessé vált, és visszaállítja a játéknézet háttérbeállításait.
- Az Általános menü redundáns fejléc-resetje kikerült; a külön Preset és teljes visszaállítási műveletek megmaradtak.
- A dobásanimáció, a Tipp/Checkout, a kártyageometria, a history, az Undo és a Tools zoom nem változott.
- A metadata és a belső verzió egyezik: `2.6.112-v1148-dart-toggle-view-reset`.
- Ellenőrzés: `node --check` sikeres.
- Ellenőrzés: `scripts/validate-userscript.js` sikeres.
- Élő Firefox-ellenőrzés szükséges a tényleges Autodarts DOM-on.
