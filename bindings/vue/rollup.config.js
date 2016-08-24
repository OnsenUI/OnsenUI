import {readFileSync} from 'fs';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';

const pkg = JSON.parse(readFileSync('package.json', 'utf-8' ));

export default {
  entry: 'src/index.js',
  dest: 'dist/vue-onsenui.js',
  plugins: [
    vue(),
    nodeResolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  external: [
    'onsenui'
  ],
  globals: {
    onsenui: 'ons'
  },
  format: 'umd',
  moduleName: 'VueOnsen',
  banner: `/*! ${pkg.name} v${pkg.version} - ${new Date()} */`,
  sourceMap: true
};
