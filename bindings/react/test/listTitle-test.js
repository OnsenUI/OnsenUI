 /* global describe it assert */

import React from 'react';
import { ListTitle } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('ListTitle', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<ListTitle />);
    setImmediate(done);
  })

  it('renders to ons-list-title', () => {
    expect(wrapper.find('ons-list-title')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<ListTitle className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-list-title').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-list-title').prop('class')).to.equal('new-class');
    });
  });
});