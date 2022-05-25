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
  external: id => /^(onsenui|vue)(\/.*)?$/.test(id) || sourceFiles.includes(id),
  plugins: [
    vue({
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('ons-')
      }
    })
  ]
});

export default vueFiles.map(file => vueConfig(file));
