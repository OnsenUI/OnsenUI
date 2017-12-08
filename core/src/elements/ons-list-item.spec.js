'use strict';

describe('OnsListItemElement', () => {
  let listItem;

  beforeEach(done => {
    listItem = ons._util.createElement('<ons-list-item>content</ons-list-item>');

    setImmediate(done);
  });

  it('exists', () => {
    expect(window.ons.elements.ListItem).to.be.ok;
  });

  it('classList contains \'list-item\' by default', () => {
    const element = ons._util.createElement('<ons-list-item>content</ons-list-item>');
    expect(element.classList.contains('list-item')).to.be.true;
    element.setAttribute('class', 'foo');
    expect(element.classList.contains('list-item')).to.be.true;
    expect(element.classList.contains('foo')).to.be.true;
  });

  it('provides modifier attribute', () => {
    listItem.setAttribute('modifier', 'hoge');
    expect(listItem.classList.contains('list-item--hoge')).to.be.true;

    listItem.setAttribute('modifier', ' foo bar');
    expect(listItem.classList.contains('list-item--foo')).to.be.true;
    expect(listItem.classList.contains('list-item--bar')).to.be.true;
    expect(listItem.classList.contains('list-item--hoge')).not.to.be.true;

    listItem.classList.add('list-item--piyo');
    listItem.setAttribute('modifier', 'fuga');
    expect(listItem.classList.contains('list-item--piyo')).to.be.true;
    expect(listItem.classList.contains('list-item--fuga')).to.be.true;
  });

  describe('#_onDrag()', () => {
    it('should prevent default if \'lock-on-drag\' attribute is present', () => {
      listItem.setAttribute('lock-on-drag', '');

      const dummyEvent = {
        gesture: new CustomEvent('drag')
      };

      dummyEvent.gesture.direction = 'left';

      const spy = chai.spy.on(dummyEvent.gesture, 'preventDefault');

      listItem._onDrag(dummyEvent);

      expect(spy).to.have.been.called.once;
    });
  });

  describe('#_onTouch()', () => {
    it('should add change the background color.', () => {
      const color = 'rgb(250, 250, 250)';

      var e1 = ons._util.createElement('<ons-button>content</ons-button>');
      var e2 = ons._util.createElement('<div>content</div>');

      listItem.appendChild(e1);
      listItem.appendChild(e2);

      const dummyEvent1 = {
        target: e1
      };
      const dummyEvent2 = {
        target: e2
      };

      listItem.setAttribute('tappable', true);
      listItem.setAttribute('tap-background-color', color);
      expect(listItem.style.backgroundColor).not.to.equal(color);
      listItem._onTouch(dummyEvent1);
      expect(listItem.style.backgroundColor).not.to.equal(color);
      listItem._onTouch(dummyEvent2);
      expect(listItem.style.backgroundColor).to.equal(color);

      listItem.removeChild(e1);
      listItem.removeChild(e2);
    });
  });

  describe('#_onRelease()', () => {
    it('should restore the background color.', () => {
      const origColor = 'rgb(250, 250, 250)';
      const newColor = 'rgb(255, 255, 255)';

      var elt = ons._util.createElement('<div>content</div>')

      listItem.appendChild(elt);
      
      const dummyEvent = {
        target: elt
      };

      listItem.setAttribute('tappable', true);
      listItem.setAttribute('tap-background-color', newColor);
      listItem.style.backgroundColor = origColor;
      listItem._onTouch(dummyEvent);
      expect(listItem.style.backgroundColor).to.equal(newColor);
      listItem._onRelease();
      expect(listItem.style.backgroundColor).to.equal(origColor);

      listItem.removeChild(elt);
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-list-item>Content</ons-list-item>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifiers and effects on Android if tappable', () => {
      ons.platform.select('android');
      const e = ons._util.createElement('<ons-list-item tappable>Content</ons-list-item>');
      expect(e.getAttribute('modifier')).to.equal('material');
      expect(e.hasAttribute('ripple')).to.be.true;
      expect(e.children[0].tagName.toLowerCase()).to.equal('ons-ripple');
      ons.platform.select('');
    });
  });
});
