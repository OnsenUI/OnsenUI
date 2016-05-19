describe('tabbar.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/tabbar.html');
  });

  it('should have ons-tabbar elements', () => {
    expect($('ons-tabbar').isPresent()).toBeTruthy();
  });
});
