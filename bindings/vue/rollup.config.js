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
import vue from 'rollup-plugin-vue';
import execute from 'rollup-plugin-execute';

const local = (...args) => path.resolve(__dirname, ...args);

const babelrc = Object.assign({}, corePkg.babel);
babelrc.babelrc = babelrc.presets[0][1].modules = false;
babelrc.plugins = ['external-helpers'];
babelrc.exclude = [local('node_modules/**'), local('../../build/**')];

const globals = { 'onsenui/esm': 'ons' },
  external = id => /onsenui/.test(id),
  banner = `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`;

const builds = [
  // Vue bindings UMD
  {
    input: 'src/index.umd.js',
    external,
    output: {
      file: 'dist/vue-onsenui.js',
      format: 'umd',
      name: 'VueOnsen',
      sourcemap: 'inline',
      globals,
      banner,
    },
    plugins: [
      eslint({
        include: [
          'src/**/*.js',
          'src/**/*.vue',
        ],
      }),
      resolve({ extensions: ['.js', '.vue'] }),
      vue(),
      babel(babelrc),
      progress(),
      filesize(),
      visualizer({
        filename: 'module-stats.umd.html',
        sourcemap: true,
      }),
      execute(`node_modules/.bin/uglifyjs dist/${pkg.name}.js -c -m --comments '/${pkg.name}/' --output dist/${pkg.name}.min.js`),
    ],
  },

  // Vue bindings ES Modules
  {
    input: 'src/index.esm.js',
    external,
    output: {
      file: 'esm/index.js',
      format: 'es',
      name: 'VueOnsenESM',
      sourcemap: 'inline',
      globals,
      banner,
    },
    plugins: [
      babel(babelrc),
      progress(),
      filesize(),
      visualizer({
        filename: 'module-stats.esm.html',
        sourcemap: false,
      }),
    ],
  },
];

// Make it work with rollup CLI and Gulp
builds.devConfig = {
  input: local('examples/main.js'),
  output: {
    file: local('examples/build.js'),
    format: 'umd',
    name: 'VueOnsenDev',
    sourcemap: 'inline',
  },
  plugins: [
    alias({
      resolve: ['.js', '.vue', '\/index.js'],
      vue: local('node_modules/vue/dist/vue.esm.js'),
      'vue-onsenui/esm': local('src'),
      'vue-onsenui': local('src', 'index.umd.js'),
      'onsenui/esm': local('../../build/esm'),
    }),
    resolve({ extensions: ['.js', '.vue'] }),
    commonjs({ include: 'node_modules/**' }),
    replace({ 'process.env.NODE_ENV': JSON.stringify( 'development' ) }),
    vue(),
    babel(babelrc),
    progress(),
    filesize(),
  ],
};

export default builds;
