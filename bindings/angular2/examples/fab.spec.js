describe('fab.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/fab.html');
  });

  it('should have ons-fab elements', () => {
    expect($('ons-fab').isPresent()).toBeTruthy();
  });
});
