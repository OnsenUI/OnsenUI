<template>
  <ons-navigator>
    <slot></slot>
  </ons-navigator>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../internal/mixins/derive';
  import { VuePageLoader } from '../internal/mixins/pageLoader';
  import { destroyable, hasOptions } from '../internal/mixins/common';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties, VuePageLoader, destroyable, hasOptions],

    methods: {
      isReady() {
        if (this.hasOwnProperty('_ready') && this._ready instanceof Promise) {
          return this._ready;
        }
        return Promise.resolve();
      },
      _setPagesVisibility(start, end, visibility) {
        for (let i = start; i < end - 1; i++) {
          this.$children[i].$el.style.visibility = visibility;
        }
      },
      _reattachPage(pageElement, position = null) {
        this.$el.insertBefore(pageElement, position);
        pageElement._isShown = true;
      },
      _redetachPage(pageElement) {
        pageElement._destroy();
        return Promise.resolve();
      },
      _animate({ lastLength, currentLength, lastTopPage, currentTopPage}) {

        // Push
        if (currentLength > lastLength) {
          let isReattached = false;
          if (lastTopPage.parentElement !== this.$el) {
            this._reattachPage(lastTopPage, this.$el.children[lastLength - 1]);
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
          this._reattachPage(lastTopPage, null);
          return this.$el._popPage(this.options, () => this._redetachPage(lastTopPage));
        }

        // Replace page
        this._reattachPage(lastTopPage, currentTopPage);
        return this.$el._pushPage(this.options).then(() => {
          this._redetachPage(lastTopPage);
        });
      }
    },

    beforeUpdate() {
      this._lastLength = this.$children.length;
      this._lastTopPage = this.$children[this.$children.length - 1];
    },

    updated() {
      const lastLength = this._lastLength;
      const currentLength = this.$children.length;
      const lastTopPage = this._lastTopPage.$el;
      const currentTopPage = this.$children[currentLength - 1].$el;

      // TODO check performance and memory leaks

      if (currentTopPage !== lastTopPage) {
        this._ready = this._animate({ lastLength, currentLength, lastTopPage, currentTopPage});
      } else if (currentLength !== lastLength) {
        currentTopPage.updateBackButton(currentLength > 1);
      }

      this._lastTopPage = null;
    }
  };
</script>
