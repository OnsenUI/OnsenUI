import path from 'path';
import pkg from './package.json';
import corePkg from '../../package.json';
import dateformat from 'dateformat';

// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import alias from 'rollup-plugin-alias';
import uglify from 'rollup-plugin-uglify';
import nodeGlobals from 'rollup-plugin-node-globals';

const local = (...args) => path.resolve(__dirname, ...args);

const babelrc = Object.assign({}, corePkg.babel);
babelrc.babelrc = babelrc.presets[0][1].modules = false;
babelrc.plugins = ['external-helpers'];
babelrc.exclude = [local('node_modules/**'), local('../../build/**')];

const banner = `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`,
  resolveOpt = { extensions: ['.js', '.jsx'] },
  cjsOpt = { include: 'node_modules/**' },
  globals = {
    'onsenui': 'ons',
    'mithril': 'm'
  };

const builds = [
  // Mithril bindings UMD development
  {
    input: 'src/index.js',
    external: id => /^(onsenui|mithril)$/.test(id),
    output: {
      file: 'dist/mithril-onsenui.js',
      format: 'umd',
      name: 'MithrilOnsen',
      sourcemap: 'inline',
      globals,
      banner,
    },
    plugins: [
      eslint({
        include: [
          'src/**/*.js'
        ],
      }),
      resolve(resolveOpt),
      commonjs(cjsOpt),
      babel(babelrc),
      progress(),
      filesize(),
      visualizer({
        filename: 'module-stats.umd.html',
        sourcemap: true,
      }),
    ],
  },

  // Mithril bindings UMD production
  {
    input: 'src/index.js',
    external: id => /^(onsenui|mithril)$/.test(id),
    output: {
      file: 'dist/mithril-onsenui.min.js',
      format: 'umd',
      name: 'Ons',
      sourcemap: true,
      globals,
      banner,
    },
    plugins: [
      replace({ 'process.env.NODE_ENV': JSON.stringify( 'production' ) }),
      resolve(resolveOpt),
      commonjs(cjsOpt),
      babel(babelrc),
      uglify(),
      progress(),
      filesize(),
    ],
  },
];

builds.devConfig = {
  input: local('examples/main.js'),
  output: {
    file: local('examples/build.js'),
    format: 'umd',
    name: 'MithrilOnsenDev',
    sourcemap: 'inline',
  },
  plugins: [
    alias({
      resolve: ['.js', '/index.js'],
      'mithril-onsenui': local('src', 'index.js'),
      'onsenui': local('../../build/js/onsenui.js'),
    }),
    resolve(resolveOpt),
    commonjs({
      include: [local('node_modules/**'), local('../../build/**')]
    }),
    babel(babelrc),
    nodeGlobals(),
    progress(),
    filesize(),
  ],
};

export default builds;
