/*
Copyright 2012 Adobe Systems Inc.;
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

/*global module:false, require:false, process:false*/

var path = require('path'),
    os = require('os'),
    chromiumSrc = process.env.CHROMIUM_SRC || "";


module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('../package.json'),

        stylus: {
            options: {
                compress: false
            },

            'ios7-theme-module': {
                files: [
                    {
                        src: 'theme-modules/ios7/theme-topcoat-mobile-onsen-ios7.styl',
                        dest: 'css/topcoat-mobile-onsen-ios7.css'
                    }
                ]
            },

            'android4_4-theme-module': {
                files: [
                    {
                        src: 'theme-modules/android4_4/theme-topcoat-mobile-onsen-android4_4.styl',
                        dest: 'css/topcoat-mobile-onsen-android4_4.css'
                    }
                ]
            },

            'onsen-theme-module': {
                files: [
                    {
                        src: 'theme-modules/onsen/theme-topcoat-mobile-onsen-blue.styl',
                        dest: 'css/topcoat-mobile-onsen-blue.css'
                    },
                    {
                        src: 'theme-modules/onsen/theme-topcoat-mobile-onsen-green.styl',
                        dest: 'css/topcoat-mobile-onsen-green.css'
                    },
                    {
                        src: 'theme-modules/onsen/theme-topcoat-mobile-onsen-orange.styl',
                        dest: 'css/topcoat-mobile-onsen-orange.css'
                    },
                    {
                        src: 'theme-modules/onsen/theme-topcoat-mobile-onsen-pink.styl',
                        dest: 'css/topcoat-mobile-onsen-pink.css'
                    },
                    {
                        src: 'theme-modules/onsen/theme-topcoat-mobile-onsen-purple.styl',
                        dest: 'css/topcoat-mobile-onsen-purple.css'
                    },
                    {
                        src: 'theme-modules/onsen/theme-topcoat-mobile-onsen-yellow.styl',
                        dest: 'css/topcoat-mobile-onsen-yellow.css'
                    }
                ]
            }

        },

        topdoc: {
            usageguides: {
                options: {
                    source: 'css',
                    destination: 'demo',
                    template: 'topdoc-template/',
                    templateData: {
                        "title": "Onsen UI Themes",
                        "subtitle": "",
                        "homeURL": "#",
                        "siteNav": []
                    }
                }
            }
        },

        autoprefixer: {
            dist: {
                options: {
                },
                files: [
                {
                    src: 'css/topcoat-mobile-onsen-blue.css',
                    dest: 'css/topcoat-mobile-onsen-blue.css'
                },
                {
                    src: 'css/topcoat-mobile-onsen-ios7.css',
                    dest: 'css/topcoat-mobile-onsen-ios7.css'
                },
                  {
                    src: 'css/topcoat-mobile-onsen-android4_4.css',
                    dest: 'css/topcoat-mobile-onsen-android4_4.css'
                }]
            }

        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'css',
                src: ['*.css', '!*.min.css'],
                dest: 'css',
                ext: '.min.css'
            }
        },

        clean: {
            release: ['css']
        },

        watch: {
            options: {
                livereload: true
            },

            'ios7-themes': {
                files: ['theme-modules/**/*.styl'],
                tasks: ['gen-ios7-themes']
            },

            'android4_4-themes': {
                files: ['theme-modules/**/*.styl'],
                tasks: ['gen-android4_4-themes']
            },

            'onsen-themes': {
                files: ['theme-modules/**/*.styl'],
                tasks: ['gen-onsen-themes']
            }
        },

        connect: {
            options: {
                hostname: '0.0.0.0',
                livereload: true,
                base: '../'
            },
            livereload: {
                options: { port: 9999 }
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.file.setBase('../');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-topdoc');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.file.setBase(__dirname);

    grunt.registerTask('default', ['build']);

    grunt.registerTask('build', ['clean', 'stylus', 'autoprefixer', 'cssmin', 'topdoc']);

    grunt.registerTask('gen-onsen-themes', ['stylus:onsen-theme-module', 'autoprefixer']);
    grunt.registerTask('gen-ios7-themes', ['stylus:ios7-theme-module', 'autoprefixer']);
    grunt.registerTask('gen-android4_4-themes', ['stylus:android4_4-theme-module', 'autoprefixer']);

    grunt.registerTask('serve-message', function() {
        grunt.log.writeln('Open http://0.0.0.0:9999/themes/demo/');
    });
    grunt.registerTask('serve-onsen-themes', ['connect', 'serve-message', 'watch:onsen-themes']);
    grunt.registerTask('serve-ios7-themes', ['connect', 'serve-message', 'watch:ios7-themes']);
    grunt.registerTask('serve-android4_4-themes', ['connect', 'serve-message', 'watch:android4_4-themes']);

};
