<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left"><ons-toolbar-button @click="tabbarIndex--">Index--</ons-toolbar-button></div>
      <div class="center">Tabbar Index: {{tabbarIndex}} -- Tabbar Visible: <input type="checkbox" v-model="tabbarVisibility" /></div>
      <div class="right"><ons-toolbar-button @click="tabbarIndex++">Index++</ons-toolbar-button></div>
    </v-ons-toolbar>

    <v-ons-tabbar :index="tabbarIndex" @change="tabbarIndex = $event" :visible="tabbarVisibility" @reactive="log('reactive')" @postchange="log('postchange')" @prechange="log('prechange')" @init.native="log('init')" @show.native="log('show')" @hide.native="log('hide')" @destroy.native="log('destroy')">
      <template slot="pages">
        <home></home>
        <settings></settings>
      </template>

      <v-ons-tab :icon="tab1Icon" :label="tab1Label"></v-ons-tab>
      <v-ons-tab icon="fa-cogs" label="Settings"></v-ons-tab>
    </v-ons-tabbar>
  </v-ons-page>
</template>

<script>
  let home = {
    template: `
      <v-ons-page>
        Home page
      </v-ons-page>
    `
  };

  let settings = {
    template: `
      <v-ons-page>
        Settings Page
      </v-ons-page>
    `
  };

	export default {
    data: function() {
      return {
        tab1Label: 'Home',
        tab1Icon: 'ion-ios-home-outline',
        tabbarIndex: 0,
        tabbarVisibility: true
      };
    },

    components: {
      home,
      settings
    },

    methods: {
      log: function(...args) {
        console.log(...args)
      }
    }
	};
</script>

<style>
</style>
