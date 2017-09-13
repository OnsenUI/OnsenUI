import { _util as util } from 'onsenui';

/* Private */
const _toggleVisibility = function() {
  if (typeof this.visible === 'boolean' && this.visible !== this.$el.visible) {
    this.$el[this.visible ? 'show' : 'hide'].call(this.$el, this.normalizedOptions || this.options);
  }
};
const _teleport = function() {
  if (!this._isDestroyed && (!this.$el.parentNode || this.$el.parentNode !== document.body)) {
    document.body.appendChild(this.$el);
  }
};
const _unmount = function() {
  if (this.$el.visible === true) {
    this.$el.hide().then(() => this.$el.remove());
  } else {
    this.$el.remove();
  }
};

/* Public */
// Components that can be shown or hidden
const hidable = {
  props: {
    visible: {
      type: Boolean,
      default: undefined // Avoid casting to false
    }
  },

  watch: {
    visible() {
      _toggleVisibility.call(this);
    }
  },

  mounted() {
    this.$nextTick(() => _toggleVisibility.call(this));
  },

  activated() {
    this.$nextTick(() => _toggleVisibility.call(this));
  }
};

// Components with 'options' property
const hasOptions = {
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};

// Provides itself to its descendants
const selfProvider = {
  provide() {
    return {
      [this.$options._componentTag.slice(6)]: this
    }
  }
};

// Common event for Dialogs
const dialogCancel = {
  mounted() {
    this.$on('dialog-cancel', () => this.$emit('update:visible', false));
  }
};

// Moves the element to a global position
const portal = {
  mounted() {
    _teleport.call(this);
  },
  updated() {
    _teleport.call(this);
  },
  activated() {
    _teleport.call(this);
  },
  deactivated() {
    _unmount.call(this);
  },
  beforeDestroy() {
    _unmount.call(this);
  }
};

export { hidable, hasOptions, selfProvider, dialogCancel, portal };
