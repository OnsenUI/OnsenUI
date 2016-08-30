<template>
  <div>
    <div
      class="tab-bar__content"
      :class="{
        'tab-bar--material__content': isAndroid
      }">
      <div
        v-for="tab in tabs"
        v-show="index === $index"
        :is="tab.component">
      </div>
    </div>
    <div
      class="tab-bar"
      :class="{
        'tab-bar--material': isAndroid
      }">
      <label
        class="tab-bar__item"
        :class="{
          'tab-bar--material__item': isAndroid
        }"
        v-for="tab in tabs">
        <input
          type="radio"
          :checked="$index === index"
          @change="onChange($event, $index)"
          name="tab-bar-{{ key }}">
        <button
            class="tab-bar__button"
            :class="{
              'tab-bar--material__button': isAndroid
            }">
          <ons-icon
            class="tab-bar__icon"
            :class="{
              'tab-bar--material__icon': isAndroid
            }"
            v-if="tab.icon"
            :icon="tab.icon">
          </ons-icon>
          <div
            class="tab-bar__label"
            :class="{
              'tab-bar--material__label': isAndroid
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
