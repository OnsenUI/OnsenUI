 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {CarouselItem} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/test-utils';
import rendersToComponent from './testUtil.js';

describe('CarouselItem', function() {
  rendersToComponent(
    <CarouselItem />,
    'ons-carousel-item'
  );
});
