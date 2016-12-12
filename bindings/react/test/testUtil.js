/* global describe it assert */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/lib/ReactTestUtils';

export default (component, name) => {
  it(`renders to <${name}>`, () => {
    var root = TestUtils.renderIntoDocument(component);
    var node = ReactDOM.findDOMNode(root);
    assert.isNotNull(node);
    assert.equal(node.nodeName, name.toUpperCase());
  });
};

