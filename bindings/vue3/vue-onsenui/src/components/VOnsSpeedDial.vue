<template>
  <ons-speed-dial :on-click="action" v-on="handlers">
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

    emits: ['update:open', 'click'],

    props: {
      open: {
        type: Boolean,
        default: undefined
      }
    },

    data() {
      return {
        handlers: {
          open: this.userInteraction,
          close: this.userInteraction
        }
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
      },
      userInteraction() {
        this._shouldUpdate() && this.$emit('update:open', this.$el.isOpen());
      }
    },

    watch: {
      open() {
        this._updateToggle();
      }
    },

    mounted() {
      this._updateToggle();
    }
  };
</script>
