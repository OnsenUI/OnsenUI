describe('OnsCardElement', () => {
  it('exists', () => {
    expect(window.ons.CardElement).to.be.ok;
  });

  describe('class attribute', () => {
    it('should contain "card" class name automatically', () => {
      const element = new ons.CardElement();
      element.setAttribute('class', 'foobar');
      expect(element.classList.contains('card')).to.be.ok;
      expect(element.classList.contains('foobar')).to.be.ok;
    });
  });

  it('provides \'modifier\' attribute', () => {
    const element = ons._util.createElement('<ons-card>content</ons-card>');

    element.setAttribute('modifier', 'hoge');
    expect(element.classList.contains('card--hoge')).to.be.true;

    element.setAttribute('modifier', 'foo bar');
    expect(element.classList.contains('card--foo')).to.be.true;
    expect(element.classList.contains('card--bar')).to.be.true;
    expect(element.classList.contains('card--hoge')).not.to.be.true;

    element.classList.add('card--piyo');
    element.setAttribute('modifier', 'fuga');
    expect(element.classList.contains('card--piyo')).to.be.true;
    expect(element.classList.contains('card--fuga')).to.be.true;
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = `
        <ons-card>
          <p>Content</p>
        </ons-card>
      `;
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' modifier on Android', () => {
      ons.platform.select('android');
      const e = ons._util.createElement('<ons-card>content</ons-card>');
      expect(e.getAttribute('modifier')).to.equal('material');
      ons.platform.select('');
    });
  });
});
