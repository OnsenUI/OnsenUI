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
babelrc.presets = [...babelrc.presets, 'react'];
babelrc.babelrc = babelrc.presets[0][1].modules = false;
babelrc.plugins = ['external-helpers'];
babelrc.exclude = [local('node_modules/**'), local('../../build/**')];

const banner = `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`,
  resolveOpt = { extensions: ['.js', '.jsx'] },
  cjsOpt = { include: 'node_modules/**' },
  globals = {
    'onsenui': 'ons',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes',
  };

const builds = [
  // React bindings UMD development
  {
    input: 'src/index.umd.js',
    external: id => /^(onsenui|react|react-dom|prop-types)$/.test(id),
    output: {
      file: 'dist/react-onsenui.js',
      format: 'umd',
      name: 'Ons',
      sourcemap: 'inline',
      globals,
      banner,
    },
    plugins: [
      eslint({
        include: [
          'src/**/*.js',
          'src/**/*.jsx',
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

  // React bindings UMD production
  {
    input: 'src/index.umd.js',
    external: id => /^(onsenui|react|react-dom)$/.test(id),
    output: {
      file: 'dist/react-onsenui.min.js',
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
    name: 'reactOnsenDev',
    sourcemap: 'inline',
  },
  plugins: [
    alias({
      resolve: ['.js', '.jsx', '\/index.js'],
      'react-onsenui': local('src', 'index.umd.js'),
      'onsenui': local('../../build/js/onsenui.js'),
    }),
    resolve(resolveOpt),
    commonjs({
      include: [local('node_modules/**'), local('../../build/**')],
      namedExports: {
        [local('node_modules', 'react-dom')]: ['findDOMNode'],
        [local('node_modules', 'react')]: ['Component', 'Children', 'createElement'],
      },
    }),
    babel(babelrc),
    nodeGlobals(),
    progress(),
    filesize(),
  ],
};

export default builds;
