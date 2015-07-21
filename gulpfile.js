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

var CORDOVA_APP = false;

////////////////////////////////////////

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gulpIf = require('gulp-if');
var pkg = require('./package.json');
var merge = require('event-stream').merge;
var runSequence = require('run-sequence');
var dateformat = require('dateformat');
var browserSync = require('browser-sync');
var dgeni = require('dgeni');
var njglobals = require('dgeni-packages/node_modules/nunjucks/src/globals');
var os = require('os');
var fs = require('fs');
var argv = require('yargs').argv;

////////////////////////////////////////
// browser-sync
////////////////////////////////////////
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: __dirname + '/',
      index: 'index.html',
      directory: true
    },
    files: [],
    watchOptions: {
      //debounceDelay: 400
    },
    ghostMode: false,
    notify: false
  });
});

////////////////////////////////////////
// core
////////////////////////////////////////
gulp.task('core', function() {
  var onlyES6 = $.filter('*.es6');

  // ons-core.js
  return gulp.src([
    'core/vendor/winstore-jscompat.js',
    'core/vendor/*.js',
    'core/lib/animit.es6',
    'core/lib/doorlock.es6',
    'core/lib/ons.es6',
    'core/lib/ons-util.es6',
    'core/lib/modal-animator.es6',
    'core/lib/navigator-transition-animator.es6',
    'core/lib/popover-animator.es6',
    'core/lib/*.{es6,js}',
    'core/*.{es6,js}',
    'core/elements/*.{es6,js}',
    '!core/**/*.spec.{es6,js}',
  ])
    .pipe($.sourcemaps.init())
    .pipe($.plumber())
    .pipe(onlyES6 = $.filter('*.es6'))
    .pipe($.babel({modules: 'ignore'}))
    .pipe(onlyES6.restore())
    .pipe($.concat('ons-core.js'))            
    .pipe($.header('/*! ons-core.js for Onsen UI v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('build/js/'));
});

////////////////////////////////////////
// core-test
////////////////////////////////////////
gulp.task('core-test', ['core'], function() {
  return gulp.src([])
    .pipe($.karma({
      configFile: 'core/test/karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});

////////////////////////////////////////
// watch-core-test
////////////////////////////////////////
gulp.task('watch-core-test', function() {
  return gulp.src([])
    .pipe($.karma({
      configFile: 'core/test/karma.conf.js',
      action: 'watch'
    }))
    .on('error', function(err) {
      throw err;
    });
});

////////////////////////////////////////
// html2js
////////////////////////////////////////
gulp.task('html2js', function() {
  return gulp.src('framework/templates/*.tpl')
    .pipe($.html2js({base: __dirname + '/framework', outputModuleName: 'templates-main', useStrict: true, quoteChar: '\''}))
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest('framework/directives/'));
});

////////////////////////////////////////
// jshint-vanilla
////////////////////////////////////////
gulp.task('jshint-vanilla', function() {
  gulp.src([
    'core/elements/*.js',
    'core/lib/*.js',
    'core/*.js',
    'framework/js/*.js',
    'framework/directives/*.js',
    'framework/services/*.js',
    'framework/elements/*.js',
    'framework/views/*.js'
  ])
    .pipe($.cached('js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

/////////////////0///////////////////////
// eslint
////////////////////////////////////////
gulp.task('eslint', function() {
  gulp.src([
    'core/elements/*.es6',
    'core/lib/*.es6',
    'core/*.es6',
    'framework/js/*.es6',
    'framework/directives/*.es6',
    'framework/services/*.es6',
    'framework/elements/*.es6',
    'framework/views/*.es6'
  ])
    .pipe($.cached('es6'))
    .pipe($.eslint({useEslintrc: true}))
    .pipe($.eslint.format());
});

/////////////////0///////////////////////
// jshint
////////////////////////////////////////
gulp.task('jshint', ['jshint-vanilla', 'eslint']);

////////////////////////////////////////
// clean
////////////////////////////////////////
gulp.task('clean', function() {
  return gulp.src([
    '.tmp',
    'build',
    'app/lib/onsen/',
    '.selenium/'
  ], {read: false}).pipe($.clean());
});

////////////////////////////////////////
// minify
////////////////////////////////////////
gulp.task('minify-js', function() {
  return merge(
    gulp.src('build/js/{onsenui,onsenui_all,ons-core}.js')
      .pipe($.uglify({
        mangle: false,
        preserveComments: function(node, comment) {
          return comment.line === 1;
        }
      }))
      .pipe($.rename(function(path) {
        path.extname = '.min.js';
      }))
      .pipe(gulp.dest('build/js/'))
      .pipe(gulpIf(CORDOVA_APP, gulp.dest('cordova-app/www/lib/onsen/js')))
      .pipe(gulp.dest('app/lib/onsen/js'))
  );
});

////////////////////////////////////////
// prepare
////////////////////////////////////////
gulp.task('prepare', ['html2js', 'core'], function() {

  var onlyES6;

  return merge(

    // onsenui.js
    gulp.src([
      'build/js/ons-core.js',
      'framework/lib/winstore-jscompat.js',
      'framework/lib/*.{es6,js}',
      'framework/directives/templates.js',
      'framework/js/doorlock.es6',
      'framework/js/onsen.js',
      'framework/views/*.{es6,js}',
      'framework/directives/*.{es6,js}',
      'framework/services/*.{es6,js}',
      'framework/js/*.{es6,js}'
    ])
      .pipe($.plumber())
      .pipe(onlyES6 = $.filter('*.es6'))
      .pipe($.babel({modules: 'ignore'}))
      .pipe(onlyES6.restore())
      .pipe($.ngAnnotate({add: true, single_quotes: true}))
      .pipe($.concat('onsenui.js'))            
      .pipe($.header('/*! <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
      .pipe(gulp.dest('build/js/'))
      .pipe(gulpIf(CORDOVA_APP, gulp.dest('cordova-app/www/lib/onsen/js')))
      .pipe(gulp.dest('app/lib/onsen/js')),

    // onsenui_all.js
    gulp.src([
      'build/js/ons-core.js',
      'framework/lib/winstore-jscompat.js',
      'framework/lib/angular/angular.js',
      'framework/lib/*.{es6,js}',
      'framework/directives/templates.js',
      'framework/js/doorlock.es6',
      'framework/js/onsen.js',
      'framework/views/*.{es6,js}',
      'framework/directives/*.{es6,js}',
      'framework/services/*.{es6,js}',
      'framework/js/*.{es6,js}'
    ])
      .pipe($.plumber())
      .pipe(onlyES6 = $.filter('*.es6'))
      .pipe($.babel({modules: 'ignore'}))
      .pipe(onlyES6.restore())
      .pipe($.ngAnnotate({add: true, single_quotes: true}))
      .pipe($.concat('onsenui_all.js'))
      .pipe($.header('/*! <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
      .pipe(gulp.dest('build/js/'))
      .pipe(gulp.dest('app/lib/onsen/js')),

    // onsen-css-components
    gulp.src([
      'css-components/components-src/dist/*.css',
    ])
      .pipe(gulp.dest('build/css/'))
      .pipe(gulpIf(CORDOVA_APP, gulp.dest('cordova-app/www/lib/onsen/css')))
      .pipe(gulp.dest('app/lib/onsen/css')),

    // stylus files
    gulp.src([
      'css-components/components-src/stylus/**/*'
    ])
      .pipe(gulp.dest('app/lib/onsen/stylus'))
      .pipe(gulp.dest('build/stylus/')),


    // onsenui.css
    gulp.src([
      'core/css/common.css',
      'core/css/*.css'
    ])
      .pipe($.concat('onsenui.css'))
      .pipe($.autoprefixer('> 1%', 'last 2 version', 'ff 12', 'ie 8', 'opera 12', 'chrome 12', 'safari 12', 'android 2', 'ios 6'))
      .pipe($.header('/*! <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
      .pipe(gulp.dest('build/css/'))
      .pipe(gulpIf(CORDOVA_APP, gulp.dest('cordova-app/www/lib/onsen/css')))
      .pipe(gulp.dest('app/lib/onsen/css')),

    // angular.js copy
    gulp.src('framework/lib/angular/*.*')
      .pipe(gulp.dest('app/lib/onsen/js/angular/'))
      .pipe(gulp.dest('build/js/angular/')),

    // font-awesome fle copy
    gulp.src('core/css/font_awesome/**/*')
      .pipe(gulp.dest('build/css/font_awesome/'))
      .pipe(gulp.dest('app/lib/onsen/css/font_awesome/')),

    // ionicons file copy
    gulp.src('core/css/ionicons/**/*')
      .pipe(gulp.dest('build/css/ionicons/'))
      .pipe(gulp.dest('app/lib/onsen/css/ionicons/')),

    // auto prepare
    gulp.src('cordova-app/www/index.html')
      .pipe(gulpIf(CORDOVA_APP, $.shell(['cd cordova-app; cordova prepare'])))
  ).on('end', function() {
    browserSync.reload();
  });
});

////////////////////////////////////////
// prepare-css-components
////////////////////////////////////////
gulp.task('prepare-css-components', ['prepare'], function() {
  return gulp.src(['build/**', '!build/docs', '!build/docs/**'])
    .pipe(gulp.dest('css-components/www/patterns/lib/onsen'));
});

////////////////////////////////////////
// compress-distribution-package
////////////////////////////////////////
gulp.task('compress-distribution-package', function() {
  var src = [
    __dirname + '/build/**',
    '!' + __dirname + '/build/docs/**',
    '!' + __dirname + '/build/stylus/**'
  ];

  return gulp.src(src)
    .pipe($.zip('onsenui.zip'))
    .pipe(gulp.dest(__dirname + '/build'));
});

////////////////////////////////////////
// build
////////////////////////////////////////
gulp.task('build', function(done) {
  return runSequence(
    'clean',
    'prepare',
    'minify-js',
    'build-docs',
    'prepare-css-components',
    'compress-distribution-package',
    done
  );
});

////////////////////////////////////////
// dist
////////////////////////////////////////
gulp.task('dist', ['build'], function() {
  gulp.src([
    'build/**/*',
    '!build/docs/**/*',
    '!build/docs/',
    '!build/js/angular/**/*',
    '!build/js/angular/',
    'bower.json',
    'package.json',
    '.npmignore',
    'README.md',
    'CHANGELOG.md',
    'LICENSE'
  ])
  .pipe(gulp.dest('dist/'));
});

////////////////////////////////////////
// default
////////////////////////////////////////
gulp.task('default', function() {
  return runSequence('prepare');
});

////////////////////////////////////////
// serve
////////////////////////////////////////
gulp.task('serve', ['jshint', 'prepare', 'browser-sync'], function() {
  gulp.watch(['framework/templates/*.tpl'], ['html2js']);

  var watched = [
    'core/*.{js,es6}',
    'core/*/*.{js,es6}',
    '!core/*/*.spec.js',
    'framework/*/*',
    'css-components/components-src/dist/*.css'
  ];

  if (CORDOVA_APP) {
    watched.push('cordova-app/www/*.html');
  }

  gulp.watch(watched, {
    debounceDelay: 2000
  }, ['prepare', 'jshint']);

  // for livereload
  gulp.watch([
    'app/*.{js,css,html}',
    'app/*/*.{js,css,html}',
    'demo/*/*.{js,css,html}',
    'test/e2e/*/*.{js,css,html}'
  ]).on('change', function(changedFile) {
    gulp.src(changedFile.path)
      .pipe(browserSync.reload({stream: true, once: true}));
  });
});

////////////////////////////////////////
// build-doc-ja
////////////////////////////////////////
gulp.task('build-doc-ja', function(done) {
  njglobals.rootUrl = '/';
  njglobals.lang = 'ja';

  new dgeni([require('./docs/package')]).generate().then(function() {
    done();
  });
});

////////////////////////////////////////
// build-doc-en
////////////////////////////////////////
gulp.task('build-doc-en', function(done) {
  njglobals.rootUrl = '/';
  njglobals.lang = 'en';

  new dgeni([require('./docs/package')]).generate().then(function() {
    done();
  });
})

////////////////////////////////////////
// build-docs
////////////////////////////////////////
gulp.task('build-docs', function(done) {
  runSequence('build-doc-ja', 'build-doc-en', done);
});

////////////////////////////////////////
// watch-docs
////////////////////////////////////////
gulp.task('watch-docs', ['build-docs'], function(done) {
  gulp.watch([
    './docs/**/*',
    './framework/directives/*.js',
    './framework/js/*.js',
  ], ['build-docs']);
});

////////////////////////////////////////
// webdriver-update
////////////////////////////////////////
gulp.task('webdriver-update', $.protractor.webdriver_update);

////////////////////////////////////////
// webdriver-download
////////////////////////////////////////
gulp.task('webdriver-download', function() {
  var chromeDriverUrl,
    platform = os.platform();

  var destDir = __dirname + '/.selenium/';

  // Only download once.
  if (fs.existsSync(destDir + '/chromedriver') || fs.existsSync(destDir + '/chromedriver.exe')) {
    return gulp.src('');
  }

  if (platform === 'linux') {
    chromeDriverUrl = 'http://chromedriver.storage.googleapis.com/2.12/chromedriver_linux64.zip'; 
  }
  else if (platform === 'darwin') {
    chromeDriverUrl = 'http://chromedriver.storage.googleapis.com/2.14/chromedriver_mac32.zip';
  }
  else {
    chromeDriverUrl = 'http://chromedriver.storage.googleapis.com/2.14/chromedriver_win32.zip';
  }

  var selenium = $.download('https://selenium-release.storage.googleapis.com/2.45/selenium-server-standalone-2.45.0.jar')
    .pipe(gulp.dest(destDir));

  var chromedriver = $.download(chromeDriverUrl)
    .pipe($.unzip())
    .pipe($.chmod(755))
    .pipe(gulp.dest(destDir));

  return merge(selenium, chromedriver);
});


////////////////////////////////////////
// test
////////////////////////////////////////
gulp.task('test', ['core-test', 'e2e-test']);

////////////////////////////////////////
// e2e-test
////////////////////////////////////////
gulp.task('e2e-test', ['webdriver-download', 'prepare'], function() {
  var port = 8081;

  $.connect.server({
    root: __dirname,
    port: port
  });

  var conf = {
    configFile: 'protractor.conf.js',
    args: [
      '--baseUrl', 'http://127.0.0.1:' + port,
      '--seleniumServerJar', __dirname + '/.selenium/selenium-server-standalone-2.45.0.jar',
      '--chromeDriver', __dirname + '/.selenium/chromedriver'
    ]
  };

  var specs = argv.specs ?
    argv.specs.split(',').map(function(s) { return s.trim(); }) :
    ['test/e2e/**/*.js'];

  return gulp.src(specs)
    .pipe($.protractor.protractor(conf))
    .on('error', function(e) {
      console.log(e)
      $.connect.serverClose();
    })
    .on('end', function() {
      $.connect.serverClose();
    });
});
