'use strict';

describe('OnsScrollbarElement', () => {
  var div, text, container, scrollbar, content;
  const spyOn = chai.spy.on.bind(chai.spy, OnsScrollbarElement.prototype);

  const getValue = (element, property) => {
    return window.getComputedStyle(element).getPropertyValue(property);
  };

  beforeEach(() => {
    text = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet est eros, et euismod lorem pretium non. Nunc lorem libero, egestas ut sapien vel, pretium porta neque. Sed felis enim, lobortis eu velit in, condimentum laoreet odio. In a elit sed urna rutrum suscipit ac vel orci. Vestibulum maximus neque a justo faucibus euismod. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam vel ipsum sed metus tristique venenatis. In ultrices ipsum vitae ligula vestibulum egestas. Morbi nec erat vehicula, semper diam ac, aliquet ex. Sed ut facilisis mi. Nunc laoreet est urna, vel iaculis dolor pharetra sed.
      Interdum et malesuada fames ac ante ipsum primis in faucibus. In accumsan, eros nec sollicitudin cursus, sapien orci maximus lectus, non ornare elit dolor et tellus. Aenean tincidunt ac erat a iaculis. Curabitur quis luctus est. Vestibulum varius libero nunc, eu sodales lectus posuere vitae. Ut faucibus, tellus eget ornare consequat, ipsum lectus sagittis turpis, eu malesuada purus est at libero. Sed ante ex, sagittis in egestas lobortis, gravida id arcu. Etiam euismod lobortis urna ut interdum. Quisque id enim fermentum, euismod augue in, tristique diam. Quisque condimentum ex eu neque fringilla pretium. Morbi pellentesque ligula sit amet ligula mattis, eget imperdiet nunc luctus. Curabitur eget condimentum arcu.
    `;
    div = ons._util.createElement(`<div style="width: 150px; height: 150px;">${text}</div>`);

    scrollbar = new OnsScrollbarElement();

    document.body.appendChild(div);
    div.appendChild(scrollbar);

    content = scrollbar._content;
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it('exists', () => {
    expect(window.OnsScrollbarElement).to.be.ok;
  });

  describe('#_compile()', () => {
    it('is called when an element is created', () => {
      var spy = spyOn('_compile'),
        _ = new OnsScrollbarElement();

      expect(spy).to.have.been.called.once;
    });

    it('is not called when an element is copied', () => {
      var spy = spyOn('_compile'),
        div1 = document.createElement('div'),
        div2 = document.createElement('div');

      div1.innerHTML = '<ons-scrollbar></ons-scrollbar>';
      div2.innerHTML = div1.innerHTML;

      expect(spy).to.have.been.called.once;
      expect(div1.innerHTML).to.equal(div2.innerHTML);
      expect(div1.isEqualNode(div2)).to.be.true;
    });

    it('creates a "scrollbar" element', () => {
      expect((new OnsScrollbarElement())._scroll).to.be.an.instanceof(HTMLElement);
    });
  });

  describe('#_attach()', () => {
    it('is called when an element is attached to the DOM', () => {
      var spy = spyOn('_attach');

      div.appendChild(new OnsScrollbarElement());

      expect(spy).to.have.been.called.once;
    });

    it('is makes sure the parent will be scrollable', () => {
      var div = document.createElement('div');
      div.appendChild(new OnsScrollbarElement());

      expect(getValue(div, 'position')).to.not.equal('static');
      expect(getValue(div, 'overflow')).to.not.equal('scroll');
    });

    it('is not called when an element is moved', () => {
      var spy = spyOn('_attach'),
        div1 = document.createElement('div'),
        div2 = document.createElement('div');

      document.body.appendChild(div1);
      document.body.appendChild(div2);
      div1.innerHTML = '<ons-scrollbar></ons-scrollbar>';
      div2.innerHTML = div1.innerHTML;

      expect(spy).to.have.been.called.once;

      document.body.removeChild(div1);
      document.body.removeChild(div2);
    });
  });

  describe('#_onScroll()', () => {
    it('is called when scrolling', (done) => {
      var spy = spyOn('_onScroll');
      var div = document.createElement('div');
      var scrollbar = new OnsScrollbarElement();

      div.style.width = '50px';
      div.style.height = '50px';
      div.innerHTML = text;

      div.appendChild(scrollbar);
      document.body.appendChild(div);

      scrollbar._content.scrollTop = 11;
      setTimeout(() => {
        expect(spy).to.have.been.called.once;
        document.body.removeChild(div);
        done();
      }, 10);
    });

    it('calls _updateScrollbarLocation', () => {
      var spy = spyOn('_updateScrollbarLocation');
      scrollbar._onScroll();
      expect(spy).to.have.been.called.once;
    });

    it('calls updateScrollbar when updateOnScroll flag is true', () => {
      var spy = spyOn('updateScrollbar');
      scrollbar._updateOnScroll = true;
      scrollbar._onScroll();
      expect(spy).to.have.been.called.once;
    });

    it('becomes visible if set to autohide', (done) => {
      scrollbar._autohide = true;
      scrollbar._onScroll();
      setTimeout(() => {
        expect(scrollbar.classList.contains('scrollbar-autohide-visible')).to.be.true;
        done();
      }, 10);
    });

    it('becomes invisible after some time', (done) => {
      scrollbar._autohide = true;
      scrollbar._autohideDelay = 100;
      scrollbar._onScroll();
      setTimeout(() => {
        expect(scrollbar.classList.contains('scrollbar-autohide-visible')).to.be.false;
        done();
      }, 110);
    });

    it('calls onInfiniteScroll', (done) => {
      var i = 0;
      scrollbar.onInfiniteScrollLimit = 0.1;
      scrollbar.onInfiniteScroll = done => {
        i++;
        done();
      };
      var maxScroll = content.scrollHeight - content.clientHeight;
      content.scrollTop = 0.15 * maxScroll;
      setTimeout(() => {
        expect(i).to.equal(1);
        done();
      }, 10);
    });

    it('waits for onInfiniteScroll to finish', (done) => {
      var i = 0;
      scrollbar.onInfiniteScrollLimit = 0.1;
      scrollbar.onInfiniteScroll = (done) => {
        i++;
        setTimeout(done, 200);
      };
      content.scrollTop = 0.2 * (content.scrollHeight - content.clientHeight);
      setTimeout(() => { scrollbar._onScroll(); }, 50);
      setTimeout(() => { scrollbar._onScroll(); }, 150);
      setTimeout(() => { scrollbar._onScroll(); }, 250);

      setTimeout(() => {
        expect(i).to.equal(2);
        done();
      }, 300);
    });
  });

  describe('#updateScrollbar()', () => {
    it('changes the height', () => {
      var height = getValue(scrollbar._scroll, 'height');

      content.innerHTML += content.innerHTML;
      scrollbar.updateScrollbar();
      expect(getValue(scrollbar._scroll, 'height')).to.not.equal(height);
    });

    it('changes the location', () => {
      var height = getValue(scrollbar._scroll, 'height');

      content.innerHTML += content.innerHTML;
      scrollbar.updateScrollbar();
      expect(getValue(scrollbar._scroll, 'height')).to.not.equal(height);
    });
  });

  describe('#_updateScrollbarLocation()', () => {
    it('changes the location', () => {
      content.scrollTop = 0.15 * (content.scrollHeight - content.clientHeight);
      var y = getValue(scrollbar._scroll, 'top');

      content.innerHTML += content.innerHTML;
      scrollbar._updateScrollbarLocation();

      expect(getValue(scrollbar._scroll, 'top')).to.not.equal(y);
    });
  });

  describe('#attachedCallback()', () => {
    it('updates scrollbar', () => {
      var div = document.createElement('div'),
        spy = spyOn('updateScrollbar');

      document.body.appendChild(div);
      div.appendChild(new OnsScrollbarElement());

      expect(spy).to.have.been.called.at.least.once;
    });
  });

});
