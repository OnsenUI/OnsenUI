 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {BottomToolbar} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';

import rendersToComponent from './testUtil.js';

describe('B', function() {
  rendersToComponent(
    <BottomToolbar />,
    'ons-bottom-toolbar'
  );
});
