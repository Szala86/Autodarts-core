// ==UserScript==
// @name         Autodarts – CORE (All-in-One + Clock + BoardManager Back + Skin Toggle) v2.4.5
// @namespace    autodarts.core.szala
// @author       Szala/AI
// @version      2.4.5
// @match        https://play.autodarts.io/*
// @run-at       document-start
// @grant        none
// @inject-into  content
// @description  CORE panel with presets + HU/EN/DE + SafeMode + Total overlay fix + integrated Floating Clock + optional Back-to-Autodarts button on /boards + integrated Stylebot CSS as toggleable "Skin/Layout" module. Includes performance optimizations (dirty flags + scoped observers).
// ==/UserScript==

(() => {
  "use strict";

  /* ================== STORAGE ================== */
  const STORE_KEY_STATE = "ad_core_state_v245";
  const LEGACY_KEYS = [
    "ad_core_state_v243",
    "ad_core_state_v242",
    "ad_core_state_v241",
    "ad_core_state_v240",
    "ad_core_state_v233",
    "ad_core_state_v232",
    "ad_core_state_v231",
    "ad_core_state_v230",
    "ad_core_state_v227",
  ];
  const LEGACY_CLOCK_KEY = "ad_clock_only_v11";

  const clone = (obj) => (typeof structuredClone === "function")
    ? structuredClone(obj)
    : JSON.parse(JSON.stringify(obj));

  /* ================== DEFAULTS ================== */
  const DEFAULT_CFG = {
    // utilities
    BOARD_MARKER: true,
    BM_BACK_BUTTON: true,

    // NEW: integrated Stylebot CSS as toggleable module
    SKIN_CSS: true,

        // Skin / Layout adjustable
    SKIN_UI_SCALE: 1,
    SKIN_SPACING_PLAYER: 20,
    SKIN_BG_URL: "https://i.imgur.com/L7D6OpO.jpeg",
    SKIN_BG_OVERLAY_ALPHA: 0.55,
    SKIN_PLAYER_BG_HEX: "#c0c0c0",
    SKIN_PLAYER_BG_OPACITY: 0.10,

    // Throw cards background (and hover)
    THROW_BG_HEX: "#ffffff",
    THROW_BG_OPACITY: 1.0,
    THROW_HOVER_BG_HEX: "#d9822b",
    THROW_HOVER_BG_OPACITY: 1.0,

    // Total card background (overlay)
    TOTAL_BG_HEX: "#cfd3d7",
    TOTAL_BG_OPACITY: 0.05,

    // display
    THROWS_TO_POINTS: true,
    SHOW_ORIG_IN_CORNER: true,
    TOTAL_VIEW: true,
    CHECKOUT_VIEW: true,

    // highlight/anim/sound
    ACTIVE_PLAYER_HIGHLIGHT: true,
    TRIPLE_ANIM: true,
    WIN_MUSIC: true,

    ACTIVE_COLOR_HEX: "#ffffff",
    ACTIVE_OUTLINE_PX: 3,
    ACTIVE_GLOW: 0.42,

    THROW_VAL_FONT_PX: 100,
    THROW_VAL_COLOR_HEX: "#222222",
    THROW_VAL_OPACITY: 1.0,

    ORIG_FONT_PX: 30,
    ORIG_COLOR_HEX: "#000000",
    ORIG_OPACITY: 0.45,

    TOTAL_FONT_PX: 100,
    TOTAL_COLOR_HEX: "#ffffff",
    TOTAL_OPACITY: 1.0,

    CHECKOUT_FONT_PX: 100,
    CHECKOUT_COLOR_HEX: "#ffffff",
    CHECKOUT_OPACITY: 0.55,

    TRIPLE_SHIMMER_MS: 2000,
    TRIPLE_SLAM_MS: 350,
    TRIPLE_RATTLE_MS: 500,
    TRIPLE_RATTLE_DELAY_MS: 275,

    ACTIVE_POLL_MS: 150,
    WIN_VOLUME: 1.0,
  };

  const DEFAULT_CLOCK = {
    enabled: false,
    x: null,
    y: null,
    scale: 1,
    format24: true,
    showSeconds: true,
    bgHex: "#000000",
    bgAlpha: 0.85,
    textHex: "#ffffff",
  };

  const DEFAULT_UI = {
    open: false,
    x: null,
    y: null,
    btnX: null,
    btnY: null,
    selectedTab: "general",
    safeMode: true,
    compact: false,
    helpOpen: false,
    lang: "hu",              // hu | en | de
    clock: clone(DEFAULT_CLOCK),
  };

  const DEFAULT_STATE = {
    activePreset: 0,
    presets: [clone(DEFAULT_CFG), clone(DEFAULT_CFG), clone(DEFAULT_CFG)],
    ui: clone(DEFAULT_UI),
  };

  /* ================== I18N ================== */
  const I18N = {
    hu: {
      appTitle: "🎯 Autodarts CORE",
      modulesTitle: "Kapcsolók / modulok",
      help: "Súgó",
      close: "Bezár",
      export: "Export",
      import: "Import",
      activeRefresh: "Aktív frissítés (ms)",
      activeRefreshHint: "Aktív játékos felismerés polling. 0 = csak DOM figyelés. Ha néha késik, 100–200ms jó.",
      preset: "Preset",
      reset: "Reset",
      resetPreset: "Reset Preset",
      resetAll: "Reset MINDEN",
      resetAllConfirm: "Biztosan mindent alaphelyzetbe állítasz? (Presetek + UI)",
      saved: "Mentve ✓",
      posReset: "Panel pozíció reset",
      btnPosReset: "Fő gomb helye reset",
      safeMode: "Safe Mode (ajánlott)",
      compact: "Kompakt mód",
      hotkeysLine: "Hotkeys: Shift+F panel • Shift+1/2/3 preset • Shift+M Safe • Shift+H help • ESC close",
      hintConfig: "Beállítások →",
      iconConfigTitle: "Állítható (katt a sorra)",
      markerNow: "Marker frissítés most",
      markerInfo: "Board marker: megjelöli a tábla SVG-t (ad-board-svg). Ha a custom tábla skin ezt használja, maradjon ON.",
      bmInfo: "A /boards oldalon betesz egy 'Vissza az Autodartsba' gombot (touch/fullscreenben hasznos).",
      bmBackLabel: "Vissza az Autodartsba",
      skinInfo: "Ha Stylebotot használsz ehhez az oldalhoz, kapcsold ki (vagy ne legyen aktív), mert összeakadhat ezzel a szkripttel.",
      tab: {
        general:  "Általános",
        skin:     "Skin / Layout",
        board:    "Eszköz – Board marker",
        bmback:   "Eszköz – Vissza gomb (/boards)",
        throws:   "Megjelenítés – Dobáspontok",
        orig:     "Megjelenítés – Sarok jelölés (T20)",
        total:    "Megjelenítés – Összérték",
        checkout: "Megjelenítés – Checkout tipp",
        active:   "Kiemelés – Aktív játékos",
        triple:   "Animáció – Tripla találat",
        win:      "Hang – Győzelem",
        clock:    "Widget – Óra",
      },
      fields: {
        bg: "Háttér",
        bgOpacity: "Háttér áttetszőség",
        hoverBg: "Hover háttér",
        hoverOpacity: "Hover áttetszőség",
        fontSize: "Betűméret",
        color: "Szín",
        opacity: "Áttetszőség",
        outline: "Keret vastagság",
        glow: "Glow erősség",
        highlightSpeed: "Highlight sebesség",
        numberAnim: "Szám animáció",
        rattleDur: "Rázkódás idő",
        rattleDelay: "Rázkódás késleltetés",
        volume: "Hangerő",
      },
      totalInfo: "Fix: a Total szám overlay, így a beállítások mindig érvényesülnek és a kártya magassága nem változik.",
      skinText: {
        uiScale: "UI méret (scale)",
        spacing: "Játékos távolság (spacing)",
        playerBg: "Player kártya háttér",
        playerBgOpacity: "Player háttér áttetszőség",
        bgUrl: "Háttérkép URL",
        overlay: "Overlay áttetszőség",
      },
      clockText: {
        enabled: "Óra engedélyezése",
        scale: "Méret",
        bg: "Háttérszín",
        bgAlpha: "Háttér áttetszőség",
        text: "Szöveg szín",
        format24: "24 órás formátum",
        seconds: "Másodperc mutatása",
        resetLook: "Óra stílus reset",
        resetPos: "Óra pozíció reset",
        hint: "Mozgatás: húzd az órát. Méret: Ctrl+↑ / Ctrl+↓ (vagy Ctrl+görgő). Dupla katt: 24h ki/be. Shift+dupla: másodperc ki/be. Hotkeys: Shift+T óra ki/be, Shift+R reset óra."
      },
      helpHtml: `
        <div style="font-weight:900;margin-bottom:6px">⌨️ Gyorsbillentyűk</div>
        <div><b>Shift+F</b> panel ki/be</div>
        <div><b>ESC</b> bezár</div>
        <div><b>Shift+1/2/3</b> Preset A/B/C</div>
        <div><b>Shift+M</b> Safe Mode ki/be</div>
        <div><b>Shift+H</b> Súgó ki/be</div>
        <div style="margin-top:8px;opacity:.8">Tipp: ahol a név mellett ott a kis “sliders” ikon, ott vannak extra beállítások.</div>
      `,
      alerts: {
        invalidJson: "❌ A fájl nem érvényes JSON",
        invalidPreset: "❌ Hibás preset formátum",
      },
      toasts: {
        preset: (p)=>`Preset ${p} ✓`,
        export: "Export ✓",
        import: "Import ✓",
        posSaved: "Panel pozíció mentve ✓",
        btnPosSaved: "Fő gomb helye mentve ✓",
        posReset: "Panel pozíció reset ✓",
        btnPosReset: "Fő gomb helye reset ✓",
        safeOn: "Safe Mode ✓",
        safeOff: "Safe Mode OFF",
        compactOn: "Kompakt ✓",
        compactOff: "Kompakt OFF",
        resetTab: "Reset ✓",
        resetPreset: "Preset reset ✓",
        resetAll: "Reset ✓",
        marker: "Marker ✓",
        clockOn: "Óra ON ✓",
        clockOff: "Óra OFF",
        clockSaved: "Óra mentve ✓",
        skinOn: "Skin ON ✓",
        skinOff: "Skin OFF",
        lang: "Nyelv frissítve ✓",
      }
    },

    en: {
      appTitle: "🎯 Autodarts CORE",
      modulesTitle: "Toggles / modules",
      help: "Help",
      close: "Close",
      export: "Export",
      import: "Import",
      activeRefresh: "Active refresh (ms)",
      activeRefreshHint: "Active-player detection polling. 0 = DOM only. If it lags sometimes, try 100–200ms.",
      preset: "Preset",
      reset: "Reset",
      resetPreset: "Reset Preset",
      resetAll: "RESET ALL",
      resetAllConfirm: "Reset everything to defaults? (Presets + UI)",
      saved: "Saved ✓",
      posReset: "Reset panel position",
      btnPosReset: "Reset main button pos",
      safeMode: "Safe Mode (recommended)",
      compact: "Compact mode",
      hotkeysLine: "Hotkeys: Shift+F panel • Shift+1/2/3 preset • Shift+M Safe • Shift+H help • ESC close",
      hintConfig: "Settings →",
      iconConfigTitle: "Configurable (click row)",
      markerNow: "Refresh marker now",
      markerInfo: "Board marker: marks the board SVG (ad-board-svg). Keep ON if your custom board skin relies on it.",
      bmInfo: "Adds a 'Back to Autodarts' button on /boards (useful in touchscreen/fullscreen).",
      bmBackLabel: "Back to Autodarts",
      skinInfo: "If you use Stylebot on this page, disable it (or make sure it’s not active), because it can conflict with this script.",
      tab: {
        general:  "General",
        skin:     "Skin / Layout",
        board:    "Utility – Board Marker",
        bmback:   "Utility – Back Button (/boards)",
        throws:   "Display – Throw Points",
        orig:     "Display – Corner Label (T20)",
        total:    "Display – Total",
        checkout: "Display – Checkout Tip",
        active:   "Highlight – Active Player",
        triple:   "Animation – Triple Hit",
        win:      "Sound – Win",
        clock:    "Widget – Clock",
      },
      fields: {
        bg: "Background",
        bgOpacity: "Background opacity",
        hoverBg: "Hover background",
        hoverOpacity: "Hover opacity",
        fontSize: "Font size",
        color: "Color",
        opacity: "Opacity",
        outline: "Outline size",
        glow: "Glow strength",
        highlightSpeed: "Highlight speed",
        numberAnim: "Number animation",
        rattleDur: "Rattle duration",
        rattleDelay: "Rattle delay",
        volume: "Volume",
      },
      totalInfo: "Fix: Total uses an overlay so settings always apply and card height won’t change.",
      skinText: {
        uiScale: "UI scale",
        spacing: "Player spacing",
        playerBg: "Player card background",
        playerBgOpacity: "Player background opacity",
        bgUrl: "Background image URL",
        overlay: "Overlay opacity",
      },
      clockText: {
        enabled: "Enable clock",
        scale: "Scale",
        bg: "Background",
        bgAlpha: "Background opacity",
        text: "Text color",
        format24: "24-hour format",
        seconds: "Show seconds",
        resetLook: "Reset clock style",
        resetPos: "Reset clock position",
        hint: "Move: drag the clock. Scale: Ctrl+↑ / Ctrl+↓ (or Ctrl+wheel). Double-click: 24h toggle. Shift+double: seconds toggle. Hotkeys: Shift+T clock toggle, Shift+R reset clock."
      },
      helpHtml: `
        <div style="font-weight:900;margin-bottom:6px">⌨️ Hotkeys</div>
        <div><b>Shift+F</b> panel toggle</div>
        <div><b>ESC</b> close</div>
        <div><b>Shift+1/2/3</b> Preset A/B/C</div>
        <div><b>Shift+M</b> Safe Mode toggle</div>
        <div><b>Shift+H</b> Help toggle</div>
        <div style="margin-top:8px;opacity:.8">Tip: modules with the small “sliders” icon next to the name have extra settings.</div>
      `,
      alerts: {
        invalidJson: "❌ File is not valid JSON",
        invalidPreset: "❌ Invalid preset format",
      },
      toasts: {
        preset: (p)=>`Preset ${p} ✓`,
        export: "Export ✓",
        import: "Import ✓",
        posSaved: "Panel position saved ✓",
        btnPosSaved: "Main button position saved ✓",
        posReset: "Panel position reset ✓",
        btnPosReset: "Main button reset ✓",
        safeOn: "Safe Mode ✓",
        safeOff: "Safe Mode OFF",
        compactOn: "Compact ✓",
        compactOff: "Compact OFF",
        resetTab: "Reset ✓",
        resetPreset: "Preset reset ✓",
        resetAll: "Reset ✓",
        marker: "Marker ✓",
        clockOn: "Clock ON ✓",
        clockOff: "Clock OFF",
        clockSaved: "Clock saved ✓",
        skinOn: "Skin ON ✓",
        skinOff: "Skin OFF",
        lang: "Language updated ✓",
      }
    },

    de: {
      appTitle: "🎯 Autodarts CORE",
      modulesTitle: "Schalter / Module",
      help: "Hilfe",
      close: "Schließen",
      export: "Export",
      import: "Import",
      activeRefresh: "Aktualisierung aktiv (ms)",
      activeRefreshHint: "Erkennung aktiver Spieler (Polling). 0 = nur DOM. Wenn es verzögert: 100–200ms.",
      preset: "Preset",
      reset: "Reset",
      resetPreset: "Preset zurücksetzen",
      resetAll: "ALLES RESET",
      resetAllConfirm: "Alles auf Standard zurücksetzen? (Presets + UI)",
      saved: "Gespeichert ✓",
      posReset: "Panel-Position reset",
      btnPosReset: "Hauptbutton-Pos reset",
      safeMode: "Safe Mode (empfohlen)",
      compact: "Kompaktmodus",
      hotkeysLine: "Hotkeys: Shift+F Panel • Shift+1/2/3 Preset • Shift+M Safe • Shift+H Hilfe • ESC schließen",
      hintConfig: "Einstellungen →",
      iconConfigTitle: "Einstellbar (Zeile klicken)",
      markerNow: "Marker jetzt aktualisieren",
      markerInfo: "Board Marker: markiert das Board-SVG (ad-board-svg). Anlassen, wenn dein Board-Skin darauf basiert.",
      bmInfo: "Fügt auf /boards einen 'Zurück zu Autodarts' Button hinzu (für Touch/Fullscreen hilfreich).",
      bmBackLabel: "Zurück zu Autodarts",
      skinInfo: "Wenn du Stylebot auf dieser Seite nutzt, deaktiviere es (oder stelle sicher, dass es nicht aktiv ist), sonst kann es mit diesem Script kollidieren.",
      tab: {
        general:  "Allgemein",
        skin:     "Skin / Layout",
        board:    "Werkzeug – Board Marker",
        bmback:   "Werkzeug – Zurück-Button (/boards)",
        throws:   "Anzeige – Wurfpunkte",
        orig:     "Anzeige – Eckenlabel (T20)",
        total:    "Anzeige – Gesamtwert",
        checkout: "Anzeige – Checkout-Tipp",
        active:   "Hervorhebung – Aktiver Spieler",
        triple:   "Animation – Triple-Treffer",
        win:      "Sound – Sieg",
        clock:    "Widget – Uhr",
      },
      fields: {
        bg: "Hintergrund",
        bgOpacity: "Hintergrund-Transparenz",
        hoverBg: "Hover Hintergrund",
        hoverOpacity: "Hover Transparenz",
        fontSize: "Schriftgröße",
        color: "Farbe",
        opacity: "Transparenz",
        outline: "Rahmenstärke",
        glow: "Glow Stärke",
        highlightSpeed: "Highlight Speed",
        numberAnim: "Zahlenanimation",
        rattleDur: "Wackeln Dauer",
        rattleDelay: "Wackeln Verzögerung",
        volume: "Lautstärke",
      },
      totalInfo: "Fix: Total nutzt ein Overlay – Einstellungen wirken immer, Kartenhöhe bleibt stabil.",
      skinText: {
        uiScale: "UI Skalierung",
        spacing: "Spieler-Abstand",
        playerBg: "Player-Karten Hintergrund",
        playerBgOpacity: "Player-Hintergrund Transparenz",
        bgUrl: "Hintergrundbild URL",
        overlay: "Overlay-Transparenz",
      },
      clockText: {
        enabled: "Uhr aktivieren",
        scale: "Größe",
        bg: "Hintergrund",
        bgAlpha: "Hintergrund-Transparenz",
        text: "Textfarbe",
        format24: "24h Format",
        seconds: "Sekunden anzeigen",
        resetLook: "Uhr-Stil Reset",
        resetPos: "Uhr-Position Reset",
        hint: "Bewegen: Uhr ziehen. Größe: Ctrl+↑ / Ctrl+↓ (oder Ctrl+Rad). Doppelklick: 24h Toggle. Shift+Doppelklick: Sekunden Toggle. Hotkeys: Shift+T Uhr Toggle, Shift+R Uhr Reset."
      },
      helpHtml: `
        <div style="font-weight:900;margin-bottom:6px">⌨️ Hotkeys</div>
        <div><b>Shift+F</b> Panel ein/aus</div>
        <div><b>ESC</b> schließen</div>
        <div><b>Shift+1/2/3</b> Preset A/B/C</div>
        <div><b>Shift+M</b> Safe Mode</div>
        <div><b>Shift+H</b> Hilfe</div>
        <div style="margin-top:8px;opacity:.8">Tipp: Module mit dem kleinen “Sliders”-Icon neben dem Namen haben Extra-Einstellungen.</div>
      `,
      alerts: {
        invalidJson: "❌ Datei ist kein gültiges JSON",
        invalidPreset: "❌ Ungültiges Preset-Format",
      },
      toasts: {
        preset: (p)=>`Preset ${p} ✓`,
        export: "Export ✓",
        import: "Import ✓",
        posSaved: "Panel-Position gespeichert ✓",
        btnPosSaved: "Hauptbutton-Pos gespeichert ✓",
        posReset: "Panel-Pos reset ✓",
        btnPosReset: "Button reset ✓",
        safeOn: "Safe Mode ✓",
        safeOff: "Safe Mode OFF",
        compactOn: "Kompakt ✓",
        compactOff: "Kompakt OFF",
        resetTab: "Reset ✓",
        resetPreset: "Preset reset ✓",
        resetAll: "Reset ✓",
        marker: "Marker ✓",
        clockOn: "Uhr AN ✓",
        clockOff: "Uhr AUS",
        clockSaved: "Uhr gespeichert ✓",
        skinOn: "Skin AN ✓",
        skinOff: "Skin AUS",
        lang: "Sprache aktualisiert ✓",
      }
    }
  };

  function lang() {
    const l = state?.ui?.lang;
    return (l === "en" || l === "de") ? l : "hu";
  }
  function T() { return I18N[lang()]; }

  /* ================== CONSTANTS ================== */
  const WIN_URL = "https://github.com/Szala86/autodarts-audio/releases/download/v1/win.mp3";
  const TRIPLE_VALUES = ["T20","T19","T18","T17","T16","T15","T7","BULL","SBULL","DBULL","25","50"];

  const HOTKEY_PANEL = { shift: true, ctrl: false, alt: false, key: "f" };
  const HOTKEY_HELP  = { shift: true, ctrl: false, alt: false, key: "h" };
  const HOTKEY_SAFE  = { shift: true, ctrl: false, alt: false, key: "m" };
  const HOTKEY_PRESET_1 = { shift: true, ctrl: false, alt: false, key: "1" };
  const HOTKEY_PRESET_2 = { shift: true, ctrl: false, alt: false, key: "2" };
  const HOTKEY_PRESET_3 = { shift: true, ctrl: false, alt: false, key: "3" };

  const HOTKEY_CLOCK_TOGGLE = { shift: true, ctrl: false, alt: false, key: "t" };
  const HOTKEY_CLOCK_RESET  = { shift: true, ctrl: false, alt: false, key: "r" };

  const SAFE_LIMITS = { THROW_VAL_FONT_PX: 130, ORIG_FONT_PX: 38, TOTAL_FONT_PX: 130, CHECKOUT_FONT_PX: 130, ACTIVE_OUTLINE_PX: 6 };
  const EXT_LIMITS  = { THROW_VAL_FONT_PX: 220, ORIG_FONT_PX: 80, TOTAL_FONT_PX: 220, CHECKOUT_FONT_PX: 220, ACTIVE_OUTLINE_PX: 12 };

  const FONT_LINK_ID = "ad-font-barlow-condensed-core";
  const STYLE_ID = "ad-style-core-v245";
  const UI_STYLE_ID = "ad-core-ui-style-v245";
  const EXTRA_STYLE_ID = "ad-style-core-skin-v245";

  const ACTIVE_CLASS = "ad-active-player";
  const TRIPLE_CLASS = "ad-triple-hit";

  const SDT_RE = /^([SDT])(\d{1,2})$/i;
  const CHECKOUT_TOKEN_RE = /^(?:[SDT](?:[1-9]|1\d|20)|BULL|SBULL|DBULL|25|50)$/i;

  // ✅ Sticky selection (kijelölt dobáskártya indexe a turn-ön)
  const TURN_SEL_ATTR = "data-ad-sel-throw-idx";

  /* ================== UTILS ================== */
  function clamp(n, min, max) { return Math.min(Math.max(n, min), max); }
  function sanitizeHex(v, fallback) {
    if (typeof v !== "string") return fallback;
    return /^#[0-9a-fA-F]{6}$/.test(v) ? v : fallback;
  }
  function hexToRgbString(hex) {
    hex = sanitizeHex(hex, "#ffffff");
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `${r}, ${g}, ${b}`;
  }
  function hexToRgba(hex, alpha) {
    hex = sanitizeHex(hex, "#000000");
    alpha = clamp(Number(alpha) || 0.85, 0.1, 1);
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  function ensureHead(cb) {
    if (document.head) return cb();
    const obs = new MutationObserver(() => { if (document.head) { obs.disconnect(); cb(); } });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }
  function ensureBody(cb) {
    if (document.body) return cb();
    const obs = new MutationObserver(() => { if (document.body) { obs.disconnect(); cb(); } });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }
  function matchHotkey(e, def) {
    if (!def) return false;
    if (!!def.shift !== e.shiftKey) return false;
    if (!!def.ctrl  !== e.ctrlKey)  return false;
    if (!!def.alt   !== e.altKey)   return false;
    return (e.key || "").toLowerCase() === def.key.toLowerCase();
  }
  function ensureVisible(x, y, w, h, pad = 8) {
    return { x: clamp(x, pad, window.innerWidth - w - pad), y: clamp(y, pad, window.innerHeight - h - pad) };
  }
  function tryParseJSON(raw) { try { return JSON.parse(raw); } catch { return null; } }

    function sanitizeUrl(u, fallback) {
    try{
      const s = String(u || "").trim();
      if (!s) return fallback;
      const U = new URL(s, location.href);
      if (U.protocol !== "http:" && U.protocol !== "https:") return fallback;
      return U.href;
    }catch{
      return fallback;
    }
  }
  function cssUrl(u) {
    // minimál védelem: ne tudjon idézőjelet / sortörést “kiszúrni” a CSS-be
    return String(u || "").replace(/["\\\n\r]/g, "");
  }

  /* ================== STATE LOAD/MIGRATE ================== */
  function normalizeState(st) {
    const out = clone(DEFAULT_STATE);
    out.activePreset = clamp(Number(st?.activePreset ?? out.activePreset), 0, 2);

    out.ui = { ...out.ui, ...(st?.ui || {}) };
    out.ui.clock = { ...clone(DEFAULT_CLOCK), ...(st?.ui?.clock || {}) };
    out.ui.lang = (out.ui.lang === "en" || out.ui.lang === "de") ? out.ui.lang : "hu";

    out.presets = (Array.isArray(st?.presets) && st.presets.length === 3)
      ? st.presets.map(p => ({ ...clone(DEFAULT_CFG), ...(p || {}) }))
      : [clone(DEFAULT_CFG), clone(DEFAULT_CFG), clone(DEFAULT_CFG)];

    return out;
  }

  function migrateToState(obj) {
    if (obj && obj.state) return migrateToState(obj.state);
    if (obj && typeof obj === "object" && Array.isArray(obj.presets) && obj.presets.length === 3 && obj.ui) return normalizeState(obj);
    if (obj && typeof obj === "object" && !obj.presets) {
      const base = { ...clone(DEFAULT_CFG), ...obj };
      const st = clone(DEFAULT_STATE);
      st.presets = [clone(base), clone(base), clone(base)];
      return normalizeState(st);
    }
    return clone(DEFAULT_STATE);
  }

  function loadState() {
    const raw = localStorage.getItem(STORE_KEY_STATE);
    if (raw) return migrateToState(tryParseJSON(raw));
    for (const k of LEGACY_KEYS) {
      const r = localStorage.getItem(k);
      if (!r) continue;
      const st = migrateToState(tryParseJSON(r));
      try { localStorage.setItem(STORE_KEY_STATE, JSON.stringify(st)); } catch {}
      return st;
    }
    return clone(DEFAULT_STATE);
  }

  let state = loadState();
  const cfg = () => state.presets[state.activePreset];

  function saveStateNow(){ try { localStorage.setItem(STORE_KEY_STATE, JSON.stringify(state)); } catch {} }
  let saveTimer = null;
  function saveStateDebounced() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => { saveStateNow(); saveTimer = null; }, 250);
  }

  // import legacy clock settings once
  (function importLegacyClockOnce(){
    try{
      const raw = localStorage.getItem(LEGACY_CLOCK_KEY);
      if(!raw) return;
      const legacy = tryParseJSON(raw);
      if(!legacy || typeof legacy !== "object") return;

      const c = state.ui.clock || (state.ui.clock = clone(DEFAULT_CLOCK));
      const looksDefault = (c.x == null && c.y == null && c.scale === 1 && c.bgHex === DEFAULT_CLOCK.bgHex && c.textHex === DEFAULT_CLOCK.textHex);
      if(!looksDefault) return;

      c.enabled     = !!legacy.enabled;
      c.x           = (typeof legacy.x === "number") ? legacy.x : null;
      c.y           = (typeof legacy.y === "number") ? legacy.y : null;
      c.scale       = clamp(Number(legacy.scale ?? 1), 0.6, 2.0);
      c.format24    = (legacy.format24 !== undefined) ? !!legacy.format24 : true;
      c.showSeconds = (legacy.showSeconds !== undefined) ? !!legacy.showSeconds : true;
      c.bgHex       = sanitizeHex(legacy.bgHex, c.bgHex);
      c.bgAlpha     = clamp(Number(legacy.bgAlpha ?? c.bgAlpha), 0.1, 1);
      c.textHex     = sanitizeHex(legacy.textHex, c.textHex);

      saveStateNow();
    }catch{}
  })();

  /* ================== SAFE MODE HELPERS ================== */
  function getMaxFor(key) {
    const safeMax = SAFE_LIMITS[key];
    const extMax = EXT_LIMITS[key];
    if (safeMax == null || extMax == null) return null;
    return state.ui.safeMode ? safeMax : extMax;
  }
  function clampIfSafe(key, value) {
    const safeMax = SAFE_LIMITS[key];
    if (safeMax == null) return value;
    if (!state.ui.safeMode) return value;
    return Math.min(value, safeMax);
  }
  function pillLevel(key, value) {
    const safeMax = SAFE_LIMITS[key];
    if (safeMax == null) return "ok";
    if (value <= safeMax) return "ok";
    if (value <= safeMax * 1.15) return "warn";
    return "danger";
  }
  function applySafeClampsToCfg() {
    if (!state.ui.safeMode) return;
    const c = cfg();
    c.THROW_VAL_FONT_PX = clampIfSafe("THROW_VAL_FONT_PX", c.THROW_VAL_FONT_PX);
    c.ORIG_FONT_PX = clampIfSafe("ORIG_FONT_PX", c.ORIG_FONT_PX);
    c.TOTAL_FONT_PX = clampIfSafe("TOTAL_FONT_PX", c.TOTAL_FONT_PX);
    c.CHECKOUT_FONT_PX = clampIfSafe("CHECKOUT_FONT_PX", c.CHECKOUT_FONT_PX);
    c.ACTIVE_OUTLINE_PX = clampIfSafe("ACTIVE_OUTLINE_PX", c.ACTIVE_OUTLINE_PX);
  }

  /* ================== UI INDICATOR (sliders) ================== */
  function slidersTinySvg(size = 14) {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
           xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 7h9" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <path d="M17 7h3" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <circle cx="15" cy="7" r="2" stroke="white" stroke-width="2"/>
        <path d="M4 17h3" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <path d="M11 17h9" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <circle cx="9" cy="17" r="2" stroke="white" stroke-width="2"/>
      </svg>
    `;
  }

  function ensureUIStyle() {
    ensureHead(() => {
      if (document.getElementById(UI_STYLE_ID)) return;
      const st = document.createElement("style");
      st.id = UI_STYLE_ID;
      st.textContent = `
        #ad-core-panel .ad-mod-row{
          transition: transform .16s ease, background .16s ease, box-shadow .16s ease, border-color .16s ease;
        }
        #ad-core-panel .ad-mod-row:hover{ border-color: rgba(255,255,255,0.18) !important; }
        #ad-core-panel .ad-mod-row.is-config:hover{
          transform: translateX(2px);
          background: rgba(255,255,255,0.10) !important;
          box-shadow: 0 10px 26px rgba(0,0,0,0.35);
        }
        #ad-core-panel .ad-mod-icon{
          opacity:.65;
          transform: translateY(1px);
          transition: opacity .16s ease, transform .16s ease, filter .16s ease;
          display:inline-flex;
          align-items:center;
        }
        #ad-core-panel .ad-mod-row.is-config:hover .ad-mod-icon{
          opacity:1;
          transform: translateY(1px) rotate(-6deg) scale(1.05);
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.15));
        }
        #ad-core-panel .ad-mod-hint{
          opacity:0; transform: translateX(-4px);
          transition: opacity .16s ease, transform .16s ease;
          font-size:11px; font-weight:800; padding:4px 8px;
          border-radius:999px; border:1px solid rgba(255,255,255,.14);
          background: rgba(0,0,0,.35); color:#fff; white-space:nowrap;
        }
        #ad-core-panel .ad-mod-row.is-config:hover .ad-mod-hint{ opacity:.85; transform: translateX(0); }
      `;
      document.head.appendChild(st);
    });
  }

  /* ================== CORE CSS ================== */
  function ensureFontLink() {
    const c = cfg();
    const needsFont = c.THROWS_TO_POINTS || c.TOTAL_VIEW || c.CHECKOUT_VIEW;
    if (!needsFont) return;
    if (!document.getElementById(FONT_LINK_ID)) {
      const link = document.createElement("link");
      link.id = FONT_LINK_ID;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap";
      document.head.appendChild(link);
    }
  }

  function renderCss() {
    ensureHead(() => {
      ensureFontLink();
      const c = cfg();

      let style = document.getElementById(STYLE_ID);
      if (!style) {
        style = document.createElement("style");
        style.id = STYLE_ID;
        document.head.appendChild(style);
      }

      const activeRGB = hexToRgbString(c.ACTIVE_COLOR_HEX);
      const throwRGB  = hexToRgbString(c.THROW_VAL_COLOR_HEX);
      const origRGB   = hexToRgbString(c.ORIG_COLOR_HEX);
      const totalRGB  = hexToRgbString(c.TOTAL_COLOR_HEX);
      const chkRGB    = hexToRgbString(c.CHECKOUT_COLOR_HEX);
      const throwBgRGB      = hexToRgbString(c.THROW_BG_HEX);
      const throwHoverBgRGB = hexToRgbString(c.THROW_HOVER_BG_HEX);
      const totalBgRGB      = hexToRgbString(c.TOTAL_BG_HEX);
      const css = [];

      css.push(`
