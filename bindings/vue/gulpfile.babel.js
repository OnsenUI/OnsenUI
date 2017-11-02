import 'babel-polyfill';

import corePkg from '../../package.json';
import gulp from 'gulp';
import * as glob from 'glob';
import path from'path';
import {merge} from 'event-stream';
import runSequence from 'run-sequence';
import WebpackDevServer from 'webpack-dev-server';
import open from 'open';
import os from 'os';
import fs from 'fs';
import fse from 'fs-extra';
import yargs, {argv} from 'yargs';
import {spawn} from 'child_process';
import WebdriverIOLauncher from 'webdriverio/build/lib/launcher';
import { rollup, watch as rollupWatch } from 'rollup';
import rawBundleConfig from './rollup.config.js';

process.env.NODE_ENV = 'production'; // Important when bundling/transpiling

const rollupConfig = rawBundleConfig.reduce((r, c) => (r[c.output.name] = c) && r, {})
const $ = require('gulp-load-plugins')();

const FLAGS = `--inline --colors --progress --display-error-details --display-cached`;

////////////////////////////////////////
// BUILD vue-bindings
////////////////////////////////////////
const bundle = config => rollup(config).then(bundle => bundle.write(config.output));

gulp.task('vue-bindings', () => bundle(rollupConfig['vueOnsen']));
gulp.task('vue-bindings-esm-bundle', () => bundle(rollupConfig['vueOnsenESM']));
gulp.task('vue-bindings-esm', ['vue-bindings-esm-bundle'], () =>  {
  const babelrc = corePkg.babel;
  babelrc.babelrc = babelrc.presets[0][1].modules = false;
  babelrc.plugins = [
    'external-helpers',
    'transform-runtime',
  ];

  // ES Modules (transpiled ES source codes)
  return merge(
    gulp.src([
      'src/**/*.js',
      '!src/*.js',
    ])
    .pipe($.babel(babelrc))
    .pipe(gulp.dest('esm/')),

    // Compile Vue components
    gulp.src([
      'src/**/*.vue',
    ])
    .pipe($.vueCompiler({
      babel: babelrc,
      newExtension: 'js',
    }))
    .pipe(gulp.dest('esm/'))

  );
});

gulp.task('clean', () => gulp.src([ 'dist', 'esm', ], { read: false }).pipe($.clean()));

