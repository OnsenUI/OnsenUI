
describe('ons-toolbar', function() {
  it('provide \'OnsToolbarElement\' global variable', function() {
    expect(window.OnsToolbarElement).to.be.ok;
  });

  it('provides modifier attribute', function() {
    var element = new OnsToolbarElement();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('navigation-bar--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('navigation-bar--foo')).to.be.true;
    expect(element.classList.contains('navigation-bar--bar')).to.be.true;
    expect(element.classList.contains('navigation-bar--hoge')).not.to.be.true;
    expect(element.children[0].classList.contains('navigation-bar--foo__left')).to.be.true;
    expect(element.children[1].classList.contains('navigation-bar--foo__center')).to.be.true;
    expect(element.children[2].classList.contains('navigation-bar--foo__right')).to.be.true;
    expect(element.children[0].classList.contains('navigation-bar--bar__left')).to.be.true;
    expect(element.children[1].classList.contains('navigation-bar--bar__center')).to.be.true;
    expect(element.children[2].classList.contains('navigation-bar--bar__right')).to.be.true;
    expect(element.children[0].classList.contains('navigation-bar--hoge__left')).not.to.be.true;
    expect(element.children[1].classList.contains('navigation-bar--hoge__center')).not.to.be.true;
    expect(element.children[2].classList.contains('navigation-bar--hoge__right')).not.to.be.true;

    element.classList.add('navigation-bar--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('navigation-bar--piyo')).to.be.true;
    expect(element.classList.contains('navigation-bar--fuga')).to.be.true;
    expect(element.children[0].classList.contains('navigation-bar--fuga__left')).to.be.true;
    expect(element.children[0].classList.contains('navigation-bar--piyo__left')).not.to.be.true;
    expect(element.children[1].classList.contains('navigation-bar--fuga__center')).to.be.true;
    expect(element.children[1].classList.contains('navigation-bar--piyo__center')).not.to.be.true;
    expect(element.children[2].classList.contains('navigation-bar--fuga__right')).to.be.true;
    expect(element.children[2].classList.contains('navigation-bar--piyo__right')).not.to.be.true;
  });

  it('first child has left class value', function() {
    var element = new OnsToolbarElement();

    expect(element.children[0].classList.contains('navigation-bar__left')).to.be.true;
    expect(element.children[0].classList.contains('navigation-bar__center')).not.to.be.true;
    expect(element.children[0].classList.contains('navigation-bar__right')).not.to.be.true;
  });

  it('first second has center class value', function() {
    var element = new OnsToolbarElement();

    expect(element.children[1].classList.contains('navigation-bar__left')).not.to.be.true;
    expect(element.children[1].classList.contains('navigation-bar__center')).to.be.true;
    expect(element.children[1].classList.contains('navigation-bar__right')).not.to.be.true;
  });

  it('third child has right class value', function() {
    var element = new OnsToolbarElement();

    expect(element.children[2].classList.contains('navigation-bar__left')).not.to.be.true;
    expect(element.children[2].classList.contains('navigation-bar__center')).not.to.be.true;
    expect(element.children[2].classList.contains('navigation-bar__right')).to.be.true;
  });

  /* Temporary commented due to behavior investigation

  it('provides inline attribute', function() {
    var element = new OnsToolbarElement();
    element.setAttribute('inline', '');

    if (element.hasAttribute('inline')) {
      expect(element.style.position).not.to.equal('absolute');
      expect(element.style.zIndex).not.to.equal('10000');
      expect(element.style.left).not.to.equal('0px');
      expect(element.style.right).not.to.equal('0px');
      expect(element.style.top).not.to.equal('0px');
    }
  });
  */

  it('recognizes Android platform', function() {
    var element = new OnsToolbarElement();
    if (ons.platform.isAndroid() && !this.hasAttribute('fixed-style')) {
      expect(element.classList.contains('navigation-bar--android')).to.be.true;
    }
  });
});
