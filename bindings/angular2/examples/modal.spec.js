describe('modal.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/modal.html');
  });

  it('should have ons-modal elements', () => {
    expect($('ons-modal').isPresent()).toBeTruthy();
  });
});
