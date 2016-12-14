 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {Page} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';

import rendersToComponent from './testUtil.js';

describe('Page', function() {
  rendersToComponent(
    <Page> Hello </Page>,
    'ons-page'
  );
});
