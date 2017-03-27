import { _util as util } from 'onsenui';

/* Private */
const _toggleVisibility = function() {
  if (this.visible !== this.$el.visible) {
    this.$el[this.visible ? 'show' : 'hide'].call(this.$el, this.normalizedOptions || this.options);
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
    this.$nextTick(() => { // FAB takes 1 extra cycle
      if (typeof this.visible === 'boolean') {
        _toggleVisibility.call(this);
      }
    });
  }
};

// Components that contain pages
const destroyable = {
  inject: ['navigator'],
  beforeDestroy() {
    if (this.$el._destroy instanceof Function) {
      // FIXME: Destroy after animations end
      let duration = this.navigator
        && this.navigator.options.animationOptions
        && this.navigator.options.animationOptions.duration
        || 0;

      setTimeout(() => this.$el._destroy(), ++duration * 1000)
    }
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

// Components with 'modifier' attribute
const modifier = {
  props: {
    modifier: {
      type: String,
      default: ''
    }
  },

  methods: {
    _updateModifier() {
      const preset = this._md ? ['material'] : [];

      // Remove
      (this._previousModifier || '').split(/\s+/).concat(preset)
        .forEach(m => util.removeModifier(this.$el, m, { autoStyle: true }));

      // Add
      this.modifier.trim().split(/\s+/).concat(preset)
        .forEach(m => m && util.addModifier(this.$el, m, { autoStyle: true }));

      this._previousModifier = this.modifier;
    }
  },

  watch: {
    modifier() {
      this._updateModifier();
    }
  },

  mounted() {
    this._md = /^material$/.test(this.$el.getAttribute('modifier'));
    this._updateModifier();
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
    this.$on('dialog-cancel', () => this.$emit('update', false));
  }
};

export { hidable, destroyable, hasOptions, modifier, selfProvider, dialogCancel };
