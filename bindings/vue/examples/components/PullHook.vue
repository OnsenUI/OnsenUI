<template>
  <v-ons-page>
    <v-ons-pull-hook
      @action="onAction"
      v-model="state"
    >
      <span v-show="state === 'initial'">
        Pull to refresh
      </span>

      <span v-show="state === 'preaction'">
        Release
      </span>

      <span v-show="state === 'action'">
        Loading...
      </span>
    </v-ons-pull-hook>

    <v-ons-list>
      <v-ons-list-item
        v-for="item in items">
        {{item}}
      </v-ons-list-item>
    </v-ons-list>

  </v-ons-page>
</template>

<script>
	export default {
    data() {
      return {
        state: 'initial',
        items: [1, 2, 3, 4, 5, 6]
      };
    },

    methods: {
      onChangestate(event) {
        console.log('changestate', event)
        this.state = event.state;
      },

      onAction(done) {
        setTimeout(() => {
          this.items = [...this.items, this.items.length + 1];
          done();
        }, 400);
      }
    }
	};
</script>
