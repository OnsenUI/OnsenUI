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
        pkg: grunt.file.readJSON('package.json'),

        stylus: {
            options: {
                paths: 
                    grunt.file.expand(__dirname + '/components/*/').filter(function(path) {
                        return path.indexOf(__dirname + '/components/utils/') === -1;
                    })
                    .concat(grunt.file.expand(__dirname + '/components/utils/mixins/'))
                    .concat(grunt.file.expand(__dirname + '/theme')),
                compress: false
            },

            mobile_onsen_ios7: {
                options: {
                    import: ['theme-topcoat-mobile-onsen-ios7', 'utils']
                },

                files: [{
                    src: 'components/**/*.styl',
                    dest: 'css/topcoat-mobile-onsen-ios7.css'
                }]
            },

            mobile_onsen_android4_4: {
                options: {
                    import: ['theme-topcoat-mobile-onsen-android4_4', 'utils']
                },

                files: [{
                    src: 'components/**/*.styl',
                    dest: 'css/topcoat-mobile-onsen-android4_4.css'
                }]
            },

            mobile_onsen_blue: {
                options: {
                    import: ['theme-topcoat-mobile-onsen-blue', 'utils']
                },

                files: [{
                    src: 'components/**/*.styl',
                    dest: 'css/topcoat-mobile-onsen-blue.css'
                }]
            }

        },

        topdoc: {
            usageguides: {
                options: {
                    source: 'css',
                    destination: 'demo',
                    template: 'topdoc-theme/',
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
            files: ['components/**/*.styl'],
            tasks: ['compile']
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-topdoc');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['clean', 'stylus', 'topdoc', 'autoprefixer', 'cssmin']);
};
