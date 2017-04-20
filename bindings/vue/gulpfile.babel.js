import 'babel-polyfill';

import gulp from 'gulp';
import path from'path';
import {merge} from 'event-stream';
import runSequence from 'run-sequence';
import shell from 'gulp-shell';
import WebpackDevServer from 'webpack-dev-server';
import open from 'open';
import os from 'os';
import fs from 'fs';
import yargs, {argv} from 'yargs';
import {spawn} from 'child_process';
import WebdriverIOLauncher from 'webdriverio/build/lib/launcher';
import StaticServer from 'static-server';

const $ = require('gulp-load-plugins')();

const FLAGS = `--inline --colors --progress --display-error-details --display-cached`;

gulp.task('serve', done => {
  createDevServer('./webpack.config.js').listen('3030', '0.0.0.0', () => {
    open('http://0.0.0.0:3030/index.html');
    done();
  });
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
