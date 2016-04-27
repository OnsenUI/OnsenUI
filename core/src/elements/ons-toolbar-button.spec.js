'use strict';

describe('ons-toolbar-button', () => {
  it('provides \'OnsToolbarButton\' global variable', () => {
    expect(window.OnsToolbarButton).to.be.ok;
  });

  it('provides modifier attribute', () => {
    var element = new OnsToolbarButton();
    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('toolbar-button--hoge')).to.be.true;

    element.setAttribute('modifier', ' foo bar');
    expect(element.classList.contains('toolbar-button--foo')).to.be.true;
    expect(element.classList.contains('toolbar-button--bar')).to.be.true;
    expect(element.classList.contains('toolbar-button--hoge')).not.to.be.true;

    element.classList.add('toolbar-button--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('toolbar-button--piyo')).to.be.true;
    expect(element.classList.contains('toolbar-button--fuga')).to.be.true;
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-toolbar-button>Back</ons-toolbar-button>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('#disabled', () => {
    it('changes the "disabled" attribute', () => {
      var element = new OnsToolbarButton();

      expect(element.hasAttribute('disabled')).to.be.false;
      element.disabled = true;
      expect(element.hasAttribute('disabled')).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifiers and effects on Android', () => {
      ons.platform.select('android');
      let e = document.createElement('ons-toolbar-button');
      expect(e.getAttribute('modifier')).to.equal('material');
      e = ons._util.createElement('<ons-toolbar-button modifier="outline"></ons-toolbar-button>');
      expect(e.getAttribute('modifier')).to.contain('material--flat');
      ons.platform.select('');
    });
  });
});

