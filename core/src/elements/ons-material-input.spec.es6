describe('OnsMaterialInputElement', () => {
  let element;

  beforeEach(() => {
    element = ons._util.createElement(`
      <ons-material-input label="Username"></ons-material-input>
    `);

    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('should exist', () => {
    expect(window.OnsMaterialInputElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
    element.setAttribute('modifier', 'hoge');
    expect(element._input.classList.contains('text-input--material--hoge')).to.be.true;
    expect(element._label.classList.contains('text-input--material__label--hoge')).to.be.true;

    element.setAttribute('modifier', 'foo bar');
    expect(element._input.classList.contains('text-input--material--foo')).to.be.true;
    expect(element._label.classList.contains('text-input--material__label--foo')).to.be.true;
    expect(element._input.classList.contains('text-input--material--bar')).to.be.true;
    expect(element._label.classList.contains('text-input--material__label--bar')).to.be.true;
    expect(element._input.classList.contains('text-input--material--hoge')).to.be.false;
    expect(element._label.classList.contains('text-input--material__label--hoge')).to.be.false;
  });

  describe('#_updateLabel()', () => {
    it('is called when the label attribute changes', () => {
      const spy = chai.spy.on(element, '_updateLabel');

      element.setAttribute('label', 'Password');
      expect(spy).to.have.been.called.once;
    });

    it('removes the label text if there is no label attribute', () => {
      element.removeAttribute('label');
      expect(element._label.innerText).to.equal('');
    });
  });

  describe('#_updateBoundAttributes()', () => {
    it('is called when one of the bound attribute changes', () => {
      const spy = chai.spy.on(element, '_updateBoundAttributes');
      element.setAttribute('value', 'abc');
      expect(spy).to.have.been.called.once;
    });

    it('removes attributes from the input element', () => {
      element.setAttribute('value', 'abc');
      expect(element._input.getAttribute('value')).to.equal('abc');
      element.removeAttribute('value');
      expect(element._input.hasAttribute('value')).to.be.false;
    });
  });

  describe('#_updateLabelColor()', () => {
    it('sets the text color', () => {
      element.value = 'abc';
      element._input.focus();
      element._updateLabelColor();
      expect(element._label.style.color).to.equal('');
    });
  });

  describe('#_onInput()', () => {
    it('calls the #_updateLabelColor()', () => {
      const spy = chai.spy.on(element, '_updateLabelColor');
      element._onInput();
      expect(spy).to.have.been.called.once;
    });

    it('is called when the value changes', () => {
      const spy = chai.spy.on(element, '_onInput');
      element.value = 'abc';
      element.value = '';
      expect(spy).to.have.been.called.twice;
    });
  });

  describe('#_onFocusin()', () => {
    it('calls #_updateLabelColor()', () => {
      const spy = chai.spy.on(element, '_updateLabelColor');
      element._onFocusin();
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_onFocusout()', () => {
    it('calls #_updateLabelColor()', () => {
      const spy = chai.spy.on(element, '_updateLabelColor');
      element._onFocusout();
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_input', () => {
    it('is an HTMLElement', () => {
      expect(element._input).be.an.instanceof(HTMLElement);
    });
  });

  describe('#_label', () => {
    it('is an HTMLElement', () => {
      expect(element._label).be.an.instanceof(HTMLElement);
    });
  });

  describe('#value', () => {
    it('returns the value of the internal input element', () => {
      expect(element.value).to.equal(element._input.value);
      element._input.value = 'hoge';
      expect(element.value).to.equal(element._input.value);
      element.value = 'fuga';
      expect(element.value).to.equal(element._input.value);
    });
  });
});
