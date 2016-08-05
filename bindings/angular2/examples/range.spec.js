describe('range.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/range.html');
  });

  it('should have ons-range elements', () => {
    expect($('ons-range').isPresent()).toBeTruthy();
  });
});
