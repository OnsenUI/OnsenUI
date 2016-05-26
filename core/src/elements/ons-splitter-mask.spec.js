'use strict';

describe('OnsSplitterMaskElement', () => {
  it('exists', () => {
    expect(window.OnsSplitterMaskElement).to.be.ok;
  });

  let splitter, mask;
  beforeEach(() => {
    splitter = ons._util.createElement(`
      <ons-splitter>
        <ons-splitter-side side="left">Item 1</ons-splitter-side>
        <ons-splitter-mask></ons-splitter-mask>
        <ons-splitter-content></ons-splitter-content>
      </ons-splitter>
    `);
    mask = splitter.querySelector('ons-splitter-mask');

    document.body.appendChild(splitter);
  });

  afterEach(() => {
    splitter.remove();
    splitter = null;
  });
});

