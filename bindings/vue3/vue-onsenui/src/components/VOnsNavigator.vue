<template>
  <ons-navigator @postpop.self="_checkSwipe" :options="options">
    <component
      v-for="page in pageStack"
      :is="page"
      :key="page.key || page.name"
      v-bind="{ ...unrecognizedListeners, ...page.onsNavigatorProps }"
      :ref="setPageRef"
    ></component>
  </ons-navigator>
</template>

<script>
  import 'onsenui/esm/elements/ons-navigator';
  import { hasOptions, selfProvider, deriveEvents, deriveDBB } from '../mixins';

  const name = 'v-ons-navigator';

  export default {
    name,
    mixins: [hasOptions, selfProvider, deriveEvents(name), deriveDBB],

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

    data() {
      return {
        pageRefs: []
      }
    },

    methods: {
      setPageRef(el) {
        if (el) {
          this.pageRefs.push(el);
        }
      },
      isReady() {
        if (Object.prototype.hasOwnProperty.call(this, '_ready') && this._ready instanceof Promise) {
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
      _eachPage(start, end, cb) {
        for (let i = start; i < end; i++) {
          cb(this.pageRefs[i].$el);
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
        const pushedOptions =
          // onsNavigatorOptions defined inside component's data property
          this.pageRefs[this.pageRefs.length - 1].onsNavigatorOptions
          // onsNavigatorOptions defined at same level as data and methods
          || this.pageStack[this.pageStack.length - 1].onsNavigatorOptions
          // onsNavigatorOptions is not defined
          || {};

        // Push
        if (currentLength > lastLength) {
          let isReattached = false;
          if (lastTopPage.parentElement !== this.$el) {
            this._reattachPage(lastTopPage, this.$el.children[lastLength - 1], restoreScroll);
            isReattached = true;
            lastLength--;
          }

          this._eachPage(lastLength, currentLength, el => { el.style.visibility = 'hidden' });
          this._eachPage(lastLength, currentLength - 1, el => { el.pushedOptions = pushedOptions });

          return this.$el._pushPage({ ...pushedOptions, leavePage: lastTopPage })
            .then(() => {
              setImmediate(() => {
                this._eachPage(lastLength, currentLength, el => { el.style.visibility = '' });
                this._eachPage(lastLength - 1, currentLength - 1, el => { el.style.display = 'none' });
              });

              if (isReattached) {
                this._redetachPage(lastTopPage);
              }
            }, () => { // push failed or was canceled
              this._canceled = true;
              this.pageStack.pop();
            });
        }

        // Pop
        if (currentLength < lastLength) {
          this._reattachPage(lastTopPage, null, restoreScroll);
          return this.$el._popPage({ }, () => this._redetachPage(lastTopPage));
        }

        // Replace page
        currentTopPage.style.visibility = 'hidden';
        this._reattachPage(lastTopPage, currentTopPage, restoreScroll);
        return this.$el._pushPage({ ...pushedOptions, _replacePage: true })
          .then(() => this._redetachPage(lastTopPage));
      },
      _checkSwipe(event) {
        if (this.$el.hasAttribute('swipeable') &&
          event.leavePage !== this.$el.lastChild && event.leavePage === this.pageRefs[this.pageRefs.length - 1].$el
        ) {
          this.popPage();
        }
      }
    },

    watch: {
      pageStack: {
        handler(after, before) {
          // Set inheritAttrs to false to stop custom event listeners being
          // applied to the native ons-page element. They are already applied to
          // the native ons-navigator element (which will fire native ons-page
          // events due to bubbling) so without this listeners for events fired
          // by ons-page (e.g. 'show') would be called twice.
          this.pageStack.forEach(page => page.inheritAttrs = false);

          if (this.$el) { // if mounted
            if (this.$el.hasAttribute('swipeable') && this.pageRefs.length !== this.$el.children.length) {
              return;
            }

            // watcher triggered by undoing a canceled push or pop
            if (this._canceled) {
              this._canceled = null;
              return;
            }

            const propWasMutated = after === before; // Can be mutated or replaced
            const lastTopPage = this.pageRefs[this.pageRefs.length - 1].$el;
            const scrollElement = this._findScrollPage(lastTopPage);
            const scrollValue = scrollElement.scrollTop || 0;

            this._pageStackUpdate = {
              lastTopPage,
              lastLength: propWasMutated ? this.pageRefs.length : before.length,
              currentLength: !propWasMutated && after.length,
              restoreScroll: () => scrollElement.scrollTop = scrollValue
            };

            // this.$nextTick(() => { }); // Waits too long, updated() hook is faster and prevents flickerings
          }
        },
        immediate: true
      }
    },

    beforeUpdate() {
      this.pageRefs = [];
    },

    updated() {
      if (this._pageStackUpdate) {
        let currentTopPage = this.pageRefs[this.pageRefs.length - 1].$el;
        let { lastTopPage, currentLength } = this._pageStackUpdate;
        const { lastLength, restoreScroll } = this._pageStackUpdate;
        currentLength = currentLength === false ? this.pageRefs.length : currentLength;

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
