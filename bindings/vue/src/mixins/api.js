import { visibilityToggle, clickable, hasOptions } from './common';

const dialogAPI = {
  mixins: [visibilityToggle, hasOptions],

  mounted() {
    this.$el._cancel = () => {
      this.$emit('mask');
    };
  }
};

const fabAPI = {
  mixins: [clickable, visibilityToggle]
};

export { dialogAPI, fabAPI };

