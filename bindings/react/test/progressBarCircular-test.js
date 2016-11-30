 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {ProgressCircular} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';

import rendersToComponent from './testUtil.js';

describe('ProgressCircular', function() {
  rendersToComponent(
    <ProgressCircular />,
    'ons-progress-circular'
  );
});
