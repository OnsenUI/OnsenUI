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

var gulp = require('gulp');
var gutil = require('gulp-util');
var html2js = require('gulp-html2js');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var autoprefix = require('gulp-autoprefixer');
var zip = require('gulp-zip');
var header = require('gulp-header');
var merge = require('event-stream').merge;
var runSequence = require('run-sequence');
var dateformat = require("dateformat");
var pkg = require('./package.json');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var cssminify = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var cache = require('gulp-cached');

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
    debounce: 200
  });
});

////////////////////////////////////////
// html2js
////////////////////////////////////////
gulp.task('html2js', function() {
  return gulp.src('framework/templates/*.tpl')
    .pipe(html2js({base: __dirname + '/framework', outputModuleName: 'templates-main', useStrict: true}))
    .pipe(concat('templates.js'))
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
    .pipe(cache('js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

////////////////////////////////////////
// clean
////////////////////////////////////////
gulp.task('clean', function() {
  return gulp.src([
    '.tmp',
    'build',
    'app/lib/onsen/',
    'project_templates/minimum/app/lib/onsen/',
    'project_templates/sliding_menu/app/lib/onsen/',
    'project_templates/sliding_menu_navigator/app/lib/onsen/',
    'project_templates/tab_bar/app/lib/onsen/',
    'project_templates/split_view/app/lib/onsen/',
    'project_templates/split_view_navigator/app/lib/onsen/',
    'project_templates/master_detail/app/lib/onsen/'
  ], {read: false}).pipe(clean());
});

////////////////////////////////////////
// prepare
////////////////////////////////////////
gulp.task('prepare', ['html2js'], function() {
  return merge(

    // plugin info(monaca)
    gulp.src('plugin_info.json')
      .pipe(gulp.dest('build/')),

    // onsenui.js
    gulp.src([
      'framework/lib/*.js',
      'framework/directives/templates.js',
      'framework/directives/module.js',
      'framework/views/*.js',
      'framework/directives/*.js',
      'framework/services/*.js',
      'framework/js/*.js'
    ])
      .pipe(concat('onsenui.js'))            
      .pipe(header('/*! <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
      .pipe(gulp.dest('build/js/'))
      .pipe(gulp.dest('app/lib/onsen/js')),

    // onsenui_all.js
    gulp.src([
      'framework/lib/angular/angular.js',
      'framework/lib/*.js',
      'framework/directives/templates.js',
      'framework/directives/module.js',
      'framework/views/*.js',
      'framework/directives/*.js',
      'framework/services/*.js',
      'framework/js/*.js'
    ])
      .pipe(concat('onsenui_all.js'))
      .pipe(header('/*! <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
      .pipe(gulp.dest('build/js/'))
      .pipe(gulp.dest('app/lib/onsen/js')),

    // onsen-css-componets.css
    gulp.src([
      'css-components/components-src/dist/onsen-css-components-default.css',
    ])
      .pipe(rename({basename: 'onsen-css-components'}))
      .pipe(gulp.dest('build/css/'))
      .pipe(gulp.dest('app/lib/onsen/css')),

    // onsenui.css
    gulp.src([
      'framework/css/common.css',
      'framework/css/*.css'
    ])
      .pipe(concat('onsenui.css'))
      .pipe(autoprefix('> 1%', 'last 2 version', 'ff 12', 'ie 8', 'opera 12', 'chrome 12', 'safari 12', 'android 2', 'ios 6'))
      .pipe(header('/*! <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
      .pipe(gulp.dest('build/css/'))
      .pipe(gulp.dest('app/lib/onsen/css')),

    // angular.js copy
    gulp.src('framework/lib/angular/*.*')
      .pipe(gulp.dest('app/lib/onsen/js/angular/'))
      .pipe(gulp.dest('build/js/angular/')),

    // font-awesome css copy
    gulp.src('framework/css/font_awesome/*/*')
      .pipe(gulp.dest('build/css/font_awesome/'))
      .pipe(gulp.dest('app/lib/onsen/css')),

    // css polyfills
    gulp.src('framework/css/polyfill/*.css')
      .pipe(gulp.dest('build/css/polyfill/'))
      .pipe(gulp.dest('app/lib/onsen/css'))
  );

});

////////////////////////////////////////
// prepare-project-templates
////////////////////////////////////////
gulp.task('prepare-project-templates', function() {
  // projects template
  return gulp.src(['build/**', '!build/plugin_info.json'])
    .pipe(gulp.dest('app/lib/onsen'))
    .pipe(gulp.dest('project_templates/minimum/app/lib/onsen/'))
    .pipe(gulp.dest('project_templates/sliding_menu/app/lib/onsen/'))
    .pipe(gulp.dest('project_templates/sliding_menu_navigator/app/lib/onsen/'))
    .pipe(gulp.dest('project_templates/tab_bar/app/lib/onsen/'))
    .pipe(gulp.dest('project_templates/split_view/app/lib/onsen/'))
    .pipe(gulp.dest('project_templates/split_view_navigator/app/lib/onsen/'))
    .pipe(gulp.dest('project_templates/master_detail/app/lib/onsen/'));
});

////////////////////////////////////////
// compress
////////////////////////////////////////
gulp.task('compress-project-templates', function(done) {
  var names = [
    'minimum',
    'master_detail',
    'sliding_menu',
    'sliding_menu_navigator',
    'tab_bar',
    'split_view',
    'split_view_navigator'
  ];

  var streams = names.map(function(name) {
    // '**/*' cause error???
    var src = [
      name + '/*',
      name + '/*/*',
      name + '/*/*/*',
      name + '/*/*/*/*',
      name + '/*/*/*/*/*',
      name + '/*/*/*/*/*/*',
    ];
    var stream = gulp.src(src, {cwd : __dirname + '/project_templates'})
    .pipe(zip(name + '.zip'))
    .pipe(gulp.dest('./project_templates/'));

    if (name === 'minimum') {
      stream.on('end', function() {
      });
    }

    return stream;
  });

  merge.apply(null, streams).on('end', function() {
    return gulp.src(__dirname + '/project_templates/minimum.zip')
      .pipe(rename('onsen_ui.zip'))
      .pipe(gulp.dest('./project_templates/'))
      .on('end', done);
  });
});

////////////////////////////////////////
// build
////////////////////////////////////////
gulp.task('build', function() {
  return runSequence(
    'clean',
    'prepare',
    'prepare-project-templates',
    'compress-project-templates'
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

  gulp.watch([
    'framework/*/*',
    'css-components/components-src/dist/onsen-css-components-default.css'
  ], {
    debounceDelay: 400
  }, ['prepare', 'jshint']);

  // for livereload
  gulp.watch([
    'app/**/*.{js,css,html}',
    'project_templates/**/*.{js,css,html}'
  ]).on('change', function(changedFile) {
    gulp.src(changedFile.path)
      .pipe(browserSync.reload({stream: true, once: true}));
  });
});

