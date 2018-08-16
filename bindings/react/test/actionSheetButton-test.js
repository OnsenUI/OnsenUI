 /* global describe it assert */

import React from 'react';
import { ActionSheetButton } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('ActionSheetButton', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<ActionSheetButton />);
    setImmediate(done);
  })

  it('renders to ons-action-sheet-button', () => {
    expect(wrapper.find('ons-action-sheet-button')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<ActionSheetButton className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-action-sheet-button').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-action-sheet-button').prop('class')).to.equal('new-class');
    });
  });
});