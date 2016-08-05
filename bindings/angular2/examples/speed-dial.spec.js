describe('speed-dial.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/speed-dial.html');
  });

  it('should have ons-speed-dial elements', () => {
    expect($('ons-speed-dial').isPresent()).toBeTruthy();
  });
});
