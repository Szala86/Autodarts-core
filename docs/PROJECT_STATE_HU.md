# Aktuális projektállapot – v1025

## Elfogadott alap

**Fájl:** `src/Autodarts_CORE_v1025.user.js`  
**Verzió:** v1025 – `Autodarts_v1025_history_undo_top_row_preserve`

A v1025 az elfogadott működő alap. A későbbi módosításokat ebből kell indítani.

## Működő funkciók, amelyeket meg kell őrizni

- Layout ON geometriája, különösen a felső dobáskártya-sáv és az Undo/Next sor igazítása.
- A dobás-, Tipp- és Checkout-kártyák értékei vízszintesen és függőlegesen középen maradnak.
- A dobás-, Tipp-, Checkout- és játékoskártyák keretmentesek.
- A Tipp és Checkout külön háttér- és betűszínbeállítással működik.
- A natív, fehér/sárga különleges-kártya keretek nem villannak fel váltáskor.
- A háttér csak helyi fájlfeltöltésből működik, képernyőt kitöltő `cover` módban, `center bottom` igazítással.
- A névméret csúszka valós, 60–180%-os tartományra van korlátozva.
- A score és avg méretezés a v1011-ben elfogadott módon működik.
- Az aktív játékoskártya kerete 0 px beállításnál nem látszik; inaktív játékoskártyákon sincs alap keret.
- Saját history esetén Undo után az előző játékos history-jának legfelső értéke megmarad.

## Bizonyított Tipp / Checkout jelölés

A különleges kártyákat a natív generált CSS-osztály különbözteti meg:

- **Checkout:** `suggestion css-1dkgpmk ad-ext-turn-checkout-card`
- **Tipp:** `suggestion css-881tme ad-ext-turn-checkout-card`

A korábbi próbálkozások sikertelenek voltak, amikor a script a szöveg (`S9`, `D4`) vagy az utólag módosított keretszín alapján próbálta megállapítani a típust.

## Fontos korábbi hibák

1. A kártyák szövegéből történő Tipp-felismerés a normál dobáskártyákat is hibásan Tippnek minősítette.
2. Natív keretszín visszaolvasása instabil, mert a CORE saját keretmentes stílusa felülírja.
3. Undo esetén a körszám csökkenése nem jelent új leget; ettől a history korábban elvesztette a legfelső sort.
4. A felső turn host abszolút/fixed korrekcióit nem szabad ismét megmozgatni.
