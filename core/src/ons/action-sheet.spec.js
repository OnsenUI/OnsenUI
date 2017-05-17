'use strict';

describe('ons.openActionSheet', () => {
  it('exists', () => {
    expect(ons.openActionSheet).to.be.ok;
  });

  describe('#actionSheet()', () => {
    let dialog,
      resolvePromise;

    beforeEach(() => {
      resolvePromise = ons.openActionSheet({
        buttons: [
          'l1',
          {
            label: 'l2',
            modifier: 'hoge',
            icon: 'piyo'
          },
          'l3',
          'l4',
        ],
        destructive: 2,
        modifier: 'fuga',
        cancelable: true
      });
      dialog = document.body.querySelector('ons-action-sheet');
    });

    afterEach(() => {
      dialog.remove();
      dialog = null;
    });

    it('requires buttons array', () => {
      expect(() => ons.openActionSheet()).to.throw(Error);
    });

    it('requires a buttons array', () => {
      expect(() => ons.openActionSheet({buttons: []})).to.be.ok;
    });

    it('displays an action sheet', () => {
      expect(dialog).to.be.ok;
      expect(dialog.tagName.toLowerCase()).to.equal('ons-action-sheet');
      expect(dialog.querySelectorAll('ons-action-sheet-button').length).to.equal(4);
    });

    it('accepts a \'title\' parameter', () => {
      const title = 'test';
      ons.openActionSheet({buttons: [], title, id: 'test'});
      const dialog = document.getElementById('test');
      expect(dialog.querySelector('.action-sheet-title').innerHTML).to.equal(title);
      dialog.remove();
    });

    it('accepts a \'modifier\' parameter', () => {
      expect(dialog.getAttribute('modifier').indexOf('fuga')).to.be.above(-1);
    });

    it('accepts a \'destructive\' parameter', () => {
      expect(dialog.querySelectorAll('ons-action-sheet-button')[2].getAttribute('modifier').indexOf('destructive')).to.be.above(-1);
    });

    it('hides the action sheet when a button is clicked', () => {
      const spy = chai.spy.on(dialog, 'hide');
      dialog.querySelector('ons-action-sheet-button').onclick();
      expect(spy).to.have.been.called.once;
    });

    it('resolves to the pressed button index', () => {
      dialog.querySelector('ons-action-sheet-button').onclick();
      return resolvePromise.then(index => expect(index).to.equal(0));
    });

    it('accepts a \'cancelable\' attribute', () => {
      dialog.dispatchEvent(new CustomEvent('dialog-cancel'));
      return resolvePromise.then(index => expect(index).to.equal(-1));
    });

    it('creates icons for the buttons', () => {
      ons.openActionSheet({buttons: [{icon: 'test'}], id: 'test'});
      const dialog = document.getElementById('test');
      expect(dialog.querySelector('.action-sheet-button > ons-icon')).to.be.ok;
      dialog.remove();
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      ons.openActionSheet({buttons: [], id: 'test'});
      const dialog = document.getElementById('test');
      expect(dialog.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
      dialog.remove();
    });

    it('removes \'material\' modifier on iOS', () => {
      ons.platform.select('ios');
      ons.openActionSheet({buttons: [], id: 'test'});
      const dialog = document.getElementById('test');
      expect(dialog.getAttribute('modifier')).not.to.equal('material');
      ons.platform.select('');
      dialog.remove();
    });
  });
});
