 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {ProgressBar} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';

import rendersToComponent from './testUtil.js';

describe('ProgressBar', function() {
  rendersToComponent(
    <ProgressBar />,
    'ons-progress-bar'
  );
});
