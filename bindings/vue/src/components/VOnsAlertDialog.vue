<template>
  <ons-alert-dialog>
    <div class="alert-dialog-title">
      <slot name="title">{{title}}</slot>
    </div>
    <div class="alert-dialog-content">
      <slot></slot>
    </div>
    <div class="alert-dialog-footer">
      <slot name="footer">
        <button v-for="(handler, key) in footer" class="alert-dialog-button" @click="handler">{{key}}</button>
      </slot>
    </div>
  </ons-alert-dialog>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../internal/mixins/derive';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties],

    props: {
      title: {
        type: String
      },
      footer: {
        type: Object,
        validator: function(value) {
          const buttons = Object.keys(value);
          for (let i = 0; i < buttons.length; i++) {
            if (!(value[buttons[i]] instanceof Function)) {
              return false;
            }
          }
          return true;
        }
      }
    },

    beforeMount() {
      this._addButtonClasses = () => {
        if (!this.$slots.hasOwnProperty('footer')) return;
        this.$slots.footer.forEach(el => el.data && (el.data.staticClass = (el.data.staticClass || '') + ' alert-dialog-button'));
      };

      this._addButtonClasses();
    },

    beforeUpdate() {
      this._addButtonClasses();
    }
  };
</script>
