describe('ons._animationOptionsParser', () => {
  it('exists', () => {
    expect(ons._animationOptionsParser).to.be.ok;
    expect(ons._util.animationOptionsParse).to.equal(ons._animationOptionsParser.parse);
  });

  it('parses valid strings', () => {
    let result = ons._animationOptionsParser.parse('{ }');
    expect(result).to.be.ok;
    expect(Object.keys(result).length).to.equal(0);

    result = ons._animationOptionsParser.parse('{ _v: false,  $qw : .1, w$_ : {x : 1e3}, as :\' a\'}');
    expect(result).to.be.ok;
    expect(Object.keys(result).length).to.equal(4);
    expect(result._v).to.equal(false);
    expect(result.$qw).to.equal(0.1);
    expect(result.w$_.x).to.equal(1000);
    expect(result.as).to.equal(' a');

    result = ons._animationOptionsParser.parse('{_2  : [6, {x : \'%^&\'}, 8] ,  q:{x:{p:[1,2]}} , xc:"bnm"   }');
    expect(result).to.be.ok;
    expect(Object.keys(result).length).to.equal(3);
    expect(result._2.length).to.equal(3);
    expect(result._2[1].x).to.equal('%^&');
    expect(result.q.x.p.length).to.equal(2);
    expect(result.xc).to.equal('bnm');

    result = ons._animationOptionsParser.parse('[ ]');
    expect(result).to.be.ok;
    expect(result.length).to.equal(0);

    result = ons._animationOptionsParser.parse('[{ i: 1},3,  "qw",\'zx\', 1e2  ]');
    expect(result).to.be.ok;
    expect(result.length).to.equal(5);
    expect(result[0].i).to.equal(1);
    expect(result[1]).to.equal(3);
    expect(result[2]).to.equal('qw');
    expect(result[3]).to.equal('zx');
    expect(result[4]).to.equal(100);
  });

  it('parses HTML attributes', () => {
    let alertDialog = ons._util.createElement(
      `<ons-alert-dialog animation="default" animation-options="{delay: 1, duration: 1, timing: 'ease-in'}">
      </ons-alert-dialog>`
    );
    let spy = chai.spy.on(alertDialog._animatorFactory, 'newAnimator');
    alertDialog.show();
    expect(spy).to.have.been.called.with({animationOptions:{delay:1,duration:1,timing:'ease-in'}});
    alertDialog.remove();
  });

  it('throws error when the string is invalid', () => {
    expect(() => ons._animationOptionsParser.parse('q:1')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('{@q:1}')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('{2:1}')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('{\'q\':1}')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('{:1}')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('{x: {w:1}')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('{x: [1,2}')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('[,,]')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('[4,5,]')).to.throw(Error);
  });
});
