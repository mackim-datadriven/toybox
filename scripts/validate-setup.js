#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const checks = [
  {
    name: 'GitHub Config Exists',
    check: () => fs.existsSync('./github.config.json'),
    fix: 'Run: cp github.config.json.example github.config.json'
  },
  {
    name: 'GitHub Config Valid',
    check: () => {
      try {
        const config = JSON.parse(fs.readFileSync('./github.config.json', 'utf8'));
        return !config.username.includes('YOUR_') && !config.repository.includes('YOUR_');
      } catch { return false; }
    },
    fix: 'Edit github.config.json with your actual GitHub username and repository name'
  },
  {
    name: 'Dependencies Installed',
    check: () => fs.existsSync('./node_modules'),
    fix: 'Run: npm install'
  }
];

console.log('🔍 Validating TOYBOX setup...\n');

let allPassed = true;
for (const check of checks) {
  const passed = check.check();
  console.log(`${passed ? '✅' : '❌'} ${check.name}`);
  if (!passed) {
    console.log(`   Fix: ${check.fix}`);
    allPassed = false;
  }
}

console.log(allPassed ? '\n🎉 Setup validation passed!' : '\n⚠️  Please fix the issues above');
process.exit(allPassed ? 0 : 1);