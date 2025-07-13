#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load GitHub config
const configPath = path.join(__dirname, '..', 'github.config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const { username, repository } = config;

// Update package.json
const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

if (username !== 'YOUR_GITHUB_USERNAME' && repository !== 'YOUR_REPO_NAME') {
  packageJson.homepage = `https://${username}.github.io/${repository}`;
  packageJson.repository.url = `https://github.com/${username}/${repository}.git`;
  
  // Update test-production script
  const scripts = packageJson.scripts || {};
  if (scripts['test-production']) {
    scripts['test-production'] = `vite preview --base=/${repository}/`;
  }
  
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✅ Updated package.json');
}

// Update vite.config.ts
const viteConfigPath = path.join(__dirname, '..', 'vite.config.ts');
let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');

if (username !== 'YOUR_GITHUB_USERNAME' && repository !== 'YOUR_REPO_NAME') {
  // Update the base URL
  viteConfig = viteConfig.replace(
    /const baseUrl = process\.env\.BASE_URL \|\| '\/[^']+\/';/,
    `const baseUrl = process.env.BASE_URL || '/${repository}/';`
  );
  
  fs.writeFileSync(viteConfigPath, viteConfig);
  console.log('✅ Updated vite.config.ts');
}

// Update index.html
const indexPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

if (username !== 'YOUR_GITHUB_USERNAME' && repository !== 'YOUR_REPO_NAME') {
  // Update title
  indexHtml = indexHtml.replace(
    /<title>TOYBOX - [^<]+<\/title>/,
    `<title>TOYBOX - ${username}</title>`
  );
  
  // Update base URL in script
  indexHtml = indexHtml.replace(
    /const baseUrl = isProduction \? "\/[^"]+\/" : "\/";/,
    `const baseUrl = isProduction ? "/${repository}/" : "/";`
  );
  
  fs.writeFileSync(indexPath, indexHtml);
  console.log('✅ Updated index.html');
}

// Update 404.html
const notFoundPath = path.join(__dirname, '..', 'public', '404.html');
let notFoundHtml = fs.readFileSync(notFoundPath, 'utf8');

if (username !== 'YOUR_GITHUB_USERNAME') {
  notFoundHtml = notFoundHtml.replace(
    /<title>TOYBOX - [^<]+<\/title>/,
    `<title>TOYBOX - ${username}</title>`
  );
  
  fs.writeFileSync(notFoundPath, notFoundHtml);
  console.log('✅ Updated public/404.html');
}

// Update AboutPage.tsx
const aboutPath = path.join(__dirname, '..', 'src', 'components', 'AboutPage.tsx');
let aboutContent = fs.readFileSync(aboutPath, 'utf8');

if (username !== 'YOUR_GITHUB_USERNAME' && repository !== 'YOUR_REPO_NAME') {
  aboutContent = aboutContent.replace(
    /href="https:\/\/github\.com\/[^/]+\/[^"]+"/,
    `href="https://github.com/${username}/${repository}"`
  );
  
  fs.writeFileSync(aboutPath, aboutContent);
  console.log('✅ Updated AboutPage.tsx');
}

// Update GitHub workflow
const workflowPath = path.join(__dirname, '..', '.github', 'workflows', 'deploy.yml');
let workflowContent = fs.readFileSync(workflowPath, 'utf8');

if (repository !== 'YOUR_REPO_NAME') {
  workflowContent = workflowContent.replace(
    /BASE_URL: '\/[^']+\/'/,
    `BASE_URL: '/${repository}/'`
  );
  
  fs.writeFileSync(workflowPath, workflowContent);
  console.log('✅ Updated .github/workflows/deploy.yml');
}

console.log('\n🎉 Configuration update complete!');
console.log(`   GitHub Username: ${username}`);
console.log(`   Repository Name: ${repository}`);

if (username === 'YOUR_GITHUB_USERNAME' || repository === 'YOUR_REPO_NAME') {
  console.log('\n⚠️  Please update github.config.json with your actual GitHub username and repository name.');
}