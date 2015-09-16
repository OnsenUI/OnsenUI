
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

  describe('child elements', ()=> {
    it('should pass though child nodes', () => {
      expect(content.innerHTML).to.be.equal('content');
    });
  });

  describe('#load()', () => {
    it('should load page url', () => {
      content.load('hoge.html');
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

