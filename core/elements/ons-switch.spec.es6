describe('ons-switch', () => {
  it('provides \'OnsSwitchElement\' global variable', () => {
    expect(window.OnsSwitchElement).to.be.ok;
  });

  it('classList contains \'switch\' by default', () => {
  	var element = new OnsSwitchElement();
  	expect(element.classList.contains('switch')).to.be.true;
  });

  it('has a \'input\' child by default', () => {
  	var element = new OnsSwitchElement();
  	expect(element.children[0].classList.contains('switch__input')).to.be.true;
  });

  it('has a \'div\' child by default', () => {
  	var element = new OnsSwitchElement();
  	expect(element.children[1].classList.contains('switch__toggle')).to.be.true;
  });

  it('provides \'modifier\' attribute', () => {
    var element = new OnsSwitchElement();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('switch--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('switch--foo')).to.be.true;
    expect(element.classList.contains('switch--bar')).to.be.true;
    expect(element.classList.contains('switch--hoge')).not.to.be.true;

    element.classList.add('switch--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('switch--piyo')).to.be.true;
    expect(element.classList.contains('switch--fuga')).to.be.true;
  });

  it('provides \'checked\' attribute', () => {
  	var element = new OnsSwitchElement();
  	expect((element).hasAttribute('checked')).not.to.be.true;
		element.checked = true;
  	expect((element).hasAttribute('checked')).to.be.true;
  	element.checked = false;
  	expect((element).hasAttribute('checked')).not.to.be.true;
  });

  it('\'checked\' attribute accepts truthy and falsy values', () => {
  	var element = new OnsSwitchElement();
  	expect((element).hasAttribute('checked')).not.to.be.true;
		element.checked = 0;
  	expect(element.checked).to.equal(false);
  	element.checked = 1;
  	expect(element.checked).to.equal(true);
  	element.checked = '';
  	expect(element.checked).to.equal(false);
  	element.checked = -1;
  	expect(element.checked).to.equal(true);
  	element.checked = null;
  	expect(element.checked).to.equal(false);
  	element.checked = {};
  	expect(element.checked).to.equal(true);
  	element.checked = undefined;
  	expect(element.checked).to.equal(false);
  	element.checked = [];
  	expect(element.checked).to.equal(true);
  	element.checked = NaN;
  	expect(element.checked).to.equal(false);
  	element.checked = 'this is a string';
  	expect(element.checked).to.equal(true);
  });

  it('provides \'disabled\' attribute', () => {
  	var element = new OnsSwitchElement();
  	expect((element).hasAttribute('disabled')).not.to.be.true;
		element.disabled = true;
  	expect((element).hasAttribute('disabled')).to.be.true;
  	element.disabled = false;
  	expect((element).hasAttribute('disabled')).not.to.be.true;
  });

  it('\'disabled\' attribute accepts truthy and falsy values', () => {
  	var element = new OnsSwitchElement();
  	expect((element).hasAttribute('disabled')).not.to.be.true;
		element.disabled = 0;
  	expect(element.disabled).to.equal(false);
  	element.disabled = 1;
  	expect(element.disabled).to.equal(true);
  	element.disabled = '';
  	expect(element.disabled).to.equal(false);
  	element.disabled = -1;
  	expect(element.disabled).to.equal(true);
  	element.disabled = null;
  	expect(element.disabled).to.equal(false);
  	element.disabled = {};
  	expect(element.disabled).to.equal(true);
  	element.disabled = undefined;
  	expect(element.disabled).to.equal(false);
  	element.disabled = [];
  	expect(element.disabled).to.equal(true);
  	element.disabled = NaN;
  	expect(element.disabled).to.equal(false);
  	element.disabled = 'this is a string';
  	expect(element.disabled).to.equal(true);
  });
});
