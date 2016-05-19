describe('bottom-toolbar.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/bottom-toolbar.html');
  });

  it('should have ons-bottom-toolbar elements', () => {
    expect($('ons-bottom-toolbar').isPresent()).toBeTruthy();
  });
});
