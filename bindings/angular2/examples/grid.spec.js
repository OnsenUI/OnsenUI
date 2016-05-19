describe('grid.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/grid.html');
  });

  it('should have a ons-col and ons-row elements', () => {
    expect($('ons-col').isPresent()).toBeTruthy();
    expect($('ons-row').isPresent()).toBeTruthy();
  });
});
