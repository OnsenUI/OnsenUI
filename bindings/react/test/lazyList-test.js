 /* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import {Page, LazyList} from '../dist/react-onsenui.js';
import TestUtils from 'react-dom/lib/ReactTestUtils';

import rendersToComponent from './testUtil.js';

describe('LazyList', function() {
  it(`renders to <${name}>`, () => {
    // lazy repeat needs to be inside page
    var root = TestUtils.renderIntoDocument(
      <Page>
      <LazyList
         length={1}
         renderRow={() => <div key={1} />}
         calculateItemHeight={() => 45}
       />
     </Page>

     );
    var node = ReactDOM.findDOMNode(root);
    assert.isNotNull(node);
    assert.equal(node.nodeName, 'ONS-PAGE');
    assert.equal(node.children[1].firstChild.nodeName, 'ONS-LIST');
  });
});
