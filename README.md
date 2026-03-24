# Design Token Builder

A reusable design tokens library and builder powered by [Style Dictionary](https://amzn.github.io/style-dictionary/). This package allows you to define your design tokens (colors, fonts, spacing, etc.) in a JSON format and compile them into ready-to-use variables across SCSS, CSS, and JS modules.

## Installation

Install the package directly into your project:

```bash
npm install dival-design-tokens
```

*(You can also securely publish this to a private npm registry or link it locally using `npm link`).*

## How to Use It

This package exports its base token JSON out of the box so you can consume the uncompiled data if desired:

```javascript
const { baseTokens } = require('dival-design-tokens');

console.log(baseTokens.color.primary.value);
```

However, the real power comes from using the integrated `build-tokens` CLI script to compile the tokens!

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
- `./dist/token.js` (JavaScript module exports)

## Versioning and Publishing with Changesets

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
