const fs = require('fs');
const path = require('path');

const camelize = string => string.toLowerCase().replace(/-([a-z])/g, (m, l) => l.toUpperCase());
const generate = (baseName, baseMixins = '') => {
  const domElement = 'ons-' + baseName;
  const mixins = 'deriveEvents' + (baseMixins ? `, ${baseMixins.trim().split(/\s+/).join(', ')}` : '');

  return `
<template>
  <${domElement} v-on="unrecognizedListeners">
    <slot></slot>
  </${domElement}>
</template>

<script>
  import 'onsenui/esm/elements/${domElement}';
  import { ${mixins} } from '../mixins';

  export default {
    mixins: [${mixins}]
  };
</script>
`.trim();
};

const components = {
  'toolbar': '',
  'bottom-toolbar': '',
  'toolbar-button': '',
  'alert-dialog-button': '',
  'button': '',
  'icon': '',
  'card': '',
  'list': '',
  'list-item': '',
  'list-title': '',
  'list-header': '',
  'ripple': '',
  'row': '',
  'col': '',
  'progress-bar': '',
  'progress-circular': '',
  'carousel-item': '',
  'splitter-mask': '',
  'splitter-content': '',
  'splitter': 'selfProvider deriveDBB',
  'switch': 'modelCheckbox',
  'checkbox': 'modelCheckbox',
  'input': 'modelInput',
  'search-input': 'modelInput',
  'range': 'modelInput',
  'radio': 'modelRadio',
  'fab': 'hidable',
  'speed-dial-item': '',
  'dialog': 'hidable hasOptions dialogCancel deriveDBB portal',
  'action-sheet': 'hidable hasOptions dialogCancel deriveDBB portal',
  'action-sheet-button': '',
  'modal': 'hidable hasOptions deriveDBB portal',
  'toast': 'hidable hasOptions deriveDBB portal',
};

Object.keys(components).forEach(key => {
  fs.writeFile(path.join(__dirname, 'components', `VOns${camelize('-' + key)}.vue`), generate(key, components[key]), 'utf8', error => {
    if (error) {
      console.error(`Wrong generation of v-ons-${key}:`);
      throw error;
    } else {
      console.info(`Generated v-ons-${key}.`);
    }
  });
});
