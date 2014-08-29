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
var pkg = require('./package.json');
var merge = require('event-stream').merge;
var runSequence = require('run-sequence');
var dateformat = require('dateformat');
var browserSync = require('browser-sync');
var gulpIf = require('gulp-if');
var dgeni = require('dgeni');
var njglobals = require('dgeni-packages/node_modules/nunjucks/src/globals');

////////////////////////////////////////
// browser-sync
////////////////////////////////////////
gulp.task('browser-sync', function() {
  browserSync.init(null, {
    server: {
      baseDir: __dirname + '/',
      directory: true
    },
    ghostMode: false,
    debounce: 200,
    notify: false
  });
});

////////////////////////////////////////
// html2js
////////////////////////////////////////
gulp.task('html2js', function() {
  return gulp.src('framework/templates/*.tpl')
    .pipe($.html2js({base: __dirname + '/framework', outputModuleName: 'templates-main', useStrict: true}))
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest('framework/directives/'));
});

////////////////////////////////////////
// jshint
////////////////////////////////////////
gulp.task('jshint', function() {
  gulp.src([
    'framework/js/*.js',
    'framework/directives/*.js',
    'framework/services/*.js',
    'framework/views/*.js'
  ])
    .pipe($.cached('js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

////////////////////////////////////////
// clean
////////////////////////////////////////
gulp.task('clean', function() {
  return gulp.src([
    '.tmp',
    'build',
    'app/lib/onsen/',
    'project_templates/gen/',
  ], {read: false}).pipe($.clean());
});

////////////////////////////////////////
// minify
////////////////////////////////////////
gulp.task('minify-js', function() {
  return merge(
    gulp.src('build/js/onsenui.js')
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
      .pipe(gulp.dest('app/lib/onsen/js')),
    gulp.src('build/js/onsenui_all.js')
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
  return merge(

    // onsenui.js
    gulp.src([
      'framework/lib/*.js',
      'framework/directives/templates.js',
      'framework/js/doorlock.js',
      'framework/js/onsen.js',
      'framework/views/*.js',
      'framework/directives/*.js',
      'framework/services/*.js',
      'framework/js/*.js'
    ])
      .pipe($.plumber())
      .pipe($.ngAnnotate({add: true, single_quotes: true}))
      .pipe($.concat('onsenui.js'))            
      .pipe($.header('/*! <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
      .pipe(gulp.dest('build/js/'))
      .pipe(gulpIf(CORDOVA_APP, gulp.dest('cordova-app/www/lib/onsen/js')))
      .pipe(gulp.dest('app/lib/onsen/js')),

    // onsenui_all.js
    gulp.src([
      'framework/lib/angular/angular.js',
      'framework/lib/*.js',
      'framework/directives/templates.js',
      'framework/js/doorlock.js',
      'framework/js/onsen.js',
      'framework/views/*.js',
      'framework/directives/*.js',
      'framework/services/*.js',
      'framework/js/*.js'
    ])
      .pipe($.plumber())
      .pipe($.ngAnnotate({add: true, single_quotes: true}))
      .pipe($.concat('onsenui_all.js'))
      .pipe($.header('/*! <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
      .pipe(gulp.dest('build/js/'))
      .pipe(gulp.dest('app/lib/onsen/js')),


    // onsen-css-components.css
    gulp.src([
      'css-components/components-src/dist/onsen-css-components-default.css',
    ])
      .pipe($.rename({basename: 'onsen-css-components'}))
      .pipe(gulp.dest('build/css/'))
      .pipe(gulpIf(CORDOVA_APP, gulp.dest('cordova-app/www/lib/onsen/css')))
      .pipe(gulp.dest('app/lib/onsen/css')),

    // stylus files
    gulp.src([
      'css-components/components-src/stylus/**/*',
      '!css-components/components-src/stylus/custom.styl',
      '!css-components/components-src/stylus/custom-*.styl',
    ])
      .pipe(gulp.dest('app/lib/onsen/stylus'))
      .pipe(gulp.dest('build/stylus/')),


    // onsenui.css
    gulp.src([
      'framework/css/common.css',
      'framework/css/*.css'
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
    gulp.src('framework/css/font_awesome/**/*')
      .pipe(gulp.dest('build/css/font_awesome/'))
      .pipe(gulp.dest('app/lib/onsen/css/font_awesome/')),

    // ionicons file copy
    gulp.src('framework/css/ionicons/**/*')
      .pipe(gulp.dest('build/css/ionicons/'))
      .pipe(gulp.dest('app/lib/onsen/css/ionicons/')),

    // auto prepare
    gulp.src('cordova-app/www/index.html')
      .pipe(gulpIf(CORDOVA_APP, $.shell(['cd cordova-app; cordova prepare'])))
  );

});

////////////////////////////////////////
// prepare-project-templates
////////////////////////////////////////
gulp.task('prepare-project-templates', function(done) {
  var names = [
    'master_detail',
    'sliding_menu',
    'tab_bar',
    'split_view'
  ];

  gulp.src(['build/**', '!build/docs', '!build/docs/**'])
    .pipe(gulp.dest('app/lib/onsen'))
    .pipe(gulp.dest('project_templates/base/www/lib/onsen/'))
    .on('end', function() {
      gulp.src(['project_templates/base/**/*', '!project_templates/base/node_modules/**/*'], {dot: true})
        .pipe(gulp.dest('project_templates/gen/master_detail'))
        .pipe(gulp.dest('project_templates/gen/sliding_menu'))
        .pipe(gulp.dest('project_templates/gen/tab_bar'))
        .pipe(gulp.dest('project_templates/gen/split_view'))
        .on('end', function() {
          gulp.src(['project_templates/templates/**/*'])
            .pipe(gulp.dest('project_templates/gen/'))
            .on('end', done);
        });

    });
});

////////////////////////////////////////
// compress
////////////////////////////////////////
gulp.task('compress-project-templates', function() {
  var names = [
    'master_detail',
    'sliding_menu',
    'tab_bar',
    'split_view'
  ];

  var streams = names.map(function(name) {
    var src = [
      __dirname + '/project_templates/gen/' + name + '/**/*',
      '!.DS_Store',
      '!node_modules'
    ];

    var stream = gulp.src(src, {cwd : __dirname + '/project_templates', dot: true})
      .pipe($.zip('onsen_' + name + '.zip'))
      .pipe(gulp.dest(__dirname + '/project_templates'));

    return stream;
  });

  return merge.apply(null, streams);
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
    'prepare-project-templates',
    'compress-project-templates',
    done
  );
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
    'framework/*/*',
    'css-components/components-src/dist/onsen-css-components-default.css'
  ];

  if (CORDOVA_APP) {
    watched.push('cordova-app/www/*.html');
  }

  gulp.watch(watched, {
    debounceDelay: 400
  }, ['prepare', 'jshint']);

  // for livereload
  gulp.watch([
    'app/**/*.{js,css,html}'
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
  dgeni.generator('docs/dgeni.conf.js')().then(done);
});

////////////////////////////////////////
// build-doc-en
////////////////////////////////////////
gulp.task('build-doc-en', function(done) {
  njglobals.rootUrl = '/';
  njglobals.lang = 'en';
  dgeni.generator('docs/dgeni.conf.js')().then(done);
})

////////////////////////////////////////
// build-docs
////////////////////////////////////////
gulp.task('build-docs', function(done) {
  runSequence('build-doc-ja', 'build-doc-en', done);
});
