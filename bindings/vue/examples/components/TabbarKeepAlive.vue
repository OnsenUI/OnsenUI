<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left"><ons-toolbar-button @click="tabbarIndex--">Index--</ons-toolbar-button></div>
      <div class="center">Tabbar Index: {{tabbarIndex}} -- Tabbar Visible: <input type="checkbox" v-model="tabbarVisibility" /></div>
      <div class="right"><ons-toolbar-button @click="tabbarIndex++">Index++</ons-toolbar-button></div>
    </v-ons-toolbar>

    <v-ons-tabbar :visible="tabbarVisibility" v-ons-index="tabbarIndex" @reactive="log('reactive')" @postchange="log('postchange')" @prechange="log('prechange')" @init.native="log('init')">
      <template slot="pages">
        <keep-alive>
          <div :is="currentPage"></div>
        </keep-alive>
      </template>

      <v-ons-tab :active="currentPage === 'home'" :on-click="() => { currentPage = 'home'; tabbarIndex = 0; }" :icon="tab1Icon" :label="tab1Label"></v-ons-tab>
      <v-ons-tab :active="currentPage === 'settings'" :on-click="() => { currentPage = 'settings'; tabbarIndex = 1; }" icon="fa-cogs" label="Settings"></v-ons-tab>
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>
  let home = {
    template: `
      <v-ons-page>
        Home page
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
        tab1Icon: 'ion-ios-home-outline',
        tabbarIndex: 0,
        tabbarVisibility: true,
        currentPage: 'home'
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