:root{
  --ad-active-rgb: ${activeRGB};
  --ad-active-outline: ${clamp(+c.ACTIVE_OUTLINE_PX || 3, 0, 12)}px;
  --ad-active-glow: ${clamp(+c.ACTIVE_GLOW || 0.42, 0, 1)};

  --ad-throw-font: ${clamp(+c.THROW_VAL_FONT_PX || 100, 20, 220)}px;
  --ad-throw-rgb: ${throwRGB};
  --ad-throw-op: ${clamp(+c.THROW_VAL_OPACITY ?? 1, 0, 1)};

  --ad-throw-bg-rgb: ${throwBgRGB};
  --ad-throw-bg-op: ${clamp(+c.THROW_BG_OPACITY ?? 1, 0, 1)};
  --ad-throw-hover-bg-rgb: ${throwHoverBgRGB};
  --ad-throw-hover-bg-op: ${clamp(+c.THROW_HOVER_BG_OPACITY ?? 1, 0, 1)};

  --ad-total-bg-rgb: ${totalBgRGB};
  --ad-total-bg-op: ${clamp(+c.TOTAL_BG_OPACITY ?? 0, 0, 1)};

  --ad-orig-font: ${clamp(+c.ORIG_FONT_PX || 30, 10, 80)}px;
  --ad-orig-rgb: ${origRGB};
  --ad-orig-op: ${clamp(+c.ORIG_OPACITY ?? 0.45, 0, 1)};

  --ad-total-font: ${clamp(+c.TOTAL_FONT_PX || 100, 20, 220)}px;
  --ad-total-rgb: ${totalRGB};
  --ad-total-op: ${clamp(+c.TOTAL_OPACITY ?? 1, 0, 1)};

  --ad-checkout-font: ${clamp(+c.CHECKOUT_FONT_PX || 100, 20, 220)}px;
  --ad-checkout-rgb: ${chkRGB};
  --ad-checkout-op: ${clamp(+c.CHECKOUT_OPACITY ?? 0.55, 0, 1)};

  --ad-triple-shimmer-ms: ${clamp(+c.TRIPLE_SHIMMER_MS || 2000, 400, 6000)}ms;
  --ad-triple-slam-ms: ${clamp(+c.TRIPLE_SLAM_MS || 350, 80, 1200)}ms;
  --ad-triple-rattle-ms: ${clamp(+c.TRIPLE_RATTLE_MS || 500, 80, 2000)}ms;
  --ad-triple-rattle-delay-ms: ${clamp(+c.TRIPLE_RATTLE_DELAY_MS || 0, 0, 2500)}ms;
}

