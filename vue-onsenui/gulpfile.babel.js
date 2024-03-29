import 'babel-polyfill';

import gulp from 'gulp';
import * as glob from 'glob';
import path from'path';
import fs from 'fs';
import fse from 'fs-extra';

process.env.NODE_ENV = 'production'; // Important when bundling/transpiling

const $ = require('gulp-load-plugins')();

const FLAGS = `--inline --colors --progress --display-error-details --display-cached`;

////////////////////////////////////////
// generate-components
////////////////////////////////////////
gulp.task('generate-components', (done) => {
  const camelize = string => string.toLowerCase().replace(/-([a-z])/g, (m, l) => l.toUpperCase());
  const generate = (baseName, baseMixins = '') => {
    const domElement = 'ons-' + baseName;
    const mixins = 'deriveEvents' + (baseMixins ? `, ${baseMixins.trim().split(/\s+/).join(', ')}` : '');
    const modifier = mixins.indexOf('modifier') !== -1;

    return `
<template>
  <${domElement} v-on="unrecognizedListeners"${modifier ? ' :modifier="normalizedModifier"' : ''}>
    <slot></slot>
  </${domElement}>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/${domElement}';
  import { ${mixins} } from '../mixins';

  export default {
    name: 'v-${domElement}',
    mixins: [${mixins}]
  };
</script>
    `.trim();
  };

  const components = {
    'toolbar': 'hidable modifier',
    'bottom-toolbar': 'modifier',
    'toolbar-button': 'modifier',
    'alert-dialog-button': 'modifier',
    'button': 'modifier',
    'icon': 'modifier',
    'card': 'modifier',
    'list': 'modifier',
    'list-title': 'modifier',
    'list-header': 'modifier',
    'ripple': '',
    'row': '',
    'col': '',
    'progress-bar': 'modifier',
    'progress-circular': 'modifier',
    'carousel-item': '',
    'splitter-mask': '',
    'splitter-content': '',
    'splitter': 'selfProvider deriveDBB',
    'switch': 'modelCheckbox modifier',
    'checkbox': 'modelCheckbox modifier',
    'input': 'modelInput modifier',
    'search-input': 'modelInput modifier',
    'range': 'modelInput modifier',
    'radio': 'modelRadio modifier',
    'fab': 'hidable modifier',
    'speed-dial-item': 'modifier',
    'dialog': 'hidable hasOptions dialogCancel deriveDBB portal modifier',
    'action-sheet': 'hidable hasOptions dialogCancel deriveDBB portal modifier',
    'action-sheet-button': 'modifier',
    'modal': 'hidable hasOptions deriveDBB portal modifier',
    'toast': 'hidable hasOptions deriveDBB portal modifier',
  };

  Object.keys(components).forEach(key => {
    const outputPath = path.join(__dirname, 'src', 'components', `VOns${camelize('-' + key)}.vue`);
    fs.writeFile(outputPath, generate(key, components[key]), 'utf8', error => {
      if (error) {
        console.log(`Wrong generation of v-ons-${key}:`);
        throw error;
      } else {
        console.log(`Generated v-ons-${key}.`);
      }
    });
  });

  done();
});

