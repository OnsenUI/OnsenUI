<template>
  <!-- This element is useless except for the destroy part -->
  <ons-lazy-repeat></ons-lazy-repeat>
</template>

<script>
export default {
  props: {
    renderItem: {
      type: Function,
      required: true,
      validator(value) {
        const component = value(0);
        if (component._isVue && !component._isMounted) {
          component.$destroy();
          return true;
        }
        return false;
      }
    },
    length: {
      type: Number,
      required: true
    },
    calculateItemHeight: {
      type: Function,
      default: undefined
    }
  },

  data() {
    return {
      provider: null
    };
  },

  methods: {
    _setup() {
      this.provider && this.provider.destroy();

      const delegate = new this.$ons._ons._internal.LazyRepeatDelegate({
        calculateItemHeight: this.calculateItemHeight,
        createItemContent: i => this.renderItem(i).$mount().$el,
        destroyItem: (i, { element }) => element.__vue__.$destroy(),
        countItems: () => this.length
      }, null);

      this.provider = new this.$ons._ons._internal.LazyRepeatProvider(this.$parent.$el, delegate);
    },
    refresh() {
      return this.provider.refresh();
    }
  },

  watch: {
    renderItem() {
      this._setup();
    },
    length() {
      this._setup();
    },
    calculateItemHeight() {
      this._setup();
    }
  },

  mounted() {
    this._setup();
    this.$vnode.context.$on('refresh', this.refresh);
  },

  beforeDestroy() {
    this.$vnode.context.$off('refresh', this.refresh);

    // This will destroy the provider once the rendered element
    // is detached (detachedCallback). Therefore, animations
    // have time to finish before elements start to disappear.
    // It cannot be set earlier in order to prevent accidental
    // destroys if this element is retached by something else.
    this.$el._lazyRepeatProvider = this.provider;
    this.provider = null;
  }
};
</script>
