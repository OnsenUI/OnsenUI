Onsen UI binding for Angular 2+
===============================

This README is written for developers of this binding.

If you are a user of this binding, please refer to [the official guide of this binding](https://onsen.io/v2/guide/angular2/).


How to manually build this project
----------------------------------

All the following commands must be executed in `bindings/angular2` directory.
Also, **you need to build the core before building this binding.**

    npm install
    npm run build


Running Examples
----------------

    gulp serve

* Then navigate your browser to [http://0.0.0.0:3030/bindings/angular2/examples/button.html](http://0.0.0.0:3000/bindings/angular2/examples/button.html)


Running the test suite
----------------------

    gulp test

To run a single test or a group of tests use the `--specs` parameter and provide a comma-separated list of spec files:

    gulp e2e-test --specs ./examples/button.spec.js

## How to build transpiled files to publish

    npm run build-dist

Then transpiled files are generated in `dist` directory.
