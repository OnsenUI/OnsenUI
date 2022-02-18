 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {ListItem} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/test-utils';
import rendersToComponent from './testUtil.js';

describe('ListItem', function() {
  rendersToComponent(
    <ListItem dataSource={[]} renderRow={() => <div />} />,
    'ons-list-item'
  );
});
