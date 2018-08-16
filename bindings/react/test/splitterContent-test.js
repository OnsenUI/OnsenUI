 /* global describe it assert */

import React from 'react';
import { SplitterContent } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('SplitterContent', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<SplitterContent />);
    setImmediate(done);
  })

  it('renders to ons-splitter-content', () => {
    expect(wrapper.find('ons-splitter-content')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<SplitterContent className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-splitter-content').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-splitter-content').prop('class')).to.equal('new-class');
    });
  });
});