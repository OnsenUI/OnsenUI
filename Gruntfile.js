'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false
      },
      build: {
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
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: 'build',
          src: [
            'img/{,*/}*.{gif,webp,svg}',
            'font/*'            
          ]
        }, 
        {
          expand: true,   
          cwd: 'app/css/polyfill',       
          dest: 'build/css/polyfill/',
          src: [
            '*.css'
          ]
        }]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin', 'copy']);

};