<template>
  <div>
    <div
      class="tabbar__content"
      :class="{
        'tabbar--material__content': isAndroid
      }">
      <div
        v-for="tab in tabs"
        v-show="index === $index"
        :is="tab.component">
      </div>
    </div>
    <div
      class="tabbar"
      :class="{
        'tabbar--material': isAndroid
      }">
      <label
        class="tabbar__item"
        :class="{
          'tabbar--material__item': isAndroid
        }"
        v-for="tab in tabs">
        <input
          type="radio"
          :checked="$index === index"
          @change="onChange($event, $index)"
          name="tabbar-{{ key }}">
        <button
            class="tabbar__button"
            :class="{
              'tabbar--material__button': isAndroid
            }">
          <ons-icon
            class="tabbar__icon"
            :class="{
              'tabbar--material__icon': isAndroid
            }"
            v-if="tab.icon"
            :icon="tab.icon">
          </ons-icon>
          <div
            class="tabbar__label"
            :class="{
              'tabbar--material__label': isAndroid
            }">{{ tab.label }}</div>
        </button>
      </label>
    </div>
  </div>
</template>

<script>
  import {platform} from 'onsenui';

  const generateKey = () => Math.random().toString(16).substr(2);

  export default {
    props: {
      tabs: {
        type: Array,
        default: () => []
      },

      index: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        isAndroid: platform.isAndroid()
      };
    },

    created() {
      this.key = generateKey();
    },

    methods: {
      onChange(event, index) {
        event.stopPropagation();
        this.$emit('tab-change', {index});
      }
    }
  };
</script>
