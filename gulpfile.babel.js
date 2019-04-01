/*
Copyright 2013-2014 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/* eslint-disable no-console */

import 'babel-polyfill';

import gulp from 'gulp';
import path from 'path';
import glob from 'glob';
import pkg from './package.json';
import mergeStream from 'merge-stream';
import dateformat from 'dateformat';
import browserSyncPlugin from 'browser-sync';
import os from 'os';
import {spawn, spawnSync} from 'child_process';
import fs from 'fs';
import {argv} from 'yargs';
import karma from 'karma';
import WebdriverIOLauncher from 'webdriverio/build/lib/launcher';
import chalk from 'chalk';
import { rollup, watch as rollupWatch } from 'rollup';
import gulpLoadPlugins from 'gulp-load-plugins';
import rawCoreRollupConfig from './rollup.config.js';
import rawAngularRollupConfig from './bindings/angular1/rollup.config.js';

// Configurations
const rawRollupConfigs = [].concat(rawCoreRollupConfig, rawAngularRollupConfig);
const rollupConfigs = rawRollupConfigs.reduce((r, c) => (r[c.output.name] = c) && r, {});
const babelrc = Object.assign({}, pkg.babel);
babelrc.babelrc = babelrc.presets[0][1].modules = false;
babelrc.plugins = [
  'external-helpers',
  'transform-runtime'
];
const coreESMFiles = [
  'core/src/**/*.js',
  '!core/src/*.js',
  '!core/src/core-dts-test.*',
  '!core/src/**/*.spec.js',
];

const $ = gulpLoadPlugins();

const hub = new $.hub(['./css-components/gulpfile.js']); // adds 'build-css', 'css-clean' and 'cssnext' tasks
gulp.registry(hub);

////////////////////////////////////////
// bundles
////////////////////////////////////////
const bundle = config => rollup(config).then(bundle => bundle.write(config.output));
const transpileCoreSrc = files => {
  const filePath = typeof files === 'string' ? path.relative('./core/src', files) : null;
  $.util.log(`Transpiling core ESM files${filePath === null ? '' : ` (${$.util.colors.magenta(filePath)})`} ...`);
  return new Promise(resolve =>
    gulp.src(files)
    // SVG loader
    .pipe(
      $.if(/ons-back-button\.js$/,
        $.replace(/import\s+(\w+)\s+from\s+'([./\w-]+\.svg)';/g, function(match, p1, p2) {
          const svgPath = path.join(path.dirname(this.file.path), p2);
          const svg = fs.readFileSync(svgPath, 'utf8');
          return `const ${p1} = \`${svg}\`;`
        })
      )
    )
    // Transpile to ES5
    .pipe($.babel(babelrc))
    .pipe(gulp.dest('build/esm/' + (filePath === null ? '' : path.dirname(filePath))))
    .on('end', () => {
      $.util.log('Finished transpiling core ESM files');
      resolve();
    })
  );
};

function core() {
  return bundle(rollupConfigs.ons);
}

// TODO: For 2.11.0, the bindings should no longer be copied. But it may still be
// useful to keep this message for the foreseeable future. In 2.11.0, this warning
// will be the only contents of the angular-onsenui.js file in the core.
const angularCoreWarning = "console.warn('From Onsen UI 2.11.0, the AngularJS binding will no longer be part of the core package. \
You will need to install the new angularjs-onsenui package. See https://onsen.io/v2/guide/angular1/#migrating-to-angularjs-onsenui-package for more details.');\n\n";
const copyAngularBindings = () => {
  const destDir = path.join('build', 'js');
  if (!fs.existsSync(destDir)) { fs.mkdirSync(destDir) }

  ['.js', '.min.js'].forEach(suffix => {
    const src = path.join('bindings', 'angular1', 'dist', `angularjs-onsenui${suffix}`);
    const dest = path.join(destDir, `angular-onsenui${suffix}`);

    const fileContents = angularCoreWarning + fs.readFileSync(src);
    fs.writeFileSync(dest, fileContents);
  });
}

function angularBindings(done) {
  spawnSync('gulp', ['--gulpfile', path.join('bindings', 'angular1', 'gulpfile.js', 'build')]);
  copyAngularBindings();
  done();
}

