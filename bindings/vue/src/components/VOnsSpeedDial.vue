<template>
  <ons-speed-dial :on-click.prop="action">
    <slot></slot>
  </ons-speed-dial>
</template>

<script>
  import { hidable, deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents, hidable],

    props: {
      open: {
        type: Boolean,
        default: undefined
      }
    },

    methods: {
      action() {
        let runDefault = true;
        this.$emit('click', { preventDefault: () => runDefault = false });

        if (runDefault) {
          this.$el.toggleItems();
        }
      },
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
