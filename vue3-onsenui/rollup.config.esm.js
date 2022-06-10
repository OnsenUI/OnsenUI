import vue from 'rollup-plugin-vue';
import replace from '@rollup/plugin-replace';
import glob from 'glob';

const sourceFiles = glob.sync('./src/**/*', { absolute: true });
const vueFiles = glob.sync('./src/**/*.vue');
const jsFiles = glob.sync('./src/**/!(index.umd).js');

const jsConfig = input => ({
  input,
  output: {
    format: 'esm',
    file: input.replace('./src', './esm').replace('.vue', '.js')
  },
  external: id => !/\.vue\?vue/.test(id),
  plugins: [
    replace({
      include: './src/components/index.js',
      preventAssignment: true,
      '.vue': '.js'
    })
  ]
});

const vueConfig = input => ({
  ...jsConfig(input),
  plugins: [
    vue({
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('ons-')
      }
    })
  ]
});

export default [
  ...jsFiles.map(file => jsConfig(file)),
  ...vueFiles.map(file => vueConfig(file))
];
