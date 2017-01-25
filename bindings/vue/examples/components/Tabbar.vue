<template>
  <v-ons-page>
    <v-ons-tabbar @reactive="log('reactive!!')" @postchange="log('postchange!!')" @prechange="log('prechange!!')">
      <template slot="pages">
        <home></home>
        <settings></settings>
      </template>

      <v-ons-tab :icon="tab1Icon" :label="tab1Label"></v-ons-tab>
      <v-ons-tab active icon="fa-cogs" label="Settings"></v-ons-tab>
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>
  let home = {
    template: `
      <v-ons-page>
        Home page
        <ons-button @click="setTab(1)">tabbar.setActiveTab(1)</ons-button>
      </v-ons-page>
    `,
    methods: {
      setTab: function(i) {
        this.tabbar.setActiveTab(i);
      }
    }
  };

  let settings = {
    template: `
      <v-ons-page>
        Settings Page
        <ons-button @click="setTab(0)">$parent.setActiveTab(0)</ons-button>
      </v-ons-page>
    `,
    methods: {
      setTab: function(i) {
        this.$parent.setActiveTab(i);
      }
    }
  };

	export default {
    data: function() {
      return {
        test: 'testing',
        tab1Label: 'Home',
        tab1Icon: 'ion-ios-home-outline'
      };
    },

    components: {
      home,
      settings
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
