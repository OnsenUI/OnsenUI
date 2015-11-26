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

  it('has a \'input\' child by default', () => {
    expect(element.children[0].classList.contains('switch__input')).to.be.true;
  });

  it('has a \'div\' child by default', () => {
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
    });

    it('removes the \'checked\' attribute when set to false', () => {
      element.setAttribute('checked', '');
      expect(element.checked).to.be.true;
      element.checked = false;
      expect(element.hasAttribute('checked')).to.be.false;
    });

    it('accepts truthy and falsy values', () => {
      element.checked = 1;
      expect(element.checked).to.be.true;
      element.checked = 0;
      expect(element.checked).to.be.false;
    });
  });

  describe('#disabled', () => {
    it('is a boolean', () => {
      expect(element.disabled).to.be.a('boolean');
    });

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

    it('accepts truthy and falsy values', () => {
      element.disabled = 1;
      expect(element.disabled).to.be.true;
      element.disabled = 0;
      expect(element.disabled).to.be.false;
    });
  });

  describe('#_onChangeListener()', () => {
    it('removes the \'checked\' attribute', () => {
      element.checked = true;
      element._onChangeListener();
      expect(element.hasAttribute('checked')).to.be.true;
    });

    it('adds the \'checked\' attribute', () => {
      element.checked = false;
      element._onChangeListener();
      expect(element.hasAttribute('checked')).to.be.false;
    });
  });

  describe('#_isChecked()', () => {
    it('returns true if switch is on', () => {
      element.checked = true;
      expect(element._isChecked()).to.be.true;
    });

    it('returns false if switch is off', () => {
      element.checked = false;
      expect(element._isChecked()).to.be.false;
    });
  });

  describe('#_setChecked()', () => {
    it('sets the \'checked\' attribute to true', () => {
      element.checked = false;
      element._setChecked(true);
      expect(element.checked).to.be.true;
    });

    it('sets the \'checked\' attribute to false', () => {
      element.checked = true;
      element._setChecked(false);
      expect(element.checked).to.be.false;
    });
  });
});
