describe('ons._animationOptionsParser', () => {
  it('exists', () => {
    expect(ons._animationOptionsParser).to.be.ok;
  });

  it('accepts valid strings', () => {
    expect(ons._animationOptionsParser.parse('{}')).to.be.ok;
    expect(ons._animationOptionsParser.parse('{ _v: false,  $qw : .1, w$_ : {x : 1e3}, as :\' a\', _2  : [6, {x : \'%^&\'}, 8] ,  q:{x:{p:[1,2]}} , xc:"bnm"   }')).to.be.ok;
    expect(ons._animationOptionsParser.parse('[]')).to.be.ok;
    expect(ons._animationOptionsParser.parse('[{ i: 1},3,  "qw",\'zx\', 1e2]')).to.be.ok;
  });

  it('throws error when the string is invalid', () => {
    expect(() => ons._animationOptionsParser.parse('q:1')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('{@q:1}')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('{2:1}')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('{:1}')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('{x: {w:1}')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('{x: [1,2}')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('[,,]')).to.throw(Error);
    expect(() => ons._animationOptionsParser.parse('[4,5,]')).to.throw(Error);
  });
});
