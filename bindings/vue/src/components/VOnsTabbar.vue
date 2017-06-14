<template>
  <ons-tabbar :activeIndex="index" @postchange.self="$emit('update:index', $event.index)">
    <div class="tabbar__content">
      <slot name="pages">
        <component v-for="tab in tabs" v-bind="tab.props" :is="tab.page" :key="(tab.key || tab.page)"></component>
      </slot>
    </div>
    <div class="tabbar">
      <slot>
        <v-ons-tab v-for="tab in tabs" v-bind="tab" :key="(tab.key || tab)"></v-ons-tab>
      </slot>
    </div>
  </ons-tabbar>
</template>

<script>
  import { deriveEvents, hasOptions, hidable, selfProvider } from '../mixins';

  export default {
    mixins: [deriveEvents, hasOptions, hidable, selfProvider],

    props: {
      index: {
        type: Number
      },
      tabs: {
        type: Array,
        validator(value) {
          return value.every(tab => ['icon', 'label', 'page'].some(prop => !!Object.getOwnPropertyDescriptor(tab, prop)));
        }
      }
    },

    watch: {
      index() {
        if (this.index !== this.$el.getActiveTabIndex()) {
          this.$el.setActiveTab(this.index, this.options);
        }
      }
    }
  };
</script>
