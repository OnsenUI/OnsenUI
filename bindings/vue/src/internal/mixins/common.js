const visibilityToggle = {
  props: {
    visible: {
      type: Boolean,
      default: undefined // Avoid casting to false
    }
  },

  watch: {
    visible: function() {
      if (this.visible !== this.$el.visible) {
        this.$el[this.visible ? 'show' : 'hide'].call(this.$el, this.normalizedOptions || this.options);
      }
    }
  },

  mounted() {
    this.$nextTick(() => { // FAB takes 1 cycle in showing
      if (typeof this.visible === 'boolean' && this.visible !== this.$el.visible) {
        this.$el[this.visible ? 'show' : 'hide'].call(this.$el, this.normalizedOptions || this.options);
      }
    });
  }
};

const clickable = {
  props: {
    onClick: {
      type: Function
    }
  },

  watch: {
    onClick: function() {
      this.$el.onClick = this.onClick;
    }
  },

  mounted() {
    this.$el.onClick = this.onClick;
  }
};

const hasOptions = {
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    }
  }
};

const destroyable = {
  beforeDestroy() {
    if (this.$el._destroy instanceof Function) {
      this.$el._destroy();
    }
  }
};

export { visibilityToggle, clickable, hasOptions, destroyable };

