 /* global describe it assert */

import React from 'react';
import { ToolbarButton } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('ToolbarButton', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<ToolbarButton />);
    setImmediate(done);
  })

  it('renders to ons-toolbar-button', () => {
    expect(wrapper.find('ons-toolbar-button')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<ToolbarButton className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-toolbar-button').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-toolbar-button').prop('class')).to.equal('new-class');
    });
  });
});