/* Total overlay: settings apply + card height unchanged */
.ad-total-cell{
  position: relative !important;
  overflow: hidden !important;
  background-color: rgba(var(--ad-total-bg-rgb), var(--ad-total-bg-op)) !important;
  border-radius: 16px !important;

  /* keret le */
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

/* overlay csak a szám, ne a háttér */
.ad-total-overlay{
  background: transparent !important;
  border-radius: inherit !important;
  position:absolute !important;
  inset:0 !important;
  display:flex !important;
  align-items:center !important;
  justify-content:center !important;
  width:100% !important;
  height:100% !important;
  pointer-events:none !important;
}
`);

      if (c.ACTIVE_PLAYER_HIGHLIGHT) {
        css.push(`
#ad-ext-player-display > div{ transition: box-shadow .18s ease, outline-color .18s ease, filter .18s ease; }
#ad-ext-player-display > div.${ACTIVE_CLASS}{
  outline: var(--ad-active-outline) solid rgba(var(--ad-active-rgb), .85) !important;
  outline-offset: calc(-1 * var(--ad-active-outline)) !important;
  box-shadow:
    0 0 0 1px rgba(255,255,255,.16) inset,
    0 0 36px rgba(var(--ad-active-rgb), calc(var(--ad-active-glow) * 1.0)),
    0 0 110px rgba(var(--ad-active-rgb), calc(var(--ad-active-glow) * 0.66)),
    0 18px 42px rgba(0,0,0,.55) !important;
  filter: brightness(1.05) saturate(1.06) !important;
}
`);
      }

      if (c.THROWS_TO_POINTS) {
        css.push(`
.ad-ext-turn-throw{ position: relative !important; }
#ad-ext-turn .ad-ext-turn-throw.ad-has-throw,
#ad-ext-turn .ad-ext-turn-throw:has(p[data-adval]){
  background-color: rgba(var(--ad-throw-bg-rgb), var(--ad-throw-bg-op)) !important;
  background-image: none !important;
  border: 1px solid rgba(0,0,0,.25) !important;
}

/* Hover + kattintás + selected állapot: ne szürküljön */
#ad-ext-turn .ad-ext-turn-throw.ad-has-throw:hover,
#ad-ext-turn .ad-ext-turn-throw:has(p[data-adval]):hover,

#ad-ext-turn .ad-ext-turn-throw.ad-has-throw:active,
#ad-ext-turn .ad-ext-turn-throw:has(p[data-adval]):active,

#ad-ext-turn .ad-ext-turn-throw.ad-has-throw:focus,
#ad-ext-turn .ad-ext-turn-throw:has(p[data-adval]):focus,

#ad-ext-turn .ad-ext-turn-throw.ad-has-throw[aria-selected="true"],
#ad-ext-turn .ad-ext-turn-throw:has(p[data-adval])[aria-selected="true"],

#ad-ext-turn .ad-ext-turn-throw.ad-has-throw[aria-current="true"],
#ad-ext-turn .ad-ext-turn-throw:has(p[data-adval])[aria-current="true"],

#ad-ext-turn .ad-ext-turn-throw.ad-has-throw[aria-pressed="true"],
#ad-ext-turn .ad-ext-turn-throw:has(p[data-adval])[aria-pressed="true"],

#ad-ext-turn .ad-ext-turn-throw.ad-has-throw[data-selected="true"],
#ad-ext-turn .ad-ext-turn-throw:has(p[data-adval])[data-selected="true"],

#ad-ext-turn .ad-ext-turn-throw.ad-has-throw[data-active="true"],
#ad-ext-turn .ad-ext-turn-throw:has(p[data-adval])[data-active="true"]{
  background-color: rgba(var(--ad-throw-hover-bg-rgb), var(--ad-throw-hover-bg-op)) !important;
  background-image: none !important;
}
#ad-ext-turn .ad-ext-turn-throw.ad-has-throw,
#ad-ext-turn .ad-ext-turn-throw.ad-has-throw *{ color:#000 !important; }

/* Sticky selected (userscript) – kattintva is maradjon narancs */
#ad-ext-turn .ad-ext-turn-throw.ad-click-selected,
#ad-ext-turn .ad-ext-turn-throw.ad-click-selected:hover{
  background-color: rgba(var(--ad-throw-hover-bg-rgb), var(--ad-throw-hover-bg-op)) !important;
  background-image: none !important;
}

#ad-ext-turn .ad-ext-turn-throw.css-1tv7rud.ad-has-throw,
#ad-ext-turn .ad-ext-turn-throw.css-1tv7rud:has(p[data-adval]){
  background-color: rgba(var(--ad-throw-hover-bg-rgb), var(--ad-throw-hover-bg-op)) !important;
  background-image: none !important;
  border: 1px solid rgba(0,0,0,.25) !important;
}

.ad-ext-turn-throw p{
  position:relative !important;
  display:flex !important;
  align-items:center !important;
  justify-content:center !important;
  width:100% !important;
  height:100% !important;
  padding:10px 12px !important;
  box-sizing:border-box !important;
  font-size:0 !important;
  line-height:1 !important;
}
.ad-ext-turn-throw p::after{
  content: attr(data-adval);
  font-family:'Barlow Condensed', system-ui, sans-serif !important;
  font-weight:800 !important;
  font-size:var(--ad-throw-font) !important;
  line-height:1 !important;
  letter-spacing:1px !important;
  color: rgba(var(--ad-throw-rgb), var(--ad-throw-op)) !important;
}
.ad-ext-turn-throw p:not([data-adval])::after{ content:"" !important; }
`);
        if (c.SHOW_ORIG_IN_CORNER) {
          css.push(`
.ad-ext-turn-throw p::before{
  content: attr(data-adorig);
  position:absolute !important;
  right:10px !important;
  bottom:8px !important;
  font-family:'Barlow Condensed', system-ui, sans-serif !important;
  font-weight:700 !important;
  font-size:var(--ad-orig-font) !important;
  line-height:1 !important;
  letter-spacing:.5px !important;
  color: rgba(var(--ad-orig-rgb), var(--ad-orig-op)) !important;
  pointer-events:none !important;
}
.ad-ext-turn-throw p:not([data-adorig])::before{ content:"" !important; }
`);
        } else {
          css.push(`.ad-ext-turn-throw p::before{ content:"" !important; }`);
        }
      }

      if (c.TOTAL_VIEW) {
        css.push(`
.ad-ext-turn-total-value,
.ad-ext-turn-total-value *{
  font-family:'Barlow Condensed', system-ui, sans-serif !important;
  font-weight:800 !important;
  font-size:var(--ad-total-font) !important;
  line-height:1 !important;
  letter-spacing:1px !important;
  color: rgba(var(--ad-total-rgb), var(--ad-total-op)) !important;
  filter:none !important;
  text-shadow:none !important;
}
`);
      }

      if (c.CHECKOUT_VIEW) {
        css.push(`
.ad-ext-turn-checkout-value,
.ad-ext-turn-checkout-value *{
  font-family:'Barlow Condensed', system-ui, sans-serif !important;
  font-weight:800 !important;
  font-size:var(--ad-checkout-font) !important;
  line-height:1 !important;
  letter-spacing:1px !important;
  color: rgba(var(--ad-checkout-rgb), var(--ad-checkout-op)) !important;
  text-shadow:none !important;
}
`);
      }

      if (c.TRIPLE_ANIM) {
        css.push(`
.${TRIPLE_CLASS}{
  -webkit-mask: linear-gradient(-60deg,#000 30%,#0005,#000 70%) left/300% 100%;
  background-repeat:no-repeat;
  animation:
    adShimmer var(--ad-triple-shimmer-ms) linear 0ms infinite,
    adRattle  var(--ad-triple-rattle-ms) ease-out var(--ad-triple-rattle-delay-ms) 1;
  overflow:visible;
}
.${TRIPLE_CLASS} p{
  animation: adSlam var(--ad-triple-slam-ms) ease-in 1;
  font-weight:900 !important;
}
@keyframes adShimmer { 100% { -webkit-mask-position:right; } }
@keyframes adSlam {
  0%   { transform: scale(10,10); opacity:0; }
  40%  { opacity:0; }
  100% { transform: scale(1,1); opacity:1; }
}
@keyframes adRattle {
  0% { margin-top:0; margin-left:0; }
  10% { margin-top:-5px; margin-left:0; }
  20% { margin-top:0; margin-left:-5px; }
  30% { margin-top:5px; margin-left:0; }
  40% { margin-top:0; margin-left:5px; }
  50% { margin-top:-2px; margin-left:0; }
  60% { margin-top:0; margin-left:-2px; }
  70% { margin-top:2px; margin-left:0; }
  80% { margin-top:0; margin-left:2px; }
  90% { margin-top:-1px; margin-left:0; }
  100% { margin-top:0; margin-left:0; }
}
`);
      }

      style.textContent = css.join("\n");
    });
  }

  /* ================== SKIN / STYLEBOT CSS (INTEGRATED) ================== */
  // ✅ ide került 1:1-ben a Stylebot CSS-ed
  const EXTRA_CSS = String.raw`
:root{
  --ad-ui-scale: 1;
}

:root:has(#ad-ext-turn){
  overflow: hidden !important;
}

:root:has(#ad-ext-turn) body{
  overflow: hidden !important;
}

:root:has(#ad-ext-turn) #root{
  width:  calc(100vw / var(--ad-ui-scale)) !important;
  height: calc(100vh / var(--ad-ui-scale)) !important;

  transform: scale(var(--ad-ui-scale)) !important;
  transform-origin: top left !important;
  will-change: transform;
}

:root {
  --spacing-player: 20px;
}

/* =========================================================
   1–2 játékos:
   ========================================================= */

:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(1):only-child {
  top: 95px;
  left: 60px;
  height: calc(100% - 100px);
}

:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(1):nth-last-child(2) {
  top: 95px;
  left: 60px;
  height: calc(100% - 100px);
}

:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(2):nth-last-child(1) {
  top: 95px;
  right: 60px;
  height: calc(100% - 100px);
}

/* Név pozíció 1–2 játékosnál */
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display:has(> div:nth-child(2):nth-last-child(1)) .css-y3hfdd,
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display:has(> div:only-child) .css-y3hfdd {
  position: absolute;
  top: 14em; /* szabadon állítható */
}

/* =========================================================
   3–4 játékos:
   ========================================================= */

/* 1 (fent bal) */
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(1):nth-last-child(3),
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(1):nth-last-child(4) {
  top: 95px;
  left: 60px;
  height: calc((105% - 180px) / 2 - var(--spacing-player));
}

/* 2 (fent jobb) */
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(2):nth-last-child(2),
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(2):nth-last-child(3) {
  top: 95px;
  right: 60px;
  height: calc((105% - 180px) / 2 - var(--spacing-player));
}

/* 3 (lent bal) */
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(3):nth-last-child(1),
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(3):nth-last-child(2) {
  top: calc(95px + ((100% - 180px) / 2) + var(--spacing-player));
  left: 60px;
  height: calc((105% - 180px) / 2 - var(--spacing-player));
}

/* 4 (lent jobb) */
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(4):last-child {
  top: calc(95px + ((100% - 180px) / 2) + var(--spacing-player));
  right: 60px;
  height: calc((105% - 180px) / 2 - var(--spacing-player));
}

/* Név pozíció 3–4 játékosnál */
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display:has(> div:nth-child(3):nth-last-child(2)) .css-y3hfdd,
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display:has(> div:nth-child(4):last-child) .css-y3hfdd {
  position: absolute;
  top: 7em; /* szabadon állítható */
}

/* =========================================================
   5–6 játékos:
   ========================================================= */

:root {
  --row-height-3: calc((108% - 180px) / 3 - var(--spacing-player));
}

/* 1 (fent bal) */
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(1):nth-last-child(5),
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(1):nth-last-child(6) {
  top: 95px;
  left: 60px;
  height: var(--row-height-3);
}

/* 2 (fent jobb) */
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(2):nth-last-child(4),
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(2):nth-last-child(5) {
  top: 95px;
  right: 60px;
  height: var(--row-height-3);
}

/* 3 (közép bal) */
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(3):nth-last-child(3),
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(3):nth-last-child(4) {
  top: calc(95px + ((100% - 180px) / 3) + var(--spacing-player));
  left: 60px;
  height: var(--row-height-3);
}

/* 4 (közép jobb) */
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(4):nth-last-child(2),
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(4):nth-last-child(3) {
  top: calc(95px + ((100% - 180px) / 3) + var(--spacing-player));
  right: 60px;
  height: var(--row-height-3);
}

/* 5 (lent bal) */
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(5):nth-last-child(1),
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(5):nth-last-child(2) {
  top: calc(95px + 2 * ((100% - 180px) / 3) + 2 * var(--spacing-player));
  left: 60px;
  height: var(--row-height-3);
}

/* 6 (lent jobb) */
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div:nth-child(6):last-child {
  top: calc(95px + 2 * ((100% - 180px) / 3) + 2 * var(--spacing-player));
  right: 60px;
  height: var(--row-height-3);
}

/* Név pozíció 5–6 játékosnál */
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display:has(> div:nth-child(5):nth-last-child(1)) .css-y3hfdd,
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display:has(> div:nth-child(6):last-child) .css-y3hfdd {
  position: absolute;
  top: 2em; /* szabadon állítható */
}

/* =========================================================
   Hover / kattintás vizuál.
   ========================================================= */

:root:not(:has(.css-rc3vw3)) #ad-ext-turn .ad-ext-turn-throw:hover {
  box-shadow: var(--color-shadow-strong);
  transform: scale(1.03);
  cursor: pointer;
}

/* =========================================================
   Konténerek / méretek
   ========================================================= */

:root:not(:has(.css-rc3vw3)) .css-tkevr6 {
  position: relative;
  width: 100%;
  height: 95%;
  box-sizing: border-box;
}

/* Player box szélesség */
:root:not(:has(.css-rc3vw3)) #ad-ext-player-display > div {
  position: absolute;
  width: 411px;
}

/* Scoring + Bullout teljes szélesség */
:root:not(:has(.css-rc3vw3)) .css-1omnor5,
:root:not(:has(.css-rc3vw3)) .css-ul22ge {
  width: 900px;
}

/* Scoring elemek magasság */
:root:not(:has(.css-rc3vw3)) .css-1dkgpmk,
:root:not(:has(.css-rc3vw3)) .css-1wlduvp,
:root:not(:has(.css-rc3vw3)) .css-sm8wdq,
:root:not(:has(.css-rc3vw3)) .css-881tme,
:root:not(:has(.css-rc3vw3)) #ad-ext-turn .css-rrf7rv,
:root:not(:has(.css-rc3vw3)) #ad-ext-turn .score.css-156dsds,
:root:not(:has(.css-rc3vw3)) #ad-ext-turn .ad-ext-turn-throw.css-1p5spmi {
  height: 110px;
}

/* Menüsáv teljes szélesség */
:root:not(:has(.css-rc3vw3)) .css-19lo6pj {
  width: 150%;
}

/* =========================================================
   Chalkboard (1v1)
   ========================================================= */

:root:has(.css-1u90hiz) .css-1u90hiz {
  position: absolute;
  right: 6.2em;
  height: 350px;
  width: 50%;
  top: 500px;
}

:root:has(.css-1u90hiz) tbody tr td {
  font-size: 35px;
  width: 52%;
}

/* =========================================================
   Scoring + board pozíció
   ========================================================= */

:root:not(:has(.css-rc3vw3)):root:not(:has(.css-7lnr9n)):root:not(:has(.css-15suq9)) .css-1emway5,
:root:not(:has(.css-rc3vw3)):root:not(:has(.css-15suq9)) .css-jbngkd,
:root:not(:has(.css-rc3vw3)) .css-1cdcn26 {
  position: relative;
  top: 1em;
}

/* =========================================================
   Avatar: méret + pozíció (1v1)
   ========================================================= */

