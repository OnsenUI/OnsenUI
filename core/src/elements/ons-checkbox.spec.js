'use strict';

describe('OnsCheckboxElement', () => {
  let element;

  beforeEach(done => {
    element = ons._util.createElement(`
      <ons-checkbox></ons-checkbox>
    `);

    document.body.appendChild(element);
    setImmediate(done);
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('should exist', () => {
    expect(window.ons.CheckboxElement).to.be.ok;
  });

  it('compiles correctly', () => {
    expect(element.className).to.contain('checkbox');
    expect(element._input.className).to.contain('checkbox__input');
    expect(element._input.type).to.equal('checkbox');
    expect(element._helper.className).to.contain('checkbox__checkmark');
  });

  describe('"class" attribute', () => {
    it('should contain default class token automatically', () => {
      expect(element.classList.contains('checkbox')).to.be.true;
      element.setAttribute('class', 'foo');
      expect(element.classList.contains('checkbox')).to.be.true;
      expect(element.classList.contains('foo')).to.be.true;
    });
  });

  it('provides \'modifier\' attribute', () => {
    element.setAttribute('modifier', 'hoge');
    expect(element._input.classList.contains('checkbox--hoge__input')).to.be.true;
    expect(element._helper.classList.contains('checkbox--hoge__checkmark')).to.be.true;

    element.setAttribute('modifier', 'foo bar');
    expect(element._input.classList.contains('checkbox--foo__input')).to.be.true;
    expect(element._helper.classList.contains('checkbox--foo__checkmark')).to.be.true;
    expect(element._input.classList.contains('checkbox--bar__input')).to.be.true;
    expect(element._helper.classList.contains('checkbox--bar__checkmark')).to.be.true;
    expect(element._input.classList.contains('checkbox--hoge__input')).to.be.false;
    expect(element._helper.classList.contains('checkbox--hoge__checkmark')).to.be.false;
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

  describe('input id', () => {
    it('assigns ID to the inner input element', (done) => {
      const element = ons._util.createElement('<ons-checkbox input-id="myCheckbox"></ons-checkbox>');

      setImmediate(() => {
        expect(element.querySelector('input').id).to.equal('myCheckbox')
        done();
      });
    });
  });

  describe('checked', () => {
    it('toggles', () => {
      expect(element.checked).to.be.false;
      expect(element._input.checked).to.be.false;
      element.setAttribute('checked', '');
      expect(element.checked).to.be.true;
      expect(element._input.checked).to.be.true;
      element.checked = false;
      expect(element._input.checked).to.be.false;
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
      const e = ons._util.createElement('<ons-checkbox></ons-checkbox>');

      setImmediate(() => {
        expect(e.getAttribute('modifier')).to.equal('material');
        ons.platform.select('');
        done();
      });
    });
  });
});
