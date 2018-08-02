 /* global describe it assert */

import React from 'react';
import { Col } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('Col', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<Col />);
    setImmediate(done);
  })

  it('renders to ons-col', () => {
    expect(wrapper.find('ons-col')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<Col className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-col').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-col').prop('class')).to.equal('new-class');
    });
  });
});