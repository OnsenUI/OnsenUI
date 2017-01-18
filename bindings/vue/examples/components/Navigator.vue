<template>
  <ons-page>
    <v-ons-navigator :page="page1" @prepush="log('prepush!!')" @postpush="log('postpush!!')" @prepop="log('prepop!!')" @postpop="log('postpop!!')">
    </v-ons-navigator>
  </ons-page>
</template>

<script>
  let page2 = {
    template: `
      <ons-page>
        <ons-toolbar>
        <div class="left"><ons-back-button>Back</ons-back-button></div>
          <div class="center">Page 2</div>
        </ons-toolbar>
        Page 2
      </ons-page>
    `
  };

  let page1 = {
    template: `
      <ons-page>
        <ons-toolbar>
          <div class="center">Page 1</div>
        </ons-toolbar>
        Page 1
        <ons-button @click="push">Push</ons-button>
      </ons-page>
    `,
    methods: {
      push: function() {
        this.getNavigator().pushPage(page2)
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
