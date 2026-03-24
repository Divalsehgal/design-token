#!/usr/bin/env node
const StyleDictionary = require('style-dictionary');
const fs = require('fs');
const path = require('path');

// Extract CLI arguments
// Usage: npx build-tokens <source-token-file> <output-directory>
const sourceFile = process.argv[2] || 'token.json';
let outDir = process.argv[3] || 'build/';

if (!outDir.endsWith('/')) {
  outDir += '/';
}

const absoluteSourcePath = path.resolve(process.cwd(), sourceFile);

if (!fs.existsSync(absoluteSourcePath)) {
  console.error(`Error: Source token file "${sourceFile}" not found in current directory.`);
  process.exit(1);
}

console.log(`Building tokens...`);
console.log(`Source: ${sourceFile}`);
console.log(`Output Directory: ${outDir}`);

const config = {
  source: [absoluteSourcePath],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: outDir,
      files: [{
        destination: 'token.scss',
        format: 'scss/variables'
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: outDir,
      files: [{
        destination: 'token.js',
        format: 'javascript/module'
      }]
    },
    css: {
      transformGroup: 'css',
      buildPath: outDir,
      files: [{
        destination: 'token.css',
        format: 'css/variables'
      }]
    }
  }
};

const sd = StyleDictionary.extend(config);
sd.buildAllPlatforms();

console.log('\n✅ Build completed successfully!');
