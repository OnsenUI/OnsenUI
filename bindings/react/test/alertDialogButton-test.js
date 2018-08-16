 /* global describe it assert */

import React from 'react';
import { AlertDialogButton } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('AlertDialogButton', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<AlertDialogButton />);
    setImmediate(done);
  })

  it('renders to ons-alert-dialog-button', () => {
    expect(wrapper.find('ons-alert-dialog-button')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<AlertDialogButton className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-alert-dialog-button').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-alert-dialog-button').prop('class')).to.equal('new-class');
    });
  });
});