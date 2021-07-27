<template>
  <ons-pull-hook
    :on-action="action"
    :on-pull="onPull"
  >
    <slot></slot>
  </ons-pull-hook>
</template>

<script>
  import 'onsenui/esm/elements/ons-pull-hook';
  import { deriveEvents } from '../mixins';

  const name = 'v-ons-pull-hook';

  export default {
    name,
    mixins: [deriveEvents(name)],

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
