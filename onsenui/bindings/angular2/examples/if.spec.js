describe('if.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/if.html');
  });

  it('should have ons-if elements', () => {
    expect($('ons-if').isPresent()).toBeTruthy();
  });
});
