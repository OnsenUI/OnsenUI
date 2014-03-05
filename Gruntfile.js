'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
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
          ]
        }]
      }
    },
    html2js: {
      options: {
        base: 'framework'
        // custom options, see below    
      },
      main: {
        src: ['framework/templates/*.tpl'],
        dest: 'framework/directives/templates.js'
      },
    },
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        src: [
          'framework/directives/templates.js',
          'framework/directives/module.js',
          'framework/directives/*.js',
          'framework/lib/*.js',
          'framework/js/*.js'
        ],
        dest: 'build/js/<%= pkg.name %>.js'
      },
      js_all: {
        src: [
          'framework/lib/angular/angular.js',
          'framework/lib/angular/angular-touch.js',
          'framework/directives/templates.js',
          'framework/directives/templates.js',
          'framework/directives/module.js',
          'framework/directives/*.js',
          'framework/lib/*.js',
          'framework/js/*.js'
        ],
        dest: 'build/js/<%= pkg.name %>_all.js'
      },
      css: {
        src: [
          'framework/css/common.css',
          'framework/css/*.css'
        ],
        dest: 'build/css/<%= pkg.name %>.css'
      }
    },
    autoprefixer: {
      dist: {
        options: {

          // * Add target browsers here
          // * https://github.com/ai/autoprefixer#browsers
          // * 
          browsers: ['> 1%', 'last 2 version', 'ff 12', 'ie 8', 'opera 12', 'chrome 12', 'safari 12', 'android 2', 'ios 6']

        },
        files: [{
          src: 'build/css/<%= pkg.name %>.css',
          dest: 'build/css/<%= pkg.name %>.css'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      build: {
        files: [
          // angularjs
          {
            expand: true,
            cwd: 'framework/lib/angular',
            dest: 'build/js/angular',
            src: [
              '*.*'
            ]
          },
          // themes css
          {
            expand: true,
            cwd: 'themes/css',
            dest: 'build/css/',
            src: [
              '*.css'
            ]
          }, {
            expand: true,
            cwd: 'framework/img',
            dest: 'build/img/',
            src: [
              '*.*'
            ]
          },

          // font_awesome
          {
            expand: true,
            cwd: 'framework/css/font_awesome',
            dest: 'build/css/font_awesome',
            src: [
              '*/*'
            ]
          },
          // css polyfills 
          {
            expand: true,
            cwd: 'framework/css/polyfill',
            dest: 'build/css/polyfill/',
            src: [
              '*.css'
            ]
          }
        ]
      },
      app: {
        files: [{
          expand: true,
          cwd: 'build/',
          dest: 'app/lib/onsen/',
          src: [
            '**'
          ]
        }]
      },
      minimum_template: {
        files: [{
          expand: true,
          cwd: 'build',
          dest: 'project_templates/minimum/app/lib/onsen/',
          src: [
            '**'
          ]
        }]
      },
      sliding_menu_template: {
        files: [{
          expand: true,
          cwd: 'build',
          dest: 'project_templates/sliding_menu/app/lib/onsen/',
          src: [
            '**'
          ]
        }]
      },
      sliding_menu_navigator_template: {
        files: [{
          expand: true,
          cwd: 'build',
          dest: 'project_templates/sliding_menu_navigator/app/lib/onsen/',
          src: [
            '**'
          ]
        }]
      },
      tab_bar_template: {
        files: [{
          expand: true,
          cwd: 'build',
          dest: 'project_templates/tab_bar/app/lib/onsen/',
          src: [
            '**'
          ]
        }]
      },
      split_view_template: {
        files: [{
          expand: true,
          cwd: 'build',
          dest: 'project_templates/split_view/app/lib/onsen/',
          src: [
            '**'
          ]
        }]
      },
      split_view_navigator_template: {
        files: [{
          expand: true,
          cwd: 'build',
          dest: 'project_templates/split_view_navigator/app/lib/onsen/',
          src: [
            '**'
          ]
        }]
      },
      master_detail_template: {
        files: [{
          expand: true,
          cwd: 'build',
          dest: 'project_templates/master_detail/app/lib/onsen/',
          src: [
            '**'
          ]
        }]
      },
      plugin_info: {
        files: [{
          expand: true,
          dest: 'build/',
          src: 'plugin_info.json'
        }]
      }
    },
    compress: {
      master_detail: {
        options: {
          archive: 'project_templates/master_detail.zip'
        },
        files: [{
          expand: true,
          cwd: 'project_templates/master_detail/',
          src: ['**']
        }]
      },
      minimum: {
        options: {
          archive: 'project_templates/minimum.zip'
        },
        files: [{
          expand: true,
          cwd: 'project_templates/minimum/',
          src: ['**']
        }]
      },
      sliding_menu: {
        options: {
          archive: 'project_templates/sliding_menu.zip'
        },
        files: [{
          expand: true,
          cwd: 'project_templates/sliding_menu/',
          src: ['**']
        }]
      },
      onsen_ui: {
        options: {
          archive: 'project_templates/onsen_ui.zip'
        },
        files: [{
          expand: true,
          cwd: 'project_templates/sliding_menu/',
          src: ['**']
        }]
      },
      sliding_menu_navigator: {
        options: {
          archive: 'project_templates/sliding_menu_navigator.zip'
        },
        files: [{
          expand: true,
          cwd: 'project_templates/sliding_menu_navigator/',
          src: ['**']
        }]
      },
      tab_bar: {
        options: {
          archive: 'project_templates/tab_bar.zip'
        },
        files: [{
          expand: true,
          cwd: 'project_templates/tab_bar/',
          src: ['**']
        }]
      },
      split_view: {
        options: {
          archive: 'project_templates/split_view.zip'
        },
        files: [{
          expand: true,
          cwd: 'project_templates/split_view/',
          src: ['**']
        }]
      },
      split_view_navigator: {
        options: {
          archive: 'project_templates/split_view_navigator.zip'
        },
        files: [{
          expand: true,
          cwd: 'project_templates/split_view_navigator/',
          src: ['**']
        }]
      }
    },
    watch: {
      app: {
        files: [
          'app/*',
          'app/**/*'
        ],
        tasks: [],
        options: {
          livereload: true
        },
      },
      demos: {
        files: [
          'demo/*',
          'demo/**/*'
        ],
        tasks: [],
        options: {
          livereload: true
        },
      },
      scripts: {
        files: [
          'framework/directives/*.js',
          'framework/js/*.js',
          'framework/lib/*.js',
          'framework/css/*.css',
          'framework/css/polyfill/*.css',
          'themes/css/*.css',
          'framework/templates/*.tpl',
        ],
        tasks: ['default'],
        options: {
          livereload: true
        },
      },
    },
    connect: {
      options: {
        port: 8000,
        hostname: 'localhost',
        livereload: true,
        base: '.'
      },
      livereload: {
        options: {
          port: 9000
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('serve:app', ['connect', 'watch:app']);

  // Default task(s).
  grunt.registerTask('default', [
    'clean', 'html2js', 'concat', 'autoprefixer', 'copy:build', 'copy:app', 'copy:demo', 
    'copy:minimum_template', 'copy:sliding_menu_template', 
    'copy:sliding_menu_navigator_template', 'copy:tab_bar_template', 
    'copy:split_view_template', 'copy:split_view_navigator_template', 
    'copy:master_detail_template', 'copy:plugin_info'
  ]);

};
