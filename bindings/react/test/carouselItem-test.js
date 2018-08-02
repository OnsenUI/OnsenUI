 /* global describe it assert */

import React from 'react';
import { CarouselItem } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('CarouselItem', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<CarouselItem />);
    setImmediate(done);
  })

  it('renders to ons-carousel-item', () => {
    expect(wrapper.find('ons-carousel-item')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<CarouselItem className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-carousel-item').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-carousel-item').prop('class')).to.equal('new-class');
    });
  });
});