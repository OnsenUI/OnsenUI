<template>
  <ons-navigator v-el:navigator>
    <div
      v-for="page in pages"
      track-by="$index"
      :is="page"
      @push="push"
      @pop="pop">
    </div>
  </ons-navigator>
</template>

<script>
  const noop = () => {};

  export default {
    data() {
      return {
        pages: [],
        isRunning: false
      };
    },

    props: ['initialComponent'],

    ready() {
      if (this.initialComponent) {
        this.pages = [this.initialComponent];
      }
    },

    methods: {
      push({component, ...options}) {
        if (this.isRunning) {
          return;
        }

        this.pages = [...this.pages, component];
        this.isRunning = true;
        this.$els.navigator
          ._pushPage(options)
          .catch(noop)
          .then(() => this.isRunning = false);
      },

      pop(options = {}) {
        if (this.isRunning) {
          return;
        }

        const removePage = () => {
          this.pages = this.pages.slice(0, this.pages.length - 1);
          return Promise.resolve();
        };

        this.isRunning = true;
        this.$els.navigator
          ._popPage(options, removePage)
          .catch(noop)
          .then(() => this.isRunning = false);
      }
    }
  };
</script>
