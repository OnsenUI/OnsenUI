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
var connect = require('gulp-connect');
var rename = require('gulp-rename');

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
            'framework/directives/templates.js',
            'framework/directives/module.js',
            'framework/directives/*.js',
            'framework/services/module.js',
            'framework/services/*.js',
            'framework/lib/*.js',
            'framework/js/*.js'
        ])
            .pipe(concat('onsenui.js'))
            .pipe(header('/*! <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
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
            .pipe(header('/*! <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
            .pipe(gulp.dest('build/js/')),

        // onsenui.css
        gulp.src([
            'framework/css/common.css',
            'framework/css/*.css'
        ])
            .pipe(concat('onsenui.css'))
            .pipe(autoprefix('> 1%', 'last 2 version', 'ff 12', 'ie 8', 'opera 12', 'chrome 12', 'safari 12', 'android 2', 'ios 6'))
            .pipe(header('/*! <%= pkg.name %> - v<%= pkg.version %> - ' + dateformat(new Date(), 'yyyy-mm-dd') + ' */\n', {pkg: pkg}))
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
    return runSequence('clean', 'prepare', 'prepare-project-templates', 'compress-project-templates');
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
gulp.task('serve', ['prepare', 'connect'], function() {
    gulp.watch(['framework/templates/*.tpl'], ['html2js']);

    gulp.watch([
        'framework/*/*',
        'demo/*/*',
        'demo/*',
        'test/manual-testcases/*',
        'test/manual-testcases/*/*'
    ], ['prepare']).on('change', function(changedFile) {
        gulp.src([
            changedFile.path
        ]).pipe(connect.reload());
    });
});

////////////////////////////////////////
// connect
////////////////////////////////////////
gulp.task('connect', connect.server({
    root: [__dirname + '/'],
    port: 8000,
    livereload: true
}));
