describe('dialog.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/dialog.html');
  });

  it('should have ons-dialog elements', () => {
    expect($('ons-dialog').isPresent()).toBeTruthy();
  });
});
