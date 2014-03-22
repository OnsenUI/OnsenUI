var gulp = require('gulp');
var html2js = require('gulp-html2js');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var autoprefix = require('gulp-autoprefixer');
var zip = require('gulp-zip');
var header = require('gulp-header');
var eventstream = require('event-stream');
var runSequence = require('gulp-run-sequence');
var pkg = require('./package.json');

////////////////////////////////////////
// html2js
////////////////////////////////////////
gulp.task('html2js', function() {
    return gulp.src('framework/templates/*.tpl')
        .pipe(html2js())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('framework/directives/'));
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
    return eventstream.concat(

        // plugin info(monaca)
        gulp.src('plugin_info.json')
            .pipe(gulp.dest('build/')),

        // onsenui.js
        gulp.src([
            'framework/directives/templates.js',
            'framework/directives/module.js',
            'framework/directives/*.js',
            'framework/services/module.js',
            'framework/services/*.js',
            'framework/lib/*.js',
            'framework/js/*.js'
        ])
            .pipe(concat('onsenui.js'))
            .pipe(header('/*! <%= pkg.name %> - v<%= pkg.version %> - yyyy-mm-dd */\n', {pkg: pkg}))
            .pipe(gulp.dest('build/js/')),

        // onsenui_all.js
        gulp.src([
            'framework/lib/angular/angular.js',
            'framework/directives/templates.js',
            'framework/directives/module.js',
            'framework/directives/*.js',
            'framework/services/module.js',
            'framework/services/*.js',
            'framework/lib/*.js',
            'framework/js/*.js'
        ])
            .pipe(concat('onsenui_all.js'))
            .pipe(header('/*! <%= pkg.name %> - v<%= pkg.version %> - yyyy-mm-dd */\n', {pkg: pkg}))
            .pipe(gulp.dest('build/js/')),

        // onsenui.css
        gulp.src([
            'framework/css/common.css',
            'framework/css/*.css'
        ])
            .pipe(concat('onsenui.css'))
            .pipe(autoprefix('> 1%', 'last 2 version', 'ff 12', 'ie 8', 'opera 12', 'chrome 12', 'safari 12', 'android 2', 'ios 6'))
            .pipe(header('/*! <%= pkg.name %> - v<%= pkg.version %> - yyyy-mm-dd */\n', {pkg: pkg}))
            .pipe(gulp.dest('build/css/')),

        // angular.js copy
        gulp.src('framework/lib/angular/*.*')
            .pipe(gulp.dest('build/js/angular/')),

        // images copy
        gulp.src('framework/img/*.*')
            .pipe(gulp.dest('build/img/')),

        // theme css copy
        gulp.src('themes/css/*.css')
            .pipe(gulp.dest('build/css/')),

        // font-awesome css copy
        gulp.src('framework/css/font_awesome/*/*')
            .pipe(gulp.dest('build/css/font_awesome/')),

        // css polyfills
        gulp.src('framework/css/polyfill/*.css')
            .pipe(gulp.dest('build/css/polyfill/'))
    );

});

////////////////////////////////////////
// copy
////////////////////////////////////////
gulp.task('copy', ['prepare'], function() {
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
gulp.task('compress', ['copy'], function() {
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
        var stream = gulp.src('project_templates/' + name + '/**')
            .pipe(zip(name + '.zip'));

        if (name == 'minimum') {
            stream = stream.pipe(zip('onsen_ui.zip'));
        }

        return stream.pipe(gulp.dest('project_templates/'));
    });

    return eventstream.concat.apply(eventstream, streams);
});

////////////////////////////////////////
// build
////////////////////////////////////////
gulp.task('build', function() {
    return runSequence('clean', 'copy');
});

////////////////////////////////////////
// default
////////////////////////////////////////
gulp.task('default', ['copy']);

////////////////////////////////////////
// serve
////////////////////////////////////////
gulp.task('serve', function() {
    gulp.watch('framework/**', {debounceDelay: 800}, ['copy']);
});
