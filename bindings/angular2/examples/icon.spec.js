describe('icon.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/icon.html');
  });

  it('should have ons-icon elements', () => {
    expect($('ons-icon').isPresent()).toBeTruthy();
  });
});
