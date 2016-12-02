 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {SplitterContent} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';

import rendersToComponent from './testUtil.js';

describe('SplitterContent', function() {
  rendersToComponent(
    <SplitterContent />,
    'ons-splitter-content'
  );
});
