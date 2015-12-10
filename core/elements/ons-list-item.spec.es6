describe('OnsListItemElement', () => {
  let listItem;

  beforeEach(() => {
    listItem = new OnsListItemElement();
  });

  it('exists', () => {
    expect(window.OnsListItemElement).to.be.ok;
  });

  it('classList contains \'list__item\' by default', () => {
    expect(listItem.classList.contains('list__item')).to.be.true;
  });

  it('provides modifier attribute', () => {
    listItem.setAttribute('modifier', 'hoge');
    expect(listItem.classList.contains('list__item--hoge')).to.be.true;

    listItem.setAttribute('modifier', ' foo bar');
    expect(listItem.classList.contains('list__item--foo')).to.be.true;
    expect(listItem.classList.contains('list__item--bar')).to.be.true;
    expect(listItem.classList.contains('list__item--hoge')).not.to.be.true;

    listItem.classList.add('list__item--piyo');
    listItem.setAttribute('modifier', 'fuga');
    expect(listItem.classList.contains('list__item--piyo')).to.be.true;
    expect(listItem.classList.contains('list__item--fuga')).to.be.true;
  });

  describe('#_onDrag()', () => {
    it('should prevent default if \'lock-on-drag\' attribute is present', () => {
      listItem.setAttribute('lock-on-drag', '');

      let dummyEvent = {
        gesture: new CustomEvent('drag')
      };

      dummyEvent.gesture.direction = 'left';

      let spy = chai.spy.on(dummyEvent.gesture, 'preventDefault');

      listItem._onDrag(dummyEvent);

      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_shouldLockOnDrag()', () => {
    it('returns false if \'lock-on-drag\' element is not present', () => {
      expect(listItem._shouldLockOnDrag()).to.be.false;
    });

    it('returns true if \'lock-on-drag\' element is present', () => {
      listItem.setAttribute('lock-on-drag', '');
      expect(listItem._shouldLockOnDrag()).to.be.true;
    });
  });

  describe('#_onTouch()', () => {
    it('should add the active style', () => {
      listItem.setAttribute('modifier', 'tappable');
      expect(listItem.classList.contains('list__item--tappable')).to.be.true;
      expect(listItem.classList.contains('list__item--tappable--active')).not.to.be.true;

      listItem._onTouch();
      expect(listItem.classList.contains('list__item--tappable--active')).to.be.true;
    });
  });
});
