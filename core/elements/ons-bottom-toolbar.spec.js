describe('ons-bottom-toolbar', function() {
  it('provide \'OnsBottomToolbarElement\' global variable', function() {
    expect(window.OnsBottomToolbarElement).to.be.ok;
  });

  it('classList contains \'bottom-bar\' by default', function() {
  	var element = new OnsBottomToolbarElement();
  	expect(element.classList.contains('bottom-bar')).to.be.true;
  });

  it('default \'position\' is \'absolute\' and default \'z-index\' is \'0\'', function() {
  	var element = new OnsBottomToolbarElement();
  	expect(element.style.zIndex).to.equal('0');
  	expect(element.style.position).to.equal('absolute');
  	expect(element.style.position).not.to.equal('relative');
  });

  it('provides \'modifier\' attribute', function() {
  	var element = new OnsBottomToolbarElement();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('bottom-bar--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('bottom-bar--foo')).to.be.true;
    expect(element.classList.contains('bottom-bar--bar')).to.be.true;
    expect(element.classList.contains('bottom-bar--hoge')).not.to.be.true;

    element.classList.add('bottom-bar--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('bottom-bar--piyo')).to.be.true;
    expect(element.classList.contains('bottom-bar--fuga')).to.be.true;
  });

  it('provides \'inline\' attribute', function() {
  	var element = new OnsBottomToolbarElement();
    element.setAttribute('inline', '');
    expect(element.style.position).to.equal('static');
    expect(element.style.position).not.to.equal('absolute');
  });
});