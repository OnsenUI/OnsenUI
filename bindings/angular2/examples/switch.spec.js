describe('switch.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/switch.html');
  });

  it('should have an ons-switch', () => {
    expect($('ons-switch').isPresent()).toBeTruthy();
  });
});
