const dialogsAPI = {
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    },
    visible: {
      type: Boolean
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
    this.$el._cancel = () => {
      this.$emit('mask');
    };

    if (this.visible === true) {
      this.$el.show();
    }
  }
};

export { dialogsAPI };

