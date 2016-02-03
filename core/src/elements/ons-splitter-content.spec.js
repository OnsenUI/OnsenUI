'use strict';

describe('ons-splitter-content', () => {

  document.body.appendChild(ons._util.createElement(`<ons-template id="hoge.html">hoge content</ons-template>`));

  let splitter, content;
  beforeEach(() => {
    splitter = ons._util.createElement(`
      <ons-splitter>
        <ons-splitter-side side="left">Left</ons-splitter-side>
        <ons-splitter-side side="right" collapse>Right</ons-splitter-side>
        <ons-splitter-content>content</ons-splitter-content>
      </ons-splitter>
    `);
    content = splitter.querySelector('ons-splitter-content');
    document.body.appendChild(splitter);
  });

  afterEach(() => {
    splitter.remove();
    splitter = content = null;
  });

  it('provides \'OnsSplitterContentElement\' global variable', () => {
    expect(window.OnsSplitterContentElement).to.be.ok;
  });

  it('provides _hide(), _show(), _destroy() methods', () => {
    expect(content._hide instanceof Function).to.be.ok;
    expect(content._show instanceof Function).to.be.ok;
    expect(content._destroy instanceof Function).to.be.ok;
  });

  describe('child elements', ()=> {
    it('should pass though child nodes', () => {
      expect(content.innerHTML).to.be.equal('content');
    });
  });

  describe('#load()', () => {
    it('returns a promise that resolves to the new page element', () => {
      return expect(content.load('hoge.html')).to.eventually.be.fulfilled.then(
        page => {
          expect(page).to.equal(content.firstChild);
          expect(content.getElementsByClassName('page__content')[0].innerHTML).to.equal('hoge content');
        }
      );
    });
  });

  describe('#page', () => {
    it('should return current page url', () => {
      expect(content.page).to.be.equal(null);

      content.load('hoge.html', {callback: () => {
        expect(content.page).to.be.equal('hoge.html');
        expect(content.innerHTML).to.be.equal('hoge content');
      }});
    });
  });

});

