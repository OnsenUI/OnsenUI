import Vue from 'vue';
import { eventToHandler } from '../internal/util';
import { getHandlers } from '../internal/optionsObjectHelper';

/* Private */
const _dbb = 'onDeviceBackButton';
const _getEventName = name => name.slice(2).charAt(0).toLowerCase() + name.slice(2).slice(1);
const _setupDBB = component => {
  // Call original handler or parent handler by default
  const handler = (component.$el[_dbb] && component.$el[_dbb]._callback) || (e => e.callParentHandler());

  component.$el[_dbb] = event => {
    const id = setTimeout(handler.bind(component.$el, event), 0);
    component.$emit(_getEventName(_dbb), {
      ...event,
      preventDefault: () => clearTimeout(id)
    });
  };

  component._isDBBSetup = true;
};

/* Public */
const deriveHandlers = {
  mounted() {
    getHandlers(this.$el.constructor.__proto__).forEach(prop => {
      if (prop === _dbb) {
        _setupDBB(this);
      } else if (!this.$el[prop]) {
        this.$el[prop] = (...args) => this.$emit(_getEventName(prop), ...args);
      }
    });
  },

  // Core destroys deviceBackButton handlers on disconnectedCallback.
  // This fixes the behavior for <keep-alive> component.
  activated() {
    this._isDBBSetup === false && _setupDBB(this);
  },
  deactivated() {
    this._isDBBSetup === true && (this._isDBBSetup = false);
  }
};

const deriveEvents = {
  mounted() {
    this._handlers = {};
    this._boundEvents = this.$el.constructor.__proto__.events || [];

    this._boundEvents.forEach(key => {
      this._handlers[eventToHandler(key)] = event => {
        // Filter events from different components with the same name
        if (event.target === this.$el || !/^ons-/i.test(event.target.tagName)) {
          this.$emit(key, event);
        }
      };
      this.$el.addEventListener(key, this._handlers[eventToHandler(key)]);
    });
  },

  beforeDestroy() {
    this._boundEvents.forEach(key => {
      this.$el.removeEventListener(key, this._handlers[eventToHandler(key)]);
    });
    this._handlers = this._boundEvents = null;
  }
};

export { deriveEvents, deriveHandlers };
