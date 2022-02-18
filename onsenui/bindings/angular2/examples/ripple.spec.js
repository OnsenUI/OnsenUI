describe('ripple.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/ripple.html');
  });

  it('should have ons-ripple elements', () => {
    expect($('ons-ripple').isPresent()).toBeTruthy();
  });
});
