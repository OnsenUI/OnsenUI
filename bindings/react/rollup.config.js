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
import execute from 'rollup-plugin-execute';

const local = (...args) => path.resolve(__dirname, ...args);

const babelrc = corePkg.babel;
babelrc.babelrc = babelrc.presets[0][1].modules = false;
babelrc.presets.push('react');
babelrc.plugins = ['external-helpers'];
babelrc.exclude = [local('node_modules/**'), local('../../build/**')];

const banner = `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`,
  external = id => /^(onsenui|react|react-dom|prop-types)$/.test(id),
  resolveOpt = { extensions: ['.js', '.jsx'] },
  globals = {
    'onsenui': 'ons',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes',
  };

const builds = [
  // React bindings UMD
  {
    input: 'src/index.umd.js',
    external,
    output: {
      file: 'dist/react-onsenui.js',
      format: 'umd',
      name: 'reactOnsen',
      sourcemap: 'inline',
      globals,
    },
    plugins: [
      eslint({
        include: [
          'src/**/*.js',
          'src/**/*.jsx',
        ],
      }),
      resolve(resolveOpt),
      commonjs({ include: 'node_modules/**' }),
      babel(babelrc),
      progress(),
      filesize(),
      visualizer({
        filename: 'module-stats.umd.html',
        sourcemap: true,
      }),
      execute(`node_modules/.bin/uglifyjs dist/${pkg.name}.js ---compress --mangle --comments '/${pkg.name}/' --output dist/${pkg.name}.min.js`),
    ],
    banner,
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
    replace({ 'process.env.NODE_ENV': JSON.stringify( 'development' ) }),
    babel(babelrc),
    progress(),
    filesize(),
  ],
};

export default builds;
