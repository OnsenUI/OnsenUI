describe('switch.html', () => {
  beforeEach(() => {
    browser.get('/bindings/angular2/examples/switch.html');
  });

  it('should have an ons-switch', () => {
    expect($('ons-switch').isPresent()).toBeTruthy();
  });

  it('should change the switch when the checkbox is clicked', () => {
    expect($('ons-switch').getAttribute('checked')).not.toBe(null);
    $('#checkbox').click();
    expect($('ons-switch').getAttribute('checked')).toBe(null);
  });

  it('should change the checkbox when the switch is clicked', () => {
    expect($('#checkbox').isSelected()).toBeTruthy();
    $('ons-switch').click();
    expect($('#checkbox').isSelected()).not.toBeTruthy();
  });

});
