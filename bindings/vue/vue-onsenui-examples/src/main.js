import Vue from 'vue';
import * as examples from './components';

import VueOnsen from 'vue-onsenui'; // umd

// import VueOnsen from 'vue-onsenui/esm'; // esm
// // import * as VOns from 'vue-onsenui/esm/components';
// // Object.values(VOns).forEach(component => Vue.component(component.name, component));
// import VOnsPage from '../src/components/VOnsPage';
// import VOnsToolbar from '../src/components/VOnsToolbar';
// Vue.component(VOnsPage.name, VOnsPage);
// Vue.component(VOnsToolbar.name, VOnsToolbar);

Vue.use(VueOnsen);

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
        <div class="left"><v-ons-toolbar-button @click.prevent="backToList" v-show="currentView !== mainList">Main list</v-ons-toolbar-button></div>
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
