<template>
  <v-ons-page>
    <v-ons-tabbar @reactive="log('reactive!!')" @postchange="log('postchange!!')" @prechange="log('prechange!!')">
      <v-ons-tab :page="tabs[0].component" :icon="tabs[0].icon" :label="tabs[0].label"></v-ons-tab>
      <v-ons-tab :page="tabs[1].component" active icon="fa-cogs" label="Settings"></v-ons-tab>
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>
  let Home = {
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

  let Settings = {
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
        tabs: [
          {
            component: Home,
            label: 'Home',
            icon: 'ion-ios-home-outline'
          },
          {
            component: Settings
          }
        ]
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
