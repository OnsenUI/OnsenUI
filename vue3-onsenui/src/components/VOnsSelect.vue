<template>
  <ons-select :modifier="normalizedModifier">
    <select v-model="selectedValue">
      <slot></slot>
    </select>
  </ons-select>
</template>

<script>
  import 'onsenui/esm/elements/ons-select.js';
  import { modifier } from '../mixins/index.js';

  export default {
    name: 'v-ons-select',
    mixins: [modifier],
    emits: ['update:modelValue'],
    props: {
      modelValue: [Number, String]
    },
    computed: {
      selectedValue: {
        get() {
          return this.modelValue;
        },
        set(val) {
          this.$emit('update:modelValue', val);
        }
      }
    }
  };
</script>
