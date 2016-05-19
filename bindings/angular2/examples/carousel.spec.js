describe('carousel.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/carousel.html');
  });

  it('should have ons-carousel elements', () => {
    expect($('ons-carousel').isPresent()).toBeTruthy();
  });
});
