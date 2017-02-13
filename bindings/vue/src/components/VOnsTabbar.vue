<template>
  <ons-tabbar>
    <div class="tab-bar__content">
      <slot name="pages"></slot>
    </div>
    <div class="tab-bar">
      <slot></slot>
    </div>
  </ons-tabbar>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../mixins/derive';
  import { hasOptions, visibilityToggle } from '../mixins/common';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties, hasOptions, visibilityToggle]
  };
</script>

