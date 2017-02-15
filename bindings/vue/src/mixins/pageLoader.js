import Vue from 'vue';
import { PageLoader } from 'onsenui';
import { destroyable } from './common';
import { hyphenate } from '../internal/util';

const _getParentVM = element => {
  let parent = element;
  while (!parent.hasOwnProperty('__vue__')) {
    parent = parent.parentElement;
    if (!parent) {
      return;
    }
  }
  return parent.__vue__;
};

const _inheritProps = {
  beforeCreate() {
    if (!this.$options.hasOwnProperty('props')) {
      return;
    }

    const parentVnode = this.$options.parent.$options._parentVnode;
    const parentProps = Object.assign({}, parentVnode.data.attrs, parentVnode.componentOptions.propsData);
    this.$options.propsData = Object.assign(
      Object.keys(this.$options.props).reduce((result, key) => {
        const hyphenKey = hyphenate(key);
        result[key] = {};
        if (parentProps.hasOwnProperty(hyphenKey)) {
          result[key] = parentProps[hyphenKey];
        }
        return result;
      }, {}),
      this.$options.propsData || {});
  }
};

const VuePageLoader = {
  mixins: [destroyable],

  props: {
    page: {
      type: Object
    }
  },

  mounted() {
    this.$el.page = this.page || this.$el.page;

    this.$el.pageLoader = new PageLoader(
      ({page, parent, params = {}}, done) => {
        if (!page) {
          throw new Error(`PageLoader: Expected a VOnsPage Component but got "${page}" for "${parent.tagName.toLowerCase()}"`);
        }

        if (page.hasOwnProperty('_isVue')) {
          page.$parent = page.$parent || _getParentVM(parent);
        } else {
          page = new Vue({
            parent: _getParentVM(parent),
            ...page,
            mixins: [...(page.mixins || []), _inheritProps],
            computed: { ...(page.computed || {}), data: () => params }
          });
        }

        page.$mount();
        parent.appendChild(page.$el);
        done(page.$el);
      },
      (pageElement) => {
        if (pageElement._destroy instanceof Function) {
          pageElement._destroy();
        } else {
          pageElement.remove();
        }
        pageElement.__vue__ && pageElement.__vue__.$destroy();
      }
    );
  }
};

const VueTabLoader = {
  mixins: [VuePageLoader],

  mounted() {
    if (this.page === undefined) {
      const contentElement = this.$parent.$el._contentElement;
      const tabIndex = this.$el._findTabIndex();
      if (contentElement && contentElement.children.length - 1 >= tabIndex) {
        this.$el.page = contentElement.children[tabIndex].__vue__;
      }
    }
  }
};

export { VuePageLoader, VueTabLoader };
