Onsen UI Quick Startup Guide
====

This document describes the minimum information required to develop an app using Onsen UI.

## Requirement

 * Node.js - [Install Node.js](http://nodejs.org)
 * Cordova - Install by `npm install cordova`

## Development Instructions

1. Install dependencies

    $ npm install

2. Install Gulp globally

    $ npm install -g gulp

3. Run `gulp serve` and run the web server

    $ gulp serve

You should see running app on browser and you can start to develop your app with Onsen UI.

### Directory Layout

    README.md     --> This file
    gulpfile.js   --> Gulp tasks definition
    www/          --> Asset files for app
      index.html  --> App entry point
      js/
      styles/
      lib/onsen/
        stylus/   --> Stylus files for onsen-css-components.css
        js/       --> JS files for Onsen UI
        css/      --> CSS files for Onsen UI
    platforms/    --> Cordova platform directory
    plugins/      --> Cordova plugin directory
    merges/       --> Cordova merge directory
    hooks/        --> Cordova hook directory

## Gulp Tasks

 * `gulp serve` - Running the app for development.
 * `gulp build` - Build several files for project.
 * `gulp jshint` - Generate [jshint](https://github.com/jshint/jshint) report.