// Build tags and attribute data files required for `vue-onsenui-helper-json`.
//
// `vue-onsenui-tags.json`
//    tells
//    (1) what tags exist in `vue-onsenui`
//    (2) the allowed attributes and the description of each tag.
// `vue-onsenui-attributes.json`
//    tells the type, the description and the allowed values of each attribute.
//
// Their schemas are defined in the corresponding tag provider in vuejs/vetur.
gulp.task('build:helper-json', (done) => {
  const extractEnglishDescription = (description) => {
    // Extract inner characters of [en][/en]
    let match;
    if (match = /\[en]((.|\r|\n)*)\[\/en]/m.exec(description)) {
      const extractedCharacters = match[1];

      // Remove leading whitespaces
      return extractedCharacters.replace(/^[\n ]*(.*)/, '$1');
    }

    return '';
  };
  const convertType = (type) => {
    switch (true) { // regex switch
      case /^Boolean$/.test(type):
        return 'any'; // Vetur (0.8.6) recognizes only `v` and `event` as a valid type
      case /^Number$/.test(type):
        return 'any'; // same as above
      case /^String$/.test(type):
        return 'any'; // same as above
      case /^Color$/.test(type):
        return 'any'; // same as above
      case /^Function$/.test(type):
        return 'any'; // same as above
      case /^Array$/.test(type):
        return 'any'; // same as above
      case /^Expression$/.test(type):
        return 'any'; // same as above
      case /^Object$/.test(type):
        return 'any'; // same as above
      case /|/.test(type):
        return 'any'; // same as above
      default:
        throw new Error(`Unknown type: ${JSON.stringify(type)}`);
    }
  };

  const destinationPath = path.join(__dirname, 'packages', 'vue-onsenui-helper-json');
  const tags = {};
  const attributes = {};

  glob.sync('../../build/docs/element/*.json').forEach((path) => {
    const doc = JSON.parse(fs.readFileSync(path));

    // Add prefix `v-`
    doc.name = doc.name.replace(/^ons-/, 'v-ons-').replace(/^(ons)(\.|$)/gm, '$$$&');

    // Only core tags and vue-onsenui tags should be shown in autocompletion
    if (!(doc.extensionOf == null || doc.extensionOf === 'vue')) {
      return;
    }

    // Some tags don't exist in vue-onsenui
    if (['v-ons-if', 'v-ons-template', 'v-ons-gesture-detector'].indexOf(doc.name) !== -1) {
      return;
    }

    // Filter attributes
    // (Partially copied from OnsenUI/onsen.io/modules/v2-wc-api-docs.js)
    for (let i = doc.attributes.length - 1 ; i >= 0 ; i--) {
      const attr = doc.attributes[i];

      const isAllowedAttr =
        // Only core attributes and vue-onsenui attributes should be shown in autocompletion
        (attr.extensionOf == null || attr.extensionOf === 'vue')
        &&
        // Some attributes don't exist in vue-onsenui
        !/(on-infinite|-index$|page$|delegate)/.test(attr.name);

      if (isAllowedAttr) {
        if (/^animation/.test(attr.name)) {
          attr.name = 'options.' + attr.name;
        }
        attr.type = attr.type || 'Boolean';
      } else {
        // console.log(`Excluded attribute: ${doc.name}/${attr.name}`);
        doc.attributes.splice(i, 1);
      }
    }

    // If the tag has `options.*` attribute, remove them all and add `option` attribute.
    if (doc.attributes.find(attr => attr.name.match(/^options/))) {
      doc.attributes = doc.attributes.filter(attr => !attr.name.match(/^options/));
      doc.attributes.push(
        {
          name: 'options',
          type: 'Expression',
          description: '\n[en]Additional options for this element. Must be specified with an object.[/en]\n[ja][/ja]',
          deprecated: false,
          required: false,
          default: null,
          initonly: false
        }
      );
    }

    // Add the tag to `vue-onsenui-tags.json`
    tags[doc.name] = {
      attributes: doc.attributes.map(attr => attr.name),
      description: extractEnglishDescription(doc.description),
    };

    // Add the attributes of the tag to `vue-onsenui-attributes.json`
    for (const attr of doc.attributes) {
      try {
        attributes[`${doc.name}/${attr.name}`] = {
          type: convertType(attr.type),
          description: extractEnglishDescription(attr.description),
        };
      } catch (e) {
        console.error(e.stack);
        throw new Error(`Failed to convert type of the following attribute:\n${JSON.stringify(attr, null, 2)}`);
      }
    }
  });

  // Generate `vue-onsenui-tags.json`
  fse.outputFileSync(
    path.join(destinationPath, 'vue-onsenui-tags.json'),
    JSON.stringify(tags, null, 2),
    {encoding: 'utf8'}
  );

  // Generate `vue-onsenui-attributes.json`
  fse.outputFileSync(
    path.join(destinationPath, 'vue-onsenui-attributes.json'),
    JSON.stringify(attributes, null, 2),
    {encoding: 'utf8'}
  );

  done();
});

gulp.task('test', (done) => {
  // WIP
  done();
});
