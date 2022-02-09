'use strict';

describe('ons.modifier', () => {
  const element = document.createElement('div');

  it('exists', () => {
    expect(ons.modifier).to.be.ok;
  });

  it('adds modifiers', () => {
    expect(element.getAttribute('modifier')).to.be.null;
    ons.modifier.add(element, 'test1', 'test2');
    expect(element.getAttribute('modifier')).to.equal('test1 test2');
  });

  it('removes modifiers', () => {
    ons.modifier.remove(element, 'test1');
    expect(element.getAttribute('modifier')).to.equal('test2');
  });

  it('checks modifiers', () => {
    expect(element.getAttribute('modifier').indexOf('test1')).to.equal(-1);
    expect(ons.modifier.contains(element, 'test1')).to.be.false;
    expect(element.getAttribute('modifier').indexOf('test2')).not.to.equal(-1);
    expect(ons.modifier.contains(element, 'test2')).to.be.true;
  });

  it('toggles modifiers', () => {
    expect(element.getAttribute('modifier').indexOf('test1')).to.equal(-1);
    ons.modifier.toggle(element, 'test1');
    expect(element.getAttribute('modifier').indexOf('test1')).not.to.equal(-1);

    expect(element.getAttribute('modifier').indexOf('test2')).not.to.equal(-1);
    ons.modifier.toggle(element, 'test2');
    expect(element.getAttribute('modifier').indexOf('test2')).to.equal(-1);

    // Force
    ons.modifier.toggle(element, 'test1', true);
    expect(element.getAttribute('modifier').indexOf('test1')).not.to.equal(-1);
    ons.modifier.toggle(element, 'test2', true);
    expect(element.getAttribute('modifier').indexOf('test2')).not.to.equal(-1);
  });
});
