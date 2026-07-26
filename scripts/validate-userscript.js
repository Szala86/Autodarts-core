#!/usr/bin/env node
'use strict';

const fs = require('fs');
const { spawnSync } = require('child_process');

const target = process.argv[2];
if (!target) {
  console.error('Használat: node scripts/validate-userscript.js <fajl.user.js>');
  process.exit(2);
}
if (!fs.existsSync(target)) {
  console.error(`Nem található: ${target}`);
  process.exit(2);
}

const content = fs.readFileSync(target, 'utf8');
const checks = [
  ['Tampermonkey/Violentmonkey fejléc', /\/\/\s*==UserScript==[\s\S]*?\/\/\s*==\/UserScript==/],
  ['@match Autodarts', /@match\s+https:\/\/play\.autodarts\.io\/\*/],
  ['@version mező', /@version\s+\S+/],
];

let failed = false;
for (const [label, test] of checks) {
  const ok = test.test(content);
  console.log(`${ok ? 'OK' : 'HIBA'} – ${label}`);
  failed ||= !ok;
}

const node = spawnSync(process.execPath, ['--check', target], { encoding: 'utf8' });
if (node.status === 0) {
  console.log('OK – JavaScript szintaxis (node --check)');
} else {
  console.error('HIBA – JavaScript szintaxis');
  process.stderr.write(node.stderr || node.stdout || 'Ismeretlen hiba\n');
  failed = true;
}

process.exit(failed ? 1 : 0);
