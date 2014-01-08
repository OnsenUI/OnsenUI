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
            'component_demo/lib/onsen/',
            'project_templates/minimum/app/lib/onsen/',
            'project_templates/sliding_menu/app/lib/onsen/',
            'project_templates/tab_bar/app/lib/onsen/',
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
      css: {
        src: [
          'framework/css/common.css',
          'framework/css/*.css'
        ],
        dest: 'build/css/<%= pkg.name %>.css'
      }
    },
    // Put files not handled in other tasks here
    copy: {
      build: {
        files: [
          // angularjs
          {         
          expand: true,
            cwd: 'framework/lib/angular-unstable',
            dest: 'build/js/angular',
            src: [
              '*.js'
            ]               
          },
          // topcoat css
          {
            expand: true,
            cwd: 'framework/css/topcoat/css',
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
          // fonts
           {
            expand: true,
            cwd: 'framework/css/topcoat/font/',
            dest: 'build/font/',
            src: [
              '*.otf'
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
      demo: {
        files: [{
          expand: true,
          cwd: 'build/',
          dest: 'component_demo/lib/onsen/',
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
      master_detail_template: {
        files: [{
          expand: true,
          cwd: 'build',
          dest: 'project_templates/master_detail/app/lib/onsen/',
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
  grunt.registerTask('default', ['clean', 'html2js', 'concat', 'copy:build', 'copy:demo', 'copy:minimum_template', 'copy:sliding_menu_template', 'copy:tab_bar_template', 'copy:master_detail_template']);

};