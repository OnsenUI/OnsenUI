import ons from 'onsenui';

import { camelize, eventToHandler, handlerToProp, capitalize } from '../internal/util';

/* Private */
const dbb = 'onDeviceBackButton';
const _setupDBB = component => {
  // Call original handler or parent handler by default
  const handler = component[dbb] || (component.$el[dbb] && component.$el[dbb]._callback) || (e => e.callParentHandler());

  component.$el[dbb] = event => {
    let runDefault = true;

    component.$emit(handlerToProp(dbb), {
      ...event,
      preventDefault: () => runDefault = false
    });

    runDefault && handler(event);
  };

  component._isDBBSetup = true;
};

/* Public */
// Device Back Button Handler
const deriveDBB = {
  emits: [handlerToProp(dbb)],
  mounted() {
    _setupDBB(this);
  },

  // Core destroys deviceBackButton handlers on disconnectedCallback.
  // This fixes the behavior for <keep-alive> component.
  activated() {
    this._isDBBSetup === false && _setupDBB(this);
  },

  deactivated() {
    this._isDBBSetup === true && (this._isDBBSetup = false);
  },

  unmounted() {
    this.$el.onDeviceBackButton && this.$el.onDeviceBackButton.destroy();
  }
};

/**
 * Returns a mixin that handles listeners for the underlying native JS element's
 * events. By default, all the native element's events are applied to the Vue
 * component. Native elements events can be removed from the Vue component by
 * setting `eventsToRemove`.
 *
 * IMPORTANT!: If `eventsToRemove` is set, `inheritAttrs: false` and
 * `v-bind="unrecognizedListeners` should be manually set on the Vue component
 * (the mixin can't handle this).
 *
 * @param {String} name - The name of the component e.g. v-ons-dialog
 * @param {Array} eventsToRemove - Array of native element event names to filter from
 * the Vue component e.g. ['dialog-cancel', 'modechange']
 */
const deriveEvents = (name, eventsToRemove = []) => {

  const nativeEvents = ons.elements[capitalize(camelize(name.slice(6)))].events || [];
  const filteredNativeEvents = nativeEvents.filter(event => eventsToRemove.indexOf(event) === -1);

  return {
    emits: filteredNativeEvents,

    computed: {
      unrecognizedListeners() {
        // Listeners are prefixed with 'on' e.g. 'onShow' so we test for that
        const isListener = ([attribute]) => /^on[^a-z]/.test(attribute);
        return Object.fromEntries(Object.entries(this.unrecognizedAttributes).filter(isListener));
      },

      unrecognizedAttributes() {
        const listenersToRemove = eventsToRemove.map(e => 'on' + capitalize(camelize(e)));
        const shouldRemove = ([attribute]) => listenersToRemove.indexOf(attribute) === -1;
        return Object.fromEntries(Object.entries(this.$attrs).filter(shouldRemove));
      }
    },

    mounted() {
      this._handlers = {};

      filteredNativeEvents.forEach(key => {
        this._handlers[eventToHandler(key)] = event => {
          // Filter events from different components with the same name
          if (event.target === this.$el || !/^ons-/i.test(event.target.tagName)) {
            this.$emit(key, event);
          }
        };
        this.$el.addEventListener(key, this._handlers[eventToHandler(key)]);
      });
    },

    beforeUnmount() {
      Object.keys(this._handlers).forEach(key => {
        this.$el.removeEventListener(key, this._handlers[key]);
      });
      this._handlers = null;
    }
  }
};

export { deriveDBB, deriveEvents };
