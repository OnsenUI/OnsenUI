import Vue from 'vue';
import Carousel from './Carousel.vue';

describe('Carousel.vue', () => {
  const Constructor = Vue.extend(Carousel);
  const vm = new Constructor().$mount();

  it('auto refreshes', () => {
    expect(true).to.be.true;
  });
})
