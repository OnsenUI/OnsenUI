 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {Tabbar} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';

import rendersToComponent from './testUtil.js';

describe('Tabbar', function() {
  rendersToComponent(
    <Tabbar isCollapsed={true}
      renderTabs = {() => [] }
    />,
    'ons-tabbar'
  );
});
