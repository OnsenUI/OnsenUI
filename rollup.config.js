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

const stringOpt = { include: '**/*.svg', }; // SVG images
const cjsOpt = { include: 'node_modules/**' };
const babelrc = pkg.babel;
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
    ],
    banner: `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`
  },

  // Core ES Modules
  {
    input: 'core/src/index.es.js',
    external: id => /\/ons\//.test(id), // Do not bundle 'ons', only polyfills/vendor
    output: {
      file: 'build/core-src/index.js',
      format: 'es',
      name: 'onsES',
      sourcemap: 'inline',
    },
    plugins: [
      resolve(),
      commonjs(cjsOpt),
      babel(babelrc),
      progress(),
      filesize(),
      visualizer({
        filename: 'module-stats.es.html',
        sourcemap: false, // Unminified to show core-js size
      }),
    ],
    banner: `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`
  },

  // Angular Bindings
  {
    input: 'bindings/angular1/setup.js',
    output: {
      file: 'build/js/angular-onsenui.js',
      format: 'iife',
      name: 'angularOns',
      sourcemap: 'inline',
    },
    plugins: [
      eslint({
        include: [
          'bindings/angular1/js/**/*.js',
          'bindings/angular1/directives/**/*.js',
          'bindings/angular1/services/**/*.js',
          'bindings/angular1/elements/**/*.js',
          'bindings/angular1/views/**/*.js'
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
    ],
    banner: `/* angular-${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`
  },
];
