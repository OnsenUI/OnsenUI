<template>
  <ons-tabbar
    :on-swipe.prop="onSwipe"
    :activeIndex="index"
    :modifier="normalizedModifier"
    @prechange.self="$nextTick(() => !$event.detail.canceled && $emit('update:index', $event.index))"
  >
    <div class="tabbar__content">
      <div>
        <slot name="pages">
          <component v-for="tab in tabs" v-bind="{ ...unrecognizedListeners, ...tab.props }" :is="tab.page" :key="(tab.page.key || tab.page.name || _tabKey(tab))"></component>
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
  import TabbarElement from 'onsenui/esm/elements/ons-tabbar.js';
  import { deriveEvents, hasOptions, hidable, selfProvider, modifier, unrecognizedListeners } from '../mixins/index.js';

  const name = 'v-ons-tabbar';

  export default {
    name,
    mixins: [deriveEvents(name), hasOptions, hidable, selfProvider, modifier, unrecognizedListeners(TabbarElement)],
    emits: ['update:index'],

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
