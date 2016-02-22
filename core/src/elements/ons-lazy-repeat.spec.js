'use strict';

describe('OnsLazyRepeatElement', () => {
  let element;
  let lazyRepeat;

  beforeEach(() => {
    element = ons._util.createElement(`
      <ons-page>
        <ons-toolbar>
          <div class="center"></div>
        </ons-toolbar>
        <ons-list>
          <ons-lazy-repeat id="my-lazy-repeat">
            <ons-list-item>aaa</ons-list-item>
          </ons-lazy-repeat>
        </ons-list>
      </ons-page>
    `);

    document.body.appendChild(element);
    lazyRepeat = document.querySelector('#my-lazy-repeat');

    lazyRepeat.delegate = {
      calculateItemHeight: (i) => 44,

      createItemContent: (i, template) => {
        var dom = template.cloneNode(true);
        dom.innerText = i;

        return dom;
      },

      countItems: () => 10000000
    };
  });

  afterEach(() => {
    element.remove();
    element = lazyRepeat = null;
  });

  it('should exist', () => {
    expect(window.OnsLazyRepeatElement).to.be.ok;
  });

  describe('#refresh', () => {
    it('should be callable', () => {
      lazyRepeat.refresh();
    });
  });

  describe('#delegate', () => {
    it('should accept delegate object twice', () => {
      lazyRepeat.delegate = {
        countItems: () => 42,
        calculateItemHeight: i => 42,
        createItemContent: i => document.createElement('div')
      };
    });
  });
});
