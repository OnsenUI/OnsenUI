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
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

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
  return bundleBrowserify(createBrowserify());
});

function createBrowserify(options) {
  options = options || {};

  var b = browserify({
    entries: ['./core/src/index.es6'],
    debug: true,
    extensions: ['.js', '.es6'],
    cache: {},
    packageCache: {},
  });

  if (options.watch) {
    b = b.plugin(watchify);
  }

  return b
    .transform('babelify', {
      extensions: ['.es6'],
      presets: ['es2015']
    })
    .transform('concatenify');
}

function bundleBrowserify(browserify) {
  return browserify
    .bundle()
    .on('error', function(error) {
      $.util.log($.util.colors.red(error.toString()));
    })
    .pipe(source('onsenui.js'))
    .pipe($.plumber())
    .pipe($.header('/*! <%= pkg.name %> v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
    .pipe(gulp.dest('build/js/'));
}


////////////////////////////////////////
// watch-core
////////////////////////////////////////
gulp.task('watch-core', function() {
  var b = createBrowserify({watch: true});

  b.on('update', function(event) {
    $.util.log('Changed ' + $.util.colors.magenta(JSON.stringify(event)));
    bundleBrowserify(b).on('end', function() {
      $.util.log('Finished browserify rebundle');
      browserSync.reload();
    });
  });

  return bundleBrowserify(b);
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
      $.util.log($.util.colors.red(err.message));
      throw err;
    });
});

////////////////////////////////////////
// watch-core-test
////////////////////////////////////////
gulp.task('watch-core-test', ['watch-core'], function() {
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
    .pipe($.cached('jshint-vanilla'))
    .pipe($.jshint())
    .pipe($.remember('jshint-vanilla'))
    .pipe($.jshint.reporter('jshint-stylish'));
});

/////////////////////////////////////////
// eslint
////////////////////////////////////////
gulp.task('eslint', function() {
  return gulp.src([
    'core/src/**/*.es6',
    'framework/*/*.es6',
    'framework/directives/*.es6',
    'framework/services/*.es6',
    'framework/elements/*.es6',
    'framework/views/*.es6'
  ])
    .pipe($.cached('eslint'))
    .pipe($.eslint({useEslintrc: true}))
    .pipe($.remember('eslint'))
    .pipe($.eslint.format());
});

/////////////////////////////////////////
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
    gulp.src('build/js/{onsenui,angular-onsenui}.js')
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
gulp.task('prepare', ['html2js'], function() {

  var onlyES6;

  return merge(

    // angular-onsenui.js
    gulp.src([
      'framework/vendor/*.js',
      'framework/lib/*.{es6,js}',
      'framework/directives/templates.js',
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
      .pipe($.concat('angular-onsenui.js'))
      .pipe($.header('/*! angular-onsenui.js for <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
      .pipe(gulp.dest('build/js/'))
      .pipe(gulpIf(CORDOVA_APP, gulp.dest('cordova-app/www/lib/onsen/js')))
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

    // material icons file copy
    gulp.src('core/css/material-design-iconic-font/**/*')
      .pipe(gulp.dest('build/css/material-design-iconic-font/'))
      .pipe(gulp.dest('app/lib/onsen/css/material-design-iconic-font/')),

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
    'core',
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

gulp.task('soft-build', function(done) {
  return runSequence(
    'clean',
    'core',
    'prepare',
    'minify-js',
    done
  );
});

function distFiles() {
  gulp.src([
    'build/**/*',
    '!build/docs/**/*',
    '!build/docs/',
    '!build/js/angular/**/*',
    '!build/js/angular/',
    '!build/onsenui.zip',
    'bower.json',
    'package.json',
    '.npmignore',
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
gulp.task('serve', ['jshint', 'prepare', 'browser-sync', 'watch-core'], function() {
  gulp.watch(['framework/templates/*.tpl'], ['html2js']);

  var watched = [
    'framework/*/*',
    'core/css/*.css',
    'css-components/components-src/dist/*.css'
  ];

  if (CORDOVA_APP) {
    watched.push('cordova-app/www/*.html');
  }

  gulp.watch(watched, {
    debounceDelay: 300
  }, ['jshint', 'prepare']);

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
gulp.task('test', function(done) {
  return runSequence('core-test', 'e2e-test', done);
});

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
