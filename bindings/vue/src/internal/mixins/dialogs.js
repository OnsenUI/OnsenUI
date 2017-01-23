const cancelable = {
  mounted() {
    this.$el._cancel = () => {
      this.$emit('mask');
    };
  }
};

export { cancelable };

