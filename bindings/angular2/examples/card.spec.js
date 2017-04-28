describe('card.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/card.html');
  });

  it('should have ons-card elements', () => {
    console.log('\n\n\n\nCARD TEST\n\n\n\n');
    expect($('ons-card').isPresent()).toBeTruthy();
    expect($('div.title').isPresent()).toBeTruthy();
    expect($('div.title').getText()).toEqual('Awesome card title');
    expect($('div.content').isPresent()).toBeTruthy();
  });
});
