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
          <component v-for="tab in tabs" v-bind="{ ...unrecognizedListeners, ...tab.props }" :is="tab.page" :key="(tab.page.key || tab.page.name || _tabKey(tab))" />
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

  const name = 'v-ons-tabbar';

  export default {
    name,
    mixins: [deriveEvents(name), hasOptions, hidable, selfProvider, modifier],

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
      },
      tabs: {
        handler() {
          // Set inheritAttrs to false to stop custom event listeners being
          // applied to the native ons-page element. They are already applied to
          // the native ons-tabbar element (which will fire native ons-page
          // events due to bubbling) so without this listeners for events fired
          // by ons-page (e.g. 'show') would be called twice.
          this.tabs.forEach(tab => tab.page.inheritAttrs = false);
        },
        immediate: true
      }
    }
  };
</script>
