 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {SpeedDialItem} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';

import rendersToComponent from './testUtil.js';

describe('SpeedDialItem', function() {
  rendersToComponent(
    <SpeedDialItem />,
    'ons-speed-dial-item'
  );
});
