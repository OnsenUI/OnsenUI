<template>
  <ons-pull-hook
    :onAction.prop="action"
  >
    <slot></slot>
  </ons-pull-hook>
</template>

<script>
  import 'onsenui/esm/elements/ons-pull-hook.js';
  import { deriveEvents } from '../mixins/index.js';

  const name = 'v-ons-pull-hook';

  export default {
    name,
    mixins: [deriveEvents(name)],

    props: {
      action: {
        type: Function
      }
    }
  };
</script>
