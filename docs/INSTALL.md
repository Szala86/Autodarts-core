# Install guide — Autodarts CORE (userscript)

Autodarts CORE is a userscript for **https://play.autodarts.io/**.
You install it with a userscript manager (Violentmonkey / Tampermonkey), then it updates like any other script.

---

## Recommended install (stable)

✅ **Use the DIST build (stable):**  
https://raw.githubusercontent.com/Szala86/Autodarts-core/main/dist/autodarts-core.user.js

Why DIST?
- This is the **published** file meant for end users.
- Update checks should also point to the **DIST** URL, so users always get the stable build.

---

## Violentmonkey (Firefox)

1. Install the **Violentmonkey** add-on.
2. Open the DIST URL in a new tab:  
   https://raw.githubusercontent.com/Szala86/Autodarts-core/main/dist/autodarts-core.user.js
3. Violentmonkey will show an **Install** page → click **Install**.
4. Go to Autodarts: https://play.autodarts.io/  
   Open a match page and press **Shift+F** (panel toggle).

---

## Tampermonkey (Chrome)

Same steps:

1. Install **Tampermonkey** extension.
2. Open the DIST URL:  
   https://raw.githubusercontent.com/Szala86/Autodarts-core/main/dist/autodarts-core.user.js
3. Click **Install**.
4. Open Autodarts and test **Shift+F**.

---

## Updating

- In Violentmonkey/Tampermonkey: open the script → **Check for updates**.
- Or enable automatic updates in the manager (recommended).

---

## Optional: “bleeding edge” (dev) install

⚠️ Only if you want to test the newest changes before a release:

- SRC (development source):  
  https://raw.githubusercontent.com/Szala86/Autodarts-core/main/src/autodarts-core.user.js

Note: SRC can change at any time and may contain unfinished experiments.

---

## Troubleshooting

### I see TWO clocks / TWO panels
This almost always means **the script is running twice**.

Check:
1. Userscript manager → do you have **two Autodarts CORE scripts installed**?  
   Disable/delete the older one.
2. Do you have another script that also adds a clock/panel?  
   Temporarily disable other Autodarts scripts and reload.
3. Hard refresh the page:
   - Windows: **Ctrl + F5**
   - Or restart the browser.

### Skin/Layout looks broken after an Autodarts update
Autodarts UI updates can change Chakra “css-xxxxx” class names.
CORE has a **selector health-check** and can auto-disable Skin/Layout if it detects a mismatch.
If that happens:
- Update CORE to the latest DIST version
- Or temporarily disable Skin/Layout in the CORE panel

---

## Quick usage

- **Shift+F**: toggle CORE panel  
- **Shift+1 / Shift+2 / Shift+3**: preset A/B/C  
- **Shift+M**: Safe Mode toggle  
- **Shift+H**: help  
- **Shift+T**: clock toggle  
- **Shift+R**: clock reset  
- **ESC**: close panel
