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

  it('compiles div.left defined as a direct child', () => {
    const listItem = ons._util.createElement('<ons-list-item><div class="left"></div></ons-list-item>');
    const left = listItem.querySelector('.left');
    expect(left.classList.contains('list-item__left')).to.be.true;
  });

  it('compiles div.right defined as a direct child', () => {
    const listItem = ons._util.createElement('<ons-list-item><div class="right"></div></ons-list-item>');
    const right = listItem.querySelector('.right');
    expect(right.classList.contains('list-item__right')).to.be.true;
  });

  it('compiles div.center defined as a direct child', () => {
    const listItem = ons._util.createElement('<ons-list-item><div class="center"></div></ons-list-item>');
    const center = listItem.querySelector('.center');
    expect(center.classList.contains('list-item__center')).to.be.true;
  });

  it('puts center content in a new div.center if div.center is not already defined', () => {
    const listItem = ons._util.createElement('<ons-list-item><div id="content"></div></ons-list-item');
    const centerContent = listItem.querySelector('.center #content');
    expect(centerContent).to.not.be.null;
  });

  it('ignores center content defined outside div.center if div.center is defined', () => {
    const listItem = ons._util.createElement('<ons-list-item><div id="ignored"></div><div class="center"></div></ons-list-item');
    const ignored = listItem.querySelector('#ignored');
    expect(ignored).to.be.null;
  });

  describe('attribute expandable', () => {
    beforeEach(done => {
      listItem = ons._util.createElement('<ons-list-item expandable>content<div class="expandable-content">expanded</div></ons-list-item>');

      setImmediate(done);
    });

    it('has class \'list-item--expandable\'', () => {
      expect(listItem.classList.contains('list-item--expandable')).to.be.true;
    });

    it('has top div', () => {
      expect(listItem.querySelector('.top')).to.not.be.null;
    });

    it('compiles div.top defined as a direct child', () => {
      listItem = ons._util.createElement('<ons-list-item expandable><div class="top"></div></ons-list-item>');
      const top = listItem.querySelector('.top');
      expect(top.classList.contains('list-item__top')).to.be.true;
    });

    it('compiles div.expandable-content defined as a direct child', () => {
      const expandableContent = listItem.querySelector('.expandable-content');
      expect(expandableContent.classList.contains('list-item__expandable-content')).to.be.true;
    });

    it('has left div inside top div if left div is defined', () => {
      listItem = ons._util.createElement('<ons-list-item expandable>content<div class="expandable-content">expanded</div><div class="left">left</div></ons-list-item>');
      expect(listItem.querySelector('.left').parentNode.classList.contains('top')).to.be.true;
    });

    it('has right div inside top div if right div is defined', () => {
      listItem = ons._util.createElement('<ons-list-item expandable>content<div class="expandable-content">expanded</div><div class="right">right</div></ons-list-item>');
      expect(listItem.querySelector('.right').parentNode.classList.contains('top')).to.be.true;
    });

    it('has center div inside top div if center div is defined', () => {
      listItem = ons._util.createElement('<ons-list-item expandable>content<div class="expandable-content">expanded</div><div class="center">center</div></ons-list-item>');
      expect(listItem.querySelector('.center').parentNode.classList.contains('top')).to.be.true;
    });

    it('has dropdown icon if right div is not already defined', () => {
      const right = listItem.querySelector('.right');
      expect(right.childNodes[0].classList.contains('list-item__expand-chevron')).to.be.true;
    });

    it('does not have dropdown icon if right div if already defined', () => {
      listItem = ons._util.createElement('<ons-list-item expandable>content<div class="expandable-content">expanded</div><div class="right">right</div></ons-list-item>');
      const right = listItem.querySelector('.right');
      expect(right.innerHTML === 'right').to.be.true;
    });

    it('ignores top-level content defined outside top div if top div is defined', () => {
      listItem = ons._util.createElement('<ons-list-item expandable><div id="ignored"></div><div class="expandable-content">expanded</div><div class="top">top</div></ons-list-item>');
      const ignored = listItem.querySelector('#ignored');
      expect(ignored).to.be.null;
    });
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

  describe('toggleExpansion', () => {
    it('calls hideExpansion when already expanded', () => {
      const spy = chai.spy.on(listItem, 'hideExpansion');
      listItem.classList.add('expanded');
      listItem.toggleExpansion();
      expect(spy).to.have.been.called.once;
    });

    it('calls showExpansion when not expanded', () => {
      const spy = chai.spy.on(listItem, 'showExpansion');
      listItem.toggleExpansion();
      expect(spy).to.have.been.called.once;
    });
  });

  describe('showExpansion', () => {
    let animatorMock;

    beforeEach(() => {
      animatorMock = chai.spy.interface('animatorMock', ['showExpansion']);
      chai.spy.on(listItem._animatorFactory, 'newAnimator', () => animatorMock);
    });

    it('calls animator.showExpansion when expandable is set', () => {
      listItem.setAttribute('expandable');
      listItem.showExpansion();
      expect(animatorMock.showExpansion).to.have.been.called.once;
    });

    it('does not call animator.showExpansion when expandable is not set', () => {
      listItem.showExpansion();
      expect(animatorMock.showExpansion).to.not.have.been.called;
    });
  });

  describe('hideExpansion', () => {
    let animatorMock;

    beforeEach(() => {
      animatorMock = chai.spy.interface('animatorMock', ['hideExpansion']);
      chai.spy.on(listItem._animatorFactory, 'newAnimator', () => animatorMock);
    });

    it('calls animator.hideExpansion when expandable is set', () => {
      listItem.setAttribute('expandable');
      listItem.hideExpansion();
      expect(animatorMock.hideExpansion).to.have.been.called.once;
    });

    it('does not call animator.hideExpansion when expandable is not set', () => {
      listItem.hideExpansion();
      expect(animatorMock.hideExpansion).to.not.have.been.called;
    });
  });
});
