describe('ons-template', function() {
  it('provides \'OnsTemplateElement\' global variable', function() {
    expect(window.OnsTemplateElement).to.be.ok;
  });

  it('by default doesn\'t have children', function() {
  	var element = new OnsTemplateElement();
  	expect(element.hasChildNodes()).not.to.be.true;
  });
});