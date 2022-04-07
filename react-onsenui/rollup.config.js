import path from 'path';
import pkg from './package.json';
import corePkg from '../onsenui/package.json';
import dateformat from 'dateformat';

// Rollup plugins
import { babel } from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';

const local = (...args) => path.resolve(__dirname, ...args);

const babelrc = Object.assign({}, corePkg.babel);
babelrc.presets = [...babelrc.presets, '@babel/preset-react'];
babelrc.babelrc = babelrc.presets[0][1].modules = false;
babelrc.exclude = [local('node_modules/**'), local('../../build/**')];
babelrc.babelHelpers = 'bundled'

const banner = `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`;
const resolveOpt = { extensions: ['.js', '.jsx'] };

const globals = id => {
  const rest = {
    'onsenui': 'ons',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes',
  };

  const element = id.match(/^onsenui\/esm\/elements\/ons-([a-z-]+)(\.js)?$/)?.[1];
  if (element) {
    const camel = element.charAt(0).toUpperCase() + element.slice(1).replace(/-([a-z])/g, match => match[1].toUpperCase());
    return `ons.elements.${camel}`;
  } else {
    return rest[id];
  }
};

export default {
  input: 'src/index.umd.js',
  external: id => /^(onsenui|react|react-dom|prop-types)(\/.*)?$/.test(id),
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
    commonjs(),
    babel(babelrc),
    progress(),
    filesize(),
    visualizer({
      filename: 'module-stats.umd.html',
      sourcemap: true,
    })
  ]
};
