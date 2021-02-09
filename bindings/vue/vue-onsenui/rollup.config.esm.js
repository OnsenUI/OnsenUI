import path from 'path';
import pkg from './package.json';
import corePkg from '../../../package.json';
import dateformat from 'dateformat';

// Rollup plugins
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
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

const globals = { 'onsenui': 'ons', 'onsenui/esm': 'ons' },
  external = id => /^onsenui/.test(id),
  banner = `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`;

export default {
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
    vue(),
    resolve(),
    eslint({
      exclude: [
        /vue&type=/,
        /node_modules/
      ]
    }),
    babel(babelrc),
    progress(),
    filesize(),
    visualizer({
      filename: 'module-stats.esm.html',
      sourcemap: false,
    })
  ]
}
