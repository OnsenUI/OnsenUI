import gulp from 'gulp';
import path from 'path';
import mergeStream from 'merge-stream';
import os from 'os';
import fs from 'fs';
import {argv} from 'yargs';
import { rollup } from 'rollup';
import rawBundleConfig from './rollup.config.js';

////////////////////////////////////////

const $ = require('gulp-load-plugins')();

////////////////////////////////////////
// webdriver-update (overrides parent definition)
////////////////////////////////////////
gulp.task('webdriver-update', $.protractor.webdriver_update);

////////////////////////////////////////
// webdriver-download (overrides parent definition)
////////////////////////////////////////
function webdriverDownload(done) {
  const platform = os.platform();
  const destDir = path.join(__dirname, '.selenium');
  const chromeDriverUrl = (() => {
    const filePath = platform === 'win32' ?
      '/2.38/chromedriver_win32.zip' :
      `/2.38/chromedriver_${platform === 'darwin' ? 'mac' : 'linux'}64.zip`;
    return `http://chromedriver.storage.googleapis.com${filePath}`;
  })();

  // Only download once.
  if (fs.existsSync(destDir + '/chromedriver') || fs.existsSync(destDir + '/chromedriver.exe')) {
    done();
  } else {
    const selenium = $.download('https://selenium-release.storage.googleapis.com/3.12/selenium-server-standalone-3.12.0.jar')
      .pipe(gulp.dest(destDir));
  
    const chromedriver = $.download(chromeDriverUrl)
      .pipe($.unzip())
      .pipe($.chmod(755))
      .pipe(gulp.dest(destDir));
  
    return mergeStream(selenium, chromedriver);
  }
}

////////////////////////////////////////
// e2e-test (overrides parent definition)
////////////////////////////////////////
function e2eTest() {
  const port = 8081;

  $.connect.server({
    root: path.resolve(__dirname, '../..'),
    port: port
  });

  const conf = {
    configFile: './test/e2e/protractor.conf.js',
    args: [
      '--baseUrl', 'http://127.0.0.1:' + port,
      '--seleniumServerJar', path.join(__dirname, '.selenium/selenium-server-standalone-3.12.0.jar'),
      '--chromeDriver', path.join(__dirname, '.selenium/chromedriver')
    ]
  };

  const specs = argv.specs ? argv.specs.split(',').map(s => s.trim()) : ['test/e2e/**/*js'];

  return gulp.src(specs)
    .pipe($.protractor.protractor(conf))
    .on('error', function(e) {
      console.error(e);
      $.connect.serverClose();
    })
    .on('end', function() {
      $.connect.serverClose();
    });
}
gulp.task('e2e-test', gulp.series(webdriverDownload, e2eTest));

function clean() {
  return gulp.src(['dist'], { read: false, allowEmpty: true })
    .pipe($.clean());
}

function angularjsBindings() {
  const config = rawBundleConfig.reduce((r, c) => (r[c.output.name] = c) && r, {});

  return rollup(config.angularOns).then(bundle => bundle.write(config.angularOns.output));
}

gulp.task('build', gulp.series(clean, angularjsBindings));
