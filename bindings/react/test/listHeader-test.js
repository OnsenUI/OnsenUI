 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {ListHeader} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/test-utils';
import rendersToComponent from './testUtil.js';

describe('ListHeader', function() {
  rendersToComponent(
    <ListHeader dataSource={[]} />,
    'ons-list-header'
  );
});
