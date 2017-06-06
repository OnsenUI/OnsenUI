'use strict';

describe('OnsSwitchElement', () => {
  let element;

  beforeEach(done => {
    element = new ons.SwitchElement();
    document.body.appendChild(element);
    setImmediate(done);
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('exists', () => {
    expect(window.ons.SwitchElement).to.be.ok;
  });

  describe('class attribute', () => {
    it('should contains "switch" class token automatically', () => {
      expect(element.classList.contains('switch')).to.be.ok;
      element.setAttribute('class', 'foobar');
      expect(element.classList.contains('switch')).to.be.ok;
      expect(element.classList.contains('foobar')).to.be.ok;
    });
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

    it('accepts truthy and falsy values', () => {
      element.checked = 1;
      expect(element.checked).to.be.true;
      element.checked = 0;
      expect(element.checked).to.be.false;
    });

    it('changes the \'checked\' property of it\'s checkbox', () => {
      element.checked = true;
      expect(element.checkbox.checked).to.be.true;
      element.checked = false;
      expect(element.checkbox.checked).to.be.false;
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
      expect(element.checkbox.disabled).to.be.true;
      element.disabled = false;
      expect(element.checkbox.disabled).to.be.false;
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

  describe('#click()', () => {
    it('changes the value of the checkbox', () => {
      expect(element.checked).to.be.false;
      element.click();
      expect(element.checked).to.be.true;
    });

    it('cares if it\'s disabled', () => {
      element.disabled = true;
      expect(element.checked).to.be.false;
      element.click();
      expect(element.checked).to.be.false;
      element.disabled = false;
      element.click();
      expect(element.checked).to.be.true;
    });
  });

  describe('#attributeChangedCallback()', () => {
    it('toggles material design', () => {
      let defaultLocations = element._locations;
      element.setAttribute('modifier', 'material');
      expect(element._locations).not.to.equal(defaultLocations);
      element.setAttribute('modifier', 'hoge');
      expect(element._locations).to.equal(defaultLocations);
      defaultLocations = null;
    });

    it('checks the checkbox', () => {
      element.setAttribute('checked', '');
      expect(element.checkbox.checked).to.be.true;
      element.removeAttribute('checked');
      expect(element.checkbox.checked).to.be.false;
    });

    it('disables the checkbox', () => {
      element.setAttribute('disabled', '');
      expect(element.checkbox.disabled).to.be.true;
      expect(element.checkbox.hasAttribute('disabled')).to.be.true;
      element.removeAttribute('disabled');
      expect(element.checkbox.disabled).to.be.false;
      expect(element.checkbox.hasAttribute('disabled')).to.be.false;
    });

    it('changes the inner input ID', () => {
      element.setAttribute('input-id', 'myID');
      expect(element.checkbox.id).to.equal('myID');
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', (done) => {
      ons.platform.select('android');
      const e = document.createElement('ons-switch');

      setImmediate(() => {
        expect(e.getAttribute('modifier')).to.equal('material');
        ons.platform.select('');
        done();
      });
    });
  });
});
