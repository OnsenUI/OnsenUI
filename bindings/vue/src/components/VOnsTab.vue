<template>
  <ons-tab>
  </ons-tab>
</template>

<script>
  import Vue from 'vue';
  import { PageLoader } from 'onsenui';

  export default {
    props: {
      page: {
        type: Object,
        required: true
      }
    },

    mounted() {
      if (this.page === undefined) {
        return;
      }

      // Create Vue instance of the page if not provided
      // Assign ons-tabbar VM to page's $parent
      if (this.page.hasOwnProperty('_isVue')) {
        this.page.$parent = this.page.$parent || this.$parent;
        this.pageInstance = this.page;
      } else {
        this.pageInstance = new Vue(Object.assign(
          { parent: this.$parent },
          this.page
        ));
      }

      this.$el.page = this.pageInstance.$mount();

      this.$el.pageLoader = new PageLoader(
        ({page, parent}, done) => {
          parent.appendChild(page.$el);
          done(page.$el);
        },
        (pageElement) => {
          if (pageElement._destroy instanceof Function) {
            pageElement._destroy();
          } else {
            pageElement.remove();
          }
          this.pageInstance.$destroy();
          this.pageInstance = null;
        }
      );
    }
  };
</script>
