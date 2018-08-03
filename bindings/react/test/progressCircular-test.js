 /* global describe it assert */

import React from 'react';
import { ProgressCircular } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('ProgressCircular', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<ProgressCircular />);
    setImmediate(done);
  })

  it('renders to ons-progress-circular', () => {
    expect(wrapper.find('ons-progress-circular')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<ProgressCircular className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-progress-circular').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-progress-circular').prop('class')).to.equal('new-class');
    });
  });
});