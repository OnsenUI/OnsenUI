import { createApp } from 'vue';

import VueOnsen from 'vue-onsenui';
import * as components from 'vue-onsenui/esm/components';

import Vuex from 'vuex';

import App from './App.vue';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

const app = createApp(App);

// Register all vue-onsenui components
Object.values(components).forEach(component =>
  app.component(component.name, component));

app.use(VueOnsen);
app.use(Vuex);

app.mount('#app');
