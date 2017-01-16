import Vue from 'vue';
import ons from 'onsenui';
import { createMethodsFor, createComputedPropertiesFor } from './optionsObjectHelper.js';

const _getClassFrom = tagName => {
  let className = tagName.toLowerCase().slice(4);
  className = className.charAt(0).toUpperCase() + className.slice(1) + 'Element';
  return ons[className]
};

const deriveEvents = {
  mounted() {
    _getClassFrom(this.$el.tagName).events.forEach(key => {
      this.$el.addEventListener(key, this.$emit.bind(this, key));
    });
  },
  beforeDestroy() {
    _getClassFrom(this.$el.tagName).events.forEach(key => {
      this.$el.removeEventListener(key, this.$emit.bind(this, key));
    });
  }
};

const deriveMethods = {
  beforeCreate() {
    this.$options.methods = Object.assign({}, createMethodsFor(_getClassFrom(this.$options._componentTag.slice(2))), this.$options.methods);
  }
};

const deriveProperties = {
  beforeCreate() {
    this.$options.computed = Object.assign({}, createComputedPropertiesFor(_getClassFrom(this.$options._componentTag.slice(2))), this.$options.computed);
  }
};

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

const VuePageLoader = {
  props: {
    page: {
      type: Object
    }
  },

  mounted() {
    this.$el.page = this.page;

    this.$el.pageLoader = new ons.PageLoader(
      ({page, parent}, done) => {
        if (page.hasOwnProperty('_isVue')) {
          page.$parent = page.$parent || _getParentVM(parent);
        } else {
          page = new Vue(Object.assign(
            { parent: _getParentVM(parent) },
            page
          ));
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
        pageElement.__vue__.$destroy();
      }
    );
  }
}

export { deriveEvents, deriveMethods, deriveProperties, VuePageLoader };
