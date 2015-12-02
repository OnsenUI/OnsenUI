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


  describe('#openRight()', () => {
    it('should open right ons-splitter-side', () => {
      expect(splitter.openRight()).to.be.true;
      expect(splitter.openLeft()).to.be.false;
      expect(splitter.rightIsOpened()).to.be.true;
    });
  });

  describe('#openLeft()', () => {
    it('should return false on "split" mode with ons-splitter-side element', () => {
      expect(splitter.openLeft()).to.be.false;
    });
  });

  describe('#closeRight()', () => {
    it('should close right ons-splitter-side', (done) => {
      expect(splitter.rightIsOpened()).to.be.false;

      expect(splitter.openRight({callback: () => {
        expect(splitter.rightIsOpened()).to.be.true;
        expect(splitter.closeRight({callback: () => {
          expect(splitter.rightIsOpened()).to.be.false;
          done();
        }})).to.be.true;
      }})).to.be.true;
    });
  });

  describe('#closeLeft()', () => {
    it('should return false on "split" mode with ons-splitter-side element', () => {
      expect(splitter.openLeft()).to.be.false;
    });
  });

  describe('#getDeviceBackButtonHandler()', () => {
    it('should return handler object', () => {
      expect(splitter.getDeviceBackButtonHandler()).to.be.an('object');
    });
  });
});
