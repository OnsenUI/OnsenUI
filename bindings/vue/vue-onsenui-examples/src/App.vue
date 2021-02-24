<template>
  <v-ons-page>
    <v-ons-toolbar>

      <div class="left">
        <v-ons-toolbar-button
          @click.prevent="backToList"
          v-show="currentView !== mainList"
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
          :examples="examples"
          :changeExample="changeExample"
        ></component>
      </keep-alive>
    </div>
  </v-ons-page>
</template>

<script>

import * as examples from './components';
import MainList from './MainList.vue';

export default {
  name: 'App',

  data() {
    return {
      MainList,
      examples,
      title: 'Main List',
      currentView: MainList
    }
  },

  methods: {
    changeExample(key) {
      this.title = key;
      this.currentView = this.examples[key];
    },
    backToList() {
      this.title = 'Main List';
      this.currentView = MainList;
    }
  }
}
</script>
