import pkg from './package.json';
import dateformat from 'dateformat';

// Rollup plugins
import { babel } from '@rollup/plugin-babel';
import vue from 'rollup-plugin-vue';

const banner = `/* ${pkg.name} v${pkg.version} - ${dateformat(new Date(), 'yyyy-mm-dd')} */\n`;

const globals = id => {
  const rest = {
    'onsenui': 'ons',
    'vue': 'Vue'
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
  external: id => /^(onsenui|vue)(\/.*)?$/.test(id),
  output: {
    file: 'dist/vue-onsenui.js',
    format: 'umd',
    name: 'VueOnsen',
    sourcemap: 'inline',
    globals,
    banner,
  },
  plugins: [
    vue({
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('ons-')
      }
    }),
    babel({ babelHelpers: 'bundled' }),
  ]
};
