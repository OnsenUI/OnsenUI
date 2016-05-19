describe('input.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/input.html');
  });

  it('should have ons-input elements', () => {
    expect($('ons-input').isPresent()).toBeTruthy();
  });
});
