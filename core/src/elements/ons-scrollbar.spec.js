'use strict';

describe('OnsScrollbarElement', () => {
  var div, text, container, scrollbar, content;
  const spyOn = chai.spy.on.bind(chai.spy, OnsScrollbarElement.prototype);

  beforeEach(() => {
    text = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet est eros, et euismod lorem pretium non. Nunc lorem libero, egestas ut sapien vel, pretium porta neque. Sed felis enim, lobortis eu velit in, condimentum laoreet odio. In a elit sed urna rutrum suscipit ac vel orci. Vestibulum maximus neque a justo faucibus euismod. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam vel ipsum sed metus tristique venenatis. In ultrices ipsum vitae ligula vestibulum egestas. Morbi nec erat vehicula, semper diam ac, aliquet ex. Sed ut facilisis mi. Nunc laoreet est urna, vel iaculis dolor pharetra sed.
      Interdum et malesuada fames ac ante ipsum primis in faucibus. In accumsan, eros nec sollicitudin cursus, sapien orci maximus lectus, non ornare elit dolor et tellus. Aenean tincidunt ac erat a iaculis. Curabitur quis luctus est. Vestibulum varius libero nunc, eu sodales lectus posuere vitae. Ut faucibus, tellus eget ornare consequat, ipsum lectus sagittis turpis, eu malesuada purus est at libero. Sed ante ex, sagittis in egestas lobortis, gravida id arcu. Etiam euismod lobortis urna ut interdum. Quisque id enim fermentum, euismod augue in, tristique diam. Quisque condimentum ex eu neque fringilla pretium. Morbi pellentesque ligula sit amet ligula mattis, eget imperdiet nunc luctus. Curabitur eget condimentum arcu.
    `;
    div = ons._util.createElement(`<div style="width: 50px; height: 50px;">${text}</div>`);

    scrollbar = new OnsScrollbarElement();

    document.body.appendChild(div);
    div.appendChild(scrollbar);
  });

  afterEach(() => {
    // container.remove();
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

    it.skip('is not called when an element is moved', () => {
      var spy = spyOn('_attach'),
        div1 = document.createElement('div'),
        div2 = document.createElement('div');

      document.body.appendChild(div1);
      document.body.appendChild(div2);
      div1.innerHTML = '<ons-scrollbar></ons-scrollbar>';
      div2.innerHTML = div1.innerHTML;

      expect(spy).to.have.been.called.once;
      expect(div1.innerHTML).to.equal(div2.innerHTML);
      expect(div1.isEqualNode(div2)).to.be.true;

      document.body.removeChild(div1);
      document.body.removeChild(div2);
    });
  });

  describe('#_onScroll()', () => {
    it('exists', () => {
      expect(scrollbar._onScroll).to.be.ok;
    });
  });

  describe('#_updateAutohide()', () => {
    it('exists', () => {
      expect(scrollbar._updateAutohide).to.be.ok;
    });
  });

  describe('#_overLimit()', () => {
    it('exists', () => {
      expect(scrollbar._overLimit).to.be.ok;
    });
  });

  describe('#updateScrollbarHeight()', () => {
    it('exists', () => {
      expect(scrollbar.updateScrollbarHeight).to.be.ok;
    });
  });

  describe('#updateScrollbarLocation()', () => {
    it('exists', () => {
      expect(scrollbar.updateScrollbarLocation).to.be.ok;
    });
  });

  describe('#_onDragStart()', () => {
    it('exists', () => {
      expect(scrollbar._onDragStart).to.be.ok;
    });
  });

  describe('#attachedCallback()', () => {
    it('exists', () => {
      expect(scrollbar.attachedCallback).to.be.ok;
    });
  });

  describe('#attributeChangedCallback()', () => {
    it('exists', () => {
      expect(scrollbar.attributeChangedCallback).to.be.ok;
    });
  });

});
