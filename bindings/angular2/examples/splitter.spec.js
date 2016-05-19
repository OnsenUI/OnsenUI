describe('splitter.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/splitter.html');
  });

  it('should have ons-splitter elements', () => {
    expect($('ons-splitter').isPresent()).toBeTruthy();
  });
});
