 /* global describe it assert */

import React from 'react';
import { Card } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('Card', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<Card />);
    setImmediate(done);
  })

  it('renders to ons-card', () => {
    expect(wrapper.find('ons-card')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<Card className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-card').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-card').prop('class')).to.equal('new-class');
    });
  });
});