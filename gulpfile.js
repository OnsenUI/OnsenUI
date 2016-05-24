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
var path = require('path');
var $ = require('gulp-load-plugins')();
var gulpIf = require('gulp-if');
var pkg = require('./package.json');
var merge = require('event-stream').merge;
var runSequence = require('run-sequence');
var dateformat = require('dateformat');
var browserSync = require('browser-sync');
var os = require('os');
var fs = require('fs');
var argv = require('yargs').argv;
var npm  = require('rollup-plugin-npm');
var babel = require('rollup-plugin-babel');
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

var cssConfig = {
  prefixerScheme: ['> 1%', 'last 2 versions', 'Android >= 4.0', 'iOS >= 8'],
  writePath: 'build/css/',
  onsenFileName: 'onsenui',
  onsenComponentsFileName: 'onsen-css-components',
  bhComponentsFileName: 'bh-components'
};


////////////////////////////////////////
// browser-sync
////////////////////////////////////////
gulp.task('browser-sync', function() {
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
  });
});

////////////////////////////////////////
// core
////////////////////////////////////////
gulp.task('core', function() {
  return gulp.src(['core/src/setup.js'], {read: false})
    .pipe($.plumber(function(error) {
      $.util.log(error.message);
      this.emit('end');
    }))
    .pipe($.rollup({
      sourceMap: 'inline',
      plugins: [
        {
          resolveId: function(code, id) {
            if (id && code.charAt(0) !== '.') {
              var p = path.join(__dirname, 'core', 'src', code);

              if (fs.existsSync(p)) {
                p = path.join(p, 'index.js');
              }
              else {
                p = p + '.js';
              }

              return p;
            }
          }
        },
        npm(),
        babel({presets: ['es2015-rollup']})
      ],
      format: 'umd',
      moduleName: 'ons'
    }))
    .pipe($.addSrc.prepend('core/vendor/*.js'))
    .pipe($.sourcemaps.init())
    .pipe($.concat('bh.js'))
    // .pipe($.concat('onsenui.js'))
    .pipe($.header('/*! <%= pkg.name %> v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('build/js'))
    .on('end', function() {
      browserSync.reload();
    });
});

////////////////////////////////////////
// watch-core
////////////////////////////////////////
gulp.task('watch-core', ['prepare', 'core'], function() {
  return gulp.watch(['core/src/*.js', 'core/src/**/*.js'], ['core']);
});

////////////////////////////////////////
// core-test
////////////////////////////////////////
gulp.task('core-test', ['prepare', 'core'], function() {
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
  return gulp.src('bindings/angular1/templates/*.tpl')
    .pipe($.html2js('angular.js', {
      adapter: 'angular',
      base: path.join(__dirname, 'bindings/angular1'),
      name: 'templates-main',
      useStrict: true,
      quoteChar: '\''
    }))
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest('bindings/angular1/directives/'));
});

/////////////////////////////////////////
// eslint
////////////////////////////////////////
gulp.task('eslint', function() {
  return gulp.src(eslintTargets())
    .pipe($.cached('eslint'))
    .pipe($.eslint({useEslintrc: true}))
    .pipe($.remember('eslint'))
    .pipe($.eslint.format());
});

/////////////////////////////////////////
// watch-eslint
////////////////////////////////////////
gulp.task('watch-eslint', ['eslint'], function() {
  gulp.watch(eslintTargets(), ['eslint']);
});

function eslintTargets() {
  return [
    'gulpfile.js',
    'docs/packages/**/*.{js,es6}',
    'core/src/*.{js,es6}',
    'core/src/**/*.{js,es6}',
    'bindings/angular1/js/*.{js,es6}',
    'bindings/angular1/directives/*.{js,es6}',
    'bindings/angular1/services/*.{js,es6}',
    'bindings/angular1/elements/*.{js,es6}',
    'bindings/angular1/views/*.{js,es6}'
  ];
}

////////////////////////////////////////
// clean
////////////////////////////////////////
gulp.task('clean', function() {
  return gulp.src([
    '.tmp',
    'build',
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
      'bindings/angular1/vendor/*.js',
      'bindings/angular1/lib/*.js',
      'bindings/angular1/directives/templates.js',
      'bindings/angular1/js/onsen.js',
      'bindings/angular1/views/*.js',
      'bindings/angular1/directives/*.js',
      'bindings/angular1/services/*.js',
      'bindings/angular1/js/*.js'
    ])
      .pipe($.plumber())
      .pipe($.rollup({
        sourceMap: 'inline',
        plugins: [
          npm(),
          babel({presets: ['es2015-rollup']})
        ]
      }))
      .pipe($.ngAnnotate({
        add: true,
        single_quotes: true // eslint-disable-line camelcase
      }))
      .pipe($.sourcemaps.init())
      .pipe($.concat('angular-onsenui.js'))
      .pipe($.header('/*! angular-onsenui.js for <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('build/js/'))
      .pipe(gulpIf(CORDOVA_APP, gulp.dest('cordova-app/www/lib/onsen/js'))),

    // onsen-css-components
    gulp.src([
      'css-components/components-src/dist/*.css',
    ])
      .pipe(gulp.dest('build/css/'))
      .pipe(gulpIf(CORDOVA_APP, gulp.dest('cordova-app/www/lib/onsen/css'))),

    // stylus files
    gulp.src([
      'css-components/components-src/stylus-bh/**/*'
    ])
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
      .pipe(gulpIf(CORDOVA_APP, gulp.dest('cordova-app/www/lib/onsen/css'))),

    // angular.js copy
    gulp.src('bindings/angular1/lib/angular/*.*')
      .pipe(gulp.dest('build/js/angular/')),

    // font-awesome fle copy
    gulp.src('core/css/font_awesome/**/*')
      .pipe(gulp.dest('build/css/font_awesome/')),

    // ionicons file copy
    gulp.src('core/css/ionicons/**/*')
      .pipe(gulp.dest('build/css/ionicons/')),

    // material icons file copy
    gulp.src('core/css/material-design-iconic-font/**/*')
      .pipe(gulp.dest('build/css/material-design-iconic-font/')),

    // auto prepare
    gulp.src('cordova-app/www/index.html')
      .pipe(gulpIf(CORDOVA_APP, $.shell(['cd cordova-app; cordova prepare'])))
  );
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
    path.join(__dirname, 'build/**'),
    '!' + path.join(__dirname, 'build/docs/**'),
    '!' + path.join(__dirname, 'build/stylus/**')
  ];

  return gulp.src(src)
    .pipe($.zip('onsenui.zip'))
    .pipe(gulp.dest(path.join(__dirname, 'build')));
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
gulp.task('serve', ['watch-eslint', 'prepare', 'browser-sync', 'watch-core'], function() {
  gulp.watch(['bindings/angular1/templates/*.tpl'], ['html2js']);

  var watched = [
    'bindings/angular1/*/*',
    'core/css/*.css',
    'css-components/components-src/dist/*.css'
  ];

  if (CORDOVA_APP) {
    watched.push('cordova-app/www/*.html');
  }

  gulp.watch(watched, {
    debounceDelay: 300
  }, ['prepare']);

  // for livereload
  gulp.watch([
    'examples/*/*.{js,css,html}',
    'test/e2e/*/*.{js,css,html}'
  ]).on('change', function(changedFile) {
    gulp.src(changedFile.path)
      .pipe(browserSync.reload({stream: true, once: true}));
  });
});


////////////////////////////////////////
// build-docs
////////////////////////////////////////
gulp.task('build-docs', function() {
  return require('./docs/wcdoc')(path.join(__dirname, '/build/docs'));
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

  var destDir = path.join(__dirname, '.selenium');

  // Only download once.
  if (fs.existsSync(destDir + '/chromedriver') || fs.existsSync(destDir + '/chromedriver.exe')) {
    return gulp.src('');
  }

  if (platform === 'linux') {
    chromeDriverUrl = 'http://chromedriver.storage.googleapis.com/2.19/chromedriver_linux64.zip';
  }
  else if (platform === 'darwin') {
    chromeDriverUrl = 'http://chromedriver.storage.googleapis.com/2.21/chromedriver_mac32.zip';
  }
  else {
    chromeDriverUrl = 'http://chromedriver.storage.googleapis.com/2.14/chromedriver_win32.zip';
  }

  var selenium = $.download('https://selenium-release.storage.googleapis.com/2.51/selenium-server-standalone-2.51.0.jar')
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
    configFile: './test/e2e/protractor.conf.js',
    args: [
      '--baseUrl', 'http://127.0.0.1:' + port,
      '--seleniumServerJar', path.join(__dirname, '.selenium/selenium-server-standalone-2.51.0.jar'),
      '--chromeDriver', path.join(__dirname, '.selenium/chromedriver')
    ]
  };

  var specs = argv.specs ?
    argv.specs.split(',').map(function(s) { return s.trim(); }) :
    ['test/e2e/**/*js'];

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


////////////////////////////////////////
// develop
//开发模式
////////////////////////////////////////
gulp.task('develop', ['watch-eslint','watch-develop-js', 'watch-develop-style', 'browser-sync'], function() {
  // for livereload
  //监听文件变化,刷新浏览器
  gulp.watch([
    'examples/**/*.{js,css,html}',
    'test/e2e/**/*.{js,css,html}',
    'build/css/bh.css',
    'build/js/bh.js'
  ]).on('change', function(changedFile) {
    gulp.src(changedFile.path)
        .pipe(browserSync.reload({stream: true, once: true}));
  });
});

gulp.task('watch-develop-js', ['core'], function() {
  //监听js文件,并编译
  return gulp.watch(['core/src/*.js', 'core/src/**/*.js'], ['core']);
});

gulp.task('watch-develop-style', ['style'], function() {
  //监听样式文件并编译
  return gulp.watch(
      [
        'css-components/components-src/stylus-bh/**/*.styl',
        'css-components/components-src/bh/**/*.scss',
        'core/style/**/*.scss',
        'core/style/**/*.styl'
      ],
      ['style']);
});

//复制字体文件
gulp.task('copy-icon', function() {
  return merge(
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

//编译样式
gulp.task('style', ['onsen-common-style', 'onsen-components-style', 'bh-components-style'], function() {
  return gulp.src([
    cssConfig.writePath+cssConfig.onsenFileName+'.css',
    cssConfig.writePath+cssConfig.onsenComponentsFileName+'.css',
    cssConfig.writePath+cssConfig.bhComponentsFileName+'.css'
  ])
      .pipe($.concat('bh.css'))
      .pipe(autoprefixer({
        browsers: cssConfig.prefixerScheme
      }))
      .pipe(gulp.dest(cssConfig.writePath))
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifyCSS())
      .pipe(gulp.dest(cssConfig.writePath));
});

////////////////////////////////////////
// 编译onsenui基础样式
////////////////////////////////////////
gulp.task('onsen-common-style', function () {
  return gulp.src([
    './core/style/skins/default/*.scss',
    './core/style/variable/*.scss',
    './core/style/utils/*.scss',
    './core/style/mixins/*.scss',
    './core/style/ons/common.scss',
    './core/style/ons/*.scss'
  ])
      .pipe($.concat(cssConfig.onsenFileName+'.scss'))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(cssConfig.writePath))
});

////////////////////////////////////////
// 编译onsenui组件样式
////////////////////////////////////////
gulp.task('onsen-components-style', function () {
  return gulp.src([
    './core/style/skins/default/*.styl',
    './core/style/variable/*.styl',
    './core/style/utils/*.styl',
    './css-components/components-src/stylus-bh/bh-default-theme.styl',
    './css-components/components-src/stylus-bh/components/util.styl',
    './css-components/components-src/stylus-bh/components/global.styl',
    './css-components/components-src/stylus-bh/components/*.styl'
  ])
      .pipe(concat(cssConfig.onsenComponentsFileName+ '.styl'))
      .pipe(stylus({error: true}))
      .pipe(gulp.dest(cssConfig.writePath))
});

////////////////////////////////////////
// 编译bh组件样式
////////////////////////////////////////
gulp.task('bh-components-style', function() {
  return gulp.src([
    './core/style/skins/default/*.scss',
    './core/style/variable/*.scss',
    './core/style/utils/*.scss',
    './core/style/mixins/*.scss',
    './core/style/*.scss',
    './css-components/components-src/bh/**/*.scss'
  ])
      .pipe(concat(cssConfig.bhComponentsFileName+'.scss'))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(cssConfig.writePath))
});
