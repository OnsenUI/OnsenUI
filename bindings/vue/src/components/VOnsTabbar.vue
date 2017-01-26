<template>
  <ons-tabbar>
    <div class="tab-bar__content" ref="contentElement">
      <slot name="pages"></slot>
    </div>
    <div class="tab-bar" ref="tabbarElement">
      <slot></slot>
    </div>
  </ons-tabbar>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../internal/mixins/derive';
  import { hasOptions } from '../internal/mixins/common';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties, hasOptions]
  };
</script>

