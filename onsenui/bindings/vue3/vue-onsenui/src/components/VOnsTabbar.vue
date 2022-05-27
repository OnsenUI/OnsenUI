<template>
  <ons-tabbar
    :on-swipe.prop="onSwipe"
    :activeIndex="index"
    :modifier="normalizedModifier"
    v-on="unrecognizedListeners"
    @prechange.self="$nextTick(() => !$event.detail.canceled && $emit('update:index', $event.index))"
  >
    <div class="tabbar__content">
      <div>
        <slot name="pages">
          <component v-for="tab in tabs" v-bind="tab.props" :is="tab.page" :key="(tab.page.key || tab.page.name || _tabKey(tab))" v-on="unrecognizedListeners"></component>
        </slot>
      </div>
      <div></div>
    </div>
    <div class="tabbar" :style="tabbarStyle">
      <slot>
        <v-ons-tab v-for="tab in tabs" v-bind="tab" :key="_tabKey(tab)"></v-ons-tab>
      </slot>
      <div class="tabbar__border"></div>
    </div>
  </ons-tabbar>
</template>

<script>
  import 'onsenui/esm/elements/ons-tabbar';
  import { deriveEvents, hasOptions, hidable, selfProvider, modifier } from '../mixins';

  export default {
    name: 'v-ons-tabbar',
    mixins: [deriveEvents, hasOptions, hidable, selfProvider, modifier],

    props: {
      index: {
        type: Number
      },
      tabs: {
        type: Array,
        validator(value) {
          return value.every(tab => ['icon', 'label', 'page'].some(prop => !!Object.getOwnPropertyDescriptor(tab, prop)));
        }
      },
      onSwipe: {
        type: Function
      },
      tabbarStyle: {
        type: null
      }
    },

    methods: {
      _tabKey(tab) {
        return tab.key || tab.label || tab.icon;
      }
    },

    watch: {
      index() {
        if (this.index !== this.$el.getActiveTabIndex()) {
          this.$el.setActiveTab(this.index, { reject: false, ...this.options });
        }
      }
    }
  };
</script>
