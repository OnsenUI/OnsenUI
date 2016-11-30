 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {SpeedDial} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';

import rendersToComponent from './testUtil.js';

describe('SpeedDial', function() {
  rendersToComponent(
    <SpeedDial />,
    'ons-speed-dial'
  );
});
