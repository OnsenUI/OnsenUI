<template>
  <ons-select v-bind="$attrs" :modifier="normalizedModifier">
    <select v-model="selectedValue">
      <slot></slot>
    </select>
  </ons-select>
</template>

<script>
  import 'onsenui/esm/elements/ons-select';
  import { modifier } from '../mixins';

  export default {
    name: 'v-ons-select',
    mixins: [modifier],
    props: {
      modelValue: [Number, String],
      'update:modelValue': {
        type: String,
        default: 'input'
      }
    },
    emits: ['update:modelValue'],
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
