'use strict';

describe('OnsSwitchElement', () => {
  let element;

  beforeEach(() => {
    element = new OnsSwitchElement();
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('exists', () => {
    expect(window.OnsSwitchElement).to.be.ok;
  });

  it('classList contains \'switch\' by default', () => {
    expect(element.classList.contains('switch')).to.be.true;
  });

  it('has an \'input\' child by default', () => {
    expect(element.children[0].classList.contains('switch__input')).to.be.true;
  });

  it('has a \'.switch__toggle\' child by default', () => {
    expect(element.children[1].classList.contains('switch__toggle')).to.be.true;
  });


  it('provides \'modifier\' attribute', () => {
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

  describe('#checked', () => {
    it('is a boolean', () => {
      expect(element.checked).to.be.a('boolean');
    });

    it('adds the \'checked\' attribute when set to true', () => {
      element.removeAttribute('checked');
      element.checked = true;
      expect(element.hasAttribute('checked')).to.be.true;
      expect(element._checkbox.hasAttribute('checked')).to.be.true;
    });

    it('removes the \'checked\' attribute when set to false', () => {
      element.setAttribute('checked', '');
      expect(element.checked).to.be.true;
      element.checked = false;
      expect(element.hasAttribute('checked')).to.be.false;
      expect(element._checkbox.hasAttribute('checked')).to.be.false;
    });

    it('accepts truthy and falsy values', () => {
      element.checked = 1;
      expect(element.checked).to.be.true;
      element.checked = 0;
      expect(element.checked).to.be.false;
    });
  });

  describe('#disabled', () => {
    it('adds the \'disabled\' attribute when set to true', () => {
      element.removeAttribute('disabled');
      element.disabled = true;
      expect(element.hasAttribute('disabled')).to.be.true;
    });

    it('removes the \'disabled\' attribute when set to false', () => {
      element.setAttribute('disabled', '');
      expect(element.disabled).to.be.true;
      element.disabled = false;
      expect(element.hasAttribute('disabled')).to.be.false;
    });

    it('changes the \'disabled\' property of it\'s checkbox', () => {
      element.disabled = true;
      expect(element._checkbox.disabled).to.be.true;
      element.disabled = false;
      expect(element._checkbox.disabled).to.be.false;
    });
  });

  describe('#checked', () => {
    it('adds the \'checked\' attribute when set to true', () => {
      element.removeAttribute('checked');
      element.checked = true;
      expect(element.hasAttribute('checked')).to.be.true;
    });

    it('removes the \'checked\' attribute when set to false', () => {
      element.setAttribute('checked', '');
      expect(element.checked).to.be.true;
      element.checked = false;
      expect(element.hasAttribute('checked')).to.be.false;
    });

    it('changes the \'checked\' property of it\'s checkbox', () => {
      element.checked = true;
      expect(element._checkbox.checked).to.be.true;
      element.checked = false;
      expect(element._checkbox.checked).to.be.false;
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-switch></ons-switch>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.innerHTML).to.equal(div2.innerHTML);
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('#_onChange()', () => {
    it('adds the \'checked\' attribute', () => {
      element.checked = true;
      element._onChange();
      expect(element.hasAttribute('checked')).to.be.true;
    });

    it('removes the \'checked\' attribute', () => {
      element.checked = false;
      element._onChange();
      expect(element.hasAttribute('checked')).to.be.false;
    });
  });

  describe('#click()', () => {
    it('changes the value of the checkbox', () => {
      expect(element._checkbox.checked).to.be.false;
      element.click();
      expect(element._checkbox.checked).to.be.true;
    });

    it('cares if it\'s disabled', () => {
      element.disabled = true;
      expect(element._checkbox.checked).to.be.false;
      element.click();
      expect(element._checkbox.checked).to.be.false;
      element.disabled = false;
      element.click();
      expect(element._checkbox.checked).to.be.true;
    });
  });

  describe('#attributeChangedCallback()', () => {
    it('toggles material design', () => {
      element._isMaterial = false;
      element.setAttribute('modifier', 'material');
      expect(element._isMaterial).to.be.true;
      element.setAttribute('modifier', 'hoge');
      expect(element._isMaterial).to.be.false;
    });

    it('checks the checkbox', () => {
      element.setAttribute('checked', '');
      expect(element._checkbox.checked).to.be.true;
      expect(element._checkbox.hasAttribute('checked')).to.be.true;
      element.removeAttribute('checked');
      expect(element._checkbox.checked).to.be.false;
      expect(element._checkbox.hasAttribute('checked')).to.be.false;
    });

    it('disables the checkbox', () => {
      element.setAttribute('disabled', '');
      expect(element._checkbox.disabled).to.be.true;
      expect(element._checkbox.hasAttribute('disabled')).to.be.true;
      element.removeAttribute('disabled');
      expect(element._checkbox.disabled).to.be.false;
      expect(element._checkbox.hasAttribute('disabled')).to.be.false;
    });

    it('changes the inner input ID', () => {
      element.setAttribute('input-id', 'myID');
      expect(element._checkbox.id).to.equal('myID');
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      const e = document.createElement('ons-switch');
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
    });
  });
});
