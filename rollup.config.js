import pkg from './package.json';
import dateformat from 'dateformat';

// Rollup plugins
import { babel } from '@rollup/plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import string from 'rollup-plugin-string';
import progress from 'rollup-plugin-progress';

const banner = name => `/* ${name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`;
const stringOpt = { include: '**/*.svg', }; // SVG images

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
      babel({ babelHelpers: 'bundled' }),
      progress(),
    ],
    watch: {
      clearScreen: false
    }
  }
];
