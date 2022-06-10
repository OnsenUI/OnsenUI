<template>
  <!-- This element is useless except for the destroy part -->
  <ons-lazy-repeat></ons-lazy-repeat>
</template>

<script>
import { createVNode, render } from 'vue';
import 'onsenui/esm/elements/ons-lazy-repeat.js';

export default {
  name: 'v-ons-lazy-repeat',

  props: {
    renderItem: {
      type: Function,
      required: true
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
        createItemContent: i => {
          let vnode = createVNode(this.renderItem(i));
          vnode.appContext = this.$ons._app._context;

          let fragment = document.createDocumentFragment();
          render(vnode, fragment);
          let element = fragment.firstChild;

          element.destroy = () => {
            fragment = null;
            vnode = null;
            element = null;
          };

          return fragment.firstChild;
        },
        destroyItem: (i, { element }) => element.destroy(),
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
  },

  beforeDestroy() {
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
