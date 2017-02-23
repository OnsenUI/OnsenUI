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

// Components which can have click behavior overriden
const clickable = {
  props: {
    onClick: {
      type: Function
    }
  },

  watch: {
    onClick() {
      this.$el.onClick = this.onClick;
    }
  },

  mounted() {
    this.$el.onClick = this.onClick;
  }
};

// Components that contain pages
const destroyable = {
  beforeDestroy() {
    if (this.$el._destroy instanceof Function) {
      this.$el._destroy();
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
      if (this.hasOwnProperty('_previousModifier')) {
        this._previousModifier.split(/\s+/).forEach(modifier => util.removeModifier(this.$el, modifier, { autoStyle: true }));
      }
      this.modifier.trim().split(/\s+/).forEach(modifier => util.addModifier(this.$el, modifier, { autoStyle: true }));
      this._previousModifier = this.modifier;
    }
  },

  watch: {
    modifier() {
      this._updateModifier();
    }
  },

  mounted() {
    this.modifier && this._updateModifier();
  }
};


export { hidable, clickable, destroyable, hasOptions, modifier };

