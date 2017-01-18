<template>
  <v-ons-page>
    <ons-pull-hook
      @action="onAction"
      @changestate="onChangestate">
      <span v-show="state === 'initial'">
        Pull to refresh
      </span>

      <span v-show="state === 'preaction'">
        Release
      </span>

      <span v-show="state === 'action'">
        Loading...
      </span>
    </ons-pull-hook>

    <ons-list>
      <ons-list-item
        v-for="item in items">
        {{item}}
      </ons-list-item>
    </ons-list>

  </v-ons-page>
</template>

<script>
  import {
    OnsPullHook
  } from 'vue-onsenui';

	export default {
    data() {
      return {
        state: 'initial',
        items: [1, 2, 3, 4, 5, 6]
      };
    },

    methods: {
      onChangestate({state}) {
        this.state = state;
      },

      onAction(done) {
        setTimeout(() => {
          this.items = [...this.items, this.items.length + 1];

          done();
        }, 1000);
      }
    },

    components: {
      OnsPullHook
    }
	};
</script>
