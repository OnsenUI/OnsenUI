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
            'build'
          ]
        }]
      }      
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        files: {
          'build/css/<%= pkg.name %>.css': [
            'app/css/topcoat-mobile-light.css',
            'app/css/*.css',
            '!app/css/polyfill/*.css'
          ]
        }
      }
    },
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        src: [
          'app/lib/angular/angular.js',
          'app/framework/directives/module.js',
          'app/framework/directives/*.js',          
          'app/lib/*.js',          
          '!app/lib/modernizr.custom.js',
          'app/js/*.js',
          '!app/js/app.js'
        ],
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },     
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [
          //images and font
          { 
            expand: true,
            dot: true,
            cwd: 'app',
            dest: 'build',
            src: [
              'img/{,*/}*.{gif,webp,svg,png}',
              'font/*',                       
            ]
          },
          // css polyfills 
          {
            expand: true,   
            cwd: 'app/css/polyfill',       
            dest: 'build/css/polyfill/',
            src: [
              '*.css'
            ]
          },
          // directive templates
          {
            expand: true,   
            cwd: 'app/templates/',       
            dest: 'build/templates/',
            src: [
              '*.*'
            ]
          },
          // plugin_info.json
          {
            expand: false,                 
            dest: 'build/plugin_info.json',
            src: [
              'plugin_info.json'
            ]
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'concat', 'cssmin', 'copy']);

};