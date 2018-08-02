 /* global describe it assert */

import React from 'react';
import { Fab } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('Fab', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<Fab />);
    setImmediate(done);
  })

  it('renders to ons-fab', () => {
    expect(wrapper.find('ons-fab')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<Fab className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-fab').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-fab').prop('class')).to.equal('new-class');
    });
  });
});