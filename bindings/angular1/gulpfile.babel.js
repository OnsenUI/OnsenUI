import '../../gulpfile.babel.js'; // inherit tasks from the parent gulpfile

import gulp from 'gulp';
import path from'path';
import {merge} from 'event-stream';
import os from 'os';
import fs from 'fs';
import {argv} from 'yargs';

////////////////////////////////////////

const $ = require('gulp-load-plugins')();

////////////////////////////////////////
// webdriver-update (overrides parent definition)
////////////////////////////////////////
gulp.task('webdriver-update', $.protractor.webdriver_update);

////////////////////////////////////////
// webdriver-download (overrides parent definition)
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
// e2e-test (overrides parent definition)
////////////////////////////////////////
gulp.task('e2e-test', ['webdriver-download', 'prepare'], function() {
  const port = 8081;

  $.connect.server({
    root: path.resolve(__dirname, '../..'),
    port: port
  });

  const conf = {
    configFile: './test/e2e/protractor.conf.js',
    args: [
      '--baseUrl', 'http://127.0.0.1:' + port,
      '--seleniumServerJar', path.join(__dirname, '.selenium/selenium-server-standalone-3.0.1.jar'),
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
});
