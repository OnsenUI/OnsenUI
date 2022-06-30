// Common event for Dialogs
const dialogCancel = {
  emits: ['update:visible'],
  mounted() {
    this._dialogCancelHandler = () => this.$emit('update:visible', false);
    this.$el.addEventListener('dialogcancel', this._dialogCancelHandler);
  },
  beforeDestroy() {
    this.$el.removeEventListener('dialogcancel', this._dialogCancelHandler);
  }
};

const dialogOrderedProps = {
  inheritAttrs: false,
  computed: {
    orderedProps() {
      // visible prop should be applied last since it depends on animation and
      // maskColor props being set first
      const { visible, ...rest } = this.$attrs;
      return { ...rest, visible };
    }
  }
};

const dialog = {
  mixins: [dialogCancel, dialogOrderedProps]
};

export { dialog };
