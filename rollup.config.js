import pkg from './package.json';
import dateformat from 'dateformat';

// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import string from 'rollup-plugin-string';
import progress from 'rollup-plugin-progress';

const banner = name => `/* ${name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`;
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
      banner: banner(pkg.name),
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
    ],
    watch: {
      clearScreen: false
    }
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
      banner: banner(pkg.name),
    },
    plugins: [
      resolve(),
      commonjs(cjsOpt),
      babel(babelrc),
      progress(),
    ],
    watch: false
  },
];
