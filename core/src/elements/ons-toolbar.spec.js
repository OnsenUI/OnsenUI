'use strict';

describe('OnsToolbarElement', () => {
  let element;

  beforeEach(() => {
    element = ons._util.createElement('<ons-toolbar>content</ons-toolbar>');
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('should exist', () => {
    expect(window.OnsToolbarElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
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

  it('has \'left\' class value in its first child', () => {
    expect(element.children[0].classList.contains('navigation-bar__left')).to.be.true;
    expect(element.children[0].classList.contains('navigation-bar__center')).not.to.be.true;
    expect(element.children[0].classList.contains('navigation-bar__right')).not.to.be.true;
  });

  it('has \'center\' class value in its second child', () => {
    expect(element.children[1].classList.contains('navigation-bar__left')).not.to.be.true;
    expect(element.children[1].classList.contains('navigation-bar__center')).to.be.true;
    expect(element.children[1].classList.contains('navigation-bar__right')).not.to.be.true;
  });

  it('has \'right\' class value in its third child', () => {
    expect(element.children[2].classList.contains('navigation-bar__left')).not.to.be.true;
    expect(element.children[2].classList.contains('navigation-bar__center')).not.to.be.true;
    expect(element.children[2].classList.contains('navigation-bar__right')).to.be.true;
  });

  /* Temporary commented due to behavior investigation

  it('provides inline attribute', () => {
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

  describe('#attachedCallbad()', () => {
    it('does not register extra element when has no parent ons-page', () => {
      var spy = chai.spy.on(element, '_registerToolbar');
      document.body.appendChild(element);
      expect(spy).to.not.have.been.called();
    });
  });

  describe('#_compile()', () => {
    it('removes non-element children', () => {
      const element = ons._util.createElement('<ons-toolbar>Test1<div class="center">Test2</div></ons-toolbar>');
      expect(element.childNodes[0].nodeValue).not.to.equal('Test1');
    });

    it('sorts its children depending on their class', () => {
      const element = ons._util.createElement('<ons-toolbar><div class="center">Test2</div><div class="right">Test3</div><div class="left">Test1</div></ons-toolbar>');
      expect(element.children[0].classList.contains('navigation-bar__left')).to.be.true;
      expect(element.children[1].classList.contains('navigation-bar__center')).to.be.true;
      expect(element.children[2].classList.contains('navigation-bar__right')).to.be.true;
    });

    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-toolbar><div class="center">Title</div></ons-toolbar>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      const e = ons._util.createElement('<ons-toolbar>content</ons-toolbar>');
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
    });
  });
});
