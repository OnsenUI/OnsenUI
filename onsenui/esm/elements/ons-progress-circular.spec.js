import contentReady from '../ons/content-ready.js';

describe('OnsProgressCircularElement', () => {
  let progress;

  beforeEach(done => {
    progress = ons._util.createElement('<ons-progress-circular></ons-progress-circular>');
    contentReady(progress, done);
  });

  it('exists', () => {
    expect(window.ons.elements.ProgressCircular).to.be.ok;
  });

  it('provides modifier attribute', () => {
    var template = progress._template,
      primary = progress._primary,
      secondary = progress._secondary;

    progress.setAttribute('modifier', 'hoge');
    expect(template.classList.contains('progress-circular--hoge')).to.be.true;
    expect(primary.classList.contains('progress-circular--hoge__primary')).to.be.true;
    expect(secondary.classList.contains('progress-circular--hoge__secondary')).to.be.true;

    progress.setAttribute('modifier', ' foo circular');
    expect(template.classList.contains('progress-circular--foo')).to.be.true;
    expect(template.classList.contains('progress-circular--circular')).to.be.true;
    expect(template.classList.contains('progress-circular--hoge')).not.to.be.true;
    expect(primary.classList.contains('progress-circular--foo__primary')).to.be.true;
    expect(primary.classList.contains('progress-circular--circular__primary')).to.be.true;
    expect(primary.classList.contains('progress-circular--hoge__primary')).not.to.be.true;
    expect(secondary.classList.contains('progress-circular--foo__secondary')).to.be.true;
    expect(secondary.classList.contains('progress-circular--circular__secondary')).to.be.true;
    expect(secondary.classList.contains('progress-circular--hoge__secondary')).not.to.be.true;
  });

  describe('#_updateDeterminate()', () => {
    it('is called when the "indeterminate" attribute is changed', () => {
      const spy = chai.spy.on(progress, '_updateDeterminate');

      progress.setAttribute('indeterminate', '');
      expect(spy).to.have.been.called.at.least(1);
      progress.removeAttribute('indeterminate');
    });
  });

  describe('#_updateValue()', () => {
    it('is called when the "value" attribute is changed', () => {
      const spy = chai.spy.on(progress, '_updateValue');

      progress.setAttribute('value', '10');
      expect(spy).to.have.been.called.once;
    });

    it('is called when the "secondary-value" attribute is changed', () => {
      const spy = chai.spy.on(progress, '_updateValue');

      progress.setAttribute('secondary-value', '10');
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_compile()', () => {
    it('is called when an element is created', () => {
      const spy = chai.spy.on(window.ons.elements.ProgressCircular.prototype, '_compile');
      ons._util.createElement('<ons-progress-circular> </ons-progress-circular>');

      expect(spy).to.have.been.called.once;
    });

    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-progress-circular></ons-progress-circular>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});