:root:not(:has(.css-rc3vw3)):root:has(.css-1cdcn26):root:not(:has(#ad-ext-player-display > div:nth-child(3))) div.chakra-stack.css-1psdi5l {
  position: absolute;
  top: -180px;
  left: 50%;
  transform: translate(-3%, -50%);
  scale: 7;
}

:root:not(:has(.css-rc3vw3)):root:has(.css-1cdcn26):root:not(:has(#ad-ext-player-display > div:nth-child(3))) img.chakra-image.css-6t0bzd {
  scale: 0.5;
}

/* =========================================================
   BOARD – Winmau/BladeX look + szürke keret
   ========================================================= */

:root{
  --bladex-black:  #1b1b1b;
  --bladex-cream:  #e9e3d9;
  --bladex-red:    #cf2a2a;
  --bladex-green:  #1f8f3a;
  --bladex-ring:   #2a2f34;
  --bladex-number: #bfc5cb;
}

svg.ad-board-svg{
  filter: none !important;
  opacity: 1 !important;
  border-radius: 50% !important;
  box-shadow:
    0 0 0 6px rgba(207,211,215,.9),
    0 0 0 12px rgba(0,0,0,.35) !important;
}

svg.ad-board-svg [fill="#212121"],
svg.ad-board-svg [fill="#1a1a1a"],
svg.ad-board-svg [fill="#000"],
svg.ad-board-svg [fill="#000000"]{
  fill: var(--bladex-black) !important;
}

svg.ad-board-svg [fill="#f5f5f5"],
svg.ad-board-svg [fill="#ffffff"],
svg.ad-board-svg [fill="#fff"],
svg.ad-board-svg [fill="#F5F5F5"],
svg.ad-board-svg [fill="#FFFFFF"]{
  fill: var(--bladex-cream) !important;
}

svg.ad-board-svg [fill="#e53935"],
svg.ad-board-svg [fill="#ef5350"],
svg.ad-board-svg [fill="#f44336"]{
  fill: var(--bladex-red) !important;
}

svg.ad-board-svg [fill="#43a047"],
svg.ad-board-svg [fill="#66bb6a"],
svg.ad-board-svg [fill="#4caf50"]{
  fill: var(--bladex-green) !important;
}

svg.ad-board-svg [fill="#2b2b2b"],
svg.ad-board-svg [fill="#303030"],
svg.ad-board-svg [fill="#333333"]{
  fill: var(--bladex-ring) !important;
}

svg.ad-board-svg text{
  fill: var(--bladex-number) !important;
}

/* =========================================================
   Háttér – teljes kitöltés (COVER)
   ========================================================= */

:root:has(.css-1cdcn26) body,
:root:has(.css-1cdcn26) #root,
:root:has(.css-1cdcn26) .css-z42oq0,
:root:has(.css-1cdcn26) .css-nfhdnc,
:root:not(:has(.css-1cdcn26)) body,
:root:not(:has(.css-1cdcn26)) #root,
:root:not(:has(.css-1cdcn26)) .css-z42oq0,
:root:not(:has(.css-1cdcn26)) .css-nfhdnc {
  background-color: #081a28 !important;

  background-image:
    linear-gradient(rgba(8,26,40,.55), rgba(8,26,40,.55)),
    url("https://i.imgur.com/L7D6OpO.jpeg") !important;

  background-repeat: no-repeat !important;
  background-position: center bottom !important;
  background-size: cover !important;
  background-attachment: fixed !important;
}
`;

  function ensureSkinCss() {
    ensureHead(() => {
      const c = cfg();
      const on = !!c.SKIN_CSS;

      let st = document.getElementById(EXTRA_STYLE_ID);
      if (!on) {
        if (st) st.remove();
        return;
      }

      if (!st) {
        st = document.createElement("style");
        st.id = EXTRA_STYLE_ID;
      }

      const scale = clamp(Number(c.SKIN_UI_SCALE ?? 1), 0.85, 1.15);
      const spacing = clamp(Number(c.SKIN_SPACING_PLAYER ?? 20), 0, 80);
      const alpha = clamp(Number(c.SKIN_BG_OVERLAY_ALPHA ?? 0.55), 0, 1);
      const url = sanitizeUrl(c.SKIN_BG_URL, DEFAULT_CFG.SKIN_BG_URL);
      const pbgRGB = hexToRgbString(sanitizeHex(c.SKIN_PLAYER_BG_HEX, "#000000"));
      const pbgOp  = clamp(Number(c.SKIN_PLAYER_BG_OPACITY ?? 0.35), 0, 1);

      const dyn = String.raw`
:root{
  --ad-ui-scale: ${scale};
  --spacing-player: ${spacing}px;
  --ad-bg-overlay-alpha: ${alpha};
  --ad-bg-url: url("${cssUrl(url)}");
  --ad-player-bg-rgb: ${pbgRGB};
  --ad-player-bg-op: ${pbgOp};
}

/* override background-image to use the editable URL + overlay alpha */
:root:has(.css-1cdcn26) body,
:root:has(.css-1cdcn26) #root,
:root:has(.css-1cdcn26) .css-z42oq0,
:root:has(.css-1cdcn26) .css-nfhdnc,
:root:not(:has(.css-1cdcn26)) body,
:root:not(:has(.css-1cdcn26)) #root,
:root:not(:has(.css-1cdcn26)) .css-z42oq0,
:root:not(:has(.css-1cdcn26)) .css-nfhdnc {
  background-image:
    linear-gradient(rgba(8,26,40,var(--ad-bg-overlay-alpha)), rgba(8,26,40,var(--ad-bg-overlay-alpha))),
    var(--ad-bg-url) !important;
}

/* IMPORTANT: keep CORE adjustable card backgrounds even when Skin CSS is ON */
#ad-ext-turn .ad-ext-turn-throw.ad-has-throw{
  background-color: rgba(var(--ad-throw-bg-rgb), var(--ad-throw-bg-op)) !important;
  background-image: none !important;
}
#ad-ext-turn .ad-ext-turn-throw.ad-has-throw:hover{
  background-color: rgba(var(--ad-throw-hover-bg-rgb), var(--ad-throw-hover-bg-op)) !important;
  background-image: none !important;
}

/* ✅ STICKY SELECT: Skin CSS mellett is maradjon hover szín */
#ad-ext-turn .ad-ext-turn-throw.ad-click-selected,
#ad-ext-turn .ad-ext-turn-throw.ad-click-selected:hover{
  background-color: rgba(var(--ad-throw-hover-bg-rgb), var(--ad-throw-hover-bg-op)) !important;
  background-image: none !important;
}

/* Player panelek háttér (Skin/Layout) */
#ad-ext-player-display > div{
  background-color: rgba(var(--ad-player-bg-rgb), var(--ad-player-bg-op)) !important;
}
`;

      st.textContent = EXTRA_CSS + "\n" + dyn;

      const core = document.getElementById(STYLE_ID);
      if (core && core.parentNode) {
        if (!st.parentNode) core.parentNode.appendChild(st);
        if (core.nextSibling !== st) core.after(st);
      } else if (!st.parentNode) {
        document.head.appendChild(st);
      }
    });
  }

  /* ================== BOARD MARKER ================== */
  function isBoardSvg(svg) {
    if (!svg) return false;
    const pathCount = svg.querySelectorAll("path").length;
    if (pathCount < 40) return false;

    const has20Text = Array.from(svg.querySelectorAll("text")).some(t => (t.textContent || "").trim() === "20");
    const vb = (svg.getAttribute("viewBox") || "").split(/\s+/).map(Number);
    const looksSquareVB = vb.length === 4 && Math.abs((vb[2] || 0) - (vb[3] || 0)) < 5 && (vb[2] || 0) > 300;

    return has20Text || (looksSquareVB && pathCount > 120);
  }

  function applyBoardMarkerNow() {
    const c = cfg();
    const svgs = document.querySelectorAll("svg");
    for (const svg of svgs) {
      const isBoard = isBoardSvg(svg);
      const has = svg.classList.contains("ad-board-svg");
      if (c.BOARD_MARKER) { if (isBoard && !has) svg.classList.add("ad-board-svg"); }
      else { if (has) svg.classList.remove("ad-board-svg"); }
    }
  }

  let boardMarkScheduled = false;
  function scheduleBoardMark() {
    if (boardMarkScheduled) return;
    boardMarkScheduled = true;
    requestAnimationFrame(() => {
      boardMarkScheduled = false;
      applyBoardMarkerNow();
    });
  }

  /* ================== BOARD MANAGER BACK BUTTON ================== */
  const BM_BTN_ID = "ad-bm-back-btn";
  function isBoardsPage() { return location.pathname.startsWith("/boards"); }

  function removeBmBackButton() {
    const el = document.getElementById(BM_BTN_ID);
    if (el) el.remove();
  }

  function ensureBmBackButton() {
    const c = cfg();
    if (!isBoardsPage()) { removeBmBackButton(); return; }
    if (!c.BM_BACK_BUTTON) { removeBmBackButton(); return; }

    const label = T().bmBackLabel;

    const existing = document.getElementById(BM_BTN_ID);
    if (existing) {
      const span = existing.querySelector("span");
      if (span && span.textContent !== label) span.textContent = label; // ✅ nyelvváltásnál is frissül
      return;
    }

    const candidates = Array.from(document.querySelectorAll("a.chakra-button, button.chakra-button"));
    if (!candidates.length) return;

    const anchor = candidates.reverse().find(el => el && el.offsetParent !== null);
    if (!anchor) return;

    const a = document.createElement("a");
    a.id = BM_BTN_ID;
    a.href = "https://play.autodarts.io/";
    a.target = "_self";
    a.rel = "noopener";
    Object.assign(a.style, {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 12px",
      borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.16)",
      background: "rgba(255,255,255,0.08)",
      color: "#fff",
      textDecoration: "none",
      fontWeight: "800",
      whiteSpace: "nowrap",
    });

    a.addEventListener("mouseenter", () => a.style.filter = "brightness(1.12)");
    a.addEventListener("mouseleave", () => a.style.filter = "none");

    a.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
           viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4"/>
        <path d="M16 17l5-5-5-5"/>
        <path d="M19.8 12H9"/>
      </svg>
      <span>${label}</span>
    `;

    anchor.insertAdjacentElement("afterend", a);
  }

  /* ================== THROWS -> POINTS ================== */
  function parseThrow(raw) {
    const t = (raw || "").trim().toUpperCase();
    const mm = t.match(/^M(\d{1,2})$/i);
    if (mm) return { points: 0, orig: null, missLabel: true };
    if (t === "MISS" || t === "0") return { points: 0, orig: null, missLabel: true };
    if (t === "BULL" || t === "DBULL" || t === "50") return { points: 50, orig: raw };
    if (t === "SBULL" || t === "25") return { points: 25, orig: raw };

    const m = t.match(SDT_RE);
    if (m) {
      const ch = m[1];
      const num = parseInt(m[2], 10);
      const mult = ch === "S" ? 1 : (ch === "D" ? 2 : 3);
      return { points: num * mult, orig: raw };
    }
    return { points: null, orig: raw };
  }

  function isPlaceholderRaw(raw) {
    const t = (raw || "").trim();
    return (t === "" || t === "..." || t.includes("•") || t === "…" || t.toLowerCase() === "null");
  }

  let __adStickyInit = false;

  function initStickyThrowSelectOnce(){
  if (__adStickyInit) return;
  __adStickyInit = true;

  document.addEventListener("pointerdown", (e) => {
    if (e.button != null && e.button !== 0) return;

    // 1) keressük meg a kártyát a composedPath-ban (stabilabb)
    let card = null;
    const path = (typeof e.composedPath === "function") ? e.composedPath() : null;
    if (path) {
      for (const n of path) {
        if (n && n.classList && n.classList.contains("ad-ext-turn-throw")) { card = n; break; }
      }
    }
    // 2) fallback: closest
    if (!card) card = e.target?.closest?.(".ad-ext-turn-throw");
    if (!card) return;

    const turn = card.closest("#ad-ext-turn") || document.querySelector("#ad-ext-turn");
    if (!turn) return;

    const cards = Array.from(turn.querySelectorAll(".ad-ext-turn-throw"));
    const idx = cards.indexOf(card);
    if (idx < 0) return;

    // fontos: itt MOST NEM szűrünk ad-has-throw / data-adval alapján,
    // mert pont ez szokott “nem kész lenni” kattintáskor.
    // Csak a teljesen üres/placeholdert dobjuk ki:
    const p = card.querySelector("p");
    const raw = (p?.textContent || "").trim();
    if (isPlaceholderRaw(raw)) return;

    const curRaw = turn.getAttribute(TURN_SEL_ATTR);
    const cur = (curRaw == null) ? -1 : (parseInt(curRaw, 10) | 0);
    const next = (cur === idx) ? -1 : idx;

    if (next < 0) turn.removeAttribute(TURN_SEL_ATTR);
    else turn.setAttribute(TURN_SEL_ATTR, String(next));

    applyStickyThrowSelection(turn);

    dirtyTurn();
    scheduleUpdate();

    if (toastEl) showToast(next < 0 ? "Select OFF" : `Select ${next + 1}`);
  }, true);
}

  function updateThrowGroup(parent) {
    const c = cfg();
    const throwDivs = Array.from(parent.children).filter((el) => el.classList?.contains("ad-ext-turn-throw"));
    if (!throwDivs.length) return;

    const ps = throwDivs.map((d) => d.querySelector("p")).filter(Boolean);
    if (!ps.length) return;

    const raws = ps.map((p) => (p.textContent || "").trim());
    const parsed = raws.map((raw) => isPlaceholderRaw(raw) ? { _placeholder: true } : parseThrow(raw));

    parsed.forEach((it, i) => {
      const p = ps[i];
      const card = p.closest(".ad-ext-turn-throw");

      if (it._placeholder) {
        if (card) {
          card.classList.remove("ad-has-throw");
          card.classList.remove("ad-click-selected");
        }
        if ("adval" in p.dataset) delete p.dataset.adval;
        if ("adorig" in p.dataset) delete p.dataset.adorig;
        return;
      }

      if (card) card.classList.add("ad-has-throw");

      const shown = it.missLabel ? "MISS" : (typeof it.points === "number" ? String(it.points) : raws[i]);
      const orig  = it.missLabel ? null : (it.orig ?? raws[i]);

      p.dataset.adval = shown;

      if (c.SHOW_ORIG_IN_CORNER) {
        if (orig) p.dataset.adorig = orig;
        else if ("adorig" in p.dataset) delete p.dataset.adorig;
      } else {
        if ("adorig" in p.dataset) delete p.dataset.adorig;
      }
    });
  }

  function updateAllThrowGroups(turn) {
    const throwEls = turn.querySelectorAll(".ad-ext-turn-throw");
    const parents = new Set();
    for (const t of throwEls) if (t.parentElement) parents.add(t.parentElement);
    for (const p of parents) updateThrowGroup(p);
  }

function applyStickyThrowSelection(turn){
  if (!turn) return;

  const rawAttr = turn.getAttribute(TURN_SEL_ATTR);
  let idx = (rawAttr == null) ? -1 : (parseInt(rawAttr, 10) | 0);

  const cards = Array.from(turn.querySelectorAll(".ad-ext-turn-throw"));
  if (!cards.length) return;

  // ha rossz index (pl. kevesebb kártya lett), töröljük az attribútumot
  if (idx < 0 || idx >= cards.length) {
    if (rawAttr != null) turn.removeAttribute(TURN_SEL_ATTR);
    cards.forEach(c => c.classList.remove("ad-click-selected"));
    return;
  }

  // ha a kiválasztott kártya placeholder lett -> töröljük a kijelölést
  const p = cards[idx].querySelector("p");
  const txt = (p?.textContent || "").trim();
  if (isPlaceholderRaw(txt)) {
    turn.removeAttribute(TURN_SEL_ATTR);
    idx = -1;
  }

  cards.forEach((c, i) => c.classList.toggle("ad-click-selected", idx >= 0 && i === idx));
}

  /* ================== TOTAL OVERLAY FIX ================== */
  function restoreTotalOverlays(root = document) {
    root.querySelectorAll(".ad-total-overlay").forEach(el => el.remove());
    root.querySelectorAll("[data-ad-total-hidden='1']").forEach(el => {
      el.removeAttribute("data-ad-total-hidden");
      el.style.position = "";
      el.style.left = "";
      el.style.top = "";
      el.style.width = "";
      el.style.height = "";
      el.style.overflow = "";
      el.style.opacity = "";
      el.style.pointerEvents = "";
    });
    root.querySelectorAll(".ad-total-cell").forEach(el => el.classList.remove("ad-total-cell"));
  }

  function findNumericLeaf(container) {
    if (!container) return null;
    const all = [container, ...container.querySelectorAll("*")];
    for (const el of all) {
      const txt = (el.textContent || "").trim();
      if (!/^\d{1,4}$/.test(txt)) continue;
      if (el.children && el.children.length > 0) continue;
      return el;
    }
    return null;
  }

  function forceCenterTotalOverlay(turn) {
    if (!turn) return;

    const leaf = (() => {
      const candidates = Array.from(turn.querySelectorAll("p.ad-ext-turn-points, .ad-ext-turn-points"));
      for (const el of candidates) {
        const txt = (el.textContent || "").trim();
        if (/^\d{1,4}$/.test(txt) && !el.closest(".ad-ext-turn-throw")) return el;
      }
      const f = findNumericLeaf(turn);
      if (f && !f.closest(".ad-ext-turn-throw")) return f;
      return null;
    })();
    if (!leaf) return;

    const value = (leaf.textContent || "").trim();
    if (!/^\d{1,4}$/.test(value)) return;

    let cell = leaf;
    while (cell && cell.parentElement && cell.parentElement !== turn) cell = cell.parentElement;
    if (!cell || cell === turn) return;

    cell.classList.add("ad-total-cell");

    let overlay = cell.querySelector(".ad-total-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "ad-total-overlay ad-ext-turn-total-value";
      cell.appendChild(overlay);
    }
    if (overlay.textContent !== value) overlay.textContent = value;
      overlay.classList.remove("ad-ext-turn-checkout-value");
      overlay.classList.add("ad-ext-turn-total-value");

    if (leaf.dataset.adTotalHidden !== "1") {
      leaf.dataset.adTotalHidden = "1";
      leaf.style.position = "absolute";
      leaf.style.left = "-9999px";
      leaf.style.top = "-9999px";
      leaf.style.width = "1px";
      leaf.style.height = "1px";
      leaf.style.overflow = "hidden";
      leaf.style.opacity = "0";
      leaf.style.pointerEvents = "none";
    }
  }

  /* ================== CHECKOUT MARK ================== */
  function isInButton(el) { return !!el.closest?.("button"); }
