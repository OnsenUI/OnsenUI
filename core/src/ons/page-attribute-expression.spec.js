'use strict';

describe('ons.pageAttributeExpression', () => {
  const pae = ons.pageAttributeExpression;

  describe('#defineVariable()', () => {
    it('should define a variable', () => {
      pae.defineVariable('hoge', 'fuga');
      expect(pae.getVariable('hoge')).to.equal('fuga');
      pae.removeVariable('hoge');
    });

    it('must have a string as "name" argument.', () => {
      expect(() => pae.defineVariable(123, 'hoge')).to.throw(Error);
    });

    it('must have a function or string as "value" argument', () => {
      expect(() => pae.defineVariable('hoge', 123)).to.throw(Error);
      expect(() => pae.defineVariable('hoge', () => 'fuga')).not.to.throw(Error);
      pae.removeVariable('hoge');
      expect(() => pae.defineVariable('hoge', 'fuga')).not.to.throw(Error);
      pae.removeVariable('hoge');
    });

    it('can only overwrite variables if "overwrite" argument is true', () => {
      pae.defineVariable('hoge', 'fuga');
      expect(() => pae.defineVariable('hoge', 'piyo')).to.throw(Error);
      expect(pae.getVariable('hoge')).to.equal('fuga');
      expect(() => pae.defineVariable('hoge', 'piyo', true)).not.to.throw(Error);
      expect(pae.getVariable('hoge')).to.equal('piyo');
      pae.removeVariable('hoge');
    });
  });

  describe('#removeVariable()', () => {
    it('removes a variables', () => {
      pae.defineVariable('hoge', 'fuga');
      expect(pae.getVariable('hoge')).not.to.be.null;
      pae.removeVariable('hoge');
      expect(pae.getVariable('hoge')).to.be.null;
    });
  });

  describe('#getAllVariables()', () => {
    it('returns all variables', () => {
      pae.defineVariable('hoge', 'fuga');
      pae.defineVariable('foo', 'bar');

      const variables = pae.getAllVariables();
      expect(variables.hoge).to.equal('fuga');
      expect(variables.foo).to.equal('bar');
      pae.removeVariable('hoge');
      pae.removeVariable('foo');
    });
  });

  describe('#_parsePart()', () => {
    it('requires a string with length more than 0', () => {
      expect(() => pae._parsePart('')).to.throw(Error);
    });

    it('does not support nested interpolation', () => {
      expect(() => pae._parsePart('${{foo}}')).to.throw(Error);
    });

    it('requires } to be preceeded by ${', () => {
      expect(() => pae._parsePart('test}.html')).to.throw(Error);
    });

    it('requires all interpolations to be terminated', () => {
      expect(() => pae._parsePart('${hoge')).to.throw(Error);
    });

    it('returns an Array', () => {
      expect(pae._parsePart('${hoge}.html')).to.be.an.instanceof(Array);
    });

    it('splits the string into tokens', () => {
      const rv = pae._parsePart('${hoge}${foo}.html');
      expect(rv[0]).to.equal('${hoge}');
      expect(rv[1]).to.equal('${foo}');
      expect(rv[2]).to.equal('.html');
    });
  });

  describe('#_replaceToken()', () => {
    beforeEach(() => {
      pae.defineVariable('hoge', 'fuga');
      pae.defineVariable('foo', () => 'bar');
    });

    afterEach(() => {
      pae.removeVariable('hoge');
      pae.removeVariable('foo');
    });

    it('does not replace if the token is not in the form "${name}"', () => {
      expect(pae._replaceToken('hoge')).to.equal('hoge');
    });

    it('throws an error if the variable does not exist', () => {
      expect(() => pae._replaceToken('${piyo}')).to.throw(Error);
    });

    it('throws an error if the variable is a function and it does not return a string.', () => {
      pae.defineVariable('foobar', () => 123);
      expect(() => pae._replaceToken('${foobar}')).to.throw(Error);
      pae.removeVariable('foobar');
    });

    it('replaces the token', () => {
      expect(pae._replaceToken('${hoge}')).to.equal('fuga');
      expect(pae._replaceToken('${foo}')).to.equal('bar');
    });

    it('supports leading and trailing whitespaces for the variable name', () => {
      expect(pae._replaceToken('${ hoge}')).to.equal('fuga');
      expect(pae._replaceToken('${hoge }')).to.equal('fuga');
      expect(pae._replaceToken('${ hoge }')).to.equal('fuga');
    });
  });

  describe('#evaluate()', () => {
    beforeEach(() => {
      pae.defineVariable('hoge', 'fuga');
      pae.defineVariable('foo', () => 'bar');
    });

    afterEach(() => {
      pae.removeVariable('hoge');
      pae.removeVariable('foo');
    });

    it('returns an Array', () => {
      expect(pae.evaluate('page1.html, page2.html')).to.be.an.instanceof(Array);
    });

    it('returns a list of pages', () => {
      const rv = pae.evaluate('page1.html, page2.html');
      expect(rv.length).to.equal(2);
      expect(rv[0]).to.equal('page1.html');
      expect(rv[1]).to.equal('page2.html');
    });

    it('replaces ${hoge} with the value of "hoge"', () => {
      const rv = pae.evaluate('${hoge}.html');
      expect(rv[0]).to.equal('fuga.html');
    });

    it('replaces ${foo} with the return volue of "foo"', () => {
      const rv = pae.evaluate('${foo}.html');
      expect(rv[0]).to.equal('bar.html');
    });

    it('supports multiple interpolations in one string', () => {
      const rv = pae.evaluate('${foo}${hoge}.html, ${hoge}${foo}.html');
      expect(rv[0]).to.equal('barfuga.html');
      expect(rv[1]).to.equal('fugabar.html');
    });

    it('supports leading and trailing whitespaces', () => {
      const rv = pae.evaluate(' ${foo}${hoge}.html, ${hoge}${foo}.html ');
      expect(rv[0]).to.equal('barfuga.html');
      expect(rv[1]).to.equal('fugabar.html');
    });

    it('requires a valid string', () => {
      const invalidArguments = [
        ',hoge.html',
        'hoge.html,',
        'hoge.html,,fuga.html',
        '${hoge.html',
        '${${hoge}}'
      ];

      invalidArguments.forEach((argument) => {
        expect(() => pae.evaluate(argument)).to.throw(Error);
      });
    });
  });
});
