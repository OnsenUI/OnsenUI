 /* global describe it assert */

import React from 'react';
import { BottomToolbar } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('BottomToolbar', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<BottomToolbar />);
    setImmediate(done);
  })

  it('renders to ons-bottom-toolbar', () => {
    expect(wrapper.find('ons-bottom-toolbar')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<BottomToolbar className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-bottom-toolbar').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-bottom-toolbar').prop('class')).to.equal('new-class');
    });
  });
});