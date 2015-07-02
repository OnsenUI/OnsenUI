
describe('AsyncHook', function() {
  it('provide \'ons._internal.AsyncHook\' global variable', function() {
    expect(!!window.ons._internal.AsyncHook).to.equal(true);
  });

  describe('.add() and .remove()', function() {
    var AsyncHook = ons._internal.AsyncHook;

    it('should work on basic testcases', function() {
      var hook = new AsyncHook();
      var callback;

      expect(hook._callbacks.length).to.equal(0);
      hook.add(callback = function(target, next) {
        next(target);
      });
      expect(hook._callbacks.length).to.equal(1);
      hook.remove(callback);
      expect(hook._callbacks.length).to.equal(0);
    });

    it('should raise an exception after freeze() is invoked', function() {
      var hook = new AsyncHook();
      hook.freeze();

      expect(function() {
        hook.add(function() {});
      }).to.throw();

      expect(function() {
        hook.remove(function() {});
      }).to.throw();
    });
  });

  describe('.run()', function() {
    var AsyncHook = ons._internal.AsyncHook;

    it('should work on basic testcases', function(done) {
      var hook = new AsyncHook();

      hook.add(function(next, target) {
        next(target + target);
      });
      hook.add(function(next, target) {
        next(1 + target);
      });
      hook.run(function(result) {
        expect(result).to.be.equal(5);
        done();
      }, 2);
    });

    it('should work on empty callbacks', function(done) {
      var hook = new AsyncHook();

      hook.run(function(result) {
        expect(result).to.be.equal(2);
        done();
      }, 2);
    });

    it('should work on no target', function(done) {
      var hook = new AsyncHook();

      hook.add(function(next) {
        setTimeout(next, 20);
      });
      hook.add(function(next) {
        setTimeout(next, 10);
      });
      hook.run(function() {
        done();
      }, 2);
    });
  });
});

