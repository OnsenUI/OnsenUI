<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left"><ons-toolbar-button @click="tabbarIndex--">Index--</ons-toolbar-button></div>
      <div class="center">Tabbar Index: {{tabbarIndex}} -- Tabbar Visible: <input type="checkbox" v-model="tabbarVisibility" /></div>
      <div class="right"><ons-toolbar-button @click="tabbarIndex++">Index++</ons-toolbar-button></div>
    </v-ons-toolbar>

    <v-ons-tabbar ref="myTabbar" v-ons-index="tabbarIndex" :visible="tabbarVisibility" @reactive="log('reactive!!')" @postchange="log('postchange!!')" @prechange="log('prechange!!')">
      <template slot="pages">
        <home></home>
        <settings></settings>
      </template>

      <v-ons-tab :on-click="() => { log('from onClick'); $refs.myTabbar.setActiveTab(0); }" :icon="tab1Icon" :label="tab1Label"></v-ons-tab>
      <v-ons-tab icon="fa-cogs" label="Settings"></v-ons-tab>
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
      log: function(msg) {
        console.log(msg, this.test)
      }
    }
	};
</script>

<style>
</style>
