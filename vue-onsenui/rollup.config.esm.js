import vue from 'rollup-plugin-vue';
import glob from 'glob';

const sourceFiles = glob.sync('./src/**/*', { absolute: true });
const vueFiles = glob.sync('./src/**/*.vue');

const vueConfig = input => ({
  input,
  output: {
    format: 'esm',
    file: input.replace('./src', './esm').replace('.vue', '.js')
  },
  external: id => /^onsenui/.test(id) || sourceFiles.includes(id),
  plugins: [
    vue()
  ]
});

export default vueFiles.map(file => vueConfig(file));
