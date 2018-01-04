import m from 'mithril';
// import ons from 'onsenui';

import '../../../build/css/onsenui.css';
import '../../../build/css/onsen-css-components.css';
import * as examples from './components/index.js';

m.mount(document.getElementById('app'), examples.NavigatorExample);
