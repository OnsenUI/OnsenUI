import path from 'path';
import pkg from './package.json';
import corePkg from '../../../package.json';
import dateformat from 'dateformat';

// Rollup plugins
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import vue from 'rollup-plugin-vue';

const local = (...args) => path.resolve(__dirname, ...args);

const babelrc = Object.assign({}, corePkg.babel);
babelrc.babelrc = babelrc.presets[0][1].modules = false;
babelrc.plugins = ['external-helpers'];
babelrc.exclude = [local('node_modules/**'), local('../../build/**')];

const globals = { 'vue': 'Vue', 'onsenui': 'ons' },
  external = [ 'vue', 'onsenui' ],
  banner = `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`;

export default {
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
      exclude: [
        /vue&type=/,
        /node_modules/
      ]
    }),
    resolve({ extensions: ['.js', '.vue'] }),
    replace({
      // Remove undefined imports to slightly reduce UMD bundle size
      include: './src/components/*.vue',
      'import \'onsenui/esm/elements/': '// \'',
    }),
    vue({
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('ons-')
      }
    }),
    babel(babelrc),
    progress(),
    filesize(),
    visualizer({
      filename: 'module-stats.umd.html',
      sourcemap: true,
    })
  ]
}
