'use strict';

describe('ons-util', function() {
  it('provide \'ons._util\' global variable', () => {
    expect(!!window.ons._util).to.equal(true);
  });

  const util = window.ons._util;

  describe('#parseJSONObjectSafely', () => {
    it('should parse normal JSON', () => {
      expect(util.parseJSONObjectSafely('{"hoge":"hoge"}')).to.deep.equal({hoge: 'hoge'});
    });

    it('should parse broken JSON', () => {
      expect(util.parseJSONObjectSafely('{broken}')).to.deep.equal({});
      expect(util.parseJSONObjectSafely('{broken}', {hoge: 'hoge'})).to.deep.equal({hoge: 'hoge'});
    });
  });

  describe('#validated', () => {
    it('exists', () => {
      expect(util.validated).to.be.ok;
    });

    const validated = util.validated;
    const safe = (name, object, options) => {
      const f = validated.bind(null, name, object, options);
      expect(f).to.not.throw(Error);
      return f();
    };
    const shouldThrow = (name, object, options) => {
      expect(validated.bind(null, name, object, options)).to.throw(Error);
    };

    class Animal {
      walk () {
        return true;
      }
    }

    class Doge extends Animal {
      constructor () {
        super();
        this.wow = true;
        this.name = 'Doge';
      }
    }

    class Duck extends Animal {
      constructor () {
        super();
        this.wow = false;
        this.name = 'Dack';
      }
      quack () {
        return this.name + ' quacks';
      }
    }

    it('works for basic cases', () => {
      const tests = {
        'string': 'doge',
        'number': 5,
        'boolean': false,
        'null': null,
        'function': () => 42
      };
      Object.keys(tests).forEach(type => {
        expect(safe(type, tests[type], type)).to.equal(tests[type]);
      });
    });

    it('works with built-in prototypes', () => {
      const tests = {
        'Array': [1, 2, 3],
        'Object': {},
        'Element': document.createElement('div')
      };
      Object.keys(tests).forEach(type => {
        expect(safe(type, tests[type], window[type])).to.equal(tests[type]);
      });
    });

    it('works with array of types', () => {
      expect(safe('42', 42, ['number', 'string'])).to.equal(42);
      expect(safe('doge', 'doge', ['boolean', 'string'])).to.equal('doge');
      expect(safe('true', true, ['boolean', 'string'])).to.equal(true);
      expect(safe('null', null, ['null', 'string'])).to.equal(null);
      expect(safe('null', null, ['string', 'null'])).to.equal(null);

      shouldThrow('true', true, ['number', 'function']);
    });

    it('works with custom prototypes', () => {
      const animals = [new Doge(), new Duck(), new Animal()];
      const types = [Doge, 'string'];

      expect(safe('Doge', animals[0], Doge)).to.equal(animals[0]);
      expect(safe('Duck', animals[1], Duck)).to.equal(animals[1]);
      expect(safe('Doge', animals[0], Animal)).to.equal(animals[0]);
      expect(safe('Duck', animals[1], Animal)).to.equal(animals[1]);
      expect(safe('Animal', animals[2], Animal)).to.equal(animals[2]);

      shouldThrow('Doge', animals[0], Duck);
      shouldThrow('Duck', animals[1], Doge);
      shouldThrow('Animal', animals[2], Duck);
      shouldThrow('Animal', animals[2], Doge);
    });

    it('works with options object', () => {
      expect(safe('1.', 'doge', {type: 'string'})).to.equal('doge');
      expect(safe('2.', 'doge', {type: ['number', 'string']})).to.equal('doge');
      expect(safe('3.', 'doge', {type: ['string', 'number']})).to.equal('doge');
      shouldThrow('4.', 'doge', {type: 'number'});
    });

    it('works with functions - options.safeCall', () => {
      const foo = safe('foo', null, {type: 'function', safeCall: true});
      const bar = safe('bar', () => 42, {type: 'function', safeCall: true});
      expect(foo()).to.be.undefined;
      expect(bar()).to.equal(42);
    });

    it('works with functions - options.returns', () => {
      const options = [
        {type: 'function', returns: 'number', safeCall: true},
        {type: 'function', returns: 'number'}
      ];
      const functions = [
        safe('foo', () => 42, options[0]),
        safe('foo', () => 42, options[1]),
        safe('bar', () => 'bar', options[0]),
        safe('bar', () => 'bar', options[1]),
        safe('baz', null, options[0])
      ];

      functions.slice(0, 2).forEach(f => expect(f()).to.equal(42));
      functions.slice(2).forEach(f => shouldThrow(f));
      shouldThrow('baz', null, options[1]);
    });


    it('works with functions - options.dynamicCall', () => {
      const object = {
        foo: () => 42,
        bar: 64,
        baz: function () { return this.bar; }
      };
      const options = [
        {type: 'function', dynamicCall: {object, key: 'foo'}},
        {type: 'function', dynamicCall: {object, key: 'foo'}, safeCall: true},
        {type: 'function', dynamicCall: {object, key: 'foo'}, returns: 'number'},
        {type: 'function', dynamicCall: {object, key: 'foo'}, returns: 'number', safeCall: true},
        {type: 'function', dynamicCall: {object, key: 'baz'}, returns: 'number', safeCall: true}
      ];

      const functions = options.map((option, i) => validated(i, null, option));
      functions.forEach(f => expect(f).to.not.throw(Error));

      expect(functions[0]()).to.equal(42);
      object.foo = object.baz;
      expect(functions[0]()).to.equal(64);
      object.bar = 32;
      expect(functions[0]()).to.equal(32);
      object.bar = 'bar';
      expect(functions[2]).to.throw(Error);
      expect(functions[3]).to.throw(Error);

      options.forEach((option, i) => {
        option.dynamicCall.key = 'speak';
        functions[i] = validated(i, null, option);
      });
      options.map((option, i) => validated('speak' + i, null, option));
      functions.forEach((f, i) => i == 1 ? expect(f).to.not.throw(Error) : expect(f).to.throw(Error));

      object.speak = () => 2;
      functions.forEach(f => expect(f).to.not.throw(Error));
    });

    it('works with complex objects - options.object', () => {
      const animals = [new Doge(), new Duck(), new Animal()];
      const options = i => ({
        type: [Doge, Duck],
        object: {
          name: 'string',
          wow: 'boolean',
          walk: {type: 'function', returns: 'boolean'},
          talk: {type: 'function', dynamicCall: {object: animals[i], key: 'quack'}, safeCall: true}
        }
      });
      const functions = [
        safe('doge', animals[0], options(0)),
        safe('duck', animals[1], options(1))
      ];
      shouldThrow('animal', animals[2], options(2));

      expect(functions[1].talk()).to.equal('Dack quacks');
      expect(functions[0].talk()).to.be.undefined;
      animals[0].talk = function () { this.name + ' talks'; };
      expect(functions[0].talk()).to.be.undefined;
      animals[0].quack = function () { return 'such ' + this.name; };
      expect(functions[0].talk()).to.equal('such Doge');
    });
  });
});

