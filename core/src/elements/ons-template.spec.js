'use strict';

describe('ons-template', () => {
  it('provides \'OnsTemplateElement\' global variable', () => {
    expect(window.OnsTemplateElement).to.be.ok;
  });

  it('doesn\'t have any children', () => {
    var element = new OnsTemplateElement();
    expect(element.hasChildNodes()).not.to.be.true;
  });

  it('has a \'createdCallback()\' function', function(done) {
    var div = document.createElement('div'),
      message = 'hoge';

    document.body.appendChild(div);

    div.innerHTML = `<ons-template>${message}</ons-template>`;
    var element = div.querySelector('ons-template');

    setImmediate(() => {
      expect(element.template).not.to.contain('fuga');
      expect(element.template).to.contain(message);
      expect(element.firstChild).not.to.be.ok;
      done();
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-template><ons-page>Content</ons-page></ons-template>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });
});
