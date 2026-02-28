# Development notes — Autodarts CORE

This repo contains a userscript for https://play.autodarts.io/

---

## Repo layout

- `src/autodarts-core.user.js`  
  Development source (editable “main” file while working)

- `dist/autodarts-core.user.js`  
  Published build (the file users should install)

- `docs/`  
  Documentation (`INSTALL.md`, `DEV.md`, etc.)

Tip: Treat `dist/` as the **only “public release”** output.

---

## Versioning

When you release a new version:

1. In `src/autodarts-core.user.js`
   - bump the userscript meta `@version`
   - bump the internal `SCRIPT_VERSION` constant (should match `@version`)

2. Update `CHANGELOG.md`
   - add a new entry with the new version and a short summary

3. Copy to `dist/`
   - copy `src/autodarts-core.user.js` → `dist/autodarts-core.user.js`
   - (the dist file should always match the released code)

---

## IMPORTANT: userscript meta URLs (src + dist)

To avoid confusion and accidental overwrites:

✅ In BOTH `src/` and `dist/`, keep these pointing to **DIST**:

- `@downloadURL  https://raw.githubusercontent.com/Szala86/Autodarts-core/main/dist/autodarts-core.user.js`
- `@updateURL    https://raw.githubusercontent.com/Szala86/Autodarts-core/main/dist/autodarts-core.user.js`

Reason:
- Users install from DIST → update checks must also fetch DIST.
- If SRC points to MAIN/SRC, an update check can “switch” users to the wrong file.

---

## Publishing (release checklist)

1. **Bump versions**
   - `src/autodarts-core.user.js`: `@version` + `SCRIPT_VERSION`

2. **Update changelog**
   - `CHANGELOG.md`

3. **Build release**
   - copy `src/autodarts-core.user.js` → `dist/autodarts-core.user.js`

4. **Quick sanity test**
   - Open https://play.autodarts.io/
   - Enter a match (`/matches/...`)
   - Check:
     - panel opens (Shift+F)
     - clock toggle works (Shift+T)
     - throws → points rendering works
     - total overlay looks correct
     - no duplicates (only one panel + one clock)

5. **Commit & push to `main`**
   - users can update via Violentmonkey/Tampermonkey “check for updates”

Optional:
- Tag a GitHub Release and attach screenshots/GIFs.

---

## Tips / maintainability

- Keep selectors stable where possible.
- Prefer stable anchors:
  - `#ad-ext-turn`
  - `#ad-ext-player-display`
  - CORE’s own classes (`ad-*`)
- Avoid relying on Chakra hashed classes (`.css-xxxxx`) unless there is no alternative.

---

## Credits / upstream inspiration

Some modules are based on ideas/scripts from the community:
- **Back-to-AD-Button** module is based on MartinHH’s script.
- **Animate Triple Autodarts** logic is based on amazingjin’s script.

(If you publish a README, it’s best to mention this there as well.)
