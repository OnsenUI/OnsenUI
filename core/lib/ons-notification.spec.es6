describe('ons.notification', () => {
  it('exists', () => {
    expect(ons.notification).to.be.ok;
  });

  describe('#alert()', () => {
    it('displays an alert dialog', () => {
      ons.notification.alert({message: 'hoge'});
      let dialog = document.body.querySelector('ons-alert-dialog');
      expect(dialog).to.be.ok;
      expect(dialog.innerHTML.indexOf('hoge')).to.be.above(-1);
      dialog.destroy();
    });
  });

  describe('#confirm()', () => {
    it('displays an alert dialog', () => {
      ons.notification.confirm({message: 'hoge'});
      let dialog = document.body.querySelector('ons-alert-dialog');
      expect(dialog).to.be.ok;
      expect(dialog.innerHTML.indexOf('hoge')).to.be.above(-1);
      dialog.destroy();
    });
  });

  describe('#prompt()', () => {
    it('displays an alert dialog', () => {
      ons.notification.prompt({message: 'hoge'});
      let dialog = document.body.querySelector('ons-alert-dialog');
      expect(dialog).to.be.ok;
      expect(dialog.innerHTML.indexOf('hoge')).to.be.above(-1);
      dialog.destroy();
    });
  });
});
