 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {Range} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';

import rendersToComponent from './testUtil.js';

describe('Range', function() {
  rendersToComponent(
    <Range />,
    'ons-range'
  );
});
