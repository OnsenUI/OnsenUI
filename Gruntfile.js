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
            'demo/lib/onsen/'
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
            'framework/css/*.css'            
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
          'framework/lib/angular/angular.js',
          'framework/directives/module.js',
          'framework/directives/*.js',          
          'framework/lib/*.js',          
          'framework/js/*.js'          
        ],
        dest: 'build/<%= pkg.name %>.js'
      }
    },     
    // Put files not handled in other tasks here
    copy: {
      build: {
        files: [
          //images and font
          { 
            expand: true,
            cwd: 'framework',
            dest: 'build',
            src: [
              'img/{,*/}*.{gif,webp,svg,png}',
              'font/*',                       
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
          },
          // directive templates
          {
            expand: true,   
            cwd: 'framework/templates/',       
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
      },
      demo: {
        files: [          
          {
            expand: true,
            cwd: 'build',              
            dest: 'demo/lib/onsen/',
            src: [
              '**'
            ]
          }
        ]
      },
      app: {
        files: [          
          {
            expand: true,
            cwd: 'build',              
            dest: 'app/lib/onsen/',
            src: [
              '**'
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
  grunt.registerTask('default', ['clean', 'concat', 'cssmin', 'copy:build', 'copy:demo', 'copy:app']);

};