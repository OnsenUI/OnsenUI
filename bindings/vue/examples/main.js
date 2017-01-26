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
    <ons-page>
      <ons-list>
        <ons-list-item v-for="(example, key) in examples" @click="changeExample(key)" modifier="chevron">
          <div class="center">{{ key }}</div>
        </ons-list-item>
      </ons-list>
    </ons-page>
  </div>
  `,
  props: ['examples', 'changeExample']
};

const vm = new Vue({
  el: '#app',
  components: { ...examples },
  template: `
    <ons-page>
      <ons-toolbar>
        <div class="left"><ons-back-button @click="backToList" v-show="currentView !== mainList">Main List</ons-back-button></div>
        <div class="center">{{ title }}</div>
      </ons-toolbar>

      <div class="content">
        <keep-alive>
          <div :is="currentView" :examples="examples" :changeExample="changeExample"></div>
        </keep-alive>
      </div>
    </ons-page>
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
