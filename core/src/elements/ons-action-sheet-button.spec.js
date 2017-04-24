'use strict';

describe('ons-action-sheet-button', () => {
  it('provides \'OnsActionSheetButtonElement\' global variable', () => {
    expect(window.ons.ActionSheetButtonElement).to.be.ok;
  });

  it('classList contains \'action-sheet-button\' by default', (done) => {
    const element = new ons.ActionSheetButtonElement();
    setImmediate(() => {
      expect(element.classList.contains('action-sheet-button')).to.be.true;
      element.setAttribute('class', 'foo');
      expect(element.classList.contains('action-sheet-button')).to.be.true;
      expect(element.classList.contains('foo')).to.be.true;
      done();
    })
  });

  it('provides modifier attribute', () => {
    const element = new ons.ActionSheetButtonElement();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('action-sheet-button--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('action-sheet-button--foo')).to.be.true;
    expect(element.classList.contains('action-sheet-button--bar')).to.be.true;
    expect(element.classList.contains('action-sheet-button--hoge')).not.to.be.true;

    element.classList.add('action-sheet-button--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('action-sheet-button--piyo')).to.be.true;
    expect(element.classList.contains('action-sheet-button--fuga')).to.be.true;
  });

  it('provides icon attribute', () => {
    const element = ons.createElement('<ons-action-sheet-button icon="test">Content</ons-action-sheet-button>');
    expect(element._icon).to.be.ok;
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-action-sheet-button icon="test">Content</ons-action-sheet-button>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', (done) => {
      ons.platform.select('android');
      const e = document.createElement('ons-action-sheet-button');
      setImmediate(() => {
        expect(e.getAttribute('modifier')).to.equal('material');
        ons.platform.select('');
        done();
      })
    });
  });
});
