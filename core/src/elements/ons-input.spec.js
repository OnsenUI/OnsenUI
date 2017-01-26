'use strict';

describe('OnsInputElement', () => {
  let element;

  beforeEach(done => {
    element = ons._util.createElement(`
      <ons-input placeholder="Username"></ons-input>
    `);

    document.body.appendChild(element);
    setImmediate(done);
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('should exist', () => {
    expect(window.ons.InputElement).to.be.ok;
  });

  onlyChrome(describe)('"class" attribute', () => {
    it('should contain default class token automatically on radio input', () => {
      const element = ons._util.createElement(`
        <ons-input type="radio"> </ons-input>
      `);
      expect(element.classList.contains('radio-button')).to.be.true;
      element.setAttribute('class', 'foo');
      expect(element.classList.contains('radio-button')).to.be.true;
      expect(element.classList.contains('foo')).to.be.true;
    });

    it('should contain default class token automatically on checkbox input', () => {
      const element = ons._util.createElement(`
        <ons-input type="checkbox"> </ons-input>
      `);
      expect(element.classList.contains('checkbox')).to.be.true;
      element.setAttribute('class', 'foo');
      expect(element.classList.contains('checkbox')).to.be.true;
      expect(element.classList.contains('foo')).to.be.true;
    });
  });

  onlyChrome(it)('provides \'modifier\' attribute', () => {
    element.setAttribute('modifier', 'hoge');
    expect(element._input.classList.contains('text-input--hoge')).to.be.true;
    expect(element._helper.classList.contains('text-input--hoge__label')).to.be.true;

    element.setAttribute('modifier', 'foo bar');
    expect(element._input.classList.contains('text-input--foo')).to.be.true;
    expect(element._helper.classList.contains('text-input--foo__label')).to.be.true;
    expect(element._input.classList.contains('text-input--bar')).to.be.true;
    expect(element._helper.classList.contains('text-input--bar__label')).to.be.true;
    expect(element._input.classList.contains('text-input--hoge')).to.be.false;
    expect(element._helper.classList.contains('text-input--hoge__label')).to.be.false;
  });

  describe('#_updateLabel()', () => {
    onlyChrome(it)('is called when the placeholder attribute changes', () => {
      const spy = chai.spy.on(element, '_updateLabel');

      element.setAttribute('placeholder', 'Password');
      expect(spy).to.have.been.called.once;
    });

    onlyChrome(it)('removes the label text if there is no placeholder attribute', () => {
      element.removeAttribute('placeholder');
      expect(element._helper.innerText).to.equal('');
    });
  });

  describe('#_updateBoundAttributes()', () => {
    onlyChrome(it)('is called when one of the bound attribute changes', () => {
      const spy = chai.spy.on(element, '_updateBoundAttributes');
      element.setAttribute('value', 'abc');
      expect(spy).to.have.been.called.once;
    });

    onlyChrome(it)('removes attributes from the input element', () => {
      element.setAttribute('value', 'abc');
      expect(element._input.getAttribute('value')).to.equal('abc');
      element.removeAttribute('value');
      expect(element._input.hasAttribute('value')).to.be.false;
    });
  });

  describe('#_onInput()', () => {
    it('is called when the value changes', () => {
      const spy = chai.spy.on(element, '_onInput');
      element.value = 'abc';
      element.value = '';
      expect(spy).to.have.been.called.twice;
    });
  });

  describe('#_onFocusin()', () => {
    it('calls #_updateLabelClass()', () => {
      const spy = chai.spy.on(element, '_updateLabelClass');
      element._onFocusin();
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_input', () => {
    it('is an HTMLElement', () => {
      expect(element._input).be.an.instanceof(HTMLElement);
    });
  });

  describe('#_helper', () => {
    it('is an HTMLElement', () => {
      expect(element._helper).be.an.instanceof(HTMLElement);
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

  describe('input label', () => {
    it('assigns ID to the inner input element', (done) => {
      const element = ons._util.createElement('<ons-input input-id="myInput"></ons-input>');

      setImmediate(() => {
        expect(element.querySelector('input').id).to.equal('myInput')
        done();
      });
    });
  });

  describe('#type attribute', () => {
    onlyChrome(it)('creates checkbox', (done) => {
      const element = ons._util.createElement('<ons-input type="checkbox"></ons-input>');

      setImmediate(() => {
        expect(element.className).to.contain('checkbox');
        expect(element._input.className).to.contain('checkbox__input');
        expect(element._input.type).to.equal('checkbox');
        expect(element._helper.className).to.contain('checkbox__checkmark');
        expect(element.checked).to.be.false;
        expect(element._input.checked).to.be.false;
        element.setAttribute('checked', '');
        expect(element.checked).to.be.true;
        expect(element._input.checked).to.be.true;
        element.checked = false;
        expect(element._input.checked).to.be.false;
        done();
      });
    });

    it('creates radio button', (done) => {
      let element = ons._util.createElement('<ons-input type="radio"></ons-input>');

      setImmediate(() => {
        expect(element.className).to.contain('radio-button');
        expect(element._input.className).to.contain('radio-button__input');
        expect(element._input.type).to.equal('radio');
        expect(element._helper.className).to.contain('radio-button__checkmark');

        element = ons._util.createElement('<div><ons-input type="radio" name="radiogroup"></ons-input><ons-input type="radio" name="radiogroup"></ons-input></div>');
        document.body.appendChild(element);

        setImmediate(() => {
          const r = element.querySelectorAll('ons-input[type=radio]');
          expect(r[0].checked).to.be.false;
          expect(r[1].checked).to.be.false;
          r[0].checked = true;
          expect(r[0].checked).to.be.true;
          expect(r[1].checked).to.be.false;
          r[1].checked = true;
          expect(r[0].checked).to.be.false;
          expect(r[1].checked).to.be.true;
          element.remove();
          done();
        });
      });
    });
  });

  describe('#disabled', () => {
    it('changes the "disabled" attribute', () => {
      expect(element.hasAttribute('disabled')).to.be.false;
      element.disabled = true;
      expect(element.hasAttribute('disabled')).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', (done) => {
      ons.platform.select('android');
      const e = ons._util.createElement('<ons-input></ons-input>');

      setImmediate(() => {
        expect(e.getAttribute('modifier')).to.equal('material');
        ons.platform.select('');
        done();
      });
    });
  });
});
