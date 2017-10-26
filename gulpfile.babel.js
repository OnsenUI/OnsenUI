/*
Copyright 2013-2014 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
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
import path from'path';
import glob from 'glob';
import pkg from './package.json';
import {merge} from 'event-stream';
import runSequence from 'run-sequence';
import dateformat from 'dateformat';
import browserSync from 'browser-sync';
import os from 'os';
import {spawn} from 'child_process';
import fs from 'fs';
import {argv} from 'yargs';
import karma from 'karma';
import WebdriverIOLauncher from 'webdriverio/build/lib/launcher';
import chalk from 'chalk';
import { rollup, watch as rollupWatch } from 'rollup';
import gulpLoadPlugins from 'gulp-load-plugins';
import rawBundleConfig from './rollup.config.js';

const rollupConfig = rawBundleConfig.reduce((r, c) => (r[c.output.name] = c) && r, {})
const $ = gulpLoadPlugins();
$.hub(['./css-components/gulpfile.js']); // adds 'build-css', 'css-clean' and 'cssnext' tasks

////////////////////////////////////////
// bundles
////////////////////////////////////////
const bundle = config => rollup(config).then(bundle => bundle.write(config.output));
const watch = config => new Promise((resolve, reject) => {
  rollupWatch(config).on('event', event => {
    switch (event.code) {
      case 'BUNDLE_START':
        $.util.log(`Bundling ${$.util.colors.blue(path.basename(event.output[0]))} ...`);
        break;
      case 'BUNDLE_END':
        $.util.log(`Finished ${$.util.colors.blue(path.basename(event.output[0]))} bundle`);
        resolve();
        break;
      case 'ERROR':
        $.util.log($.util.colors.red('Encountered an error while bundling'));
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

gulp.task('core', () => bundle(rollupConfig['ons']));
gulp.task('core-es', () => bundle(rollupConfig['onsES']));
gulp.task('angular-bindings', () => bundle(rollupConfig['angularOns']));

gulp.task('watch-core', () => watch(rollupConfig['ons']));
gulp.task('watch-angular-bindings', () => watch(rollupConfig['angularOns']));
gulp.task('watch-bundles', () => watch(rollupConfig['ons']).then(() => watch(rollupConfig['angularOns'])));


////////////////////////////////////////
// core-dts-test
////////////////////////////////////////
gulp.task('core-dts-test', (argv['skip-build'] ? [] : ['core']), (done) => {
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
});

////////////////////////////////////////
// unit-test
////////////////////////////////////////
gulp.task('unit-test', argv['skip-build'] ? [] : ['core-css', (argv.watch ? 'watch-core' : 'core')],
  (done) => {
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

    (async () => {
      const specs = argv.specs || 'core/src/**/*.spec.js'; // you cannot use commas for --specs
      const browsers = argv.browsers ? argv.browsers.split(',').map(s => s.trim()) : ['local_chrome_headless', 'remote_macos_elcapitan_safari_10'];

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
);

////////////////////////////////////////
// clean
////////////////////////////////////////
gulp.task('clean', () => {
  return gulp.src([
    '.tmp',
    'build',
    '.selenium/'
  ], {read: false}).pipe($.clean());
});

////////////////////////////////////////
// minify
////////////////////////////////////////
gulp.task('minify-js', () => {
  return merge(
    gulp.src('build/js/{onsenui,angular-onsenui}.js')
      .pipe($.uglify({ output: { comments: (node, comment) => comment.line === 1 } }))
      .pipe($.rename(path => {
        path.extname = '.min.js';
      }))
      .pipe(gulp.dest('build/js/'))
  );
});

