'use strict';

describe('OnsFabElement', () => {
  let fab;

  beforeEach(done => {
    fab = new OnsFabElement();
    ons._contentReady(fab, done);
  });

  it('exists', () => {
    expect(window.OnsFabElement).to.be.ok;
  });

  it('provides modifier attribute', () => {
    fab.setAttribute('modifier', 'hoge');
    expect(fab.classList.contains('fab--hoge')).to.be.true;

    fab.setAttribute('modifier', ' foo bar');
    expect(fab.classList.contains('fab--foo')).to.be.true;
    expect(fab.classList.contains('fab--bar')).to.be.true;
    expect(fab.classList.contains('fab--hoge')).not.to.be.true;

    fab.classList.add('fab--piyo');
    fab.setAttribute('modifier', 'fuga');
    expect(fab.classList.contains('fab--piyo')).to.be.true;
    expect(fab.classList.contains('fab--fuga')).to.be.true;
  });

  describe('#_show()', () => {
    it('calls show()', () => {
      const spy = chai.spy.on(fab, 'show');
      fab._show();
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_hide()', () => {
    it('calls hide()', () => {
      const spy = chai.spy.on(fab, 'hide');
      fab._hide();
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_updatePosition()', () => {
    it('is called when the "position" attribute changes', () => {
      const spy = chai.spy.on(fab, '_updatePosition');

      fab.setAttribute('position', 'top left');
      fab.setAttribute('position', 'bottom left');

      expect(spy).to.have.been.called.twice;
    });

    it('adds the correct class', () => {
      fab.setAttribute('position', 'top right');
      expect(fab.classList.contains('fab--top__right')).to.be.true;

      fab.setAttribute('position', 'top left');
      expect(fab.classList.contains('fab--top__left')).to.be.true;

      fab.setAttribute('position', 'bottom right');
      expect(fab.classList.contains('fab--bottom__right')).to.be.true;

      fab.setAttribute('position', 'bottom left');
      expect(fab.classList.contains('fab--bottom__left')).to.be.true;

      fab.setAttribute('position', 'top center');
      expect(fab.classList.contains('fab--top__center')).to.be.true;

      fab.setAttribute('position', 'bottom center');
      expect(fab.classList.contains('fab--bottom__center')).to.be.true;

      fab.setAttribute('position', 'right top');
      expect(fab.classList.contains('fab--top__right')).to.be.true;

      fab.setAttribute('position', 'left top');
      expect(fab.classList.contains('fab--top__left')).to.be.true;

      fab.setAttribute('position', 'right bottom');
      expect(fab.classList.contains('fab--bottom__right')).to.be.true;

      fab.setAttribute('position', 'left bottom');
      expect(fab.classList.contains('fab--bottom__left')).to.be.true;

      fab.setAttribute('position', 'center top');
      expect(fab.classList.contains('fab--top__center')).to.be.true;

      fab.setAttribute('position', 'center bottom');
      expect(fab.classList.contains('fab--bottom__center')).to.be.true;

      expect(fab.classList.contains('fab-top__left')).not.to.be.true;
      expect(fab.classList.contains('fab-bottom__right')).not.to.be.true;
      expect(fab.classList.contains('fab-bottom__left')).not.to.be.true;
      expect(fab.classList.contains('fab-top__right')).not.to.be.true;
      expect(fab.classList.contains('fab-top__center')).not.to.be.true;
    });

    it('does nothing if position "attribute" is incorrect', () => {
      const oldClassList = ons._util.arrayFrom(fab.classList);

      fab.setAttribute('position', 'hoge');
      const newClassList = ons._util.arrayFrom(fab.classList);

      for (let i = 0; i < newClassList.length; i++) {
        expect(oldClassList[i]).to.equal(newClassList[i]);
      }

      expect(oldClassList.length).to.equal(newClassList.length);
    });
  });

  describe('#show()', () => {
    it('sets scale transform to 1', () => {
      fab.hide();
      expect(fab.style.transform).to.equal('scale(0)');
      fab.show();
      expect(fab.style.transform).to.equal('scale(1)');
    });
  });

  describe('#hide()', () => {
    it('sets scale transform to 0', () => {
      fab.show();
      expect(fab.style.transform).to.equal('scale(1)');
      fab.hide();
      expect(fab.style.transform).to.equal('scale(0)');
    });
  });

  describe('#visible', () => {
    it('returns whether the element is currently shown or not', () => {
      fab.show();
      expect(fab.visible).to.be.true;
      fab.hide();
      expect(fab.visible).to.be.false;
      fab.style.display = 'none';
      fab.show();
      expect(fab.visible).to.be.false;
    });
  });

  describe('#disabled', () => {
    it('changes the "disabled" attribute', () => {
      expect(fab.hasAttribute('disabled')).to.be.false;
      fab.disabled = true;
      expect(fab.hasAttribute('disabled')).to.be.true;
    });
  });

  describe('#toggle()', () => {
    it('calls #show() if element is hidden', () => {
      fab.hide();
      const spy = chai.spy.on(fab, 'show');
      fab.toggle();
      expect(spy).to.have.been.called.once;
    });

    it('calls #hide() if element is shown', () => {
      fab.show();
      const spy = chai.spy.on(fab, 'hide');
      fab.toggle();
      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-fab></ons-fab>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' effects on Android', () => {
      ons.platform.select('android');
      const e = ons._util.createElement('<ons-fab> </ons-fab>');
      expect(e.hasAttribute('ripple')).to.be.true;
      expect(e.firstChild.tagName.toLowerCase()).to.equal('ons-ripple');
      ons.platform.select('');
    });
  });
});
