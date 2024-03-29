import animationOptionsParse from './animation-options-parser.js';

describe('animationOptionsParser', () => {
  it('exists', () => {
    expect(animationOptionsParse).to.be.an.instanceOf(Function);
  });

  it('parses valid strings', () => {
    let result = animationOptionsParse('{ }');
    expect(result).to.be.ok;
    expect(Object.keys(result).length).to.equal(0);

    result = animationOptionsParse('{ _v: false,  $qw : .1, w$_ : {x : 1e3}, \'as\' :\' a\'}');
    expect(result).to.be.ok;
    expect(Object.keys(result).length).to.equal(4);
    expect(result._v).to.equal(false);
    expect(result.$qw).to.equal(0.1);
    expect(result.w$_.x).to.equal(1000);
    expect(result.as).to.equal(' a');

    result = animationOptionsParse('{_2  : [6, {x : \'%^&\'}, 8] ,  q:{x:{p:[1,2]}} , xc:"bnm"   }');
    expect(result).to.be.ok;
    expect(Object.keys(result).length).to.equal(3);
    expect(result._2.length).to.equal(3);
    expect(result._2[1].x).to.equal('%^&');
    expect(result.q.x.p.length).to.equal(2);
    expect(result.xc).to.equal('bnm');

    result = animationOptionsParse('[ ]');
    expect(result).to.be.ok;
    expect(result.length).to.equal(0);

    result = animationOptionsParse('[{ i: 1},3,  "qw",\'zx\', 1e2  ]');
    expect(result).to.be.ok;
    expect(result.length).to.equal(5);
    expect(result[0].i).to.equal(1);
    expect(result[1]).to.equal(3);
    expect(result[2]).to.equal('qw');
    expect(result[3]).to.equal('zx');
    expect(result[4]).to.equal(100);
  });

  it('parses HTML attributes', () => {
    let alertDialog = document.createElement('div');
    alertDialog.innerHTML = `<ons-alert-dialog animation="default" animation-options="{delay: 1, duration: 1, timing: 'ease-in'}"></ons-alert-dialog>`;
    alertDialog = alertDialog.firstChild;

    const spy = chai.spy.on(alertDialog._animatorFactory, 'newAnimator');
    alertDialog.show();
    expect(spy).to.have.been.called.with({animationOptions: {delay: 1, duration: 1, timing: 'ease-in'}});
    alertDialog.remove();
  });

  it('throws error when the string is invalid', () => {
    expect(() => animationOptionsParse('q:1')).to.throw(Error);
    expect(() => animationOptionsParse('{@q:1}')).to.throw(Error);
    expect(() => animationOptionsParse('{2:1}')).to.throw(Error);
    expect(() => animationOptionsParse('{:1}')).to.throw(Error);
    expect(() => animationOptionsParse('{x: {w:1}')).to.throw(Error);
    expect(() => animationOptionsParse('{x: [1,2}')).to.throw(Error);
    expect(() => animationOptionsParse('[,,]')).to.throw(Error);
    expect(() => animationOptionsParse('[4,5,]')).to.throw(Error);
  });
});