////////////////////////////////////////
// core-css
////////////////////////////////////////
gulp.task('core-css', () =>  {
  return merge(gulp.src([
    'core/css/common.css',
    'core/css/*.css'
  ])
    .pipe($.concat('onsenui.css'))
    .pipe($.autoprefixer({
      browsers: [ // enable CSS properties which require prefixes
        'Android >= 4.4',
        'iOS >= 8.0',
        'Chrome >= 30', // equivalent to Android 4.4 WebView
        'Safari >= 9',
      ],
      add: true,
      remove: false, // removing prefixes can cause a bug
    }))
    .pipe($.header('/*! <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
    .pipe(gulp.dest('build/css/'))
    // onsenui.min.css
    .pipe($.cssmin({processImport: false}))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css/')),

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
});

////////////////////////////////////////
// core-src
////////////////////////////////////////
gulp.task('core-src', ['core-es'], () =>  {

  const babelrc = pkg.babel;
  babelrc.presets[0][1].modules = false;
  babelrc.plugins = [
    'external-helpers',
    'transform-runtime'
  ];

  // ES Modules (transpiled ES source codes)
  return gulp.src([
      'core/src/**/*.js',
      '!core/src/*.js',
      '!core/src/core-dts-test.*',
      '!core/src/**/*.spec.js',
    ])
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
      .pipe(gulp.dest('build/core-src/'));
});

////////////////////////////////////////
// copy-files
////////////////////////////////////////
gulp.task('copy-files', () =>  {
  return merge(
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
});

////////////////////////////////////////
// compress-distribution-package
////////////////////////////////////////
gulp.task('compress-distribution-package', () => {
  const src = [
    path.join(__dirname, 'build/**'),
    path.join(__dirname, 'LICENSE'),
    path.join(__dirname, 'CHANGELOG.md'),
    path.join(__dirname, 'bindings/*/dist/**'),
    '!' + path.join(__dirname, 'build/docs/**'),
    '!' + path.join(__dirname, 'build/docs'),
    '!' + path.join(__dirname, 'build/js/angular/**'),
    '!' + path.join(__dirname, 'build/js/angular')
  ];

  return gulp.src(src)
    .pipe($.zip('onsenui.zip'))
    .pipe(gulp.dest(path.join(__dirname, 'build')));
});

////////////////////////////////////////
// build
////////////////////////////////////////
gulp.task('build', done => {
  return runSequence(
    'clean',
    'core',
    'core-src',
    'core-css',
    'build-css',
    'copy-files',
    'angular-bindings',
    'minify-js',
    'build-docs',
    'compress-distribution-package',
    done
  );
});

////////////////////////////////////////
// dist
////////////////////////////////////////

gulp.task('soft-build', done => {
  return runSequence(
    'clean',
    'core',
    'core-src',
    'core-css',
    'build-css',
    'copy-files',
    'angular-bindings',
    'minify-js',
    done
  );
});

function distFiles() {
  return gulp.src([
    'build/**/*',
    '!build/docs/**/*',
    '!build/docs/',
    '!build/js/angular/**/*',
    '!build/js/angular/',
    '!build/onsenui.zip',
    '!build/package.json',
    'bower.json',
    'package.json',
    'README.md',
    'CHANGELOG.md',
    'LICENSE'
  ])
  .pipe(gulp.dest('OnsenUI-dist/'));
}

gulp.task('dist', ['soft-build'], distFiles);

gulp.task('dist-no-build', [], distFiles);

////////////////////////////////////////
// serve
////////////////////////////////////////

gulp.task('serve', done => {
  gulp.watch(['core/css/*.css'], { debounceDelay: 300 }, ['core-css']);

  // Livereload
  gulp.watch([
    'build/js/*onsenui.js',
    'build/css/onsen-css-components.css',
    'build/css/onsenui.css',
    'examples/*/*.{js,css,html}',
    'bindings/angular1/test/e2e/*/*.{js,css,html}'
  ]).on('change', changedFile => {
    gulp.src(changedFile.path)
      .pipe(browserSync.reload({stream: true, once: true}));
  });

  return runSequence('css-clean', 'cssnext', 'core-css', 'watch-bundles', 'browser-sync', done);
});

gulp.task('browser-sync', (done) => {
  browserSync({
    server: {
      baseDir: __dirname,
      index: 'index.html',
      directory: true
    },
    files: [],
    watchOptions: {
      //debounceDelay: 400
    },
    ghostMode: false,
    notify: false
  }, done);
});

////////////////////////////////////////
// build-docs
////////////////////////////////////////
gulp.task('build-docs', () => {
  const docsBuilder = require('./docs/wcdoc');

  return docsBuilder.build(path.join(__dirname, '/build/docs'));
});

////////////////////////////////////////
// test
////////////////////////////////////////
gulp.task('test', ['core-css'], function(done) {
  return runSequence('core-dts-test', 'unit-test', done);
});

////////////////////////////////////////
// webdriver-update
////////////////////////////////////////
gulp.task('webdriver-update', $.protractor.webdriver_update);

////////////////////////////////////////
// webdriver-download
////////////////////////////////////////
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

////////////////////////////////////////
// e2e-test
////////////////////////////////////////
gulp.task('e2e-test', function(done) {
  // `runSequence` causes dependency tasks to be run many times.
  // To prevent this issue, we have to use gulp 4.x and an appropriate gulpfile which follows 4.x format.
  runSequence('e2e-test-protractor', 'e2e-test-webdriverio', done);
});

gulp.task('e2e-test-protractor', ['webdriver-download', 'core-css'], function(){
  const port = 8081;

  $.connect.server({
    root: __dirname,
    port: port
  });

  const conf = {
    configFile: './core/test/e2e-protractor/protractor.conf.js',
    args: [
      '--baseUrl', 'http://127.0.0.1:' + port,
      '--seleniumServerJar', path.join(__dirname, '.selenium/selenium-server-standalone-3.0.1.jar'),
      '--chromeDriver', path.join(__dirname, '.selenium/chromedriver')
    ]
  };

  const specs = argv.specs ? argv.specs.split(',').map(s => s.trim()) : ['core/test/e2e-protractor/**/*.js'];

  return gulp.src(specs)
    .pipe($.protractor.protractor(conf))
    .on('error', function(e) {
      console.error(e);
      $.connect.serverClose();
    })
    .on('end', function() {
      $.connect.serverClose();
    });
});

gulp.task('e2e-test-webdriverio', ['webdriver-download', 'core-css'], function(done){
  // Usage:
  //     # run all WebdriverIO E2E tests
  //     gulp e2e-test-webdriverio
  //
  //     # run only specified WebdriverIO E2E tests
  //     gulp e2e-test-webdriverio --specs core/test/e2e-webdriverio/dummy/index.spec.js
  //     gulp e2e-test-webdriverio --specs "core/test/**/index.spec.js"
  //     gulp e2e-test-webdriverio --specs "core/test/**/*.spec.js"
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

  // launch local HTTP server for E2E testing
  $.util.log($.util.colors.blue(`Launching local HTTP server for E2E testing...`));
  $.connect.server({
    root: __dirname,
    port: port
  });

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
    const specs = argv.specs || 'core/test/e2e-webdriverio/**/*.js'; // you cannot use commas for --specs
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
            const wdio = new WebdriverIOLauncher('core/test/e2e-webdriverio/wdio.conf.js');
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

      $.connect.serverClose(); // kill local HTTP servers
      standaloneSeleniumServer.kill(); // kill standalone Selenium server
    }

    if (testsPassed) {
      $.util.log($.util.colors.green('Passed E2E tests on all browsers!'));
      done();
    } else {
      $.util.log($.util.colors.red('Failed to pass E2E tests on some browsers.'));
      done('e2e-test-webdriverio has failed');
    }
  })();
});
