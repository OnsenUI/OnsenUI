Onsen UI Project Template
====

Projecte template built for Onsen UI.

## Requirement

 * Node.js - [Install Node.js](http://nodejs.org)

## Instructions

1. Install dependencies

    $ npm install

2. Install gulp globally

    $ npm install -g gulp

3. Run "gulp serve" command to run an web server

    $ gulp serve

You should see running app on browser and you can start to develop your app with Onsen UI.

### Directory Layout

    README.md     --> this file
    gulpfile.js   --> gulp tasks definition
    config.xml    --> cordova's config.xml
    package.json
    .jshintrc
    .gitignore
    www/          --> all of the files for app
      index.html  --> app entry point
      js/
      styles/
      lib/onsen/
        stylus/   --> stylus files for onsen-css-components.css
        js/       --> js files for Onsen UI
        css/      --> css files for Onsen UI
    platforms/    --> cordova platform directory
    plugins/      --> cordova plugin directory
    merges/       --> cordova merge directory
    hooks/        --> cordova hook directory

## Tasks

 * gulp serve - Running the app for development
 * gulp build - Build several files for project
 * gulp jshint - Generate [jshint](https://github.com/jshint/jshint) report

