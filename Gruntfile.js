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
            'build/dev',
            'demo/lib/onsen/',
            'app/lib/onsen/'
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
          'framework/lib/angular/angular.js',
          'framework/directives/templates.js',
          'framework/directives/module.js',
          'framework/directives/*.js',
          'framework/lib/*.js',
          'framework/js/*.js'
        ],
        dest: 'build/dev/<%= pkg.name %>.js'
      },
      css: {
        src: [
          'framework/css/common.css',
          'framework/css/*.css'
        ],
        dest: 'build/dev/css/<%= pkg.name %>.css'
      }
    },
    // Put files not handled in other tasks here
    copy: {
      build: {
        files: [
          // topcoat css
          {
            expand: true,
            cwd: 'framework/css/topcoat/css',
            dest: 'build/dev/css/',
            src: [
              '*.css'
            ]
          }, {
            expand: true,
            cwd: 'framework/img',
            dest: 'build/dev/img/',
            src: [
              '*.*'
            ]
          },
          // fonts
           {
            expand: true,
            cwd: 'framework/css/topcoat/font/',
            dest: 'build/dev/font/',
            src: [
              '*.otf'
            ]
          },

          // font_awesome
          {
            expand: true,
            cwd: 'framework/css/font_awesome',
            dest: 'build/dev/css/font_awesome',
            src: [
              '*/*'
            ]
          },
          // css polyfills 
          {
            expand: true,
            cwd: 'framework/css/polyfill',
            dest: 'build/dev/css/polyfill/',
            src: [
              '*.css'
            ]
          },
          // directive templates
          // {
          //   expand: true,
          //   cwd: 'framework/templates/',
          //   dest: 'build/dev/templates/',
          //   src: [
          //     '*.*'
          //   ]
          // },
          // plugin_info.json
          {
            expand: false,
            dest: 'build/plugin_info.json',
            src: [
              'plugin_info.json'
            ]
          }
        ]
      },
      demo: {
        files: [{
          expand: true,
          cwd: 'build/dev/',
          dest: 'demo/lib/onsen/',
          src: [
            '**'
          ]
        }]
      },
      app: {
        files: [{
          expand: true,
          cwd: 'build/dev',
          dest: 'app/lib/onsen/',
          src: [
            '**'
          ]
        }]
      },
      minimum_template: {
        files: [{
          expand: true,
          cwd: 'build/dev',
          dest: 'project_templates/minimum/lib/onsen/',
          src: [
            '**'
          ]
        }]
      },
      sliding_menu_template: {
        files: [{
          expand: true,
          cwd: 'build/dev',
          dest: 'project_templates/sliding_menu/lib/onsen/',
          src: [
            '**'
          ]
        }]
      },
      tab_bar_template: {
        files: [{
          expand: true,
          cwd: 'build/dev',
          dest: 'project_templates/tab_bar/lib/onsen/',
          src: [
            '**'
          ]
        }]
      },
      master_detail_template: {
        files: [{
          expand: true,
          cwd: 'build/dev',
          dest: 'project_templates/master_detail/lib/onsen/',
          src: [
            '**'
          ]
        }]
      }
    },
    watch: {
      scripts: {
        files: [
          'framework/directives/*.js',
          'framework/js/*.js',
          'framework/lib/*.js',
          'framework/css/*.css',
          'framework/css/polyfill/*.css',
          'framework/css/topcoat/css/*.css',
          'framework/templates/*.tpl',
        ],
        tasks: ['default'],
        options: {

        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'html2js', 'concat', 'copy:build', 'copy:demo', 'copy:app', 'copy:minimum_template', 'copy:sliding_menu_template', 'copy:tab_bar_template', 'copy:master_detail_template']);

};