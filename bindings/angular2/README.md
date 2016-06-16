# Onsen UI binding for Angular2

## Running Examples

```bash
$ cd bindings/angular2
$ npm install
$ gulp serve
```

* Then navigate your browser to [http://0.0.0.0:3030/bindings/angular2/examples/button.html](http://0.0.0.0:3000/bindings/angular2/examples/button.html)

## Running the test suite

```bash
$ cd bindings/angular2
$ npm install
$ gulp test
```

To run a single test or a group of tests use the `--specs` parameter and provide a comma-separated list of spec files:

```bash
$ gulp e2e-test --specs ./examples/button.spec.js
```

## How to build transpiled files to publish

```bash
$ cd bindings/angular2
$ npm install
$ npm run build
```

Then transpiled files are generated in "dist" directory.

