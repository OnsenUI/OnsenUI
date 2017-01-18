import Vue from 'vue';
import ons from 'onsenui';
import { createMethodsFor, createComputedPropertiesFor } from './optionsObjectHelper.js';

const _hyphenate = string => string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const _camelize = string => string.toLowerCase().replace(/-([a-z])/g, (m, l) => l.toUpperCase());
const _getClassFrom = tagName => {
  const className = _camelize(tagName.slice(3)) + 'Element';
  return ons[className];
};

const _eventToHandler = name => '_on' + name.charAt(0).toUpperCase() + name.slice(1);

const deriveEvents = {
  beforeCreate() {
    this._boundEvents = _getClassFrom(this.$options._componentTag.slice(2)).events || ['click'];
    this.$options.methods = Object.assign({}, this._boundEvents.reduce((result, key) => {
      result[_eventToHandler(key)] = event => this.$emit(key, event);
      return result;
    }, {}));
  },
  mounted() {
    this._boundEvents.forEach(key => {
      this.$el.addEventListener(key, this[_eventToHandler(key)]);
    });
  },
  beforeDestroy() {
    this._boundEvents.forEach(key => {
      this.$el.removeEventListener(key, this[_eventToHandler(key)]);
    });
    this._boundEvents = null;
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

const _inheritProps = {
  beforeCreate() {
    if (!this.$options.hasOwnProperty('props')) {
      return;
    }

    const parentVnode = this.$options.parent.$options._parentVnode;
    const parentProps = Object.assign({}, parentVnode.data.attrs, parentVnode.componentOptions.propsData);
    this.$options.propsData = Object.assign(
      Object.keys(this.$options.props).reduce((result, key) => {
        const hyphenKey = _hyphenate(key);
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
            {
              parent: _getParentVM(parent)
            },
            page,
            {
              mixins: (page.mixins || []).concat([_inheritProps])
            }
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
