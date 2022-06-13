// Generic input
const modelInput = {
  emits: ['update:modelValue'],

  props: {
    modelValue: [Number, String],
    modelEvent: {
      type: String,
      default: 'input'
    }
  },

  methods: {
    _updateValue() {
      if (this.modelValue !== undefined && this.$el.value !== this.modelValue) {
        this.$el.value = this.modelValue;
      }
    },
    _onModelEvent(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  },

  watch: {
    modelValue() {
      this._updateValue();
    }
  },

  mounted() {
    this._updateValue();
    this.$el.addEventListener(this.modelEvent, this._onModelEvent);
  },
  beforeDestroy() {
    this.$el.removeEventListener(this.modelEvent, this._onModelEvent);
  }
};

// Input with number value
const modelInputNumber = {
  mixins: [modelInput],
  methods: {
    _onModelEvent(event) {
      this.$emit('update:modelValue', event.target.valueAsNumber);
    }
  }
}

// Checkable inputs
const modelCheckbox = {
  mixins: [modelInput],

  props: {
    modelValue: [Array, Boolean],
    modelEvent: {
      type: String,
      default: 'change'
    }
  },

  methods: {
    _updateValue() {
      if (this.modelValue instanceof Array) {
        this.$el.checked = this.modelValue.indexOf(this.$el.value) >= 0;
      } else {
        this.$el.checked = this.modelValue;
      }
    },
    _onModelEvent(event) {
      const { value, checked } = event.target;
      let newValue;

      if (this.modelValue instanceof Array) {
        // Is Array
        const index = this.modelValue.indexOf(value);
        const included = index >= 0;

        if (included && !checked) {
          newValue = [
            ...this.modelValue.slice(0, index),
            ...this.modelValue.slice(index + 1, this.modelValue.length)
          ];
        }

        if (!included && checked) {
          newValue = [ ...this.modelValue, value ];
        }

      } else {
        // Is Boolean
        newValue = checked;
      }

      // Emit if value changed
      newValue !== undefined && this.$emit('update:modelValue', newValue);
    }
  }
};

// Radio input
const modelRadio = {
  mixins: [modelInput],
  props: {
    modelEvent: {
      type: String,
      default: 'change'
    }
  },

  methods: {
    _updateValue() {
      this.$el.checked = this.modelValue === this.$el.value;
    },
    _onModelEvent(event) {
      const { value, checked } = event.target;
      checked && this.$emit('update:modelValue', value);
    }
  }
};

export { modelInput, modelInputNumber, modelCheckbox, modelRadio };

