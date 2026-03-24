# Design Token Builder

A reusable design tokens library and builder powered by [Style Dictionary](https://amzn.github.io/style-dictionary/). This package allows you to define your design tokens (colors, fonts, spacing, etc.) in a JSON format and compile them into ready-to-use variables across SCSS, CSS, and JS modules.

## Installation

Install the package directly into your project:

```bash
npm install dival-design-tokens
```

*(You can also securely publish this to a private npm registry or link it locally using `npm link`).*

## How to Use It

This package natively exports fully compiled modern ES Modules (`.mjs`) alongside standard CommonJS (`.js`) and TypeScript definitions (`.d.ts`).

This means you can import only the specific tokens you need in your frontend framework (React, Vue, Vite, Next.js, etc.) and your bundler will automatically tree-shake the rest, ensuring minimal bundle size overhead!

```javascript
// Modern ESM import (Tree-shakeable!)
import { ColorPrimaryDefault, Spacing4 } from 'dival-design-tokens';

// Or standard CommonJS if needed
// const tokens = require('dival-design-tokens');
```

The real power comes from using the integrated `build-tokens` CLI script to compile customized tokens yourself! If you want to access the raw uncompiled token JSON, you can explicitly import `dival-design-tokens/token.json`.

## How to Inject Your Font and Color Tokens

You can easily override or define new colors and fonts by creating your own token JSON file in your consuming project, and then leveraging the builder script to compile it.

1. **Create your customized JSON token file** (e.g. `my-theme.json`):

```json
{
  "color": {
    "brand": {
      "primary": { "value": "#ff5722" },
      "secondary": { "value": "#03a9f4" }
    },
    "background": {
      "base": { "value": "#ffffff" },
      "dark": { "value": "#121212" }
    }
  },
  "font": {
    "family": {
      "body": { "value": "'Inter', 'Helvetica', sans-serif" },
      "heading": { "value": "'Playfair Display', serif" }
    },
    "size": {
      "base": { "value": "16px" },
      "large": { "value": "24px" }
    }
  }
}
```

*Note that Style Dictionary recognizes top-level categories like `color`, `font`, `size`, `spacing`, etc.*

2. **Run the Token Builder**:

Pass your custom token file and select the chosen output directory using the included `build-tokens` CLI command:

```bash
npx build-tokens my-theme.json ./dist/
```

This command will output:
- `./dist/token.scss` (SCSS Variables)
- `./dist/token.css` (CSS Custom Properties - Variables)
- `./dist/token.js` (CommonJS module exports)
- `./dist/token.mjs` (ES Module exports - tree-shakeable)
- `./dist/token.d.ts` (TypeScript typings)

## Versioning and Publishing with Changesets

## CI/CD & Automated Releases

This project uses [Changesets](https://github.com/changesets/changesets) and GitHub Actions for automated versioning and publishing.

### Setup

1. Add an `NPM_TOKEN` to your GitHub repository secrets.
2. When you make changes, run `npx changeset` to create a new version intent.
3. Commit the generated changeset file.
4. When you push to `main`, GitHub Actions will:
   - Create a "Version Packages" PR if changesets exist.
   - Automatically publish to npm when that PR is merged.

### Workflow

1. **Feature Work**: Create a branch, make changes.
2. **Intent**: Run `npx changeset` and follow the prompts.
3. **PR**: Merge your feature branch to `main`.
4. **Release**: The GitHub Action will handle the rest!

We use **Changesets** to streamline versioning, changelog generation, and publishing.

Whenever you want to release a new version of your package:

1. **Modify your baseline tokens** in the root `token.json` file.
2. **Generate a changeset**: Document the changes you made by running:
```bash
npm run changeset
```
Follow the prompts to select the package and the release type (major, minor, or patch), and provide a summary of your changes.

3. **Bump the versions**: Once you are ready to release the changes, update the version automatically:
```bash
npx changeset version
```
*(This commands consumes the changeset files and updates versions and the `CHANGELOG.md` file.)*

4. **Publish to NPM**:
Publish the package to NPM. Our `package.json` includes a `prepublishOnly` hook which automatically regenerates your token assets whenever you publish!
```bash
npm run release
```
