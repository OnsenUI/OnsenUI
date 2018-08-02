 /* global describe it assert */

import React from 'react';
import { Tab } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('Tab', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<Tab />);
    setImmediate(done);
  })

  it('renders to ons-tab', () => {
    expect(wrapper.find('ons-tab')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<Tab className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-tab').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-tab').prop('class')).to.equal('new-class');
    });
  });
});