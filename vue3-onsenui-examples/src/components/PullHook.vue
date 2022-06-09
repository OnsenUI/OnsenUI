<template>
  <v-ons-page>
    <v-ons-pull-hook
      :action="onAction"
      @changestate="state = $event.state"
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
        v-for="item in items" :key="item">
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
      onAction(done) {
        setTimeout(() => {
          this.items = [...this.items, this.items.length + 1];
          done();
        }, 400);
      }
    }
	};
</script>
