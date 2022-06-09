<template>
  <v-ons-page>
    <v-ons-toolbar>

      <div class="left">
        <v-ons-toolbar-button
          @click.prevent="backToList"
          v-show="currentView !== initialView"
        >
          Main list
        </v-ons-toolbar-button>
      </div>

      <div class="center">{{ title }}</div>
    </v-ons-toolbar>

    <div class="content">
      <keep-alive>
        <component
          :is="currentView"
          :examples="examplesKeys"
          @changeExample="changeExample"
        ></component>
      </keep-alive>
    </div>
  </v-ons-page>
</template>

<script>

import { markRaw } from 'vue';

import * as examples from './components';
import MainList from './MainList.vue';

export default {
  name: 'App',

  data() {
    const initialView = markRaw(MainList);

    return {
      initialView,
      examples,
      title: 'Main List',
      currentView: initialView
    }
  },

  computed: {
    examplesKeys() {
      return Object.keys(this.examples);
    }
  },

  methods: {
    changeExample(key) {
      this.title = key;
      this.currentView = markRaw(this.examples[key]);
    },
    backToList() {
      this.title = 'Main List';
      this.currentView = this.initialView;
    }
  }
}
</script>