function markCheckoutInTurnBar(turn) {
  if (!turn) return;

  // ✅ Biztonság: a Total környékén soha ne legyen checkout class
  turn.querySelectorAll(".ad-total-cell .ad-ext-turn-checkout-value, .ad-total-overlay.ad-ext-turn-checkout-value")
      .forEach(el => el.classList.remove("ad-ext-turn-checkout-value"));

  const nodes = turn.querySelectorAll(".chakra-text, p, span, div");

  for (const el of nodes) {
    if (el.closest(".ad-ext-turn-throw")) continue;    // dobáskártyákon ne
    if (el.closest(".ad-total-cell")) continue;        // total cellen belül ne
    if (el.closest(".ad-total-overlay")) continue;     // total overlayen ne
    if (isInButton(el)) continue;                      // gombokon ne

    // ✅ KRITIKUS: csak LEAF elemet jelöljünk (különben a * selector mindent elvisz)
    if (el.children && el.children.length > 0) continue;

    const txt = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (!txt || txt.length > 10) continue;

    if (CHECKOUT_TOKEN_RE.test(txt)) el.classList.add("ad-ext-turn-checkout-value");
  }
}

  /* ================== ACTIVE PLAYER DETECT ================== */
  function parseRGBA(str) {
    const m = String(str || "").match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([0-9.]+))?\s*\)/i);
    if (!m) return null;
    return { r: +m[1], g: +m[2], b: +m[3], a: (m[4] == null ? 1 : +m[4]) };
  }
  function brightness01(rgba) { return (rgba.r + rgba.g + rgba.b) / 3 / 255; }
  function bestWhiteFromShadow(shadowStr) {
    const s = String(shadowStr || "");
    let best = 0;
    const re = /rgba?\([^)]+\)/ig;
    let m;
    while ((m = re.exec(s)) !== null) {
      const rgba = parseRGBA(m[0]);
      if (!rgba) continue;
      const b = brightness01(rgba);
      if (b < 0.78 || rgba.a < 0.12) continue;
      best = Math.max(best, b * rgba.a);
    }
    if (best > 0 && s.toLowerCase().includes("inset")) best *= 1.25;
    return best;
  }
  function styleFrameScore(cs) {
    if (!cs) return 0;
    let best = 0;
    const sides = ["top","right","bottom","left"];
    for (const side of sides) {
      const w = parseFloat(cs.getPropertyValue(`border-${side}-width`)) || 0;
      const st = cs.getPropertyValue(`border-${side}-style`) || "none";
      if (w < 0.6 || st === "none") continue;
      const col = cs.getPropertyValue(`border-${side}-color`);
      const rgba = parseRGBA(col);
      if (!rgba) continue;
      const b = brightness01(rgba);
      if (b < 0.78 || rgba.a < 0.12) continue;
      best = Math.max(best, w * b * rgba.a);
    }
    best = Math.max(best, bestWhiteFromShadow(cs.getPropertyValue("box-shadow")) * 1.5);
    return best;
  }
  function elementFrameScore(el) { return styleFrameScore(getComputedStyle(el)); }
  function panelWhiteFrameScore(panel) {
    let best = elementFrameScore(panel);
    const kids = panel.querySelectorAll("*");
    const limit = Math.min(kids.length, 24);
    for (let i = 0; i < limit; i++) {
      const el = kids[i];
      const tn = el.tagName;
      if (tn !== "DIV" && tn !== "SPAN") continue;
      best = Math.max(best, elementFrameScore(el));
    }
    return best;
  }
  function clearActiveClasses() {
    const host = document.querySelector("#ad-ext-player-display");
    if (!host) return;
    Array.from(host.children).forEach(p => p.classList?.remove(ACTIVE_CLASS));
  }
  function updateActivePlayerHighlight() {
    const c = cfg();
    if (!c.ACTIVE_PLAYER_HIGHLIGHT) return;
    const host = document.querySelector("#ad-ext-player-display");
    if (!host) return;

    const panels = Array.from(host.children).filter((n) => n && n.nodeType === 1);
    if (!panels.length) return;

    let bestPanel = null, bestScore = 0;
    for (const p of panels) {
      const s = panelWhiteFrameScore(p);
      if (s > bestScore) { bestScore = s; bestPanel = p; }
    }
    const hasActive = bestPanel && bestScore > 0.02;
    for (const p of panels) p.classList.toggle(ACTIVE_CLASS, hasActive && p === bestPanel);
  }

  /* ================== TRIPLE ================== */
  function clearTripleClasses() {
    document.querySelectorAll(".ad-ext-turn-throw").forEach(card => {
      card.classList.remove(TRIPLE_CLASS);
      if (card.dataset) delete card.dataset.adTripleToken;
    });
  }
  function restartTriple(card) {
    card.classList.remove(TRIPLE_CLASS);
    void card.offsetWidth;
    card.classList.add(TRIPLE_CLASS);
  }
  function updateTripleHighlight(turn) {
    const c = cfg();
    if (!c.TRIPLE_ANIM || !turn) return;

    const allow = new Set(TRIPLE_VALUES.map(v => String(v).toUpperCase().trim()));
    const cards = turn.querySelectorAll(".ad-ext-turn-throw");

    for (const card of cards) {
      const p = card.querySelector("p");
      const raw = (p?.textContent || "").trim().toUpperCase();

      if (!raw || raw === "..." || raw === "…" || raw.includes("•")) {
        card.classList.remove(TRIPLE_CLASS);
        if (card.dataset) delete card.dataset.adTripleToken;
        continue;
      }

      const isTriple = allow.has(raw);
      const prev = (card.dataset && card.dataset.adTripleToken) ? card.dataset.adTripleToken : "";

      if (!isTriple) {
        card.classList.remove(TRIPLE_CLASS);
        if (card.dataset) delete card.dataset.adTripleToken;
        continue;
      }

      if (prev !== raw) {
        if (card.dataset) card.dataset.adTripleToken = raw;
        restartTriple(card);
      } else {
        if (!card.classList.contains(TRIPLE_CLASS)) card.classList.add(TRIPLE_CLASS);
      }
    }
  }

  /* ================== WIN MUSIC ================== */
let winAudio = null;
let winUnlocked = false;
let winArmed = true;
let winLastPlay = 0;
let winPrevFinishPresent = false;

// ✅ ha a win UI eltűnik (next leg/set vagy auto progress), ennyi ideig várunk, hogy ne villogásra álljon le
let winUiAbsentSince = 0;
const WIN_STOP_ABSENT_MS = 450;

const WIN_PLAY_COOLDOWN_MS = 2500;
const RE_FINISH = /(finish|befejez|beenden)/i;

// ✅ ezekre a gombokra azonnal álljon le
const RE_STOP_BTN = /(finish|befejez|beenden|next\s*leg|következő\s*leg|nächste\s*leg|naechste\s*leg|next\s*set|következő\s*set|nächste\s*set|naechste\s*set)/i;

function safe(fn) { try { return fn(); } catch {} }

function stopWinAudio() {
  if (!winAudio) return;
  safe(() => { winAudio.pause(); winAudio.currentTime = 0; });
}

function installWinStopHooksOnce() {
  if (installWinStopHooksOnce._done) return;
  installWinStopHooksOnce._done = true;

  // ✅ Stop gombokra
  document.addEventListener("click", (e) => {
    const btn = e.target?.closest?.("button, a");
    if (!btn) return;
    const txt = ((btn.textContent || "") + " " + (btn.getAttribute("aria-label") || "")).trim();
    if (RE_STOP_BTN.test(txt)) stopWinAudio();
  }, true);

  // ✅ Navigáció / oldalváltás esetén is álljon le
  const onNav = () => stopWinAudio();
  window.addEventListener("popstate", onNav, true);
  window.addEventListener("hashchange", onNav, true);

  // SPA route váltás (Autodarts is ilyen)
  const _ps = history.pushState;
  history.pushState = function () {
    const r = _ps.apply(this, arguments);
    onNav();
    return r;
  };
  const _rs = history.replaceState;
  history.replaceState = function () {
    const r = _rs.apply(this, arguments);
    onNav();
    return r;
  };
}

function initWinMusicOnce() {
  if (winAudio) return;

  winAudio = new Audio(WIN_URL);
  winAudio.preload = "auto";
  winAudio.volume = clamp(Number(cfg().WIN_VOLUME ?? 1.0), 0, 1);

  installWinStopHooksOnce();

  const unlock = () => {
    if (winUnlocked || !winAudio) return;
    winUnlocked = true;

    const oldVol = winAudio.volume;
    winAudio.volume = 0;
    safe(() => { winAudio.pause(); winAudio.currentTime = 0; });

    const p = winAudio.play();
    if (p && typeof p.then === "function") {
      p.then(() => {
        safe(() => winAudio.pause());
        safe(() => (winAudio.currentTime = 0));
        winAudio.volume = oldVol;
      }).catch(() => { winAudio.volume = oldVol; winUnlocked = false; });
    } else {
      winAudio.volume = oldVol;
    }
  };

  document.addEventListener("pointerdown", unlock, true);
  document.addEventListener("keydown", unlock, true);
  document.addEventListener("click", unlock, true);
}

function hadThrowInThisTurn() {
  const turn = document.querySelector("#ad-ext-turn");
  const t = (turn?.innerText || "").toUpperCase();
  return /\b[SDT](?:[1-9]|1\d|20)\b/.test(t) || /\bSBULL\b|\bDBULL\b|\bBULL\b|\b25\b|\b50\b/.test(t);
}

function findFinishButton() {
  const btns = Array.from(document.querySelectorAll("button"));
  for (const b of btns) {
    const txt = ((b.textContent || "") + " " + (b.getAttribute("aria-label") || "")).trim();
    if (RE_FINISH.test(txt)) return b;
  }
  return null;
}

function findStopButtonPresent() {
  const btns = Array.from(document.querySelectorAll("button"));
  for (const b of btns) {
    const txt = ((b.textContent || "") + " " + (b.getAttribute("aria-label") || "")).trim();
    if (RE_STOP_BTN.test(txt)) return true;
  }
  return false;
}

