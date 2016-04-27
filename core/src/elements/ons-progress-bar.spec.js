'use strict';

describe('OnsProgressBarElement', () => {
  let progress;

  beforeEach(() => {
    progress = ons._util.createElement('<ons-progress-bar></ons-progress-bar>');
  });

  it('exists', () => {
    expect(window.OnsProgressBarElement).to.be.ok;
  });

  it('provides modifier attribute', () => {
    var template = progress._template,
      primary = progress._primary,
      secondary = progress._secondary;

    progress.setAttribute('modifier', 'hoge');
    expect(template.classList.contains('progress-bar--hoge')).to.be.true;
    expect(primary.classList.contains('progress-bar__primary--hoge')).to.be.true;
    expect(secondary.classList.contains('progress-bar__secondary--hoge')).to.be.true;

    progress.setAttribute('modifier', ' foo bar');
    expect(template.classList.contains('progress-bar--foo')).to.be.true;
    expect(template.classList.contains('progress-bar--bar')).to.be.true;
    expect(template.classList.contains('progress-bar--hoge')).not.to.be.true;
    expect(primary.classList.contains('progress-bar__primary--foo')).to.be.true;
    expect(primary.classList.contains('progress-bar__primary--bar')).to.be.true;
    expect(primary.classList.contains('progress-bar__primary--hoge')).not.to.be.true;
    expect(secondary.classList.contains('progress-bar__secondary--foo')).to.be.true;
    expect(secondary.classList.contains('progress-bar__secondary--bar')).to.be.true;
    expect(secondary.classList.contains('progress-bar__secondary--hoge')).not.to.be.true;
  });

  describe('#_updateDeterminate()', () => {
    it('is called when the "indeterminate" attribute is changed', () => {
      const spy = chai.spy.on(progress, '_updateDeterminate');

      progress.setAttribute('indeterminate', '');
      expect(spy).to.have.been.called.once;
      progress.removeAttribute('indeterminate');
      expect(spy).to.have.been.called.twice;
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
      const spy = chai.spy.on(OnsProgressBarElement.prototype, '_compile');
      ons._util.createElement('<ons-progress-bar></ons-progress-bar>');

      expect(spy).to.have.been.called.once;
    });

    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-progress-bar></ons-progress-bar>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});
