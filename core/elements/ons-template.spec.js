describe('ons-template', function() {
  it('provides \'OnsTemplateElement\' global variable', function() {
    expect(window.OnsTemplateElement).to.be.ok;
  });

  it('by default doesn\'t have children', function() {
  	var element = new OnsTemplateElement();
  	expect(element.hasChildNodes()).not.to.be.true;
  });

  it('has a \'createdCallback()\' function', function(done) {
    var div = document.createElement('div'),
      message = 'hoge';

    document.body.appendChild(div);

    div.innerHTML = '<ons-template>' + message + '</ons-template>';
    var element = div.querySelector('ons-template');

    setImmediate(function() {
      expect(element.template).not.to.contain('fuga');
      expect(element.template).to.contain(message);
      expect(element.firstChild).not.to.be.ok;
      done();
    });
  });
});
