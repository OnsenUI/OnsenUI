'use strict';

describe('OnsSplitterElement', () => {
  it('exists', () => {
    expect(window.OnsSplitterElement).to.be.ok;
  });

  let splitter;
  beforeEach(() => {
    splitter = ons._util.createElement(`
      <ons-splitter>
        <ons-splitter-side side="left">Left</ons-splitter-side>
        <ons-splitter-side side="right" collapse>Right</ons-splitter-side>
        <ons-splitter-content></ons-splitter-content>
      </ons-splitter>
    `);

    document.body.appendChild(splitter);
  });

  afterEach(() => {
    splitter.remove();
    splitter = null;
  });

  it('provides _hide(), _show(), _destroy() methods', () => {
    expect(splitter._hide instanceof Function).to.be.ok;
    expect(splitter._show instanceof Function).to.be.ok;
    expect(splitter._destroy instanceof Function).to.be.ok;
  });

  describe('page lifecycle events propagation', () => {
    it('should trigger "init" lifecyle event', (done) => {
      const splitter = ons._util.createElement(`
        <ons-splitter>
          <ons-splitter-content><ons-page>content</ons-page></ons-splitter-content>
        </ons-splitter>
      `);

      document.body.addEventListener('init', event => {
        expect(event.target.nodeName.toLowerCase()).to.be.equal('ons-page');
        splitter.remove();
        done();
      });

      document.body.appendChild(splitter);
    });

    it('should trigger "show" lifecyle event', (done) => {
      const splitter = ons._util.createElement(`
        <ons-splitter>
          <ons-splitter-content><ons-page>content</ons-page></ons-splitter-content>
        </ons-splitter>
      `);

      document.body.addEventListener('show', (event) => {
        expect(event.target.nodeName.toLowerCase()).to.be.equal('ons-page');
        splitter.remove();
        done();
      });

      document.body.appendChild(splitter);
    });
  });

  describe('children elements', () => {
    ['left', 'right', 'content', 'mask'].forEach(name => {
      it(`has a #${name} element`, () => {
        expect(splitter.left).to.be.an.instanceof(HTMLElement);
      });
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = `
        <ons-splitter>
          <ons-splitter-side side="left">Left</ons-splitter-side>
          <ons-splitter-side side="right" collapse>Right</ons-splitter-side>
          <ons-splitter-content>Content</ons-splitter-content>
        </ons-splitter>
      `;
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});
