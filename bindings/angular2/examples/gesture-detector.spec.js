describe('gesture-detector.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/gesture-detector.html');
  });

  it('should have ons-gesture-detector elements', () => {
    expect($('ons-gesture-detector').isPresent()).toBeTruthy();
  });
});
