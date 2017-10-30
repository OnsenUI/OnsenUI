import pkg from './package.json';
import corePkg from '../../package.json';
import dateformat from 'dateformat';

// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import vue from 'rollup-plugin-vue';

const cjsOpt = { include: 'node_modules/**' };
const babelrc = corePkg.babel;
babelrc.babelrc = babelrc.presets[0][1].modules = false;
babelrc.plugins = ['external-helpers'];
// babelrc.plugins = ['external-helpers', 'transform-runtime'];
// babelrc.runtimeHelpers = true;

export default [
  // Vue bindings UMD
  {
    input: 'src/index.umd.js',
    external: id => /onsenui/.test(id),
    output: {
      file: 'dist/vue-onsenui.js',
      format: 'umd',
      name: 'vueOnsen',
      globals: { onsenui: 'ons' },
      sourcemap: false,
    },
    plugins: [
      eslint({
        include: [
          'src/**/*.js',
          'src/**/*.vue',
        ],
      }),
      resolve(),
      commonjs(cjsOpt),
      vue(),
      babel(babelrc),
      progress(),
      filesize(),
      visualizer({
        filename: 'module-stats.umd.html',
        sourcemap: false, // Shows minified sizes
      }),
    ],
    banner: `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`
  },

  // Core ES Modules
  // {
  //   input: 'core/src/index.es.js',
  //   external: id => /\/ons\//.test(id), // Do not bundle 'ons', only polyfills/vendor
  //   output: {
  //     file: 'build/core-src/index.js',
  //     format: 'es',
  //     name: 'onsES',
  //     sourcemap: 'inline',
  //   },
  //   plugins: [
  //     resolve(),
  //     commonjs(cjsOpt),
  //     babel(babelrc),
  //     progress(),
  //     filesize(),
  //     visualizer({
  //       filename: 'module-stats.es.html',
  //       sourcemap: false, // Unminified to show core-js size
  //     }),
  //   ],
  //   banner: `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`
  // },
];
