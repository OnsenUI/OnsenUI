<template>
  <ons-dialog>
    <slot></slot>
  </ons-dialog>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../internal/mixins/derive';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties],

    beforeMount() {
      const updateVModel = show => {
        return function() {
          if (!this.$vnode.data.domProps) return;
          if (show !== this.$vnode.data.domProps.value) {
            this._shown = show;
            this.$emit('input', show)
          }
        }
      }

      this.$on('postshow', updateVModel(true));
      this.$on('posthide', updateVModel(false));
    },

    mounted() {
      if (!this.$vnode.data.domProps) return;
      if (this.$vnode.data.domProps.value === true) {
        this.show();
      }
    },

    updated() {
      if (!this.$vnode.data.domProps) return;
      const shown = this.$vnode.data.domProps.value;
      if (shown !== this._shown) {
        this[shown ? 'show' : 'hide'].call(this);
        this._shown = shown;
      }
    }
  };
</script>
