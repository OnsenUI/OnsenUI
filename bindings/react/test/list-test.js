 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {List} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import rendersToComponent from './testUtil.js';

describe('List', function() {
  rendersToComponent(
    <List dataSource={[]} renderRow={() => <div />} />,
    'ons-list'
  );
});

describe('List without dataSource attributes', function() {
  rendersToComponent(
    <List />,
    'ons-list'
  );
});
