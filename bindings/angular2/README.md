# Onsen UI binding for Angular 2+

All the following commands must be executed in `bindings/angular2` directory.  
Also, **you need to build the core before building this binding.**

## How to manually build this project

```bash
$ yarn install
```

This command requires you to [install yarn](https://yarnpkg.com/en/docs/install) if you haven't already.

## Running Examples

```bash
$ gulp serve
```

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

