# Autodarts CORE

**Languages:** [English](README.md) | [Magyar](README.hu.md) | [Deutsch](README.de.md)

Autodarts CORE is an unofficial userscript for
[play.autodarts.io](https://play.autodarts.io/) that provides a configurable
match layout, touch-friendly throw correction, custom board presentation,
player-card styling, presets, and visual effects.

> This is a community project and is not affiliated with Autodarts.

## Current release

- Version: `2.6.112-v1148-dart-toggle-view-reset`
- Release file: [`autodarts-core.user.js`](autodarts-core.user.js)

## Main features

- CORE two-sided layout and original Autodarts layout
- Responsive player, throw, total, tip, and checkout cards
- Touch-friendly ring and compact throw-correction interfaces
- Custom background, dartboard, and surround images
- Player names, averages, scores, history, active-player styling, win and bust states
- Presets A/B/C, Safe Mode, import/export, and HU/EN/DE interface
- Clock widget, triple-hit animation, win effects, and Tools for Autodarts compatibility

## Installation

1. Install a userscript manager such as
   [Violentmonkey](https://violentmonkey.github.io/) or Tampermonkey.
2. Open the RAW userscript:
   `https://raw.githubusercontent.com/Szala86/Autodarts-core/main/autodarts-core.user.js`
3. Confirm the installation.
4. Keep only one Autodarts CORE version enabled at a time.
5. Disable Stylebot rules that modify the same Autodarts interface.

## Updating

Use the userscript manager's update function. The release script contains
explicit `@downloadURL` and `@updateURL` metadata pointing to the `main` branch.

## Troubleshooting

- Reload `play.autodarts.io` completely after an update.
- Disable older CORE versions and overlapping Stylebot rules.
- The loaded build can be checked in the browser console through
  `window.__AD_CORE_VERSION__`.

## License

See [LICENSE](LICENSE).