////////////////////////////////////////
// watch
////////////////////////////////////////
const watch = config => new Promise((resolve, reject) => {
  rollupWatch(config).on('event', event => {
    const filename = event.output && $.util.colors.cyan(path.relative(__dirname, event.output[0]));
    switch (event.code) {
      case 'BUNDLE_START':
        $.util.log(`Bundling '${filename}' ...`);
        break;
      case 'BUNDLE_END':
        $.util.log(`Finished '${filename}' bundle`);
        resolve();
        break;
      case 'ERROR':
        $.util.log($.util.colors.red('Encountered an error while bundling\n\n', event.error));
        resolve();
        break;
      case 'FATAL':
        $.util.log($.util.colors.red('Encountered an unrecoverable error\n\n', event.error));
        reject();
        process.exit(1);
        break;
    }
  });
});

function watchCoreEsm() {
  gulp.watch(coreESMFiles).on('change', changedFile => transpileCoreSrc(changedFile.path));
  return watch(rollupConfigs.onsESM).then(() => transpileCoreSrc(coreESMFiles));
}

function watchCore() {
  coreCss();
  gulp.watch(['core/css/*.css'], { debounceDelay: 300 }, coreCss);
  return watch(rollupConfigs.ons);
}

// gulp.task('watch-angular-bindings', () => watch(rollupConfigs.angularOns));

// TODO: Remove this when AngularJS is no longer part of the core
// The only difference between this task and the one-line `watch-angular-bindings` above
// is that this copies the Angular files into core. From 2.11.0 we won't need this.
function watchAngularBindings(done) {
  rollupWatch(rollupConfigs.angularOns).on('event', event => {
    switch (event.code) {
      case 'BUNDLE_START':
        $.util.log(`Bundling 'angularjs' ...`);
        break;
      case 'BUNDLE_END':
        copyAngularBindings();
        $.util.log(`Finished 'angularjs' bundle`);
        break;
      case 'ERROR':
        throw new Error('Encountered an error while bundling\n\n', event.error);
      case 'FATAL':
        $.util.log($.util.colors.red('Encountered an unrecoverable error\n\n', event.error));
        process.exit(1);
        break;
    }
  });
  done();
}

function watchVueBindings(done) {
  watch(require('./bindings/vue/rollup.config.js').default.devConfig);
  done();
}

function watchReactBindings(done) {
  watch(require('./bindings/react/rollup.config.js').default.devConfig);
  done();
}

////////////////////////////////////////
// core-dts-test
////////////////////////////////////////
function coreDtsTest(done) {
  // Usage:
  //     # validate the d.ts file for the core
  //     gulp core-dts-test

  const docsBuilder = require('./docs/wcdoc');

  // ons-foo-bar -> onsFooBar
  const camelize = (string) => {
    return string.toLowerCase().replace(/-([a-z])/g, function (m, l) {
      return l.toUpperCase();
    });
  };

  /**
   * Create a test function written in TypeScript based on an element definition.
   */
  const createTestFunctionForElement = (elementName, properties, methods) => {
    let code = '';
    code += `// Test for <${elementName}>\n`;
    code += `function ${camelize('test-' + elementName)}Element(): void {\n`;
    if (properties.length === 0 && methods.length === 0) {
      code += `  // This element has no members.\n`;
    } else {
      code += `  const ${camelize(elementName)} = <${camelize('-' + elementName)}Element>document.querySelector('${elementName}');\n`;
      for (const property of properties) {
        code += `  ${camelize(elementName)}.${property.name};\n`;
      }
      for (const method of methods) {
        code += `  ${camelize(elementName)}.${method.name};\n`;
      }
    }
    code += `}\n`;

    return code;
  }

  /**
   * Create a test function written in TypeScript based on an object definition.
   */
  const createTestFunctionForObject = (objectName, properties, methods) => {
    let code = '';
    code += `// Test for ${objectName}\n`;
    code += `function test${camelize('-' + objectName.replace('.', '-'))}Object(): void {\n`;
    for (const property of properties) {
      if (property.name.includes('|')) { // Prevent `ons.GestureDetector.EVENT_START|MOVE|END|RELEASE|TOUCH;`
        for (const splittedProperty of property.name.split('|')) {
          code += `  ${objectName}.${splittedProperty};\n`;
        }
      } else {
          code += `  ${objectName}.${property.name};\n`;
      }
    }
    for (const method of methods) {
      code += `  ${objectName}.${method.name};\n`;
    }
    code += `}\n`;

    return code;
  }

  /**
   * Create a TypeScript code which tests the d.ts file for the core
   */
  const createTestScript = (elementDefinitions, objectDefinitions) => {
    let code = '';
    code += `import * as ons from './onsenui';\n`;
    code += `import {\n`;
    for (const el of Object.values(elementDefinitions)) {
      // ignore elements which have no members
      if (el.properties.length === 0 && el.methods.length === 0) {
        continue;
      }

      code += `  ${camelize('-' + el.name)}Element,\n`;
    }
    code += `} from './onsenui';\n`;
    code += `\n`;
    code += `// Caution: This file is automatically generated by gulpfile. Please do not edit this.\n`;
    code += `\n`;
    for (const el of Object.values(elementDefinitions)) {
      code += createTestFunctionForElement(el.name, el.properties, el.methods);
      code += `\n`;
    }
    for (const obj of Object.values(objectDefinitions)) {
      switch (true) { // regex switch
        case /^ons$/.test(obj.name):
          code += createTestFunctionForObject(obj.name, obj.properties, obj.methods);
          break;
        default:
          code += createTestFunctionForObject(obj.name, obj.properties, obj.methods);
          break;
      }
      code += `\n`;
    }

    return code;
  }

  docsBuilder.collect({ // Retrive metadata of core elements and objects via `wcdoc`
    src: [
      './core/src/elements/**/*.js',
      './core/src/ons/**/*.js',
      '!**/*.spec.js'
    ]
  }).then(function(result) {
    // Generate test script based on metadata of the core
    const testScript = createTestScript(result.element, result.object);

    // Write generated script to a file
    fs.writeFileSync('core/src/core-dts-test.ts', testScript, {encoding: 'utf8'});

    // Test the d.ts file with the generated script
    spawn('node_modules/.bin/tsc', ['core/src/core-dts-test.ts', '--target', 'es6'],
      {stdio: 'inherit'} // redirect stdio/stdout/stderr to this process
    )
    .on('error', function (error) {
        done(new Error(error.message));
    })
    .on('exit', function(code) {
      if (code !== 0) {
        done(new Error('tsc exited with code ' + code));
      } else {
        done();
      }
    });
  }).catch(function(reason) {
    console.log(reason);
    console.log(reason.stack);
    throw reason;
  });
}

