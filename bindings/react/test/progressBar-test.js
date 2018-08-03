 /* global describe it assert */

import React from 'react';
import { ProgressBar } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('ProgressBar', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<ProgressBar />);
    setImmediate(done);
  })

  it('renders to ons-progress-bar', () => {
    expect(wrapper.find('ons-progress-bar')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<ProgressBar className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-progress-bar').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-progress-bar').prop('class')).to.equal('new-class');
    });
  });
});