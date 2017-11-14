import pkg from './package.json';
import dateformat from 'dateformat';

// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import string from 'rollup-plugin-string';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import execute from 'rollup-plugin-execute';

const stringOpt = { include: '**/*.svg', }; // SVG images
const cjsOpt = { include: 'node_modules/**' };
const babelrc = Object.assign({}, pkg.babel);
babelrc.babelrc = babelrc.presets[0][1].modules = false;
babelrc.plugins = ['external-helpers'];

export default [
  // Core UMD
  {
    input: 'core/src/index.umd.js',
    output: {
      file: 'build/js/onsenui.js',
      format: 'umd',
      name: 'ons',
      sourcemap: 'inline',
    },
    plugins: [
      eslint({
        include: [
          'core/src/**/*.js',
        ],
        exclude: [
          'core/src/polyfills/**/*.js',
          'core/src/vendor/**/*.js'
        ]
      }),
      string(stringOpt),
      resolve(),
      commonjs(cjsOpt),
      babel(babelrc),
      progress(),
      filesize(),
      visualizer({
        filename: 'module-stats.umd.html',
        sourcemap: true, // Shows minified sizes
      }),
      execute(`node_modules/.bin/uglifyjs build/js/${pkg.name}.js -c -m --comments '/${pkg.name} v/' --output build/js/${pkg.name}.min.js`),
    ],
    banner: `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`
  },

  // Core ES Modules
  {
    input: 'core/src/index.esm.js',
    external: id => /\/ons\//.test(id), // Do not bundle 'ons', only polyfills/vendor
    output: {
      file: 'build/esm/index.js',
      format: 'es',
      name: 'onsESM',
      sourcemap: 'inline',
    },
    plugins: [
      resolve(),
      commonjs(cjsOpt),
      babel(babelrc),
      progress(),
      filesize(),
      visualizer({
        filename: 'module-stats.esm.html',
        sourcemap: false, // Unminified to show core-js size
      }),
    ],
    banner: `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`
  },

  // Angular Bindings
  {
    input: 'bindings/angular1/index.js',
    output: {
      file: 'build/js/angular-onsenui.js',
      format: 'umd',
      name: 'angularOns',
      sourcemap: 'inline',
    },
    plugins: [
      eslint({
        include: [
          'bindings/angular1/js/**/*.js',
          'bindings/angular1/directives/**/*.js',
          'bindings/angular1/services/**/*.js',
          'bindings/angular1/views/**/*.js',
        ],
      }),
      resolve(),
      commonjs(cjsOpt),
      babel(Object.assign({}, babelrc, { plugins: [ ['angularjs-annotate', { explicitOnly: false }] ] })),
      progress(),
      filesize(),
      visualizer({
        filename: 'bindings/angular1/module-stats.html',
        sourcemap: true, // Shows minified sizes
      }),
      execute(`node_modules/.bin/uglifyjs build/js/angular-${pkg.name}.js -c -m --comments '/angular-${pkg.name} v/' --output build/js/angular-${pkg.name}.min.js`),
    ],
    banner: `/* angular-${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`
  },
];
