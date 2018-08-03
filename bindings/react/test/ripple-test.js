 /* global describe it assert */

import React from 'react';
import { Ripple } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('Ripple', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<Ripple />);
    setImmediate(done);
  })

  it('renders to ons-ripple', () => {
    expect(wrapper.find('ons-ripple')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<Ripple className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-ripple').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-ripple').prop('class')).to.equal('new-class');
    });
  });
});