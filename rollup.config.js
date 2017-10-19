import 'babel-polyfill';

// Rollup plugins
import pkg from './package.json';
import dateformat from 'dateformat';

import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import string from 'rollup-plugin-string';

import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
// import uglify from 'rollup-plugin-uglify';
// import postcssPlugin from 'rollup-plugin-postcss';

// import cssnano from 'cssnano';
// import cssnext from 'postcss-cssnext';

const stringOpt = { include: '**/*.svg', }; // SVG images

const resolveOpt = {
  jsnext: true,
  main: true,
  browser: true,
};

const babelOpt = {
  // do not exclude node_modules since Onsen UI dependencies need transpiling
  babelrc: false, // We need to deactivate modules transpiling only here
  presets: [
    ['env', {
      modules: false,
      // forceAllTransforms: true, // Full ES5
      targets: {
        browsers: ['iOS >= 8', 'Android >= 4.4.4', '> 1%', 'last 2 versions'],
      },
    }],
    'stage-3'
  ],
  plugins: [
    'external-helpers',
  ],
};

const commonjsOpt = {
  include: 'node_modules/**',
};

const replaceOpt = {
  ONS_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
};


// const postcss = postcss({
//   extensions: ['.css'],
//   plugins: [
//     cssnext({
//       browsers: [],
//       warnForDuplicates: false,
//     }),
//     cssnano(),
//   ],
// });

const builds = [
  {
    input: 'core/src/setup.js',
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
      resolve(resolveOpt),
      commonjs(commonjsOpt),
      babel(babelOpt),
      replace(replaceOpt),
      progress(),
      filesize(),
      visualizer({
        filename: 'module-stats.html',
        sourcemap: true, // Shows minified sizes
      }),
      // uglify()
      // (process.env.NODE_ENV === 'production' && uglify())
    ],
    banner: `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`
  },

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
      resolve(resolveOpt),
      commonjs(commonjsOpt),
      babel(Object.assign({}, babelOpt, { plugins: [ ['angularjs-annotate', { explicitOnly: false }] ] })),
      progress(),
      filesize(),
      visualizer({
        filename: 'bindings/angular1/module-stats.html',
        sourcemap: true, // Shows minified sizes
      }),
    ],
    banner: `/* angular-${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`
  }
];

export default builds;
