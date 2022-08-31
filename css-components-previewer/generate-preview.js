const fs = require('fs');
const ancss = require('@onsenui/ancss');
const yaml = require('js-yaml');
const glob = require('glob');
const eco = require('eco');
const path = require('path');

const cssComponentsPath = require.resolve('onsenui/css/onsen-css-components.css');


let lastMarkupToken = '';

function generatePreview() {
  const components = parseComponents();
  const markupToken = identifyComponentsMarkup(components);

  if (markupToken !== lastMarkupToken) {
    generate(components);
    lastMarkupToken = markupToken;
  } else {
    lastMarkupToken = markupToken;
  }
}

function generatePreviewForce() {
  generate(parseComponents());
  browserSync.reload();
}

function generate(components) {
  const template = fs.readFileSync(__dirname + '/src/index.html.eco', 'utf-8');
  const patterns = yaml.safeLoadAll(fs.readFileSync(__dirname + '/patterns.yaml', 'utf-8'));
  const themes = glob.sync(__dirname + '/build/{*-,}onsen-css-components.css').map(filePath => path.basename(filePath, '.css'));
  const toJSON = JSON.stringify.bind(JSON);

  fs.writeFileSync(__dirname + '/build/index.html', eco.render(template, {toJSON, components, themes, patterns}), 'utf-8');
}

function identifyComponentsMarkup(componentsJSON) {
  const token = componentsJSON.map(component => {
    return component.annotation.markup;
  }).join('');

  return token;
}

function parseComponents() {
  const css = fs.readFileSync(cssComponentsPath, 'utf-8');
  const components = ancss.parse(css, {detect: line => line.match(/^~/)});
  return components || [];
}

generatePreview();
