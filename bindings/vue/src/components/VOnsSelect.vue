<template>
  <ons-select v-on="$listeners" :modifier="normalizedModifier">
    <select>
      <slot></slot>
    </select>
  </ons-select>
</template>

<script>
  import 'onsenui/esm/elements/ons-select';
  import { modelInput, modifier } from '../mixins';

  export default {
    name: 'v-ons-select',
    mixins: [modelInput, modifier]
  };
</script>
