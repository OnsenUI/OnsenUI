<template>
  <ons-dialog>
    <slot></slot>
  </ons-dialog>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../internal/mixins/derive';
  import { cancelable } from '../internal/mixins/dialogs';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties, cancelable],

    props: {
      shown: {
        type: Boolean
      }
    },

    watch: {
      shown: function() {
        if (this.shown !== this.visible) {
          this[this.shown ? 'show' : 'hide'].call(this);
        }
      }
    }
  };
</script>
