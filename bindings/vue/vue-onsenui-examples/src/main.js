import { createApp } from 'vue';

import VueOnsen from 'vue-onsenui'; // umd
import Vuex from 'vuex';

import App from './App.vue';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

// import VueOnsen from 'vue-onsenui/esm'; // esm
// // import * as VOns from 'vue-onsenui/esm/components';
// // Object.values(VOns).forEach(component => Vue.component(component.name, component));
// import VOnsPage from '../src/components/VOnsPage';
// import VOnsToolbar from '../src/components/VOnsToolbar';
// Vue.component(VOnsPage.name, VOnsPage);
// Vue.component(VOnsToolbar.name, VOnsToolbar);

const app = createApp(App);

app.use(VueOnsen);
app.use(Vuex);

app.mount('#app');
