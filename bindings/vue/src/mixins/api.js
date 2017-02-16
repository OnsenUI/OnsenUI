import { hidable, clickable, hasOptions } from './common';

const dialogAPI = {
  mixins: [hidable, hasOptions],

  mounted() {
    this.$el._cancel = () => {
      this.$emit('mask');
    };
  }
};

const fabAPI = {
  mixins: [clickable, hidable]
};

export { dialogAPI, fabAPI };

