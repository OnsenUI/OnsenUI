 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {Col} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import rendersToComponent from './testUtil.js';

describe('Col', function() {
  rendersToComponent(
    <Col />,
    'ons-col'
  );
});
