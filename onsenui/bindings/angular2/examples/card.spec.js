describe('card.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/card.html');
  });

  it('should have ons-card elements', () => {
    expect($('ons-card').isPresent()).toBeTruthy();
    expect($('div.title').isPresent()).toBeTruthy();
    expect($('div.title').getText()).toEqual('Awesome framework');
    expect($('div.content').isPresent()).toBeTruthy();
  });
});
