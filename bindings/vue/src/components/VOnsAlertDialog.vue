<template>
  <ons-alert-dialog>
    <div class="alert-dialog-title">
      <slot name="title">{{title}}</slot>
    </div>
    <div class="alert-dialog-content">
      <slot></slot>
    </div>
    <div class="alert-dialog-footer">
      <slot name="footer">
        <button v-for="(handler, key) in footer" :key="key" class="alert-dialog-button" @click="handler">{{key}}</button>
      </slot>
    </div>
  </ons-alert-dialog>
</template>

<script>
  import { hidable, hasOptions, dialogCancel, modifier, deriveEvents, deriveDBB, portal } from '../mixins';

  export default {
    mixins: [hidable, hasOptions, dialogCancel, modifier, deriveEvents, deriveDBB, portal],

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
