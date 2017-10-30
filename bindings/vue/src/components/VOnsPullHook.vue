<template>
  <ons-pull-hook
    :on-action.prop="action"
    :on-pull.prop="onPull"
    v-on="unrecognizedListeners"
  >
    <slot></slot>
  </ons-pull-hook>
</template>

<script>
  import 'onsenui/core-src/elements/ons-pull-hook';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents],

    props: {
      action: {
        type: Function
      },
      onSwipe: {
        type: Function
      }
    }
  };
</script>
