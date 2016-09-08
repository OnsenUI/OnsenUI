describe('navigator.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/navigator.html');
  });

  it('should have ons-navigator elements', () => {
    expect($('ons-navigator').isPresent()).toBeTruthy();
    expect($('ons-navigator').isPresent()).toBeTruthy();
    expect($('#message').getText()).toEqual('Click to push:');
  });
});
