describe('list.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/list.html');
  });

  it('should have ons-list elements', () => {
    expect($('ons-list').isPresent()).toBeTruthy();
  });
});
