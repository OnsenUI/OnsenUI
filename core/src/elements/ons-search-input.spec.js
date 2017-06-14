'use strict';

describe('OnsSearchInputElement', () => {
  let element;

  beforeEach(done => {
    element = ons._util.createElement(`
      <ons-search-input placeholder="Username"></ons-search-input>
    `);

    document.body.appendChild(element);
    setImmediate(done);
  });

  afterEach(() => {
    element.remove();
    element = null;
  });

  it('should exist', () => {
    expect(window.ons.SearchInputElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
    element.setAttribute('modifier', 'hoge');
    expect(element._input.classList.contains('search-input--hoge')).to.be.true;

    element.setAttribute('modifier', 'foo bar');
    expect(element._input.classList.contains('search-input--foo')).to.be.true;
    expect(element._input.classList.contains('search-input--bar')).to.be.true;
    expect(element._input.classList.contains('search-input--hoge')).to.be.false;
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
      const element = ons._util.createElement('<ons-search-input input-id="myInput"></ons-search-input>');

      setImmediate(() => {
        expect(element.querySelector('input').id).to.equal('myInput')
        done();
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
      const e = ons._util.createElement('<ons-search-input></ons-search-input>');

      setImmediate(() => {
        expect(e.getAttribute('modifier')).to.equal('material');
        ons.platform.select('');
        done();
      });
    });
  });
});
