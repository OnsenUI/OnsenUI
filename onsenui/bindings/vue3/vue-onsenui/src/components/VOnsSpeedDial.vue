<template>
  <ons-speed-dial>
    <slot></slot>
  </ons-speed-dial>
</template>

<script>
  import 'onsenui/esm/elements/ons-speed-dial';
  import { hidable, deriveEvents } from '../mixins';

  const name = 'v-ons-speed-dial';

  export default {
    name,
    mixins: [deriveEvents(name), hidable],

    props: {
      open: {
        type: Boolean,
        default: undefined
      }
    },

    methods: {
      _shouldUpdate() {
        return this.open !== undefined && this.open !== this.$el.isOpen();
      },
      _updateToggle() {
        this._shouldUpdate() && this.$el[this.open ? 'showItems' : 'hideItems'].call(this.$el);
      }
    },

    watch: {
      open() {
        this._updateToggle();
      }
    },

    mounted() {
      this.$on(['open', 'close'], () => this._shouldUpdate() && this.$emit('update:open', this.$el.isOpen()));

      this._updateToggle();
    }
  };
</script>
