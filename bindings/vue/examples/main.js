import Vue from 'vue';
import 'onsenui';

import '../../../build/css/onsenui.css';
import '../../../build/css/onsen-css-components.css';

import VueOnsen from 'vue-onsenui';

import * as examples from './components';
Vue.use(VueOnsen, {
	components: { ...examples }
});

const mainList = {
  template: `
  <div>
    <v-ons-page>
      <v-ons-list>
        <v-ons-list-item v-for="(example, key) in examples" :key="key" @click="changeExample(key)" modifier="chevron">
          <div class="center">{{ key }}</div>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-page>
  </div>
  `,
  props: ['examples', 'changeExample']
};

const vm = new Vue({
  el: '#app',
  components: { ...examples },
  template: `
    <v-ons-page>
      <v-ons-toolbar>
        <div class="left"><v-ons-back-button @click.prevent="backToList" v-show="currentView !== mainList">Main List</v-ons-back-button></div>
        <div class="center">{{ title }}</div>
      </v-ons-toolbar>

      <div class="content">
        <keep-alive>
          <div :is="currentView" :examples="examples" :changeExample="changeExample"></div>
        </keep-alive>
      </div>
    </v-ons-page>
  `,

  data: {
    mainList,
    examples,
    title: 'Main List',
    currentView: mainList
  },

  methods: {
    changeExample(key) {
      this.title = key;
      this.currentView = this.examples[key];
    },
    backToList() {
      this.title = 'Main List';
      this.currentView = mainList;
    }
  }
});
