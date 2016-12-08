 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {TabActive} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import rendersToComponent from './testUtil.js';

describe('TabActive', function() {
  rendersToComponent(
    <TabActive />,
    'ons-tab-active'
  );
});
