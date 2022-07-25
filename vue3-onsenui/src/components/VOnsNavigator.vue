<template>
  <ons-navigator @postpop.self="_checkUserInteraction" :options.prop="options">
    <slot>
      <component
        v-for="(page, index) in extendsFix"
        :is="page"
        :key="index"
        v-bind="{ ...unrecognizedListeners, ...page.onsNavigatorProps }"
      ></component>
    </slot>
  </ons-navigator>
</template>

<script>
  import NavigatorElement from 'onsenui/esm/elements/ons-navigator.js';
  import { hasOptions, selfProvider, deriveEvents, deriveDBB, unrecognizedListeners } from '../mixins/index.js';

  const name = 'v-ons-navigator';

  export default {
    name,
    mixins: [hasOptions, selfProvider, deriveEvents(name), deriveDBB, unrecognizedListeners(NavigatorElement)],

    emits: ['update:pageStack'],

    props: {
      pageStack: {
        type: Array,
        required: true
      }
    },

    data() {
      return {
        internalPageStack: this.pageStack
      };
    },

    computed: {
      extendsFix() {
        // workaround for Vue bug where extends doesn't work with runtime template compilation
        // https://github.com/vuejs/core/issues/6249
        return this.internalPageStack.map(page =>
          page.extends ?
            {...page, template: page.extends.template} :
            page
        );
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
        if (this.internalPageStack.length > 1) {
          const lastTopPage = this.$el.children[this.internalPageStack.length - 1];
          const scrollElement = this._findScrollPage(lastTopPage);
          const scrollValue = scrollElement.scrollTop || 0;
          this._pageStackUpdate = {
            lastTopPage,
            lastLength: this.internalPageStack.length,
            currentLength: this.internalPageStack.length - 1,
            restoreScroll: () => scrollElement.scrollTop = scrollValue
          };

          this._popPage();
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
          cb(this.$el.children[i]);
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
      _animate({ lastLength, currentLength, lastTopPage, currentTopPage, currentTopPageOptions, restoreScroll }) {
        const pushedOptions = this.internalPageStack[this.internalPageStack.length - 1].onsNavigatorOptions
          || currentTopPageOptions
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
              this._popPage();
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
      _checkUserInteraction(event) {
        // update the internal page stack in the case where user swiped to pop or clicked ons-back-button
        if (event.swipeToPop || event.onsBackButton) {
          this._popPage();
        }
      },
      _popPage() {
        this.internalPageStack = this.internalPageStack.slice(0, -1);
      }
    },

    watch: {
      pageStack(after, before) {
        if (this.pageStack !== this.internalPageStack) {

          const lastTopPage = this.$el.children[this.internalPageStack.length - 1];
          const scrollElement = this._findScrollPage(lastTopPage);
          const scrollValue = scrollElement.scrollTop || 0;

          this._pageStackUpdate = {
            lastTopPage,
            lastLength: before.length,
            currentLength: after.length,
            restoreScroll: () => scrollElement.scrollTop = scrollValue
          };

          this.internalPageStack = this.pageStack;
        }

        // this.$nextTick(() => { }); // Waits too long, updated() hook is faster and prevents flickerings
      },
      internalPageStack(after, before) {
        this.$emit('update:pageStack', this.internalPageStack);
      }
    },

    updated() {
      if (this._pageStackUpdate) {
        let currentTopPage = this.$el.children[this.internalPageStack.length - 1];
        const currentTopPageOptions = this.internalPageStack[this.internalPageStack.length - 1].onsNavigatorOptions;
        let { lastTopPage } = this._pageStackUpdate;
        const { lastLength, restoreScroll, currentLength } = this._pageStackUpdate;

        if (currentTopPage !== lastTopPage) {
          this._ready = this._animate({ lastLength, currentLength, lastTopPage, currentTopPage, currentTopPageOptions, restoreScroll });
        } else if (currentLength !== lastLength) {
          currentTopPage.updateBackButton(currentLength > 1);
        }

        lastTopPage = currentTopPage = this._pageStackUpdate = null;
      }
    }
  };
</script>
