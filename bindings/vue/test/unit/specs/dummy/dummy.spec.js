import Vue from 'vue'
import Dummy from './Dummy.vue'

describe('Dummy.vue', () => {
  const Constructor = Vue.extend(Dummy)
  const vm = new Constructor().$mount()

  it('passes this test', () => {
    expect(true).to.be.true;
  });
})
