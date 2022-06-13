import vue from 'rollup-plugin-vue';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';

import glob from 'glob';
import dateformat from 'dateformat';

import pkg from './package.json';


////////////////////////////////////////////////////////////////////////////////
// ESM config
////////////////////////////////////////////////////////////////////////////////
const esmConfig = (() => {
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

  return [
    ...jsFiles.map(file => jsConfig(file)),
    ...vueFiles.map(file => vueConfig(file))
  ];
})();


////////////////////////////////////////////////////////////////////////////////
// UMD config
////////////////////////////////////////////////////////////////////////////////
const umdConfig = (() => {
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

  return {
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
})();


/**
 * Command line instructions
 * -------------------------
 * ESM build:          rollup -c --configEsm
 * UMD build:          rollup -c --configUmd
 * Build everything:   rollup -c
 */
export default commandLineArgs => {
  if (commandLineArgs.configEsm) {
    return esmConfig;
  } else if (commandLineArgs.configUmd) {
    return umdConfig;
  } else {
    return [...esmConfig, umdConfig];
  }
};
