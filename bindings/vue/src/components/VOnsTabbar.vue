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
  import { deriveEvents, deriveMethods, deriveProperties } from '../mixins/derive';
  import { hasOptions, hidable } from '../mixins/common';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties, hasOptions, hidable]
  };
</script>

