describe('ons-modal', () => {
  it('provides \'OnsModalElement\' global variable', () => {
    expect(window.OnsModalElement).to.be.ok;
  });

  it('classList contains \'modal\' by default', () => {
    var element = new OnsModalElement();
    expect(element.classList.contains('modal')).to.be.true;
  });

  it('children classList contains \'modal__content\' by default', () => {
    var element = new OnsModalElement();
    var wrapper = document.createElement('div');
    element.appendChild(wrapper);
    expect(element.children[0].classList.contains('modal__content')).to.be.true;
  });

  it('doesn\'t display anything by default', () => {
    var element = new OnsModalElement();
    expect(element.style.display).to.equal('none');
  });

  it('provides a \'show()\' method', () => {
    var element = new OnsModalElement();
    expect(element.style.display).to.equal('none');
    element.show();
    expect(element.style.display).to.equal('table');
  });

  it('provides a \'hide()\' method', () => {
    var element = new OnsModalElement();
    expect(element.style.display).to.equal('none');
    element.show();
    expect(element.style.display).to.equal('table');
    element.hide();
    expect(element.style.display).to.equal('none');
  });

  it('provides a \'toggle()\' method', () => {
    var element = new OnsModalElement();
    expect(element.style.display).to.equal('none');
    element.toggle();
    expect(element.style.display).to.equal('table');
    element.toggle();
    expect(element.style.display).to.equal('none');
    element.toggle();
    expect(element.style.display).to.equal('table');
  });
});