exports['core-dts-test'] = argv['skip-build'] ? coreDtsTest : gulp.series(core, coreDtsTest);

////////////////////////////////////////
// unit-test
////////////////////////////////////////
// Usage:
//     # run all unit tests in just one Karma server
//     gulp unit-test
//
//     # run only specified unit tests in just one Karma server
//     gulp unit-test --specs core/src/elements/ons-navigator/index.spec.js
//     gulp unit-test --specs "core/src/**/index.spec.js"
//     gulp unit-test --specs "core/src/**/*.spec.js"
//
//     # run all unit tests separately
//     gulp unit-test --separately
//
//     # run only specified unit tests separately
//     gulp unit-test --separately --specs core/src/elements/ons-navigator/index.spec.js
//     gulp unit-test --separately --specs "core/src/**/index.spec.js"
//     gulp unit-test --separately --specs "core/src/**/*.spec.js"
//
//     # run unit tests in a particular browser
//     gulp unit-test --browsers local_chrome_headless
//     gulp unit-test --browsers local_chrome_headless,local_safari # you can use commas
//     gulp unit-test --browsers remote_iphone_5_simulator_ios_10_0_safari # to use this, see karma.conf.js
//     gulp unit-test --browsers local_chrome_headless,remote_macos_elcapitan_safari_10 # default
//
//     # run unit tests without Onsen UI warnings
//     gulp unit-test --disable-warnings
//
//     # watch unit tests
//     gulp unit-test --watch

const unitTestTasks = [];
if (!argv['skip-build']) {
  if (argv.watch) {
    unitTestTasks.push(watchCore);
  } else {
    unitTestTasks.push(coreCss, core);
  }
}
unitTestTasks.push(unitTest);
exports['unit-test'] = gulp.series(...unitTestTasks);

