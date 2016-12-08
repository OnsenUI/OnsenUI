 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {ToolbarButton} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';

import rendersToComponent from './testUtil.js';

describe('ToolbarButon', function() {
  rendersToComponent(
    <ToolbarButton />,
    'ons-toolbar-button'
  );
});
