 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {Card} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/test-utils';
import rendersToComponent from './testUtil.js';

describe('Card', function() {
  rendersToComponent(
    <Card />,
    'ons-card'
  );
});
