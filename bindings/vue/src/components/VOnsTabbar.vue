<template>
  <ons-tabbar>
    <div class="tabbar__content">
      <slot name="pages"></slot>
    </div>
    <div class="tabbar">
      <slot></slot>
    </div>
  </ons-tabbar>
</template>

<script>
  import { deriveEvents, hasOptions, hidable, selfProvider } from '../mixins';

  export default {
    mixins: [deriveEvents, hasOptions, hidable, selfProvider]
  };
</script>

