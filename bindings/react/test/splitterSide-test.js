 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {SplitterSide} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';

import rendersToComponent from './testUtil.js';

describe('SplitterSide', function() {
  rendersToComponent(
    <SplitterSide collapse={true} />,
    'ons-splitter-side'
  );
});