function unitTest(done) {

  (async () => {
    const specs = argv.specs || 'core/src/**/*.spec.js'; // you cannot use commas for --specs
    let browsers = argv.browsers ? argv.browsers.split(',').map(s => s.trim()) : ['local_chrome_headless', 'remote_macos_safari'];

    // If the Sauce credentials are not set, remove the remote builds from the queue.
    // This way, we can run the unit test more easily locally, as well as safely for
    // pull requests. These values are not passed to PR builds because in theory the
    // PR could log out these values and expose them.
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
      browsers = browsers.filter(browser => {
        const isRemote = browser.indexOf('remote') === 0;

        if (isRemote) {
          console.warn(`Not testing on ${browser} due to missing credentials`);
          return false;
        } else {
          return true;
        }
      });
    }

    let listOfSpecFiles;
    if (argv.separately) { // resolve glob pattern
      listOfSpecFiles = glob.sync( path.join(__dirname, specs) );
    } else { // do not resolve glob pattern
      listOfSpecFiles = new Array( path.join(__dirname, specs) );
    }

    // if --disable-warnings is specified, suppress warnings from Onsen UI
    if (argv['disable-warnings']) {
      global.KARMA_DISABLE_WARNINGS = true;
    }

    let testsPassed = true; // error flag

    // Separately launch Karma server for each browser and each set of spec files
    try {
      for (let j = 0 ; j < browsers.length ; j++) {
        $.util.log($.util.colors.blue(`Start unit testing on ${browsers[j]}...`));

        // Pass parameters to Karma config file via `global`
        global.KARMA_BROWSER = browsers[j];

        for (let i = 0 ; i < listOfSpecFiles.length ; i++) {
          $.util.log($.util.colors.blue(path.relative(__dirname, listOfSpecFiles[i])));

          // Pass parameters to Karma config file via `global`
          global.KARMA_SPEC_FILES = listOfSpecFiles[i];

          // Launch Karma server and wait until it exits
          await (async () => {
            return new Promise((resolve, reject) => {
              new karma.Server(
                {
                  configFile: path.join(__dirname, 'core/test/unit/karma.conf.js'),
                  singleRun: argv.watch ? false : true, // overrides the corresponding option in config file
                  autoWatch: argv.watch ? true : false // same as above
                },
                (exitCode) => {
                  const exitMessage = `Karma server has exited with ${exitCode}`;

                  switch (exitCode) {
                    case 0: // success
                      $.util.log($.util.colors.green(exitMessage));
                      $.util.log($.util.colors.green('Passed unit tests successfully.'));
                      break;
                    default: // error
                      $.util.log($.util.colors.red(exitMessage));
                      $.util.log($.util.colors.red('Failed to pass some unit tests. (Otherwise, the unit testing itself is broken)'));
                      testsPassed = false;
                  }
                  resolve();
                }
              ).start();
            });
          })();

          // Wait for 500 ms before next iteration to avoid crashes
          await (async () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => { resolve(); }, 500 );
            });
          })();
        }
      }
    } finally {
      global.KARMA_BROWSER = undefined;
      global.KARMA_SPEC_FILES = undefined;
    }

    if (testsPassed) {
      $.util.log($.util.colors.green('Passed unit tests on all browsers!'));
      done();
    } else {
      $.util.log($.util.colors.red('Failed to pass unit tests on some browsers.'));
      done('unit-test has failed');
    }
  })();
}

////////////////////////////////////////
// clean
////////////////////////////////////////
function clean() {
  return gulp.src([
    '.tmp',
    'build',
    '.selenium/'
  ], {read: false, allowEmpty: true}).pipe($.clean());
}

////////////////////////////////////////
// core-css
////////////////////////////////////////
function coreCss() {
  const buildPath = 'build/css/';
  const core = (name, fonts) => gulp.src([
      (fonts ? '' : '!') + 'core/css/fonts.css',
      'core/css/common.css',
      'core/css/*.css',
    ])
    .pipe($.concat(`${name}.css`))
    .pipe($.insert.prepend(`/*! ${pkg.name} - v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`))
    // Transpile
    .pipe($.autoprefixer({
      browsers: babelrc.presets[0][1].targets.browsers,
      add: true,
      remove: false, // removing prefixes can cause a bug
    }))
    .pipe(gulp.dest(buildPath))
    // Minify
    .pipe($.cssmin({ processImport: false }))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest(buildPath))
  ;

  return mergeStream(
    core('onsenui', true),
    core('onsenui-core', false),

    gulp.src('core/css/fonts.css')
      .pipe($.rename({ basename: 'onsenui-fonts' }))
      .pipe(gulp.dest(buildPath)),

    // font-awesome fle copy
    gulp.src('core/css/font_awesome/**/*')
      .pipe(gulp.dest('build/css/font_awesome/')),

    // ionicons file copy
    gulp.src('core/css/ionicons/**/*')
      .pipe(gulp.dest('build/css/ionicons/')),

    // material icons file copy
    gulp.src('core/css/material-design-iconic-font/**/*')
    .pipe(gulp.dest('build/css/material-design-iconic-font/'))
  );
}

////////////////////////////////////////
// core-esm
////////////////////////////////////////
function coreEsm() {
  // ES Modules (transpiled ES source codes)
  return bundle(rollupConfigs.onsESM).then(() => transpileCoreSrc(coreESMFiles))
}

