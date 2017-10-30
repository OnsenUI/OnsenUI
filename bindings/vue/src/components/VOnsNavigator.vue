<template>
  <ons-navigator @postpop.self="_checkSwipe" v-on="unrecognizedListeners">
    <slot>
      <component v-for="page in pageStack" :is="page" :key="page.key || page.name" v-on="unrecognizedListeners"></component>
    </slot>
  </ons-navigator>
</template>

<script>
  import { hasOptions, selfProvider, deriveEvents, deriveDBB } from '../mixins';

  export default {
    mixins: [hasOptions, selfProvider, deriveEvents, deriveDBB],

    props: {
      pageStack: {
        type: Array,
        required: true
      },
      popPage: {
        type: Function,
        default() {
          this.pageStack.pop();
        }
      }
    },

    methods: {
      isReady() {
        if (this.hasOwnProperty('_ready') && this._ready instanceof Promise) {
          return this._ready;
        }
        return Promise.resolve();
      },
      onDeviceBackButton(event) {
        if (this.pageStack.length > 1) {
          this.popPage();
        } else {
          event.callParentHandler();
        }
      },
      _findScrollPage(page) {
        const nextPage = page._contentElement.children.length === 1
          && this.$ons._ons._util.getTopPage(page._contentElement.children[0]);
        return nextPage ? this._findScrollPage(nextPage) : page;
      },
      _setPagesVisibility(start, end, visibility) {
        for (let i = start; i < end; i++) {
          this.$children[i].$el.style.visibility = visibility;
        }
      },
      _reattachPage(pageElement, position = null, restoreScroll) {
        this.$el.insertBefore(pageElement, position);
        restoreScroll instanceof Function && restoreScroll();
        pageElement._isShown = true;
      },
      _redetachPage(pageElement) {
        pageElement._destroy();
        return Promise.resolve();
      },
      _animate({ lastLength, currentLength, lastTopPage, currentTopPage, restoreScroll }) {

        // Push
        if (currentLength > lastLength) {
          let isReattached = false;
          if (lastTopPage.parentElement !== this.$el) {
            this._reattachPage(lastTopPage, this.$el.children[lastLength - 1], restoreScroll);
            isReattached = true;
            lastLength--;
          }
          this._setPagesVisibility(lastLength, currentLength, 'hidden');

          return this.$el._pushPage({ ...this.options, leavePage: lastTopPage })
            .then(() => {
              this._setPagesVisibility(lastLength, currentLength, '');
              if (isReattached) {
                this._redetachPage(lastTopPage);
              }
            });
        }

        // Pop
        if (currentLength < lastLength) {
          this._reattachPage(lastTopPage, null, restoreScroll);
          return this.$el._popPage({ ...this.options }, () => this._redetachPage(lastTopPage));
        }

        // Replace page
        currentTopPage.style.visibility = 'hidden';
        this._reattachPage(lastTopPage, currentTopPage, restoreScroll);
        return this.$el._pushPage({ ...this.options, _replacePage: true }).then(() => this._redetachPage(lastTopPage));
      },
      _checkSwipe(event) {
        if (this.$el.hasAttribute('swipeable') &&
          event.leavePage !== this.$el.lastChild && event.leavePage === this.$children[this.$children.length - 1].$el
        ) {
          this.popPage();
        }
      }
    },

    watch: {
      pageStack(after, before) {
        if (this.$el.hasAttribute('swipeable') && this.$children.length !== this.$el.children.length) {
          return;
        }

        const propWasMutated = after === before; // Can be mutated or replaced
        const lastTopPage = this.$children[this.$children.length - 1].$el;
        const scrollElement = this._findScrollPage(lastTopPage);
        const scrollValue = scrollElement.scrollTop || 0;

        this._pageStackUpdate = {
          lastTopPage,
          lastLength: propWasMutated ? this.$children.length : before.length,
          currentLength: !propWasMutated && after.length,
          restoreScroll: () => scrollElement.scrollTop = scrollValue
        };

        // this.$nextTick(() => { }); // Waits too long, updated() hook is faster and prevents flickerings
      }
    },

    updated() {
      if (this._pageStackUpdate) {
        let currentTopPage = this.$children[this.$children.length - 1].$el;
        let { lastTopPage, currentLength } = this._pageStackUpdate;
        const { lastLength, restoreScroll } = this._pageStackUpdate;
        currentLength = currentLength === false ? this.$children.length : currentLength;

        if (currentTopPage !== lastTopPage) {
          this._ready = this._animate({ lastLength, currentLength, lastTopPage, currentTopPage, restoreScroll });
        } else if (currentLength !== lastLength) {
          currentTopPage.updateBackButton(currentLength > 1);
        }

        lastTopPage = currentTopPage = this._pageStackUpdate = null;
      }
    }
  };
</script>
