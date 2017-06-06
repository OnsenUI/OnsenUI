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

  it('provides \'modifier\' attribute', () => {
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
    it('is called when the placeholder attribute changes', () => {
      const spy = chai.spy.on(element, '_updateLabel');

      element.setAttribute('placeholder', 'Password');
      expect(spy).to.have.been.called.once;
    });

    it('removes the label text if there is no placeholder attribute', () => {
      element.removeAttribute('placeholder');
      expect(element._helper.innerText).to.equal('');
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

  describe('#_updateLabelClass()', () => {
    it('is called when the value changes', () => {
      const spy = chai.spy.on(element, '_updateLabelClass');
      element.value = 'abc';
      element.value = '';
      expect(spy).to.have.been.called.twice;
    });

    it('is called on focusin', () => {
      const spy = chai.spy.on(element, '_updateLabelClass');
      element._boundOnFocusin();
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

  describe('input id', () => {
    it('assigns ID to the inner input element', (done) => {
      const element = ons._util.createElement('<ons-input input-id="myInput"></ons-input>');

      setImmediate(() => {
        expect(element.querySelector('input').id).to.equal('myInput')
        done();
      });
    });
  });

  describe('#type attribute', () => {
    it('ignores checkbox and radio types', () => {
      element.setAttribute('type', 'checkbox');
      expect(element._input.type).to.equal('text');
      element.setAttribute('type', 'radio');
      expect(element._input.type).to.equal('text');
    })

    it('sets the type to the inner input', () => {
      element.setAttribute('type', 'password');
      expect(element._input.type).to.equal('password');
      element.setAttribute('type', 'text');
      expect(element._input.type).to.equal('text');
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
