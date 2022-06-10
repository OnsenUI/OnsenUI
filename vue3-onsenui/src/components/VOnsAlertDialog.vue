<template>
  <ons-alert-dialog :modifier="normalizedModifier">
    <div class="alert-dialog-title">
      <slot name="title">{{title}}</slot>
    </div>
    <div class="alert-dialog-content">
      <slot></slot>
    </div>
    <div class="alert-dialog-footer">
      <slot name="footer">
        <ons-alert-dialog-button v-for="(handler, key) in footer" :key="key" @click="handler">{{key}}</ons-alert-dialog-button>
      </slot>
    </div>
  </ons-alert-dialog>
</template>

<script>
  import 'onsenui/esm/elements/ons-alert-dialog.js';
  import { hasOptions, dialogCancel, deriveEvents, deriveDBB, portal, modifier } from '../mixins/index.js';

  const name = 'v-ons-alert-dialog';

  export default {
    name,
    mixins: [hasOptions, dialogCancel, deriveEvents(name), deriveDBB, portal, modifier],

    props: {
      title: {
        type: String
      },
      footer: {
        type: Object,
        validator(value) {
          return Object.keys(value).every(key => value[key] instanceof Function);
        }
      }
    }
  };
</script>