gulp.task('minify-js', () => {
  return gulp.src('dist/vue-onsenui.js')
    .pipe($.uglify({ output: { comments: (node, comment) => comment.line === 1 } }))
    .pipe($.rename(path => path.extname = '.min.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', done => {
  return runSequence('clean', 'vue-bindings', 'vue-bindings-esm', 'minify-js', 'build:helper-json', done);
});

////////////////////////////////////////
// WATCH vue-bindings
////////////////////////////////////////
gulp.task('watch-vue-bindings', () => {
  return new Promise((resolve, reject) => rollupWatch(rawBundleConfig.devConfig).on('event', event => {
    switch (event.code) {
      case 'BUNDLE_START':
        $.util.log(`Bundling ${$.util.colors.blue(path.basename(event.output[0]))} ...`);
        break;
      case 'BUNDLE_END':
        $.util.log(`Finished ${$.util.colors.blue(path.basename(event.output[0]))} bundle`);
        resolve();
        break;
      case 'ERROR':
        $.util.log($.util.colors.red('Encountered an error while bundling\n', event.error));
        resolve();
        break;
      case 'FATAL':
        $.util.log($.util.colors.red('Encountered an unrecoverable error\n\n', event.error));
        reject();
        process.exit(1);
        break;
    }
  }));
});


////////////////////////////////////////
// generate-components
////////////////////////////////////////
gulp.task('generate-components', () => {
  const camelize = string => string.toLowerCase().replace(/-([a-z])/g, (m, l) => l.toUpperCase());
  const generate = (baseName, baseMixins = '') => {
    const domElement = 'ons-' + baseName;
    const mixins = 'deriveEvents' + (baseMixins ? `, ${baseMixins.trim().split(/\s+/).join(', ')}` : '');

    return `
<template>
  <${domElement} v-on="unrecognizedListeners">
    <slot></slot>
  </${domElement}>
</template>

<script>
  /* This file is generated automatically */
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
    'toolbar': '',
    'bottom-toolbar': '',
    'toolbar-button': '',
    'alert-dialog-button': '',
    'button': '',
    'icon': '',
    'card': '',
    'list': '',
    'list-item': '',
    'list-title': '',
    'list-header': '',
    'ripple': '',
    'row': '',
    'col': '',
    'progress-bar': '',
    'progress-circular': '',
    'carousel-item': '',
    'splitter-mask': '',
    'splitter-content': '',
    'splitter': 'selfProvider deriveDBB',
    'switch': 'modelCheckbox',
    'checkbox': 'modelCheckbox',
    'input': 'modelInput',
    'search-input': 'modelInput',
    'range': 'modelInput',
    'radio': 'modelRadio',
    'fab': 'hidable',
    'speed-dial-item': '',
    'dialog': 'hidable hasOptions dialogCancel deriveDBB portal',
    'action-sheet': 'hidable hasOptions dialogCancel deriveDBB portal',
    'action-sheet-button': '',
    'modal': 'hidable hasOptions deriveDBB portal',
    'toast': 'hidable hasOptions deriveDBB portal',
  };

  Object.keys(components).forEach(key => {
    const outputPath = path.join(__dirname, 'src', 'components', `VOns${camelize('-' + key)}.vue`);
    fs.writeFile(outputPath, generate(key, components[key]), 'utf8', error => {
      if (error) {
        $.util.log(`Wrong generation of v-ons-${key}:`);
        throw error;
      } else {
        $.util.log(`Generated v-ons-${key}.`);
      }
    });
  });
});

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
  .on('exit', function(code) {
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

gulp.task('test', ['e2e-test']);

gulp.task('webdriver-download', () => {
  const platform = os.platform();
  const destDir = path.join(__dirname, '.selenium');
  const chromeDriverUrl = (() => {
    const filePath = platform === 'win32' ?
      '/2.25/chromedriver_win32.zip' :
      `/2.25/chromedriver_${platform === 'darwin' ? 'mac' : 'linux'}64.zip`;
    return `http://chromedriver.storage.googleapis.com${filePath}`;
  })();

  // Only download once.
  if (fs.existsSync(destDir + '/chromedriver') || fs.existsSync(destDir + '/chromedriver.exe')) {
    return gulp.src('');
  }

  const selenium = $.download('https://selenium-release.storage.googleapis.com/3.0/selenium-server-standalone-3.0.1.jar')
    .pipe(gulp.dest(destDir));

  const chromedriver = $.download(chromeDriverUrl)
    .pipe($.unzip())
    .pipe($.chmod(755))
    .pipe(gulp.dest(destDir));

  return merge(selenium, chromedriver);
});

gulp.task('e2e-test', function(done) {
  // `runSequence` causes dependency tasks to be run many times.
  // To prevent this issue, we have to use gulp 4.x and an appropriate gulpfile which follows 4.x format.
  runSequence('e2e-test-webdriverio', done);
});

gulp.task('e2e-test-webdriverio', ['webdriver-download'], function(done){
  // run `gulp prepare` in the core directory if you made some changes to the core

  // Usage:
  //     # run all WebdriverIO E2E tests
  //     gulp e2e-test-webdriverio
  //
  //     # run only specified WebdriverIO E2E tests
  //     gulp e2e-test-webdriverio --specs test/e2e-webdriverio/dummy/index.spec.js
  //     gulp e2e-test-webdriverio --specs "test/**/index.spec.js"
  //     gulp e2e-test-webdriverio --specs "test/**/*.spec.js"
  //
  //     # run WebdriverIO E2E tests in a particular browser (possible values are defined in standalone Selenium Server)
  //     gulp e2e-test-webdriverio --browsers chrome # default
  //     gulp e2e-test-webdriverio --browsers chrome,safari # you can use commas

  // Structure of this E2E testing environment:
  //     this gulpfile
  //      ↓ <launch>
  //     WebdriverIO
  //      ↓ <access>
  //     standalone Selenium Server (<- launched by this gulpfile)
  //      ↓ <launch + access>
  //     SafariDriver
  //      ↓ <launch + access>
  //     Safari
  //      ↓ <access>
  //     local HTTP server (<- launched by this gulpfile)

  const port = 8081;

  $.util.log($.util.colors.blue(`Launching local HTTP server for E2E testing...`));

  const server = createDevServer('./webpack.config.wdio.js', {quiet: true});
  server.listen(port, '0.0.0.0', () => {
    // launch standalone Selenium Server
    $.util.log($.util.colors.blue(`Launching standalone Selenium Server...`));
    const standaloneSeleniumServer = spawn('java',
      [
        '-Dwebdriver.chrome.driver=.selenium/chromedriver',
        '-jar',
        '.selenium/selenium-server-standalone-3.0.1.jar'
      ],
      {stdio: 'inherit'} // redirect stdio/stdout/stderr to this process
    );

    (async () => {
      $.util.log($.util.colors.blue(`Waiting 5000 ms for standalone Selenium Server...`));
      await (async () => new Promise(resolve => setTimeout(resolve, 5000)))();

      const exitCode = await runWebdriverIO(standaloneSeleniumServer);
      server.close();
      server.listeningApp.close();
      if (exitCode !== 0) {
        process.exit(exitCode);
      }
      done();
    })();
  });
});

function createDevServer(configFile, options = {}) {
  const config = require(configFile);
  const serverConfig = Object.assign(options, {
    publicPath: config.output.publicPath,
    stats: {colors: true}
  }, config.devServer);
  const server = new WebpackDevServer(require('webpack')(config), serverConfig);

  return server;
}

async function runWebdriverIO(standaloneSeleniumServer) {
    const specs = argv.specs || 'test/e2e-webdriverio/*/**/*.spec.js'; // you cannot use commas for --specs
    const browsers = argv.browsers ? argv.browsers.split(',').map(s => s.trim()) : ['chrome'];

    let testsPassed = true; // error flag

    // Separately launch WebdriverIO for each browser
    try {
      for (let j = 0 ; j < browsers.length ; j++) {
        $.util.log($.util.colors.blue(`Start E2E testing on ${browsers[j]}...`));

        // Pass parameters to WebdriverIO config file via `global`
        global.WDIO_BROWSER = browsers[j];
        global.WDIO_SPEC_FILES = specs;

        // Launch WebdriverIO and wait until it exits
        await (async () => {
          return new Promise((resolve, reject) => {
            $.util.log($.util.colors.blue(`Launching WebdriverIO for ${browsers[j]}...`));
            $.util.log($.util.colors.blue(specs));
            const wdio = new WebdriverIOLauncher('test/e2e-webdriverio/wdio.conf.js');
            wdio.run()
            .then(
              function (exitCode) {
                const exitMessage = `WebdriverIO has exited with ${exitCode}`;

                switch (exitCode) {
                  case 0: // success
                    $.util.log($.util.colors.green(exitMessage));
                    $.util.log($.util.colors.green('Passed E2E tests successfully.'));
                    break;
                  default: // error
                    $.util.log($.util.colors.red(exitMessage));
                    $.util.log($.util.colors.red('Failed to pass some E2E tests. (Otherwise, the E2E testing itself is broken)'));
                    testsPassed = false;
                }
                resolve();
              },
              function (error) {
                $.util.log($.util.colors.red('Failed to launch WebdriverIO.'));
                console.error(error.stacktrace);
                resolve();
              }
            );
          });
        })();
      }
    } finally {
      global.WDIO_BROWSER = undefined;

      standaloneSeleniumServer.kill(); // kill standalone Selenium server
    }

    if (testsPassed) {
      $.util.log($.util.colors.green('Passed E2E tests on all browsers!'));
      return 0;
    } else {
      $.util.log($.util.colors.red('Failed to pass E2E tests on some browsers.'));
      return 1;
    }
}
