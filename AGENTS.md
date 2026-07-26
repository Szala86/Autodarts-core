# Autodarts CORE – kötelező projektutasítások

## Kiindulópont

- Az egyetlen aktív alap: `src/Autodarts_CORE_v1025.user.js`.
- A `archive/` csak előzmény és diagnosztika. Ne módosítsd, ne abból indulj ki alapértelmezetten.
- Minden fejlesztés közvetlenül a v1025 másolatából induljon; új verziószámot kapjon.

## Nem regresszálható működő elemek

A következőket tilos megváltoztatni, kivéve ha a feladat kimondottan kéri:

1. v1005/v1011 felső dobáskártya-, Undo/Next- és játékoskártya-geometria.
2. Kártyák értékeinek vízszintes és függőleges középre igazítása.
3. Keretmentes dobás-, Tipp-, Checkout- és játékoskártyák.
4. Tipp/Checkout natív osztályok szerinti szétválasztása és az eredeti keretek felvillanásának kezelése.
5. Helyi háttérkép-feltöltés; `cover`, `center bottom`, nincs blur, nincs oldalsáv.
6. A score, name és avg csúszkák jelenlegi érvényes tartományai.
7. Saját history és az Undo javítása: a visszalépés nem törölheti a history legfelső sorát.

## Módosítási szabályok

- Egy kéréshez csak a szükséges legkisebb változtatást készítsd el.
- Ne végezz párhuzamos, "tisztító" vagy átfogó refaktort.
- Ne klónozz, ne helyezz át és ne törölj React/Autodarts DOM-elemet.
- Ne használj külső háttérkép-URL-t. A háttér kizárólag helyi feltöltésből működjön.
- A felhasználó teljes, bemásolható userscriptet vár; ne adj részleges kódrészletet vagy csak diffet.
- A fájl legyen `.user.js` és maradjon benne a teljes Tampermonkey/Violentmonkey metadata blokk.
- Verzióváltáskor a metadata `@version` mezőjét is frissítsd.
- Módosítás után kötelező `node --check` szintaktikai ellenőrzés.

## DOM-felismerés

- Tipp/Checkout esetén a már bizonyított, natív kártyaosztályok alapján dönts; ne a kártya szövegéből vagy később felülírt színekből találgass.
- Ha egy DOM-különbség nem bizonyítható, először passzív diagnosztikát készíts. Ne adj ki új vizuális megoldást puszta feltételezésből.

## Kommunikáció

- Magyar nyelven írj.
- Röviden, konkrétan írd le, mely fájlt változtattad, mit módosítottál, és mit nem érintettél.
- Csak azt állítsd működőnek, amit ténylegesen teszt vagy bizonyíték alátámaszt.
