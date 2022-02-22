 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {BackButton} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/test-utils';

import rendersToComponent from './testUtil.js';

describe('BackButon', function() {
  rendersToComponent(
    <BackButton />,
    'ons-back-button'
  );
});
