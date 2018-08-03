 /* global describe it assert */

import React from 'react';
import { Row } from '../dist/react-onsenui.js';
import { mount } from 'enzyme';

describe('Row', function() {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(<Row />);
    setImmediate(done);
  })

  it('renders to ons-row', () => {
    expect(wrapper.find('ons-row')).to.have.length(1);
  });

  describe('className', function () {

    beforeEach((done) => {
      wrapper = mount(<Row className='some-class' />);
      setImmediate(done);
    });

    it('binds className prop to class', () => {
      expect(wrapper.find('ons-row').prop('class')).to.equal('some-class');
    });

    it('updates class when className changes', () => {
      wrapper.setProps({ className: 'new-class' });
      expect(wrapper.find('ons-row').prop('class')).to.equal('new-class');
    });
  });
});