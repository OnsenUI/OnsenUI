 /* global describe it assert */

import React from 'react';
import { Button } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('Button', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<Button />);
    setImmediate(done);
  })

  it('renders to ons-button', () => {
    expect(wrapper.find('ons-button')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<Button className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-button').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-button').prop('class')).to.equal('new-class');
    });
  });
});