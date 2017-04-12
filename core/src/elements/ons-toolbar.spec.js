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
    expect(window.ons.ToolbarElement).to.be.ok;
  });

  describe('"class" attribute', () => {
    xit('should contain "toolbar" class name automatically', () => {
      const element = ons._util.createElement('<ons-toolbar>content</ons-toolbar>');
      expect(element.classList.contains('toolbar')).to.be.true;
      element.className = 'foo'; // FIXME: CE polyfill should trigger `attributeChangedCallback` against `className`
      expect(element.classList.contains('toolbar')).to.be.true;
      expect(element.classList.contains('foo')).to.be.true;
    });
  });

  it('provides \'modifier\' attribute', () => {
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('toolbar--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('toolbar--foo')).to.be.true;
    expect(element.classList.contains('toolbar--bar')).to.be.true;
    expect(element.classList.contains('toolbar--hoge')).not.to.be.true;
    expect(element.children[0].classList.contains('toolbar--foo__left')).to.be.true;
    expect(element.children[1].classList.contains('toolbar--foo__center')).to.be.true;
    expect(element.children[2].classList.contains('toolbar--foo__right')).to.be.true;
    expect(element.children[0].classList.contains('toolbar--bar__left')).to.be.true;
    expect(element.children[1].classList.contains('toolbar--bar__center')).to.be.true;
    expect(element.children[2].classList.contains('toolbar--bar__right')).to.be.true;
    expect(element.children[0].classList.contains('toolbar--hoge__left')).not.to.be.true;
    expect(element.children[1].classList.contains('toolbar--hoge__center')).not.to.be.true;
    expect(element.children[2].classList.contains('toolbar--hoge__right')).not.to.be.true;

    element.classList.add('toolbar--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('toolbar--piyo')).to.be.true;
    expect(element.classList.contains('toolbar--fuga')).to.be.true;
    expect(element.children[0].classList.contains('toolbar--fuga__left')).to.be.true;
    expect(element.children[0].classList.contains('toolbar--piyo__left')).not.to.be.true;
    expect(element.children[1].classList.contains('toolbar--fuga__center')).to.be.true;
    expect(element.children[1].classList.contains('toolbar--piyo__center')).not.to.be.true;
    expect(element.children[2].classList.contains('toolbar--fuga__right')).to.be.true;
    expect(element.children[2].classList.contains('toolbar--piyo__right')).not.to.be.true;
  });

  it('has \'left\' class value in its first child', () => {
    expect(element.children[0].classList.contains('toolbar__left')).to.be.true;
    expect(element.children[0].classList.contains('toolbar__center')).not.to.be.true;
    expect(element.children[0].classList.contains('toolbar__right')).not.to.be.true;
  });

  it('has \'center\' class value in its second child', () => {
    expect(element.children[1].classList.contains('toolbar__left')).not.to.be.true;
    expect(element.children[1].classList.contains('toolbar__center')).to.be.true;
    expect(element.children[1].classList.contains('toolbar__right')).not.to.be.true;
  });

  it('has \'right\' class value in its third child', () => {
    expect(element.children[2].classList.contains('toolbar__left')).not.to.be.true;
    expect(element.children[2].classList.contains('toolbar__center')).not.to.be.true;
    expect(element.children[2].classList.contains('toolbar__right')).to.be.true;
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

  describe('#_compile()', () => {
    it('removes non-element children', () => {
      const element = ons._util.createElement('<ons-toolbar>Test1<div class="center">Test2</div></ons-toolbar>');
      expect(element.childNodes[0].nodeValue).not.to.equal('Test1');
    });

    it('sorts its children depending on their class', () => {
      const element = ons._util.createElement('<ons-toolbar><div class="center">Test2</div><div class="right">Test3</div><div class="left">Test1</div></ons-toolbar>');
      expect(element.children[0].classList.contains('toolbar__left')).to.be.true;
      expect(element.children[1].classList.contains('toolbar__center')).to.be.true;
      expect(element.children[2].classList.contains('toolbar__right')).to.be.true;
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
