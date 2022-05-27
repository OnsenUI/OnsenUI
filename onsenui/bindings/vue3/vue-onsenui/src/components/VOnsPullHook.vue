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
  import 'onsenui/esm/elements/ons-pull-hook';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-pull-hook',
    mixins: [deriveEvents],

    props: {
      action: {
        type: Function
      },
      onPull: {
        type: Function
      }
    }
  };
</script>
