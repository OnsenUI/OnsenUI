<template>
  <ons-select v-on="$listeners">
    <select>
      <slot></slot>
    </select>
  </ons-select>
</template>

<script>
  import 'onsenui/esm/elements/ons-select';
  import { modelInput } from '../mixins';

  export default {
    mixins: [modelInput]
  };
</script>
