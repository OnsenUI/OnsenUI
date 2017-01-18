<template>
  <v-ons-page>
    <v-ons-navigator :page="page1" @prepush="log('prepush!!')" @postpush="log('postpush!!')" @prepop="log('prepop!!')" @postpop="log('postpop!!')">
    </v-ons-navigator>
  </v-ons-page>
</template>

<script>
  let page2 = {
    template: `
      <v-ons-page>
        <v-ons-toolbar>
        <div class="left"><ons-back-button>Back</ons-back-button></div>
          <div class="center">Page 2</div>
        </v-ons-toolbar>
        Page 2
      </v-ons-page>
    `
  };

  let page1 = {
    template: `
      <v-ons-page>
        <v-ons-toolbar>
          <div class="center">Page 1</div>
        </v-ons-toolbar>
        Page 1
        <ons-button @click="push">Push</ons-button>
      </v-ons-page>
    `,
    methods: {
      push: function() {
        this.navigator.pushPage(page2)
      }
    },
  };

	export default {
    data: function() {
      return {
        page1,
        test: 'testing',
      };
    },

    methods: {
      log: function(msg) {
        console.log(msg, this.test)
      }
    }
	};
</script>

<style>
</style>
