/* Private */
const model = {
  prop: 'modelProp',
  event: 'modelEvent'
};

/* Public */

// Generic input
const modelInput = {
  model,
  props: {
    [model.prop]: [Number, String],
    [model.event]: {
      type: String,
      default: 'input'
    }
  },

  methods: {
    _updateValue() {
      if (this[model.prop] !== undefined && this.$el.value !== this[model.prop]) {
        this.$el.value = this[model.prop];
      }
    },
    _onModelEvent(event) {
      this.$emit(model.event, event.target.value);
    }
  },

  watch: {
    [model.prop]() {
      this._updateValue();
    }
  },

  mounted() {
    this._updateValue();
    this.$el.addEventListener(this[model.event], this._onModelEvent);
  },
  beforeDestroy() {
    this.$el.removeEventListener(this[model.event], this._onModelEvent);
  }
};

// Checkable inputs
const modelCheckbox = {
  mixins: [modelInput],

  props: {
    [model.prop]: [Array, Boolean],
    [model.event]: {
      type: String,
      default: 'change'
    }
  },

  methods: {
    _updateValue() {
      if (this[model.prop] instanceof Array) {
        this.$el.checked = this[model.prop].indexOf(this.$el.value) >= 0;
      } else {
        this.$el.checked = this[model.prop];
      }
    },
    _onModelEvent(event) {
      const { value, checked } = event.target;
      let newValue;

      if (this[model.prop] instanceof Array) {
        // Is Array
        const index = this[model.prop].indexOf(value);
        const included = index >= 0;

        if (included && !checked) {
          newValue = [
            ...this[model.prop].slice(0, index),
            ...this[model.prop].slice(index + 1, this[model.prop].length)
          ];
        }

        if (!included && checked) {
          newValue = [ ...this[model.prop], value ];
        }

      } else {
        // Is Boolean
        newValue = checked;
      }

      // Emit if value changed
      newValue !== undefined && this.$emit(model.event, newValue);
    }
  }
};

// Radio input
const modelRadio = {
  mixins: [modelInput],
  props: {
    [model.event]: {
      type: String,
      default: 'change'
    }
  },

  methods: {
    _updateValue() {
      this.$el.checked = this[model.prop] === this.$el.value;
    },
    _onModelEvent(event) {
      const { value, checked } = event.target;
      checked && this.$emit(model.event, value);
    }
  }
};

export { modelInput, modelCheckbox, modelRadio };

