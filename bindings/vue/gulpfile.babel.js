import 'babel-polyfill';

import gulp from 'gulp';
import * as glob from 'glob';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import open from 'open';
import fs from 'fs';
import fse from 'fs-extra';
import { spawn } from 'child_process';

const $ = require('gulp-load-plugins')();

const FLAGS = `--inline --colors --progress --display-error-details --display-cached`;

// Build docs by running the parent gulpfile.
//
// We need the files in `build/docs/` in the project root
// to generate tags data and attributes data of `vue-onsenui` components.
gulp.task('build:core-docs', (done) => {
  console.log('Running parent gulpfile...');
  spawn('node_modules/.bin/gulp', ['build-docs'],
    {
      cwd: path.join(__dirname, '..', '..'), // exec in the project root
      stdio: 'inherit', // redirect stdio/stdout/stderr to this process
    }
  )
    .on('error', function (error) {
      done(new Error(error.message));
    })
    .on('exit', function (code) {
      if (code !== 0) {
        done(new Error('gulp exited with code ' + code));
      } else {
        console.log('Done.');
        done();
      }
    });
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
gulp.task('build:helper-json', ['build:core-docs'], (done) => {
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
    for (let i = doc.attributes.length - 1; i >= 0; i--) {
      const attr = doc.attributes[i];

      const isAllowedAttr =
        // Only core attributes and vue-onsenui attributes should be shown in autocompletion
        (attr.extensionOf == null || attr.extensionOf === 'vue')
        &&
        // Some attributes don't exist in vue-onsenui
        !/(^on-|initial-index|page$|delegate)/.test(attr.name);

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
    { encoding: 'utf8' }
  );

  // Generate `vue-onsenui-attributes.json`
  fse.outputFileSync(
    path.join(destinationPath, 'vue-onsenui-attributes.json'),
    JSON.stringify(attributes, null, 2),
    { encoding: 'utf8' }
  );

  done();
});

gulp.task('serve', done => {
  createDevServer('./webpack.config.js').listen('3030', '0.0.0.0', () => {
    open('http://0.0.0.0:3030/index.html');
    done();
  });
});

function createDevServer(configFile, options = {}) {
  const config = require(configFile);
  const serverConfig = Object.assign(options, {
    publicPath: config.output.publicPath,
    stats: { colors: true }
  }, config.devServer);
  const server = new WebpackDevServer(require('webpack')(config), serverConfig);

  return server;
}
