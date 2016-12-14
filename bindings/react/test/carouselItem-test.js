 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {CarouselItem} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import rendersToComponent from './testUtil.js';

describe('CarouselItem', function() {
  rendersToComponent(
    <CarouselItem />,
    'ons-carousel-item'
  );
});
