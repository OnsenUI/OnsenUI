 /* global describe it assert */

import React from 'react';
import {SplitterMask} from '../dist/react-onsenui.js';

import rendersToComponent from './testUtil.js';

describe('SplitterMask', function() {
  rendersToComponent(
    <SplitterMask />,
    'ons-splitter-mask'
  );
});
