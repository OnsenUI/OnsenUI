describe('ons-template', function() {
  it('provides \'OnsTemplateElement\' global variable', function() {
    expect(window.OnsTemplateElement).to.be.ok;
  });

  it('by default doesn\'t have children', function() {
  	var element = new OnsTemplateElement();
  	expect(element.hasChildNodes()).not.to.be.true;
  });

  it('has a \'createdCallback()\' function', function() {
    var div = document.createElement('div'),
      message = 'hoge';

    div.innerHTML = `
      <ons-template>
        <p>${message}</p>
      </ons-template>
    `;

    var element = div.querySelector('ons-template');

    expect(element.template).not.to.contain('fuga')
    expect(element.template).to.contain(message);
    expect(element.firstChild).not.to.be.ok;
  });
});
