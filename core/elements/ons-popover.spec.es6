describe('OnsPopoverElement', () => {
  let popover,
    target;

  beforeEach(() => {
    popover = new OnsPopoverElement();
    target = ons._util.createElement('<div>Target</div>');

    document.body.appendChild(target);
    document.body.appendChild(popover);
  });

  afterEach(() => {
    popover.remove();
    target.remove();
    popover = target = null;
  });

  it('exists', () => {
    expect(window.OnsPopoverElement).to.be.ok;
  });

  it('provides \'modifier\' attribute', () => {
    let parent = popover.querySelector('.popover'),
      child = popover.querySelector('.popover__content');

    popover.setAttribute('modifier', 'hoge');
    expect(parent.classList.contains('popover--hoge')).to.be.true;
    expect(child.classList.contains('popover__content--hoge')).to.be.true;

    popover.setAttribute('modifier', ' foo bar');
    expect(parent.classList.contains('popover--foo')).to.be.true;
    expect(parent.classList.contains('popover--bar')).to.be.true;
    expect(parent.classList.contains('popover--hoge')).not.to.be.true;
    expect(child.classList.contains('popover__content--foo')).to.be.true;
    expect(child.classList.contains('popover__content--bar')).to.be.true;
    expect(child.classList.contains('popover__content--hoge')).not.to.be.true;

    parent.classList.add('popover--piyo');
    popover.setAttribute('modifier', 'fuga');
    expect(parent.classList.contains('popover--piyo')).to.be.true;
    expect(parent.classList.contains('popover--fuga')).to.be.true;
  });

  it('should be hidden by default', () => {
    expect(popover.style.display).to.equal('none');
  });

  describe('#show()', () => {
    it('requires a target', () => {
      expect(() => popover.show()).to.throw(Error);
    });

    it('accepts an HTML element', () => {
      expect(popover.style.display).to.equal('none');
      popover.show(target);
      expect(popover.style.display).to.equal('block');
    });

    it('accepts a CSS selector', () => {
      expect(popover.style.display).to.equal('none');
      popover.show('div');
      expect(popover.style.display).to.equal('block');
    });

    it('accepts an Event object', () => {
      var ev = new Event('dummy');
      target.dispatchEvent(ev);
      expect(popover.style.display).to.equal('none');
      popover.show(ev);
      expect(popover.style.display).to.equal('block');
    });

    it('has an \'animation\' parameter', () => {
      expect(() => popover.show(target, {animation: 'fade'})).not.to.throw(Error);
      expect(() => popover.show(target, {animation: 'none'})).not.to.throw(Error);
      expect(() => popover.show(target, {animation: 'hoge'})).to.throw(Error);
    });

    it('has an \'animationOptions\' parameter', () => {
      expect(() => popover.show(target, {animationOptions: {'duration': 1.0, delay: 1.0}}))
        .not.to.throw(Error);
    });

    describe('\'preshow\' event', () => {
      it('is fired', () => {
        let promise = new Promise((resolve) =>
          popover.addEventListener('preshow', resolve)
        );
        popover.show(target);
        return expect(promise).to.eventually.be.fulfilled;
      });

      it('can be cancelled', () => {
        popover.addEventListener('preshow', (event) => {
          event.detail.cancel();
        });

        popover.show(target);
        expect(popover.style.display).to.equal('none');
      });
    });

    describe('\'postshow\' event', () => {
      it('is fired', () => {
        let promise = new Promise((resolve) =>
          popover.addEventListener('postshow', resolve)
        );
        popover.show(target);
        return expect(promise).to.eventually.be.fulfilled;
      });
    });
  });

  describe('#hide()', () => {
    it('hides the popover', () => {
      expect(popover.style.display).to.equal('none');
      popover.show(target, {animation: 'none'});
      expect(popover.style.display).to.equal('block');
      popover.hide({animation: 'none'});
      expect(popover.style.display).to.equal('none');
    });

    describe('\'prehide\' event', () => {
      it('is fired', () => {
        let promise = new Promise((resolve) =>
          popover.addEventListener('prehide', resolve)
        );
        popover.show(target);
        popover.hide();
        return expect(promise).to.eventually.be.fulfilled;
      });
      it('can be cancelled', () => {
        popover.addEventListener('prehide', (event) => {
          event.detail.cancel();
        });

        popover.show(target, {animation: 'none'});
        expect(popover.style.display).to.equal('block');
        popover.hide(target, {animation: 'none'});
        expect(popover.style.display).to.equal('block');
      });

    });

    describe('\'posthide\' event', () => {
      it('is fired', () => {
        let promise = new Promise((resolve) =>
          popover.addEventListener('posthide', resolve)
        );
        popover.show(target);
        popover.hide();
        return expect(promise).to.eventually.be.fulfilled;
      });
    });
  });

  describe('#isShown()', () => {
    it('should return \'true\' if popover is visible', () => {
      popover.show(target, {animation: 'none'});
      expect(popover.isShown()).to.be.true;
    });

    it('should return \'false\' if popover is not visible', () => {
      expect(popover.isShown()).to.be.false;
    });
  });

  describe('#setCancelable()', () => {
    it('only accepts boolean arguments', () => {
      expect(() => popover.setCancelable()).to.throw(Error);
      expect(() => popover.setCancelable('hoge')).to.throw(Error);
      expect(() => popover.setCancelable(true)).not.to.throw(Error);
      expect(() => popover.setCancelable(false)).not.to.throw(Error);
    });

    it('sets the \'cancelable\' attribute', () => {
      expect(popover.hasAttribute('cancelable')).to.be.false;
      popover.setCancelable(true);
      expect(popover.hasAttribute('cancelable')).to.be.true;
    });

    it('removes the \'cancelable\' attribute', () => {
      popover.setAttribute('cancelable', '');
      popover.setCancelable(false);
      expect(popover.hasAttribute('cancelable')).to.be.false;
    });
  });

  describe('#isCancelable()', () => {
    it('returns \'true\' if \'cancelable\' attribute exists', () => {
      popover.setAttribute('cancelable', '');
      expect(popover.isCancelable()).to.be.true;
    });

    it('returns \'false\' if \'cancelable\' attribute does not exist', () => {
      expect(popover.isCancelable()).to.be.false;
    });
  });

  describe('#destroy()', () => {
    it('should remove the popover from the DOM', () => {
      expect(popover.parentNode).to.be.ok;
      popover.destroy();
      expect(popover.parentNode).not.to.be.ok;
    });
  });

  describe('#_cancel()', () => {
    it('should hide the popover if it is not cancelable', () => {
      popover.show(target, {animation: 'none'});
      popover._cancel();
      expect(popover.style.display).to.equal('block');
    });

    it('should hide the popover if it is cancelable', () => {
      popover.setAttribute('animation', 'none');
      popover.show(target);
      popover.setAttribute('cancelable', '');
      popover._cancel();
      expect(popover.style.display).to.equal('none');
    });
  });

  describe('\'direction\' attribute', () => {
    let el;

    beforeEach(() => {
      el = popover.querySelector('.popover');
    });

    it('should change the direction dynamically', (done) => {
      popover.show(target, {animation: 'none'});
      popover.setAttribute('direction', 'up');

      expect(el.classList.contains('popover--up')).to.be.false;
      setImmediate(() => {
        expect(el.classList.contains('popover--up')).to.be.true;
        done();
      });
    });

    it('can have the value \'up\'', () => {
      popover.setAttribute('direction', 'up');
      popover.show(target, {animation: 'none'});
      expect(el.classList.contains('popover--up')).to.be.true;
    });

    it('can have the value \'down\'', () => {
      popover.setAttribute('direction', 'down');
      popover.show(target, {animation: 'none'});
      expect(el.classList.contains('popover--down')).to.be.true;
    });

    it('can have the value \'left\'', () => {
      popover.setAttribute('direction', 'left');
      popover.show(target, {animation: 'none'});
      expect(el.classList.contains('popover--left')).to.be.true;
    });

    it('can have the value \'right\'', () => {
      popover.setAttribute('direction', 'right');
      popover.show(target, {animation: 'none'});
      expect(el.classList.contains('popover--right')).to.be.true;
    });
  });
});

