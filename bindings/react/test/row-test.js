 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {Row} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import rendersToComponent from './testUtil.js';

describe('Row', function() {
  rendersToComponent(
    <Row />,
    'ons-row'
  );
});
