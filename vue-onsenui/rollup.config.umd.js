import pkg from './package.json';
import dateformat from 'dateformat';

// Rollup plugins
import { babel } from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import progress from 'rollup-plugin-progress';
import vue from 'rollup-plugin-vue';

const globals = { 'onsenui': 'ons', 'onsenui/esm': 'ons' },
  external = id => /^onsenui/.test(id),
  banner = `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`;

// Vue bindings UMD
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
      preventAssignment: true
    }),
    vue(),
    babel({ babelHelpers: 'bundled' }),
    progress()
  ],
};
