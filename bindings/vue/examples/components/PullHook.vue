<template>
  <ons-page>
    <ons-toolbar>
      <div class="center">
        Pull to refresh
      </div>
      <div class="left">
        <ons-back-button label="Home" @click="$pop()"></ons-back-button>
      </div>
    </ons-toolbar>

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

  </ons-page>
</template>

<script>
  import {
    OnsBackButton,
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
      OnsBackButton,
      OnsPullHook
    }
	};
</script>
