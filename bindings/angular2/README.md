# Onsen UI binding for Angular2

## How to manually build this project

Note: **You need to build the core (in the project root directory) before building this binding.**

```bash
$ cd bindings/angular2
$ yarn
```

## Running Examples

```bash
$ gulp serve
```

This command requires you to [install yarn](https://yarnpkg.com/en/docs/install) if you haven't already.

* Then navigate your browser to [http://0.0.0.0:3030/bindings/angular2/examples/button.html](http://0.0.0.0:3000/bindings/angular2/examples/button.html)

## Running the test suite

```bash
$ gulp test
```

To run a single test or a group of tests use the `--specs` parameter and provide a comma-separated list of spec files:

```bash
$ gulp e2e-test --specs ./examples/button.spec.js
```

## How to build transpiled files to publish

```bash
$ yarn run build-dist
```

Then transpiled files are generated in "dist" directory.

