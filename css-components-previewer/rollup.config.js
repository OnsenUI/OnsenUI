import { nodeResolve } from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-import-css';
import execute from 'rollup-plugin-execute';

export default {
  input: 'src/app.js',
  output: {
    file: 'build/app.gen.js',
    format: 'umd',
    sourcemap: 'inline'
  },
  plugins: [
    nodeResolve(),
    css(),
    execute('node copy-files.js'),
    execute('node generate-preview.js')
  ]
};
