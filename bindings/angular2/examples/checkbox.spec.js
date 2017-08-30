describe('checkbox.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/checkbox.html');
  });

  it('should have ons-checkbox elements', () => {
    expect($('ons-checkbox').isPresent()).toBeTruthy();
  });
  
  it('should show check marks on \'Blue\' and \'Green\' initially', () => {
    expect(element.all(by.tagName('ons-checkbox')).get(0).getAttribute('checked')).toBe(null);
    expect(element.all(by.tagName('ons-checkbox')).get(1).getAttribute('checked')).not.toBe(null);
    expect(element.all(by.tagName('ons-checkbox')).get(2).getAttribute('checked')).not.toBe(null);
  });

  it('should change the model when checkbox is clicked', () => {
    expect(element.all(by.tagName('ons-checkbox')).get(0).getAttribute('checked')).toBe(null);
    expect(element.all(by.tagName('ons-checkbox')).get(1).getAttribute('checked')).not.toBe(null);
    expect(element.all(by.tagName('ons-checkbox')).get(2).getAttribute('checked')).not.toBe(null);
    expect($('#checked-colors').getText()).toBe('Green,Blue');

    element.all(by.tagName('ons-checkbox')).get(0).click();

    expect(element.all(by.tagName('ons-checkbox')).get(0).getAttribute('checked')).not.toBe(null);
    expect(element.all(by.tagName('ons-checkbox')).get(1).getAttribute('checked')).not.toBe(null);
    expect(element.all(by.tagName('ons-checkbox')).get(2).getAttribute('checked')).not.toBe(null);
    expect($('#checked-colors').getText()).toBe('Green,Blue,Red');
  });

});
