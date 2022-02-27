describe('progress.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/progress.html');
  });

  it('should have ons-progress-bar elements', () => {
    expect($('ons-progress-bar').isPresent()).toBeTruthy();
  });

  it('should have ons-progress-circular elements', () => {
    expect($('ons-progress-circular').isPresent()).toBeTruthy();
  });
});
