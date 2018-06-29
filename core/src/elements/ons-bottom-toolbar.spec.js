'use strict';

describe('ons-bottom-toolbar', () => {
  it('provides \'OnsBottomToolbarElement\' global variable', () => {
    expect(window.ons.elements.BottomToolbar).to.be.ok;
  });

  it('classList contains \'bottom-bar\' by default', () => {
    const element = new ons.elements.BottomToolbar();
    expect(element.classList.contains('bottom-bar')).to.be.true;
    element.setAttribute('class', 'foo');
    expect(element.classList.contains('bottom-bar')).to.be.true;
    expect(element.classList.contains('foo')).to.be.true;
  });

  it('provides \'modifier\' attribute', () => {
    var element = new ons.elements.BottomToolbar();
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

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-bottom-toolbar></ons-bottom-toolbar>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});
