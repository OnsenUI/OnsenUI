 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {TabInactive} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import rendersToComponent from './testUtil.js';

describe('TabInactive', function() {
  rendersToComponent(
    <TabInactive />,
    'ons-tab-inactive'
  );
});
