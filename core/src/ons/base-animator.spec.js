'use strict';

describe('BaseAnimator', () => {
  class TestGenericAnimator extends ons._BaseAnimator { }
  class TestFinalAnimator extends TestGenericAnimator {
    method1() {
    }
    method2() {
    }
  }

  it('can be registered', () => {
    const MyAnimator = TestFinalAnimator.extend();
    expect(MyAnimator.prototype).to.be.an.instanceof(TestGenericAnimator);
  });

  it('overwrites specified properties', (done) => {
    const CustomAnimatorClass = TestFinalAnimator.extend({
      duration: 'something different',
      method2: function() {
        done();
      }
    });

    const customAnimatorInstance = new CustomAnimatorClass();
    const originalAnimatorInstance = new TestFinalAnimator();

    expect(customAnimatorInstance.method1).to.equal(originalAnimatorInstance.method1);
    expect(customAnimatorInstance.method2).to.not.equal(originalAnimatorInstance.method2);
    expect(customAnimatorInstance.duration).to.not.equal(originalAnimatorInstance.duration);

    customAnimatorInstance.method2();
  })
});
