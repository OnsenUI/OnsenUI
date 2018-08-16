 /* global describe it assert */

import React from 'react';
import { ListHeader } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('ListHeader', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<ListHeader>header</ListHeader>);
    setImmediate(done);
  })

  it('renders to ons-list-header', () => {
    expect(wrapper.find('ons-list-header')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<ListHeader className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-list-header').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-list-header').prop('class')).to.equal('new-class');
    });
  });
});