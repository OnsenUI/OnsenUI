'use strict';

describe('OnsCarouselItemElement', () => {
  it('exists', () => {
    expect(window.OnsCarouselItemElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
    var carouselItem = new OnsCarouselItemElement();

    carouselItem.setAttribute('modifier', 'hoge');
    expect(carouselItem.classList.contains('carousel-item--hoge')).to.be.true;

    carouselItem.setAttribute('modifier', ' foo bar');
    expect(carouselItem.classList.contains('carousel-item--foo')).to.be.true;
    expect(carouselItem.classList.contains('carousel-item--bar')).to.be.true;
    expect(carouselItem.classList.contains('carousel-item--hoge')).not.to.be.true;

    carouselItem.classList.add('carousel-item--piyo');
    carouselItem.setAttribute('modifier', 'fuga');
    expect(carouselItem.classList.contains('carousel-item--piyo')).to.be.true;
    expect(carouselItem.classList.contains('carousel-item--fuga')).to.be.true;
  });
});