////////////////////////////////////////
// copy-files
////////////////////////////////////////
function copyFiles() {
  return mergeStream(
    // CSS source
    gulp.src([
      'css-components/**/*',
      '!css-components/onsen-visual-design-spec.sketch',
      '!css-components/build/',
      '!css-components/build/**/*',
      '!css-components/node_modules/',
      '!css-components/node_modules/**/*',
      '!css-components/npm-debug.log'
    ])
      .pipe(gulp.dest('build/css-components-src/')),

    // These are not used (already loaded by gulp-replace)
    // gulp.src('core/images/**/*')
    //   .pipe(gulp.dest('build/images/')),

    // package.json (for the bindings which uses `build` directory)
    gulp.src([
      'package.json',
    ])
      .pipe(gulp.dest('build/')),

    // type definitions copy
    gulp.src('core/src/onsenui.d.ts')
      .pipe(gulp.dest('build/js/')),
  );
}

////////////////////////////////////////
// compress-distribution-package
////////////////////////////////////////
function compressDistributionPackage() {
  const src = [
    path.join(__dirname, 'build/**'),
    path.join(__dirname, 'LICENSE'),
    path.join(__dirname, 'CHANGELOG.md'),
    path.join(__dirname, 'bindings/*/esm/**'),
    path.join(__dirname, 'bindings/*/dist/**'),
    '!' + path.join(__dirname, 'build/docs/**'),
    '!' + path.join(__dirname, 'build/docs'),
  ];

  return gulp.src(src)
    .pipe($.zip('onsenui.zip'))
    .pipe(gulp.dest(path.join(__dirname, 'build')));
}

////////////////////////////////////////
// build
////////////////////////////////////////
const buildTasks = [
  clean,
  core,
  coreEsm,
  angularBindings,
  coreCss,
  'build-css',
  copyFiles,
];

exports.build = gulp.series(...buildTasks.concat([buildDocs, compressDistributionPackage]));

////////////////////////////////////////
// dist
////////////////////////////////////////

const distFiles = done => {
  gulp.src([
    'build/**/*',
    '!build/docs/**/*',
    '!build/docs/',
    '!build/onsenui.zip',
    '!build/package.json',
    'bower.json',
    'package.json',
    'README.md',
    'CHANGELOG.md',
    'LICENSE',
  ])
  .pipe(gulp.dest('OnsenUI-dist/'))
  .on('end', done);
};

exports.dist = gulp.series(...buildTasks.concat(distFiles));

exports['dist-no-build'] = distFiles

////////////////////////////////////////
// serve
////////////////////////////////////////

const serveTasks = [liveReload];
argv.css && serveTasks.push('css-clean', 'cssnext');
argv.core && serveTasks.push(watchCore);
argv.coreEsm && serveTasks.push(watchCoreEsm);
(argv.angular || argv.angular1) && serveTasks.push(watchAngularBindings);
argv.react && serveTasks.push(watchReactBindings);
argv.vue && serveTasks.push(watchVueBindings);
serveTasks.push(browserSync);

exports.serve = gulp.series(...serveTasks);

function liveReload(done) {
  // Livereload
  gulp.watch([
    'build/js/*onsenui.js',
    'build/css/onsen-css-components.css',
    'build/css/onsenui.css',
    'examples/*/*.{js,css,html}',
    'bindings/angular1/test/e2e/*/*.{js,css,html}',
    'bindings/angular1/examples/**/*.{js,css,html}',
    'bindings/vue/examples/build.js',
    'bindings/react/examples/build.js',
  ]).on('change', changedFile => {
    gulp.src(changedFile)
      .pipe(browserSyncPlugin.reload({stream: true, once: true}));
  });
  done();
}

function browserSync(done) {
  const startPath =
    argv.vue && '/bindings/vue/examples/index.html'
    || argv.react && '/bindings/react/examples/index.html'
    || (argv.angular || argv.angular1) && '/bindings/angular1/examples/'
    // || (argv.ngx || argv.angular2) && '/bindings/angular2/.../'
    || '/examples/';

  browserSyncPlugin({
    server: {
      baseDir: __dirname,
      index: 'index.html',
      directory: true
    },
    startPath,
    files: [],
    watchOptions: {
      //debounceDelay: 400
    },
    ghostMode: false,
    notify: false
  }, done);
}

////////////////////////////////////////
// build-docs
////////////////////////////////////////
function buildDocs() {
  const docsBuilder = require('./docs/wcdoc');

  return docsBuilder.build(path.join(__dirname, '/build/docs'));
}

exports['build-docs'] = buildDocs;

////////////////////////////////////////
// test
////////////////////////////////////////
exports.test = gulp.series(coreDtsTest, unitTest);
