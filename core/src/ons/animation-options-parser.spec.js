'use strict';

describe('ons._animationOptionsParser', () => {
  it('exists', () => {
    expect(ons._animationOptionsParser).to.be.an.instanceOf(Function);
  });

  it('parses valid strings', () => {
    let result = ons._animationOptionsParser('{ }');
    expect(result).to.be.ok;
    expect(Object.keys(result).length).to.equal(0);

    result = ons._animationOptionsParser('{ _v: false,  $qw : .1, w$_ : {x : 1e3}, as :\' a\'}');
    expect(result).to.be.ok;
    expect(Object.keys(result).length).to.equal(4);
    expect(result._v).to.equal(false);
    expect(result.$qw).to.equal(0.1);
    expect(result.w$_.x).to.equal(1000);
    expect(result.as).to.equal(' a');

    result = ons._animationOptionsParser('{_2  : [6, {x : \'%^&\'}, 8] ,  q:{x:{p:[1,2]}} , xc:"bnm"   }');
    expect(result).to.be.ok;
    expect(Object.keys(result).length).to.equal(3);
    expect(result._2.length).to.equal(3);
    expect(result._2[1].x).to.equal('%^&');
    expect(result.q.x.p.length).to.equal(2);
    expect(result.xc).to.equal('bnm');

    result = ons._animationOptionsParser('[ ]');
    expect(result).to.be.ok;
    expect(result.length).to.equal(0);

    result = ons._animationOptionsParser('[{ i: 1},3,  "qw",\'zx\', 1e2  ]');
    expect(result).to.be.ok;
    expect(result.length).to.equal(5);
    expect(result[0].i).to.equal(1);
    expect(result[1]).to.equal(3);
    expect(result[2]).to.equal('qw');
    expect(result[3]).to.equal('zx');
    expect(result[4]).to.equal(100);
  });

  it('parses HTML attributes', () => {
    const alertDialog = ons._util.createElement(
      `<ons-alert-dialog animation="default" animation-options="{delay: 1, duration: 1, timing: 'ease-in'}">
      </ons-alert-dialog>`
    );

    const attribute = ons._animationOptionsParser(alertDialog.getAttribute('animation-options'));
    expect(attribute).to.deep.equal({delay: 1, duration: 1, timing: 'ease-in'});
  });

  it('throws error if string is invalid', () => {
    expect(() => ons._animationOptionsParser('q:1')).to.throw(Error);
    expect(() => ons._animationOptionsParser('{@q:1}')).to.throw(Error);
    expect(() => ons._animationOptionsParser('{2:1}')).to.throw(Error);
    expect(() => ons._animationOptionsParser('{\'q\':1}')).to.throw(Error);
    expect(() => ons._animationOptionsParser('{:1}')).to.throw(Error);
    expect(() => ons._animationOptionsParser('{x: {w:1}')).to.throw(Error);
    expect(() => ons._animationOptionsParser('{x: [1,2}')).to.throw(Error);
    expect(() => ons._animationOptionsParser('[,,]')).to.throw(Error);
    expect(() => ons._animationOptionsParser('[4,5,]')).to.throw(Error);
  });
});
