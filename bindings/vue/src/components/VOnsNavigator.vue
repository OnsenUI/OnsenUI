<template>
  <ons-navigator>
    <slot>
      <component v-for="page in pageStack" :key="page" :is="page"></component>
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
      _setPagesVisibility(start, end, visibility) {
        for (let i = start; i < end - 1; i++) {
          this.$children[i].$el.style.visibility = visibility;
        }
      },
      _reattachPage(pageElement, position = null, scrollTop = 0) {
        this.$el.insertBefore(pageElement, position);
        pageElement.scrollTop = scrollTop;
        pageElement._isShown = true;
      },
      _redetachPage(pageElement) {
        pageElement._destroy();
        return Promise.resolve();
      },
      _animate({ lastLength, currentLength, lastTopPage, currentTopPage, lastScrollTop }) {

        // Push
        if (currentLength > lastLength) {
          let isReattached = false;
          if (lastTopPage.parentElement !== this.$el) {
            this._reattachPage(lastTopPage, this.$el.children[lastLength - 1], lastScrollTop);
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
          this._reattachPage(lastTopPage, null, lastScrollTop);
          return this.$el._popPage({ ...this.options }, () => this._redetachPage(lastTopPage));
        }

        // Replace page
        this._reattachPage(lastTopPage, currentTopPage, lastScrollTop);
        return this.$el._pushPage({ ...this.options }).then(() => {
          this._redetachPage(lastTopPage);
        });
      }
    },

    watch: {
      pageStack(after, before) {
        const propWasMutated = after === before; // Can be mutated or replaced

        const lastLength = propWasMutated ? this.$children.length : before.length;
        let lastTopPage = this.$children[this.$children.length - 1].$el;
        const lastScrollTop = lastTopPage && lastTopPage.scrollTop || 0;

        this.$nextTick(() => {
          const currentLength = propWasMutated ? this.$children.length : after.length;
          let currentTopPage = this.$children[this.$children.length - 1].$el;

          if (currentTopPage !== lastTopPage) {
            this._ready = this._animate({ lastLength, currentLength, lastTopPage, currentTopPage, lastScrollTop });
          } else if (currentLength !== lastLength) {
            currentTopPage.updateBackButton(currentLength > 1);
          }

          lastTopPage = currentTopPage = null;
        });
      }
    }
  };
</script>
