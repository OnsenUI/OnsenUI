describe('OnsProgressElement', () => {
  let bar, circular;

  beforeEach(() => {
    bar = ons._util.createElement('<ons-progress></ons-progress>');
    circular = ons._util.createElement('<ons-progress type="circular"></ons-progress>');
  });

  it('exists', () => {
    expect(window.OnsProgressElement).to.be.ok;
  });

  it('provides modifier attribute', () => {
    var template = bar._template,
      primary = bar._primary,
      secondary = bar._secondary;

    bar.setAttribute('modifier', 'hoge');
    expect(template.classList.contains('progress-bar--hoge')).to.be.true;
    expect(primary.classList.contains('progress-bar__primary--hoge')).to.be.true;
    expect(secondary.classList.contains('progress-bar__secondary--hoge')).to.be.true;

    bar.setAttribute('modifier', ' foo bar');
    expect(template.classList.contains('progress-bar--foo')).to.be.true;
    expect(template.classList.contains('progress-bar--bar')).to.be.true;
    expect(template.classList.contains('progress-bar--hoge')).not.to.be.true;
    expect(primary.classList.contains('progress-bar__primary--foo')).to.be.true;
    expect(primary.classList.contains('progress-bar__primary--bar')).to.be.true;
    expect(primary.classList.contains('progress-bar__primary--hoge')).not.to.be.true;
    expect(secondary.classList.contains('progress-bar__secondary--foo')).to.be.true;
    expect(secondary.classList.contains('progress-bar__secondary--bar')).to.be.true;
    expect(secondary.classList.contains('progress-bar__secondary--hoge')).not.to.be.true;

    template = circular._template;
    primary = circular._primary;
    secondary = circular._secondary;

    circular.setAttribute('modifier', 'hoge');
    expect(template.classList.contains('progress-circular--hoge')).to.be.true;
    expect(primary.classList.contains('progress-circular__primary--hoge')).to.be.true;
    expect(secondary.classList.contains('progress-circular__secondary--hoge')).to.be.true;

    circular.setAttribute('modifier', ' foo circular');
    expect(template.classList.contains('progress-circular--foo')).to.be.true;
    expect(template.classList.contains('progress-circular--circular')).to.be.true;
    expect(template.classList.contains('progress-circular--hoge')).not.to.be.true;
    expect(primary.classList.contains('progress-circular__primary--foo')).to.be.true;
    expect(primary.classList.contains('progress-circular__primary--circular')).to.be.true;
    expect(primary.classList.contains('progress-circular__primary--hoge')).not.to.be.true;
    expect(secondary.classList.contains('progress-circular__secondary--foo')).to.be.true;
    expect(secondary.classList.contains('progress-circular__secondary--circular')).to.be.true;
    expect(secondary.classList.contains('progress-circular__secondary--hoge')).not.to.be.true;
  });

  describe('#_type', () => {
    it('returns the type', () => {
      expect(bar._type).to.equal('bar');
      expect(circular._type).to.equal('circular');
    });
  });

  describe('#_updateDeterminate()', () => {
    it('is called when the "indeterminate" attribute is changed', () => {
      const spy = chai.spy.on(bar, '_updateDeterminate');

      bar.setAttribute('indeterminate', '');
      expect(spy).to.have.been.called.once;
      bar.removeAttribute('indeterminate');
      expect(spy).to.have.been.called.twice;
    });
  });

  describe('#_updateValue()', () => {
    it('is called when the "value" attribute is changed', () => {
      let spy = chai.spy.on(bar, '_updateValue');

      bar.setAttribute('value', '10');
      expect(spy).to.have.been.called.once;

      spy = chai.spy.on(circular, '_updateValue');
      circular.setAttribute('value', '10');
      expect(spy).to.have.been.called.once;
    });

    it('is called when the "secondary-value" attribute is changed', () => {
      let spy = chai.spy.on(bar, '_updateValue');

      bar.setAttribute('secondary-value', '10');
      expect(spy).to.have.been.called.once;

      spy = chai.spy.on(circular, '_updateValue');
      circular.setAttribute('secondary-value', '10');
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_compile()', () => {
    it('is called when an element is created', () => {
      const spy = chai.spy.on(OnsProgressElement.prototype, '_compile');
      const bar = ons._util.createElement('<ons-progress></ons-progress>');
      const circular = ons._util.createElement('<ons-progress type="circular"></ons-progress>');

      expect(spy).to.have.been.called.twice;
    });
  });
});