function scanWinMusic() {
  const c = cfg();
  if (!c.WIN_MUSIC) return;

  if (!winAudio) initWinMusicOnce();
  if (winAudio) winAudio.volume = clamp(Number(c.WIN_VOLUME ?? 1.0), 0, 1);

  const finishPresent = !!findFinishButton();
  const stopUiPresent = finishPresent || findStopButtonPresent();

  // ha még nem volt dobás ebben a turnben, újra “élesítjük”
  if (!hadThrowInThisTurn()) winArmed = true;

  // ✅ START: finish megjelent ÉS volt dobás
  if (finishPresent && !winPrevFinishPresent && hadThrowInThisTurn()) {
    const t = Date.now();
    if (winArmed && winUnlocked && t - winLastPlay > WIN_PLAY_COOLDOWN_MS) {
      winArmed = false;
      winLastPlay = t;
      winUiAbsentSince = 0;

      safe(() => { winAudio.pause(); winAudio.currentTime = 0; });
      const pr = winAudio.play();
      if (pr && typeof pr.catch === "function") pr.catch(() => {});
    }
  }

  // ✅ STOP: csak akkor álljon meg, ha a win UI eltűnt (auto new leg/set, auto exit, stb.)
  // (nem időre, nem gif hosszra)
  if (winAudio && !winAudio.paused) {
    if (stopUiPresent) {
      winUiAbsentSince = 0;
    } else {
      if (!winUiAbsentSince) winUiAbsentSince = Date.now();
      else if (Date.now() - winUiAbsentSince >= WIN_STOP_ABSENT_MS) {
        stopWinAudio();
        winUiAbsentSince = 0;
      }
    }
  }

  winPrevFinishPresent = finishPresent;
}

  /* ================== FLOATING CLOCK ================== */
  let clockEl = null;
  let clockTimeEl = null;
  let clockDrag = null;
  let clockTicker = null;

  const CLOCK_SCALE_MIN = 0.6;
  const CLOCK_SCALE_MAX = 2.0;
  const CLOCK_SCALE_STEP = 0.05;

  function buildClockIfNeeded() {
    if (clockEl) return;

    clockEl = document.createElement("div");
    clockEl.id = "ad-core-floating-clock";
    Object.assign(clockEl.style, {
      position: "fixed",
      zIndex: 2147483647,
      left: "0px",
      top: "0px",
      padding: "10px 12px",
      borderRadius: "12px",
      boxShadow: "0 6px 18px rgba(0,0,0,.55)",
      userSelect: "none",
      pointerEvents: "auto",
      transformOrigin: "top left",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "move"
    });

    clockTimeEl = document.createElement("span");
    Object.assign(clockTimeEl.style, {
      fontSize: "22px",
      fontWeight: "800",
      fontFamily: "Arial, sans-serif",
      letterSpacing: "0.3px",
      whiteSpace: "nowrap"
    });

    clockEl.appendChild(clockTimeEl);
    document.body.appendChild(clockEl);

    clockEl.addEventListener("pointerdown", (e) => {
      const cs = state.ui.clock;
      if (!cs.enabled) return;
      if (e.button !== undefined && e.button !== 0) return;
      e.preventDefault();
      clockEl.setPointerCapture?.(e.pointerId);
      clockDrag = { dx: e.clientX - clockEl.offsetLeft, dy: e.clientY - clockEl.offsetTop };
      clockEl.style.opacity = "0.95";
    });

    window.addEventListener("pointermove", (e) => {
      if (!clockDrag || !clockEl) return;
      const cs = state.ui.clock;
      const r = clockEl.getBoundingClientRect();
      const nx = e.clientX - clockDrag.dx;
      const ny = e.clientY - clockDrag.dy;
      const safe = ensureVisible(nx, ny, r.width, r.height);
      cs.x = Math.round(safe.x);
      cs.y = Math.round(safe.y);
      applyClockPosition();
    }, { passive: true });

    window.addEventListener("pointerup", () => {
      if (!clockDrag) return;
      clockDrag = null;
      clockEl.style.opacity = "1";
      saveStateDebounced();
      showToast(T().toasts.clockSaved);
    });

    clockEl.addEventListener("wheel", (e) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const dir = e.deltaY > 0 ? -1 : 1;
      const cs = state.ui.clock;
      cs.scale = clamp(Math.round((cs.scale + dir * CLOCK_SCALE_STEP) * 100) / 100, CLOCK_SCALE_MIN, CLOCK_SCALE_MAX);
      applyClockScale();
      applyClockPosition();
      saveStateDebounced();
      renderPanelIfOpen();
    }, { passive: false });

    clockEl.addEventListener("dblclick", (e) => {
      e.preventDefault();
      const cs = state.ui.clock;
      if (e.shiftKey) cs.showSeconds = !cs.showSeconds;
      else cs.format24 = !cs.format24;
      saveStateDebounced();
      renderClockTime();
      renderPanelIfOpen();
    });

    if (!clockTicker) {
      clockTicker = setInterval(() => {
        if (!clockEl) return;
        if (!state.ui.clock.enabled) return;
        renderClockTime();
      }, 250);
    }

    applyClockStyle();
    applyClockScale();
    applyClockPosition();
    applyClockEnabled();
    renderClockTime();
  }

  function applyClockEnabled() {
    if (!clockEl) return;
    clockEl.style.display = state.ui.clock.enabled ? "flex" : "none";
  }
  function applyClockScale() {
    if (!clockEl) return;
    clockEl.style.transform = `scale(${state.ui.clock.scale || 1})`;
  }
  function applyClockStyle() {
    if (!clockEl) return;
    const cs = state.ui.clock;
    clockEl.style.background = hexToRgba(cs.bgHex, cs.bgAlpha);
    clockEl.style.color = sanitizeHex(cs.textHex, "#ffffff");
  }

  function applyClockPosition() {
    if (!clockEl) return;
    const cs = state.ui.clock;

    const r = clockEl.getBoundingClientRect();

    let x = cs.x;
    let y = cs.y;

    // default: jobb felül
    if (typeof x !== "number") x = Math.round(window.innerWidth - r.width - 16);
    if (typeof y !== "number") y = 16;

    const safe = ensureVisible(x, y, r.width, r.height, 8);

    clockEl.style.left = Math.round(safe.x) + "px";
    clockEl.style.top  = Math.round(safe.y) + "px";
  }

  // ✅ locale követi a nyelvet (hu-HU / en-US / de-DE)
  function renderClockTime() {
    if (!clockTimeEl) return;
    const cs = state.ui.clock;

    const opts = {
      hour: "2-digit",
      minute: "2-digit",
      second: cs.showSeconds ? "2-digit" : undefined,
      hour12: !cs.format24
    };
    if (!cs.showSeconds) delete opts.second;

    const loc = (state.ui.lang === "en") ? "en-US" : (state.ui.lang === "de" ? "de-DE" : "hu-HU");
    clockTimeEl.textContent = new Date().toLocaleTimeString(loc, opts);
  }

  function resetClockLook() {
    state.ui.clock = { ...clone(DEFAULT_CLOCK), enabled: state.ui.clock.enabled, x: state.ui.clock.x, y: state.ui.clock.y };
    applyClockStyle(); applyClockScale(); applyClockPosition(); renderClockTime();
    saveStateDebounced();
  }
  function resetClockPosition() {
    state.ui.clock.x = null;
    state.ui.clock.y = null;
    applyClockPosition();
    saveStateDebounced();
  }

  /* ================== PERF: DIRTY FLAGS ================== */
  const DIRTY = {
    turn: true,
    players: true,
    board: true,
    bm: true,
    skin: true,
  };
  function dirtyTurn(){ DIRTY.turn = true; }
  function dirtyPlayers(){ DIRTY.players = true; }
  function dirtyBoard(){ DIRTY.board = true; }
  function dirtyBm(){ DIRTY.bm = true; }
  function dirtySkin(){ DIRTY.skin = true; }

  /* ================== UPDATE SCHEDULING ================== */
  let scheduled = false;
  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;

      renderCss();

      // Skin only if dirty
      if (DIRTY.skin) {
        DIRTY.skin = false;
        ensureSkinCss();
      }

      if (DIRTY.board) {
        DIRTY.board = false;
        scheduleBoardMark();
      }

      if (DIRTY.bm) {
        DIRTY.bm = false;
        ensureBmBackButton();
      }

      const c = cfg();

      if (c.ACTIVE_PLAYER_HIGHLIGHT && DIRTY.players) {
        DIRTY.players = false;
        updateActivePlayerHighlight();
      }

      const turn = document.querySelector("#ad-ext-turn");
      if (turn && DIRTY.turn) {
        DIRTY.turn = false;

        if (c.TOTAL_VIEW) forceCenterTotalOverlay(turn);
        else restoreTotalOverlays(turn);

        if (c.THROWS_TO_POINTS) updateAllThrowGroups(turn);
        // ✅ mindig visszarakjuk a kijelölt kártyára
        applyStickyThrowSelection(turn);
        if (c.CHECKOUT_VIEW) markCheckoutInTurnBar(turn);
        if (c.TRIPLE_ANIM) updateTripleHighlight(turn);

        if (c.WIN_MUSIC) scanWinMusic();
      } else {
        // ✅ ha nem volt turn-dirty, akkor is tartsuk életben
        if (turn) applyStickyThrowSelection(turn);
        if (c.WIN_MUSIC) scanWinMusic();
      }

      if (clockEl) {
        applyClockStyle();
        applyClockScale();
        applyClockPosition();
        applyClockEnabled();
      }
    });
  }

  /* ================== ACTIVE POLL TIMER ================== */
  let activePollTimer = null;
  function configureActivePolling() {
    if (activePollTimer) { clearInterval(activePollTimer); activePollTimer = null; }
    const c = cfg();
    if (c.ACTIVE_PLAYER_HIGHLIGHT && (c.ACTIVE_POLL_MS | 0) > 0) {
      activePollTimer = setInterval(updateActivePlayerHighlight, c.ACTIVE_POLL_MS | 0);
    }
  }

  function applyToggleSideEffects() {
    const c = cfg();
    if (!c.ACTIVE_PLAYER_HIGHLIGHT) clearActiveClasses();
    if (!c.TRIPLE_ANIM) clearTripleClasses();
    if (!cfg().WIN_MUSIC) stopWinAudio();
    configureActivePolling();

    // toggles can affect everything
    dirtyTurn();
    dirtyPlayers();
    dirtyBoard();
    dirtyBm();
    dirtySkin();

    scheduleUpdate();
  }

  /* ================== UI ================== */
  let uiBtn = null;
  let panel = null;
  let toastEl = null;
  let fileInput = null;

  function gearIconSvg() {
    return `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0
                 .276 1.134 1.56 1.69 2.573 1.066
                 1.543-.94 3.31.826 2.37 2.37
                 -.624 1.012-.068 2.297 1.066 2.573
                 1.756.426 1.756 2.924 0 3.35
                 -1.134.276-1.69 1.56-1.066 2.573
                 .94 1.543-.826 3.31-2.37 2.37
                 -1.012-.624-2.297-.068-2.573 1.066
                 -.426 1.756-2.924 1.756-3.35 0
                 -.276-1.134-1.56-1.69-2.573-1.066
                 -1.543.94-3.31-.826-2.37-2.37
                 .624-1.012.068-2.297-1.066-2.573
                 -1.756-.426-1.756-2.924 0-3.35
                 1.134-.276 1.69-1.56 1.066-2.573
                 -.94-1.543.826-3.31 2.37-2.37
                 1.012.624 2.297.068 2.573-1.066Z"
              stroke="white" stroke-width="2" stroke-linejoin="round"/>
        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0"
              stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }

  function styleBtn(el) {
    Object.assign(el.style, {
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(0,0,0,0.55)",
      color: "#fff",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "800",
      backdropFilter: "blur(6px)",
      boxShadow: "0 10px 24px rgba(0,0,0,0.45)"
    });
    el.addEventListener("mouseenter", () => el.style.filter = "brightness(1.12)");
    el.addEventListener("mouseleave", () => el.style.filter = "none");
  }

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg || T().saved;
    toastEl.style.opacity = "1";
    toastEl.style.transform = "translateX(-50%) translateY(0)";
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      toastEl.style.opacity = "0";
      toastEl.style.transform = "translateX(-50%) translateY(6px)";
    }, 1100);
  }

  function renderPanelIfOpen(){ if (panel && state.ui.open) renderPanel(); }

  function setUIOpen(open) {
    state.ui.open = open;
    if (panel) panel.style.display = open ? "flex" : "none";
    saveStateDebounced();
  }

  function ensurePanelPosition() {
    if (!panel) return;
    const r = panel.getBoundingClientRect();

    // hagyjunk helyet alul a 44px-es fő gombnak + padding
    const RESERVED_BOTTOM = 44 + 16 + 12;

    let x = state.ui.x;
    let y = state.ui.y;

    if (typeof x !== "number") x = 16;
    if (typeof y !== "number") y = Math.round(window.innerHeight - r.height - RESERVED_BOTTOM);

    const safe = ensureVisible(x, y, r.width, r.height, 8);

    panel.style.left = Math.round(safe.x) + "px";
    panel.style.top  = Math.round(safe.y) + "px";
  }

  function ensureMainButtonPosition() {
    if (!uiBtn) return;
    const size = 44;

    let x = state.ui.btnX;
    let y = state.ui.btnY;

    if (typeof x !== "number") x = 16;
    if (typeof y !== "number") y = window.innerHeight - size - 16;

    const safe = ensureVisible(x, y, size, size, 8);

    uiBtn.style.left = Math.round(safe.x) + "px";
    uiBtn.style.top  = Math.round(safe.y) + "px";
    uiBtn.style.bottom = "auto";
    uiBtn.style.right  = "auto";
  }

  function presetLabel(i) { return i === 0 ? "A" : i === 1 ? "B" : "C"; }

  function setActivePreset(i) {
    state.activePreset = clamp(i, 0, 2);
    applySafeClampsToCfg();
    saveStateDebounced();
    renderCss();
    applyToggleSideEffects();
    renderPanelIfOpen();
    showToast(T().toasts.preset(presetLabel(state.activePreset)));
  }

  // ✅ Teljes nyelvfrissítés: panel + tooltip + /boards gomb + óra locale + toast
  function setLang(newLang) {
    state.ui.lang = (newLang === "en" || newLang === "de") ? newLang : "hu";
    saveStateDebounced();

    if (uiBtn) uiBtn.title = `${T().appTitle} (Shift+F)`;
    if (panel && state.ui.open) renderPanel();

    dirtyBm();
    scheduleUpdate();

    if (clockEl && state.ui.clock.enabled) renderClockTime();
    showToast(T().toasts.lang);
  }

  function pillStyle(level) {
    if (level === "danger") return ["rgba(255,60,60,.18)", "rgba(255,60,60,.65)"];
    if (level === "warn")   return ["rgba(255,190,60,.16)", "rgba(255,190,60,.65)"];
    return ["rgba(60,255,120,.12)", "rgba(60,255,120,.55)"];
  }

  function makePill(text, level = "ok") {
    const [bg, br] = pillStyle(level);
    const s = document.createElement("span");
    s.textContent = text;
    Object.assign(s.style, {
      minWidth: "66px",
      textAlign: "center",
      padding: "6px 8px",
      borderRadius: "999px",
      border: `1px solid ${br}`,
      background: bg,
      fontWeight: "900",
      fontSize: "12px",
      opacity: "0.95",
      userSelect: "none",
    });
    return s;
  }

  function mkRow(labelText, rightEl, compact) {
    const row = document.createElement("div");
    Object.assign(row.style, { display:"flex", alignItems:"center", justifyContent:"space-between", gap: compact ? "10px" : "12px" });
    const left = document.createElement("div");
    left.textContent = labelText;
    left.style.opacity = "0.9";
    left.style.fontSize = compact ? "12px" : "13px";
    row.appendChild(left);
    row.appendChild(rightEl);
    return row;
  }

  function mkSliderRow(labelText, slider, pillText, level, compact) {
    slider.style.width = compact ? "190px" : "220px";
    const wrap = document.createElement("div");
    Object.assign(wrap.style, { display:"flex", alignItems:"center", gap: compact ? "8px" : "10px" });
    const pill = makePill(pillText, level);
    wrap.appendChild(slider);
    wrap.appendChild(pill);
    return {
      row: mkRow(labelText, wrap, compact),
      setPill: (t, lvl="ok") => {
        pill.textContent = t;
        const [bg, br] = pillStyle(lvl);
        pill.style.background = bg;
        pill.style.border = `1px solid ${br}`;
      }
    };
  }

  function mkButton(text, onClick, variant="ghost", compact=false) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = text;

    Object.assign(b.style, {
      padding: compact ? "8px 10px" : "10px 12px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,.18)",
      cursor: "pointer",
      fontWeight: "900",
      color: "#fff",
      background: "rgba(255,255,255,.08)",
      fontSize: compact ? "12px" : "13px",
    });

    if (variant === "primary") {
      b.style.background = "rgba(60,255,120,.16)";
      b.style.border = "1px solid rgba(60,255,120,.55)";
    }

    b.addEventListener("mouseenter", () => b.style.filter = "brightness(1.12)");
    b.addEventListener("mouseleave", () => b.style.filter = "none");
    b.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); onClick?.(); });

    return b;
  }

  function tabTitle(tab) { return T().tab[tab] || tab; }

  function resetTab(tab) {
    const c = cfg();
    const d = DEFAULT_CFG;

    const map = {
      throws: ["THROW_VAL_FONT_PX","THROW_VAL_COLOR_HEX","THROW_VAL_OPACITY","THROW_BG_HEX","THROW_BG_OPACITY","THROW_HOVER_BG_HEX","THROW_HOVER_BG_OPACITY"],
      orig: ["ORIG_FONT_PX","ORIG_COLOR_HEX","ORIG_OPACITY"],
      total: ["TOTAL_FONT_PX","TOTAL_COLOR_HEX","TOTAL_OPACITY","TOTAL_BG_HEX","TOTAL_BG_OPACITY"],
      checkout: ["CHECKOUT_FONT_PX","CHECKOUT_COLOR_HEX","CHECKOUT_OPACITY"],
      active: ["ACTIVE_COLOR_HEX","ACTIVE_OUTLINE_PX","ACTIVE_GLOW"],
      triple: ["TRIPLE_SHIMMER_MS","TRIPLE_SLAM_MS","TRIPLE_RATTLE_MS","TRIPLE_RATTLE_DELAY_MS"],
      win: ["WIN_VOLUME"],
      skin: ["SKIN_UI_SCALE","SKIN_SPACING_PLAYER","SKIN_BG_URL","SKIN_BG_OVERLAY_ALPHA","SKIN_PLAYER_BG_HEX","SKIN_PLAYER_BG_OPACITY"],
    };

    if (tab === "clock") {
      const keepEnabled = state.ui.clock.enabled;
      state.ui.clock = clone(DEFAULT_CLOCK);
      state.ui.clock.enabled = keepEnabled;
      buildClockIfNeeded();
      applyClockEnabled();
      applyClockStyle();
      applyClockScale();
      applyClockPosition();
      renderClockTime();
      saveStateDebounced();
      renderPanelIfOpen();
      showToast(T().toasts.resetTab);
      return;
    }

    const keys = map[tab] || [];
    keys.forEach(k => { c[k] = d[k]; });

    applySafeClampsToCfg();
    saveStateDebounced();
    renderCss();
    dirtyTurn(); dirtyPlayers(); dirtyBoard(); dirtyBm(); dirtySkin();
    scheduleUpdate();
    showToast(T().toasts.resetTab);
    renderPanelIfOpen();
  }

  function resetPreset(idx) {
    state.presets[idx] = clone(DEFAULT_CFG);
    applySafeClampsToCfg();
    saveStateDebounced();
    renderCss();
    applyToggleSideEffects();
    renderPanelIfOpen();
    showToast(T().toasts.resetPreset);
  }

  function resetAll() {
    if (!confirm(T().resetAllConfirm)) return;
    state = clone(DEFAULT_STATE);
    saveStateNow();
    ensureUIStyle();
    renderCss();
    applyToggleSideEffects();
    renderPanelIfOpen();
    if (panel) ensurePanelPosition();
    if (uiBtn) ensureMainButtonPosition();
    if (clockEl) applyClockEnabled();
    showToast(T().toasts.resetAll);
  }

  /* ================== UI BUILD ================== */
  function buildUIChrome() {
    if (uiBtn || panel) return;
    ensureUIStyle();

    uiBtn = document.createElement("button");
    uiBtn.type = "button";
    uiBtn.title = `${T().appTitle} (Shift+F)`;
    uiBtn.innerHTML = gearIconSvg();
    Object.assign(uiBtn.style, {
      position: "fixed",
      width: "44px",
      height: "44px",
      zIndex: 2147483647,
      display: "grid",
      placeItems: "center",
      padding: "0",
      touchAction: "none",
    });
    styleBtn(uiBtn);
    document.body.appendChild(uiBtn);
    ensureMainButtonPosition();

    // click vs drag
    let btnDrag = null;
    let btnMoved = false;

    uiBtn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      uiBtn.setPointerCapture?.(e.pointerId);
      btnMoved = false;
      btnDrag = {
        sx: e.clientX,
        sy: e.clientY,
        dx: e.clientX - uiBtn.offsetLeft,
        dy: e.clientY - uiBtn.offsetTop,
      };
    });

    window.addEventListener("pointermove", (e) => {
      if (!btnDrag) return;
      const dist = Math.abs(e.clientX - btnDrag.sx) + Math.abs(e.clientY - btnDrag.sy);
      if (dist > 4) btnMoved = true;

      const nx = e.clientX - btnDrag.dx;
      const ny = e.clientY - btnDrag.dy;
      const safe = ensureVisible(nx, ny, 44, 44, 8);
      state.ui.btnX = Math.round(safe.x);
      state.ui.btnY = Math.round(safe.y);
      uiBtn.style.left = state.ui.btnX + "px";
      uiBtn.style.top  = state.ui.btnY + "px";
    }, { passive: true });

    window.addEventListener("pointerup", () => {
      if (!btnDrag) return;
      btnDrag = null;

      if (btnMoved) {
        saveStateDebounced();
        showToast(T().toasts.btnPosSaved);
        return;
      }

      setUIOpen(!state.ui.open);
      if (state.ui.open) { renderPanel(); ensurePanelPosition(); }
    });

    // panel
    panel = document.createElement("div");
    panel.id = "ad-core-panel";
    Object.assign(panel.style, {
      position: "fixed",
      left: "16px",
      top: "80px",
      zIndex: 2147483647,
      width: "780px",
      maxWidth: "calc(100vw - 32px)",
      maxHeight: "85vh",
      borderRadius: "16px",
      border: "1px solid rgba(255,255,255,0.14)",
      background: "rgba(0,0,0,0.78)",
      color: "#fff",
      boxShadow: "0 18px 48px rgba(0,0,0,0.62)",
      backdropFilter: "blur(10px)",
      fontFamily: "Arial, system-ui, sans-serif",
      display: state.ui.open ? "flex" : "none",
      flexDirection: "column",
      overflow: "hidden",
    });
    document.body.appendChild(panel);

    toastEl = document.createElement("div");
    Object.assign(toastEl.style, {
      position: "fixed",
      left: "50%",
      bottom: "18px",
      transform: "translateX(-50%) translateY(6px)",
      zIndex: 2147483647,
      padding: "10px 12px",
      borderRadius: "999px",
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(0,0,0,0.65)",
      color: "#fff",
      fontWeight: "900",
      opacity: "0",
      transition: "opacity .18s ease, transform .18s ease",
      pointerEvents: "none",
    });
    document.body.appendChild(toastEl);

    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    fileInput.addEventListener("change", (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        const parsed = tryParseJSON(reader.result);
        if (!parsed) { alert(T().alerts.invalidJson); return; }
        state = migrateToState(parsed);
        applySafeClampsToCfg();
        saveStateDebounced();
        ensureUIStyle();
        renderCss();
        dirtyTurn(); dirtyPlayers(); dirtyBoard(); dirtyBm(); dirtySkin();
        scheduleUpdate();
        renderPanel();
        buildClockIfNeeded();
        applyClockEnabled();
        applyClockStyle();
        applyClockScale();
        applyClockPosition();
        renderClockTime();
        ensureBmBackButton();
        showToast(T().toasts.import);
      };
      reader.readAsText(f);
    });

    // drag panel via header
    let drag = null;
    panel.addEventListener("pointerdown", (e) => {
      const header = panel.querySelector(".ad-core-header");
      if (!header) return;
      if (!header.contains(e.target)) return;
      if (e.target.closest("button") || e.target.closest("input") || e.target.closest("a")) return;

      e.preventDefault();
      panel.setPointerCapture?.(e.pointerId);
      drag = { dx: e.clientX - panel.offsetLeft, dy: e.clientY - panel.offsetTop };
    });

    window.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const r = panel.getBoundingClientRect();
      const safe = ensureVisible(e.clientX - drag.dx, e.clientY - drag.dy, r.width, r.height, 8);
      state.ui.x = Math.round(safe.x);
      state.ui.y = Math.round(safe.y);
      panel.style.left = state.ui.x + "px";
      panel.style.top  = state.ui.y + "px";
    }, { passive: true });

    window.addEventListener("pointerup", () => {
      if (!drag) return;
      drag = null;
      saveStateDebounced();
      showToast(T().toasts.posSaved);
    });

    window.addEventListener("resize", () => {
      if (panel && panel.style.display !== "none") ensurePanelPosition();
      ensureMainButtonPosition();
      if (clockEl) applyClockPosition();
      dirtySkin();
      scheduleUpdate();
    }, { passive: true });

    renderPanel();
    requestAnimationFrame(ensurePanelPosition);
  }

  function renderPanel() {
    if (!panel) return;
    const c = cfg();
    const L = T();
    const compact = !!state.ui.compact;

    panel.innerHTML = "";

    // HEADER
    const header = document.createElement("div");
    header.className = "ad-core-header";
    Object.assign(header.style, {
      padding: compact ? "10px 10px 8px" : "12px 12px 10px",
      borderBottom: "1px solid rgba(255,255,255,0.10)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
      cursor: "move",
      userSelect: "none",
      flex: "0 0 auto",
    });

    const leftHead = document.createElement("div");
    leftHead.style.display = "flex";
    leftHead.style.alignItems = "center";
    leftHead.style.gap = "10px";

    const title = document.createElement("div");
    title.textContent = L.appTitle;
    title.style.fontWeight = "900";
    title.style.fontSize = compact ? "13px" : "14px";
    leftHead.appendChild(title);

    const presetWrap = document.createElement("div");
    presetWrap.style.display = "flex";
    presetWrap.style.gap = "6px";
    for (let i=0;i<3;i++){
      const b = mkButton(`${L.preset} ${presetLabel(i)}`, () => setActivePreset(i), i === state.activePreset ? "primary" : "ghost", compact);
      b.style.padding = compact ? "7px 9px" : "8px 10px";
      b.style.borderRadius = "999px";
      presetWrap.appendChild(b);
    }
    leftHead.appendChild(presetWrap);

    header.appendChild(leftHead);

    const rightHead = document.createElement("div");
    rightHead.style.display = "flex";
    rightHead.style.alignItems = "center";
    rightHead.style.gap = "8px";

    // Language buttons next to help
    const langWrap = document.createElement("div");
    langWrap.style.display = "flex";
    langWrap.style.gap = "6px";

    const btnHU = mkButton("HU", () => setLang("hu"), state.ui.lang === "hu" ? "primary" : "ghost", compact);
    const btnEN = mkButton("EN", () => setLang("en"), state.ui.lang === "en" ? "primary" : "ghost", compact);
    const btnDE = mkButton("DE", () => setLang("de"), state.ui.lang === "de" ? "primary" : "ghost", compact);

    [btnHU, btnEN, btnDE].forEach(b => {
      b.style.padding = compact ? "7px 9px" : "8px 10px";
      b.style.borderRadius = "999px";
    });

    langWrap.appendChild(btnHU);
    langWrap.appendChild(btnEN);
    langWrap.appendChild(btnDE);

    const helpBtn = mkButton(state.ui.helpOpen ? "✕" : "❓", () => {
      state.ui.helpOpen = !state.ui.helpOpen;
      saveStateDebounced();
      renderPanel();
    }, "ghost", compact);
    helpBtn.title = L.help;
    helpBtn.style.width = compact ? "34px" : "38px";
    helpBtn.style.height = compact ? "34px" : "38px";
    helpBtn.style.padding = "0";
    helpBtn.style.display = "grid";
    helpBtn.style.placeItems = "center";

    const closeBtn = mkButton("✕", () => setUIOpen(false), "ghost", compact);
    closeBtn.title = L.close;
    closeBtn.style.width = compact ? "34px" : "38px";
    closeBtn.style.height = compact ? "34px" : "38px";
    closeBtn.style.padding = "0";
    closeBtn.style.display = "grid";
    closeBtn.style.placeItems = "center";

    rightHead.appendChild(langWrap);
    rightHead.appendChild(helpBtn);
    rightHead.appendChild(closeBtn);

    header.appendChild(rightHead);
    panel.appendChild(header);

    // CONTENT
    const content = document.createElement("div");
    Object.assign(content.style, { flex: "1 1 auto", overflow: "auto" });
    panel.appendChild(content);

    const narrow = window.innerWidth < 920;
    const body = document.createElement("div");
    Object.assign(body.style, {
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : (compact ? "320px 1fr" : "350px 1fr"),
      gap: "0",
    });
    content.appendChild(body);

    // LEFT COL
    const leftCol = document.createElement("div");
    Object.assign(leftCol.style, {
      padding: compact ? "10px" : "12px",
      borderRight: narrow ? "none" : "1px solid rgba(255,255,255,0.10)",
      borderBottom: narrow ? "1px solid rgba(255,255,255,0.10)" : "none",
    });

    const listTitle = document.createElement("div");
    listTitle.textContent = L.modulesTitle;
    listTitle.style.fontWeight = "900";
    listTitle.style.fontSize = compact ? "12px" : "13px";
    listTitle.style.opacity = "0.95";
    listTitle.style.marginBottom = "10px";
    leftCol.appendChild(listTitle);

    function addModuleRow(tabKey, getter, setter, toggleDisabled=false, configurable=false, dim=false) {
      const row = document.createElement("div");
      row.className = `ad-mod-row ${configurable ? "is-config" : ""}`;
      Object.assign(row.style, {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "10px",
        alignItems: "center",
        padding: compact ? "9px 9px" : "10px 10px",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.10)",
        background: state.ui.selectedTab === tabKey ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
        marginBottom: "8px",
        cursor: "pointer",
        opacity: dim ? "0.55" : "1",
      });

      const labelWrap = document.createElement("div");
      labelWrap.style.display = "flex";
      labelWrap.style.alignItems = "center";
      labelWrap.style.gap = "8px";

      const label = document.createElement("div");
      label.style.fontSize = compact ? "12px" : "13px";
      label.style.fontWeight = "800";
      label.style.display = "flex";
      label.style.alignItems = "center";
      label.style.gap = "8px";

      const nameSpan = document.createElement("span");
      nameSpan.textContent = tabTitle(tabKey);

      label.appendChild(nameSpan);

      // ✅ jelölés a név mellett, ha állítható
      if (configurable) {
        const ic = document.createElement("span");
        ic.className = "ad-mod-icon";
        ic.innerHTML = slidersTinySvg(14);
        ic.title = L.iconConfigTitle;
        label.appendChild(ic);

        const hint = document.createElement("span");
        hint.className = "ad-mod-hint";
        hint.textContent = L.hintConfig;
        labelWrap.appendChild(label);
        labelWrap.appendChild(hint);
      } else {
        labelWrap.appendChild(label);
      }

      const sw = document.createElement("input");
      sw.type = "checkbox";
      sw.checked = !!getter();
      sw.disabled = !!toggleDisabled;
      sw.style.transform = "scale(1.15)";

      row.addEventListener("click", () => {
        state.ui.selectedTab = tabKey;
        saveStateDebounced();
        renderPanel();
      });

      sw.addEventListener("click", (e) => e.stopPropagation());
      sw.addEventListener("change", () => {
        if (toggleDisabled) return;
        setter(!!sw.checked);
        saveStateDebounced();
        renderCss();
        applyToggleSideEffects();
        renderPanel();
        showToast(L.saved);
      });

      row.appendChild(labelWrap);
      row.appendChild(sw);
      leftCol.appendChild(row);
    }

    // Modules
    addModuleRow("general",  () => true, () => {}, true,  false, false);

    // NEW: Skin toggle
    addModuleRow("skin",     () => c.SKIN_CSS, v => {
      c.SKIN_CSS = v;
      dirtySkin();
      scheduleUpdate();
      showToast(v ? L.toasts.skinOn : L.toasts.skinOff);
    }, false, true, false);

    addModuleRow("board",    () => c.BOARD_MARKER, v => { c.BOARD_MARKER = v; dirtyBoard(); scheduleUpdate(); }, false, false, false);
    addModuleRow("bmback",   () => c.BM_BACK_BUTTON, v => { c.BM_BACK_BUTTON = v; dirtyBm(); scheduleUpdate(); }, false, false, false);

    addModuleRow("throws",   () => c.THROWS_TO_POINTS, v => { c.THROWS_TO_POINTS = v; dirtyTurn(); scheduleUpdate(); }, false, true, false);
    addModuleRow("orig",     () => c.SHOW_ORIG_IN_CORNER, v => { c.SHOW_ORIG_IN_CORNER = v; dirtyTurn(); scheduleUpdate(); }, !c.THROWS_TO_POINTS, true, !c.THROWS_TO_POINTS);

    addModuleRow("total",    () => c.TOTAL_VIEW, v => { c.TOTAL_VIEW = v; dirtyTurn(); scheduleUpdate(); }, false, true, false);
    addModuleRow("checkout", () => c.CHECKOUT_VIEW, v => { c.CHECKOUT_VIEW = v; dirtyTurn(); scheduleUpdate(); }, false, true, false);
    addModuleRow("active",   () => c.ACTIVE_PLAYER_HIGHLIGHT, v => { c.ACTIVE_PLAYER_HIGHLIGHT = v; dirtyPlayers(); scheduleUpdate(); }, false, true, false);
    addModuleRow("triple",   () => c.TRIPLE_ANIM, v => { c.TRIPLE_ANIM = v; dirtyTurn(); scheduleUpdate(); }, false, true, false);
    addModuleRow("win",      () => c.WIN_MUSIC, v => { c.WIN_MUSIC = v; dirtyTurn(); scheduleUpdate(); }, false, true, false);

    addModuleRow("clock",    () => state.ui.clock.enabled, (v) => {
      state.ui.clock.enabled = v;
      buildClockIfNeeded();
      applyClockEnabled();
      if (v) { applyClockStyle(); applyClockScale(); applyClockPosition(); renderClockTime(); }
      showToast(v ? L.toasts.clockOn : L.toasts.clockOff);
    }, false, true, false);

    // Quick section
    const quick = document.createElement("div");
    quick.style.marginTop = "10px";
    quick.style.display = "grid";
    quick.style.gap = "8px";

    function quickToggle(labelTxt, value, onChange) {
      const wrap = document.createElement("div");
      Object.assign(wrap.style, {
        padding: compact ? "9px 9px" : "10px 10px",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
      });
      const lab = document.createElement("div");
      lab.textContent = labelTxt;
      lab.style.fontWeight = "900";
      lab.style.fontSize = compact ? "12px" : "13px";
      lab.style.opacity = "0.92";
      const sw = document.createElement("input");
      sw.type = "checkbox";
      sw.checked = !!value;
      sw.style.transform = "scale(1.15)";
      sw.addEventListener("change", () => onChange(!!sw.checked));
      wrap.appendChild(lab);
      wrap.appendChild(sw);
      return wrap;
    }

    quick.appendChild(quickToggle(L.safeMode, state.ui.safeMode, (v) => {
      state.ui.safeMode = v;
      applySafeClampsToCfg();
      saveStateDebounced();
      renderCss();
      dirtyTurn(); dirtyPlayers(); dirtyBoard(); dirtyBm(); dirtySkin();
      scheduleUpdate();
      renderPanel();
      showToast(v ? L.toasts.safeOn : L.toasts.safeOff);
    }));

    quick.appendChild(quickToggle(L.compact, state.ui.compact, (v) => {
      state.ui.compact = v;
      saveStateDebounced();
      renderPanel();
      ensurePanelPosition();
      showToast(v ? L.toasts.compactOn : L.toasts.compactOff);
    }));

    const rowBtns = document.createElement("div");
    rowBtns.style.display = "flex";
    rowBtns.style.gap = "8px";

    const btnResetPos = mkButton(L.posReset, () => {
      state.ui.x = null; state.ui.y = null;
      saveStateDebounced();
      requestAnimationFrame(ensurePanelPosition);
      showToast(L.toasts.posReset);
    }, "ghost", compact);
    btnResetPos.style.flex = "1";

    const btnResetGearPos = mkButton(L.btnPosReset, () => {
      state.ui.btnX = null; state.ui.btnY = null;
      saveStateDebounced();
      ensureMainButtonPosition();
      showToast(L.toasts.btnPosReset);
    }, "ghost", compact);
    btnResetGearPos.style.flex = "1";

    rowBtns.appendChild(btnResetPos);
    rowBtns.appendChild(btnResetGearPos);
    quick.appendChild(rowBtns);

    const hotLine = document.createElement("div");
    hotLine.style.opacity = "0.65";
    hotLine.style.fontSize = "11px";
    hotLine.style.lineHeight = "1.35";
    hotLine.textContent = L.hotkeysLine;
    quick.appendChild(hotLine);

    leftCol.appendChild(quick);

    // RIGHT COL
    const rightCol = document.createElement("div");
    Object.assign(rightCol.style, { padding: compact ? "10px" : "12px" });

    const head2 = document.createElement("div");
    Object.assign(head2.style, {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
      marginBottom: "10px",
    });

    const hTitle = document.createElement("div");
    hTitle.textContent = tabTitle(state.ui.selectedTab);
    hTitle.style.fontWeight = "900";
    hTitle.style.fontSize = compact ? "12px" : "13px";

    const canResetTab = ["skin","throws","orig","total","checkout","active","triple","win","clock"].includes(state.ui.selectedTab);
    const resetBtn = mkButton(L.reset, () => resetTab(state.ui.selectedTab), "ghost", compact);
    resetBtn.style.opacity = canResetTab ? "1" : "0.45";
    resetBtn.style.pointerEvents = canResetTab ? "auto" : "none";

    head2.appendChild(hTitle);
    head2.appendChild(resetBtn);
    rightCol.appendChild(head2);

    const box = document.createElement("div");
    Object.assign(box.style, {
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: "16px",
      background: "rgba(255,255,255,0.06)",
      padding: compact ? "10px" : "12px",
      display: "grid",
      gap: compact ? "10px" : "12px",
    });
    rightCol.appendChild(box);

    function addColor(getter, setter, label) {
      const inp = document.createElement("input");
      inp.type = "color";
      inp.value = sanitizeHex(getter(), "#ffffff");
      inp.addEventListener("input", () => {
        setter(sanitizeHex(inp.value, getter()));
        saveStateDebounced();
        renderCss();
        dirtyTurn(); dirtyPlayers(); dirtyBoard(); dirtyBm(); dirtySkin();
        scheduleUpdate();
        showToast(L.saved);
      });
      box.appendChild(mkRow(label, inp, compact));
    }

    function addSliderPx(key, label, min, maxExt, step) {
      const max = state.ui.safeMode ? getMaxFor(key) : maxExt;
      let val = clamp(Number(c[key] ?? min), min, maxExt);
      if (state.ui.safeMode) val = clampIfSafe(key, val);

      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = String(min);
      slider.max = String(max ?? maxExt);
      slider.step = String(step);
      slider.value = String(val);

      const row = mkSliderRow(label, slider, `${val}px`, pillLevel(key, val), compact);
      box.appendChild(row.row);

      slider.addEventListener("input", () => {
        let v = clamp(Number(slider.value) || min, min, maxExt);
        if (state.ui.safeMode) v = clampIfSafe(key, v);
        c[key] = v;
        row.setPill(`${v}px`, pillLevel(key, v));
        saveStateDebounced();
        renderCss();
        dirtyTurn();
        scheduleUpdate();
      });
      slider.addEventListener("change", () => showToast(L.saved));
    }

    function addSlider01(getter, setter, label, step=0.05) {
      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = "0"; slider.max = "1"; slider.step = String(step);
      slider.value = String(clamp(Number(getter() ?? 0), 0, 1));

      const v0 = clamp(Number(slider.value), 0, 1);
      const row = mkSliderRow(label, slider, `${Math.round(v0*100)}%`, "ok", compact);
      box.appendChild(row.row);

      slider.addEventListener("input", () => {
        const v = clamp(Number(slider.value) || 0, 0, 1);
        setter(v);
        row.setPill(`${Math.round(v*100)}%`, "ok");
        saveStateDebounced();
        renderCss();
        dirtyTurn();
        scheduleUpdate();
      });
      slider.addEventListener("change", () => showToast(L.saved));
    }

    function addSliderMs(key, label, min, max, step) {
      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = String(min); slider.max = String(max); slider.step = String(step);
      slider.value = String(clamp(Number(c[key] ?? min), min, max));

      const v0 = Number(slider.value) || min;
      const row = mkSliderRow(label, slider, `${v0}ms`, "ok", compact);
      box.appendChild(row.row);

      slider.addEventListener("input", () => {
        const v = clamp(Number(slider.value) || min, min, max);
        c[key] = v;
        row.setPill(`${v}ms`, "ok");
        saveStateDebounced();
        renderCss();
        dirtyTurn();
        scheduleUpdate();
      });
      slider.addEventListener("change", () => showToast(L.saved));
    }

    function addCheckbox(label, getter, setter){
      const wrap = document.createElement("div");
      wrap.style.display = "flex";
      wrap.style.alignItems = "center";
      wrap.style.justifyContent = "space-between";
      wrap.style.gap = "10px";

      const lab = document.createElement("div");
      lab.textContent = label;
      lab.style.opacity = "0.9";
      lab.style.fontSize = compact ? "12px" : "13px";
      lab.style.fontWeight = "800";

      const sw = document.createElement("input");
      sw.type = "checkbox";
      sw.checked = !!getter();
      sw.style.transform = "scale(1.15)";
      sw.addEventListener("change", ()=>{
        setter(!!sw.checked);
        saveStateDebounced();
        dirtyTurn(); dirtyPlayers(); dirtyBoard(); dirtyBm(); dirtySkin();
        scheduleUpdate();
        renderPanelIfOpen();
        showToast(L.saved);
      });

      wrap.appendChild(lab);
      wrap.appendChild(sw);
      box.appendChild(wrap);
    }

    switch (state.ui.selectedTab) {
      case "general": {
        const row1 = document.createElement("div");
        row1.style.display = "flex";
        row1.style.gap = "8px";

        const btnExport = mkButton(L.export, () => {
          const payload = { version: "2.4.5", state };
          const json = JSON.stringify(payload, null, 2);
          const blob = new Blob([json], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "autodarts_core_presets.json";
          a.click();
          URL.revokeObjectURL(url);
          showToast(L.toasts.export);
        }, "primary", compact);

        const btnImport = mkButton(L.import, () => { fileInput.value = ""; fileInput.click(); }, "ghost", compact);

        btnExport.style.flex = "1";
        btnImport.style.flex = "1";
        row1.appendChild(btnExport);
        row1.appendChild(btnImport);
        box.appendChild(row1);

        const pollWrap = document.createElement("div");
        pollWrap.style.display = "flex";
        pollWrap.style.alignItems = "center";
        pollWrap.style.justifyContent = "space-between";
        pollWrap.style.gap = "12px";

        const pollLabel = document.createElement("div");
        pollLabel.textContent = L.activeRefresh;
        pollLabel.style.opacity = "0.9";
        pollLabel.style.fontSize = compact ? "12px" : "13px";
        pollLabel.title = L.activeRefreshHint;

        const pollInput = document.createElement("input");
        pollInput.type = "number";
        pollInput.min = "0"; pollInput.max = "1000"; pollInput.step = "50";
        pollInput.value = String(Number(c.ACTIVE_POLL_MS || 0));
        Object.assign(pollInput.style, {
          width: "120px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,.18)",
          background: "rgba(255,255,255,.08)",
          color: "#fff",
          padding: "8px 10px",
          fontWeight: "900",
        });
        pollInput.addEventListener("change", () => {
          c.ACTIVE_POLL_MS = clamp(Number(pollInput.value) || 0, 0, 1000);
          saveStateDebounced();
          configureActivePolling();
          showToast(L.saved);
        });

        pollWrap.appendChild(pollLabel);
        pollWrap.appendChild(pollInput);
        box.appendChild(pollWrap);

        const row2 = document.createElement("div");
        row2.style.display = "flex";
        row2.style.gap = "8px";

        const btnResetPreset = mkButton(`${L.resetPreset} ${presetLabel(state.activePreset)}`, () => resetPreset(state.activePreset), "ghost", compact);
        const btnResetAll = mkButton(L.resetAll, () => resetAll(), "ghost", compact);

        btnResetPreset.style.flex = "1";
        btnResetAll.style.flex = "1";
        row2.appendChild(btnResetPreset);
        row2.appendChild(btnResetAll);
        box.appendChild(row2);
        break;
      }

      case "skin": {
        const info = document.createElement("div");
        info.style.opacity = "0.85";
        info.style.fontSize = "12px";
        info.style.lineHeight = "1.4";
        info.textContent = L.skinInfo;
        box.appendChild(info);

        // UI scale
        const scale = document.createElement("input");
        scale.type = "range";
        scale.min = "0.85";
        scale.max = "1.15";
        scale.step = "0.01";
        scale.value = String(clamp(Number(c.SKIN_UI_SCALE ?? 1), 0.85, 1.15));
        const s0 = Number(scale.value);
        const sRow = mkSliderRow(L.skinText.uiScale, scale, `${Math.round(s0*100)}%`, "ok", compact);
        box.appendChild(sRow.row);
        scale.addEventListener("input", () => {
          c.SKIN_UI_SCALE = clamp(Number(scale.value) || 1, 0.85, 1.15);
          sRow.setPill(`${Math.round(c.SKIN_UI_SCALE*100)}%`, "ok");
          saveStateDebounced();
          dirtySkin(); scheduleUpdate();
        });
        scale.addEventListener("change", () => showToast(L.saved));

        // spacing
        const sp = document.createElement("input");
        sp.type = "range";
        sp.min = "0";
        sp.max = "80";
        sp.step = "1";
        sp.value = String(clamp(Number(c.SKIN_SPACING_PLAYER ?? 20), 0, 80));
        const sp0 = Number(sp.value);
        const spRow = mkSliderRow(L.skinText.spacing, sp, `${sp0}px`, "ok", compact);
        box.appendChild(spRow.row);
        sp.addEventListener("input", () => {
          c.SKIN_SPACING_PLAYER = clamp(Number(sp.value) || 0, 0, 80);
          spRow.setPill(`${c.SKIN_SPACING_PLAYER}px`, "ok");
          saveStateDebounced();
          dirtySkin(); scheduleUpdate();
        });
        sp.addEventListener("change", () => showToast(L.saved));

        // overlay alpha
        const ov = document.createElement("input");
        ov.type = "range";
        ov.min = "0";
        ov.max = "1";
        ov.step = "0.05";
        ov.value = String(clamp(Number(c.SKIN_BG_OVERLAY_ALPHA ?? 0.55), 0, 1));
        const ov0 = Number(ov.value);
        const ovRow = mkSliderRow(L.skinText.overlay, ov, `${Math.round(ov0*100)}%`, "ok", compact);
        box.appendChild(ovRow.row);
        ov.addEventListener("input", () => {
          c.SKIN_BG_OVERLAY_ALPHA = clamp(Number(ov.value) || 0, 0, 1);
          ovRow.setPill(`${Math.round(c.SKIN_BG_OVERLAY_ALPHA*100)}%`, "ok");
          saveStateDebounced();
          dirtySkin(); scheduleUpdate();
        });
        ov.addEventListener("change", () => showToast(L.saved));

        // player bg color
        const pbg = document.createElement("input");
        pbg.type = "color";
        pbg.value = sanitizeHex(c.SKIN_PLAYER_BG_HEX, "#000000");
        pbg.addEventListener("input", () => {
          c.SKIN_PLAYER_BG_HEX = sanitizeHex(pbg.value, c.SKIN_PLAYER_BG_HEX);
          saveStateDebounced();
          dirtySkin(); scheduleUpdate();
          showToast(L.saved);
        });
        box.appendChild(mkRow(L.skinText.playerBg, pbg, compact));

        // player bg opacity
        const pbo = document.createElement("input");
        pbo.type = "range";
        pbo.min = "0"; pbo.max = "1"; pbo.step = "0.05";
        pbo.value = String(clamp(Number(c.SKIN_PLAYER_BG_OPACITY ?? 0.35), 0, 1));
        const pbo0 = Number(pbo.value);
        const pboRow = mkSliderRow(L.skinText.playerBgOpacity, pbo, `${Math.round(pbo0*100)}%`, "ok", compact);
        box.appendChild(pboRow.row);

        pbo.addEventListener("input", () => {
          c.SKIN_PLAYER_BG_OPACITY = clamp(Number(pbo.value) || 0, 0, 1);
          pboRow.setPill(`${Math.round(c.SKIN_PLAYER_BG_OPACITY*100)}%`, "ok");
          saveStateDebounced();
          dirtySkin(); scheduleUpdate();
        });
        pbo.addEventListener("change", () => showToast(L.saved));

        // background URL
        const urlWrap = document.createElement("div");
        urlWrap.style.display = "grid";
        urlWrap.style.gap = "8px";

        const urlLabel = document.createElement("div");
        urlLabel.textContent = L.skinText.bgUrl;
        urlLabel.style.fontWeight = "900";
        urlLabel.style.opacity = "0.9";
        urlLabel.style.fontSize = compact ? "12px" : "13px";
        urlWrap.appendChild(urlLabel);

        const urlInp = document.createElement("input");
        urlInp.type = "text";
        urlInp.value = String(c.SKIN_BG_URL || "");
        Object.assign(urlInp.style, {
          width: "100%",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,.18)",
          background: "rgba(255,255,255,.08)",
          color: "#fff",
          padding: "10px 12px",
          fontWeight: "900",
          boxSizing: "border-box",
        });
        urlInp.addEventListener("change", () => {
          c.SKIN_BG_URL = String(urlInp.value || "").trim();
          saveStateDebounced();
          dirtySkin(); scheduleUpdate();
          showToast(L.saved);
        });
        urlWrap.appendChild(urlInp);

        box.appendChild(urlWrap);
        break;
      }

      case "board": {
        const info = document.createElement("div");
        info.style.opacity = "0.85";
        info.style.fontSize = "12px";
        info.style.lineHeight = "1.4";
        info.textContent = L.markerInfo;
        box.appendChild(info);

        const btn = mkButton(L.markerNow, () => { applyBoardMarkerNow(); showToast(L.toasts.marker); }, "primary", compact);
        box.appendChild(btn);
        break;
      }

      case "bmback": {
        const info = document.createElement("div");
        info.style.opacity = "0.85";
        info.style.fontSize = "12px";
        info.style.lineHeight = "1.4";
        info.textContent = L.bmInfo;
        box.appendChild(info);
        break;
      }

      case "throws":
        addSliderPx("THROW_VAL_FONT_PX", L.fields.fontSize, 20, EXT_LIMITS.THROW_VAL_FONT_PX, 1);
        addColor(()=>c.THROW_VAL_COLOR_HEX, v=>c.THROW_VAL_COLOR_HEX=v, L.fields.color);
        addSlider01(()=>c.THROW_VAL_OPACITY, v=>c.THROW_VAL_OPACITY=v, L.fields.opacity, 0.05);
        addColor(()=>c.THROW_BG_HEX, v=>c.THROW_BG_HEX=v, L.fields.bg);
        addSlider01(()=>c.THROW_BG_OPACITY, v=>c.THROW_BG_OPACITY=v, L.fields.bgOpacity, 0.05);

        addColor(()=>c.THROW_HOVER_BG_HEX, v=>c.THROW_HOVER_BG_HEX=v, L.fields.hoverBg);
        addSlider01(()=>c.THROW_HOVER_BG_OPACITY, v=>c.THROW_HOVER_BG_OPACITY=v, L.fields.hoverOpacity, 0.05);
        break;

      case "orig":
        addSliderPx("ORIG_FONT_PX", L.fields.fontSize, 10, EXT_LIMITS.ORIG_FONT_PX, 1);
        addColor(()=>c.ORIG_COLOR_HEX, v=>c.ORIG_COLOR_HEX=v, L.fields.color);
        addSlider01(()=>c.ORIG_OPACITY, v=>c.ORIG_OPACITY=v, L.fields.opacity, 0.05);
        break;

      case "total":
        addSliderPx("TOTAL_FONT_PX", L.fields.fontSize, 20, EXT_LIMITS.TOTAL_FONT_PX, 1);
        addColor(()=>c.TOTAL_COLOR_HEX, v=>c.TOTAL_COLOR_HEX=v, L.fields.color);
        addSlider01(()=>c.TOTAL_OPACITY, v=>c.TOTAL_OPACITY=v, L.fields.opacity, 0.05);
        addColor(()=>c.TOTAL_BG_HEX, v=>c.TOTAL_BG_HEX=v, L.fields.bg);
        addSlider01(()=>c.TOTAL_BG_OPACITY, v=>c.TOTAL_BG_OPACITY=v, L.fields.bgOpacity, 0.05);

        const info = document.createElement("div");
        info.style.opacity = "0.75";
        info.style.fontSize = "12px";
        info.style.lineHeight = "1.4";
        info.textContent = L.totalInfo;
        box.appendChild(info);
        break;

      case "checkout":
        addSliderPx("CHECKOUT_FONT_PX", L.fields.fontSize, 20, EXT_LIMITS.CHECKOUT_FONT_PX, 1);
        addColor(()=>c.CHECKOUT_COLOR_HEX, v=>c.CHECKOUT_COLOR_HEX=v, L.fields.color);
        addSlider01(()=>c.CHECKOUT_OPACITY, v=>c.CHECKOUT_OPACITY=v, L.fields.opacity, 0.05);
        break;

      case "active":
        addColor(()=>c.ACTIVE_COLOR_HEX, v=>c.ACTIVE_COLOR_HEX=v, L.fields.color);
        addSliderPx("ACTIVE_OUTLINE_PX", L.fields.outline, 0, EXT_LIMITS.ACTIVE_OUTLINE_PX, 1);
        addSlider01(()=>c.ACTIVE_GLOW, v=>c.ACTIVE_GLOW=v, L.fields.glow, 0.01);
        break;

      case "triple":
        addSliderMs("TRIPLE_SHIMMER_MS", L.fields.highlightSpeed, 400, 6000, 50);
        addSliderMs("TRIPLE_SLAM_MS", L.fields.numberAnim, 80, 1200, 10);
        addSliderMs("TRIPLE_RATTLE_MS", L.fields.rattleDur, 80, 2000, 20);
        addSliderMs("TRIPLE_RATTLE_DELAY_MS", L.fields.rattleDelay, 0, 2500, 25);
        break;

      case "win": {
        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = "0"; slider.max = "1"; slider.step = "0.05";
        slider.value = String(clamp(Number(c.WIN_VOLUME ?? 1), 0, 1));

        const row = mkSliderRow(L.fields.volume, slider, `${Math.round(Number(slider.value)*100)}%`, "ok", compact);
        box.appendChild(row.row);

        slider.addEventListener("input", () => {
          const v = clamp(Number(slider.value) || 0, 0, 1);
          c.WIN_VOLUME = v;
          row.setPill(`${Math.round(v*100)}%`, "ok");
          if (winAudio) winAudio.volume = v;
          saveStateDebounced();
        });
        slider.addEventListener("change", () => showToast(L.saved));
        break;
      }

      case "clock": {
        const cs = state.ui.clock;
        buildClockIfNeeded();

        addCheckbox(L.clockText.enabled, ()=>cs.enabled, (v)=>{
          cs.enabled = v;
          applyClockEnabled();
          if (v) { applyClockStyle(); applyClockScale(); applyClockPosition(); renderClockTime(); }
          showToast(v ? L.toasts.clockOn : L.toasts.clockOff);
        });

        const scaleSlider = document.createElement("input");
        scaleSlider.type = "range";
        scaleSlider.min = String(CLOCK_SCALE_MIN);
        scaleSlider.max = String(CLOCK_SCALE_MAX);
        scaleSlider.step = String(CLOCK_SCALE_STEP);
        scaleSlider.value = String(clamp(Number(cs.scale ?? 1), CLOCK_SCALE_MIN, CLOCK_SCALE_MAX));

        const sRow = mkSliderRow(L.clockText.scale, scaleSlider, `${Math.round(Number(scaleSlider.value)*100)}%`, "ok", compact);
        box.appendChild(sRow.row);

        scaleSlider.addEventListener("input", ()=>{
          cs.scale = clamp(Number(scaleSlider.value) || 1, CLOCK_SCALE_MIN, CLOCK_SCALE_MAX);
          sRow.setPill(`${Math.round(cs.scale*100)}%`, "ok");
          applyClockScale();
          applyClockPosition();
          saveStateDebounced();
        });
        scaleSlider.addEventListener("change", ()=>showToast(L.saved));

        addColor(()=>cs.bgHex, v=>{ cs.bgHex=v; applyClockStyle(); }, L.clockText.bg);
        addSlider01(()=>cs.bgAlpha, v=>{ cs.bgAlpha=v; applyClockStyle(); }, L.clockText.bgAlpha, 0.05);
        addColor(()=>cs.textHex, v=>{ cs.textHex=v; applyClockStyle(); }, L.clockText.text);

        addCheckbox(L.clockText.format24, ()=>cs.format24, (v)=>{ cs.format24=v; renderClockTime(); });
        addCheckbox(L.clockText.seconds, ()=>cs.showSeconds, (v)=>{ cs.showSeconds=v; renderClockTime(); });

        const rowBtns = document.createElement("div");
        rowBtns.style.display = "flex";
        rowBtns.style.gap = "8px";

        const b1 = mkButton(L.clockText.resetLook, ()=>{ resetClockLook(); renderPanelIfOpen(); showToast(L.saved); }, "ghost", compact);
        const b2 = mkButton(L.clockText.resetPos, ()=>{ resetClockPosition(); renderPanelIfOpen(); showToast(L.saved); }, "ghost", compact);
        b1.style.flex = "1"; b2.style.flex = "1";
        rowBtns.appendChild(b1); rowBtns.appendChild(b2);
        box.appendChild(rowBtns);

        const hint = document.createElement("div");
        hint.style.opacity = "0.75";
        hint.style.fontSize = "12px";
        hint.style.lineHeight = "1.4";
        hint.textContent = L.clockText.hint;
        box.appendChild(hint);

        break;
      }
    }

    if (state.ui.helpOpen) {
      const help = document.createElement("div");
      Object.assign(help.style, {
        marginTop: "10px",
        padding: compact ? "10px" : "12px",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.06)",
        fontSize: "12px",
        lineHeight: "1.45",
        opacity: "0.92",
      });
      help.innerHTML = L.helpHtml;
      rightCol.appendChild(help);
    }

    body.appendChild(leftCol);
    body.appendChild(rightCol);

    requestAnimationFrame(ensurePanelPosition);
  }

  /* ================== HOTKEYS ================== */
  document.addEventListener("keydown", (e) => {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toUpperCase() : "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (matchHotkey(e, HOTKEY_PANEL)) {
      e.preventDefault();
      setUIOpen(!state.ui.open);
      if (state.ui.open) { renderPanel(); ensurePanelPosition(); }
      return;
    }

    if (matchHotkey(e, HOTKEY_HELP)) {
      e.preventDefault();
      state.ui.helpOpen = !state.ui.helpOpen;
      saveStateDebounced();
      renderPanelIfOpen();
      return;
    }

    if (matchHotkey(e, HOTKEY_SAFE)) {
      e.preventDefault();
      state.ui.safeMode = !state.ui.safeMode;
      applySafeClampsToCfg();
      saveStateDebounced();
      renderCss();
      dirtyTurn(); dirtyPlayers(); dirtyBoard(); dirtyBm(); dirtySkin();
      scheduleUpdate();
      renderPanelIfOpen();
      showToast(state.ui.safeMode ? T().toasts.safeOn : T().toasts.safeOff);
      return;
    }

    if (matchHotkey(e, HOTKEY_PRESET_1)) { e.preventDefault(); setActivePreset(0); return; }
    if (matchHotkey(e, HOTKEY_PRESET_2)) { e.preventDefault(); setActivePreset(1); return; }
    if (matchHotkey(e, HOTKEY_PRESET_3)) { e.preventDefault(); setActivePreset(2); return; }

    if (matchHotkey(e, HOTKEY_CLOCK_TOGGLE)) {
      e.preventDefault();
      state.ui.clock.enabled = !state.ui.clock.enabled;
      buildClockIfNeeded();
      applyClockEnabled();
      if (state.ui.clock.enabled) { applyClockStyle(); applyClockScale(); applyClockPosition(); renderClockTime(); }
      saveStateDebounced();
      renderPanelIfOpen();
      showToast(state.ui.clock.enabled ? T().toasts.clockOn : T().toasts.clockOff);
      return;
    }

    if (matchHotkey(e, HOTKEY_CLOCK_RESET)) {
      e.preventDefault();
      const keepEnabled = state.ui.clock.enabled;
      state.ui.clock = clone(DEFAULT_CLOCK);
      state.ui.clock.enabled = keepEnabled;
      buildClockIfNeeded();
      applyClockStyle(); applyClockScale(); applyClockPosition(); applyClockEnabled(); renderClockTime();
      saveStateDebounced();
      renderPanelIfOpen();
      showToast(T().saved);
      return;
    }

    // clock scale from keyboard
    if (e.ctrlKey && !e.shiftKey && !e.altKey && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      if (!state.ui.clock.enabled) return;
      e.preventDefault();
      const dir = (e.key === "ArrowUp") ? 1 : -1;
      const cs = state.ui.clock;
      cs.scale = clamp(Math.round((cs.scale + dir * CLOCK_SCALE_STEP) * 100) / 100, CLOCK_SCALE_MIN, CLOCK_SCALE_MAX);
      buildClockIfNeeded();
      applyClockScale();
      applyClockPosition();
      saveStateDebounced();
      renderPanelIfOpen();
      return;
    }

    if (e.key === "Escape") {
      if (state.ui.open) { e.preventDefault(); setUIOpen(false); return; }
    }
  }, true);

  /* ================== INIT ================== */
  function start() {
    initStickyThrowSelectOnce();
    ensureHead(() => {
      ensureUIStyle();
      renderCss();
      ensureSkinCss(); // ✅ skin css initial
      if (cfg().WIN_MUSIC) initWinMusicOnce();

      // Scoped observers + dirty flags
      let turnObs = null;
      let playersObs = null;
      let lastTurn = null;
      let lastPlayers = null;

      function attachScopedObservers() {
        const turn = document.querySelector("#ad-ext-turn");
        if (turn && turn !== lastTurn) {
          if (turnObs) turnObs.disconnect();
          lastTurn = turn;
          turn.removeAttribute(TURN_SEL_ATTR);
          turnObs = new MutationObserver(() => { dirtyTurn(); scheduleUpdate(); });
          turnObs.observe(turn, { subtree: true, childList: true, characterData: true, attributes: true });
          dirtyTurn();
        }

        const players = document.querySelector("#ad-ext-player-display");
        if (players && players !== lastPlayers) {
          if (playersObs) playersObs.disconnect();
          lastPlayers = players;
          playersObs = new MutationObserver(() => { dirtyPlayers(); scheduleUpdate(); });
          playersObs.observe(players, { subtree: true, childList: true, attributes: true });
          dirtyPlayers();
        }
      }

      const obs = new MutationObserver((muts) => {
        // New SVGs? board marker might need refresh
        for (const m of muts) {
          if (m.addedNodes && m.addedNodes.length) {
            for (const n of m.addedNodes) {
              if (n && n.nodeType === 1) {
                const el = n;
                if (el.tagName === "SVG" || el.querySelector?.("svg")) dirtyBoard();
              }
            }
          }
        }

        if (isBoardsPage()) dirtyBm();

        attachScopedObservers();
        scheduleUpdate();
      });

      obs.observe(document.documentElement, { subtree: true, childList: true });
      attachScopedObservers();

      configureActivePolling();

      window.addEventListener("resize", () => { dirtySkin(); scheduleUpdate(); }, { passive: true });
      window.addEventListener("fullscreenchange", () => { dirtySkin(); scheduleUpdate(); }, { passive: true });

      setTimeout(scheduleUpdate, 60);
      setTimeout(scheduleUpdate, 200);
      setTimeout(scheduleUpdate, 700);
    });

    ensureBody(() => {
      buildUIChrome();
      applySafeClampsToCfg();
      renderCss();

      dirtyTurn(); dirtyPlayers(); dirtyBoard(); dirtyBm(); dirtySkin();
      scheduleUpdate();

      buildClockIfNeeded();
      applyClockEnabled();
      applyClockStyle();
      applyClockScale();
      applyClockPosition();
      renderClockTime();

      ensureBmBackButton();
    });
  }

  start();
})();
