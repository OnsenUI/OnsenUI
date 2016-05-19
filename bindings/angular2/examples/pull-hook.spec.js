describe('pull-hook.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/pull-hook.html');
  });

  it('should have ons-pull-hook elements', () => {
    expect($('ons-pull-hook').isPresent()).toBeTruthy();
  });
});
