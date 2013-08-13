'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
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
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};