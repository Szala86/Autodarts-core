# Gyors regressziós tesztlista

Minden új verzió után teszteld ezt a listát:

1. **Két játékos, Layout ON** – a felső dobáskártyák a player card tetejével egy vonalban vannak.
2. **Undo / Next** – a távolság és a jobb oldali igazítás nem változott.
3. **Normál dobáskártyák** – pontszámok olvashatók, középen vannak, nem kapnak Tipp/Checkout színt.
4. **Tipp kártya** – saját háttér- és betűszíne, keret nélkül, felvillanás nélkül.
5. **Checkout kártya** – saját háttér- és betűszíne, keret nélkül, felvillanás nélkül.
6. **Háttérfeltöltés** – JPG/PNG/WebP betöltődik, képernyőt kitölt, alsó-középre igazít, nincsenek sávok.
7. **Aktív játékoskártya** – 0 px keretnél nincs keret; 1+ px-nél csak az aktív kártyán látszik.
8. **History + Undo** – több history sor után Undo: az előző játékos legfelső sora nem tűnik el.
9. **Névméret** – 60–180% között változik, 180 fölött nincs megtévesztő hatástalan tartomány.
10. **Syntax** – `node --check` hiba nélkül lefut.
