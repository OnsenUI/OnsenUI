 /* global describe it assert */

import React from 'react';
import { SpeedDial } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('SpeedDial', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<SpeedDial />);
    setImmediate(done);
  })

  it('renders to ons-speed-dial', () => {
    expect(wrapper.find('ons-speed-dial')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<SpeedDial className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-speed-dial').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-speed-dial').prop('class')).to.equal('new-class');
    });
  });
});